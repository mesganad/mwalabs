angular.module("meanGames").factory("UserDataFactory", UserDataFactory);
function UserDataFactory($http){
    return {
        //login:login
    };

    // function login(user){
    //     $http.post("/api/users/authenticate",user).then(complete).catch(failed)

    // }

    function complete(response){

        console.log(response.data);
        return response.data;
    }
    function failed(error){
        return error;
    }
    
    
}