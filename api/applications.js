/**
 * /applications REST APIs
 */

const express = require('express');
const log = require('../log');

const router = express.Router();

router.post('/', (req, res) => {
	log.info(`create new application`);
	res.end();
});

router.post('/:aId/versions', (req, res) => {
	log.info(`add new version of app ${req.params.aId}`);
	res.end();
});

router.post('/:aId/comparisons', (req, res) => {
	log.info(`compare versions of app ${req.params.aId}`);
	res.end();
});

module.exports = router;
