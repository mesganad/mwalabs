angular.module("meanBooks").controller("BooksController", BooksController);

function BooksController(BookDataFactory){
    var vm = this;
    vm.title = "MEAN Books App";

    BookDataFactory.getAllBooks().then(function(response){
            vm.books = response;
        });

        vm.addBook = function(){
            var postData = {
                title: vm.newBookTitle,
                keyword: vm.newBookKeyword,
                isbn : vm.newBookIsbn,
                author: vm.newBookAuthor,
                
            };
            if(vm.bookForm.$valid){

                BookDataFactory.addOneBook(postData).then(function(response){
                    console.log("Book Saved");
                    
                }).catch(function(error){
                    console.log(error);
                })
            }
            else {
                vm.isSubmitted = true;
                console.log("Data Validation Failed");
            }
}
}