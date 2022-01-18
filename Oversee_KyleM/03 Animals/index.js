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