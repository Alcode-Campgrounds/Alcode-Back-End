import pool from '../utils/pool';


export default class Height{

  constructor(row){
    this.id = row.id;
    this.pokemon = row.pokemon;
    this.length = row.length;
  }
  static async insert({ pokemon, length }){
    const { rows } = await pool.query(
      'INSERT INTO height (pokemon, length) VALUES ($1, $2) RETURNING *',
      [pokemon, length]
    );
    return new Height(rows[0]);
  }
}
