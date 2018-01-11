$('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
        $(".file-upload").removeClass('active');
        $("#noFile").text("No file chosen...");
    }
    else {
        console.log("1");
        $(".file-upload").addClass('active');
        $("#noFile").text(filename.replace("C:\\fakepath", ""));
    }
});