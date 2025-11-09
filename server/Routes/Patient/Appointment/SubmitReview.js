const express = require('express');
const patientsubmitReview = require('../../../Controllers/Patient/Appointment/SubmitReview');

const { tokenAuthentication } = require('../../../middleware/User/Authentication');
const router = express.Router();



router.post('/:appointment_id/review', patientsubmitReview.SubmitReview);

module.exports = router;