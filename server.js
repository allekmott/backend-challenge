/**
 * Express server setup
 */

const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./api');
const log = require('./log');
const db = require('./db');

const server = express();

server.use(bodyParser.json());

server.use('/', apiRouter);

/* request logging */
server.use((req, res, next) => {
	log.debug(`${req.method} ${req.originalUrl} ` + `(source: '${req.ip}')`);
	next();
});

/* 404 */
server.use((req, res) => {
	res.status(404).send();
});

module.exports = server;
