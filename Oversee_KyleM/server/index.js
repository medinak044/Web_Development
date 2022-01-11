const express = require("express");
const app = express();

const logger = require("morgan");
app.use(logger("dev"));

// this is our built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { userArray } = require("./fakeData");

app.use(express.static("../client"));



// 1) Build our connection
//  a) install Mongoose
const mongoose = require(`mongoose`);
const keys = require(`./config/keys`);
// b) connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log(`Connected to ${keys.db} database`))
  .catch((error) => console.log(`Issues connecting`, error));

// 2) Build blueprints
// Schema: 
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, `Username is required`]
  },
  firstName: {
    type: String
    // required: [true, `First name is required`]
  },
  lastName: {
    type: String
    // required: [true, `Last name is required`]
  },
  phoneNumber: Number,
  email: {
    type: String
    // required: [true, `An email address is required`]
  },
  userInventory: [],
  isOnline: Boolean
})

// Template for item(Object) to be stored in "userInventory"
const item = {
  name: ``,
  description: ``,
  imageLink: ``
}

// Model
let UserModel = mongoose.model(`users`, userSchema) // "UserModel" is a class


app.get("/", (req, res) => {
  res.send("Root route");
});

// Read - GET
app.get("/users", (req, res) => {
  // Write queries
  UserModel.find({}, (err, resultsArr) => {
    if (err) {
      console.log(`error reading from db: ${err}`) // Tells developers
      res.status(404).json(`error reading from db: ${err}`) // Tells clients
    } else {
      // display users
      if (resultsArr.length > 0) {
        res.status(200).json(resultsArr);
      } else {
        res.status(200).json({ message: "You ain't got no users!!" });
      }
    }
  })
});

// Create - POST
app.post("/users", (req, res) => {
  // add a new user to our list
  let newUser = new UserModel({
    userName: req.body.userName
  });

  newUser.save((err, result) => {
    if (err) {
      console.log(`Error: ${err}`)
      res.status(404).json(`error reading from db: ${err}`) // Tells clients
    } else {
      console.log(result)
      res.status(200).json(result);
    }
  })
});

// Delete - DELETE
app.delete("/users/:id", (req, res) => {
  let requestedId = req.params.id; // The id will be a string from Mongo

  UserModel.findByIdAndDelete(requestedId, (err, result) => {
    if (err) {
      console.log(`Error: ${err}`)
      res.status(404).json(`error reading from db: ${err}`) // Tells clients
    } else {
      console.log(result)
      res.status(200).json(result);
    }
  })
});

// Update - PUT
app.put("/users/:id", (req, res) => {
  let requestedId = req.params.id;

  UserModel.findById(requestedId, (err, result) => {
    if (err) {
      console.log(`Error: ${err}`) // Tells devs
      res.status(404).json(`error reading from db: ${err}`) // Tells clients
    } else {
      result.isOnline = !result.isOnline;
      result.save((err2, updatedUser) => {
        if (err2) {
          console.log(`Error updating document`)
          res.status(400).json(`error reading from db: ${err2}`) // Tells clients
        } else {
          console.log(updatedUser)
          res.status(200).json(updatedUser);
        }
      })
    }
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));