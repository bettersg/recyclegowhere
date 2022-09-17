from xml.dom import minicompat
import googlemaps


class Direction:
    def __init__(self, json_result):
        
        self.startLoc = json_result[0]['legs'][0]['start_location']
        self.endLoc = json_result[0]['legs'][0]['end_location']
        self.startLocName = json_result[0]['legs'][0]['start_address']
        self.endLocName = json_result[0]['legs'][0]['end_address']

        self.steps = json_result[0]['legs'][0]['steps']
        self.points, self.lines, self.point_data, self.line_data = self.prepare_steps_data()
        """
        print(json_result[0].keys())
        dict_keys(['bounds', 'copyrights', 'legs', 'overview_polyline', 'summary', 'warnings', 'waypoint_order'])
        """
        self.waypoints = json_result[0]['waypoint_order']
        
        self.total_dist = json_result[0]['legs'][0]['distance']
        self.total_duration = json_result[0]['legs'][0]['duration']

        self.distance_breakdown = [x['distance']['text'] for x in self.line_data]
        self.duration_breakdown = [x['duration']['text'] for x in self.line_data]
        self.mode_breakdown = [x['mode'] for x in self.line_data]


    def __repr__(self):
        return f'start: {self.startLocName}\n \
            waypoints: '|'.join({self.waypoints})\n \
            end: {self.endLocName}'

    def calculate_weighted_distance(self, weights):
        pass

    def calculate_carbon_footprint(self, weights = 'default'):
        #kgCO2 per km per pax

        #weights: {'WALKING': 0, 'BUS': 149, 'MRT': 100, 'LRT': , 'DRIVING'}
        if weights == 'default':
            weights = {'WALKING': 0, 'CYCLING': 0, 'TRANSIT': 150, 'BUS': 149, 'MRT': 100, 'LRT': 150, 'DRIVING': 500}
        
        total_cf = 0
        for i in range(len(self.distance_breakdown)):
            d, unit = self.distance_breakdown[i].split(' ')
            d = float(d)
            if unit == 'm':
                d = d/1000

            total_cf += d*weights[self.mode_breakdown[i]]
        return total_cf

    def calculate_cost(self, weights = 'default'):
        if weights == 'default':
            weights = {'WALKING': 0, 'CYCLING': 0, 'BUS': 149, 'TRANSIT': 100, 'MRT': 100, 'LRT': 150, 'DRIVING': 500}
        
        total_cost = 0
        for i in range(len(self.distance_breakdown)):
            d, unit = self.distance_breakdown[i].split(' ')
            d = float(d)
            if unit == 'm':
                d = d/1000

            total_cost += d*weights[self.mode_breakdown[i]]
        return total_cost


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
            start = mini_step['start_location']
            end = mini_step['end_location']
            travel_mode = mini_step['travel_mode']

            popup_points_dict = {}
            popup_lines_dict = {
                'distance': mini_step['distance'],
                'duration': mini_step['duration'],
                'mode': travel_mode
                }
            if travel_mode == 'TRANSIT':
                popup_points_dict['arrival'] = mini_step['transit_details']['arrival_stop']['name']
                popup_points_dict['departure'] = mini_step['transit_details']['departure_stop']['name']
                popup_lines_dict['num_stops'] = mini_step['transit_details']['num_stops']
                popup_lines_dict['service_name'] = mini_step['transit_details']['line']['name']
                popup_lines_dict['service_direction'] = mini_step['transit_details']['headsign']

            points.append([start, end])
            popups_points.append(popup_points_dict)
            lines.append({
                'start': start,
                'end': end,
                'polyline': decode_polyline(mini_step['polyline']['points']),
            })
            popups_lines.append(popup_lines_dict) 

        return points, lines, popups_points, popups_lines

class Map:
    def __init__(self, api_key):
        self.gmaps = googlemaps.Client(key = api_key)

    def get_directions(self, start, end, **kwargs):
        result = self.gmaps.directions(start, end, **kwargs)
        
        if len(result[0]['legs']) > 0:
            direction = Direction(result)
            return direction
        else:
            return None


def decode_polyline(polyline_str):
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


