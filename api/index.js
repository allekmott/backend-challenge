/**
 * Root router
 */

const express = require('express');
const applications = require('./applications');

const router = express.Router();
router.use('/applications', applications);

module.exports = router;
