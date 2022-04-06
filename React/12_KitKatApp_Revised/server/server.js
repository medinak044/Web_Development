const cors = require('cors'); 
const express = require('express');
const app = express(); 

const mongoose = require('mongoose')
const keys = require('./config/keys')

//Establish connection to Mongo Kit Kat database
mongoose.connect(keys.mongoURI)
.then(()=>console.log(`${keys.db} database connection established.`))
.catch(error=>console.log(`${keys.db} database connection not established: ${error}`))

//User Schema
let KitKatUsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"]
  }
})

//User Model
let UsersModel = mongoose.model('KitKatUser', KitKatUsersSchema)

//Flavor Schema
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

//Flavor Model
let KitKatFlavorsModel = mongoose.model('KitKatFlavor', KitKatFlavorsSchema);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.post ('/newUsers', (req, res) => {
  UsersModel.create({
    ...req.body }, 
    function(error, result){
      let message = error ? error : result;
      console.log(`User saved to ${keys.db}`, result)
      res.json({message});
  });
})

app.get ('/getFlavors', (req, res) => {
  KitKatFlavorsModel.find({}, 
    function(error, result){
       let message = error ? error : result;
       console.log(`Flavors retrieved from ${keys.db}`, result)
      res.json({message});
  });
})



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`app on port ${port}`)
})