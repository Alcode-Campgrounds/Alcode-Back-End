import pool from '../utils/pool.js';


export default class AmyQuote{
  constructor(row){
    this.id = row.id;
    this.character = row.character;
    this.quote = row.quote;
  }
  static async insert({ character }, quote){
    const { rows } = await pool.query(
      'INSERT INTO amy (character, quote) VALUES ($1, $2) RETURNING *',
      [character, quote]
    );
    return new AmyQuote(rows[0]);
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM amy'
    );
    return rows.map(row => {
      return new AmyQuote(row);
    });
  }
}
