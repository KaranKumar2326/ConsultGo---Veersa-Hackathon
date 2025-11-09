const express = require('express');
const router = express.Router();
const AppointmentDetails  = require('../../Controllers/Doctor/Appointments/appointmentdetails');
const { tokenAuthentication } = require('../../middleware/User/Authentication');

// Route for submitting appointment result and treatment plan
router.get('/:appointmentId',tokenAuthentication, AppointmentDetails.AppointmentDetails);

module.exports = router;
