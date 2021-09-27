import { Router } from 'express';
import Weight from '../models/Weight.js';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const pokemon = await Weight.insert(req.body);
      res.json(pokemon);
    } catch (err) {
      next(err);
    }
  });

