angular.module("jobApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
            templateUrl: "angular-app/job-list/jobs.html",
            controller: "JobsController",
            controllerAs: "vm"
        }).when("/job/:id", {
            templateUrl: "angular-app/job-detail/job.html",
            controller: "JobController",
            controllerAs: "vm"
        })
}