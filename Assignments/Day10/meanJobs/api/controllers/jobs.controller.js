const mongoose = require("mongoose");
const Job = mongoose.model("Job");


module.exports.jobsGetAll = function(req, res){
    var offset = 0;
    var count = 5;
    const maxCount = 10;

    let response = {
        status: 400,
        message : "init"
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

    if(isNaN(offset) || isNaN(count)){
        response.status = 404;
        response.message = "Query String offset and count should be numbers";
        res.status(404).json(response.message);
        
    }

    if(count > maxCount){
        response.status = 400;
        response.message = "Count cannot exceed " + maxCount;
        res.status(response.status).json(response.message);
        
    }

    Job.find().skip(offset).limit(count).exec(function(err, jobs){
        console.log("get all ...");
        if(err){
            response.status = 500;
            response.message = err;
        }
        response.status = 200;
        response.message = jobs;
        res.status(response.status).json(response.message);

    })
}

module.exports.jobsAddOne = function(req, res){

    let response = {
        status : 400,
        message : ""
    }
    if(req.body && req.body.title && req.body.salary && req.body.description && req.body.experience){

        Job.create({
            title : req.body.title,
            salary : req.body.salary,
            description : req.body.description,
            experience : req.body.experience,
            postDate : req.body.postDate,
            location: {
                country : req.body.country,
                city : req.body.city,
                state : req.body.state
            }
            
        }, function(err, job){
            if(err){
                response.status = 500;
                response.message = err;
            }else {
                response.status = 201;
                response.message = job;
            }
            res.status(response.status).json(response.message);
            
        })

    }else {

        response.status = 400;
        response.message = {message: "Missing required fields"};
        res.status(response.status).json(response.message);
        
    }
}


module.exports.jobsGetOne = function(req, res){
    let id = req.params.id;

    let response = {
        status: 400,
        message: ""
    }

    Job.findById(id).exec(function(err, job){

        if(err){
            response.status = 500;
            response.message = err;
        }if(!job){
            response.status = 404;
            response.message = {message: "Job not found!"}
        }else {
            response.status = 200;
            response.message = job;
        }
        res.status(response.status).json(response.message);
       
    });
}



module.exports.jobsUpdateOne = function(req, res){
    let id = req.params.id;

    let response = {
        status: 400,
        message: "update started"
    }

    Job.findById(id).select("-skills")
            .exec(function(err, job){

        if(err){
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
            
        }else if(!job){
            response.state = 404;
            response.message = "Job  Not Found";
            res.status(response.status).json(response.message);
           
        }else {

            job.title = req.body.title;
            job.salary = req.body.salary;
            job.description = req.body.description;
            job.experience = req.body.experience;
            job.postDate = req.body.postDate;
            job.location.city= req.body.city,
            job.location.state=req.body.state,
            job.location.country=req.body.country

            job.save(function(err, job){
                if(err){
                    response.status = 500;
                    response.message = err;
                }else {
                    response.status = 200;
                    response.message = job;
                }
                res.status(response.status).json(response.message);
                
            })
        }
        
    });


}

module.exports.jobsDeleteOne = function(req, res){
    let id = req.params.id;
    let response = {
        status: 400,
        message: "deleting job opening"
    }
    Job.findByIdAndRemove(id).exec(function(err, deletedJob){
        if(err){
            response.status = 500;
            response.message = err;
        }else {
            response.status = 204;
            response.message = deletedJob;
        }
        res.status(response.status).json(response.message);
    });
}


