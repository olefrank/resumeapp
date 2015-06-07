'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var req = "/api/scrape";

describe('POST ' + req, function() {

  it('should respond with status 200', function(done) {
    request(app)
      .post(req)
      .expect(201)
      //.expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        //res.body.should.be.instanceof(Array);
        done();
      });
  });
});