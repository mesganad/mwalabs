angular.module("jobApp").factory("JobFactory", JobFactory);

function JobFactory($http){

    return {
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        deleteOneJob: deleteOneJob,
        updateOneJob: updateOneJob,
        addOneSkill: addOneSkill
    }

    function getAllJobs(){
        return $http.get("/api/jobs").then(complete).catch(falied);
    }

    function getOneJob(id){
        return $http.get("/api/jobs/"+id).then(complete).catch(falied);
    }

    function addOneJob(job){
        return $http.post("/api/jobs", job).then(complete).catch(falied);
    }

    function deleteOneJob(id){
        return $http.delete("/api/jobs/"+id).then(complete).catch(falied);
    }

    function updateOneJob(job){
        return $http.put("/api/jobs/"+job.id, job).then(complete).catch(falied);
    }

    function addOneSkill(jobId, skill){
        return $http.post("/api/jobs/" + jobId + "/skills", skill)
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function falied(error){
        console.log(error);
        return error.status.statusText;
    }

}