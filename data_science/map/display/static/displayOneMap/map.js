const copy = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });

var polyline = JSON.parse(document.getElementById("polyline").textContent);
var popup_lines = JSON.parse(document.getElementById("popup_lines").textContent);
var popup_points = JSON.parse(document.getElementById("popup_points").textContent);
var points = JSON.parse(document.getElementById("points").textContent);

var map = L.map("map", { layers: [osm] }).setView([1.342816, 103.810216], 12);

var startMarker = L.marker(polyline[0][0], {radius: 200}).addTo(map); 
var endMarker = L.marker(polyline[polyline.length-1][polyline[polyline.length-1].length - 1], {radius: 200}).addTo(map);

startMarker.bindTooltip('You are here!')
endMarker.bindTooltip('Recycling Bin')

for (let x = 0; x < polyline.length; x++) {
    var mode = popup_lines[x]['mode']
    var dist = parseFloat(popup_lines[x]['distance']).toFixed(0).toString()
    var time = parseFloat(popup_lines[x]['duration']/60).toFixed(0).toString()
    
    var content = `<p>Distance: ${dist}m<br />Travel Time: ${time}mins<br />Travel Mode: ${mode}`

    var color;

    switch (mode) {
        case "WALK":
            color = 'red';
            break;
        case "BUS":
            color = 'blue';
            var service_name = popup_lines[x]['service_name']
            var service_direction = popup_lines[x]['service_direction']
            content += `<br />Take ${service_name} in the direction of ${service_direction} for ${popup_lines[x]['num_stops']} stops.`;
            break;
        case "CYCLE":
            color = 'green';
            break;
        case "DRIVE":
            color = 'gray';
            break;
        default:
            color = 'black';
            break;
    }

    L.polyline(polyline[x], {'color': color}).bindTooltip(content + '<\p>').addTo(map);

}