var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile('/vagrant/www/index.html');
});

app.listen(8080, function(){
	console.log("Listening on 8080");
});