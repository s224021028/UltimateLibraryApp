let io;

class Socket
{
    createSocket(server)
    {
        io = require("socket.io")(server)
        io.on("connection", (socket) => {
            console.log("Client connected")
            socket.on("disconnect", () => {
                console.log("Client disconnected")
            })  
            socket.on("login", (userID) => {
                socket.join(userID)
            })
            socket.on("logout", (userID) => {
                socket.leave(userID)
            })
        })
    }

    isRoom(roomID)
    {
        if(io.sockets.adapter.rooms.has(roomID))
            return true
        return false
    }

    sendNotification(roomID, key, message)
    {
        io.to(roomID).emit(key, message)
    }
}
module.exports = new Socket()