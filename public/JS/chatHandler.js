$(function () {
    var socket = io();
    var id;

    socket.on('connect', function(){
        id = socket.io.engine.id;

    })
    var UserName;
    $('form').submit(function(){
        var data = {name: UserName, msg: $('#m').val()};
        socket.emit('chat message', data);
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + ":" +msg.msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
    socket.on('system msg', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('UserName',function(Username){
        UserName=Username;
    });
});