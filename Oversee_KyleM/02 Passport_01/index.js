const express = require("express")
const app = express()
const logger = require("morgan")
app.use(logger("dev"))

const mongoose = require(`mongoose`)
const passport = require(`passport`)
const LocalStrategy = require(`passport-local`)

const keys = require(`./config/keys`);

mongoose.connect(keys.mongoURI)
    .then(() => console.log(`Connected to ${keys.db} database.`))
    .catch(err => console.log(`Issues connecting to the database!`))

const userModel = require(`./models/User`)

// (Body parser) Takes someone's data in a form 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require(`express-session`)({
    secret: `Blah blah blah`, // Used to encrypt the user info before saving to db
    resave: false, // Save the session obj even if not changed
    saveUninitialized: false // Save the session obj even if not initialized
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(userModel.authenticate()))
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())


app.get("/", (req, res) => {
    res.redirect("/home")
})

// Checks if user is logged in before authorizing user to certain web page
// () => functions must be declared before they are called
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Must be "return next()", no exceptions
    }
    res.redirect(`/`);
}

app.get("/home", (req, res) => {
    res.render("home.ejs")
})

app.get("/profilepage", isLoggedIn, (req, res) => {
    // Write query to get all users from DB

    res.render(`profilepage.ejs`)
})

app.get("/signup", (req, res) => {
    res.render(`signup.ejs`)
})


app.get("/login", (req, res) => {
    res.render(`login.ejs`)
})

app.post('/login', passport.authenticate('local',
    {
        successRedirect: '/profilepage',
        failureRedirect: '/login'
    }), (req, res) => { }); // We don’t need anything in our callback function

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect(`/`);
})

app.get("*", (req, res) => {
    res.json({ message: "That route doesn't exist" })
})

app.post("/signup", (req, res) => {
    let newUser = new userModel({ username: req.body.username });
    userModel.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("signup.ejs")
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/profilepage");
            });
        }
    })
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port running on ${port}`))