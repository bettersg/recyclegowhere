from django.shortcuts import render
#from .google_api import *
from .onemap import *


start = [1.3555024713042285, 103.95547973807754]
dest = [1.377769198810454, 103.95393478569737]


GOOGLE_KEY = 'ADD KEY HERE'
ONEMAP_KEY = 'ADD KEY HERE'
#r = requests.get(f'https://maps.googleapis.com/maps/api/directions/json?origin={str(start[0])},{str(start[1])}&destination={str(dest[0])},{str(dest[1])}&mode={mode}&provideRouteAlternatives={provideRouteAlternatives}&key={GOOGLE_KEY}')

#map = GoogleMap(GOOGLE_KEY)
map = OneMap(ONEMAP_KEY)
result = map.get_directions(start, dest, routeType='cycle') #get input here

cf = result.calculate_carbon_footprint()
cost = result.calculate_cost()

if result is not None:
    points, lines, popup_points, popup_lines = result.points, result.lines, result.point_data, result.line_data

polyline = [x['polyline'] for x in lines]

# Create your views here.
def display_map(request, points = points, polyline = polyline, popup_points = popup_points, popup_lines = popup_lines, carbon_footprint = cf, total_cost = cost):
    
    return render(request, "displayOneMap/index.html", {
        "points": points,
        "lines": polyline,
        "popup_lines": popup_lines,
        "popup_points": popup_points,
        "carbon_footprint": carbon_footprint,
        "total_cost": total_cost
    })

