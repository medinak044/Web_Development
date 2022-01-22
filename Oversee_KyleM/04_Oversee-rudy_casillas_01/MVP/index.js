// if (process.env.NODE_ENV !== `production`) {
//     require(`dotenv`).config()
// }

const express = require('express');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local');
// const flash = require(`express-flash`)
// const flash = require(`express-session`)
// const passportLocalMongoose = require('passport-local-mongoose');
app.use(express.urlencoded({ extended: false })); // For persistent login sessions
const userSessions = []; // For testing user session. Must eventually connect to a database to store the temporary login sessions
const initializePassport = require(`./passport-config`);
initializePassport(
    passport,
    username => { return userSessions.find(userSessions => userSessions.username === username) }
);
const bcrypt = require(`bcrypt`); // Allows for data encyption and the ability to read it

const mongoose = require('mongoose');
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI)
    .then(() => console.log(`Connected to ${keys.db} database.`))
    .catch((err) => console.error(`Error connecting to ${keys.db} database: ${err}`))

const User = require('./models/User').users
const itemModel = require('./models/User').items


app.use(express.json());

app.use(require('express-session')({
    secret: "Blah, blah, blah", // used to encrypt the user info before saving to DB
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret key
    resave: false, // Doesn't resave session variables if nothing has changed
    saveUninitialized: false // Doesn't save empty value in the session
}))

app.use(passport.session({}))

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


const fakeUsersArr = [{ "id": 1, "first_name": "Mignonne", "last_name": "Ellis", "email": "mellis0@tuttocitta.it", "user_name": "mellis0" },
{ "id": 2, "first_name": "Willyt", "last_name": "Antyukhin", "email": "wantyukhin1@about.com", "user_name": "wantyukhin1" },
{ "id": 3, "first_name": "Giusto", "last_name": "Bidwell", "email": "gbidwell2@netvibes.com", "user_name": "gbidwell2" },
{ "id": 4, "first_name": "Bethina", "last_name": "Dullaghan", "email": "bdullaghan3@bloomberg.com", "user_name": "bdullaghan3" },
{ "id": 5, "first_name": "Zane", "last_name": "Vakhrushin", "email": "zvakhrushin4@merriam-webster.com", "user_name": "zvakhrushin4" },
{ "id": 6, "first_name": "Gram", "last_name": "Betun", "email": "gbetun5@live.com", "user_name": "gbetun5" },
{ "id": 7, "first_name": "Mylo", "last_name": "Somerscales", "email": "msomerscales6@indiegogo.com", "user_name": "msomerscales6" },
{ "id": 8, "first_name": "Sarene", "last_name": "Loveredge", "email": "sloveredge7@google.cn", "user_name": "sloveredge7" },
{ "id": 9, "first_name": "Norbert", "last_name": "Rich", "email": "nrich8@trellian.com", "user_name": "nrich8" },
{ "id": 10, "first_name": "Neysa", "last_name": "Pozer", "email": "npozer9@free.fr", "user_name": "npozer9" },
{ "id": 11, "first_name": "Karly", "last_name": "Gowans", "email": "kgowansa@addthis.com", "user_name": "kgowansa" },
{ "id": 12, "first_name": "Johnathon", "last_name": "Hansill", "email": "jhansillb@naver.com", "user_name": "jhansillb" },
{ "id": 13, "first_name": "Wynne", "last_name": "Low", "email": "wlowc@senate.gov", "user_name": "wlowc" },
{ "id": 14, "first_name": "Corny", "last_name": "Santostefano.", "email": "csantostefanod@mapy.cz", "user_name": "csantostefanod" },
{ "id": 15, "first_name": "Anet", "last_name": "Dincey", "email": "adinceye@unc.edu", "user_name": "adinceye" },
{ "id": 16, "first_name": "Tracy", "last_name": "Baumert", "email": "tbaumertf@wikispaces.com", "user_name": "tbaumertf" },
{ "id": 17, "first_name": "Jasper", "last_name": "Staff", "email": "jstaffg@umn.edu", "user_name": "jstaffg" },
{ "id": 18, "first_name": "Angelle", "last_name": "Zum Felde", "email": "azumfeldeh@bloomberg.com", "user_name": "azumfeldeh" },
{ "id": 19, "first_name": "Merilee", "last_name": "Tarbert", "email": "mtarberti@infoseek.co.jp", "user_name": "mtarberti" },
{ "id": 20, "first_name": "Vito", "last_name": "Mapledorum", "email": "vmapledorumj@imdb.com", "user_name": "vmapledorumj" }]

