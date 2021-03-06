const express = require("express");
const app = express();

var {generateMessage, generateLocationMessage} = require("./utils/message");

const socketIO = require("socket.io");
const http = require("http");

const {isRealString} = require("./utils/validation")
const path = require("path");
const publicPath = path.join(__dirname, "../public");



var server = http.createServer(app);                    
var io = socketIO(server);

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;



io.on("connection", (socket) => {
    console.log("new user connected");

    socket.on('disconnect', () => {
        console.log("disconnected by the client");
    })

    socket.on("join", (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("name and room no are required");
        }          
        
        socket.join(params.room); 

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"))
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined`))


        callback();
    })

    socket.on("createMessage", (message, callback) => {
        console.log("createMessage", message);
        io.emit("newMessage", generateMessage(message.from,
            message.text));
        callback( )   
              
         
        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()

    })
    socket.on('createLocationMessage', (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin",coords.latitude, coords.longitude));
    });    

})



































server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})