const bookshelf = require('../db');

const Comparison = bookshelf.Model.extend({
	tableName: 'comparisons'
});

module.exports = Comparison;
