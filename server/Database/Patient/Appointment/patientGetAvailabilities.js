const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = require('../../db');

 



const getDoctorTimeslots = async (doctorId) => {
    try {
      const result = await pool.query(
        `SELECT timeslot_code, timeslot_type
         FROM timeslots WHERE timeslot_doctor_id = $1`,
        [doctorId]
      );
  
      const timeslotCodes = result.rows.map(row => `${row.timeslot_code}_${row.timeslot_type}`);
      return timeslotCodes.join(',');
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const getDoctorAvailabilityDetails = async (doctorId) => {
    try {
        // Retrieve doctor availability
        const availabilityResult = await pool.query(
          `SELECT 
          appointment_id AS doctor_availability_id,
          appointment_date AS doctor_availability_day_hour
           FROM appointment
           WHERE appointment_doctor_id = $1
           AND appointment_status IN ('Approved', 'Pending')`,
          [doctorId]
        );
    
        const doctorAvailability = availabilityResult.rows;
        const availableSlots = doctorAvailability.map(slot => slot.doctor_availability_day_hour);
    
        return availableSlots;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    
module.exports = { getDoctorAvailabilityDetails,getDoctorTimeslots};