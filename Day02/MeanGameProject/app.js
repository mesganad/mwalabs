let express = require("express");
let app=express();
let path=require("path");
app.set("port",5000);
app.use("/public", express.static(path.join(__dirname,"public")));
app.get("/",function(req,res){
    console.log("Get received");
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});
let server=app.listen(app.get("port"),function(){
   let port = server.address().port;
   console.log("Listening "+port);
});
