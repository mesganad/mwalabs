let express = require("express");
let app = express();
let path = require("path");
let routes = require("./api/routes");
require("./api/data/dbconnection.js").open();
app.set("port", 5000);
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
    console.log("Get received");
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", routes);


app.use("/css", function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/public", express.static(path.join(__dirname, "public")));

let server = app.listen(app.get("port"), function () {
    let port = server.address().port;
    console.log("Listening " + port);
});
