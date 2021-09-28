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

  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * from height'
    );
    return rows.map(row => {
      return new Height(row);
    });
  }
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM height WHERE id = ($1)',
      [id]
    );
    return new Height(rows[0]);
  }
  static async update(id, { pokemon, length }){
    const { rows } = await pool.query(
      'UPDATE height SET pokemon = ($1), length = ($2) WHERE id = ($3) RETURNING *',
      [pokemon, length, id]
    );
    return new Height(rows[0]);
  }
}
