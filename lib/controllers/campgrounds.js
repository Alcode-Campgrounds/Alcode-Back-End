const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const { fetchCampgroundFacilitiesByState, fetchAllCampgroundFacilities } = require('../utils/campsFetch');


module.exports = Router()
  .get('/facilities/:state', ensureAuth, async (req, res, next) => {
    try {
      const state = req.params.state;
      const campgroundData = await fetchCampgroundFacilitiesByState(state);
      res.send(campgroundData);
    } catch (error) {
      next(error);
    }
  })
  .get('/facilities', ensureAuth, async (req, res, next) => {
    try {
      const campgroundData = await fetchAllCampgroundFacilities();
      res.send(campgroundData);
    } catch (error) {
      next(error);
    }
  });
