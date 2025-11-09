const express = require('express');
const patientHistoryAddPrescriptionController = require('../../../Controllers/Patient/MedicalHistory/addPrescription');
// const { tokenAuthentication } = require('../../middleware/User/Authentication');

const router = express.Router();

router.post('', patientHistoryAddPrescriptionController.addPrescription);

module.exports = router;