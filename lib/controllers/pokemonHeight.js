import { Router } from 'express';
import Height from '../models/Height.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const pokemon = await Height.insert(req.body);
      res.send(pokemon);
    } catch (error) {
      next(error);
    }
  });
