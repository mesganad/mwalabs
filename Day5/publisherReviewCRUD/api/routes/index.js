var express =require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controllers.js");
var rev= require("../controllers/reviewsController.js");
var publisher =require("../controllers/publisherController.js")

router.route("/games").get(controllerGames.gamesGateAll).post(controllerGames.gamesAddOne);;
router.route("/games/:gameId").get(controllerGames.gamesGetOne).put(controllerGames.gamesUpdateOne).delete(controllerGames.gamesDeleteOne);
router.route("/games/:gameId/reviews").get(rev.reviewGetAll);
router.route("/games/:gameId/publisher").get(publisher.getpublisher).post(publisher.createPublisher).put(publisher.updatePublisher).delete(publisher.deletePublisher);
router.route("/games/:gameId/reviews").get(rev.reviewGetOne).post(rev.createReviews).put(rev.updatereview).delete(rev.deleteReviews);

module.exports = router;