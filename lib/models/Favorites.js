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



  static async allFavoriteCampGrounds(user_email) {

    const { rows } = await pool.query(
      'SELECT * FROM favorites WHERE user_email = ($1)',
      [user_email]
    );
    
    const images = await pool.query('SELECT * FROM images');
  
    const obj = {};
    
    for(let i = 0; i < images.rows.length; i++){
      if(!obj[images.rows[i].favorites_facility_id]){
        obj[images.rows[i].favorites_facility_id] = [images.rows[i].favorites_facility_id];
      } 
      obj[images.rows[i].favorites_facility_id].push(images.rows[i].url);

    }

    const favoritesArr = [];
    for(let i = 0; i < rows.length; i++){
      if(rows[i].facility_id === obj[rows[i].facility_id][0]){
        favoritesArr.push({ ...rows[i], images:obj[rows[i].facility_id].slice(1) });
      }
    }
    return favoritesArr;

  }

  
};
