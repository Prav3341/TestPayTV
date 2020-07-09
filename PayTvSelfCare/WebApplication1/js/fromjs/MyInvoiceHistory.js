var CurrPGTransID = 0;
var IsPayInc = "";

function GetMyInvoiceHistory(TopRowCount) {
    try {

       

        $('#Loadingbg').css('display', 'block');
        //SubsId = 10126100000514;
        var CustId = localStorage.getItem("CustId");
        OperatorId = localStorage.getItem("CableOperaterID");
        //FromDate = "01-Dec-2014 16:2 pm"
        //PushData('FromDate', FromDate);
        //PushData('ToDate', ToDate);

        PushData('TopRowCount', TopRowCount);
        PushData('CustId', CustId);
        PushData('OPID', OperatorId);
        CallPublicAPI('../MyInvoiceHistory.aspx/GetMyInvoiceHistory', '', OnPassGetMyInvoiceHistory, OnFailGetMyInvoiceHistory);

    } catch (e) {
        //   $('.preloader-wrapper').delay(100).fadeOut();

        $('#Loadingbg').css('display', 'none');
    }
}

function OnPassGetMyInvoiceHistory(result) {
    //var res = result.d.split("|");
    //var PaymentHistoryData = res[0] == "" ? null : JSON.parse(res[0]);
    var PaymentHistoryData = result.d == "E" ? null : JSON.parse(result.d);



    var TableHtml = "";
    if ($.fn.DataTable.isDataTable('#InvoiceHistoryDataTable')) {
        $('#InvoiceHistoryDataTable').DataTable().destroy();
    }

    if (PaymentHistoryData["Status"] == "Success" || PaymentHistoryData["S"] == "S") {
        var color = NewColor = "";
        var TrasNo = PeriodFrm = PeriodTo = DrCrIcon = IsDrCr = PeriodDate = "";
        var DrAmt = 0, CrAmt = 0;

        var DocIcon = "", EntryColor = "";

        var DrCr = "";
        var SubsBal = "";


        $(PaymentHistoryData.Description).each(function (e, k) {


            DocIcon = "fa-tags";
            EntryColor = "Red";



            TableHtml +=
                '<div class="vertical-timeline-block ">'
                + '<div class="ledgerdate">'
                + '' + k.DocMonth + '</br>' // k.DocMonth 
                + '' + k.DocDay + '</br>' //k.DocDay
                + '' + k.DocYear + '</br>' // k.DocYear
                + '' + k.DocTime + '</br>' //k.DocTime
                + '' + k.DocPeriod + '</br>' // k.DocPeriod 
                + '</div>'

                + '<div class="vertical-timeline-icon lazur-bg">'
                + '<i class="fa ' + DocIcon + '"></i>'
                + '</div>'

                + '<div class="vertical-timeline-content Content1Before">'
                + '<input type="hidden" id="DocID" value="' + k["InvoiceID"] + '">'
                + '<div class="upperdetails">'

            TableHtml += '<p id="DocNo"> Invoice No : ' + k["InvoiceNo"] + '</p>'

            TableHtml += '<p style="float: right; color: ' + EntryColor + '" class="FullDrCr">' + "" + '</p>' //k.EntryType
            TableHtml += '</div>'

            TableHtml += '<div class="middledetails">'
            TableHtml += '<h5 id="ProfileDue"> FOR TV ' + k["ConnID"] + '</span></h5>'
            TableHtml += '<p style="float: right; font-weight: 600;"><i class="fa fa-inr"></i>&nbsp;&nbsp;&nbsp;' + (+k["Amount"]).toFixed(2) + ' </p>'
            TableHtml += '</div>';

            TableHtml += '<div class="bottomdetails" ';

            TableHtml += '>';

            TableHtml += '<p>VC No. - ' + k["SmartCardNo"] + '</p>'
            TableHtml += '<p style="float: right;" id="Amount"> &nbsp;&nbsp;<i onclick="javascript:InvoicePreviewShow(' + k["InvoiceID"] +')" class="fa fa-file-pdf-o" aria-hidden="true"   title="View"  style="cursor:pointer; color: orangered; font-size: 18px;"></i></p>'
            TableHtml += '</div>';

            TableHtml += '</div>';
            TableHtml += '</div>';


        });
    }
    else
        TableHtml = null;



    $('#vertical-timeline').empty();

    $('#vertical-timeline').append(TableHtml);




  

    //  $('.preloader-wrapper').delay(100).fadeOut();

    $('#Loadingbg').css('display', 'none');

}

function OnFailGetMyInvoiceHistory(result) {
    //$('.preloader-wrapper').delay(100).fadeOut();

    $('#Loadingbg').css('display', 'none');
}




