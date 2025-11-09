const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = require('../db');

 

const acceptAppointment = async (appointmentId) => {
 
    await pool.query(
      `UPDATE appointment
       SET appointment_status = 'Approved'
       WHERE appointment_id = $1`,
      [appointmentId]
    );
  };
  
  const declineAppointment = async (appointmentId) => {
    
    await pool.query(
      `UPDATE appointment
       SET appointment_status = 'Declined'
       WHERE appointment_id = $1`,
      [appointmentId]
    );
  };
  
  module.exports = { acceptAppointment, declineAppointment };