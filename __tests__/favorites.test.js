const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

jest.mock('../lib/middleware/ensure-auth.js', () => {
  return (req, res, next) => {
    req.user = {
      name: 'test_user',
      email:'test_user@gmail.com'
    };
    next();
  };
});
jest.setTimeout(30000);

describe('Favorites', () => {

  beforeEach(() => {
    return setup(pool);
  });

  it('should add a favorite campground',  async () => {
    await request(app)
      .post('/api/alcode/auth/signup')
      .send({ name:'test_user', email:'test_user@gmail.com', password: 'password' });


    const res = await request(app).post('/api/alcode/favorites/addfavorite').send({
      user_email:'test_user@gmail.com',
      facility_id:'556898765hr4',
      facility_name:'La calabera',
      facility_description:'nice  place to go hiking and camping',
      facility_directions:'Go around the corner, you will see a liquor store, and that is not the right direction, then go left and you will find highway 69 and go straight for 420 miles.',
      facility_phone:'720-890-6789',
      facility_email:'twinpeaks@gmail.com',
      reservable:true,
      images: ['view.png', 'tacos.png', 'burritos.png']
    });
    // console.log('body', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      user_email: expect.any(String),
      facility_id: expect.any(String),
      facility_name: expect.any(String),
      facility_description: expect.any(String),
      facility_directions: expect.any(String),
      facility_phone: expect.any(String),
      facility_email: expect.any(String),
      reservable: expect.any(Boolean),
      images: expect.any(Array)
    });
  });
  //   it(' should display array of campground data for one state',  async () => {
  //     const res = await request(app).get('/api/alcode/campgrounds/facilities/MT');
  //     expect(res.body[0]).toEqual({
  //       facilityID: expect.any(String),
  //       facilityName: expect.any(String),
  //       facilityDescription: expect.any(String),
  //       facilityDirections: expect.any(String),
  //       facilityPhone: expect.any(String),
  //       facilityLongitude: expect.any(Number),
  //       facilityLatitude: expect.any(Number),
  //     });
  //   });

  afterAll(() => {
    pool.end();
  });

});
