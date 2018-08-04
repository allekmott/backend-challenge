/**
 * Controller for Comparison model
 */

const Comparison = require('../model/comparison');
const Versions = require('./versions');

const log = require('../log');

const get = (query) => new Comparison(query).fetch();

const create = (app, head, base) => {
	return Promise.all([
			Versions.exists(head),
			Versions.exists(base)
		]).then((versionsExist) => {
			if (!versionsExist.every(existence => existence)) {
				return undefined;
			}

			return new Comparison({
				'applicationId': app,
				'headVersionId': head,
				'baseVersionId': base,
				'status': 'pending'
			}).save();
		});
};

const finalize = (id, status) => {
	return get({ 'id': id })
		.then((comparison) => {
			if (comparison === null) {
				return undefined;
			} else {
				if (comparison.status === 'success'
					|| comparison.status === 'error') {
					return undefined;
				}

				const head = comparison.get('headVersionId');
				const base = comparison.get('baseVersionId');

				return Promise.all([
					Versions.setStatus(head, 'analyzed'),
					Versions.setStatus(base, 'analyzed')
				]).then(() => comparison.set({ 'status': status }).save());
			}
		});
};

module.exports = {
	create: create,
	finalize: finalize
};
