
const dbConnection= require("../../data/dbconnection.js");
module.exports.gamesGetAll=function(req,res){
console.log("json request received");
res.status(200).json({"jsonData":true});
};
const db=dbConnection.get();
console.log("db",db);
const collection= db.collection("games");
// const docs= collection.find(); //Sync not good :(
collection.find().toArray(function(err, docs) {
console.log("Found games", docs);
res.status(200).json(docs);
});
