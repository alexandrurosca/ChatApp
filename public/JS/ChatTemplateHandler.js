//var database = require('../databaseMongo/db.js');
// $.import_js('/path_to_project/scripts/somefunctions.js');
// var cookieParser = require('./cookieHandler');
var username;
var socket;
$.getScript('JS/cookieHandler.js', function() {
     username = getCookie("user");
     console.log(username);
     socket.emit('friendsList',username);
});

$(document).ready(function(){
         $('#chat').load("./chat");
           });

$(function () {

    socket = io();

    $('#addFriends').submit(function () {
        var friendName =$('#nameFriendInput').val();

        socket.emit('add friend', username, friendName );
        socket.on('confirm add friend', function (data) {
            alert(data);
        })
    })


    socket.on('friendsList',function (friends) {
        for(var  i=1;i<friends.length;i++){
            var friend = $("<div class=\"row friend\"></div>").text(friends[i]);
            $('#friendsList').append(friend);
        }
    });
});


    $('#add').submit(function(){
       var nameFriend = document.getElementById('nameFriend');
       document.alert(nameFriend);
});



