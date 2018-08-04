/**
 * Controller for Application model
 */

const Application = require('../model/application');

const get = (query) => new Application(query).fetch();

const exists = (id) => {
	return get({ 'id': id })
		.then((application) => (application !== null));
};

const create = (identifier) => {
	return get({ 'identifier': identifier })
		.then((application) => {
			if (application !== null) {
				return undefined;
			} else {
				return new Application({ 'identifier': identifier })
					.save();
			}
		});
};

module.exports = {
	create: create,
	exists: exists,
	get: get
};
