const pool = require('../utils/pool');

module.exports = class FavoriteCampground {
  constructor(row){
    this.id = row.id;
    this.userId = row.user_id;
    this.facilityId = row.facility_id;
    this.facilityName = row.facility_name;
    this.facilityDescription = row.facility_description;
    this.facilityDirections = row.facility_directions;
    this.facilityPhone = row.facility_phone;
    this.facilityEmail = row.facility_email;
    this.reservable = row.reservable; 
    this.images = row.images;  
  }

  static async createFavorite({ userId, facilityId, facilityName, facilityDescription, facilityDirections, facilityPhone, facilityEmail, reservable, images }){
    

    //loop through the array of images to add all of them to the images table
    

    const { rows } = await pool.query(`
        INSERT INTO favorites(
          user_id,
          facility_id,
          facility_name,
          facility_description,
          facility_directions,
          facility_phone,
          facility_email,
          reservable)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`, [userId, facilityId, facilityName, facilityDescription, facilityDirections, facilityPhone, facilityEmail, reservable]);

    return new FavoriteCampground(rows[0]);

  }







};
