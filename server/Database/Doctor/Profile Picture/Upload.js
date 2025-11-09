const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = require('../../db');

 

const updateFile = async (doctorId, fileData) => {
    const query = 'UPDATE doctor SET doctor_image = $2 WHERE doctor_user_id_reference  = $1 RETURNING *';
    const values = [doctorId, fileData];
    try {
        const result = await pool.query(query, values);
        if (!result.rows.length) {
            console.log('could not update file data');
            return false;
        }
        console.log('File data updated');
        return true;
    } catch (error) {
        console.error('Error updating file data', error.stack);
        return false;
    }
};

module.exports = { updateFile };