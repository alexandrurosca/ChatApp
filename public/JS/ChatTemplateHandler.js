//var database = require('../databaseMongo/db.js');
// $.import_js('/path_to_project/scripts/somefunctions.js');
// var cookieParser = require('./cookieHandler');
var username;
var socket;
var lastIndexOfFriend;

$(document).ready(function(){
    socket = io();
    username = window.user;
    socket.emit('friendsList',username);
    console.log("Here");
});

$(function () {
    $('#chat').submit(function(){
        var data = {name:username, msg: $('#m').val(), room: openedRoom };
        socket.emit('chat message', data);
        $('#m').val('');
        return false;
    });


    $('#addFriends1').submit(function () {
        var friendName =$('#nameFriendInput').val();
        console.log("Here I am", friendName);
        socket.emit('add friend', username, friendName );
    });

    socket.on('confirm add friend', function (data, modified, friendName) {
        alert(data);
        if(modified){
            var friend = $("<div class=\"row friend\" id="+ lastIndexOfFriend +" ></div>").text(friendName);
            $('#friendsList').append(friend);
            lastIndexOfFriend+=1;
            //TODO: action listener for the new friend
        }

    })

    socket.on('request add friend', function (friend) {
        var confirmAccept = confirm(friend + ' wants to add you!');
        console.log("Confirm accept: ", confirmAccept);
        socket.emit('confirm add friend1', confirmAccept);
    });

   // socket.emit('existOpenedRooms',username);
    socket.on('friendsList',function (friends) {
        socket.emit('user login', username);
        lastIndexOfFriend = friends.length;
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

                     try {
                         var openedConversation = document.getElementById(username+this.innerText).innerText;
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

    socket.on('connectToRoom',function (room) {
                socket.emit('connectToRoom',room);
    });

    //images

    /*socket.on('connect', function(){
        var delivery = new Delivery(socket);

        delivery.on('receive.start',function(fileUID){
            console.log('receiving a file!');
        });

        delivery.on('receive.success',function(file){
            var params = file.params;
            if (file.isImage()) {
                $('img').attr('src', file.dataURL());
            };
        });
    });
    */


});


//     $('#add').submit(function(){
//        var nameFriend = document.getElementById('nameFriend');
//        document.alert(nameFriend);
// });





