const fetch =  require('node-fetch');
// import fetch from 'node-fetch';

async function fetchCampgroundFacilitiesByState(state){
  const url = `https://ridb.recreation.gov/api/v1/facilities?query=campground&limit=50&offset=0&state=${state}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.RECREATION_GOV_API_KEY
    },
  });
  const res = await data.json();
  const vitalInfo = res.RECDATA.map((facility) => {
    return {
      facilityID: facility.FacilityID,
      facilityName: facility.FacilityName,
      facilityDescription: facility.FacilityDescription,
      facilityDirections: facility.FacilityDirections,
      facilityPhone: facility.FacilityPhone,
      facilityLongitude: facility.FacilityLongitude,
      facilityLatitude: facility.FacilityLatitude
    };
  });
  return vitalInfo;
}

async function fetchAllCampgroundFacilities(){
  const url = 'https://ridb.recreation.gov/api/v1/facilities?query=campground&limit=50&offset=0';
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.RECREATION_GOV_API_KEY
    },
  });
  const res = await data.json();
  const vitalInfo = res.RECDATA.map((facility) => {
    return {
      facilityID: facility.FacilityID,
      facilityName: facility.FacilityName,
      facilityDescription: facility.FacilityDescription,
      facilityDirections: facility.FacilityDirections,
      facilityPhone: facility.FacilityPhone,
      facilityLongitude: facility.FacilityLongitude,
      facilityLatitude: facility.FacilityLatitude
    };
  });
  return vitalInfo;
}
module.exports = { fetchCampgroundFacilitiesByState, fetchAllCampgroundFacilities };

