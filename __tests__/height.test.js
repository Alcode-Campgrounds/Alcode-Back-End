import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import fetchHeight from '../lib/utils/fetchHeight';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    return request(app)
      .post('/api/pokemon/height')
      .send(await fetchHeight());
  });
  it('should return a pokemon name and length using POST route', () => {
    return request(app)
      .post('/api/pokemon/height')
      .send({ pokemon: 'meowth', length: 22 })
      .then(response => {
        expect(response.body).toEqual({ id: expect.any(Number), pokemon: 'meowth', length: 22 });
      });
  });
  it('should return all pokemon using GET / route', async () => {
    await request(app)
      .post('/api/pokemon/height')
      .send({ pokemon: 'meowth', length: 22 });
    return request(app)
      .get('/api/pokemon/height')
      .then(response => {
        expect(response.body).toEqual([{ id: 1, pokemon: 'articuno', length: 17 }, { id: 2, pokemon: 'meowth', length: 22 }]);
      });
  });
  it('should return a pokemon by id using GET /:id route', async () => {
    await request(app)
      .post('/api/pokemon/height')
      .send({ pokemon: 'meowth', length: 22 });
    return request(app)
      .get('/api/pokemon/height/2')
      .then(response => {
        expect(response.body).toEqual({ id: 2, pokemon: 'meowth', length: 22 });
      });
  });
  it('should update a pokemon by id using PUT /:id route', async () => {
    await request(app)
      .post('/api/pokemon/height')
      .send({ pokemon: 'meowth', length: 22 });
    return request(app)
      .put('/api/pokemon/height/2')
      .send({ pokemon: 'Meowth', length: 122 })
      .then(response => {
        expect(response.body).toEqual({ id: 2, pokemon: 'Meowth', length: 122 });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
