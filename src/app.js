//import libraries 
var path = require('path'); 
var express = require('express');  
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose'); 
var url = require('url');

var dbURL = process.env.MONGOHQ_URL || 'mongodb://localhost/Task_Master_Project';

var db = mongoose.connect(dbURL, function(err) {
	if(err)
	{
		console.log("Could not connect to database");
		throw err;
	}
});

var redisURL =  {
	hostname: 'localhost',
	port: 6379
};

var redisPASS;

if(process.env.REDISCLOUD_URL)
{
	redisURL = url.parse(process.env.REDISCLOUD_URL);
	redisPASS = redisURL.auth.split(":")[1];
}

var router = require('./router.js');

var server;
var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

router(app);

server = app.listen(port, function(err) {
	if(err)
	{
		throw err;
	}
	console.log('Listening on port ' + port);
});