import pool from '../utils/pool.js';

export default class Favorite {
  id;
  title;
  author

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author
  }

  static async insert({ title, author }) {
    const { rows } = await pool.query(
      'INSERT INTO favorites (title, author) VALUES ($1, $2) RETURNING *', [title, author]
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
    const { rows } = await pool.query('UPDATE favorites SET title = $1, author = $2 WHERE id = $3 RETURNING *', [favorite.title, favorite.author, favorite. id]);
    return new Favorite(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM favorites WHERE id = $1 RETURNING *', [id]);
    return new Favorite(rows[0]);
  }
}
