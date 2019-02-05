import 'mocha';

const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../main/index.ts');
const request = supertest(app);

describe('Zones', () => {
  describe('/GET Zones', () => {

    it('it should GET all the zones', (done) => {
      request.get('/zones')
        .expect(200)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.eql(2);
          done();
        });
    });
  });

});
