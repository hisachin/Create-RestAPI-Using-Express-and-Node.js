var User = require('../models/users.model.js');


//get all users
exports.list = function(req, res) {
    // Retrieve and return all notes from the database.
    User.find(function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving user."});
        } else {
            res.send(user);
        }
    });
};

//get single user

exports.getSingleUser = function(req, res) {
    // Find a single user with a userid
    User.findById(req.params.userid, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "user not found with id " + req.params.userid});                
            }
            return res.status(500).send({message: "Error retrieving user with id " + req.params.userid});
        } 

        if(!user) {
            return res.status(404).send({message: "user not found with id " + req.params.userid});            
        }

        res.send(user);
    });
};

//create new user

exports.createUser = function(req,res){
	if(!req.body.firstname) {
        return res.status(400).send({message: "User First Name can not be empty"});
    }

    var user = new User(req.body);

    user.save(function(err,user){
    	if(err){
    		console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
    	}else{
    		res.send(user);
    	}
    });
};

//update user by id 

exports.updateSingleUser = function(req,res){
	User.findById(req.params.userid,function(err,user){
		if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userid});                
            }
            return res.status(500).send({message: "Error finding user with id " + req.params.userid});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userid});            
        }

        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;

        user.save(function(err,data){
        	if(err){
        		res.status(500).send({message: "Could not update user with id " + req.params.userid});
        	}else{
        		res.send(data);
        	}
        });
	});
};

//delete user by id

exports.deleteSingleUser = function(req, res) {
    User.findByIdAndRemove(req.params.userid, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userid});                
            }
            return res.status(500).send({message: "Could not delete user with id " + req.params.userid});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userid});
        }

        res.send({message: "User deleted successfully!"})
    });
};