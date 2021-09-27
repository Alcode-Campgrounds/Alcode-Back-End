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
  })
  .get('/', async (req, res, next) => {
    try {
      const pokemon = await Ability.getAll();
      res.send(pokemon);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const pokemon = await Ability.getById(id);
      res.send(pokemon);
    } catch (error) {
      next(error);
    }
  });
