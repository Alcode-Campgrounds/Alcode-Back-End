const { Router } = require('express');
const UserService = require('../../services/UserServices');

module.exports =  Router()

  .post('/signup', async (req, res, next) => {
    try {
      const signupUser = await UserService.create(req.body);
      res.cookie('session', signupUser.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
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
      });
      res.send(loginUser);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  });
