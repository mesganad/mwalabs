const express = require("express");
let router = express.Router();

let bookController = require("../controller/bookController");
let authorController = require("../controller/authorController");

router.route("/books").get(bookController.getAllBooks).post(bookController.addOneBook);
router.route("/books/:bookId").get(bookController.getOneBook).put(bookController.updateBook).delete(bookController.deleteBook);

router.route("/books/:bookId/author").get(authorController.getAllAuthors).post(authorController.addAuthor);
router.route("/books/:bookId/author/:authorId").get(authorController.getOneAuthor).put(authorController.updateAuthor).delete(authorController.deleteAuthor);

module.exports = router;