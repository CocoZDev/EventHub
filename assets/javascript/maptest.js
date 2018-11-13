// Google Maps JavaScript API: Customize maps with your own content and imagery for display on web pages and mobile devices - https://developers.google.com/maps/documentation/javascript/tutorial

var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
});
}