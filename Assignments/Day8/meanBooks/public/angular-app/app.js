// is going to hold application module and route
angular.module("meanBooks", ["ngRoute"]).config(config);
function config($routeProvider){
    
    $routeProvider.when("/", {
        templateUrl: "angular-app/book-list/books.html",
        controller : "BooksController",
        controllerAs: "vm"
    })
    .when("/books/:id", {
        templateUrl: "angular-app/book-display/book.html",
        controller : "BookController",
        controllerAs: "vm"
    })
}