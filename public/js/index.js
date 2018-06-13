var socket = io();
socket.on("connect", () => {
    console.log("connected to the server");
    
});
socket.on('disconnect', () => {
    console.log("desconnected from the server");
})

socket.on("newMessage", function(message){
    console.log("new Message", message);
});
