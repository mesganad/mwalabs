// is going to hold application module and route
angular.module("meanBooks", ["ngRoute","angular-jwt"]).config(config).run(changeRoute);

function config($routeProvider,$httpProvider,$locationProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access:{restricted:false}
    }).when("/books", {
        templateUrl: "angular-app/book-list/books.html",
        controller : "BooksController",
        controllerAs: "vm",
        access:{restricted:false}
    })
    .when("/books/:id", {
        templateUrl: "angular-app/book-display/book.html",
        controller : "BookController",
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
    })
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