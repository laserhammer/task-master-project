var models = require('../models');

var Tasks = models.Tasks;
var Account = models.Account;

var allTasks = function(req, res)
{
	// Validate username and password
	if(!req.body.username || !req.body.pass)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	var user;
	var username = req.body.username;
	var password = req.body.pass;
	Account.AccountModel.authenticate(username, password, function(err, account) {
		if(err || !account) 
		{
			return res.status(400).json({error: "Wrong username or password"});
		}
		user = account.toAPI();
	});
	
	// Find all tasks associated with that account
	Tasks.TaskModel.findByOwner(user._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
		return res.status(200).json({tasks: docs});
    });
};

var makeTask = function(req, res) {

	// Validate username and password
	if(!req.body.username || !req.body.pass)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	var user;
	var username = req.body.username;
	var password = req.body.pass;
	Account.AccountModel.authenticate(username, password, function(err, account) {
		if(err || !account) 
		{
			return res.status(400).json({error: "Wrong username or password"});
		}
		user = account.toAPI();
	});
	
	// Validate the task in the request body
	// Add the task to the database
    if(!req.body.name) {
		console.log(req.body.name);
        return res.status(400).json({error: "title required"});
    }
    
    var taskData = {
        title: req.body.name,
        dueDate: req.body.dueDate,
		important: req.body.important,
		parent: req.body.parent,
        owner: user._id
    };
    
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
        
		return res.status(200).json({tasks: docs});
		});
    });
};

module.exports.allTasks = allTasks;
module.exports.make = makeTask;