var db = require('../lib/db');

exports.get = function (req, res, next) {

  var editedName = req.params.name.toUpperCase();
  var editedName = editedName.replace(' ', '_');
  db.fromName(editedName, function (err, result) {
    if (err) {
      res.json(500, {error: 'Error attempting to get neighborhood: ' + err});
    } else {
      res.json(200, {request: { neighborhood: req.params.name }, results: result});
    }
  });
  return next();
};

exports.list = function (req, res, next) {
  db.list(function (err, result) {
    if (err) {
      res.json(500, {error: 'Error attempting to get neighborhoods'});
    } else {

      var results = [];

      for (var key in result) {
        var val = result[key]['name'];
        console.log(val);
        results.push(val);
      }
      res.json(200, {request: 'neighborhoods', results: results});
    }
  });
  return next();
};