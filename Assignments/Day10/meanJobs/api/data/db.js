const mongoose = require("mongoose");
require("./jobs.model.js");
const dbUrl = "mongodb://localhost:27017/meanJobs";

mongoose.connect(dbUrl);

mongoose.connection.on("connected", function(){
    console.log("Mongooose connected to " + dbUrl);
})

