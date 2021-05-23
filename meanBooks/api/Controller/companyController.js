require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Jobs = mongoose.model("Jobs");

//Get all Jobs

module.exports.getAllCompany = (req, res) => {

    const maxCount = 10;
    let offSet = 0;
    let count = 2;
    const jobId = req.params.jobId;

    if (req.query && req.query.offSet) {
        offSet = parseInt(req.query.offSet);
    }
    if (req.query && req.query.count) {
        count = parseInt(query.count);

        //Limit checking
        if (count > maxCount) {
            count = maxCount;
        }
    }

    //type checking
    if (isNaN(offSet) || isNaN(count)) {
        res.status(404).json({ "message": "Offset and count should be a number" });
    }

    Jobs.findById(jobId).select("company").skip(offSet).limit(count).exec((err, company) => {
        //error checking
        if (err) {

            console.log("Error in finding company");
            res.status(500).json(err);

        } else {
            res.status(200).json(company);
        }
    });

}
module.exports.getOneCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, companies) => {
        //error checking
        if (err) {

            console.log("cannot find company");
            res.status(404).json(err);

        } else if (!companies) {

            console.log("can not find a company");
            res.status(404).json({ "message": "can't find a job with this Id" });

        }
        else {
            /*const cId = req.params.cId;

            for(int i=0;i<companies.)

            const company = companies.id(cId);*/
            res.status(200).json(companies.company);
        }




    });

}

module.exports.addCompany = (req, res) => {

    const jobId = req.params.jobId;
    Jobs.findById(jobId).exec((err, job) => {
        if (err) {
            res.status(500).json(err);
        }

        const company = { companyName: req.body.companyName, "state": req.body.state };

        job.company = company;
        job.save((err, com) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(com);
            }


        });
    });
}

//Update 
module.exports.updateCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        const response = { status: 204 };
        //error checking
        if (err) {

            response.status = 500;

            console.log("cannot find JobId");
            res.status(404).json(err);

        } else {

            job.company.companyName = req.body.companyName;
            job.company.state = req.body.state;

            job.save((err, updatedcompany) => {
                if (err) {
                    res.status(500).json(err);
                }
                else {

                    res.status(response.status).json({ "message": "Company Updated Successfully" });
                }

            });


        }
    });
}

//delete

module.exports.deleteCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        const response = { status: 204 };
        //error checking
        if (err) {

            response.status = 500;

            console.log("cannot find a company");
            res.status(404).json(err);

        } else {


            job.company.remove();
            job.save((err, deletedCompany) => {
                if (err) {
                    res.status(500).json({ "message": "Can not be deleted" })
                } else {
                    res.status(response.status).json({ "message": "Company Deleted Successfully" });
                }
            })


        }


    });

}








