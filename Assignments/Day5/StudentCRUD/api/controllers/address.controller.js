
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
//getting all addresses on specific student

module.exports.addressGetAll = function (req, res) {


    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        console.log("getting an address");
        res.status(200).json(student.Address);
    });
}
//getting one address of specific student
module.exports.addressGetOne = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        res.status(200).json(student.Address);
    });
}
//adding address
module.exports.addressAdd = function (req, res) {
    const studentId = req.params.studentId;
    console.log("Get studentId ", studentId);
    Student.findById(studentId).select(student).exec(function (err, student) {
        const response = { status: 200, message: [] };
        if (err) {
            console.log("Error finding student");
            response.status = 500; response.message = err;
        }
        else if (!student) {
            console.log("Student id not found in database", id);
            response.status = 404;
            response.message = { "message": "Student ID not found" + studentId };
        }
        if (student) {
            if (!(student.address)) {
                student.address = { state: "empty", city: "empty", zipcode: 0 };
            }
            _addStudent(req, res, student);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}
const _addAddress = function (req, res, Student) {
    student.address.state = req.body.state;
    student.address.city = req.body.city;
    student.address.zipcode = req.body.zipcode;
    student.save(function (err, updatedStudent) {
        const response = { status: 200, message: [] };
        if (err) {
            reponse.status = 500;
            response.message = err;
        } else {
            reponse.status = 201;
            response.message = updatedStudent.address;
        }
        res.status(response.status).json(response.message);
    });
}

//updating address
module.exports.addressUpdate = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500; response.message = err;
        }
        else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }
        else {
            _updateStudent(req, res, student);
        }
    });
};

const _updateAddress = function (req, res, student) {
    student.address.state = req.body.state;
    student.address.city = req.body.city;
    student.address.zipcode = req.body.zipcode;
    student.save(function (err, updatedStudent) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500; response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

//deleting address
module.exports.addressDelete = function (req, res) {
    const studentId = req.params.studentId;
    console.log("studentId", studentId);
    Game.findById(studentId).exec(function (err, student) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        }
        else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not Found!" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }
        else {
            _deleteAddress(req, res, student);
        }
    });
};
const _deletePublisher = function (req, res, student) {
    student.address.remove();
    student.save(function (err, game) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};
