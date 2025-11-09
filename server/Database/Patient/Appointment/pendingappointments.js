const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = require('../../db');

 


const retrievependingappointments = async (patientId) => {
    const result = await pool.query(
          `SELECT
        a.appointment_patient_id,
        a.appointment_doctor_id,
        a.appointment_type,
        a.appointment_id,
        a.appointment_duration,
        a.appointment_complaint,
        a.appointment_parent_reference,
        a.appointment_settings_type,
        p.user_first_name AS patient_first_name,
        p.user_last_name AS patient_last_name,
        d.user_first_name AS doctor_first_name,
        d.user_last_name AS doctor_last_name,
        doc.doctor_specialization,
        a.appointment_date AS doctor_availability_day_hour
    FROM
        appointment a
    JOIN users p ON a.appointment_patient_id = p.user_id
    JOIN users d ON a.appointment_doctor_id = d.user_id
    JOIN doctor doc ON a.appointment_doctor_id = doc.doctor_user_id_reference

    WHERE
        a.appointment_patient_id = $1 AND
        a.appointment_status = $2`,
      [patientId,'Pending']
    );
    return result.rows;
  };


  
module.exports = {retrievependingappointments};