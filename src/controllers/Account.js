var models = require('../models');
var Account = models.Account;

var signup = function(req, res) 
{
	// Validate body fields for the username and password
	// Add account to the database
	if(!req.body.username || !req.body.pass || !req.body.pass2)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	if(req.body.pass !== req.body.pass2)
	{	
		return res.status(400).json({error: "Passwords must match"});
	}
	Account.AccountModel.generateHash(req.body.pass, function(salt, hash) {
		var accountData = {
			username: req.body.username,
			salt: salt,
			password: hash
		};
		
		var newAccount = new Account.AccountModel(accountData);
		console.log(newAccount.username);
		newAccount.save(function(err) {
			if(err) 
			{	
				console.log(err);
				return res.status(400).json({error: "An error occured creating the account"});
			}
			
			//req.session.account = newAccount.toAPI();
			return res.status(200);
		});
	});
};

module.exports.signup = signup;