var db = require('../lib/db');

exports.get = function (req, res, next) {

  var coords = req.params[1];

  var x = coords.split(',')[1];
  var y = coords.split(',')[0];

  db.fromCoords(x, y, function (err, result) {
    if (err) {
      res.send(500, {error: 'Error attempting to get neighborhood: ' + err});
    } else {
      if (!result) {
        res.send(400, {request: { x: x, y: y }, results: { error: { message: 'Coordinates requested aren\'t within Philadelphia' }}});
      } else {
      res.send(200, {request: { x: x, y: y }, results: result});
      }
    }

  });
  return next();
};