const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
// import request from 'supertest';
// import app from '../lib/app.js';

describe('demo routes for weight', () => {
  beforeEach(() => {
    return setup(pool);
  });
 
  it('set up test', () => {
    expect(1).toEqual(1);
  });


  
  afterAll(() => {
    pool.end();
  });
});
