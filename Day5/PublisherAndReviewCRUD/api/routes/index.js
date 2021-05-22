var express =require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controllers.js");
var rev= require("../controllers/reviewsController.js");


router.route("/games").get(controllerGames.gamesGateAll).post(controllerGames.gamesAddOne);;

//router.route("/games/add").post(controllerGames.gamesAddOne);

router.route("/games/:gameId").get(controllerGames.gamesGetOne).put(controllerGames.gamesUpdateOne).delete(controllerGames.gamesDeleteOne);


//router.route("/games/:gameId/publisher").get();
router.route("/games/:gameId/reviews").get(rev.reviewGetAll);

router.route("/games/:gameId/reviews/:reviewId").get(rev.reviewGetOne);

module.exports = router;