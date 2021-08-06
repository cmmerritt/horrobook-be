import request from 'supertest';
import app from '../lib/app.js';
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';

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

});
