let mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email:String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);