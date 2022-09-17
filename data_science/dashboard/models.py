import numpy as np
import pandas as pd
import math
from scipy.optimize import least_squares
from statsmodels.nonparametric.smoothers_lowess import lowess
from prepare import PrepareData, AggregateData

MIN_OBS = 15  # Minimum observations needed to make prediction




# Constants for CasesModel - Feel free to change these
N_TRAIN = 60   # Number of observations used in training
N_SMOOTH = 15  # Number of observations used in smoothing
N_PRED = 56    # Number of new observations to predict
L_N_MIN = 5    # Number of days of exponential growth for L min boundary
L_N_MAX = 50   # Number of days of exponential growth for L max boundary

# Constants for DeathsModel - Feel free to change these
LAG = 15       # Number of days to lag cases for calculation of CFR
PERIOD = 30    # Number of days to total for CFR
last_date = None



def general_logistic_shift(x, L, x0, k, v, s):
    return (L - s) / ((1 + np.exp(-k * (x - x0))) ** (1 / v)) + s


def optimize_func(params, x, y, model):
    y_pred = model(x, *params)
    error = y - y_pred
    return error


class CasesModel:
    def __init__(self, model, data, last_date, n_train, n_smooth, 
                 n_pred, L_n_min, L_n_max, **kwargs):
        # Set basic attributes
        self.model = model
        self.data = data
        # data type of index (date) of tables is period
        self.last_date = self.get_last_date(last_date)
        self.n_train = n_train
        self.n_smooth = n_smooth
        self.n_pred = n_pred
        self.L_n_min = L_n_min
        self.L_n_max = L_n_max
        self.kwargs = kwargs
        
        # Set attributes for prediction
        self.first_pred_date = pd.Timestamp(self.data['original_table']['Date'].index[-1]) + pd.Timedelta("1D")
        self.pred_index = pd.date_range(start=self.first_pred_date, periods=n_pred, freq = 'M')
        
    def get_last_date(self, last_date):
        # Use the most current date as the last actual date if not provided
        if last_date is None:
            periods = pd.PeriodIndex(self.data['original_table']['Date'], freq='M')
            timestamp = periods[-1]
            return timestamp
        else:
            return pd.Timestamp(last_date)
        
    def init_dictionaries(self):
        # Create dictionaries to store results for each area
        # Executed first in `run` method
        self.smoothed = {}
        self.bounds = {}
        self.p0 = {}
        self.params = {}
        self.pred_daily = {}
        self.pred_cumulative = {}
        self.category = None
        self.item = None
        self.L0 = None
        self.L_max = None
        self.L_min = None
        
        # Dictionary to hold DataFrame of actual and predicted values
        self.combined_daily = {}
        self.combined_cumulative = {}
        
        # Same as above, but stores smoothed and predicted values
        self.combined_daily_s = {}
        self.combined_cumulative_s = {}
        
    def smooth(self, s):
        if s.index.inferred_type == "datetime64":
            from datetime import datetime
            s=pd.Series(['{}-{:02d}'.format(x.year,x.month) if isinstance(x, datetime) else "Nat" for x in pd.DatetimeIndex(s).to_pydatetime()])
        s = s[:self.last_date]
        if s.values[0] == 0:
            # Filter the data if the first value is 0
            last_zero_date = s[s == 0].index[-1]
            s = s.loc[last_zero_date:]
            s_daily = s.diff().dropna()
        else:
            # If first value not 0, use it to fill in the 
            # first missing value
            s_daily = s.diff().fillna(s.iloc[0])

        # Don't smooth data with less than MIN_OBS values
        if len(s_daily) < MIN_OBS:
            return s_daily.cumsum()

        y = s_daily.values
        frac = self.n_smooth / len(y)
        x = np.arange(len(y))
        y_pred = lowess(y, x, frac=frac, is_sorted=True, return_sorted=False)
        s_pred = pd.Series(y_pred, index=s_daily.index).clip(0)
        s_pred_cumulative = s_pred.cumsum()
        
        if s_pred_cumulative[-1]  == 0:
            # Don't use smoothed values if they are all 0
            return s_daily.cumsum()
        
        last_actual = s.values[-1]
        last_smoothed = s_pred_cumulative.values[-1]
        s_pred_cumulative *= last_actual / last_smoothed
        return s_pred_cumulative
    
    def get_train(self, smoothed):
        # Filter the data for the most recent to capture new waves
        return smoothed.iloc[-self.n_train:]
    
    def get_L_limits(self, s):
        last_val = s[-1]
        last_pct = s.pct_change()[-1] + 1
        L_min = last_val * last_pct ** self.L_n_min
        L_max = last_val * last_pct ** self.L_n_max + 1
        L0 = (L_max - L_min) / 2 + L_min
        return L_min, L_max, L0
    
    def get_bounds_p0(self, s):
        L_min, L_max, L0 = self.get_L_limits(s)
        if L0 == float('NaN'):
            bounds2 = np.full((2, 5), np.nan)
            p02 = np.full(5, np.nan)
            return bounds2, p02
        x0_min, x0_max = -50, 50
        k_min, k_max = 0.01, 0.5
        v_min, v_max = 0.01, 2
        s_min, s_max = 0, s[-1] + 0.01
        s0 = s_max / 2
        lower = L_min, x0_min, k_min, v_min, s_min
        upper = L_max, x0_max, k_max, v_max, s_max
        bounds = lower, upper
        p0 = L0, 0, 0.1, 0.1, s0
        return bounds, p0, L0, L_max, L_min
    
    def train_model(self, s, bounds, p0):
        y = s.values
        n_train = len(y)
        x = np.arange(n_train)
        res = least_squares(optimize_func, p0, args=(x, y, self.model), bounds=bounds, **self.kwargs)
        return res.x
    
    def get_pred_daily(self, n_train, params):
        x_pred = np.arange(n_train - 1, n_train + self.n_pred)
        y_pred = self.model(x_pred, *params)
        y_pred_daily = np.diff(y_pred)
        return pd.Series(y_pred_daily, index=self.pred_index)
    
    def get_pred_cumulative(self, s, pred_daily):
        last_actual_value = s.loc[self.last_date]
        return pred_daily.cumsum() + last_actual_value
    
    def convert_to_df(self, gk):
        # convert dictionary of areas mapped to Series to DataFrames
        self.smoothed[gk] = pd.DataFrame(self.smoothed[gk]).fillna(0).astype('int')
        self.smoothed[gk].to_csv(f'dashboard/data/model/python_smoothed_{gk}.csv', index=False)
        self.bounds[gk] = pd.concat(self.bounds[gk].values(), 
                                    keys=self.bounds[gk].keys()).T
        self.bounds[gk].loc['L'] = self.bounds[gk].loc['L'].round()
        self.bounds[gk].to_csv(f'dashboard/data/model/python_bounds_{gk}.csv', index=False)
        self.p0[gk] = pd.DataFrame(self.p0[gk], index=['L', 'x0', 'k', 'v', 's'])
        self.p0[gk].loc['L'] = self.p0[gk].loc['L'].round()
        self.p0[gk].to_csv(f'dashboard/data/model/python_p0_{gk}.csv', index=False)
        self.params[gk] = pd.DataFrame(self.params[gk], index=['L', 'x0', 'k', 'v', 's'])
        self.params[gk].to_csv(f'dashboard/data/model/python_params_{gk}.csv', index=False)
        self.pred_daily[gk] = pd.DataFrame(self.pred_daily[gk])
        self.pred_daily[gk].to_csv(f'dashboard/data/model/python_pred_daily_{gk}.csv', index=False)
        self.pred_cumulative[gk] = pd.DataFrame(self.pred_cumulative[gk])
        self.pred_cumulative[gk].to_csv(f'dashboard/data/model/python_pred_cumulative_{gk}.csv', index=False)
        
    def combine_actual_with_pred(self):
        for gk, df_pred in self.pred_cumulative.items():
            df_actual = self.data[gk][:self.last_date]
            df_comb = pd.concat((df_actual, df_pred))
            self.combined_cumulative[gk] = df_comb
            self.combined_cumulative[gk].to_csv(f'dashboard/data/model/python_combined_cumulative_{gk}.csv', index=False)
            self.combined_daily[gk] = df_comb.diff().fillna(df_comb.iloc[0]).astype('int')
            self.combined_daily[gk].to_csv(f'dashboard/data/model/python_combined_daily_{gk}.csv', index=False)
            
            df_comb_smooth = pd.concat((self.smoothed[gk], df_pred))
            self.combined_cumulative_s[gk] = df_comb_smooth
            self.combined_cumulative_s[gk].to_csv(f'dashboard/data/model/python_combined_cumulative_s_{gk}.csv', index=False)
            self.combined_daily_s[gk] = df_comb_smooth.diff().fillna(df_comb.iloc[0]).astype('int')
            self.combined_daily_s[gk].to_csv(f'dashboard/data/model/python_combined_daily_s_{gk}.csv', index=False)

    def run(self):
        self.init_dictionaries()
        category = {'item', 'collection_method', 'organisation', 'location'}
        for category in category:
            tables_to_access = f'{category}_table'
            df_cases = self.data[tables_to_access]
            self.category = category
            self.smoothed[tables_to_access] = {}
            self.bounds[tables_to_access] = {}
            self.p0[tables_to_access] = {}
            self.params[tables_to_access] = {}
            self.pred_daily[tables_to_access] = {}
            self.pred_cumulative[tables_to_access] = {}
            
            for item, item_data in self.data[tables_to_access].items():
                self.item = item
                smoothed = self.smooth(item_data)
                train = self.get_train(smoothed)
                n_train = len(train)
                
                if n_train < MIN_OBS or all(item == 0 for item in train):
                    bounds = np.full((2, 5), np.nan)
                    p0 = np.full(5, np.nan)
                    params = np.full(5, np.nan)
                    pred_daily = pd.Series(np.zeros(self.n_pred), index=self.pred_index)
                    pred_cumulative = self.get_pred_cumulative(item_data, pred_daily)
                    
                else:
                    bounds, p0, self.L0, self.L_max, self.L_min = self.get_bounds_p0(train)
                    if self.L0:
                        params = np.full(5, np.nan)
                        pred_daily = pd.Series(np.zeros(self.n_pred), index=self.pred_index)
                        pred_cumulative = self.get_pred_cumulative(item_data, pred_daily)
                    else:
                        params = self.train_model(train, bounds=bounds,  p0=p0)
                        pred_daily = self.get_pred_daily(n_train, params).round(0)
                        pred_cumulative = self.get_pred_cumulative(item_data, pred_daily)
                
                # save results to dictionaries mapping each area to its result
                self.smoothed[tables_to_access][item] = smoothed
                self.bounds[tables_to_access][item] = pd.DataFrame(bounds, index=['lower', 'upper'], 
                                                    columns=['L', 'x0', 'k', 'v', 's'])
                self.p0[tables_to_access][item] = p0
                self.params[tables_to_access][item] = params
                self.pred_daily[tables_to_access][item] = pred_daily.astype('int')
                self.pred_cumulative[tables_to_access][item] = pred_cumulative.astype('int')
            self.convert_to_df(tables_to_access)
        self.combine_actual_with_pred()
                
    def plot_prediction(self, group, area, **kwargs):
        group_kind = f'{group}_table'
        actual = self.data[group_kind][area]
        pred = self.pred_cumulative[group_kind][area]
        first_date = pd.Timestamp(self.data['original_table']['Date'].index[-1]) - pd.Timedelta(self.n_train, 'D')
        last_pred_date = pd.Timestamp(self.data['original_table']['Date'].index[-1]) + pd.Timedelta(self.n_pred, 'D')
        try:
            actual.loc[first_date:last_pred_date].plot(label='Actual', **kwargs)
        except ValueError:
            pass
        pred.plot(label='Predicted').legend()

data = PrepareData().run()  
df = data['original']
data_2 = AggregateData(df)
# print(data_2['item_table'])
# print(data_2['item_table'].index.inferred_type)
 
a = CasesModel(model=general_logistic_shift,
        data=data_2,
        last_date=last_date,
        n_train=N_TRAIN,
        n_smooth=N_SMOOTH,
        n_pred=N_PRED,
        L_n_min=L_N_MIN,
        L_n_max=L_N_MAX)
a.run()
print(a.pred_cumulative['item_table'].iloc[-5:])
