/**
 * Create/drop applications & versions table
 */

exports.up = (knex, Promise) => {
	return knex.schema.createTable('applications', (table) => {
		table.increments('id').unique().primary();
		table.string('identifier').unique();
	}).createTable('versions', (table) => {
		table.increments('id').unique().primary();
		table.string('applicationId').references('applications.id');
		table.integer('versionNumber');
		table.string('checksum');
		table.enu('status', [ 'new', 'analyzed' ]);
	}).createTable('comparisons', (table) => {
		table.increments('id').unique().primary();
		table.string('applicationId').references('applications.id');
		table.string('headVersionId').references('versions.id');
		table.string('baseVersionId').references('versions.id');
		table.enu('status', [ 'pending', 'success', 'error' ]);
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('applications')
		.dropTable('versions')
		.dropTable('comparisons');
};
