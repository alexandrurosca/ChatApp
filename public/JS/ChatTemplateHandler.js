//var database = require('../databaseMongo/db.js');
// $.import_js('/path_to_project/scripts/somefunctions.js');
// var cookieParser = require('./cookieHandler');
var username;
var socket;
var openedRoom;
var friend;
var imageTry;

var fr;
$(document).ready(function(){
    socket = io();
    username = window.user;
    socket.emit('friendsList',username);
   // console.log("Here");
    addListenerLogOut();
    addListenerAccount();
    socket.emit('logout',username);
    socket.emit('profilePicture', username);
    console.log("Here");
    setTimeout(onlineOffline, 500);
});
//listener account
function addListenerAccount(){

    document.getElementById('account').addEventListener('click',
        function () {
            var form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', 'chatTemplate/editAccount');
            form.style.display = 'hidden';
            document.body.appendChild(form)
            form.submit();
        });
}


//listener logout
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
                friend= this.value;
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
            friend="";
                document.getElementById('chat').innerHTML= "";
            console.log("am inchis conversatia " + this.id);

        });
}

function onlineOffline() {
    var friends = document.getElementsByClassName('friend');

    for (var i = 0; i < friends.length; i++) {
        console.log(friends[i].innerText);
        socket.emit('checkOnline', friends[i].innerText);
    }
}
$(function () {
    document.getElementById('infoUser').innerText=username;
    $('#chat').submit(function(){
        var data = {name:username, msg: $('#m').val(), room: openedRoom, to:friend, date: null, message: null};
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

    //send picture
    document.getElementById('sendPhoto').addEventListener('click',function () {
        handleFileSelect();
        setTimeout(function () {
            var image = fr.result;
            console.log("send photo: ", image);
            // document.getElementById('profilePicture').setAttribute('src', image);
            var data = {img: image, room: openedRoom ,to:friend};
            socket.emit('chat message photo', data,username);
        }, 500);

    })

    
    
    socket.on('confirm add friend', function (data, modified, friendName) {
        alert(data);
        if(modified){
            var friend = $("<div class=\"row friend\" id="+ friendName +" ></div>").text(friendName);
            $('#friendsList').append(friend);
            //lastIndexOfFriend+=1;
           addListenerFriend();
            socket.emit('checkOnline', friendName);
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


    socket.on('friendsList',function (friends, profilePicture) {
        socket.emit('user login', username);
       // lastIndexOfFriend = friends.length;
        var friendsList = document.getElementById('friendsList');
        friendsList.innerHTML="";
        try{

            for(var  i = 0;i<friends.length;i++) {
                friendsList.innerHTML += "<div class=\"row friend\" id=" + friends[i] + ">" + friends[i] + "</div>";
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
        if(openedRoom!=room) {

            $('#chat').load("./chat");
            openedRoom = room;
            friend = name;
            try {
                var openedConversation = document.getElementById(room).innerText;
            }
            catch (err) {
                var openedConversations = document.getElementById('conversations');
                openedConversations.innerHTML +=
                    "<div class=\"col-2 conversationFriend dropdown\" id=" + room + "buttons ><input id=" + room + "button " +
                    " class='change dropbtn' onclick=\"myFunction()\" type=\"button\" value=" + name + ">" +
                    "<div id=\"myDropdown\" class=\" col-2 myDropdown dropdown-content\">\n" +
                    "<input  class=\"change openConv\" id=" + room + " type=\"button\" value=\"Deschide\">\n" +
                    "<input  class=\"change closeConv\" id=" + room + " type=\"button\" value=\"Inchide\">\n" +
                    "</div></div>";

                openedRoom = room;
                friend = name;
                socket.emit("getHistory", openedRoom, username, friend);
                addListenerForOpenConversationButton();
                addListenerForCloseConversationButton();
                // addListenerForDrop();
            }
        }

    });

    socket.on('connectToRoom',function (room) {
        if (room!= openedRoom)
        socket.emit('connectToRoom',room);
    });


    //profile picture
    socket.on('profilePicture', function (source) {
        var src = "data:image/jpeg;base64," + source;
        document.getElementById('profilePicture').setAttribute('src', src);
    })

    //online / offline

    socket.on('checkOnlineResponse', function (user, online) {
        try {
            var div = document.getElementById(user);
            if (online) {
                div.style.backgroundColor = '#DCEFF5';
                $('#' + user).hover(function(){
                    $(this).css("background-color", "#236475");
                }, function(){
                    $(this).css("background-color", '#DCEFF5');
                });
            } else {
                div.style.backgroundColor = '#304269';
                $('#' + user).hover(function(){
                    $(this).css("background-color", "#236475");
                }, function(){
                    $(this).css("background-color", '#304269');
                });
            }
        }catch (e){
            //TODO: no user
        }
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

function addListenerForDrop () {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener('click', function () {
            // console.log("DropMeniuShowed"+ this.id);
            if (this.classList.contains('show')) {
                this.classList.remove('show');
            }
        })
    }}
//image handler


function handleFileSelect()
{
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }

    var input = document.getElementById('fileinput');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        var file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        //fr.readAsText(file);
        fr.readAsDataURL(file);
    }
}

function receivedText() {
   // document.getElementById('editor').appendChild(document.createTextNode(fr.result));
    //var x =fr.result;
    //console.log(x);
    //document.getElementById('profilePicture2').setAttribute('src',x );
}

    imageTry = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODAKAP/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAB4AKAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APWDrEzXUBd2245DNkEexzngc/n6VqWDmSbcJGEjfd3Y69OnPHv79qy4NPMLxjz2aNs8YAX059e4zx1q6si2t6m5sqrHDdcdB/kV/KdS8tEHL1Zav0dEVpNu5WIyRtyOmD2xTIL9bOKIt/C3zc9eBkc8/wD6zmpLzWYVsv3kjcNycEbgDnr+J/w7Vk3NqWkDLlWwSAcYc46/56VUY8m45O+xciv47m4l2xv5kZyM55Pt6kY/lRVC2s2gkaRl2464BYe/I59P88AolLXQXK2a9xYWdgs7SNLtQKCAAzA+2eO351kXiNDM2258xeoYfKDjPPHQ9OKf/bsl1dnexaNkJwAFIO3P8iR2o1K1xN5jKrNvwG3EFepGO3b9T1p8qiw5rspMygOGdgc7uCTv9sAk9f6+nOjpsizLGrSblXpnpx90+uazr2xbRpY5GZWTHOB8xJHb0x/hVqyvvLMbdHACjjIAO4Y6+1RKabsVy9Ua/wDaEVraPGzFFxxtB+UdfwHAorHu7tr2VdzMPl6g4IPOfr06mitNOpPvH//Z';
$('#fileinput').bind('change', function () {
    var filename = $("#fileinput").val();
    if (/^\s*$/.test(filename)) {
        $(".file-upload").removeClass('active');
        $("#noFile").text("No file chosen...");
    }
    else {
        $(".file-upload").addClass('active');
        $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    }
});