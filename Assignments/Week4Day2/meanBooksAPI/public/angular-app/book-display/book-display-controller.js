angular.module("meanBooks").controller("BookController", BookController);

function BookController($routeParams, BookDataFactory){
    var vm = this;
    vm.title = "MEAN Books App";
    var id = $routeParams.id;

    BookDataFactory.getOneBook(id)
        .then(function(response){
            vm.books = response;
    });

    vm.deleteSuccess = null;
    vm.deleteBook = function(bookId){
        if(bookId){
            BookDataFactory.deleteOneBook(bookId).then(function(response){
                vm.deleteSuccess = true;

            }).catch(function(error){
                console.log(error);
            });
        }
    }
}