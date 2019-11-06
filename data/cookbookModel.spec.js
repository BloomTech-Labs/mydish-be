const server = require('../server.js');
const request = require('supertest');
const Cookbook = require('./cookbookModel.js');
const db = require('./dbConfig');

describe('cookbook model', () => {
  beforeEach(async () => {
    await db('saves').del();
  });

  it('should set environment to testing', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('insert() into cookbook', () => {
    it('should insert recipe_id and cook_id into the db', async () => {
      await Cookbook.cookbookInsert({ cook_id: 3, recipe_id: 3 });
      let cookbook = await db('saves');
      console.log(cookbook);
      expect(cookbook).toHaveLength(1);
    });
  });
  describe('cookbook', () => {
    it('get /', async () => {
      const res = await request(server).get('/cookbook/');
      expect(res.status).toBe(501);
    });
  });
  describe('deletes an entry from the cookbook', () => {
    it('should delete an entry on /delete/:recipe_id', async () => {
      //logs a user in
      await request(server).post('/cooks/login').send({ username: 'Yurika', password: 'testpassword3' });
      //deletes the logged in user's cookbook entry by specified recipe ID
      const result = await request(server).delete('/delete/3');
      expect(result.status).toBe(204);
    });
  });
});
