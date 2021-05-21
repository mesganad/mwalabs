const express=require("express");
const router=express.Router();
const controllerGames=require("./controllers/games.controllers.js");
const controllerStudents=require("./controllers/address.controller.js");
router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games/:gameId/address").get(controllerStudents.addressGetAll);
router.route("/games/:gameId/address/:addressId").get(controllerStudents.addressGetOne);
module.exports = router;