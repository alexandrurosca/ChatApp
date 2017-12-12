$(document).ready(function(){
         $('#chat').load("./chat");
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

