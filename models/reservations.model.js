const mongoose = require("mongoose")

const reservationsSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true, minLength: 5, maxLength: 10},
    book_id: {type: Number, required: true, unique: true, minLength: 1, maxLength: 5},
    period: {type: Number, required: true},
    date: {type: Date, default: Date.now}
})
const reservationsModel = mongoose.model("reservations", reservationsSchema)
module.exports = reservationsModel