
function DownloadPayRecpt() {
    try {
        thtml = $("#SuccessReceipt").html().trim();

        $('#Loadingbg').css('display', 'none');
        //var Style = '<style type="text/css"> @font-face { font-family: Play-Bold; src: url(!fonts/Play-Bold.ttf!) format(!truetype!); }  #SuccessReceipt { font-size: 14px;  font-family: !Segoe UI!; color: #484848; margin-bottom: 20%; width: 90%; margin: auto; border: 1px solid #bfbcbc; border-radius: 1px; padding: 10px;  } #SuccessReceipt p { margin: 0px; padding: 0px; line-height: 25px; }#SuccessReceipt { padding: 15px; } #SuccessReceipt .mainDiv { padding: 2px !important; }</style>';
        var html = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /></head><body>'
        html = html + thtml;
        html = html + '</body></html>'
        WebMethodData = [];
        IsCallByMobileApp = false;
        IsCallByIOSMobileApp = false;
        var HTML = encodeURIComponent(html);
        PushData('RecpHtml', HTML);
        PushData('IsCallByMobileApp', IsCallByMobileApp);
        PushData('IsCallByIOSMobileApp', IsCallByIOSMobileApp);
        CallWebMethod('../login.aspx/DownloadInvoice', WebMethodData, OnPassDownloadInvoice, OnFailDownloadInvoice);
    } catch (e) {
        $('#Loadingbg').css('display', 'none');
    }
}

function OnPassDownloadInvoice(result) {
    var res = result.d;

    if (res.indexOf("|") > 0) {
        if (res.split("|")[0] == "S") {
            var StrHtml = res.split("|")[1];
            if (localStorage.getItem("IsCallByIOSMobileApp") == "true")
                webkit.messageHandlers.ReceiptHandler.postMessage(StrHtml);
            else
                app.DownloadInvoice(StrHtml);
        }
    }
    else if (res == "S") {
        window.open("../DownloadPDF.ashx", '_blank');
    }
    // $('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}

function OnFailDownloadInvoice(result) {
    // $('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}

function GetRceipt() {
    try {

        //$('.preloader-wrapper').fadeIn("slow");
        $('#Loadingbg').css('display', 'block');

        CallPublicAPI('../SuccessPageQP.aspx/GetMyPaymentHistory', '', OnPassGetHTML, OnFailGetHTML);
    }
    catch (e) {
        //$('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');
        $('#ErrorText').html("Something went wrong please try again later !!");
        $('.ErrorShowMian').show();
    }
}

function OnPassGetHTML(result) {
    result = result.d
    if (result != "") {
        var MyDocument = "";
        MyDocument = result.d == "E" ? null : JSON.parse(result);
        if (MyDocument["Status"] == "Success" || MyDocument["Status"] == "S") {
            window.scrollTo(0, 0);
            DocHTML = MyDocument.Description[0]["HTML"];
            $("#SuccessReceipt").html(DocHTML);
            DownloadPayRecpt();

            $('#Loadingbg').css('display', 'none');
        } else {
            $('#ErrorText').html(MyDocument.Description[0]);
            $('.ErrorShowMian').show();
            $('#Loadingbg').css('display', 'none');
        }
    }
    else {
        $('#ErrorText').html("Something went wrong please try again later !!");
        $('.ErrorShowMian').show();
        $('#Loadingbg').css('display', 'none');
    }
}


function OnFailGetHTML(result) {
    // $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
    $('#ErrorText').html("Something went wrong please try again later !!");
    $('.ErrorShowMian').show();
}

function BackTohomePage() {
    document.location.replace('../SignIn');
}

function CloseError() {
    $('.ErrorShowMian').hide();
    localStorage.clear
    document.location.replace('../SignIn');
}

$(document).ready(function () {
    $('#Liteloding-wrapper').css('display', 'none');
    GetRceipt();
});

