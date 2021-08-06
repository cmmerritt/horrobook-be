import { Router } from 'express';
import Favorite from '../models/Favorite.js';

export default Router()
  .post('/api/v1/favorites', (req, res, next) => {
    Favorite.insert({ ...req.body })
      .then(favorite => res.send(favorite))
      .catch(next);
  })
  .get('/api/v1/favorites/:id', (req, res, next) => {
    Favorite.findById(req.params.id)
      .then(favorite => res.send(favorite))
      .catch(next);
  })
  .get('/api/v1/favorites', (req, res, next) => {
    Favorite.findAll()
      .then(favorite => res.send(favorite))
      .catch(next);
  });

