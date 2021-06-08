// require this before everything else 
require("./api/data/db");
var express = require("express");
var path = require("path");
var routes =require("./api/routes");

//initilize and setup
const app = express();
app.set("port", 5000);

// interceptor - logging
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
})

// serving static page
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));


app.use(express.json({extended : false}));

app.use("/api", routes);


const server = app.listen(app.get("port"), function(){
    console.log("Listening to port " + server.address().port);
})