/**
 * Entry point
 */

const config = require('config');

const log = require('./log');
const server = require('./server');

log.info('startup');
server.listen(config.server.port, (e) => {
	if (e) {
		log.error('unable to start server', e);
		return;
	}

	log.info(`server listening on port ${config.server.port}`);
});
