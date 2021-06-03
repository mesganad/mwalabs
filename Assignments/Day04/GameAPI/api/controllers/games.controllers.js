
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
    var offset = 0;
    var count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    Game.find().exec(function (err, games) {
        console.log("Found games", games);
        if(err){
            res.status(500).json(err);
        }
        else if(!games){
            res.status(404).json({"message":"Games not found"});
        }
        else{
        res.status(200).json(games);
        }
    });
};


module.exports.gamesGetOne= function(req, res) {
const gameId= req.params.gameId;
Game.findById(gameId).exec(function(err, game) {
    if(err){
        res.status(500).json(err);
    }
    else if(!game){
        res.status(404).json({"message":"Game not found"});
    }
    else{
    res.status(200).json(game);
    }
});
}
