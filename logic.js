mapboxgl.accessToken = 'pk.eyJ1IjoiaGl0ZXNoMTAwIiwiYSI6ImNsN2FmODk3MzB0NGQzdm4wN3g0djBxeWEifQ.MwRXE-jIvxzS3Wlzt_tPSg';
const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/streets-v11', 
  center: [-122.25948, 37.87221], 
  zoom: 12 
});

const marker = new mapboxgl.Marker() 
  .setLngLat([-122.25948, 37.87221]) 
  .addTo(map); 

const geocoder = new MapboxGeocoder({
  
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl, 
  marker: false, 
  placeholder: 'Search for places in Berkeley', 
  bbox: [-122.30937, 37.84214, -122.23715, 37.89838], 
  proximity: {
    longitude: -122.25948,
    latitude: 37.87221
  } 
});


map.addControl(geocoder);

map.on('load', () => {
  map.addSource('single-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': []
    }
  });

  map.addLayer({
    'id': 'point',
    'source': 'single-point',
    'type': 'circle',
    'paint': {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  
  geocoder.on('result', (event) => {
    map.getSource('single-point').setData(event.result.geometry);
  });
});