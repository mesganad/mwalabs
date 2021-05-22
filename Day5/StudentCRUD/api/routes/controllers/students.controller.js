
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
    var offset = 0;
    var count = 2;
    const maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        if (err) {
            console.log("Error finding students");
            res.status(500).json(err);
        }
        else {
            console.log("Found students", students.length);
            res.status(200).json(students);
        }
    });
};

module.exports.studentsGetOne = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        if (err) {
            console.log("Error finding student");
            res.status(500).json(err);
        }
        else if (!student) {
            res.status(404).json({ "message": "Student ID not found" });
        }
        else {
            res.status(200).json(student);
        }
    });
}

module.exports.studentsAddOne = function (req, res) {
    Student.create({ name: req.body.name, grade: req.body.grade, address: {} }, function (err, student) {
        if (err) {
            console.log("Error inserting student");
            res.status(400).json(err);
        } else {
            console.log("Student inserted", student);
            res.status(201).json(student);
        }
    });
};

module.exports.studentsUpdateOne = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            student.name = req.body.name;
            student.grade = req.body.year;
            student.address = {};
            student.save(function (err, updatedStudent) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};

//deleting a student
module.exports.studentsDeleteOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("DELETE studentId ", studentId);
    Student.findByIdAndRemove(studentId).exec(function (err, deletedStudent) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!deletedStudent) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};