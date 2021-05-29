const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.locationGetOne = function(req, res){
    let id = req.params.id;

    Job.findById(id).select("location").exec(function(err, job){
        let response = {
            status : 201,
            message: job.location
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.locationAddOne = function(req, res){
    let id = req.params.id;
    let body = req.body;

    let response = {
        status: 201,
        message: ""
    }

    if(body && body.country && body.city && body.state){
        console.log(id);

        Job.findById(id).exec(function(err, job){
            if(err){
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
                return;
            }else if(!job) {
                response.status = 404;
                response.message = "Job not Found.";
                res.status(response.status).json(response.message);
                return;
            }else {
                
                job.location = {
                    city: body.city,
                    state: body.state,
                    country: body.country
                }
                job.save(function(err, updatedJob){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }else {
                        response.status = 201;
                        response.message = updatedJob;
                    }

                    res.status(response.status).json(response.message);
                    return;

                });
            }    
            
        })

    }else {
        response.status = 400;
        response.message = "Required field is missing";
        res.status(response.status).json(response.message);
        return;
    }


}

module.exports.locationDeleteOne = function(req, res){
    let id = req.params.id;

    Job.findById(id).exec(function(err, job){

        let response = {
            status: 204,
            message : ""
        }

        if(err){
            response.status = 500;
            response.message = err;
        }else if(!job){
            response.status = 404;
            response.message = {message : "Job not found"};
        }else {
            job.location.remove();
            job.save(function(err, job){
                if(err){
                    response.status = 500;
                    response.message = err;
                }else{
                    response.status = 201;
                    response.message = "";
                }
                res.status(response.status).json(job)

            
            })
        }
        res.status(response.status).json(response.message)
    })
}