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

app.post('/signup', function(req, res) {

	db.User.create({
		username: req.body.username,
		password: req.body.password,
		entries: []
	}, function(err, User) {
		if(err) {
			res.send(err);
		} else {
			console.log('new User: ', User);
			res.send(200);
		}
	});
});

app.post('/login', function(req, res) {
	console.log('login hit, req.body is: ', req.body);
	db.User.findOne({username: req.body.username}, function(err, result) {
		if(err){
			console.log('login error');
			res.send(err);
		} else {
			console.log('user was found: ', result);
			if(result){
				if(result.password === req.body.password) {
					// res.json(User);
					console.log('password match');
					// res.redirect(200, '/allChallenges');
					res.json(result);
				} else {
					console.log('password doesn\'t match');
				}
			} else {
				res.send(404, 'User/password combination not found')
			}
		}
	});
});

app.post('/entries', function(req, res) {
	console.log('req.body.currentUser is: ', req.body.currentUser);
	db.Entry.create({
		challenge: req.body.challenge,
		initialThoughts: req.body.initialThoughts,
		notes: req.body.notes,
		mySolution: req.body.mySolution,
		process: req.body.process
	}, function(err, Entry){
		if(err){
			res.send(err);
		} else {
			db.User.findOne({_id: req.body.currentUser.toString()}, function(err, result) {
				result.entries.push(Entry);
				result.save(function(err) {
					if(err) return handleError(err);
					console.log('user updated: ', result);
				})
			});

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