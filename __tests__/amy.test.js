import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    const quotes = [{ character: 'amy' }, { character: 'amy' }, { character: 'amy' }];
    await Promise.all(
      quotes.map(quote => {
        return request(app)
          .post('/api/amy/quote')
          .send(quote);
      })
    );
  });

  it('new quote is created under table and character amy using POST / route', () => {
    return request(app)
      .post('/api/amy/quote')
      .send({ character: 'amy' })
      .then(res => {
        expect(res.body).toEqual({ id: expect.any(Number), character: 'amy', quote: expect.any(String) });
      });
  });
  it('should get all 4 quotes from amy using GET / route', async () => {
    await request(app)
      .post('/api/amy/quote')
      .send({ character: 'amy' });
    return request(app)
      .get('/api/amy/quote')
      .then(res => {
        expect(res.body).toEqual([{ id: 1, character: 'amy', quote: expect.any(String) }, { id: 2, character: 'amy', quote: expect.any(String) }, { id: 3, character: 'amy', quote: expect.any(String) }, { id: 4, character: 'amy', quote: expect.any(String) }]);
      });
  });
  it('should get a quote with id of 2 from amy using GET /:id route', async () => {
    return request(app)
      .get('/api/amy/quote/2')
      .then(res => {
        expect(res.body).toEqual({ id: 2, character: 'amy', quote: expect.any(String) });
      });
  });
  it('should update an object from amy using PUT /:id route', async () => {
    return request(app)
      .put('/api/amy/quote/2')
      .send({ character: 'Amy' })
      .then(res => {
        expect(res.body).toEqual({ id: 2, character: 'Amy', quote: expect.any(String) });
      });
  });
  it('should delete an object from amy using DELETE /:id route', async () => {
    return request(app)
      .delete('/api/amy/quote/1')
      .then(res => {
        expect(res.body).toEqual({ id: 1, character: 'amy', quote: expect.any(String) });
      });
  });
  afterAll(() => {
    pool.end();
  });
});
