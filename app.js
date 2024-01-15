const express = require("express")
require("./db.connection")
const router = require("./routes/route")

const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router)
const port = process.env.port || 5000;
http.listen(port, () => {
    console.log(port)
})
module.exports = app