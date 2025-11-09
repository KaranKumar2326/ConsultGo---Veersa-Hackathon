const patientMedicalDocumentViewController = require('../../../Controllers/Patient/Medical Document/View');
const { tokenAuthentication } = require('../../../middleware/User/Authentication');
const express = require('express');
const router = express.Router();

router.get('', tokenAuthentication, patientMedicalDocumentViewController.view);

module.exports = router;