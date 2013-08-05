var restify = require('restify')
  , locations = require('./routes/locations')
  , neighborhoods = require('./routes/neighborhoods')
  , invalid = require('./routes/invalid');

var server = restify.createServer();

server.get('/v1/neighborhoods/:name', neighborhoods.get);
server.get(/^(\/v1\/locations\/)(\d+\.?(?=\d)\d*,-\d+\.?(?=\d)\d*$)/, locations.get);
server.get('/v1/locations/:coords', invalid.respond);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});