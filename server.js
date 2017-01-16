var express = require('express');
var morgan = require('morgan');
var db = require('./database');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('port', 3000);

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.listen(app.get('port'), function(){
	console.log('App listening on port:', app.get('port'));
})
