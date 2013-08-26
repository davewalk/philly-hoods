var GeoJSON = require('geojson');

exports.parse = function (results, callback) {

  var editedResults = [];

  if (results.length) {
    for (var i = 0; i < results.length; i = i + 1) {
      var result = {};
      result.name = results[i].name;
      result.alias = results[i].alias;
      result.dataset = results[i].dataset;
      result.geometry = JSON.parse(results[i].geometry);
      result.coords = result.geometry.coordinates[0];
      delete result.geometry;
      editedResults.push(result);
    }
  } else {
      results.geometry = JSON.parse(results.geometry);
      results.coords = results.geometry.coordinates[0];
      delete results.geometry;
      editedResults.push(results);
  }

  GeoJSON.parse(editedResults, {'Polygon': 'coords'}, function (result) {
    callback(result);
  });
};