function InvoicePreviewShow(InvoiceId) {
    try {

        $("#PaymentHistoryContainer").css("display", "none");
        //var OPID = $(ctrl).closest("td").data("opid");
      //  var InvoiceId = $(ctrl).closest("td").data("invoiceid");

        //$('.preloader-wrapper').fadeIn("slow");

        $('#Loadingbg').css('display', 'block');
        //CurrPGTransID = PGID;

        PushData('InvoiceId', InvoiceId);
        PushData('RequestType', 'HTML');
        PushData('OPID', OperatorId);

        //CallWebMethod('../PaymentHistory.aspx/GetPaymentRecpt', WebMethodData, OnPassGetPaymentRecpt, OnFailGetPaymentRecpt);

        CallPublicAPI('../MyInvoiceHistory.aspx/GetInvoiceHtml', '', OnPassGetInvoiceHtml, OnFailGetInvoiceHtml);

    } catch (e) {

    }
}

function OnPassGetInvoiceHtml(result) {
    var result = result.d.split("|");

    var Data = JSON.parse(result[0]);
    if (Data.Status == "Success" || Data.Description[0]["Status"] == "R101") {
        window.scrollTo(0, 0);
        $('#RecptMainDiv').html(Data.Description[0]["HTML"]);

        $("#DownloadInvoice").css("display", "block");
       // $('.preloader-wrapper').css("display", "none");
        $('#Loadingbg').css('display', 'none');
        $('#RecptMainDiv').css("display", "block");
    }
    else {

        $("#PaymentHistoryContainer").css("display", "block");
       // $('.preloader-wrapper').css("display", "none");
        $('#Loadingbg').css('display', 'none');

        MsgBox("E", "Receipt not found.");

    }
}

function OnFailGetInvoiceHtml(result) {
    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}


function GoBackToPaymentHistory() {
    //$("#DownloadInvoice").html("");
    $("#DownloadInvoice").css("display", "none");
    $("#PaymentHistoryContainer").css("display", "block");
}

function DownloadInvoice() {
    try {

        fnDownloadInvoice($("#RecptMainDiv").html().trim())

        //$('.preloader-wrapper').fadeIn("slow");

        //var Style = '<style type="text/css"> @font-face { font-family: Play-Bold; src: url(!fonts/Play-Bold.ttf!) format(!truetype!); }  #SuccessReceipt { font-size: 14px;  font-family: !Segoe UI!; color: #484848; margin-bottom: 20%; width: 90%; margin: auto; border: 1px solid #bfbcbc; border-radius: 1px; padding: 10px;  } #SuccessReceipt p { margin: 0px; padding: 0px; line-height: 25px; }#SuccessReceipt { padding: 15px; } #SuccessReceipt .mainDiv { padding: 2px !important; }</style>';
        //var html = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /></head><body>'
        //html = html + 
        //html = html + '</body></html>'

        //var HTML = encodeURIComponent(html);
        //PushData('RecpHtml', HTML);
        //PushData('IsCallByMobileApp', IsCallByMobileApp);
        //PushData('IsCallByIOSMobileApp', localStorage.getItem("IsCallByIOSMobileApp"));
        //CallWebMethod('../MyInvoiceHistory.aspx/DownloadInvoice', WebMethodData, OnPassDownloadInvoice, OnFailDownloadInvoice);

    } catch (e) {

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
  //  $('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}

function OnFailDownloadInvoice(result) {
    //$('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}

$(window).load(function () {

    $('.mdi-action-search').text("");
    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Invoice History") {
            $(this).addClass("active");
        }
    });
    $('.preloader-wrapper').css('display', 'none');
    GetMyInvoiceHistory(5);

});

$(document).ready(function () {


    //called when key is pressed in textbox
    $("#txtWalletAmount").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    ////if (SetDefaultVal(localStorage.getItem("CompanyLogo") != '')) {
    ////    GetBase64Img(localStorage.getItem("CompanyLogo"));
    ////    // ImgPath = "../GetImage.ashx?imgid=" + localStorage.getItem("CompanyLogo");


    ////}
    ////else {
    ////    ImgPath = "../Channel/images.png";


    ////}
    // encodeImagetoBase64(ImgPath)
    //$("#PaymentCmpLogo").attr("src", ImgPath);


    $('#drpDuration').on('change', function () {
        var TopRowWise = $(this).find('option:selected').val();
        GetMyInvoiceHistory(TopRowWise);
    });

});




function ExcelExportGrid()
{
    var MemberShipNo = localStorage.getItem("CurrMemShipNo");
    window.open("../Handler/ExcelDownload.ashx?Exportfilename=MyInvoiceHistory&MemberShipNo="+MemberShipNo, '_blank');
}

function PdfExportGrid() {
    var MemberShipNo = localStorage.getItem("CurrMemShipNo");
    window.open("../Handler/PdfDownload.ashx?Exportfilename=MyInvoiceHistory&MemberShipNo=" + MemberShipNo, '_blank');
}
