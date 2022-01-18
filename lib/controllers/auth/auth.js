const { Router } = require('express');
const UserService = require('../../services/UserServices');
const { getGoogleAuthURL } = require('../../utils/authHelper');
const ensureAuth = require('../../middleware/ensure-auth.js');

module.exports =  Router()
  .get('/login', async (req, res, next) => {
    try {
      const googleAuthURL = await getGoogleAuthURL();
      res.redirect(googleAuthURL);
    } catch (error) {
      next(error);
    }
  })
  .get('/login/callback', async (req, res, next) => {
    try {
      const code = req.query.code;
      const user = await UserService.createOauth(code);

      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        sameSite: process.env.SECURE_COOKIES ? 'none' : 'lax',
        secure: process.env.SECURE_COOKIES 
      });

      res.redirect(process.env.GOOGLE_CALLBACK_URI);
    } catch (error) {
      next(error);
    }
  })
  .get('/login/user', ensureAuth, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  })

  .post('/signup', async (req, res, next) => {
    try {
      const signupUser = await UserService.create(req.body);
      res.cookie('session', signupUser.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        sameSite: process.env.SECURE_COOKIES ? 'none' : 'lax',
        secure: process.env.SECURE_COOKIES 
      });
        
      res.send(signupUser);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })
  .post('/login', async (req, res, next) => {
    try {
      const loginUser = await UserService.credential(req.body);  
      res.cookie('session', loginUser.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        sameSite: process.env.SECURE_COOKIES ? 'none' : 'lax',
        secure: process.env.SECURE_COOKIES 
      });
      res.send(loginUser);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  })
  .get('/logout', async (req, res, next) => {
    try {
      res.clearCookie('session', {
        httpOnly: true,
        sameSite: process.env.SECURE_COOKIES ? 'none' : 'lax',
        secure: process.env.SECURE_COOKIES 
      });
      res.send('Thanks for stopping by!');
    } catch (error) {
      next(error);
    }
  });
