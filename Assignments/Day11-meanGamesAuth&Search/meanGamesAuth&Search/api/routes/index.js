var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controller");
const controllerPublisher = require("../controllers/publisher-controller");
const controllerUsers=require("../controllers/users.controller");

router.route("/games").get(controllerGames.gamesGetAll).post(controllerGames.gamesAddOne);
router.route("/games/search").get(controllerGames.gameSearch);
router.route("/games/:gameId").get(controllerGames.gamesGetOne).put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers").get(controllerPublisher.publisherGetOne);

router.route("/users/register").post(controllerUsers.usersRegister);
router.route("/users/authenticate").post(controllerUsers.usersAuthenticate);


module.exports = router