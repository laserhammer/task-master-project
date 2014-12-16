var models = require('../models');

var Tasks = models.Tasks;
var Account = models.Account;

var allTasks = function(req, res)
{
	console.log("request received");
	// Validate username and password
	if(!req.query.username || !req.query.pass)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	var user;
	var username = req.query.username;
	var password = req.query.pass;
	Account.AccountModel.authenticate(username, password, function(err, account) {
		if(err || !account) 
		{
			return res.status(400).json({error: "Wrong username or password"});
		}
		user = account.toAPI();
		
		// Find all tasks associated with that account
		Tasks.TaskModel.findByOwner(user._id, function(err, docs) {

			if(err) {
				console.log(err);
				return res.status(400).json({error:'An error occurred'}); 
			}
			console.log("returning tasks");
			return res.status(200).json({tasks: docs});
		});
	});
};

var makeTask = function(req, res) {

	console.log("Add request received");
	// Validate username and password
	if(!req.query.username || !req.query.pass)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	var user;
	var username = req.query.username;
	var password = req.query.pass;
	Account.AccountModel.authenticate(username, password, function(err, account) {
		if(err || !account) 
		{
			return res.status(400).json({error: "Wrong username or password"});
		}
		user = account.toAPI();
		
		// Validate the task in the request body
		// Add the task to the database
		if(!req.query.title) {
			console.log(req.query.title);
			return res.status(400).json({error: "title required"});
		}
		
		var taskData = {
			title: req.query.title,
			dueDate: req.query.dueDate,
			important: req.query.important,
			parent: req.query.parent,
			owner: user._id
		};
		console.log(taskData);
		var newTask = new Tasks.TaskModel(taskData);
		
		newTask.save(function(err) {
			if(err) {
				console.log(err);
				return res.status(400).json({error:'An error occurred'}); 
			}
			
			// If the add is successful, return a json of all the task objects
			Tasks.TaskModel.findByOwner(user._id, function(err, docs) {

				if(err) {
					console.log(err);
					return res.status(400).json({error:'An error occurred'}); 
				}
				console.log("returning tasks");
				return res.status(200).json({tasks: docs});
			});
		});
	});
};

var removeTask = function(req, res)
{
	console.log("remove request received");
	// Validate username and password
	if(!req.query.username || !req.query.pass)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	var user;
	var username = req.query.username;
	var password = req.query.pass;
	Account.AccountModel.authenticate(username, password, function(err, account) {
		if(err || !account) 
		{
			return res.status(400).json({error: "Wrong username or password"});
		}
		user = account.toAPI();
		
		// Validate the task in the request body
		// Add the task to the database
		if(!req.query.title) {
			console.log(req.query.title);
			return res.status(400).json({error: "title required"});
		}
		var title = req.query.title;
		var dueDate = req.query.dueDate;
		console.log("removing task '" + title);
		
		Tasks.TaskModel.removeTask(user._id, title, dueDate, function(err) {

			if(err) {
				console.log(err);
				return res.status(400).json({error:'An error occurred'}); 
			}
			console.log("returning tasks");
			
			Tasks.TaskModel.findByOwner(user._id, function(err, docs) {

				if(err) {
					console.log(err);
					return res.status(400).json({error:'An error occurred'}); 
				}
				console.log("returning tasks");
				return res.status(200).json({tasks: docs});
			});
			
		});
	});
};

module.exports.allTasks = allTasks;
module.exports.make = makeTask;
module.exports.remove = removeTask;