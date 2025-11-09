const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = require('../../db');

 
const getDoctorTimeslots = async (doctorId) => {
    try {
      const result = await pool.query(
        `SELECT 
          CONCAT(timeslot_code, '_', timeslot_type) AS slot_code
          FROM timeslots WHERE timeslot_doctor_id = $1`,
        [doctorId]
      );
  
      return result.rows.map(row => row.slot_code);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

module.exports = { getDoctorTimeslots};