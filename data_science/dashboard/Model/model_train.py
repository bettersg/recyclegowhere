import pandas as pd
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import pickle


df_imp = pd.read_csv("https://raw.githubusercontent.com/yongkheehou/recyclegowheredata/main/dashboard/random_generated_website_usage_data.csv", index_col='s/n')

#Converting the rdate column to date time
from datetime import datetime


df_imp['Date'] = df_imp['Date'].apply(lambda x: datetime.strptime(x , '%d/%m/%Y'))
df_imp['Date_new']=pd.to_datetime(df_imp['Date']).dt.strftime('%b-%Y') 
df_imp['month']=pd.to_datetime(df_imp['Date']).dt.strftime('%b') 
df_imp['year']=pd.to_datetime(df_imp['Date']).dt.strftime('%Y')

Item_list = df_imp['Item'].unique().tolist()
year_list = df_imp['year'].unique().tolist()

df_model = df_imp[['Item','month','year','House Collection/ Self Pickup']]

data = df_model[(df_model['year'] == "2021") & (df_model['Item'] == "Facial Cleanser Bottle")].groupby(['month']).count()
data["month"] = data.index
data['Item'] = "Facial Cleanser Bottle"

for year in year_list:
  for item in Item_list:
    df_0 = df_model[(df_model['year'] == year ) & (df_model['Item'] == item)].groupby(['month']).count()
    df_0["month"] = df_0.index
    df_0['Item'] = item
    data = data.append(df_0)
    

#encoding
item_enco = data["Item"]

classes_1 = data['Item'].unique().tolist()
Item_enco = [classes_1.index(group) for group in item_enco]

collection_enco = data["House Collection/ Self Pickup"]

classes_2 = data['House Collection/ Self Pickup'].unique().tolist()
Collection_enco = [classes_2.index(group) for group in collection_enco]

month_enco = data["month"]

classes_3 = data['month'].unique().tolist()
month_encode = [classes_3.index(group) for group in month_enco]

data['Item_encode'] = Item_enco
data['Collection_encode'] = Collection_enco
data['Month_encode'] = month_encode

data = data[['Month_encode','Item_encode','Collection_encode','year']]

y = data["year"]
X = data.drop(['year'],axis=1)

#model training 
from sklearn.ensemble import RandomForestRegressor

regr = RandomForestRegressor(max_depth=2, random_state=0)
regr.fit(X, y)

#Export the dataframe as well
#Exporting the model to the local file
pickle.dump(regr, open("regr", 'wb'))

