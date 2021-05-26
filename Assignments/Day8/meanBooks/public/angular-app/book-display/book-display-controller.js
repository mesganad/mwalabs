angular.module("meanBooks").controller("BookController", BookController);

function BookController($routeParams, BookDataFactory){
    var vm = this;
    vm.title = "MEAN Books App";
    var id = $routeParams.id;

    BookDataFactory.getOneBook(id)
        .then(function(response){
            vm.book = response;
    });
}