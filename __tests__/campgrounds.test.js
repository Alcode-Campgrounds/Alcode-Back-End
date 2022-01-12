const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

jest.mock('../lib/middleware/ensure-auth.js', () => {
  return (req, res, next) => {
    req.user = {
      name: 'test_user',
      email:'tes_user@gmail.com'
    };
    next();
  };
});


describe('campgrounds information', () => {

  beforeEach(async () => {
    // await request(app)
    //   .post('/api/alcode/auth/signup')
    //   .send({ name: 'Tanner', email: 'Tanner@email.com', password: 'password' });
    // await request(app)
    //   .post('/api/alcode/auth/login')
    //   .send({ email: 'Tanner@email.com', password: 'password' })
    //   .then((response) => {
    //     expect(response.body).toEqual({ id: expect.any(String), name: 'Tanner', email: 'Tanner@email.com' });
    //   });
    return setup(pool);
  });

  it(' should display array of campground data',  async () => {
    const res = await request(app).get('/api/alcode/campgrounds/facilities');
    
    expect(res.body[0]).toEqual({
      facilityID: expect.any(String),
      facilityName: expect.any(String),
      facilityDescription: expect.any(String),
      facilityDirections: expect.any(String),
      facilityPhone: expect.any(String),
      facilityLongitude: expect.any(Number),
      facilityLatitude: expect.any(Number),
    });

  });

  it(' should display array of campground data for one state',  async () => {
    const res = await request(app).get('/api/alcode/campgrounds/facilities/WA');
    
    expect(res.body[0]).toEqual({
      facilityID: expect.any(String),
      facilityName: expect.any(String),
      facilityDescription: expect.any(String),
      facilityDirections: expect.any(String),
      facilityPhone: expect.any(String),
      facilityLongitude: expect.any(Number),
      facilityLatitude: expect.any(Number),
    });

  });



});
