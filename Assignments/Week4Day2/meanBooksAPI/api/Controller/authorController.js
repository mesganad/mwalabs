require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Books = mongoose.model("Books");

module.exports.getAllAuthors = function (req, res) {
    const bookId = req.params.bookId;
    Books.findById(bookId).select("author").exec((err, book) => {
        if (err) {
            res.status(500).json(err);

        } else {
            res.status(200).json(book.author);
        }
    });
}

module.exports.getOneAuthor = function (req, res) {

    const bookId = req.params.bookId;
    const authorId = req.params.authorId;

    Books.findById(bookId).select("author").exec(function (err, book) {
        if (err) {
            res.status(500).json(err);
        }
        else if (!book) {
            res.status(404).json({ "message": "cannot find an author with this Id" });
        }
        else {
            let author = book.author.id(authorId);
            res.status(200).json(author);
        }
    });
}

module.exports.addAuthor = function (req, res) {
    const bookId = req.params.bookId;
    Books.findById(bookId).exec((err, book) => {
        if (err) {
            res.status(500).json(err);
        }
        else if (!book) {
            res.status(404).json({ "message": "Book Id not Found" });
        }
        else {
            book.author.push({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
            book.save(function (err, updatedStudent) {
                const response = {
                    status: 201,
                    message: updatedStudent
                }
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}


module.exports.updateAuthor = function (req, res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;

    Books.findById(bookId).select("author").exec((err, book) => {
        if (err) {
            res.status(500).json(err);
        }
        else if (!book) {
            res.status(404).json({ "message": "Book Id not Found" });
        }
        else {
            let author = book.author.id(authorId);
            let authorIndex = book.author.indexOf(author);
            book.author[authorIndex] = {
                _id: author._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }

            if(authorId===-1){
                res.status(404).json({"message":"Author Id not Found"});
            }

            book.save((err, updatedBook) => {
                const response = {
                    status: 204,
                    message: updatedBook
                }
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                else {

                    res.status(response.status).json(response.message);
                }
            });

        }
    });
}

module.exports.deleteAuthor = function (req, res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    Books.findById(bookId).select("author").exec(function (err, book) {
        if (err) {
            res.status(500).json(err);
        }
        else if (!book) {
            res.status(404).json({ "message": "Book Id not Found" });
        }
        else {

            let author = book.author.id(authorId);
            if (author) {
                let authorIndex = book.author.indexOf(author);
                book.author.splice(authorIndex, 1);
                //book.author[authorIndex].remove();
                book.save((err, updatedBook) => {
                    const response = {
                        status: 204,
                        message: updatedBook
                    }
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        res.status(response.status).json(response.message);
                    }
                });
            }
            else {
                res.status(404).json({ "message": "Id not found" });
            }
        }
    });
}

