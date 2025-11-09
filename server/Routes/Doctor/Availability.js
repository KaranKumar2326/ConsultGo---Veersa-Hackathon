const express = require('express');
const doctorAddAvailabilityController = require('../../Controllers/Doctor/Availability/add');
const doctorDeleteAvailabilityController = require('../../Controllers/Doctor/Availability/delete');
const doctorViewAvailabilityController = require('../../Controllers/Doctor/Availability/view');
const { tokenAuthentication } = require('../../middleware/User/Authentication');

const router = express.Router();
router.delete('/delete', tokenAuthentication, doctorDeleteAvailabilityController.deleteAvailability);
router.post('/add', tokenAuthentication, doctorAddAvailabilityController.addAvailability);
router.get('/view', tokenAuthentication, doctorViewAvailabilityController.viewDoctorTimeslots);

module.exports = router;