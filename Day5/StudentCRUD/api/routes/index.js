
const express = require("express");
const Router = express.Router();
const controllerStudents = require("./controllers/students.controller.js");
const controllerAddress = require("./controllers/address.controller.js");
Router.route("/students").get(controllerStudents.studentsGetAll).post(controllerStudents.studentsAddOne);
Router.route("/students/:studentId").get(controllerStudents.studentsGetOne).put(controllerStudents.studentsUpdateOne)
    .delete(controllerStudents.studentsDeleteOne);
Router.route("/students/:studentId/address").get(controllerAddress.addressGetAll).post(controllerAddress.addressAdd)
    .put(controllerAddress.addressUpdate).delete(controllerAddress.addressDelete);
Router.route("/students/:studentId/address/:addressId").get(controllerAddress.addressGetOne);
module.exports = Router;