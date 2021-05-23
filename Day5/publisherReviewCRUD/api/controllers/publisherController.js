const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getpublisher = function(req,resp){
    const id = req.params.gameId;
    Game.findById(id).select("publisher").exec(function(err, game){
        if(err){
            console.log("error when getting a Publishers");
            resp.status(500).json(err);
        }
        resp.status(200).json(game);
    });
}
module.exports.createPublisher = function(req,resp){
    const id = req.params.gameId;
    Game.findById(id).exec(function(err, game){
        if(err){
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        const publisher = {name:req.body.name, country:req.body.country};
        
        game.publisher =publisher;
        console.log(game);
        game.save(function(err, Pgame){
            if(err){
                console.log("publishern not added");
                resp.status(500).json(Pgame);
            }
            else{
                resp.status(200).json(Pgame);
            }
        });
        
    });
}

module.exports.updatePublisher = function(req, resp){
    const id = req.params.gameId;
    Game.findById(id).select("publisher").exec(function(err, game){
        if(err){
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        else{
            console.log(game);
            game.publisher.name=req.body.name;
            game.publisher.country =req.body.country;

            game.save(function(err,Ugame){
                if(err){
                    console.log("publisher updated");
                    resp.status(204).json(Ugame);
                }
                else{
                    resp.status(200).json(Ugame);
                }
            });
        }
        
    });
};

module.exports.deletePublisher = function(req,resp){
    const id = req.params.gameId;
    Game.findById(id).select("publisher").exec(function(err, game){
        if(err){
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        else{
            console.log(game);
            game.publisher.remove();
            game.save(function(err,Ugame){
                if(err){
                    console.log("publisher deleted");
                    resp.status(204).json(Ugame);
                }
                else{
                    resp.status(200).json(Ugame);
                }
            });

        }
    });

}

