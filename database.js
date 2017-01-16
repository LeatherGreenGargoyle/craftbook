var mongoose = require('mongoose');

var dburl = 'mongodb://localhost:27017/craftbookdb';
mongoose.connect(dburl, function(){
	console.log('Mongoose connected to: ', dburl);
});

var entrySchema = new mongoose.Schema({
	challenge: String,
	initialThoughts: String,
	questions: [{text: String}],
	notes: String,
	mySolution: String,
	process: String,
	mnemonic: String
});

var Entry = mongoose.model('Entry', entrySchema);

exports.Entry = Entry;