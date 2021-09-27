import { Router } from 'express';
import Ability from '../models/Ability.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const pokemon = await Ability.insert(req.body);
      res.send(pokemon); 
    } catch (error) {
      next(error);
    }
  });
