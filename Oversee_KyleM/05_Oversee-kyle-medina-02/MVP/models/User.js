const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userInventory: [{
        name: String
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);