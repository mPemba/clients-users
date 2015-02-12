var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('./public/js/models/userModel.js');

var app = express();
var port = 8666;
var mondoUri = "mongodb://localhost:27017/clients-user";

mongoose.connect(mondoUri);
mongoose.connection.once('open', function() {
	console.log('connected to database at ' + mondoUri);
});

app.use(bodyParser.json());

app.post('/api/user', function(req, res) {
	user.create(req.body).then(function(response) {
		res.status(200).json(response);
	}, function(err) {
		res.status(420).json(err);
	})

  // var user = new user(req.body);
  // user.save(function(err, response) {
  // 	if (!err) {
  // 		res.status(200).json(user);
  // 	} else {
  // 		res.status(420).json(err);
  // 	}
  // })
})

app.get('/api/user', function(req, res) {
	user.find({}, function(err, docs) {
		if (!err){
			if (docs.length === 0) {
				res.status(404).send('No Docs Found');
			} else {
				res.status(200).json(docs);
			}
		} else {
			res.status(420).json(err);
		}
	})
})

app.listen(port, function() {
	console.log('listening on port ' + port);
});

