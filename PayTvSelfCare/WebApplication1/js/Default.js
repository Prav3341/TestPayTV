$(document).ready(function () {
    $(".QuickPay").click(function () {


        $(".overlay").addClass('overlay-open');
        $(".DefaultPage").css("overflow", "hidden");

    });





    $(".overlay-close").click(function () {

        $("#MCTNO").val("");
        $("#txtSubsID").val("");
        $("#txtSTB").val("");
        $("#txtSmartCard").val("");

        $(".step-1").css("display", "none");
        $(".step-2").css("display", "none");

        $("#SelectState").val("-1");
        $("#SelectCity").val("-1");
        $("#SelectServiceProvider").val("-1");

        $(".IDStep").css("display", "block");

        $(".clsContinue").css("visibility", "hidden");

        $(".Step2Error").css("visibility", "hidden");

        $(".overlay").removeClass('overlay-open');
        $(".DefaultPage").css("overflow", "auto");
    });

    $(".nav li a").on("click", function () {

        var pathname = window.location.pathname; // Returns path only

        var ChkPath = "";
        if (pathname.indexOf("/") != -1) {
            ChkPath = pathname.split("/")[1];
        }

        //if (ChkPath != "Default" && ChkPath != "") {
        //    if ($(this).attr("title").trim() != "Quick Pay" && $(this).attr("title").trim() != "sign-up") {
        //        document.location.replace('../Default');
        //    }
        //}
    });


    $("#OutrightTab").click(function () {
        $("#stb_ops").css('display', 'block');
        $("#rental_scheme").css('display', 'none');
    });
    $("#StarndardTab").click(function () {
        $("#stb_ops").css('display', 'none');
        $("#rental_scheme").css('display', 'block');
    });
});