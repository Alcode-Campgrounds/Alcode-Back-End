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
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM amy WHERE id = ($1)',
      [id]
    );
    return new AmyQuote(rows[0]);
  }
  static async update(id, { character }, quote){
    const { rows } = await pool.query(
      'UPDATE amy SET character=($1), quote=($2) WHERE id = ($3) RETURNING *',
      [character, quote, id]
    );
    return new AmyQuote(rows[0]);
  }
  static async remove(id){
    const { rows } = await pool.query(
      'DELETE FROM amy WHERE id = ($1) RETURNING *',
      [id]
    );
    return new AmyQuote(rows[0]);
  }
}
