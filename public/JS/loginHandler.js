/*$(function () {
    var socket = io();
    document.getElementsByName("logInBut")[0].addEventListener('click',LogInUser);
    function LogInUser(){
        socket.emit('user LogIn',$('#uN').val() );
        //console.log($('#uN').val());
       // location.href = "/chat";
        return false;};
});
document.getElementById('createAcc').addEventListener('click',changeToCreateAcc);
  function changeToCreateAcc(){
 -    $(document).ready(function(){
 -        $('#log').load("./createAccountForm");
 -    });


*/
window.scrollTo(0,document.body.scrollHeight);
document.getElementById('createAcc').addEventListener('click',changeToCreateAcc);
function changeToCreateAcc(){
    /*$(document).ready(function(){
        $.get("./createAccount", function(){
            alert("Success");
        }).fail(function(err){
            alert("Failed");
            alert(JSON.stringify(err));
        });
    });*/
    location.assign("./createAccount");
    //location.replace("./createAccount");
    /*var socket = io();
        socket.emit('createAccount');
        return false;*/
}

