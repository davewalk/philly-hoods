var db = require('../lib/db')
  , geojson = require('../lib/geojson');

exports.get = function (req, res, next) {
  var editedName = req.params.name.toUpperCase();
  var editedName = editedName.replace(' ', '_');
  db.fromName(editedName, function (err, results) {
    if (err) {
      res.send(500, {error: 'Error attempting to get neighborhood: ' + err});
    } else {
        geojson.parse(results, function(result) {
          res.send(200, {request: { neighborhood: req.params.name }, results: result});
        });
    }
  });
  return next();
};

exports.list = function (req, res, next) {
  db.list(function (err, result) {
    if (err) {
      res.send(500, {error: 'Error attempting to get neighborhoods'});
    } else {

      var results = [];

      for (var key in result) {
        var val = result[key]['name'];
        results.push(val);
      }
      res.send(200, {request: 'neighborhoods', results: result});
    }
  });
  return next();
};