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

        var src = "data:image/jpeg;base64," + source;
        document.getElementById('profilePicture').setAttribute('src', src);
    })

});