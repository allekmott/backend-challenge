/**
 * Comparison REST APIs
 */

const express = require('express');

const Comparisons = require('../controller/comparisons');
const log = require('../log');

const router = express.Router();

router.patch('/:cId', (req, res) => {
	const body = req.body;

	if (!('status' in req.body)) {
		return res.status(400).end();
	}

	const cId = req.params.cId;
	const status = body.status;
	return Comparisons.finalize(cId, status)
		.then((finalized) => {
			if (finalized === undefined) {
				res.status(400).end();
			} else {
				log.info(`update comparison ${cId} status to ${status}`);
				res.send(finalized);
			}
		}).catch((e) => {
			log.error(`unable to finalize comparison ${cId}`);
			log.error(e.stack);
			res.status(500).end();
		});
});

module.exports = router;
