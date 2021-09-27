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

  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM weight'
    );
    return rows.map(row => {
      return new Weight(row);
    });
  }

  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM weight WHERE id = $1',
      [id]
    );
    return new Weight(rows[0]);
  }
  
  static async change(id, { pokemon, pounds }) {
    const { rows } = await pool.query(
      'UPDATE weight SET pokemon=($1), pounds=($2) WHERE id = ($3) RETURNING *',
      [pokemon, pounds, id]
    );
    return new Weight(rows[0]);
  }
}
