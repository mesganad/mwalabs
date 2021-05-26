angular.module("meanBooks").factory("BookDataFactory", BookDataFactory);

function BookDataFactory($http){
    return{
        getAllBooks: getAllBooks,
        getOneBook: getOneBook
    };

    function getAllBooks(){
        return $http.get("/api/books").then(complete).catch(failed);
    }

    function getOneBook(id){
        console.log("get one ");
        return $http.get("/api/books/"+id).then(complete).catch(failed);
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}