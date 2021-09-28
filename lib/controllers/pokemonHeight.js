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
  })
  .get('/', async (req, res, next) => {
    try {
      const pokemon = await Height.getAll();
      res.send(pokemon);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const pokemon = await Height.getById(id);
      res.send(pokemon);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const pokemon = await Height.update(id, req.body);
      res.send(pokemon);
    } catch (error) {
      next(error);
    }
  });
