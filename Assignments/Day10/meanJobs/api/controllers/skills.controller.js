const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.skillsGetAll = function (req, res) {
    Job.findById(req.params.id).select("skills").exec(function (err, jobs) {
        let response = {
            status: 200,
            message: jobs.skills
        }
        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!jobs) {
            response.status = 404;
            response.message = { message: "Job Not Found" };

        }
        res.status(response.status).json(response.message);

    });
}

module.exports.skillsGetOne = function (req, res) {
    Job.findById(req.params.id).select("skills").exec(function (err, job) {
        let response = {
            status: 200,
            message: ""
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!job) {
            response.status = 404;
            response.message = { message: "Job not found" };
        } else {
            let skill = job.skills.id(req.params.skillId);
            if (skill) {
                response.status = 200;
                response.message = skill.skill;
            } else {
                response.status = 404;
                response.message = { message: "Skill not found" };
            }
        }

        res.status(response.status).json(response.message);

    });
}

module.exports.skillsAddOne = function (req, res) {
    let response = {
        status: 200,
        message: ""
    }
    if (req.body && req.body.skill) {

        Job.findById(req.params.id).exec(function (err, job) {
            if (err) {
                response.status = 500;
                response.message = err;
                console.log("hello");
                res.status(response.status).json(response.message);
            } else if (!job) {
                response.status = 404;
                response.message = { message: "Skill not found" };;
                res.status(response.status).json(response.message);
            } else {
                let skill = {
                    skill: req.body.skill
                };
                job.skills.push(skill);
                job.save(function (err, job) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    } else {
                        response.status = 201;
                        response.message = job;
                    }
                    res.status(response.status).json(response.message);
                });
            }
        })

    } else {
        response.status = 400;
        response.message = { message: "Required Fields are Missing." };
        res.status(response.status).json(response.message);
    }

}

module.exports.skillsUpdateOne = function (req, res) {
    let response = {
        status: 200,
        message: ""
    }
    if (req.body && req.body.skill) {

        Job.findById(req.params.id).exec(function (err, job) {
            if (err) {
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
            } else if (!job) {
                response.status = 404;
                response.message = { message: "Job not found" };;
                res.status(response.status).json(response.message);
            } else {

                let skl = job.skills.id(req.params.skillId);
                if (skl) {
                    let i = job.skills.indexOf(skl);

                    job.skills[i].skill = req.body.skill;

                    job.save(function (err, job) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        } else {
                            response.status = 201;
                            response.message = job;
                        }
                        res.status(response.status).json(response.message);
                    });
                } else {
                    response.status = 404;
                    response.message = { message: "Skill not found" };;
                    res.status(response.status).json(response.message);
                }

            }
        })

    } else {
        response.status = 400;
        response.message = { message: "Required Fields are Missing." };
        res.status(response.status).json(response.message);
    }

}

module.exports.skillsDeleteOne = function (req, res) {

    let jobId = req.params.id;
    let skillId = req.params.skillId;

    let response = {
        status: 200,
        message: ""
    }

    Job.findById(jobId).select("skills").exec(function (err, job) {
        if (err) {
            response.status = 500;
            response.message = err
            res.status(response.status).json(response.message);
        } else if (!job) {
            response.status = 404;
            response.message = { message: "Job not found" };
            res.status(response.status).json(response.message);
        } else {
            var skill = job.skills.id(skillId);

            if (skill) {
                let index = job.skills.indexOf(skill);
                job.skills.splice(index, 1);
                job.save(function (err, job) {
                    if (err) {
                        response.status = 500;
                        response.message = err
                        res.status(response.status).json(response.message);
                    } else {
                        response.status = 204;
                        response.message = job;
                        res.status(response.status).json(response.message);
                    }
                })

            } else {
                response.status = 404;
                response.message = { message: "Skill not found" };
                res.status(response.status).json(response.message);
            }

        }
    })

}