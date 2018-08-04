/**
 * Controller for Version model
 */

const Version = require('../model/version');

const Applications = require('./applications');

const exists = (id) => {
	return new Version({ 'id': id })
		.fetch()
		.then((version) => (version !== null));
};

const create = (app, checksum) => {
	return Applications.exists(app)
		.then((appExists) => {
			if (!appExists) {
				return undefined;
			} else {
				return new Version({ 'applicationId': app })
					.count()
					.then((count) => {
						return new Version({
							'applicationId': app,
							'checksum': checksum,
							'status': 'new',
							'versionNumber': count + 1
						}).save();
					});
			}
		});
};

const setStatus = (id, status) => {
	return new Version({ 'id': id })
		.fetch()
		.then((version) => {
			if (version === null) {
				return undefined;
			} else {
				return version.set({ 'status': status }).save();
			}
		});
};

module.exports = {
	create: create,
	exists: exists,
	setStatus: setStatus
};
