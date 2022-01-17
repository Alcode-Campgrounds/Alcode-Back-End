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
jest.setTimeout(30000);
describe('campgrounds information', () => {

  beforeEach(() => {
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
    const res = await request(app).get('/api/alcode/campgrounds/facilities/MT');
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
  it('should return an object with campground info and images', async () => {
    const res = await request(app).get('/api/alcode/campgrounds/facility/10000305');
    expect(res.body).toEqual({
      facilityID: expect.any(String),
      facilityName: expect.any(String),
      facilityDescription: expect.any(String),
      facilityDirections: expect.any(String),
      facilityPhone: expect.any(String),
      facilityEmail: expect.any(String),
      reservable: expect.any(Boolean),
      imageArray: expect.arrayContaining([expect.any(String)])
    });
  });

  afterAll(() => {
    pool.end();
  });

});
