var PORT = process.env.OPENSHIFT_NODEJS_PORT  || 8080;

if (process.env.PHILLYHOODS_APP === 'development') {
  var IP = '0.0.0.0';
} else {
  var IP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
  require('strong-agent').profile(
    process.env.NODEFLY,
    'philly-hoods'
  );
}

var restify = require('restify')
  , locations = require('./routes/locations')
  , neighborhoods = require('./routes/neighborhoods')
  , invalid = require('./routes/invalid')
  , bunyan = require('bunyan');

var logger = bunyan.createLogger({
  name: 'philly-hoods',
  streams: [
    {
      level: 'debug',
      path: './logs/philly-hoods.log'
    }
  ],
  serializers: restify.bunyan.serializers,
});

var server = restify.createServer({
  name: 'philly-hoods',
  log: logger
});

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/', function (req, res, next) { res.send(200, {application: 'Philly-Hoods', versions: ['v1'] }); });

server.get('/v1/', function (req, res, next) {
  res.send(200, { application: 'Philly-Hoods',
    version: '1',
    endpoints: ['/neighborhoods', '/locations']
    }
  );
});

server.get('/v1/neighborhoods/', neighborhoods.list);

server.get('/v1/neighborhoods/:name', neighborhoods.get);

server.get(/^(\/v1\/locations\/)(\d+\.?(?=\d)\d*,-\d+\.?(?=\d)\d*$)/, locations.get);

server.get('/v1/locations/:coords', invalid.respond);

server.listen(PORT, IP, function () {
  console.log('%s listening at %s', server.name, server.url);
  logger.info('%s listening at %s', server.name, server.url);
});

server.pre(function (req, res, next) {
  req.log.info({req: req}, 'start');
  return next();
});

server.on('after', function (req, res, route) {
  res.log.info({res: res}, 'finished');
});