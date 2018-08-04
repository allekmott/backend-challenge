const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './dev.sqlite3'
	},
	useNullAsDefault: true
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
