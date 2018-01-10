//var database = require('../databaseMongo/db.js');
// $.import_js('/path_to_project/scripts/somefunctions.js');
// var cookieParser = require('./cookieHandler');
var username;
var socket;
var lastIndexOfFriend;
var openedRoom;

$(document).ready(function(){
    socket = io();
    username = window.user;
    socket.emit('friendsList',username);
    console.log("Here");
});


// add listener : change room + reload chat
function addListenerForOpenConversationButton() {
    var conversations = document.getElementsByClassName('openConv');

    for (var i = 0; i < conversations.length; i++)
        conversations[i].addEventListener('click',function(){

            openedRoom = this.id;
            $('#chat').load("./chat");
            console.log("am deschis conversatia " + this.id);

        });
}



function addListenerForCloseConversationButton() {
    var conversations = document.getElementsByClassName('closeConv');

    for (var i = 0; i < conversations.length; i++)
        conversations[i].addEventListener('click',function(){


            var parent = document.getElementById("conversations");
            var child = document.getElementById(this.id + "buttons");
            parent.removeChild(child);
            openedRoom = "";

                document.getElementById('chat').innerHTML= "";
            console.log("am inchis conversatia " + this.id);

        });
}
$(function () {
    document.getElementById('infoUser').innerText=username;
    $('#chat').submit(function(){
        var data = {name:username, msg: $('#m').val(), room: openedRoom };
        socket.emit('chat message', data);
        $('#m').val('');
        return false;
    });
    //add listener for addFriend
    document.getElementById('addFriendButton').addEventListener('click',function () {
        var friendName =$('#nameFriendInput').val();
        console.log("Here I am", friendName);
        socket.emit('add friend', username, friendName ); })


    socket.on('confirm add friend', function (data, modified, friendName) {
        alert(data);
        if(modified){
            var friend = $("<div class=\"row friend\" id="+ lastIndexOfFriend +" ></div>").text(friendName);
            $('#friendsList').append(friend);
            lastIndexOfFriend+=1;
            //TODO: action listener for the new friend
        }

    });
   // $('#chat').load("./chat");
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

                    /* try {
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


                     }*/
                });
            }
        }
        catch(err) {
            friendsList.innerHTML += "<div class=\"row friend\" id=" + i + ">No friends:( </div>";
            //console.log(err.message);
        }

    });




    socket.on('openChat',function (room,name) {

        $('#chat').load("./chat");
        openedRoom = room;

        try {
            var openedConversation = document.getElementById(room).innerText;
        }
        catch(err) {
            var openedConversations = document.getElementById('conversations');
            openedConversations.innerHTML +=
                "<div class=\"col-2 conversationFriend dropdown\" id=" + room + "buttons ><input id=" + room +"button "+
                " class='change dropbtn' onclick=\"myFunction()\" type=\"button\" value=" + name+ ">" +
                "<div id=\"myDropdown\" class=\" col-2 myDropdown dropdown-content\">\n" +
                "<input  class=\"change openConv\" id=" + room + " type=\"button\" value=\"Deschide\">\n" +
                "<input  class=\"change closeConv\" id=" + room + " type=\"button\" value=\"Inchide\">\n" +
                "</div></div>";
               /* "<div class=\"col-2 conversationFriend\" > <input id=" +room +
                " class='change' type=\"button\" value=" + name+ "></div>";*/
            /*"<div class=\"col-2 conversationFriend\" > <input id=" +room +
            " class='change' type=\"button\" value=" + name+
            "> <div id='exit'><input id="+ room +"x  class='exit' type='button' value='x' ></div></div>"*/


            openedRoom = room;
            addListenerForOpenConversationButton();
            addListenerForCloseConversationButton();
            addListenerForDrop();
            /*var conversation = document.getElementById(room);
            console.log(conversation.id);
            conversation.addEventListener('click',function(){

                console.log("am dat click pe conversatia" + this.id);
            })*/

        }

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

// When the user clicks on div, open the popup


function myFunction() {
  //  document.getElementById("myDropdown").classList.toggle("show");
    var meniu = document.getElementsByClassName("myDropdown");

    for (var i = 0; i < meniu.length; i++){
       meniu[i].classList.toggle("show");
        }

}

// Close the dropdown if the user clicks outside of it

function addListenerForDrop (){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener('click',function () {
           // console.log("DropMeniuShowed"+ this.id);
            if (this.classList.contains('show')) {
                this.classList.remove('show');
            }
        })
}}
/*
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

*/