//creating a connection
let mongoose = require('mongoose');
let keys = require('./config/keys');

mongoose.connect(keys.mongoURI)
.then("Kitkat Database connection established.")
.catch(err => console.log('Kitkat database connection not established. Error: ', err))

//making the schema
let KitKatFlavorsSchema = mongoose.Schema({
    flavor: String,
    image: String,
    isSeasonal: {
        type: Boolean,
        default: false
    },
    isRegional: {
        type: Boolean,
        default: false
    },
    isAvailableYearRound: {
        type: Boolean,
        default: true
    }
})

//making the model
let KitKatFlavorsModel = mongoose.model('flavors', KitKatFlavorsSchema);

