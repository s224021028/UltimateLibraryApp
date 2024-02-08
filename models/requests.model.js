const mongoose = require("mongoose")

const requestsSchema = new mongoose.Schema({
    request_id: {type: Number, required: true, unique: true, minLength: 1, maxLength: 10},
    user_id: {type: String, required: true, minLength: 5, maxLength: 10},
    book_title: {type: String, required: true},
    book_author: {type: String, required: true},
    isbn: {type: Number},
    book_language: {type: String},
    date: {type: Date, default: Date.now},
    status: {type: String, default: "Received"}
})
const requestsModel = mongoose.model("requests", requestsSchema)
module.exports = requestsModel