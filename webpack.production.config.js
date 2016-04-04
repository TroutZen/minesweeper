var devConfig = require('./webpack.config.js');
var strip = require('strip-loader');
var stripLoader = {
	test: [/\.jsx?$/, /\.es6$/],
	exclude: '/node_modules/',
	// 
	loader: strip.loader('console.log')
}

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;