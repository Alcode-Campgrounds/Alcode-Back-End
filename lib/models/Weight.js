import pool from '../utils/pool.js';


export default class Weight {
  constructor(row){
    this.id = row.id;
    this.pokemon = row.pokemon;
    this.pounds = row.pounds;
  }

  static async insert({ pokemon, pounds }){
    const { rows } = await pool.query(
      'INSERT INTO weight (pokemon, pounds) VALUES ($1, $2) RETURNING *',
      [pokemon, pounds]
    );
    return new Weight(rows[0]);
  }
}
