var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();

chai.use(chaiHttp);

describe('Rooms', function() {
  it('should list Rooms', function(done) {
  chai.request(server)
    .get('/api/boards')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
});