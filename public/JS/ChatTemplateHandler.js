//var database = require('../databaseMongo/db.js');
// $.import_js('/path_to_project/scripts/somefunctions.js');
// var cookieParser = require('./cookieHandler');

$.getScript('JS/cookieHandler.js', function() {
});

$(document).ready(function(){
         $('#chat').load("./chat");
           });

$(function () {
    //var cookieParser = require('./cookieHandler');
    var socket = io();

    $('#addFriends').submit(function () {
        var friendName =$('#nameFriendInput').val();
        var username = getCookie("user");
        socket.emit('add friend', username, friendName );
        socket.on('confirm add friend', function (data) {
            alert(data);
        })
    })


});



    $('#add').submit(function(){
       var nameFriend = document.getElementById('nameFriend');
       document.alert(nameFriend);
});

// When the user clicks on <div>, open the popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

