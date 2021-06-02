angular.module("meanBooks").controller("LoginController",LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){

    var vm = this;

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }
        return false;
    }

    vm.register = function(){
        var user = {
            username: vm.username,
            password: vm.password,
        }
    
        if(!vm.username || !vm.password){
            vm.message = "";
            vm.err = "Please enter username and password"; 
        }else {
            if(vm.password !== vm.passwordRepeate){
                vm.err = "Make sure you entered correct password";
            }else {
                $http.post("/api/users/authenticate", user).then(function(result){
                    vm.message = "sucessfully logged in";
                    vm.err = "";
                }).catch(function(err){
    
                });
            }
        }
    }

    vm.login = function(){
        if(vm.username && vm.password){
            var user = {
                username : vm.username,
                password: vm.password
            };

            return $http.post("/api/users/authenticate", user).then(function(response){

                if(response.data.success){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    console.log(token);
                    var decodedToken = jwtHelper.decodeToken(token);
                    console.log(decodedToken);
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