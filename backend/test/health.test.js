const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('GET /health', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/health')
      .expect(200)
      .end((err, res) => {
        if (err) {return done(err);}
        expect(res.text).to.equal('OK');
        done();
      });
  });
});
