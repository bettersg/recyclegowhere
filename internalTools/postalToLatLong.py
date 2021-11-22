import requests
import pandas as pd


def postalToLatLong(postal):
    page = 1
    try:
        response = requests.get(
            'http://developers.onemap.sg/commonapi/search?searchVal={0}&returnGeom=Y&getAddrDetails=Y&pageNum={1}'
            .format(postal, page)).json()
        df = pd.json_normalize(response, record_path=['results'])
        if not df.empty:
            return tuple((df['LATITUDE'][0], df['LONGITUDE'][0]))
        else:
            return tuple((-1, -1))
    except requests.exceptions.ConnectionError as e:
        print('Connection error')


if __name__ == "__main__":
    postalIn = input("Postal code\n")
    print(postalToLatLong(postalIn))
