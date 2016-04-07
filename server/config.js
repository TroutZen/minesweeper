var devConfig = require('../webpack.config.js');
var prodConfig = require('../webpack.production.config.js');

module.exports = function(environment) {
	switch(environment) {
		case 'development':
			return devConfig;
		case 'production':
			return prodConfig;
		default: 
			return devConfig;
	}
};