const express = require(`express`);
const app = express();
const $fetch = require(`node-fetch`); // "$fetch"(node-fetch) indicates backend version of "fetch"
const logger = require(`morgan`);
app.use(logger(`dev`));

app.set(`view engine`, `ejs`); // When viewing a file, must be an ejs file
// ^ Makes it so you don't have to type .ejs for render

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


// 1. Make a connection
const mongoose = require(`mongoose`)
const keys = require(`./config/keys`); // Access keys file so we can use our key

// Connect to our database
// When using older Mongoose, must pass the 2nd argument options
mongoose.connect(keys.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connected!`))
    .catch(error => console.log(`Issues connecting`, error))

app.get(`/`, (req, res) => {
    res.redirect(`/home`);
});

app.get(`/home`, (req, res) => {
    res.render(`home`);
});

app.get(`/profile`, (req, res) => {
    res.render(`profile`, {});
});

app.get(`/users`, (req, res) => {
    // Generate random inventory for each user
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

    res.render(`users`, { userData: usersArr, userInventory: createRandomInventory(usersArr, itemsArr) });
});


app.get(`*`, (req, res) => {
    res.send(`404 error, page not found!`);
});

// Query for finding records MongoDB database
// CharacterModel.find({}, (err, characters) => {
//     if (err) { console.log(`error: ${err}`) }
//     else { console.log(characters) }
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}`));

// app.get(`/:dog/:cat`, (req, res) => {
//     let { dog, cat } = req.params;
//     // res.render(`demo3`, { dog: dog, cat: cat }); // {key: value}
//     res.render(`demo3`, { dog, cat }); // Shorthand: only if both key and value are the same name
// });

// app.get(`/:animals`, (req, res) => {
//     // let data = req.params.animals;
//     res.render(`animals`, { animals: req.params.animals });
// });

// app.get(`/demo`, (req, res) => {
//     let animals = [`Giraffe`, `Zebra`, `Coyote`];
//     res.render(`demo`, { data1: animals });
// });


// app.get(`/users`, (req, res) => {
//     // Generate random inventory for each user
//     const usersArr = fakeUsersArr;
//     const itemsArr = fakeItemsArr;

//     const createRandomInventory = (uArr, iArr) => {
//         let min = 0; let max = 5;
//         let resultArr = [];

//         for (let i = 0; i < uArr.length; i++) {
//             let newInvArr = []; // Each inventory array is it's own list element of the parent array
//             let invAmt = (() => Math.floor(Math.random() * (max - min) + min))(); // This IIFE produces a random integer

//             // Pick random items from the items array
//             for (let j = 0; j < invAmt; j++) {
//                 // Insert x amount of random items into array
//                 let randomItemId = (() => Math.floor(Math.random() * (iArr.length - 0) + 0))();
//                 newInvArr.push(iArr[randomItemId]);
//             }
//             resultArr.push(newInvArr);
//         }
//         return resultArr;
//     }

//     res.render(`users`, { userData: usersArr, userInventory: createRandomInventory(usersArr, itemsArr) });
// });
