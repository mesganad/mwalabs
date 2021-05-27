angular.module("meanBooks").factory("BookDataFactory", BookDataFactory);

function BookDataFactory($http){
    return{
        getAllBooks: getAllBooks,
        getOneBook: getOneBook,
        addOneBook: postBook,
        deleteOneBook: deleteBook
    };

    

    function getAllBooks(){
        return $http.get("/api/books").then(complete).catch(failed);
    }

    function getOneBook(id){
        return $http.get("/api/books/"+id).then(complete).catch(failed);
    }

    function postBook(book){
        return $http.post("/api/books/", book).then(complete).catch(failed);
    }

    function deleteBook(bookId){
        return $http.delete("/api/books/"+ bookId).then(complete).catch(failed);
    }
    
    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}