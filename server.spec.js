const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status code from the index route', () => {
          let response;
          return request(server).get('/').then(res => {
          response = res;
          expect(response.status).toEqual(expectedStatusCode);
          })
        })
    })
})