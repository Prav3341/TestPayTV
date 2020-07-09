//var SubsId = 10126100011612;
//var OperatorId = "PayTv";
//var CustId = "11612";
var SubsId = localStorage.getItem("SubsUniqueID");
var OperatorId = localStorage.getItem("CableOperaterID");
var CustId = localStorage.getItem("CustomerId");
var TotlaTime = 0;
var SessionTime = 0;
var TimeOut = 0;


var ctime;
var TransNumber = localStorage.getItem("TransID");



function wordInString(s, word) {
    return new RegExp('\\b' + word + '\\b', 'i').test(s);
}

function SetPermission(ttime) {
    TotlaTime = parseInt(ttime);
    SessionTime = parseInt(ttime);
    TimeOut = 1;
}

$(document).ready(function () {
    $(".Card_effect").hover(function () {
        $(".green").toggleClass('card-header2');
    });
    $(".Card_effect1").hover(function () {
        $(".red").toggleClass('card-header2');
    });
    $(".Card_effect2").hover(function () {
        $(".Yellow").toggleClass('card-header2');
    });

    $(".Card_effect3").hover(function () {
        $(".Blue").toggleClass('card-header2');
    });
});

function closePaymentBox() {

    $("body").removeClass("overflow");
    $('#materialize-lean-overlay-2').css('z-index', '0');
    $('#materialize-lean-overlay-2').css('display', 'none');
    $('#materialize-lean-overlay-2').css('opacity', '0');

    $('#modal1').css('z-index', '1003');
    $('#modal1').css('display', 'none');
    $('#modal1').css('opacity', '0');
    $('#modal1').css('transform', 'scaleX(1)');
    $('#modal1').css('top', '522.174px');

}
//Sesion Work start
function CallMe() {
    if (ctime == 0)
        ctime = TotlaTime;
    ctime--;
    if (ctime == TimeOut)
        setSessionMsg(TimeOut);
    //if (ctime == 0) {
    //    document.location.replace("SignOut");

    //}
    if (ctime == 0) {
        Logout();
    }
}
//Resets session Timer
function setSessionMsg(Diff) {
    var InnerData = "";
    InnerData = "Your Session is going to expire soon please click <b>Yes</b> To Stay Online And <b>Cancel</b> to Logout and End Session.<p>Your Session Expires In <span id='CountDown'>0" + Diff + ":00</span></p>";
    //MsgBox("E", InnerData);
    //$("#SessionMasg").html(InnerData);
    //$(".session_bg").show();
    //$("#SessionmainDiv").show();
}


$(window).load(function () {
    SetPermission(20);
    TransNumber = localStorage.getItem("TransID");
    if (TransNumber != undefined && TransNumber != '' && TransNumber != null) {
       
    }
    else {
        document.location.replace('../SignIn');
    }
    SetTimer = window.setInterval(function () {
        CallMe();
    }, 60000);

});

