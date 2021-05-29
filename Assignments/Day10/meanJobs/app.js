//require all dependencies and initialize
const express = require("express");
require("./api/data/db.js");
const app = express();
const path = require("path");
//require routes
let routes = require("./api/routes");

//setup port
app.set("port", 4000);

//middlewares
app.use(express.json({ extended: true }));
app.use("/api", routes);
// serving static page
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));

//Listening to request on the specified port
let server = app.listen(app.get("port"), () => {
    console.log("Listening requests on port " + app.get("port"));
});