const fakeItemsArr = [{ "Item": "Veal - Knuckle" },
{ "Item": "Turkey Leg With Drum And Thigh" },
{ "Item": "Soho Lychee Liqueur" },
{ "Item": "Beef - Eye Of Round" },
{ "Item": "Sprouts Dikon" },
{ "Item": "Shrimp - Black Tiger 16/20" },
{ "Item": "Kiwano" },
{ "Item": "Bread Base - Italian" },
{ "Item": "Peppercorns - Green" },
{ "Item": "Onions - Cooking" },
{ "Item": "Wine - Blue Nun Qualitatswein" },
{ "Item": "Wine - Wyndham Estate Bin 777" },
{ "Item": "Butter Sweet" },
{ "Item": "Sole - Fillet" },
{ "Item": "Oil - Olive" },
{ "Item": "Lamb Rack Frenched Australian" },
{ "Item": "Beans - Black Bean, Preserved" },
{ "Item": "Ecolab - Mikroklene 4/4 L" },
{ "Item": "Icecream Bar - Del Monte" },
{ "Item": "Pastry - Chocolate Chip Muffin" },
{ "Item": "Appetizer - Mini Egg Roll, Shrimp" },
{ "Item": "Squid Ink" },
{ "Item": "Bread Crumbs - Panko" },
{ "Item": "Lamb - Pieces, Diced" },
{ "Item": "Garlic - Primerba, Paste" },
{ "Item": "Veal - Shank, Pieces" },
{ "Item": "Paper - Brown Paper Mini Cups" },
{ "Item": "Wine - Crozes Hermitage E." },
{ "Item": "Sugar - Brown, Individual" },
{ "Item": "Oil - Margarine" },
{ "Item": "Extract Vanilla Pure" },
{ "Item": "Soup - Campbells, Creamy" },
{ "Item": "Loaf Pan - 2 Lb, Foil" },
{ "Item": "Tea - Herbal Sweet Dreams" },
{ "Item": "Table Cloth 62x114 Colour" },
{ "Item": "Muffin Batt - Choc Chk" },
{ "Item": "Carbonated Water - Strawberry" },
{ "Item": "Container - Hngd Cll Blk 7x7x3" },
{ "Item": "Juice - Orange, 341 Ml" },
{ "Item": "Flavouring - Raspberry" },
{ "Item": "Pie Pecan" },
{ "Item": "Compound - Orange" },
{ "Item": "Wine - Sauvignon Blanc" },
{ "Item": "Sugar - Brown" },
{ "Item": "Wine - Chateau Timberlay" },
{ "Item": "Bag - Bread, White, Plain" },
{ "Item": "Wine - Zonnebloem Pinotage" },
{ "Item": "Wine - Red, Gallo, Merlot" },
{ "Item": "Cheese - Ermite Bleu" },
{ "Item": "Almonds Ground Blanched" },
{ "Item": "Wine - Chardonnay South" },
{ "Item": "Turkey - Breast, Bone - In" },
{ "Item": "Monkfish Fresh - Skin Off" },
{ "Item": "Sour Puss Sour Apple" },
{ "Item": "Banana - Green" },
{ "Item": "Beans - Green" },
{ "Item": "Veal - Insides, Grains" },
{ "Item": "Wasabi Paste" },
{ "Item": "Pineapple - Golden" },
{ "Item": "Loaf Pan - 2 Lb, Foil" },
{ "Item": "Alize Gold Passion" },
{ "Item": "Mushroom - Enoki, Dry" },
{ "Item": "Longan" },
{ "Item": "Soup - Campbells Asian Noodle" },
{ "Item": "Sauce - Plum" },
{ "Item": "Chicken - White Meat With Tender" },
{ "Item": "Goat - Whole Cut" },
{ "Item": "Salmon - Whole, 4 - 6 Pounds" },
{ "Item": "Bread - Italian Roll With Herbs" },
{ "Item": "Kellogs Raisan Bran Bars" },
{ "Item": "Sproutsmustard Cress" },
{ "Item": "Quail - Eggs, Fresh" },
{ "Item": "Pasta - Lasagna Noodle, Frozen" },
{ "Item": "Bread - White Mini Epi" },
{ "Item": "Flax Seed" },
{ "Item": "Foam Cup 6 Oz" },
{ "Item": "Coffee Cup 12oz 5342cd" },
{ "Item": "Jello - Assorted" },
{ "Item": "Gingerale - Schweppes, 355 Ml" },
{ "Item": "Soup - French Onion, Dry" },
{ "Item": "Cheese - Goat" },
{ "Item": "Soup - Knorr, Veg / Beef" },
{ "Item": "Cups 10oz Trans" },
{ "Item": "Truffle Cups - Brown" },
{ "Item": "Ice Cream Bar - Rolo Cone" },
{ "Item": "Sobe - Tropical Energy" },
{ "Item": "Cake Sheet Combo Party Pack" },
{ "Item": "Tomato Paste" },
{ "Item": "Salmon - Atlantic, Fresh, Whole" },
{ "Item": "Pur Value" },
{ "Item": "Flour - Pastry" },
{ "Item": "Longos - Chicken Cordon Bleu" },
{ "Item": "Cheese - Oka" },
{ "Item": "Wine - Fontanafredda Barolo" },
{ "Item": "Wine - Vouvray Cuvee Domaine" },
{ "Item": "Bagel - Sesame Seed Presliced" },
{ "Item": "Crush - Cream Soda" },
{ "Item": "Wine - Red, Metus Rose" },
{ "Item": "Brownies - Two Bite, Chocolate" },
{ "Item": "Muffin - Mix - Mango Sour Cherry" }]


