const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello Express");
});

app.get("/about", (req, res) => {
    res.status(200).send("About");
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("<h1>Resource not found</h1>");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server running!");
});
