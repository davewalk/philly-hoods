var Hoods = Hoods || {};

(function (Hoods, $) {

  var getCoords = function () {
    _gaq.push(['_trackEvent', 'UserInteraction', 'Button', 'Go!']);
    $('.status').html('<span>Getting your location...</span>');
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        _gaq.push(['_trackEvent', 'Geolocation', 'Success', pos.coords.latitude + ',' + pos.coords.longitude]);
        getNeighborhood([pos.coords.latitude, pos.coords.longitude]);
      },
      function (err) {
        _gaq.push(['_trackEvent', 'Geolocation', 'Error', error.message]);
        $('.status').html('<span>Aww damn, unable to get your location. Please check your geolocation settings and try again.</span>');
      });
  };

  var getNeighborhood = function (coords) {
    $('.status').html('<span>Ok, got your location! Getting your neighborhood...</span>');
    $.ajax({
      url: 'http://api.phillyhoods.net/v1/locations/' + coords[0] + ',' + coords[1],
      dataType: 'json',
      success: displayNeighborhood,
      error: function (jqXHR, textString, errorThrown) {
        if (jqXHR.status === 400) {
          _gaq.push(['_trackEvent', 'GeoNeighborhood', 'Error', jqXHR.status]);
          $('.status').html('<span>Hmm, it doesn\'t appear that you are within Philadelphia city limits.</span>');
        } else {
          _gaq.push(['_trackEvent', 'GeoNeighborhood', 'Error', jqXHR.status]);
          $('.status').html('<span>Aww damn, there seems to be a problem with the API! Please try again later.</span>');
        }
      }
    })
  };

  var displayNeighborhood = function (data) {
    _gaq.push(['_trackEvent', 'GeoNeighborhood', 'Success', data.results.features[0].properties.name]);
    $('.status').html('<span>You are in <b>' + data.results.features[0].properties.name + '</b>!</span>');
    hoodLayer.clearLayers();
    hoodLayer.addData(data.results);
    L.marker([data.request.y, data.request.x]).addTo(hoodLayer);
    map.fitBounds(hoodLayer.getBounds());
  };

  var map = L.map('map', {
    center: new L.LatLng(39.952335,-75.163789),
    zoom: 13,
    maxZoom: 15,
    minZoom: 13,
    attributionControl: false,
    touchZoom: true,
    dragging: true,
    maxBounds: new L.LatLngBounds([39.849719,-75.308533], [40.123346,-74.904785])
  });

  var basemap = new L.TileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}.png');

  var hoodLayer = new L.geoJson();

  basemap.addTo(map);

  map.addLayer(hoodLayer);

  // Feature detection
  if (window.navigator.geolocation) {
    _gaq.push(['_trackEvent', 'FeatureDetection', 'Geolocation', 'Success']);
    $('.btn-go').click(getCoords);
  } else {
    _gaq.push(['_trackEvent', 'FeatureDetection', 'Geolocation', 'Failure']);
    $('.status').html('<span>Your browser does not support geolocation. <a href="http://browsehappy.com/">Please upgrade</a>.</span>');
  }

  if (!'withCredentials' in new XMLHttpRequest()) {
    _gaq.push(['_trackEvent', 'FeatureDetection', 'CORS', 'Failure']);
    $('.status').html('<span>You must <a href="http://browsehappy.com/">upgrade your browser</a> for this sample to work.</span>');
  }

})(Hoods, jQuery);