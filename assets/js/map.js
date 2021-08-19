

mapboxgl.accessToken = 'pk.eyJ1Ijoibnh0aGExMjMiLCJhIjoiY2tzaXFyODFwMjZubDJ0cWs3cnJrMjlqNiJ9.b0OR0FOu22eviVMmU6Jm-w';
 
var geojson = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [ 80.5966,6.9003]
},
'properties': {
'title': 'Pharm',
'description': 'Hatton'
}
},

{
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [ 80.6337,7.2906]
},
'properties': {
'title': 'Pharm',
'description': 'Kandy'
}
}

]
};
 
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [ 80.7718,7.8731],
zoom: 6
});
 
// add markers to map
geojson.features.forEach(function (marker) {
// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';
 
// make a marker for each feature and add it to the map
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.setPopup(
new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML(
'<h3>' +
marker.properties.title +
'</h3><p>' +
marker.properties.description +
'</p>'
)
)
.addTo(map);
});
map.scrollZoom.disable();