from django.shortcuts import render
from .google_api import *


start = [1.3555024713042285, 103.95547973807754]
dest = [1.377769198810454, 103.95393478569737]
waypoints = []
mode = 'transit'
transitOptions = ''
provideRouteAlternatives = 'true'

GOOGLE_KEY = 'YOUR_GOOGLE_KEY'
#r = requests.get(f'https://maps.googleapis.com/maps/api/directions/json?origin={str(start[0])},{str(start[1])}&destination={str(dest[0])},{str(dest[1])}&mode={mode}&provideRouteAlternatives={provideRouteAlternatives}&key={GOOGLE_KEY}')

map = Map(GOOGLE_KEY)
result = map.get_directions(start, dest, mode = 'transit') #get input here
cf = result.calculate_carbon_footprint()
cost = result.calculate_cost()

if result is not None:
    points, lines, popup_points, popup_lines = result.points, result.lines, result.point_data, result.line_data


"""
print(points)
print('\n')
print(lines)
print('\n')
print(popup_points)
print('\n')
print(popup_lines)
#data = r.json()
#print(data)
"""

polyline = [x['polyline'] for x in lines]

print('\n')
print(polyline)

# Create your views here.
def display_map(request, points = points, polyline = polyline, popup_points = popup_points, popup_lines = popup_lines, carbon_footprint = cf, total_cost = cost):
    return render(request, "display/index.html", {
        "points": points,
        "lines": polyline,
        "popup_lines": popup_lines,
        "popup_points": popup_points,
        "carbon_footprint": carbon_footprint,
        "total_cost": total_cost
    })

