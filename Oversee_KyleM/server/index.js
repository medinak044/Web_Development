const express = require("express");
const app = express();

const logger = require("morgan");
app.use(logger("dev"));

// this is our built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { todoArray } = require("./fakeData");

app.use(express.static("../client"));





// Template for item
const item = {

}

// Schema:
const overseeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, `First name is required`]
  },
  lastName: {
    type: String,
    required: [true, `Last name is required`]
  },
  email: {
    type: String,
    required: [true, `An email address is required`]
  },
  userInventory: [{

  }]
})





// 1) Build our connection
//  a) install Mongoose
const mongoose = require(`mongoose`);
const keys = require(`./config/keys`);
// b) connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log(`Connected to ${keys.db} database`))
  .catch((error) => console.log(`Issues connecting`, error));

// 2) Build blueprints
//  a) Schema
//  b) Model
const todoSchema = mongoose.Schema({
  // id: Number,
  description: String,
  isComplete: {
    type: Boolean,
    default: false
  }
})
// Model
let ToDoModel = mongoose.model("todos", todoSchema) // "CharacterModel" is a class


app.get("/", (req, res) => {
  res.send("Root route");
});

// Read - GET
app.get("/todos", (req, res) => {
  // Write queries
  ToDoModel.find({}, (err, resultsArr) => {
    if (err) {
      console.log(`error reading from db: ${err}`) // Tells developers
      res.status(404).json(`error reading from db: ${err}`) // Tells clients
    } else {
      // display todos
      if (resultsArr.length > 0) {
        res.status(200).json(resultsArr);
      } else {
        res.status(200).json({ message: "You ain't got no todos!!" });
      }
    }
  })
});

// Create - POST
app.post("/todos", (req, res) => {
  // add a new todo to our list
  let newTodo = new ToDoModel({
    description: req.body.description
    // isComplete will be false by default
  });

  newTodo.save((err, result) => {
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
app.delete("/todos/:id", (req, res) => {
  let requestedId = req.params.id; // The id will be a string from Mongo

  ToDoModel.findByIdAndDelete(requestedId, (err, result) => {
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
app.put("/todos/:id", (req, res) => {
  let requestedId = req.params.id;

  ToDoModel.findById(requestedId, (err, result) => {
    if (err) {
      console.log(`Error: ${err}`) // Tells devs
      res.status(404).json(`error reading from db: ${err}`) // Tells clients
    } else {
      result.isComplete = !result.isComplete;
      result.save((err2, updatedTodo) => {
        if (err2) {
          console.log(`Error updating document`)
          res.status(400).json(`error reading from db: ${err2}`) // Tells clients
        } else {
          console.log(updatedTodo)
          res.status(200).json(updatedTodo);
        }
      })
    }
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
