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
  afterAll(() => {
    pool.end();
  });
});
