var PORT = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT  || 8080;

var restify = require('restify')
  , locations = require('./routes/locations')
  , neighborhoods = require('./routes/neighborhoods')
  , invalid = require('./routes/invalid');

var server = restify.createServer({name: 'philly-hoods'});

server.get('/', function (req, res, next) { res.json(200, {application: 'Philly-Hoods', versions: ['v1'] }); });

server.get('/v1/', function (req, res, next) {
  res.json(200, { application: 'Philly-Hoods',
    version: '1',
    endpoints: ['/neighborhoods', '/locations']
    }
  );
});

server.get('/v1/neighborhoods/:name', neighborhoods.get);

server.get(/^(\/v1\/locations\/)(\d+\.?(?=\d)\d*,-\d+\.?(?=\d)\d*$)/, locations.get);

server.get('/v1/locations/:coords', invalid.respond);

server.listen(PORT, function () {
  console.log('%s listening at %s', 'Philly Neighborhoods API', server.url);
});