const express = require("express")
const session = require("express-session")
require("./db.connection")
const router = require("./routes/route")
const socket = require("./socket")

const app = express()
const http = require("http").createServer(app)
socket.createSocket(http)
const oneHour = 3600000

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/data"))
//app.use(express.static(__dirname + "/build"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "ula-v-lmp-rk-m-pr",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: oneHour}
}))
app.use("/", router)
const port = process.env.port || 5000;
http.listen(port, () => {
    console.log(port)
})
module.exports = app