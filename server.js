var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('./routes/users.route.js');

//create express app
var app = express()

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

//use users router
app.use('/api/users',users);

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Nice You have nailed it."});
});


//connecting to database

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/crud-rest-api-v1');

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});