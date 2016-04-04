// 
var path = require('path');

module.exports = {
	// set entry context relative to the js dir
	context: path.resolve('js'),
	entry: './app.js',
	output: {
		path: path.resolve('build/js'),
		// where js assets are served from
		publicPath: 'public/assets/js',
		filename: 'bundle.js'
	},

	devServer: {
		contentBase: 'public'
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