var webpack = require('webpack');
var config = require('./config.js')(process.env.NODE_ENV);
var path = require('path');
var app = require('express')();
var port = 3000;

var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {}))
app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res){
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, function(error){
	if (error) {
		console.log(error);
	} else {
		console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}
});