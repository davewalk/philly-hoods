var pg = require('pg');

var connString = 'postgres://vagrant:vagrant@localhost:5432/philly_hoods';

exports.fromCoords = function(x, y, callback) {

  // console.log('in fromCoords');
  // console.log(x);
  // console.log(y);

  var client = new pg.Client(connString);

  var query = "SELECT name, alias, ST_AsGeoJSON(geom) as geometry FROM hoods WHERE ST_Contains(geom, ST_GeomFromText('POINT(" + x + " " + y + ")'));";

  console.log(query);
  client.connect(function (err) {
    if (err) return callback('Could not connect to the database:', err);

    client.query(query, function (err, result) {
      if (err) {
        client.end();
        return callback('Error running query:', err);
      }

      client.end();
      callback(null, result.rows[0]);
    });
  });
};

exports.fromName = function (name, callback) {

  var client = new pg.Client(connString);

  var query = "SELECT name, alias, ST_AsGeoJSON(geom) as geometry FROM hoods WHERE alias LIKE '%" + name + "%';";
  console.log(query);

  console.log('in fromName');
  console.log(name);

  client.connect(function (err) {
    if (err) return callback('Could not connect to the database:', err);

    client.query(query, function (err, result) {
      if (err) {
        client.end();
        console.log(err);
        return callback('Error running query:', err);
      }

      client.end();
      callback(null, result.rows);
    });
  });
};