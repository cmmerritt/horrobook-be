import request from 'supertest';
import app from '../lib/app.js';
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import Favorite from '../lib/models/Favorite.js';

const frankenstein = {
  title: 'Frankenstein : the 1818 text, contexts, criticism',
  author: 'shelley, mary wollstonecraft',
};

const videogames = {
  title: 'Videogames and the gothic',
  author: 'kirkland, ewan',
};

describe('favorite routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a favorites entry via POST', async() => {
    const res = await request(app)
      .post('/api/v1/favorites')
      .send(frankenstein);
  
    expect(res.body).toEqual({
      id: '1',
      ...frankenstein
    });
  });

  it('gets a favorite by id via GET', async () => {
    const testBook = await Favorite.insert(frankenstein);

    const res = await request(app)
      .get(`/api/v1/favorites/${testBook.id}`);
    
    expect(res.body).toEqual(testBook);
  });

  it('gets all favorites via GET', async () => {
    const testBook1 = await Favorite.insert(frankenstein);
    const testBook2 = await Favorite.insert(videogames);

    const res = await request(app).get('/api/v1/favorites');

    expect(res.body).toEqual([testBook1, testBook2]);
  });

  it('updates favorite by id via PUT', async () => {
    const testBook = await Favorite.insert(videogames);

    const updatedTestBook = {
      title: 'Video games and the gothic',
      author: 'kirkland, ewan',
    };

    const res = await request(app).put(`/api/v1/favorites/${testBook.id}`).send(updatedTestBook);

    expect(res.body).toEqual({ 'id': '1', ...updatedTestBook });
  });

  it('deletes favorite by id via DELETE', async () => {
    const testBook = await Favorite.insert(videogames);
    const res = await request(app).delete(`/api/v1/favorites/${testBook.id}`);
    expect(res.body).toEqual(testBook);
  });
});
