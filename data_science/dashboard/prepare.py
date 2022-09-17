import numpy as np
import pandas as pd

download_link = ("https://github.com/yongkheehou/recyclegowheredata/raw/main/dashboard/random_generated_website_usage_data.csv")

class PrepareData:
    
    def __init__(self, download_new=True):
        self.download_new = download_new
        
    def download_data(self):
        df = pd.read_csv(download_link)
        return df
    
    def select_columns(self, df):
        cols = df.columns

        areas = ["Date", "Item", "House Collection/ Self Pickup", "Organisation", "Bin Location"]
        is_area = cols.isin(areas)

        filt = is_area 
        return df.loc[:, filt]
    
    def sort_dates(self, df):
        # convert data type of date column from object to datetime
        df['Date'] = pd.to_datetime(df['Date'])
        
        # sort dates in ascending order
        df.sort_values(by='Date', inplace=True)

        return df
    
    def transpose_to_ts(self, df):
        # set date column as index of dataframe
        df.set_index('Date', inplace = True)
        
        return df
    
    # def group_item(self, df):
    #     grouping_col = df.columns[0]
    #     return df.groupby(grouping_col).sum()
    
    # def group_collection_method(self, df):
    #     grouping_col = df.columns[1]
    #     return df.groupby(grouping_col).sum()
    
    # def group_organisation(self, df):
    #     grouping_col = df.columns[2]
    #     return df.groupby(grouping_col).sum()
    
    # def group_bin_location(self, df):
    #     grouping_col = df.columns[3]
    #     return df.groupby(grouping_col).sum()
    
    def run(self):
        data = {}
        
        if self.download_new:
            df = self.download_data()
            
        df = self.select_columns(df)
        df = self.sort_dates(df)
        
        # df = self.transpose_to_ts(df)
        
        # df1 = self.group_item(df)
        # df2 = self.group_collection_method(df)
        # df3 = self.group_organisation(df)
        # df4 = self.group_bin_location(df)
        
        data['original'] = df
        # data['item'] = df1
        # data['collection_method'] = df2
        # data['organisation'] = df3
        # data['bin_location'] = df4
        
        return data
    
def AggregateData(df):
    data_2 = {}
    data_2['original_table'] = df
    data_2['item_table'] = pd.crosstab(df['Item'], pd.PeriodIndex(df['Date'], freq='M')).rename_axis(columns=None).T
    data_2['collection_method_table'] = pd.crosstab(df['House Collection/ Self Pickup'], pd.PeriodIndex(df['Date'], freq='M')).rename_axis(columns=None).T
    data_2['organisation_table'] = pd.crosstab(df['Organisation'], pd.PeriodIndex(df['Date'], freq='M')).rename_axis(columns=None).T
    data_2['location_table'] = pd.crosstab(df['Bin Location'], pd.PeriodIndex(df['Date'], freq='M')).rename_axis(columns=None).T

    return data_2

def save(data_2):
    data_2['original_table'].to_csv("dashboard/data/original.csv", index=False)
    data_2['item_table'].to_csv("dashboard/data/item_table.csv", index=False)
    data_2['collection_method_table'].to_csv("dashboard/data/collection_method_table.csv", index=False)
    data_2['organisation_table'].to_csv("dashboard/data/organisation_table.csv", index=False)
    data_2['location_table'].to_csv("dashboard/data/location_table.csv", index=False)
    
    return 