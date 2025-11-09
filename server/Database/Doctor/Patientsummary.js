const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = require('../db');

 

// not tested with new data model
const getAppointmentSummary = async (patientId) => {
  try {
    const query = 
   `SELECT
            a.appointment_patient_id,
            a.appointment_doctor_id,
            a.appointment_id,
            a.appointment_type,
            a.appointment_duration,
            a.appointment_complaint,
            a.appointment_parent_reference,
            a.appointment_settings_type,
            p.user_first_name AS patient_first_name,
            p.user_last_name AS patient_last_name,
            d.user_first_name AS doctor_first_name,
            d.user_last_name AS doctor_last_name,
            a.appointment_date AS doctor_availability_day_hour
        FROM
            appointment a
        JOIN users p ON a.appointment_patient_id = p.user_id
        JOIN users d ON a.appointment_doctor_id = d.user_id
        WHERE
            a.appointment_patient_id = $1 AND
            a.appointment_status = $2`;

    const result = await pool.query(query, [patientId, 'Completed']);
    if (result.rows.length) {
        console.log('appointments found', result.rows);
        return result.rows;
    }

    console.log('No appointments found');
    return false;
} catch (error) {
    console.error(error.stack);
    return false;
}
};
module.exports = {
  getAppointmentSummary,
};