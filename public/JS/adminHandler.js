var socket;


$(document).ready(function(){
    socket = io();
    socket.emit('usersList');
    addListenerLogOut();

});


$(function () {
    socket.on('usersList', function (users) {
        //try
        var usersList = document.getElementById('friendsList');
        //console.log(users);
        users.forEach(function (item, index) {
            usersList.innerHTML +=
            "<div class=\"dropdown row friend \" id=" + item.username + "div >" + item.username +
            "<div id=\"myDropdown\" class=\" col-2 myDropdown dropdown-content edit\">\n" +
            "<input  class=\"change deleteUser\" id=" + item.username + "  type=\"button\" value=\"Sterge\">\n" +
            "</div></div>";
        })
        addListenerForCloseConversationButton();
        addListenerForDrop();
    })
});

//listener logout
function addListenerLogOut(){
    document.getElementById('logOut').addEventListener('click',
        function () {
            location.replace("http://localhost:3000");
        });
}
function addListenerForCloseConversationButton() {
    var conversations = document.getElementsByClassName('deleteUser');

    for (var i = 0; i < conversations.length; i++)
        conversations[i].addEventListener('click',function(){


            var parent = document.getElementById("friendsList");
            var child = document.getElementById(this.id+ "div");
            parent.removeChild(child);
           // console.log("am inchis conversatia " + this.id);

        });
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


