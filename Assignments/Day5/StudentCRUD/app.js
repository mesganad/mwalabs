const mongoose=require("mongoose");
require("./api/data/db.js");
require("./api/data/students-model");
let express = require("express");
let app = express();
app.use(express.json);
let path = require("path");

let routes = require("./api/routes");

const { gamesGetAll } = require("./api/controllers/students.controller.js");
const { parse } = require("path");
require("./api/data/db.js");
app.set("port", 5000);
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
    console.log("Get received");
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});
//json request
app.use("/api", routes);

//application level middleware
app.use("/css", function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
//order matters
app.use("/public", express.static(path.join(__dirname, "public")));

let server = app.listen(app.get("port"), function () {
    let port = server.address().port;
    console.log("Listening " + port);
});
