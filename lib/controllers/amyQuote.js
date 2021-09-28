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
  });
