const mongoose = require("mongoose")

const requestsSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true, minLength: 5, maxLength: 10},
    book_title: {type: String, required: true},
    book_author: {type: String},
    book_edition: {type: String},
    status: {type: String, default: "Received"}
})
const requestsModel = mongoose.model("requests", requestsSchema)
module.exports = requestsModel