
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressGetAll= function(req, res) {
    const studentId= req.params.studentId;
    Student.findById(studentId).select("address").exec(function(err, student) {
        if(err){
            res.status(500).json(err);
        }
        else{
               res.status(200).json(student.address);
        }
    });
}

module.exports.addressGetOne= function(req, res) {
    const studentId= req.params.studentId;
    const addressId=req.params.addressId;

    Student.findById(studentId).exec(function(err, student) {

        if(err){
            res.status(500).json(err);
        }

        else if(!student){
            res.status(404).json({"message":"Student not found"});
        }
        
        else{
               //let addr=student.address.id(addressId);
               res.status(200).json(student.address);
        }

    

    });
}