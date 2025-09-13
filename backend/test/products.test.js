const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const db = require('../model');

describe('GET /products', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    await db.products.create({
      name: 'Test Product 1',
      price: 10.00,
    });
    await db.products.create({
      name: 'Test Product 2',
      price: 20.00,
    });
  });

  it('should return all products', (done) => {
    request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        if (err) {return done(err);}
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        expect(res.body[0].name).to.equal('Test Product 1');
        done();
      });
  });
});
