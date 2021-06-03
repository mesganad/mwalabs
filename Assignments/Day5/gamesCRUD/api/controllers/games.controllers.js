
const { json } = require("express");
let mongoose = require("mongoose");
let Game = mongoose.model("Game");

//get all games
module.exports.gamesGateAll = function (req, res) {

    const maxCount = 10;
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    //Limit check
    if (count > maxCount) {
        console.log("Count cannot exceed " + maxCount);
    }
    //type check for the input query
    if (isNaN(offset) || isNaN(count)) {
        res.status(404).json({ "messahe": "the query string offset and count should be a number" });
    }

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        //error check

        if (err) {
            console.log("error finding games");
            res.status(500).json(err);
        }
        else {
            console.log("Found games", games.length);
            res.status(200).json(games);
        }
    });

};

//get one game
module.exports.gamesGetOne = function (req, res) {

    let gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {

        let response = {
            status: 200,
            message: game
        }
        if (err) {//error checking

            response.status = 500;
            response.message = err;

        } else if (!game) {//result checking

            response.status = 404;
            response.message = { "message": "Game Id not found" };
        }
        res.status(response.status).json(response.message);

    });


}
//add one game
module.exports.gamesAddOne = function (req, res) {

    Game.create({
        title: req.body.title,
        price: parseFloat(req.body.price),
        rate: parseFloat(req.body.rate)
    }, function (err, game) {
        if (err) {
            console.log("Error adding games");
            res.status(400).json(err);
        } else {
            console.log("Game created", game);
            res.status(201).json(game);
        }
    });
}



//update a game 
module.exports.gamesUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }
        else {
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.designer = req.body.designer;
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseFloat(req.body.rate);
            game.minAge = parseInt(req.body.minAge);

            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};


module.exports.gamesDeleteOne = function (req, res) {

    let gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);

    Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {
        let response = { status: 204 };

        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } 
        else if (!deletedGame) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};

