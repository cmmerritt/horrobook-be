import request from 'supertest';
import app from '../lib/app.js';
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import Favorite from '../lib/models/Favorite.js';

describe('favorite routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a favorites entry via POST', async() => {
    const res = request(app)
      .post('/api/v1/favorites')
      .send({
        title: 'The Delicate Dependency',
        author: 'Michael Talbot',
        imageUrl: 'image',
        infoUrl: 'infourl',
        pubDate: 'date'
      });
  
    expect(res.body).toEqual({
      id: '1',
      title: 'The Delicate Dependency',
      author: 'Michael Talbot',
      imageUrl: 'imageurl',
      infoUrl: 'infourl',
      pubDate: '1982-03-28'
    });
  });

});
