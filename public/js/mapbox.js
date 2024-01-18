/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFnZW5hLWphZG8iLCJhIjoiY2xteXA3NTRiMDZ3ZDJqbGtreDR5ZXp1cyJ9.0F-gtJRb45WF3Y59qZ3a0Q';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hagena-jado/clmypnrqp02ry01nz8gre8j8g',
  scrollZoom: false,
  //   center: [-118.113491, 34.111745],
  //   zoom: 10,
  //   interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<P>Day ${loc.day}: ${loc.description}</P>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
