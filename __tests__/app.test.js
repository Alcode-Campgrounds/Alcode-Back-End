import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import fetchWeight from '../lib/utils/fetchWeight.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    return request(app)
      .post('/api/pokemon/weight')
      .send(await fetchWeight());
  });
  it('should return a pokemon name based on the id of the pokemon', () => {
    return request(app)
      .post('/api/pokemon/weight')
      .send({ pokemon: 'haunter', pounds: 1 })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({ id: expect.any(Number), pokemon: 'haunter', pounds: 1 });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
