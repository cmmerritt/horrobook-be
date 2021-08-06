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
}
