
$(function () {
    var socket = io();
    var indexPoza =0;

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        $('#msg').scrollTop($('#msg')[0].scrollHeight);
    });
    
    socket.on('chat message photo', function (photo,username) {
        //document.getElementById('profilePicture').setAttribute('src', photo);
       // $('#messages').append($('<li>').text(msg.name + " : " +msg.msg));
        document.getElementById('messages').innerHTML +=  "<li>"+username+":</li><img id="+ indexPoza+" src=" + photo + "></img>";
      //  "height=\"130\" width=\"130\""

        document.getElementById(indexPoza).setAttribute('heigth',300);
        document.getElementById(indexPoza).setAttribute('width',300);
        indexPoza++;
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

