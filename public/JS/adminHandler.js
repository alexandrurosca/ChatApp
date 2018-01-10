var socket;



$(document).ready(function(){
    socket = io();
    socket.emit('usersList');
    socket.emit('findImage');
});


$(function () {
    socket.on('usersList', function (users) {
        //try
        var usersList = document.getElementById('friendsList');
        //console.log(users);

        users.forEach(function (item, index) {
            usersList.innerHTML += "<div class=\"row friend\" id=" + index + ">" + item.username + "</div>";
        })
        //TODO: add action listener to users

    })

    socket.on('uploadProfile', function (source) {

      //  var img = new DataView(source);
        console.log("source:", source);

        var src = "data:image/jpeg;base64," + source.toString()('ascii');


        document.getElementById('profilePicture').setAttribute('src', src);


    })

});