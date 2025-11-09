const doctorProfilePictureUploadController = require('../../../Controllers/Doctor/Profile Picture/Upload');
const { tokenAuthentication } = require('../../../middleware/User/Authentication');
const express = require('express');
const router = express.Router();

router.put('', tokenAuthentication, doctorProfilePictureUploadController.upload);

module.exports = router;