var mongoose= require("mongoose");

const addressSchema=new mongoose.Schema({
    state:String,
    city:String,
    zipcode:Number
});
var studentsSchema= new mongoose.Schema({
name : {
    type:String,
    required:true
},
grade :Number,
Address:addressSchema
});
mongoose.model("Student", studentsSchema, "students");

