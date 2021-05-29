
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    country: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }
});

const skillsSchema = mongoose.Schema({
    skill: {
        type: String
    }
})

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    salary : {
        type: Number
    },
    description: {
        type: String,
        require: true
    },
    experience : {
        type: Number,
        require: true
    },
    skills: {
        type: [skillsSchema]
    },
    postDate: {
        type: Date,
        default: new Date()
    },
    location : locationSchema

});

mongoose.model("Job", jobSchema, "jobs");