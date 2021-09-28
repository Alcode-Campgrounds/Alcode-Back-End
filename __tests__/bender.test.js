import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    const quotes = [{ character: 'bender' }, { character: 'bender' }];
    await Promise.all(
      quotes.map(quote => {
        return request(app)
          .post('/api/bender/quote')
          .send(quote);
      })
    );
  });

  it('should create a new quote from bender using POST / route', () => {
    return request(app)
      .post('/api/bender/quote')
      .send({ character: 'bender' })
      .then(res => {
        expect(res.body).toEqual({ id: expect.any(Number), character: 'bender', quote: expect.any(String) });
      });
  });
  it('should get all quotes from bender using GET / route', async () => {
    await request(app)
      .post('/api/bender/quote')
      .send({ character: 'bender' });
    return request(app)
      .get('/api/bender/quote')
      .then(res => {
        expect(res.body).toEqual([{ id: 1, character: 'bender', quote: expect.any(String) }, { id: 2, character: 'bender', quote: expect.any(String) }, { id: 3, character: 'bender', quote: expect.any(String) }]);
      });
  });
  afterAll(() => {
    pool.end();
  });
});
