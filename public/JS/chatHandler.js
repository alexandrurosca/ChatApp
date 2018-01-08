
$(function () {
    var socket = io();


    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + ":" +msg.msg));
        $('#msg').scrollTop($('#msg')[0].scrollHeight);
    });

    socket.on('system msg', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

});