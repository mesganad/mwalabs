var express = require("express");
var path = require("path");
var app = express();
app.use(express.json);
require("./api/data/db.js");

var routes = require("./api/routes");
app.set("port",3000);
//app.use(express.urlencoded({extended : false}));
app.use(express.json({extended : false}));
app.get("/", function(req,res){
    console.log("GET received");
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});
app.use("/api",routes);
app.get("/file", function(req,res){
    console.log("GET received");
    res.status(200).sendFile(path.join(__dirname,"app14.js"));
});
app.use("/",express.static(path.join(__dirname,"public")));
var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port " +port);
});