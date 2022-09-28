Version 0.1 
This is a map module for displaying final paths via a django app. Visual purposes only.

File list:
map/display - contains files for CSS/HTML/Javascript
	- map/display/google_api.py: contains functions to call the API and select useful information to be displayed in -
	- map/display/views.py: passes the python variables to the front-end for rendering. The HTML can be found in the folder -
	- map/display/templates/display/index.html, with its associated CSS and JS files in:
	- map/display/static/display/map.css
	- map/display/static/display/map.js

Please install django and googlemaps for Python.

You need an API key for this, go to Google Maps API and create an account, and obtain the API key. After which, go to ./map/display/views.py and replace the variable value 'GOOGLE_KEY' with your API key.

Change the secret key in ./map/map/settings.py to yours.

If you like to change the start point and destination, go to ./map/display/views.py and change the variables 'start' and 'end' to your desired values. Note: They need not be coordinates. Refer to Google Maps API documentation to find out which parameters could be entered into googlemaps.directions().

To launch the Django app, change directory to ./map and run the following code in the command prompt:

python manage.py runserver

and then on a web browser, go to 127.0.0.1:8000/display to view the map.