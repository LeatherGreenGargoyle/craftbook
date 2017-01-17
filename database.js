var mongoose = require('mongoose');

var dburl = 'mongodb://localhost:27017/craftbookdb';
mongoose.connect(dburl, function(){
	console.log('Mongoose connected to: ', dburl);
});

var entrySchema = new mongoose.Schema({
	challenge: String,
	initialThoughts: String,
	notes: String,
	mySolution: String,
	process: String
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	entries: [entrySchema]
});

var Entry = mongoose.model('Entry', entrySchema);
var User = mongoose.model('User', userSchema);

exports.Entry = Entry;
exports.User = User;