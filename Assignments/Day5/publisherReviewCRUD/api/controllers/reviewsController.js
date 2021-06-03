var mongoose = require("mongoose");

var Game = mongoose.model("Game");

module.exports.reviewGetAll = function (req, res) {
    var gameId = req.params.gameId;

    Game.findById(gameId).select("reviews").exec(function (err, doc) {

        res.status(200).json(doc.reviews);
    });
}

module.exports.reviewGetOne = function (req, res) {

    var gameId = req.params.gameId;

    var reviewId = req.params.reviewId;

    consloe.log("GET reviewId " + reviewId + " for gameId " + gameId);

    Game.findById(gameId).select("reviews").exec(function (err, game) {

        var review = game.reviews.id(reviewId);

        res.status(200).json(review);
    });
}

module.exports.updatereview = function (req, resp) {
    const id = req.params.gameId;
    Game.findById(id).select("reviews").exec(function (err, game) {
        if (err) {
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        else {
            console.log(game);
            game.reviews.name = req.body.name;
            game.reviews.rating = req.body.rating;
            game.reviews.reviews = req.body.reviews;

            game.save(function (err, Ugame) {
                if (err) {
                    console.log("review updated");
                    resp.status(204).json(Ugame);
                }
                else {
                    resp.status(200).json(Ugame);
                }
            });
        }

    });
};

module.exports.deleteReviews = function (req, resp) {
    const id = req.params.gameId;
    Game.findById(id).select("reviews").exec(function (err, game) {
        if (err) {
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        else {
            console.log(game);
            game.reviews.remove();
            game.save(function (err, Ugame) {
                if (err) {
                    console.log("reviews deleted");
                    resp.status(204).json(Ugame);
                }
                else {
                    resp.status(200).json(Ugame);
                }
            });

        }
    });

}

module.exports.createReviews = function (req, resp) {
    const id = req.params.gameId;
    Game.findById(id).exec(function (err, game) {
        if (err) {
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        const reviews = { name: req.body.name, rating: req.body.rating, reviews: req.body.reviews };

        game.reviews = reviews;
        console.log(game);
        game.save(function (err, Pgame) {
            if (err) {
                console.log("error reviews added");
                resp.status(204).json(Pgame);
            }
            else {
                resp.status(200).json(Pgame);
            }
        });

    });
}
