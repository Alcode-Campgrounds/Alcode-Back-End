import { Router } from 'express';
import AmyQuote from '../models/AmyQuote.js';
import fetchAmyQuote from '../utils/fetchAmyQuote.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await fetchAmyQuote();
      const object = await AmyQuote.insert(req.body, quote);
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const object = await AmyQuote.getAll();
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const object = await AmyQuote.getById(id);
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const quote = fetchAmyQuote();
      const object = await AmyQuote.update(id, req.body, quote);
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const object = await AmyQuote.remove(id);
      res.send(object);
    } catch (error) {
      next(error);
    }
  });
