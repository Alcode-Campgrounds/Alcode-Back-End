import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import fetchWeight from '../lib/utils/fetchWeight.js';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    return request(app)
      .post('/api/pokemon/weight')
      .send(await fetchWeight());
  });

  it('should return a pokemon using a POST / route', () => {
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

  it('should return a single pokemon using GET /:id route', async () => {
    await request(app)
      .post('/api/pokemon/weight')
      .send({ pokemon: 'haunter', pounds: 1 });
    return request(app)
      .get('/api/pokemon/weight/2')
      .then(res => {
        expect(res.body).toEqual({ id: 2, pokemon: 'haunter', pounds: 1 });
      });
  });

  it('returns a corrected version using a PUT route', async () => {
    await request(app)
      .post('/api/pokemon/weight')
      .send({ pokemon: 'haunter', pounds: 1 });
    return request(app)
      .put('/api/pokemon/weight/2')
      .send({ id: 2, pokemon: 'Haunter', pounds: 1 })
      .then(res => {
        expect(res.body).toEqual({ id: 2, pokemon: 'Haunter', pounds: 1 });
      });
  });
  
  it('returns a deleted object using the DELETE /:id route', async () => {
    await request(app)
      .post('/api/pokemon/weight')
      .send({ pokemon: 'haunter', pounds: 1 });
    return request(app)
      .delete('/api/pokemon/weight/1')
      .then(res => {
        expect(res.body).toEqual({ id: 1, pokemon: 'venusaur-mega', pounds: 1555 });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
