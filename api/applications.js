/**
 * /applications REST APIs
 */

const express = require('express');

const Applications = require('../controller/applications');
const Versions = require('../controller/versions');
const Comparisons = require('../controller/comparisons');

const log = require('../log');

const router = express.Router();

router.post('/', (req, res) => {
	const body = req.body;

	if (!('identifier' in body)) {
		return res.status(400).end();
	}

	const identifier = body.identifier;
	Applications.create(identifier)
		.then((created) => {
			if (created === undefined) {
				res.status(400).end();
			} else {
				log.info(`created new application ${created.id}`);
				res.send(created);
			}
		}).catch((e) => {
			log.error('unable to create application', e.stack);
			res.status(500).end();
		});
});

router.post('/:aId/versions', (req, res) => {
	const body = req.body;

	if (!('checksum' in body)) {
		return res.status(400).end();
	}

	const aId = req.params.aId;
	const checksum = body.checksum;
	Versions.create(aId, checksum)
		.then((created) => {
			if (created === undefined) {
				res.status(400).end();
			} else {
				log.info(`created version new version of app ${aId}`);
				res.send(created);
			}
		}).catch((e) => {
			log.error(`unable to create new version of app ${aId}`);
			log.error(e.stack);
			res.status(500).end();
		});
});

router.post('/:aId/comparisons', (req, res) => {
	const body = req.body;

	if (!('baseVersionId' in body) || !('headVersionId' in body)) {
		return res.status(400).end();
	}

	const aId = req.params.aId;
	const headVersionId = body.headVersionId;
	const baseVersionId = body.baseVersionId;
	Comparisons.create(aId, headVersionId, baseVersionId)
		.then((created) => {
			if (created === undefined) {
				res.status(400).end();
			} else {
				log.info(`create version ${headVersionId} v ${baseVersionId} `
					+ `comparison for app ${aId}`);
				res.send(created);
			}
		}).catch((e) => {
			log.error(`unable to create new comparison for app ${aId}`,
				e.stack);
			res.status(500).end();
		});
});

module.exports = router;
