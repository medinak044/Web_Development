const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');

const mongoose = require('mongoose');
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI)
    .then(() => console.log(`Connected to ${keys.db} database.`))
    .catch((err) => console.error(`Error connecting to ${keys.db} database: ${err}`))

const User = require('./models/User')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('express-session')({
    secret: "Blah, blah, blah", // used to encrypt the user info before saving to DB
    resave: false,              // 
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
    res.render('home.ejs')
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs')
});

app.get('/items', isLoggedIn, (req, res) => {
    // Query for document data, then render page
    User.find({ _id: req.user._id },
        (err, docs) => {
            if (err) { console.log(`error: ${err}`) }
            else {
                // console.log(docs);
                res.render('items.ejs', { userInventory: docs[0].userInventory })
            }
        })
});

app.post('/items', isLoggedIn, (req, res) => {
    // Create post using the user.js model
    const item = {
        name: req.body.itemname
    };
    // Update user document to add item in  DB
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { userInventory: item } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success)
                res.redirect('/items'); // Where do you want the user to be redirected after posting an item
            }
        }
    );
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

app.post("/signup", function (req, res) {
    let newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("signup.ejs")
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/profile");
            });
        }
    })
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',
    {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }), function (req, res) {
        // We dont need anything in our callback function 
    });

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.send('Wrong page, hermano!')
});


// Place for querying data from MongoDB online database
// Query below displays all database documents in terminal
// User.find({}, (err, doggyhorse) => {
//     if (err) { console.log(`error: ${err}`) }
//     else { console.log(doggyhorse) }
// })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App is running on port ${port}`));