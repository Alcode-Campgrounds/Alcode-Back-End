import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should create a new quote from bender using POST / route', async () => {
    return request(app)
      .post('/api/bender/quote')
      .send({ character: 'bender' })
      .then(res => {
        expect(res.body).toEqual({ id: 1, character: 'bender', quote: expect.any(String) });
      });
      
  });
  afterAll(() => {
    pool.end();
  });
});
