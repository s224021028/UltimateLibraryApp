const mongoose = require("mongoose")

const reservationsSchema = new mongoose.Schema({
    reservation_id: {type: Number, required: true, unique: true, minLength: 1, maxLength: 10},
    user_id: {type: String, required: true, minLength: 5, maxLength: 10},
    book_id: {type: Number, required: true, minLength: 1, maxLength: 5},
    period: {type: Number, default: 30},
    issue_date: {type: Date, default: Date.now},
    return_date: {type: Date},
    status: {type: String, default: "Reserved"}
})
const reservationsModel = mongoose.model("reservations", reservationsSchema)
module.exports = reservationsModel