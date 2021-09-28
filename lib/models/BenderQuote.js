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
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM bender'
    );
    return rows.map(row => {
      return new Quote(row);
    });
  }
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM bender WHERE id = ($1)',
      [id]
    );
    return new Quote(rows[0]);
  }
  static async update(id, { character }, quote){
    const { rows } = await pool.query(
      'UPDATE bender SET character=($1), quote=($2) WHERE id = ($3) RETURNING *',
      [character, quote, id]
    );
    return new Quote(rows[0]);
  }
  static async remove(id){
    const { rows } = await pool.query(
      'DELETE FROM bender WHERE id = ($1) RETURNING *',
      [id]
    );
    return new Quote(rows[0]);
  }
}
