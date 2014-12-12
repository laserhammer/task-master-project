//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 

var router = function(app)
{
	app.post('/', controllers.Tasks.make);
	app.post('/signup', controllers.Account.signup);
	app.get('/', controllers.Tasks.allTasks);
};

module.exports = router;

