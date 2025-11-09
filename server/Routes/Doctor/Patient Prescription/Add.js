const express = require('express');
const doctorPatientPrescriptionAddController = require('../../../Controllers/Doctor/Patient Prescription/Add');
const { tokenAuthentication } = require('../../../middleware/User/Authentication');

const router = express.Router();

router.post('/:appointmentId', tokenAuthentication, doctorPatientPrescriptionAddController.addPatientPrescription);

module.exports = router;