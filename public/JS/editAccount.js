var username;

$(document).ready(function(){
    socket = io();
    username = window.user;
    socket.emit("profilePicture", username);
    addListenerBackButton();

});

$(function () {
    socket.on('profilePicture', function (source) {
        var src = "data:image/jpeg;base64," + source;
        document.getElementById('profilePicture').setAttribute('src', src);
    })

});

function addListenerBackButton() {
    document.getElementById('account').addEventListener('click',function () {
        window.history.back();
        window.history.back();
    })
}