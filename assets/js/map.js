mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGFydTA5IiwiYSI6ImNrczc4cWFtbjJvZXoydnFtNmtrNThicXIifQ.s7R1YyvMV0-5mR5uEaAa8w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/outdoors-v11',
center: [80.6337,7.2906],
zoom: 8
});


var new_location = [79.90245608082853,6.738995286668619]; 
var all_location = [[79.90245608082853,6.738995286668619],[80.41261402335014,6.989160901082065],[80.41251167765263, 6.989156875109475],[80.481167765263, 6.989156875109475],[102.84434543000104,36.04349457849256]];
var all_values =[[1,1,1,1,'Panadura','Carrots'],[2,2,2,2,'Kithulgala','Carrots'],[3,3,3,3,'Kithulgala','Rose flower'],[4,4,4,4,'Ginigathhena','Beets'],[5,5,5,5,'China','Carrots']];
var m_mois =0;
var m_temp =0;
var m_hum =0;
var m_lux =0;
var m_location='';
var m_farm='';

function newCoordinate(){
	
	var count =0;
	for (let i = 0; i < all_location.length; i++) {
	if(0.001<Math.abs((all_location[i][0]-new_location[0])) && 0.001<Math.abs((all_location[i][1]-new_location[1])))
		 {
		   count = count+1;
		   console.log(count);
		 }
	}
	console.log(all_location.length);
	if (count==all_location.length){
		all_location[all_location.length+1]=new_location ;
		console.log(all_location);
	}
}



function asign_val(ecordinate){
	for (let i = 0; i < all_location.length; i++) {
	if(0.00001>Math.abs((all_location[i][0]-ecordinate[0])) && 0.00001>Math.abs((all_location[i][1]-ecordinate[1])))
		 {
		  console.log(ecordinate);
		  m_mois = all_values[i][0];
		  m_temp = all_values[i][1];
		  m_hum = all_values[i][2];
		  m_lux = all_values[i][3];
		  m_location = all_values[i][4];
		  m_farm = all_values[i][5];
		 }
	}
}

