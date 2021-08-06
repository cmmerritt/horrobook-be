import request from 'supertest';
import app from '../lib/app.js';
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import Favorite from '../lib/models/Favorite.js';

const delicateDependency = {
  title: 'The Delicate Dependency',
  author: 'Michael Talbot',
  imageUrl: 'imageurl',
  infoUrl: 'infourl',
  pubDate: '1982-03-28'
};

describe('favorite routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a favorites entry via POST', async() => {
    const res = await request(app)
      .post('/api/v1/favorites')
      .send(delicateDependency);
  
    expect(res.body).toEqual({
      id: '1',
      ...delicateDependency
    });
  });

  it('gets a dollhouse by id via GET', async () => {
    const testBook = await Favorite.insert(delicateDependency);

    const res = await request(app)
      .get(`/api/v1/favorites/${testBook.id}`);
    
    expect(res.body).toEqual(testBook);
  });

});
