const request = require('supertest');
const server = require('../server.js');
const db = require('../data/dbConfig.js');


describe('server.js', () => {
  describe('recipe route', () => {
    it('should return an OK status code from the recipes route', () => {
      let expectedStatusCode = 200;
      let response;
      return request(server).get('/recipes/').then(res => {
        response = res;
        expect(response.status).toEqual(expectedStatusCode);
      });
    });
    it('should return a JSON object from a specific recipe route', async () => {
      const expectedBody = {
        id: 2,
        title: "Cereal",
        minutes: 45,
        img: "https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg",
        ingredients: [
            {
                name: "cheerios",
                quantity: 2,
                unit: "cup"
            },
            {
                name: "milk",
                quantity: 1,
                unit: "cup"
            }
        ],
        steps: [
            {
                ordinal: 1,
                body: "pour your crunchy people food into a bowl"
            },
            {
                ordinal: 2,
                body: "smother your crunchy people food with processed cows lacrimal essence"
            },
            {
                ordinal: 3,
                body: "shovel your milky people food into your mouth in easy to manage bite-sized spoonfuls"
            }
        ],
        notes: "Cereal is one the most delicate and complex recipes known throughout the history of mankind...",
        categories: [
            "breakfast",
            "people food",
            "dairy",
            "quick meals"
        ],
        total_saves: 3,
        innovator: null,
        ancestor: null,
        innovator_name: null
    };
      const response = await request(server).get('/recipes/2');
      expect(response.body).toEqual(expectedBody);
    });
  });
});