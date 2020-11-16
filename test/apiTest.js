//set the env variable to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

const should = chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('Reckon Integration', () => {
  /*
    GET The configurations
  */
  describe("GET /", () => {
    it("it should fetch If the number is wholly divisibele ", (done) => {    
      chai.request(server)
        .get('/')
        .end((err, response) => {
          response.should.have.status(200);
        done();
        })
    })
  })

  /*
    Merchant site makes and receives an order-token
  */
  describe("GET /textToSearch", () => {
  it("It should all the occurrences of a particular set of characters in a string", (done) => {    
    chai.request(server)
      .get('/textToSearch')
      .end((err, response) => {
        response.should.have.status(200);
      done();
      })
    })
  })
});