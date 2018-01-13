var username;

$(document).ready(function(){
    socket = io();
    username = window.user;
    socket.emit("profilePicture", username);

});

$(function () {
    socket.on('profilePicture', function (source) {
        var src = "data:image/jpeg;base64," + source;
        document.getElementById('profilePicture').setAttribute('src', src);
    })
});