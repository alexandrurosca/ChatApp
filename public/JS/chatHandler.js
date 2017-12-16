
$(function () {
    var socket = io();
    var username = getCookie("user");

    $('form').submit(function(){
        var data = {name:username, msg: $('#m').val()};
        socket.emit('chat message', data);
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + ":" +msg.msg));
        $('#msg').scrollTop($('#msg')[0].scrollHeight);
    });

    socket.on('system msg', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

});