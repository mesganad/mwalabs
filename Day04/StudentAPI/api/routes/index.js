
const express=require("express");
const Router=express.Router();
const controllerStudents=require("./controllers/students.controller.js");
const controllerAddress=require("./controllers/address.controller.js");
Router.route("/students").get(controllerStudents.studentsGetAll);
Router.route("/students/:studentId").get(controllerStudents.studentsGetOne);
Router.route("/students/:studentId/address").get(controllerAddress.addressGetAll);
Router.route("/students/:studentId/address/:addressId").get(controllerAddress.addressGetOne);
module.exports = Router;