app.get('/', (req, res) => {
    res.redirect('/home') // Automatically defaults to "/home" route
});

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

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
    const usersArr = fakeUsersArr;
    const itemsArr = fakeItemsArr;

    const createRandomInventory = (uArr, iArr) => {
        let min = 0; let max = 5;
        let resultArr = [];

        for (let i = 0; i < uArr.length; i++) {
            let newInvArr = []; // Each inventory array is it's own list element of the parent array
            let invAmt = (() => Math.floor(Math.random() * (max - min) + min))(); // This IIFE produces a random integer

            // Pick random items from the items array
            for (let j = 0; j < invAmt; j++) {
                // Insert x amount of random items into array
                let randomItemId = (() => Math.floor(Math.random() * (iArr.length - 0) + 0))();
                newInvArr.push(iArr[randomItemId]);
            }
            resultArr.push(newInvArr);
        }
        return resultArr;
    }

    res.render(`items.ejs`, { userData: usersArr, userInventory: createRandomInventory(usersArr, itemsArr) });
});


app.post("/items", (req, res) => {
    let newItem = new itemModel({
        name: req.body.username
    })



    // newItem.save((err, result) => {
    //     if (err) {
    //         console.log(`Error: ${err}`)
    //         res.status(404).json(`error reading from db: ${err}`) // Tells clients
    //     } else {
    //         console.log(result)
    //         res.status(200).json(result);
    //     }
    // })
});



app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

app.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // Hashed 10 times over
        userSessions.push({
            userName: req.body.username,
            password: hashedPassword
        }) // Adds user session to the database temporarily
        res.redirect("/login");
    } catch { res.render("signup.ejs") }
    console.log(userSessions);
    // let newUser = new User({ username: req.body.username });
    // User.register(newUser, req.body.password, function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         return res.render("signup.ejs")
    //     } else {
    //         passport.authenticate("local")(req, res, function () {
    //             res.redirect("/profile");
    //         });
    //     }
    // })
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',
    {
        // successRedirect: '/profile',
        failureRedirect: '/login'
    }), function (req, res) {
        res.redirect('/profile');
        // Needs to somehow capture the user's login details, then use that information
        // to query the user's data from the database to be able to display user's profile
        // on the web page  
    }
);

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

// Manually creates new user for testing purposes
// const createNewUser = (() => {
//     let newUser = {
//         username: `guest${Math.floor(Math.random() * (99999 - 0) + 0)}`,
//         password: 0
//     }
//     User.create(newUser, (err, doggyhorse) => {
//         if (err) { console.log(`error: `, error) }
//         else { console.log(doggyhorse) }
//     })
// })() //IIFE

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App is running on port ${port}`));