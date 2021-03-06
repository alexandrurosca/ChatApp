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
            if(item.username != 'admin'){
                usersList.innerHTML +=
                    "<div class=\"dropdown row friend \" id=" + item.username + "div >" + item.username +
                    "<div id=\"myDropdown\" class=\" col-2 myDropdown dropdown-content edit\">\n" +
                    "<input  class=\"change deleteUser\" id=" + item.username + "  type=\"button\" value=\"Sterge\">\n" +
                    "</div></div>";
            }

        })
        addListenerForCloseConversationButton();
        addListenerForDrop();
    })

    //send message to everyone
    $('#chat').submit(function(){
        var data = {name: 'ADMIN', msg: $('#m').val()};
        socket.emit('chat message admin', data);
        document.getElementById('messages').innerHTML +=  "<li>"  +  "<b style='color:black; font-family: Verdana;font-size: 130%;'>" + "<i>" +data.name+"</i>" + " : " +data.msg +"  </b></li>";
        $('#m').val('');
        return false;
    });
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

            socket.emit('deleteUser', this.id);
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

$('#chooseFile').bind('change', function () {
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
