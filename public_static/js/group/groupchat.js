$(document).ready(function(){
    var socket = io();

    var room = $('#groupName').val();
    var sender = $('#sender').val();

    socket.on('connect', function(){

        var params = {
            room: room,
            name: sender
        }
        socket.emit('join', params, function(){
            console.log('User has joined this channel'+params.room);
        });
    });

    socket.on('newMessage', function(data){
        console.log("Data");
        console.log(data);
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.from
        });

        $('#messages').append(message);
    });



    $('#message-form').on('submit', function(e){
        e.preventDefault();

        var msg = $('#msg').val();
        console.log("Message");


        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender
        }, function(){
            $('#msg').val('');
        });
    });

});










