
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

io.on("connection",(socket)=>{
    console.log("new user connected");
    socket.on('disconnect', ()=>{
        console.log("disconnected by the client");
    })
})


































server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})  