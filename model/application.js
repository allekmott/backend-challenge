const bookshelf = require('../db');

const Version = require('./version');

const Application = bookshelf.Model.extend({
	tableName: 'applications',
	versions: () => this.hasMany(Version),
});

module.exports = Application;
