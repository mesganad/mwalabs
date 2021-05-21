
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressGetAll= function(req, res) {
    const studentId= req.params.studentId;
    Student.findById(studentId).exec(function(err, student) {
    res.status(200).json(student.address);
    });
}

module.exports.addressGetOne= function(req, res) {
    const studentId= req.params.studentId;
    Student.findById(studentId).exec(function(err, student) {
    res.status(200).json(student.address);
    });
}