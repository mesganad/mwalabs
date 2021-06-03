const mongoos =require("mongoose");
const Game = mongoos.model("Games");

module.exports.gamesGetAll = function(req, res){
    console.log("Get all games");
    console.log(req.query);

    var offset = 0;
    var count = 5;
    const maxCount = 10;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count); 
    }


    console.log(count);

    if(isNaN(offset) || isNaN(count)){
        res.status(404).json({"message": "QueryString offset and count should be numbers"});
        return;
    }

    if(count > maxCount){
        res.status(400).json({"message": "Count exceeds maximum of " + maxCount});
    }

    
    Game.find().skip(offset).limit(count).exec(function(err, games){
        if(err){
            console.log("Err finding games");
            res.status(500).json(err);
        }
        console.log("Found games ", games.length);
        res.status(200).json(games);
    });

}

module.exports.gamesGetOne = function(req, res){
    
    const gameId = req.params.gameId;

    Game.findById(gameId).exec(function(err, game){
        const response = {
            status : 200,
            message : game
        };

        if(err){
            console.log(err);
            response.status = 500;
            response.message = err;
            return;
        }else if(!game){
            response.status = 400;
            response.message = "Game ID not found.";
        }
        
        res.status(response.status).json(response.message);
    });
}

module.exports.gamesAddOne = function(req, res){
    console.log("POST to add a game");

    if(req.body && req.body.title && req.body.price){
              
        Game.create({
            title : req.body.title,
            year : req.body.year,
            rate : req.body.rate, 
            price : req.body.price,
            minPlayers : req.body.minPlayers,
            maxPlayers : req.body.maxPlayers,
            reviews : "",
            minAge : req.body.minAge,
            designers :req.body.designers
        }, function(err, game){
            const response = {
                status : 201,
                message : game
            }
            if(err){
                response.status = 400;
                response.message = err
            }
            res.status(response.status).json(response.message);
        });

        console.log(req.body);
    }else {
        console.log("Data missing from POST body");
        res.status(400).json({error: "Required data missing from POST"});
    }

}

module.exports.gamesUpdateOne = function(req, res){
    const gameId = req.param.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game){
        const response = {
            status : 204,
            message : game
        }
        if(err){
            response.status = 500;
            response.message = err
        }else if(!game) {
            response.status = 404;
            response.message = {"message": "Game ID not found"};
        }
        
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else {
          
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.rate = parseInt(req.body.rate);
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.minAge = rparseInt(eq.body.minAge);
            game.designers = req.body.designers;
            game.save(function(err, updatedGame){
                response.message = updatedGame;
                if(err){
                    response.status= 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);

            });
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.gamesDeleteOne = function(req, res){
    const gameId = req.param.gameId;
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        const response = {
            status : 204,
            message : deletedGame
        }
        if(err){
            response.status = 500;
            response.message = err
        }else if(!game) {
            response.status = 404;
            response.message = {"message": "Game Id not found"};
        }

        res.status(response.status).json(response.message);

    })
}

