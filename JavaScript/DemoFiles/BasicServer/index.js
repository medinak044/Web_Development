// FOUNDATION
const express = require("express");
const app = express();

// ROUTE HANDLERS
app.get("/", (req, res) => {
    res.send("Server response");
});

// LISTENER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}`));