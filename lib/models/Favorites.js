const pool = require('../utils/pool');

module.exports = class FavoriteCampground {
  constructor(row){
    this.id = row.id;
    this.user_email = row.user_email;
    this.facility_id = row.facility_id;
    this.facility_name = row.facility_name;
    this.facility_description = row.facility_description;
    this.facility_directions = row.facility_directions;
    this.facility_phone = row.facility_phone;
    this.facility_email = row.facility_email;
    this.reservable = row.reservable; 
    this.images = row.images;  
  }

  static async createFavorite({ user_email, facility_id, facility_name, facility_description, facility_directions, facility_phone, facility_email, reservable, images }){
      
    const { rows } = await pool.query(`
        INSERT INTO favorites(
          user_email,
          facility_id,
          facility_name,
          facility_description,
          facility_directions,
          facility_phone,
          facility_email,
          reservable)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`, [user_email, facility_id, facility_name, facility_description, facility_directions, facility_phone, facility_email, reservable]);

    const arrOfImages = [];

    for(let i = 0; i < images.length; i++){
      await pool.query('INSERT INTO images (favorites_facility_id, url) VALUES ($1, $2) RETURNING *', [facility_id, images[i]]);
      arrOfImages.push(images[i]);
    }

    return new FavoriteCampground({ ...rows[0], images:arrOfImages });



  }







};
