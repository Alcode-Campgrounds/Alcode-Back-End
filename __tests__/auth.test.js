const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('lab-16-authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should post a user using /signup route', async () => {
    return request(app)
      .post('/api/alcode/auth/signup')
      .send({ name: 'Tanner', email: 'Tanner@email.com', password: 'password' })
      .then((response) => {
        expect(response.body).toEqual({ id: expect.any(String), name: 'Tanner', email: 'Tanner@email.com' });
      });
  });
  it('should login a user using /login route', async () => {
    await request(app)
      .post('/api/alcode/auth/signup')
      .send({ name: 'Tanner', email: 'Tanner@email.com', password: 'password' });
    return request(app)
      .post('/api/alcode/auth/login')
      .send({ email: 'Tanner@email.com', password: 'password' })
      .then((response) => {
        expect(response.body).toEqual({ id: expect.any(String), name: 'Tanner', email: 'Tanner@email.com' });
      });
  });
  afterAll(() => {
    pool.end();
  });
});
