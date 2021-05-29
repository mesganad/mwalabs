const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/jobs.controller");
const locationsController = require("../controllers/location.controller");
const skillsController = require("../controllers/skills.controller.js");


router.route("/jobs")
    .get(jobsController.jobsGetAll)
    .post(jobsController.jobsAddOne);

 router.route("/jobs/:id")
    .get(jobsController.jobsGetOne)
    .put(jobsController.jobsUpdateOne)
    .delete(jobsController.jobsDeleteOne);

router.route("/jobs/:id/location")
    .get(locationsController.locationGetOne)
    .post(locationsController.locationAddOne)
    .delete(locationsController.locationDeleteOne);

router.route("/jobs/:id/skills/")
    .get(skillsController.skillsGetAll)
    .post(skillsController.skillsAddOne);

router.route("/jobs/:id/skills/:skillId")
    .get(skillsController.skillsGetOne)
    .put(skillsController.skillsUpdateOne)
    .delete(skillsController.skillsDeleteOne)


module.exports = router;