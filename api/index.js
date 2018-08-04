/**
 * Root router
 */

const express = require('express');

const router = express.Router();
router.use('/applications', require('./applications'));
router.use('/comparisons', require('./comparisons'));

module.exports = router;
