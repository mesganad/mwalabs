
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
    var offset = 0;
    var count = 2;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    Student.find().exec(function (err, students) {
        console.log("Found students", students.length);
        res.status(200).json(students);
    });
};


module.exports.studentsGetOne = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        if (err) {
            res.status(500).json(err);
        }
        else if (!student) {

            res.status(404).json({ "message": "student not found" });
        }
        else {
            res.status(200).json(student);
        }
    });
}
