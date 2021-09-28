import { Router } from 'express';
import fetchBenderQuote from '../utils/fetchBenderQuote.js';
import Quote from '../models/Quote.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await fetchBenderQuote();
      const object = await Quote.create(req.body, quote);
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const object = await Quote.getAll();
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const object = await Quote.getById(id);
      res.send(object);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const quote = await fetchBenderQuote();
      const object = await Quote.update(id, req.body, quote);
      res.send(object);
    } catch (error) {
      next(error);
    }
  });
