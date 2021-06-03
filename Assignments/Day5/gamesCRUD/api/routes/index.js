let express =require("express");
let router = express.Router();
let controllerGames = require("../controllers/games.controllers.js");

router.route("/games").get(controllerGames.gamesGateAll).post(controllerGames.gamesAddOne);
router.route("/games/:gameId").get(controllerGames.gamesGetOne).put(controllerGames.gamesUpdateOne).delete(controllerGames.gamesDeleteOne);

module.exports = router;