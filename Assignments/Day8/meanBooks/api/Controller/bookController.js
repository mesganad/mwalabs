require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Books = mongoose.model("Books");

module.exports.getAllBooks = (req, res) => {
    const maxCount = 10;
    let offSet = 0;
    let count = 5;
    if (req.query && req.query.offSet) {
        offSet = parseInt(req.query.offSet);
    }
    if (req.query && req.query.count) {
        count = parseInt(query.count);
        if (count > maxCount) {
            count = maxCount;
        }
    }
    if (isNaN(offSet) || isNaN(count)) {
        res.status(404).json({ "message": "Offset and count should be a number" });
    }
    Books.find().skip(offSet).limit(count).exec((err, books) => {
        const response = {
            status: 200,
            message: books
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.getOneBook = (req, res) => {
    const bookId = req.params.bookId;
    Books.findById(bookId).exec((err, book) => {
        const response = {
            status: 200,
            message: book
        };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!book) {
            response.status = 404;
            response.message = { "message": "Book Id not found" };
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

module.exports.addOneBook = (req, res) => {
    const book = {};
    if (req.body.title && req.body.keyword && req.body.isbn) {
        book.title = req.body.title;
        book.keyword = req.body.keyword;
        book.isbn = parseInt(req.body.isbn);
        book.author = [
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }
        ]
    }
    else {
        res.status(400).json({ "message": "required data missing from POST" });
    }
    Books.create(book, (err, newBook) => {
        const response = {
            status: 201,
            message: newBook
        }
        if (err) {
            console.log("Error while adding a book");
            response.status = 400,
                response.message = err
        }
        res.status(response.status).json(response.message)
    });
}


module.exports.updateBook = (req, res) => {
    const bookId = req.params.bookId;
    Books.findById(bookId).exec((err, book) => {
        const response = {
            status: 204,
            message: book
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!book) {
            response.status = 404;
            response.message = { "message": "Book Id not Found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);

        }
        else {
            book.title = req.body.title;
            book.keyword = req.body.keyword;
            book.isbn = parseInt(req.body.isbn);
            

            book.save((err, updatedBook) => {
                response.message = updatedBook;
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}

module.exports.deleteBook = (req, res) => {
    const bookId = req.params.bookId;
    Books.findByIdAndRemove(bookId).exec((err, deletedBook) => {
        const response = {
            status: 204,
            message: deletedBook
        };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!deletedBook) {
            response.status = 404;
            response.message = { "message": "Book Id not Found" };
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}







