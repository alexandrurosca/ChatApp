
$(function () {
    var socket = io();


    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        $('#msg').scrollTop($('#msg')[0].scrollHeight);
    });
    
    socket.on('chat message photo', function (photo) {
        //document.getElementById('profilePicture').setAttribute('src', photo);
       // $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        document.getElementById('messages').innerHTML +=  "<img src=" + photo + "></img>";
    })

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

