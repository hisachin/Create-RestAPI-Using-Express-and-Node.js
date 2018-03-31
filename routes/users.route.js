var express = require('express');
var router = express.Router();

var users = require('../controllers/users.controller.js');


//get all users
router.get('/',users.list);

//get single user by id
router.get('/:userid',users.getSingleUser);

//create new user
router.post('/',users.createUser);

//update single user by id

router.put('/:userid',users.updateSingleUser);

//delete single user by id

router.delete('/:userid',users.deleteSingleUser);

module.exports = router;