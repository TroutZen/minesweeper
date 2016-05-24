var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: __dirname + '/src/app.js',
	output: {
		path:  __dirname + '/public',
		filename: 'bundle.js'
	},
	watch: true,
	devtool: 'source-map',
	devServer: {
        contentBase: "./public"
    },
	plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(), // Webpack 1.0
	    new webpack.HotModuleReplacementPlugin(),
	    // new webpack.NoErrorsPlugin(),
	    new ExtractTextPlugin("styles.css")
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
		        loader: 'babel-loader',
      			query: {
			        presets: ["es2015", "react"]
      			},
		        exclude: /node_modules/
			},
			{
		        test: /\.scss$/,
		        loader: ExtractTextPlugin.extract("style", "css!sass"),
      		},
  			{ 
  				test: /\.(png|jpg)$/,
  				loader: 'file-loader?name=/assets/[name].[ext]'
  			},
  			{
		      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
		      loader: 'file-loader?name=/assets/[name].[ext]'
		    }
		]
	}
}