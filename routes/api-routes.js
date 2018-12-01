const User = require('../models/User');
const Kudo = require('../models/Kudo');

module.exports = function (app) {

//UI ROUTES
//These routes will be used by the UI.

	//User Routes
	app.get('/api/users/', function (req, res) {
		User.find({})
			.populate('kudos')
			.then(function (data) {
				res.json(data);
			})
			.catch(function (err) {
				res.json(err);
			});
	})

	//Kudo routes
	app.get('/api/kudos', function (req, res) {
		Kudo.find({})
			.then(function (data) {
				res.json(data);
			})
			.catch(function (err) {
				res.json(err);
			});
	})

	app.post('/api/kudos', function (req, res) {
		const userId = req.body.senderId;
		const newEntry = {
			sender: req.body.sender,
			receiver: req.body.receiver,
			title: req.body.title,
			body: req.body.body
		}
		Kudo.create(newEntry)
			.then(function (data) {
				return User.findOneAndUpdate({ _id: userId }, { $push: { kudos: data._id } }, { new: true });
			})
			.then(function (userData) {
				res.json(userData);
			})
			.catch(function (err) {
				res.json(err);
			});
	})

//ADMIN ROUTES
//These routes are for use as admin function, accessible via Postman. 

	app.post('/api/users', function (req, res) {
		User.create(req.body)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (err) {
				res.json(err);
			});
	})

	app.delete('/api/users/:id', function (req, res) {
		User.deleteOne({ _id: req.params.id })
			.then(function () {
				res.json({ success: true });
			}).catch(function (error) {
				res.json({ error: error });
			});
	});


	app.delete('/api/kudos/:id', function (req, res) {
		Kudo.deleteOne({ _id: req.params.id })
			.then(function () {
				res.json({ success: true });
			}).catch(function (error) {
				res.json({ error: error });
			});
	});
}