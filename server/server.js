const express = require("express");
const app = express();

const socketIO = require("socket.io");
const http = require("http");

const path = require("path");
const publicPath = path.join(__dirname, "../public");

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("new user connected");

    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat group"
    })
    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New user joined"
    })

    socket.on('disconnect', () => {
        console.log("disconnected by the client");
    })
    socket.on("createMessage", (message) => {
        console.log("createMessage", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()

    })
})



































server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})