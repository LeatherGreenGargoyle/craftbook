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

app.get('/entries', function(req, res){
	db.Entry.find(function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.json(data);
		}
	});
});

app.post('/entries', function(req, res) {
	var reqQs = [];
	if(req.body.questions && req.body.questions.length){
		req.body.questions.forEach(function(q){
			reqQs.push(q);
		});
	}

	db.Entry.create({
		challenge: req.body.challenge,
		initialThoughts: req.body.initialThoughts,
		questions: reqQs,
		notes: req.body.notes,
		mySolution: req.body.mySolution,
		process: req.body.process
	}, function(err, Entry){
		if(err){
			res.send(err);
		} else {
			db.Entry.find(function(err, data){
				if(err){
					res.send(err);
				} else {
					res.json(data);
				}
			})
		}
	})
});