const bookshelf = require('../db');

const Version = bookshelf.Model.extend({
	tableName: 'versions'
});

module.exports = Version;
