Version 0.2
This is a map module for displaying final paths via a django app. Visual purposes only.
So far, it is using OneMap/Google Maps API to calculate paths.

File list:
map/display - contains files for CSS/HTML/Javascript
	- map/display/google_api.py: contains functions to call the API and select useful information to be displayed in -
	- map/display/views.py: passes the python variables to the front-end for rendering. The HTML can be found in the folder -
	- map/display/templates/display/index.html, with its associated CSS and JS files in:
	- map/display/static/display/map.css
	- map/display/static/display/map.js

Please install django and googlemaps for Python.

You need an API key for this, go to Google Maps API and create an account, and obtain the API key. After which, go to ./map/display/views.py and replace the variable value 'GOOGLE_KEY' with your API key.
*update v0.2: Updated with OneMap API, create an account at OneMap and obtain an API key - follow instructions at https://www.onemap.gov.sg/docs/. If you would like to use GoogleMaps, change the following:
comment out line 15, uncomment line 14 of views.py
under display_map, change to render(..., "display/index.html")

Change the secret key in ./map/map/settings.py to yours.

If you like to change the start point and destination, go to ./map/display/views.py and change the variables 'start', 'end' and 'routeType' to your desired values. Note: They need not be coordinates. Refer to Google Maps API/OneMap API documentation to find out which parameters could be entered into googlemaps.directions().

To launch the Django app, change directory to ./map and run the following code in the command prompt:

python manage.py runserver

and then on a web browser, go to 127.0.0.1:8000/display to view the map.
