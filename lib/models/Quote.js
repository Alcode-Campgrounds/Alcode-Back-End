import pool from '../utils/pool.js';

export default class Quote{
  constructor(row){
    this.id = row.id;
    this.character = row.character;
    this.quote = row.quote;
  }

  static async create({ character }, quote){
    const { rows } = await pool.query(
      'INSERT INTO bender (character, quote) VALUES ($1, $2) RETURNING *',
      [character, quote]
    );
    return new Quote(rows[0]);
  }
}
