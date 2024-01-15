const mongoose = require("mongoose")

const booksSchema = new mongoose.Schema({
    book_id: {type: Number, required: true, unique: true, minLength: 1, maxLength: 5},
    title: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    edition: {type: String, required: true},
    description: {type: String, required: true},
    count: {type: Number, required: true}
})

const booksModel = mongoose.model("books", booksSchema)

module.exports = booksModel