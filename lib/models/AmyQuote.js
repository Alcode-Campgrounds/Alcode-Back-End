import pool from '../utils/pool.js';


export default class AmyQuote{
  constructor(row){
    this.id = row.id;
    this.character = row.character;
    this.quote = row.quote;
  }
  static async insert({ character }){
    const { rows } = await pool.query(
      'INSERT INTO amy (character) VALUES ($1, $2) RETURNING *',
      [character]
    );
    return new AmyQuote(rows[0]);
  }
}