map.on('load', () => {
// Load an image from an external URL.
map.loadImage(
'https://img.icons8.com/ios-filled/50/000000/marker.png',
(error, image) => {
if (error) throw error;
 
// Add the image to the map style.
map.addImage('n_select', image);
}
);
map.loadImage(
'https://img.icons8.com/ios-filled/50/000000/pointer.png',
(error, image) => {
if (error) throw error;
 
// Add the image to the map style.
map.addImage('y_select', image);
}
);
 
for (let i = 0; i < all_location.length; i++) {
  
		// Add a data source containing one point feature.
		map.addSource('point'+i, {
		'type': 'geojson',
		'data': {
		'type': 'FeatureCollection',
		'features': [
		// cod 1
		{
		'type': 'Feature',
		'geometry': {
		'type': 'Point',
		'coordinates': all_location[i] },
		'properties': {
		'title': 'lc_000'+i}
		},


		]
		}
		});
 
		// Add a layer to use the image to represent the data.
		map.addLayer({
		'id': 'circle'+i,
		'type': 'symbol',
		'source': 'point'+i, // reference the data source
		'layout': {
		'icon-allow-overlap': true,
		'icon-image': 'n_select', // reference the image
		'icon-offset': [0,-20] ,
		'icon-size': 1}

		});
		us_location = all_location[0];
		map.setLayoutProperty('circle0','icon-image','y_select');		
		map.flyTo({center: us_location});
	}


	for (let i = 0; i < all_location.length; i++) {
				var setzoom =20;

				// Center the map on the coordinates of any clicked circle from the 'circle' layer.
				map.on('click', 'circle'+i, (e) => {
				if (map.getZoom()>20){setzoom=map.getZoom();}
				map.flyTo({center: map.getSource(e.features[0].source)._data.features[0].geometry.coordinates,offset:[-80,-100], zoom:setzoom});
				us_location = map.getSource(e.features[0].source)._data.features[0].geometry.coordinates;
				map.setLayoutProperty('circle'+i,'icon-image','y_select');
				// map.setLayoutProperty('circle'+i,'icon-allow-overlap' ,true);
				console.log(`Selected Location: ${us_location}`);
				for (let j = 0; j < all_location.length; j++) {
						if(j!=i){map.setLayoutProperty('circle'+j,'icon-image','n_select');
								 // map.setLayoutProperty('circle'+j,'icon-allow-overlap' ,true);
									}	

					}


				});


				// Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
				map.on('mouseenter', 'circle'+i, (e) => {
				map.getCanvas().style.cursor = 'pointer';
				asign_val(map.getSource(e.features[0].source)._data.features[0].geometry.coordinates);
				console.log(map.getSource(e.features[0].source)._data.features[0].geometry.coordinates);
				popup.setLngLat(map.getSource(e.features[0].source)._data.features[0].geometry.coordinates).setHTML(`
					<div class="widget-container">
					    <div class="top-left">
					      <h1 class="city" id="city">Location</h1>
					      <h2 id="day">`+m_location+`</h2>		      
					    </div>
					    <div class="top-right">
					      <h1 id="weather-status">`+m_farm+` Farm</h1>
					      <img class="weather-icon" src="https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png">
					    </div>
					    <div class="bottom-left">
					      <div class="flex-container">
					        <div class="flex-box">
					          <p class="p1">Moisture</p>
					            <h3 class="celsius">`+m_mois+`</h3>
					            <h3 id="fahrenheit"><small>g/m<sup>3</sup></small></h3>
					        </div>
					        <div class="flex-box">
					            <p class="p1">Temprature</p>
					            <h3 class="celsius">`+m_temp+`</h3>
					            <h3 id="fahrenheit"><small>c</small></h3>
					        </div>
					        <div class="flex-box">
					            <p class="p1">Humidity</p>
					            <h3 class="celsius">`+m_hum+`</h3>
					            <h3 id="fahrenheit"><small>kg<sup>2</sup></small></h3>
					        </div>
					        <div class="flex-box2">
					            <p class="p1">Light</p>
					            <h3 class="celsius">`+m_lux+`</h3>
					            <h3 id="fahrenheit"><small>lx</small></h3>
					        </div>
					      </div>
					    </div>
					</div>
					`
					).addTo(map);
				

				});
				 
				// Change it back to a pointer when it leaves.
				map.on('mouseleave', 'circle'+i, () => {
				map.getCanvas().style.cursor = '';
				popup.remove();
				});


				// map.on('zoomstart', function (e) { map.flyTo({center: e.features[0].geometry.coordinates}); });

				map.on('mousemove',  (e) => {
				 // window.scroll(50, 100);
				 // console.log("ok");
				 // console.log(us_location);
				 // $('html').removeClass('perfect-scrollbar-on');
				 // window.scrollTo(0, 500); 
				 document.getElementById('info').innerHTML =
					// `e.point` is the x, y coordinates of the `mousemove` event
					// relative to the top-left corner of the map.
					JSON.stringify(e.point) +
					'<br />' +
					// `e.lngLat` is the longitude, latitude geographical position of the event.
					JSON.stringify(e.lngLat.wrap());
				 
				});
				const popup = new mapboxgl.Popup({
									closeButton: false,
									closeOnClick: false,
									offset: 10
								})
				
	}
		console.log(`Selected coordinate: ${us_location}`);
		
});

// map.scrollZoom.disable();
document.getElementById("map").addEventListener("mouseover", mouseOver);
document.getElementById("map").addEventListener("mouseout", mouseOut);

function mouseOver() {
  $('html').removeClass('perfect-scrollbar-on');
  document.getElementById("mYdiv").scrollIntoView();
}

function mouseOut() {
  var setzoom=8;
  $('html').addClass('perfect-scrollbar-on');
  document.getElementById("mYdiv").scrollIntoView();
  // var y = window.scrollY;
  // console.log(y);
  // window.scrollTo(y,y)
  // if (map.getZoom()<8){setzoom=map.getZoom();}
  // map.flyTo({zoom:setzoom});
}




