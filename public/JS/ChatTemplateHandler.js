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
    console.log(window.myhead);
           });

$(function () {
    var openedRoom;
    socket = io();

    $('#chat').submit(function(){
        var data = {name:username, msg: $('#m').val(), room: openedRoom };
        socket.emit('chat message', data);
        $('#m').val('');
        return false;
    });


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

            for(var  i = 0;i<friends.length;i++) {
                friendsList.innerHTML += "<div class=\"row friend\" id=" + i + ">" + friends[i] + "</div>";
            }

            for(var  i = 0;i<friends.length;i++) {
                var friend = document.getElementById(i);

                 friend.addEventListener('click',function(){
                     console.log( this.innerText);

                     socket.emit('createConversation',username,this.innerText);

                     try {var openedConversation = document.getElementById(username+this.innerText).innerText;
                     }
                     catch(err) {
                         var openedConversations = document.getElementById('conversations');
                         openedConversations.innerHTML +=
                             "<div class=\"col-2 conversationFriend\" > <input id=" + username + this.innerText +
                             " class='change' type=\"button\" value=" + this.innerText + "></div>"
                         openedRoom = username + this.innerText;

                         var conversation = document.getElementById(username + this.innerText);
                            console.log(conversation.id);
                        conversation.addEventListener('click',function(){
                            openedRoom = this.id;

                        })


                     }
                     });
            }
        }
        catch(err) {
            friendsList.innerHTML += "<div class=\"row friend\" id=" + i + ">No friends:( </div>";
            //console.log(err.message);
        }
    });

    socket.on('createConversation',function (room) {
        $('#chat').load("./chat");
    });

    socket.on('connectToRoom',function (friend,thisUsername) {
      //  console.log('client part '+ friend);
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



