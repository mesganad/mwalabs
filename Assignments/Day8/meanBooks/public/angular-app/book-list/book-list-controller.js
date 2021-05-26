angular.module("meanBooks").controller("BooksController", BooksController);

function BooksController(BookDataFactory){
    var vm = this;
    vm.title = "MEAN Books App";

    BookDataFactory.getAllBooks()
        .then(function(response){
            vm.books = response;
        });
}