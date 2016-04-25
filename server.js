var webpack = require('webpack')
var express = require('express')
var config = require('./config.js')(process.env.NODE_ENV);
var path = require('path')
var app = require('express')()
var port = 3000;

var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var compiler = webpack(config)

// todo: make this config dependent on environment
app.use(webpackDevMiddleware(compiler, {}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static('public'))

app.get('/', function(req, res){
	res.sendFile(path.resolve(__dirname, 'public/index.html'))
});

app.listen(port, function(error){
	if (error) {
		console.log(error)
	} else {
		console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
});