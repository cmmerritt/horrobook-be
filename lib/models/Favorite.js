import pool from '../utils/pool.js';

export default class Favorite {
  id;
  title;
  author;
  locId

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.locId = row.loc_id
  }

  static async insert({ title, author, locId }) {
    const { rows } = await pool.query(
      'INSERT INTO favorites (title, author, loc_id) VALUES ($1, $2, $3) RETURNING *', [title, author, locId]
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
    const { rows } = await pool.query('UPDATE favorites SET title = $1, author = $2, loc_id = $3 WHERE id = $4 RETURNING *', [favorite.title, favorite.author, favorite.locId, id]);
    return new Favorite(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM favorites WHERE id = $1 RETURNING *', [id]);
    return new Favorite(rows[0]);
  }
}
