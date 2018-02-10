module.exports = function(io){

    io.on('connection', (socket) => {

        console.log("User connected");

        socket.on('join', (params, callback) => {
            socket.join(params.room);
            console.log("User connected to "+params.room);
            callback();
        });

        socket.on('createMessage', (message, callback) => {
            console.log("Message REceived");
            console.log(message);
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.sender,
            });

            callback();
        });
    });
}













