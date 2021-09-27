import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import fetchAbility from '../lib/utils/fetchAbility.js';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    return request(app)
      .post('/api/pokemon/ability')
      .send(await fetchAbility());
  });
  it('should return a pokemon name and ability using POST route', () => {
    return request(app)
      .post('/api/pokemon/ability')
      .send({ pokemon: 'meowth', powers: 'pickup' })
      .then(response => {
        expect(response.body).toEqual({ id: expect.any(Number), pokemon: 'meowth', powers: 'pickup' });
      });
  });
  it('should return all pokemon using GET / route', async () => {
    await request(app)
      .post('/api/pokemon/ability')
      .send({ pokemon: 'meowth', powers: 'pickup' });
    return request(app)
      .get('/api/pokemon/ability')
      .then(response => {
        expect(response.body).toEqual([{ id: 1, pokemon: 'venonat', powers: 'compound-eyes' }, { id: 2, pokemon: 'meowth', powers: 'pickup' }]);
      });
  });
  it('should return a pokemon by its id using GET /:id route', async () => {
    await request(app)
      .post('/api/pokemon/ability')
      .send({ pokemon: 'meowth', powers: 'pickup' });
    return request(app)
      .get('/api/pokemon/ability/2')
      .then(response => {
        expect(response.body).toEqual({ id: 2, pokemon: 'meowth', powers: 'pickup' });
      });
  });
  afterAll(() => {
    pool.end();
  });
});
