angular.module("meanBooks").directive("booksNavigation", BooksNavigation);

function BooksNavigation(){
    return{
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}


