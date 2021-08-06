import { Router } from 'express';
import Favorite from '../models/Favorite.js';

export default Router()
  .post('/api/v1/favorites', (req, res, next) => {
    Favorite.insert({ ...req.body })
      .then(favorite => res.send(favorite))
      .catch(next);
  });
