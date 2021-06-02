// is going to hold application module and route
angular.module("meanGames", ["ngRoute","angular-jwt"]).config(config).run(changeRoute);

function config($routeProvider,$httpProvider,$locationProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access:{restricted:false}
    }).when("/games", {
        templateUrl: "angular-app/game-list/games.html",
        controller : "GamesController",
        controllerAs: "vm",
        access:{restricted:false}
    })
    .when("/game/:id", {
        templateUrl: "angular-app/game-display/game.html",
        controller : "GameController",
        controllerAs: "vm",
        access:{restricted:false}
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller : "RegisterController",
        controllerAs: "vm",
        access:{restricted:false}
        
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        access:{restricted:true}
    }).otherwise({
        redirectTo:"/"
    });
    }

    function changeRoute($rootScope,$location,$window,AuthFactory){
        $rootScope.$on("$routeChangeStart", function(event,nextRoute,currentRoute){
            //to enable overcoming restricted URLs
            if(nextRoute.access!==undefined && nextRoute.access.restricted  && !window.sessionStorage.token &&
                 !AuthFactory.auth.isLoggedIn){
                event.preventDefault();
                $location.path("/");
            }
        });
    }