
$(function () {
    var socket = io();


    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        $('#msg').scrollTop($('#msg')[0].scrollHeight);
    });
    
    socket.on('chat message photo', function (photo,username) {
        //document.getElementById('profilePicture').setAttribute('src', photo);
       // $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        document.getElementById('messages').innerHTML +=  "<li>"+username+":</li><img id=poza src=" + photo + "></img>";
      //  "height=\"130\" width=\"130\""
        document.getElementById('poza').setAttribute('heigth',300);
        document.getElementById('poza').setAttribute('width',300);
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

