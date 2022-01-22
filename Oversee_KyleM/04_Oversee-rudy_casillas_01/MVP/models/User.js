const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, `Username is required`]
    },
    password: {
        type: String,
        required: [true, `A password is required`]
    },
    userInventory: [{
        name: ``
    }] // An array of objects, with each object element containing item information
});

// Template for item(Object) to be stored in "userInventory"
const item = {
    name: ``,
    description: ``,
    imageLink: ``
}

let itemSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, `User name is required`]
    },
    itemName: {
        type: String,
        required: [true, `Item name is required`]
    }
});

userSchema.plugin(passportLocalMongoose);

// Exports an object with multiple properties
module.exports = {
    users: mongoose.model('users', userSchema),
    items: mongoose.model('items', itemSchema),
    item: item
}; 