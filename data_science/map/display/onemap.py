import requests
import datetime
from pprint import pprint


class Direction:
    def __init__(self, json_result, routeType):
      self.routeType = routeType

      if routeType == 'pt':
        self.startLoc = json_result['plan']['from']['lat'], json_result['plan']['from']['lon'] 
        self.endLoc = json_result['plan']['to']['lat'], json_result['plan']['to']['lon']
        self.startLocName = json_result['plan']['from']['name']
        self.endLocName = json_result['plan']['to']['name']

        self.steps = json_result['plan']['itineraries'][0]['legs'] #take the first only, for now.

        self.points, self.lines, self.point_data, self.line_data = self.prepare_steps_data()
        """
        print(json_result[0].keys())
        dict_keys(['bounds', 'copyrights', 'legs', 'overview_polyline', 'summary', 'warnings', 'waypoint_order'])
        """
        self.waypoints = [json_result['plan']['itineraries'][0]['legs'][i]['intermediateStops'] for i in range(len(json_result['plan']['itineraries'][0]['legs']))]
        
        self.total_duration = json_result['plan']['itineraries'][0]['duration']

        self.distance_breakdown = [x['distance'] for x in self.line_data]
        self.duration_breakdown = [x['duration'] for x in self.line_data]
        self.mode_breakdown = [x['mode'] for x in self.line_data]

        self.fare_breakdown = [x['fare'] for x in json_result['plan']['itineraries']]

        self.total_dist = sum(self.distance_breakdown)
      
      else:
        self.startLocName, self.endLocName, self.total_duration, self.total_dist = list(json_result['route_summary'].values())
        self.points = [x[3].split(',') for x in json_result['route_instructions']]
        self.points = [self.points[0], self.points[-1]]
        self.lines = [{
          'start': self.points[0],
          'end': self.points[1],
          'polyline': decode_polyline(json_result['route_geometry'])
          }]
        
        self.point_data = {
          'arrival': self.startLocName,
          'departure': self.endLocName
        }
        self.line_data = [{
          'distance': self.total_dist,
          'duration': self.total_duration,
          'mode': self.routeType
        }]
        self.waypoints = [x[1] for x in json_result['route_instructions']]
        self.distance_breakdown = [self.total_dist]
        self.duration_breakdown = [self.total_duration]
        self.mode_breakdown = [self.routeType.upper()]


    def __repr__(self):
        return f'start: {self.startLocName}\n \
            waypoints: {"|".join(self.waypoints)}\n \
            end: {self.endLocName}'

    def calculate_weighted_distance(self, weights):
        pass

    def calculate_carbon_footprint(self, weights = 'default'):
        #kgCO2 per km per pax

        #weights: {'WALKING': 0, 'BUS': 149, 'MRT': 100, 'LRT': , 'DRIVING'}
        if weights == 'default':
            weights = {'WALK': 0, 'CYCLE': 0, 'TRANSIT': 150, 'BUS': 149, 'MRT': 100, 'LRT': 150, 'DRIVE': 500}
        
        total_cf = 0
        for i in range(len(self.distance_breakdown)):
            total_cf += self.distance_breakdown[i]*weights[self.mode_breakdown[i]]/1000
        return total_cf

    def calculate_cost(self, weights = 'default'):
        if weights == 'default':
            weights = {'WALK': 0, 'CYCLE': 0, 'BUS': 149, 'TRANSIT': 100, 'MRT': 100, 'LRT': 150, 'DRIVE': 500}
        
        total_cost = 0
        for i in range(len(self.distance_breakdown)):

            total_cost += self.distance_breakdown[i]*weights[self.mode_breakdown[i]]/1000
        return total_cost

    def optimize_waypoints(self, objectives = ['cost', 'cf', 'distance', 'duration', 'walking'], weights = 'default'):
        #minimizes cost, carbon footprint, distance and travel time
        pass


    def prepare_steps_data(self):
        #arrange in the form for rendering
        points = []
        lines = []
        popups_lines = []
        popups_points = []

        
        for mini_step in self.steps:
            """
            dict_keys(['distance', 'duration', 'end_location', 'html_instructions', 'polyline', 'start_location', 'steps', 'travel_mode'])
            dict_keys(['distance', 'duration', 'end_location', 'html_instructions', 'polyline', 'start_location', 'transit_details', 'travel_mode'])
            """
            #self.waypoints.append(mini_step['end_location'])
            start = mini_step['from']['lat'], mini_step['from']['lon']
            end = mini_step['to']['lat'], mini_step['to']['lon']
            travel_mode = mini_step['mode']
            distance = mini_step['distance']
            duration = mini_step['duration']

            popup_points_dict = {}
            popup_lines_dict = {
                'distance': distance,
                'duration': duration,
                'mode': travel_mode
                }
            if travel_mode == 'BUS':
                popup_points_dict['arrival'] = mini_step['to']['name']
                popup_points_dict['departure'] = mini_step['from']['name']
                popup_lines_dict['num_stops'] = mini_step['numIntermediateStops']
                popup_lines_dict['service_name'] = mini_step['route']
                popup_lines_dict['service_direction'] = mini_step['to']['name']

            points.append([start, end])
            popups_points.append(popup_points_dict)
            lines.append({
                'start': start,
                'end': end,
                'polyline': decode_polyline(mini_step['legGeometry']['points']),
            })
            popups_lines.append(popup_lines_dict) 

        return points, lines, popups_points, popups_lines


class OneMap:
    def __init__(self, api_key):
        self.__key = api_key

    def get_directions(self, start, end, routeType = 'pt', mode = 'TRANSIT', date = '2017-02-03', time = '07:35:00', maxWalkDistance = 1000, **kwargs):
        if date is None:
            date = datetime.date().strftime("%Y-%m-%\d")
            
        if time is None:
            time = datetime.time().strftime("%H:%M:%S")
            
        if routeType == 'pt':
          result = requests.get(f'https://developers.onemap.sg/privateapi/routingsvc/route?start={start[0]},{start[1]}&end={end[0]},{end[1]}&routeType={routeType}&token={self.__key}&date={date}&time={time}&mode={mode}&maxWalkDistance={str(maxWalkDistance)}&numItineraries=3')
        else:
          result = requests.get(f'https://developers.onemap.sg/privateapi/routingsvc/route?start={start[0]},{start[1]}&end={end[0]},{end[1]}&routeType={routeType}&token={self.__key}')

        result = result.json()
        
        if 'error' not in result.keys():
            direction = Direction(result, routeType)
            return direction
        else:
            return None

def decode_polyline(polyline_str: str):
    index, lat, lng = 0, 0, 0
    coordinates = []
    changes = {'latitude': 0, 'longitude': 0}

    # Coordinates have variable length when encoded, so just keep
    # track of whether we've hit the end of the string. In each
    # while loop iteration, a single coordinate is decoded.
    while index < len(polyline_str):
        # Gather lat/lon changes, store them in a dictionary to apply them later
        for unit in ['latitude', 'longitude']: 
            shift, result = 0, 0

            while True:
                byte = ord(polyline_str[index]) - 63
                index+=1
                result |= (byte & 0x1f) << shift
                shift += 5
                if not byte >= 0x20:
                    break

            if (result & 1):
                changes[unit] = ~(result >> 1)
            else:
                changes[unit] = (result >> 1)

        lat += changes['latitude']
        lng += changes['longitude']

        coordinates.append((lat / 100000.0, lng / 100000.0))
    return coordinates
