from xml.dom import minicompat
import googlemaps

"""
{'geocoded_waypoints': [
    {'geocoder_status': 'OK', 
    'place_id': 'ChIJp4zUhgQ92jERlhdtctKU4xo',
     'types': [
        'establishment',
        'point_of_interest', 
        'subway_station', 
        'transit_station'
        ]
    }, 
    {'geocoder_status': 'OK',
        'place_id': 'ChIJI58jtbY92jER55jy0v8etzI', 
        'types': ['premise']
        }], 
'routes': [
    {'bounds': {
        'northeast': {'lat': 1.377987, 'lng': 103.9640615}, 
        'southwest': {'lat': 1.3555013, 'lng': 103.9524593}
        }, 
    'copyrights': 'Map data ©2022 Google', 
    'legs': [
        {'arrival_time': {'text': '11:06pm', 'time_zone': 'Asia/Singapore', 'value': 1662563191}, 
        'departure_time': {'text': '10:39pm', 'time_zone': 'Asia/Singapore', 'value': 1662561578}, 
        'distance': {'text': '4.0 km', 'value': 3964}, 
        'duration': {'text': '27 mins', 'value': 1613}, 
        'end_address': '60 Pasir Ris Drive 3, Singapore 519497', 
        'end_location': {'lat': 1.377987, 'lng': 103.9534441}, 
        'start_address': '394 Tampines Ave 7, Tampines East, Singapore 520394', 
        'start_location': {'lat': 1.3555013, 'lng': 103.9555675}, 
        'steps': [
            {'distance': {'text': '0.3 km', 'value': 302}, 
            'duration': {'text': '4 mins', 'value': 255}, 
            'end_location': {'lat': 1.3566394, 'lng': 103.9573746}, 
            'html_instructions': 'Walk to Opp Blk 390', 
            'polyline': {'points': '{vgGiynyR_A?a@?a@?M?E?M?Ac@A[Cq@?{@?YCa@Ga@EQCMGQISMU'}, 
            'start_location': {'lat': 1.3555013, 'lng': 103.9555675}, 
            'steps': [{
                'distance': {'text': '88 m', 'value': 88}, 
                'duration': {'text': '1 min', 'value': 84}, 
                'end_location': {'lat': 1.3563317, 'lng': 103.9555654}, 
                'html_instructions': 'Head <b>north</b> on <b>Tampines Ave 2</b> toward <b>Tampines Ave 7</b>', 
                'polyline': {'points': '{vgGiynyR_A?a@?a@?M?E?M?'}, 
                'start_location': {'lat': 1.3555013, 'lng': 103.9555675}, 
                'travel_mode': 'WALKING'}, 
                {'distance': {'text': '0.2 km', 'value': 214}, 
                'duration': {'text': '3 mins', 'value': 171}, 
                'end_location': {'lat': 1.3566394, 'lng': 103.9573746}, 
                'html_instructions': 'Turn <b>right</b> onto <b>Tampines Ave 7</b><div style="font-size:0.9em">Destination will be on the left</div>', 
                'maneuver': 'turn-right', 
                'polyline': {'points': 'a|gGiynyRAc@A[Cq@?{@?YCa@Ga@EQCMGQISMU'}, 
                'start_location': {'lat': 1.3563317, 'lng': 103.9555654}, 
                'travel_mode': 'WALKING'}], 
            'travel_mode': 'WALKING'},

            {'distance': {'text': '3.1 km', 'value': 3089}, 
            'duration': {'text': '15 mins', 'value': 878}, 
            'end_location': {'lat': 1.375062, 'lng': 103.95404}, 
            'html_instructions': 'Bus towards Pasir Ris', 
            'polyline': {'points': 'e~gGodoyRJEIQQY[a@g@q@_B}Ae@[}BwBEEmDmDm@k@[Ym@q@YYYYQQKKYWcBaBc@e@IIIGk@k@MMc@e@[]a@a@UUGGUU}AyAeBeBG@G?E?KAG?I@GBIDIHKHSL{BzB_A|@IH_BbBIHgB`BgAfAa@`@OPGDIJWX_@ZSTIJm@t@i@r@eAdBILs@|AQ^e@lAIPELOd@e@`BOn@QbAE\\CNSEqAIkAC]Aq@Ao@A{@?m@@Y@E?[D[Fu@PUFYHqC|@{@TG@]Fa@FY@QBQ?qABU@y@@E?[@u@@sBBVpDDb@PrCDh@TC@N'}, 
            'start_location': {'lat': 1.356669, 'lng': 103.957359}, 
            'transit_details': {
                'arrival_stop': {
                    'location': {'lat': 1.375062, 'lng': 103.95404}, 
                    'name': 'Opp Downtown East'}, 
                'arrival_time': {'text': '10:58pm', 'time_zone': 'Asia/Singapore', 'value': 1662562711}, 
                'departure_stop': {'location': {'lat': 1.356669, 'lng': 103.957359}, 
                'name': 'Opp Blk 390'}, 
                'departure_time': {'text': '10:43pm', 'time_zone': 'Asia/Singapore', 'value': 1662561833}, 
                'headsign': 'Pasir Ris', 
                'headway': 780, 
                'line': {
                    'agencies': [{
                        'name': 'SBS Transit', 'phone': '011 65 1800 225 5663', 'url': 'https://www.sbstransit.com.sg/'
                        }], 
                    'color': '#55dd33', 
                    'name': '21', 
                    'text_color': '#000000', 
                    'vehicle': {'icon': '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png', 'name': 'Bus', 'type': 'BUS'}}, 
                'num_stops': 8}, 
            'travel_mode': 'TRANSIT'}, 
                
            {'distance': {'text': '0.6 km', 'value': 573}, 
            'duration': {'text': '8 mins', 'value': 479}, 
            'end_location': {'lat': 1.377987, 'lng': 103.9534441}, 
            'html_instructions': 'Walk to 60 Pasir Ris Drive 3, Singapore 519497', 
            'polyline': {
                'points': 'oqkGuonyRJzABV@H@NBb@HxA@J@XOBWBG?GAEAGCEAIAKAM?y@BA?a@?c@?K?UCc@CGA]C@a@Bc@AGEIKWa@?Q?QCA?OEQCICWEEA[IA?YKEA[EKC'}, 
                'start_location': {'lat': 1.3751224, 'lng': 103.9540315}, 
                'steps': [
                    {'distance': {'text': '0.2 km', 'value': 172}, 
                    'duration': {'text': '2 mins', 'value': 126}, 
                    'end_location': {'lat': 1.3750126, 'lng': 103.9524846}, 
                    'html_instructions': 'Head <b>west</b> on <b>Pasir Ris Drive 3</b>', 
                    'polyline': {'points': 'oqkGuonyRJzABV@H@NBb@HxA@J@XOB'}, 
                    'start_location': {'lat': 1.3751224, 'lng': 103.9540315}, 
                    'travel_mode': 'WALKING'}, 
                    {'distance': {'text': '0.2 km', 'value': 193}, 
                    'duration': {'text': '3 mins', 'value': 154}, 
                    'end_location': {'lat': 1.3766834, 'lng': 103.9525838}, 
                    'html_instructions': 'Turn <b>right</b>', 
                    'maneuver': 'turn-right', 
                    'polyline': {'points': 'ypkG_fnyRWBG?GAEAGCEAIAKAM?y@BA?a@?c@?K?UCc@CGA]C'}, 
                    'start_location': {'lat': 1.3750126, 'lng': 103.9524846}, 
                    'travel_mode': 'WALKING'}, 
                    {'distance': {'text': '65 m', 'value': 65}, 
                    'duration': {'text': '1 min', 'value': 50}, 
                    'end_location': {'lat': 1.3767516, 'lng': 103.9531368}, 
                    'html_instructions': 'Turn <b>right</b>', 
                    'maneuver': 'turn-right', 
                    'polyline': {'points': 'g{kGsfnyR@a@Bc@AGEIKW'}, 
                    'start_location': {'lat': 1.3766834, 'lng': 103.9525838}, 
                    'travel_mode': 'WALKING'}, 
                    {'distance': {'text': '0.1 km', 'value': 143}, 
                    'duration': {'text': '2 mins', 'value': 149}, 
                    'end_location': {'lat': 1.377987, 'lng': 103.9534441}, 
                    'html_instructions': 'Turn <b>left</b><div style="font-size:0.9em">Destination will be on the right</div>', 
                    'maneuver': 'turn-left', 
                    'polyline': {'points': 'u{kGcjnyRa@?Q?QCA?OEQCICWEEA[IA?YKEA[EKC'}, 
                    'start_location': {'lat': 1.3767516, 'lng': 103.9531368}, 
                    'travel_mode': 'WALKING'}
                ], 
            'travel_mode': 'WALKING'}
        ], 
    'traffic_speed_entry': [], 
    'via_waypoint': []}], 
    'overview_polyline': {
        'points': '{vgGiynyRqC?S?C_ACmBC{@Ms@K_@Wi@E@JE[k@cAsA_B}Ae@[cC}B{EyEiAkAqAqAkDiDcEeEsBoBeBeBG@M?SAQDSN_@V{DxDiBlBqBjByBzBiAfA]`@wAhBoArBeA|BeArCu@pCW`BCNSE}CM{DEgABa@DaCj@mErAe@H{@Hc@BaDFkEFt@rKTC@NK@JzAD`@Dr@JdB@XOB_@BMCMEUCiABeA?a@Ck@E]C@a@Bc@AGQa@s@?SCcAS}@Wm@K'}, 
        'summary': '', 
        'warnings': ['Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths.'], 
        'waypoint_order': []
        }
    ], 
'status': 'OK'
}

"""

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

class GoogleMap:
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


