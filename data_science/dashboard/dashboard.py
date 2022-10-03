import streamlit as st
import pandas as pd
from datetime import datetime
import plotly.express as px
from datetime import datetime

st.set_page_config(
    page_title="RecycleGoWhere Website Analytics",
    page_icon="🧊",
    layout="wide",
    initial_sidebar_state="expanded",
    
)

#importing the dataset
df_imp = pd.read_csv("https://raw.githubusercontent.com/yongkheehou/recyclegowheredata/main/dashboard/random_generated_website_usage_data.csv", index_col='s/n')


# #Data pre processing
# date_time_str = '18/09/19 01:55:19'

df_imp['Date'] = df_imp['Date'].apply(lambda x: datetime.strptime(x , '%d/%m/%Y'))
df_imp['Date_new']=pd.to_datetime(df_imp['Date']).dt.strftime('%b-%Y') 
df_imp['month']=pd.to_datetime(df_imp['Date']).dt.strftime('%b') 
df_imp['year']=pd.to_datetime(df_imp['Date']).dt.strftime('%Y')

#Dropdown lists
Item_list = df_imp['Item'].unique().tolist()
year_list = df_imp['year'].unique().tolist()
#sorting by Date
df_imp_viz = df_imp.sort_values(by=['Date'])
#Visualization for dashboard

start_date = min(df_imp.Date)
end_date = max(df_imp.Date)

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
    color: #FFFFFF;
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
#Sidebar

with st.sidebar:
    start_time = st.slider(
        "Set the Date range",
        min_value  = start_date,
        max_value = end_date,
        value=(datetime(2021, 1, 1) , datetime(2021,12,1)),
        format="MM/DD/YY")

    
    # st.write("Start time:", start_time[0])

#Filtering the whole dataset by date time
df_imp_viz = df_imp_viz.loc[(df_imp['Date'] >= start_time[0])
                     & (df_imp['Date'] < start_time[1])]

# print(type((start_time[0]).strftime("%Y-%m-%d")))

st.markdown('<p class="app-header">Dashboard</p>', unsafe_allow_html=True)

# expander = st.expander("Insight to the Project")
# expander.write("""
#     Original source of the data we used for the development of this website
# """)
col1, col2, col3 = st.columns(3)

select_year = col1.selectbox(
    'Choose the variable?',
    year_list,
    key = 1)

option_fig2 = col2.multiselect(
    'Filter by?',
    ('House Collection', 'Self Disposal'),
    key = 2)

select_item = col3.selectbox(
    'Choose the Item?',
    Item_list,
    key = 3)

if len(option_fig2) == 0:
    #01 visualization
    df_viz_2 = df_imp_viz[(df_imp_viz['year'] == select_year) & (df_imp_viz['Item'] == select_item) ]
    df_viz_2 = df_viz_2.groupby(['month']).count()
elif len(option_fig2) == 1:
    df_viz_2 = df_imp_viz[((df_imp_viz['year'] == select_year) & (df_imp_viz['Item'] == select_item))&(df_imp_viz['House Collection/ Self Pickup'] == option_fig2[0])]
    df_viz_2 = df_viz_2.groupby(['month']).count()
else:
    df_viz_2 = df_imp_viz[(df_imp_viz['year'] == select_year) & (df_imp_viz['Item'] == select_item) ]
    df_viz_2 = df_viz_2.groupby(['month']).count()





col1, col2 = st.columns(2)


df_viz_2 = df_viz_2.rename(columns={"year": "Count"})
fig1 =  px.bar(df_viz_2, x=df_viz_2.index, y="Count" ,labels={'x': 'Month', 'y':'Count'})

col1.plotly_chart(fig1, use_container_width=True)

#02 visualization

fig2 = px.line(df_viz_2, x=df_viz_2.index, y="Count")

col2.plotly_chart(fig2, use_container_width=True)

#option bar for 3 and 4 visualizations
col1, col2 = st.columns(2)
option_fig3 = col1.selectbox(
    'Choose the variable?',
    ('Rand 1', 'Rand 2') ,
    key = 4)

option_fig4 = col2.multiselect(
    'Filter by?',
    ('House Collection', 'Self Disposal'),
    key = 5)

col1, col2 = st.columns(2)

#03 Visualizations
df_viz = df_imp_viz.groupby(['House Collection/ Self Pickup'])['Rand 1'].count()

fig3 = px.pie(df_viz, values=[df_viz['House Collection'], df_viz['Self Disposal']], names=['House Collection' , 'Self Disposal'],
            title="Collection Type",
            labels={ # replaces default labels by column name
                "Self Disposal": "Self Disposal", "House Collection": "House Collection"
            },
            
            color_discrete_map={ # replaces default color mapping by value
                "Self Disposal": "RebeccaPurple", "House Collection": "MediumPurple"
            },
            template="simple_white")

col1.plotly_chart(fig3, use_container_width=True)

#04 Visualizations
if len(option_fig4):
    if len(option_fig4) < 2:
        df_fig_2 = df_imp_viz[df_imp_viz["House Collection/ Self Pickup"] == option_fig4[0]]
        fig4 = px.line(df_fig_2, x="Date", y=option_fig3,
                    title="{} distribution over time".format(option_fig3))
    else:
        fig4 = px.line(df_imp_viz, x='Date', y=option_fig3, color="House Collection/ Self Pickup" , 
                        title="{} distribution over time".format(option_fig3))

else:  
    fig4 = px.line(df_imp_viz, x='Date', y=option_fig3 , color="House Collection/ Self Pickup",
                title="{} distribution over time".format(option_fig3))


# fig4 = px.line(df_imp_viz, x='Date', y="Rand 1" , color="House Collection/ Self Pickup")
col2.plotly_chart(fig4, use_container_width=True)

