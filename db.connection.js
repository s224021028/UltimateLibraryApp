const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/ula";
mongoose.connect(url)
const dbConn = mongoose.connection
dbConn.on("connected", () => {
    console.log("Database connected")
})
dbConn.on("error", (err) => {
    console.error(err)
})