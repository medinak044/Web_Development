const express = require(`express`);
const app = express();
const logger = require(`morgan`);
app.use(logger(`dev`));

app.set(`view engine`, `ejs`); // When viewing a file, must be an ejs file
// ^ Makes it so you don't have to type .ejs for render

app.get(`/`, (req, res) => {
    res.send(`Root route`);
});

// app.get(`/:animals`, (req, res) => {
//     // let data = req.params.animals;
//     res.render(`animals`, { animals: req.params.animals });
// });

const usersArr = [{ "id": 1, "first_name": "Mignonne", "last_name": "Ellis", "email": "mellis0@tuttocitta.it", "user_name": "mellis0" },
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

const itemsArr = [{ "Item ": "Veal - Knuckle" },
{ "Item ": "Turkey Leg With Drum And Thigh" },
{ "Item ": "Soho Lychee Liqueur" },
{ "Item ": "Beef - Eye Of Round" },
{ "Item ": "Sprouts Dikon" }]

app.get(`/profilepage`, (req, res) => {
    let { dog, cat } = req.params;
    res.render(`demo3`, { dog, cat });
});


app.get(`/demo`, (req, res) => {
    let animals = [`Giraffe`, `Zebra`, `Coyote`];
    res.render(`demo`, { data1: animals });
});

app.get(`/demo2`, (req, res) => {
    let animals = [
        {
            breed: 'dog',
            name: 'Spike'
        },
        {
            breed: 'cat',
            name: 'Mr Tabby'
        },
        {
            breed: 'bird',
            name: 'Tweety'
        }
    ]
    res.render(`demo2`, { data: animals });
});

app.get(`/:dog/:cat`, (req, res) => {
    let { dog, cat } = req.params;
    // res.render(`demo3`, { dog: dog, cat: cat }); // {key: value}
    res.render(`demo3`, { dog, cat }); // Shorthand: only if both key and value are the same name
});


app.get(`*`, (req, res) => {
    res.send(`404 error, page not found!`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}`));