var express = require('express');
var app = express();

app.use('/', express.static('/vagrant/www'));

app.listen(8080, function(){
	console.log("Listening on 8080");
});