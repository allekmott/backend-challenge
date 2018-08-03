/**
 * Tests for /applications REST APIs
 */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../server');

chai.use(chaiHTTP);

describe('applications', () => {
	[ '', ':aid/versions', ':aid/comparisons' ].forEach((path_) => {
		it(`should respond on /applications/${path_}`, (done) => {
			chai.request(server)
				.post(`/applications/${path_}`)
				.end((e, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});
