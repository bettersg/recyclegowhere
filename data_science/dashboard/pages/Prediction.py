import streamlit as st
import pandas as pd
import pickle


st.set_page_config(
    page_title="Garbage Collection",
    page_icon="🧊",
    layout="wide",
    initial_sidebar_state="expanded",
    
)



# from sklearn.ensemble import RandomForestClassifier

#Css class for styling the app

st.markdown("""
<style>
.app-header {
    font-size:50px;
    color: #F63366;
    font-weight: 700;
}
.sidebar-header{
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    font-size: 28px;
    letter-spacing: -1.2px;
    word-spacing: 2px;
    color: #000000;
    font-weight: 700;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: capitalize;
}
.positive {
    color: #F63366;
    font-size:30px;
    font-weight: 700;  
}
.negative {
    color: #008000;
    font-size:30px;
    font-weight: 700;  
}

</style>
""", unsafe_allow_html=True)

st.markdown('<p class="app-header">Location and Organization Predictor</p>', unsafe_allow_html=True)


###########################
# Pre-Processing

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

########################################

st.sidebar.markdown('<p class="sidebar-header">Input details to predict!</p>', unsafe_allow_html=True)


if 1>2:
    a=5
    
else:
    def user_input_features():
        
        collection_pickup = data['House Collection/ Self Pickup'].unique().tolist()
        month_list = ["Jan","Feb","Mar",'Apr',"May","Jun","Jul",'Aug',"Sep","Oct","Nov",'Dec']

        item = st.sidebar.selectbox('Item',Item_list)   
        year = st.sidebar.selectbox('Select year',["2023"])    
        month =  st.sidebar.selectbox('Select month',month_list)

        data1 = {'Item': item,
                'year' : 100,
                'House Collection/ Self Pickup': 1,
                'month': month
                
                }
        features = pd.DataFrame(data1, index=[0])
        return (features,item,month, year)

input_df, item, month , year = user_input_features()


# Displays the user input features
st.subheader('Predictor variables')


col1, col2, col3 = st.columns(3)
    
col1.metric("Item", item)
# col2.metric("House Collection/ Self Pickup", house)
col2.metric("Month", month)
col3.metric("Year", year)
####################################
# Encoding
data = data.append(input_df)

item_enco = data["Item"]

classes_1 = data['Item'].unique().tolist()
Item_enco = [classes_1.index(group) for group in item_enco]

collection_enco = data["House Collection/ Self Pickup"]

classes_2 = data['House Collection/ Self Pickup'].unique().tolist()
Collection_enco = [classes_2.index(group) for group in collection_enco]

month_enco = data["month"]

classes_3 = data['month'].unique().tolist()
month_enco = [classes_3.index(group) for group in month_enco]

data['Item_encode'] = Item_enco
data['Collection_encode'] = Collection_enco
data['Month_encode'] = month_enco

data = data[['Month_encode','Item_encode','Collection_encode','year']]

####################################

st.markdown("""---""")

# Reads in saved classification model
model1 = pickle.load(open('./Model/regr', 'rb'))


df_predict = data.tail(1)


#Predicting the values from the model

y_pred_1=model1.predict(df_predict[['Month_encode','Item_encode','Collection_encode']])
# print(classes_1[y_pred_1[0]])





st.subheader('Predictions')
col1,col2 = st.columns(2)

col1.metric("Expected", round(y_pred_1[0]))





