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

// Entry.create({
// 	challenge:'How can you tell if a linked list is a cycle?',
// 	initialThoughts:'Maybe I can mark one node, and see if I come across that mark again',
// 	questions: [
// 		{text:'How do you modify a linked list node?'},
// 		{text:'What is time complexity?'}
// 		],
// 	notes: 'Some people talked about using two runners',
// 	mySolution: 'Increment two runners at different speeds',
// 	process: 'Any time you need to track a sequential form, two runners is a good idea',
// 	mnemonic: 'If you were blind man walking along a path, how could you tell if the path were circular? What if you had a buddy?'
// }, function(err, Entry){
// 	if(err){
// 		console.log('Error creating Entry: ', err);
// 	} else {
// 		console.log('Entry created: ', Entry)
// 	}
// });

exports.Entry = Entry;