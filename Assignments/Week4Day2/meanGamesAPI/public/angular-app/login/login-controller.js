angular.module("meanGames").controller("LoginController", LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {

    var vm = this;

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) {
            return true;
        }
        return false;
    }

    vm.login = function () {
        let user = {
            username: vm.username,
            password: vm.password,
        }
        $http.post("/api/users/authenticate", user).then(function (response) {
            if (response.data.success) {
                $window.sessionStorage.token = response.data.token;
                AuthFactory.isLoggedIn = true;
                let token = $window.sessionStorage.token;
                console.log(token);
                let decodedToken = jwtHelper.decodeToken(token);
                console.log(decodedToken);
                vm.loggedInUser = decodedToken.name;
                console.log("Hello", vm.loggedInUser);
                $location.path("/");
            }
            vm.message = "sucessfully logged in";
            vm.err = "";
        }).catch(function (err) {

        });
    }

    vm.logout = function () {
        AuthFactory.isLoggedIn = false;

        delete $window.sessionStorage.token;
        $location.path("/");

    }

    vm.isActiveTab = function (url) {
        var currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }

}