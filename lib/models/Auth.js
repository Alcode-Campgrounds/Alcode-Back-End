const jwt = require('jsonwebtoken');
const pool = require('../utils/pool');

module.exports = class User {
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async getEmail(email){
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = ($1)',
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async insert(name, email, passwordHash){
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    );
    return new User(rows[0]);
  }
  //maybe rename insertUser
  static async insertOauth({ name, email, passwordHash }){
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    );
    return new User(rows[0]);
  }

    
  authToken() {
    return jwt.sign(this.toJSON(), process.env.AUTH_SECRET, {
      expiresIn: '12h',
    });
  }
  toJSON(){
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
};
