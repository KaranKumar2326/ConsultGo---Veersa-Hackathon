

const express = require('express');
const patientHistoryViewPrescriptionController = require('../../../Controllers/Patient/MedicalHistory/viewPrescription');
// const { tokenAuthentication } = require('../../middleware/User/Authentication');

const router = express.Router();

router.get('/:patientId', patientHistoryViewPrescriptionController.getPrescription);

module.exports = router;