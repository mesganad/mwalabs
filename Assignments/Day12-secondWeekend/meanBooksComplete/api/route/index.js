const express = require("express");
let router = express.Router();

let bookController = require("../controller/bookController");
let authorController = require("../controller/authorController");
let userController=require("../Controller/userController");

router.route("/books").get(bookController.getAllBooks).post(userController.authenticate,bookController.addOneBook);
router.route("/books/:bookId").get(bookController.getOneBook).put(bookController.updateBook).delete(bookController.deleteBook);
router.route("/books/search").get(bookController.searchBooks);
router.route("/books/:bookId/author").get(authorController.getAllAuthors).post(authorController.addAuthor);
router.route("/books/:bookId/author/:authorId").get(authorController.getOneAuthor).put(authorController.updateAuthor).delete(authorController.deleteAuthor);

router.route("/users/register").post(userController.register);
router.route("/users/authenticate").post(userController.login);


module.exports = router;