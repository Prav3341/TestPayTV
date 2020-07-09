function GetProcess() {
 
    CallPublicAPI('SubscriptionProcess.aspx/ProcessStep1', '', Step1OnPass, Step1OnFail);
    $('#Loadingbg').css('display', 'block');

}
function Step1OnPass(result) {
  
    var data = result.d;
    if (data.split('|')[0] == "true") {
        $(".Step1").find("i").removeClass("fa fa-spinner");
        $(".Step1").find("i").addClass("fa fa-check");
        $(".Step1").removeClass("lazur-bg");
        $(".Step1").removeClass("rotate");
        $(".Step1").addClass("navy-bg");
        $("#Step1").html("Payment verified");
        $(".Step1").parent().parent().removeClass("yelloBg ");
        $(".Step1").parent().parent().addClass("GreenBg ");

        $(".Step2").find("i").removeClass();
        $(".Step2").find("i").addClass("fa fa-spinner");
        $(".Step2").removeClass("yellow-bg");
        $(".Step2").addClass("lazur-bg");
        $(".Step2").addClass("rotate");
        $("#Step2").html("Balance update in process");

        $(".Step3").find("i").removeClass();
        $(".Step3").find("i").addClass("fa fa-spinner");
        $(".Step3").addClass("yellow-bg");
        $(".Step3").removeClass("lazur-bg");
        $("#Step3").html("Subscription in processs");
        

        Step2();

    }
    else {
        $(".Step1").find("i").removeClass();
        $(".Step1").find("i").addClass("fa fa-times");
        $(".Step1").addClass("lazur-bg");
        $("#Step1").html("Payment failed");

        $(".Step2").find("i").removeClass();
        $(".Step2").find("i").addClass("fa fa-times");
        $(".Step2").addClass("lazur-bg")
        $("#Step2").html("Balance updated failed");
        $(".Step1").parent().parent().removeClass("yelloBg ");
        $(".Step1").parent().parent().addClass("redBg ");
        $(".Step2").parent().parent().removeClass("yelloBg ");
        $(".Step2").parent().parent().addClass("redBg ");

        

        $(".Step3").find("i").removeClass();
        $(".Step3").find("i").addClass("fa fa-times");
        $(".Step3").removeClass("yellow-bg");
        $(".Step3").addClass("lazur-bg");
        $("#Step3").html("Subscription failed");
        $("#Retry").show();
      
    }
}
function Step1OnFail(result) {
  
}
function Step2() {
    CallPublicAPI('SubscriptionProcess.aspx/ProcessStep2', '', Step2OnPass, Step2OnFail);
}
function Step2OnPass(result) {
  
    var data = result.d;
    if (data.split('|')[0] == "true") {
        $(".Step2").find("i").removeClass();
        $(".Step2").find("i").addClass("fa fa-check");
        $(".Step2").removeClass("lazur-bg");
        $(".Step2").removeClass("rotate");
        $(".Step2").addClass("navy-bg");
        $("#Step2").html("Balance updated");
        $(".Step2").parent().parent().removeClass("yelloBg ");
        $(".Step2").parent().parent().addClass("GreenBg ");

        $(".Step3").find("i").removeClass();
        $(".Step3").find("i").addClass("fa fa-spinner");
        $(".Step3").removeClass("yellow-bg");
        $(".Step3").addClass("lazur-bg");
        $(".Step3").addClass("rotate");
        $("#Step3").html("Subscription in processs");
        setTimeout(Step3(data.split('|')[1]), 20000); 
        
    }
    else {
        $(".Step2").find("i").removeClass();
        $(".Step2").find("i").addClass("fa fa-times");
        $(".Step2").removeClass("rotate");
        $(".Step2").addClass("lazur-bg")
        $("#Step2").html("Balance updated failed");
        $(".Step2").parent().parent().removeClass("yelloBg ");
        $(".Step2").parent().parent().addClass("redBg ");

        $(".Step3").find("i").removeClass("fa fa-spinner");
        $(".Step3").find("i").addClass("fa fa-times");
        $(".Step3").removeClass("yellow-bg");
        $(".Step3").addClass("lazur-bg");
        $("#Step3").html("Subscription failed");
       
        setTimeout(CancelTrans, 4000);
       

    }
}
function RedirectPage(url) {
    document.location.replace(url);
}

function Step2OnFail(result) {
   
}
function Step3(RecpBuffID) {
    PushData('PGTransID', RecpBuffID);
    CallPublicAPI('SubscriptionProcess.aspx/ProcessStep3', '', Step3OnPass, Step3OnFail);
    
}
function Step3OnPass(result) {
 
    var data = result.d;
    if (data.split('|')[0] == "true") {
        $(".Step3").find("i").removeClass();
        $(".Step3").find("i").addClass("fa fa-check");
        $(".Step3").removeClass("lazur-bg");
        $(".Step3").removeClass("rotate");
        $(".Step3").addClass("navy-bg");
        $("#Step3").html("Subscription done");
       
        setTimeout(SucessTrans, 4000);
    }
    else {
        $(".Step3").find("i").removeClass();
        $(".Step3").find("i").addClass("fa fa-times");
        $(".Step3").addClass("lazur-bg");
        $(".Step3").removeClass("rotate");
        $("#Step3").html("Subscription failed");
        
        setTimeout(CancelTrans, 4000);
    }
}
function Step3OnFail(result) {
  
}
function SucessTrans() {
    document.location.replace("../SubscriptionSucess");
}
function CancelTrans() {
    document.location.replace("../SubscriptionFail");
}
function Retry() {
    GetProcess();
}



$(document).ready(function () {
  
    GetProcess();
});
$(window).load(function () {

});