angular.module("meanBooks").factory("AuthFactory", AuthFactory);

function AuthFactory(){
    var auth = {isLoggedId: false}
    return {auth: auth};

}