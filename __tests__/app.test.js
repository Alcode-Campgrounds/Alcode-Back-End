import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(() => {
    return request(app)
      .post('/api/pokemon/weight')
      .send({ name: 'gengar', weight: 405 });
  });
  it('should return a pokemon name based on the id of the pokemon', () => {
    return request(app)
      .post('/api/pokemon/weight')
      .send({ name: 'haunter', weight: 1 })
      .then(res => {
        expect(res.body).toEqual({ id: expect.any(Number), name: 'haunter', weight: 1 });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
