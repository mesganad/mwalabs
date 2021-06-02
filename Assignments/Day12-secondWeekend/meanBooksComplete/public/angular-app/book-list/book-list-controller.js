angular.module("meanBooks").controller("BooksController", BooksController);

function BooksController($route,BookDataFactory,AuthFactory,$http){
    var vm = this;
    vm.title = "MEAN Books App";

    BookDataFactory.getAllBooks().then(function(response){
            vm.books = response;
        });

        vm.searchBook=function(){
            
            if(vm.booktitle){     

                $http.get("/api/books/search/?search="+vm.booktitle).then(function(response){
                    console.log("Search results :"+response.data);
                    vm.results=response.data;
                }).catch(function(err){

                })
           
        }
    }
        vm.isLoggedIn= function() {
            if (AuthFactory.isLoggedIn) {return true;}
            else {return false;}
            };
            
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