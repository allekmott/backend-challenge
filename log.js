/**
 * Logger
 */

const winston = require('winston');
const config = require('config');

const transport = new (winston.transports.Console)({
	level: config.log.level,
	json: false,
	timestamp: () => (new Date()).toUTCString(),
	colorize: true,
	format: winston.format.simple()
});

module.exports = winston.createLogger({
	transports: [ transport ],
	json: false
});
