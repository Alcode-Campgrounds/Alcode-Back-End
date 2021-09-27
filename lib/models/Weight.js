import pool from '../utils/pool.js';


export default class Weight {
  constructor(row){
    this.id = row.id;
    this.pokemon = row.pokemon;
    this.weight = row.weight;
  }

  static async insert({ pokemon, weight }){
    const { rows } = await pool.query(
      'INSERT INTO weight (pokemon, weight) VALUES ($1, $2) RETURNING *',
      [pokemon, weight]
    );
    return rows.map(row => {
      return new Weight(row);
    });
  }
}
