let express= require("express");
let router= express.Router();
let additionController = require("../controllers/additionController.js");
router.route("/add/:firstNumber").get(additionController.getSummation);
module.exports = router;
 