var mongoose= require("mongoose");

var Game= mongoose.model("Game");

module.exports.reviewGetAll= function(req, res) {
var gameId= req.params.gameId;

Game.findById(gameId).select("reviews").exec(function(err, doc) {

res.status(200).json(doc.reviews);
});
}

module.exports.reviewGetOne= function(req, res) {

    var gameId= req.params.gameId;

    var reviewId= req.params.reviewId;

    consloe.log("GET reviewId "+ reviewId+ " for gameId "+ gameId);

    Game.findById(gameId).select("reviews").exec(function(err, game) {

    var review= game.reviews.id(reviewId);

    res.status(200).json(review);
    });
    }
