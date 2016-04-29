var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: __dirname + '/src',
	entry: ['webpack-hot-middleware/client', './app.js'],
	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js'
	},
	watch: true,
	devtool: 'source-map',
	plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(), // Webpack 1.0
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
		        loaders: [ 'babel' ],
		        exclude: /node_modules/
			},
			{
		        test: /\.scss$/,
		        loaders: ["style", "css", "sass"]
      		},
  			{ 
  				test: /\.(png|jpg)$/,
  				loader: 'file-loader'
  			},
  			{
		      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
		      loader: "file-loader"
		    }
		]
	}
}