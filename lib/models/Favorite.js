import pool from '../utils/pool.js';

export default class Favorite {
  id;
  title;
  author;
  imageUrl;
  infoUrl;
  pubDate

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.imageUrl = row.image_url;
    this.infoUrl = row.info_url;
    this.pubDate = row.pub_date;
  }

  static async insert({ title, author, imageUrl, infoUrl, pubDate }) {
    const { rows } = await pool.query(
      'INSERT INTO favorites (title, author, image_url, info_url, pub_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, author, imageUrl, infoUrl, pubDate]
    );
    return new Favorite(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM favorites WHERE id = $1', [id]);
    return new Favorite(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM favorites');
    return rows.map(row => new Favorite(row));
  }

  static async update(favorite, id) {
    const { rows } = await pool.query('UPDATE favorites SET title = $1, author = $2, image_url = $3, info_url = $4, pub_date = $5 WHERE id = $6 RETURNING *', [favorite.title, favorite.author, favorite.imageUrl, favorite.infoUrl, favorite.pubDate, id]);
    return new Favorite(rows[0]);
  }
}
