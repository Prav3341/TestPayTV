var IsPayuSync = "";
var PayAmt = "";

function SetPaymentMessage(status, Amt) {
    IsPayuSync = status;
    PayAmt = Amt;
}

function BackToDashboard() {
    document.location.replace('../SignIn');
}


$(window).load(function () {

    if (IsPayuSync == "True") {
        $("#PayAmt").html('<i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + PayAmt + '&nbsp;');

        $("#CancelReceipt").css("display", "none");
        $("#PaymnetInSync").css("display", "block");
    }

    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "CancelPage") {
            $(this).addClass("active");
        }
    });

    if (localStorage.getItem("IsCalledOnLoad") == "true")
        localStorage.setItem("IsCalledOnLoad", false);
});


$(document).ready(function () {


});
