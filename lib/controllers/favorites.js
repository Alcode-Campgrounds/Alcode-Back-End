const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const FavoriteCampground = require('../models/Favorites');

module.exports = Router ()
  .post('/addfavorite', ensureAuth, async (req, res, next) => {
    try {
      const newFavoriteCampGround = await FavoriteCampground.createFavorite({ user_email: req.user.email, ...req.body });
      res.send(newFavoriteCampGround);
    } catch (error) {
      next(error);
    }
  })
  .get('/favoritecampgrounds', ensureAuth, async (req, res, next) => {
    try {
      const allFavoriteCampGrounds = await FavoriteCampground.allFavoriteCampGrounds(req.user.email);
      res.send(allFavoriteCampGrounds);
    } catch (error) {
      next(error);
    }
  });

