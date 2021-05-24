var express= require("express");
var path= require("path");
var routes= require("./api/routes");
var app= express();
app.set("port", 5000);
app.use(function(req, res, next) {
console.log(req.method, req.url);
next();
});
app.use("/api", routes);
var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port "+ port );
});

 