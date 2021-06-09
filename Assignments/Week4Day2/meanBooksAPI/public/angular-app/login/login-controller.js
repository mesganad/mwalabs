angular.module("meanBooks").controller("LoginController",LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){

    var vm = this;

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }
        return false;
    }
    vm.login = function(){
        if(vm.username && vm.password){
            var user = {
                username : vm.username,
                password: vm.password
            };

             $http.post("/api/users/authenticate", user).then(function(response){

                if(response.data.success){
                    //we need to store the token in to the session/cookie, so that we can access it after refresh
                    //otherwise the token is going to be in a request scope.
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.name;
                    $location.path("/");

                }
            }).catch(function(err){

            });
                
           
        }
    }

    vm.logout = function(){
        AuthFactory.isLoggedIn = false;

        delete $window.sessionStorage.token;
        $location.path("/");
        
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
    
}