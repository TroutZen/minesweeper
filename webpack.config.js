// 
var path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'dist/src/bundle.js'
	},
	watch: true,
	module: {
		loaders: [
	    	{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: ['es2015']
				}
	    	}	
    	]
	}
}