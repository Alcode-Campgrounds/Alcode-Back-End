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
        expect(res.body).toEqual({ id: expect.any(Number), pokemon: 'haunter', pounds: 1 });
      });
  });

  it('should return all pokemon using GET / route', async () => {
    await request(app)
      .post('/api/pokemon/weight')
      .send({ pokemon: 'haunter', pounds: 1 });
    return request(app)
      .get('/api/pokemon/weight')
      .then(res => {
        expect(res.body).toEqual([{ id: 1, pokemon: 'venusaur-mega', pounds: 1555 }, { id: 2, pokemon: 'haunter', pounds: 1 }]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
