var models = require('../models');
var Account = models.Account;

var signup = function(req, res) 
{
	// Validate body fields for the username and password
	// Add account to the database
	if(!req.query.username || !req.query.pass)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	Account.AccountModel.generateHash(req.query.pass, function(salt, hash) {
		var accountData = {
			username: req.query.username,
			salt: salt,
			password: hash
		};
		
		var newAccount = new Account.AccountModel(accountData);
		console.log("creating account '" + newAccount.username + "'");
		newAccount.save(function(err) {
			if(err) 
			{	
				console.log(err);
				return res.status(400).json({error: "An error occured creating the account"});
			}
			
			//req.session.account = newAccount.toAPI();
			console.log("account '" + newAccount.username + "' successfully created");
			return res.status(200).json({success: "yes"});
		});
	});
};

module.exports.signup = signup;