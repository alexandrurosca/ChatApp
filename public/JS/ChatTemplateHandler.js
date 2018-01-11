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
   // console.log("Here");
    addListenerLogOut();

    socket.emit('logout',username);
    socket.emit('profilePicture', username);
    console.log("Here");
});



function addListenerLogOut(){
    document.getElementById('logOut').addEventListener('click',
        function () {
            location.replace("http://localhost:3000");
        });
}

// add listener : change room + reload chat
function addListenerForOpenConversationButton() {
    var conversations = document.getElementsByClassName('openConv');

    for (var i = 0; i < conversations.length; i++)
        conversations[i].addEventListener('click',function(){
            if(openedRoom!= this.id) {
                openedRoom = this.id;
                $('#chat').load("./chat");
                socket.emit("getHistory", openedRoom, username, this.value);
                console.log("am deschis conversatia " + this.id);
            }
        });
}

    function addListenerFriend() {

        var friends = document.getElementsByClassName('friend');

        for(var  i = 0;i<friends.length;i++) {
            friends[i].addEventListener('click', function () {
                console.log(this.innerText);

                socket.emit('createConversation', username, this.innerText);
            });
        }}

//listener to close conversation
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
        socket.emit('add friend', username, friendName ); })

    //listener for deleteFriend
    document.getElementById('deleteFriendButton').addEventListener('click',function () {
        var friendName =$('#nameFriendInput').val();
        console.log('deleteFriend');
        socket.emit('deleteFriend', username, friendName ); })

    socket.on('confirm add friend', function (data, modified, friendName) {
        alert(data);
        if(modified){
            var friend = $("<div class=\"row friend\" id="+ lastIndexOfFriend +" ></div>").text(friendName);
            $('#friendsList').append(friend);
            lastIndexOfFriend+=1;
           addListenerFriend()
        }

    });
    socket.on('reload list friends',function () {
        socket.emit('friendsList',username);
    })
    socket.on('request add friend', function (friend) {
        var confirmAccept = confirm(friend + ' wants to add you!');
        console.log("Confirm accept: ", confirmAccept);
        socket.emit('confirm add friend1', confirmAccept);
    });


    socket.on('friendsList',function (friends) {
        socket.emit('user login', username);
        lastIndexOfFriend = friends.length;
        var friendsList = document.getElementById('friendsList');
        friendsList.innerHTML="";
        try{

            for(var  i = 0;i<friends.length;i++) {
                friendsList.innerHTML += "<div class=\"row friend\" id=" + i + ">" + friends[i] + "</div>";
            }
            addListenerFriend();
            /*for(var  i = 0;i<friends.length;i++) {
                var friend = document.getElementById(i);

                friend.addEventListener('click',function(){
                    console.log( this.innerText);

                    socket.emit('createConversation',username,this.innerText);
                });
            }*/
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

            openedRoom = room;
            addListenerForOpenConversationButton();
            addListenerForCloseConversationButton();
           // addListenerForDrop();
        }

    });

    socket.on('connectToRoom',function (room) {
        socket.emit('connectToRoom',room);
    });


    //profile picture
    socket.on('profilePicture', function (source) {
        var src = "data:image/jpeg;base64," + source;
        document.getElementById('profilePicture').setAttribute('src', src);
    })




});



// When the user clicks on div, open the popup
function myFunction() {
  //  document.getElementById("myDropdown").classList.toggle("show");
    var meniu = document.getElementsByClassName("myDropdown");

    for (var i = 0; i < meniu.length; i++){
       meniu[i].classList.toggle("show");
        }

}

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
