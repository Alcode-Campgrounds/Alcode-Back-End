import { Router } from 'express';
import AmyQuote from '../models/AmyQuote.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const object = await AmyQuote.insert(req.body);
      res.send(object);
    } catch (error) {
      next(error);
    }
  });
