var should = require('should')
  , assert = require('assert')
  , request = require('supertest')
  , sleep = require('sleep');

if (process.env.PHILLYHOODS_APP === 'development') {
  var url = 'http://0.0.0.0:8080';
} else {
  var url = 'http://api.phillyhoods.net';
}

describe('/locations', function () {
  it('should return the correct neighborhood for passed coords', function (done) {
    request(url)
      .get('/v1/locations/39.96652173938672,-75.17120361328125')
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.results.features[0].properties.name.should.equal('Spring Garden');
        res.body.results.features[0].geometry.coordinates[0].should.have.length(35);
        res.should.have.status(200);
        res.headers.should.have.property('access-control-allow-origin').and.equal('*');
        done();
      });
  });

  it('should return a 400 status code for coords outside of Philadelphia', function (done) {
    request(url)
      .get('/v1/locations/37.7749295,-122.4194155')
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(400);
        res.headers.should.have.property('access-control-allow-origin').and.equal('*');
        res.body.results.error.message.should.equal('Coordinates requested aren\'t within Philadelphia');
        done();
      });
  });

  it('should return a 400 for non-coordinate values in route', function (done) {
    request(url)
      .get('/v1/locations/junk')
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(400);
        res.body.error.should.equal('Not a valid coordinate pair');
        res.headers.should.have.property('access-control-allow-origin').and.equal('*');
        done();
      });
  });
});

describe('/neighborhoods', function () {

    beforeEach(function () {
      sleep.sleep(1);
    });

    it('should return a GeoJSON object for the passed neighorhood name', function (done) {
      request(url)
        .get('/v1/neighborhoods/bella vista')
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.results.features[0].geometry.coordinates[0].should.have.length(33);
          res.body.results.type.should.equal('FeatureCollection');
          res.body.results.features[0].properties.alias.should.equal('BELLA_VISTA');
          res.headers.should.have.property('access-control-allow-origin').and.equal('*');
          res.should.have.status(200);
          done();
        });
    });

    it('should return multiple results if necessary', function (done) {
      request(url)
        .get('/v1/neighborhoods/germantown')
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.results.features.should.have.length(6);
          res.headers.should.have.property('access-control-allow-origin').and.equal('*');
          res.should.have.status(200);
          done();
        });
    });

    it('should return empty results when there\'s no match', function (done) {
      request(url)
        .get('/v1/neighborhoods/junk')
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.results.should.have.length(0);
          res.headers.should.have.property('access-control-allow-origin').and.equal('*');
          res.should.have.status(200);
          done();
        });
    });

    it('should return a list of neighborhoods', function (done) {
      request(url)
        .get('/v1/neighborhoods')
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.results.should.have.length(158);
          res.headers.should.have.property('access-control-allow-origin').and.equal('*');
          res.should.have.status(200);
          done();
        });
    });
});