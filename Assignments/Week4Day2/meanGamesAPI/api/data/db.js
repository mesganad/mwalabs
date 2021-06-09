// require("mongodb");
const mongoos =require("mongoose");
require("./games.model.js")
require("./users-model");
const dbURL = "mongodb://localhost:27017/meanGames";

mongoos.connect(dbURL);

mongoos.connection.on("connected", function(){
    console.log("Mongoose connected to " + dbURL);
});

mongoos.connection.on("disconnected", function(){
    console.log("Mongoose disconnected.");
});
mongoos.connection.on("error ", function(err){
    console.log("Mongoose connection error " + err);
});
process.on("SIGINT", function(){
    mongoos.connection.close(function(){
        console.log("Mongoose disconnected by application termination.");
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);

    });
    })
process.once("SIGUSR2", function(){
    mongoos.connection.close(function(){
        console.log("Mongoose disconnected by application restart.");
        process.kill(process.pid, "SIGUSR2"); 
    });
});