const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true, minLength: 5, maxLength: 10},
    password: {type: String, required: true},
    name: {type: String, required: true},
    is_admin: {type: Boolean, default: false}
})
const usersModel = mongoose.model("users", usersSchema)
module.exports = usersModel