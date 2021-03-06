angular.module("jobApp").controller("JobController", JobController);

function JobController($routeParams, JobFactory){
    let vm = this;
    let id  = $routeParams.id;

    JobFactory.getOneJob(id).then(function(response){
        vm.job = response;
    })

    vm.success =false;
    vm.failur = false;
    vm.message = "";
    vm.deleteJob = function(id){
        JobFactory.deleteOneJob(id).then(function(response){
            vm.success = true;
            vm.failur =false;
            vm.message = "Job deleted successfully";
        }).catch(function(response){
            vm.failur = true;
            vm.success =false;
            vm.message = "Error occured while Deleting";
        })
    }

    vm.addSkill = function(jobId){
        if(vm.skillFrom.$valid){
            JobFactory.addOneSkill(jobId, {skill: vm.skill})
                .then(function(response){
                    JobFactory.getOneJob(jobId).then(function(response){
                        vm.job = response;
                        skill: vm.skill = null;
                    })
                }).catch(function(err){

                });
        }
    }


}