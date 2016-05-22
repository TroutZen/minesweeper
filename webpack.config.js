var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.js',
	output: {
		path:  './public',
		filename: 'bundle.js'
	},
	// watch: true,
	// devtool: 'source-map',
	plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(), // Webpack 1.0
	    // new webpack.HotModuleReplacementPlugin(),
	    // new webpack.NoErrorsPlugin(),
	    new ExtractTextPlugin("styles.css")
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
		        loader: 'babel',
		        exclude: /node_modules/
			},
			{
		        test: /\.scss$/,
		        loader: ExtractTextPlugin.extract("style", "css!sass"),
      		},
  			{ 
  				test: /\.(png|jpg)$/,
  				loader: 'file-loader'
  			},
  			{
		      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
		      loader: 'file-loader?name=/assets/[name].[ext]'
		    }
		]
	}
}