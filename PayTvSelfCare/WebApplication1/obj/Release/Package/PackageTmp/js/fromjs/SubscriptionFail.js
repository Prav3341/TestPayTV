var SplitData = null;
var SubscriptionFail = "";;
function GetSubscriptionFail() {
    CallPublicAPI('SubscriptionFail.aspx/GetSubscriptionFail', '', OnPass, OnFail);
    $('#Loadingbg').css('display', 'block');
}
function OnPass(result) {
    $('#Loadingbg').css('display', 'none');
    var data = result.d.split("*");
    SplitData = data[0];
   
    if (SplitData != "") {
        //SplitData = SplitData == "" ? null : SplitData.split("|");
         $(".Addmoney").hide();
        $(".Failmsg").show();
    }
    else if (data[1] != "") {
        SubscriptionFail = JSON.parse(data[1]);
        $(".Failmsg").show();
        if (SubscriptionFail[0]["RecpNo"] != "" && SubscriptionFail[0]["RecpNo"] != undefined && ubscriptionFail[0]["RecpNo"]!=null) {
            $(".Addmoney").show();
            $("#ReceiptDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
            $("#ReceiptAmount").html( parseFloat(SubscriptionFail[0]["RecpAmt"]).toFixed(2));
            $("#RecpNo").html(SubscriptionFail[0]["RecpNo"]);
        }
        $("#Failmsg").html(SubscriptionFail);
    }
    else if (localStorage.getItem("SubscriptionFail") != null) {
        $(".Failmsg").show();
        $(".AddMoney").hide();
        $("#Failmsg").html(localStorage.getItem("SubscriptionFail").toString());
        localStorage.removeItem("SubscriptionFail");
    }
    else {
        $(".Failmsg").show();
        $(".AddMoney").hide();
    }
}
function OnFail(result) {
    $('#Loadingbg').css('display', 'none');


}

$(document).ready(function () {
    $('#Liteloding-wrapper').css('display', 'none');
    GetSubscriptionFail();
});
$(window).load(function () {
   
});