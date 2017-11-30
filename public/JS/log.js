$(function () {
    var socket = io();
    document.getElementsByName("logInBut")[0].addEventListener('click',LogInUser);
    function LogInUser(){
        socket.emit('user LogIn',$('#uN').val() );
        //console.log($('#uN').val());
       // location.href = "/chat";
        return false;};
});

