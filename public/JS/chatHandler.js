
$(function () {
    var socket = io();


    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        $('#msg').scrollTop($('#msg')[0].scrollHeight);
    });

    socket.on('system msg', function(msg){
        msg.forEach(function (item, index) {
            var message = "";
            for(var key in item) {
                message += JSON.stringify(item[key]);
            }
            message = message.replace('"','');
            message = message.replace('""','       ');
            $('#messages').append($('<li>').text(message));
            message = "";
        })



    });


});

