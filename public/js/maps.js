mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map
({
  container: "map", // container ID
  center: [74.124, 15.2993], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});
