const mongoose = require("mongoose");

let authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});


let booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    keyword: String,
    isbn: {
        type: Number,
        required: true
    },
    author: [authorSchema]
});

mongoose.model("Books", booksSchema, "books");
