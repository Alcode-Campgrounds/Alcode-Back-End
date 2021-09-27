import { Router } from 'express';
import Weight from '../models/Weight.js';
import fetchWeight from '../utils/fetchWeight.js';

export default Router()
  .post('/', async (res, req, next) => {
    try {
      const api = fetchWeight();
      const pokemon = await Weight.insert(api);
      res.send(pokemon);
    } catch (err) {
      next(err);
    }
  });

