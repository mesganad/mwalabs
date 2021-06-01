angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController($http) {
    const vm = this;
    vm.message="";
    vm.register = function () {

        const newUser = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        };
        if (!vm.username || !vm.password) {
            vm.err = "Please add username and password";
            vm.message="";
        }
        else {
            if (vm.password != vm.passwordRepeat) {
                vm.err = "make sure you entered same password in both fields";
            }
            else {
                $http.post("/api/users/register", newUser).then(function (result) {
                    console.log(result);
                    vm.message = "Successfull registration, please login";
                    vm.err = "";
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }
}
