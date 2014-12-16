//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 

var router = function(app)
{
	app.get('/make', controllers.Tasks.make);
	app.get('/signup', controllers.Account.signup);
	app.get('/', controllers.Tasks.allTasks);
	app.get('/remove', controllers.Tasks.remove);
	//app.get('/', controllers.Tasks.make);
};

module.exports = router;

