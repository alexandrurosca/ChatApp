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
       //  $('#chat').load("./chat");
           });

$(function () {

    socket = io();
    //nuuuuu
    $('#addFriends').submit(function () {
        var friendName =$('#nameFriendInput').val();

        socket.emit('add friend', username, friendName );
        socket.on('confirm add friend', function (data) {
            alert(data);
        })
    })

   // socket.emit('existOpenedRooms',username);
    socket.on('friendsList',function (friends) {
        var friendsList = document.getElementById('friendsList');
        try{
                var lenghtF = friends.length;
            for(var  i=0;i<lenghtF;i++) {
                friendsList.innerHTML += "<div class=\"row friend\" id=" + i + ">" + friends[i] + "</div>";
                var friend = document.getElementById(i.toString());
                friend.addEventListener('click',function(){
                    console.log("yes");
                    socket.emit('createConversation',username,friend.innerText);
                });
            }}
        catch(err) {
            friendsList.innerHTML += "<div class=\"row friend\" id=" + i + ">No friends:( </div>";
            //console.log(err.message);
        }

    });

    socket.on('createConversation',function () {
        $('#chat').load("./chat");
    });

    socket.on('connectToRoom',function (friend,thisUsername) {
        console.log('client part '+ friend);
        console.log(thisUsername);
        if (thisUsername==username)
                socket.emit('connectToRoom',friend+thisUsername);
    });
});


    $('#add').submit(function(){
       var nameFriend = document.getElementById('nameFriend');
       document.alert(nameFriend);
}



);



