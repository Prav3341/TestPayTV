var CurrPGTransID = 0;
var IsPayInc = "";

function GetMyPaymentHistory(FromDate, ToDate) {
    try {

        //$('.preloader-wrapper').fadeIn("slow");
        $('#Loadingbg').css('display', 'block');
        //SubsId = 10126100000514;
        SubsId = localStorage.getItem("SubsUniqueID");
        OperatorId = localStorage.getItem("CableOperaterID");
       // FromDate = "01-Dec-2014 16:2 pm"
        PushData('FromDate', FromDate);
        PushData('ToDate', ToDate);
        PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);
        CallPublicAPI('../MyPaymentHistory.aspx/GetMyPaymentHistory', '', OnPassGetMyPaymentHistory, OnFailGetMyPaymentHistory);

    } catch (e) {
        //$('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');
    }
}

function OnPassGetMyPaymentHistory(result) {
    //var res = result.d.split("|");
    //var PaymentHistoryData = res[0] == "" ? null : JSON.parse(res[0]);
    if (result.d.split("|")[1] == "AddMoney") {
        OnPassGetHTML(result.d.split("|")[0], "AddMoney");
    }
    else {
        var PaymentHistoryData = result.d == "E" ? null : JSON.parse(result.d.split("|")[0]);


    //var PaymentHistoryData = result.d == "E" ? null : JSON.parse(result.d);
    //var LatestBalAmt = parseFloat(res[1]);
    //var CurrOperatorID = res[2];

    //IsPayInc = res[3];

    //localStorage.setItem("MyWalletBalance", (LatestBalAmt).toFixed(2));


    //if (localStorage.getItem("IsPrePostType") == "0") {

    //    var Cr = "";
    //    var BAmount = 0;
    //    if (parseInt(localStorage.getItem("MyWalletBalance")) < 0) {
    //        Cr = "Cr";
    //        BAmount = (localStorage.getItem("MyWalletBalance")).replace("-", "");
    //    }
    //    else {
    //        Cr = "";
    //        BAmount = localStorage.getItem("MyWalletBalance");
    //    }

    //    $("#PayWalletBalance").html('<i class="fa fa-inr"></i>&nbsp;' + BAmount + '&nbsp;' + Cr);
    //    $("#WalletBalanceAmount").html('<i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + BAmount + '&nbsp;' + Cr + '&nbsp;');

    //    $("#AddWalletMoneyDiv").css("display", "none");
    //}
    //else
    //    $("#AddWalletMoneyDiv").css("display", "none");

    var TableHtml = "";
    if ($.fn.DataTable.isDataTable('#PaymentHistoryDataTable')) {
        $('#PaymentHistoryDataTable').DataTable().destroy();
    }

    if (PaymentHistoryData["Status"] == "Success" || PaymentHistoryData["S"] == "S") {

        var color = NewColor = "";
        var TrasNo = PeriodFrm = PeriodTo = DrCrIcon = IsDrCr = PeriodDate = "";
        var DrAmt = 0, CrAmt = 0;

        var DocIcon = "", EntryColor = "";

        var DrCr = "";
        var SubsBal = "";


        $(PaymentHistoryData.Description).each(function (e, k) {

           
            if (k["Receipt ID"] != 9999999999 || k["Receipt ID"] != "9999999999")
                DocIcon = "fa-credit-card-alt";
            else
                DocIcon = "fa fa-exclamation";

               EntryColor = "Green";
            
         

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
                + '<input type="hidden" id="DocID" value="' + k["Receipt ID"] + '">'
                + '<div class="upperdetails">'
          
                TableHtml += '<p id="DocNo"> Receipt No : ' + k["Receipt No"] + '</p>'
            
            TableHtml += '<p style="float: right; color: ' + EntryColor + '" class="FullDrCr">' + ""+ '</p>' //k.EntryType
            TableHtml += '</div>'

            TableHtml += '<div class="middledetails">'
            TableHtml += '<h5 id="ProfileDue">' + k["Payment Mode"] + '</span></h5>'
            TableHtml += '<p style="float: right; font-weight: 600;"><i class="fa fa-inr"></i>&nbsp;&nbsp;&nbsp;' + k["Receipt Amount"].toFixed(2) + ' </p>'
            TableHtml += '</div>';

            TableHtml += '<div class="bottomdetails" ';
           
            TableHtml += '>';
            TableHtml += '<p>Received By - ' + k["Received By"] + '</p>'

            if (k["Receipt ID"] != 9999999999 || k["Receipt ID"] != "9999999999") //In case of receiptId null (Pending Payment) we will not show the icon of pdf
            TableHtml += '<p style="float: right;" id="Amount"> &nbsp;&nbsp;<i onclick="javascript:GetDocument(' + k["Receipt ID"] + ', ' + '14' + ')" class="fa fa-file-pdf-o" aria-hidden="true"   title="View"  style="cursor:pointer; color: orangered; font-size: 18px;"></i></p>'

            TableHtml += '</div>';

            TableHtml += '</div>';
            TableHtml += '</div>';


        });

        //for (var i = 0; i < MyLedgerDataTable["Description"].length; i++) {

        //    if (MyLedgerDataTable["Description"][i]["DrAmt"] != 0)
        //        color = "#d41111";
        //    else
        //        color = "#28a021";

        //    if (MyLedgerDataTable["Description"][i]["DocNo"] == "" || MyLedgerDataTable["Description"][i]["DocNo"] == null)
        //        TrasNo = "";
        //    else
        //        TrasNo = 'Transaction ID ' + MyLedgerDataTable["Description"][i]["DocNo"] + '';



        //    if (MyLedgerDataTable["Description"][i]["PeriodFrm"] == "" || MyLedgerDataTable["Description"][i]["PeriodFrm"] == null)
        //        PeriodFrm = "";
        //    else
        //        PeriodFrm = MyLedgerDataTable["Description"][i]["PeriodFrm"];

        //    if (MyLedgerDataTable["Description"][i]["DocDate"] == "" || MyLedgerDataTable["Description"][i]["DocDate"] == null)
        //        PeriodTo = "";
        //    else
        //        PeriodTo = MyLedgerDataTable["Description"][i]["DocDate"];




        //    if (MyLedgerDataTable["Description"][i]["mSno"] == 1) {

        //        if (parseFloat(MyLedgerDataTable["Description"][i]["DrAmt"]) == 0) {
        //            DrAmt = '';
        //            CrAmt = 'Rs.&nbsp;' + (MyLedgerDataTable["Description"][i]["CrAmt"]).toFixed(2) + '';
        //        }
        //        else {
        //            CrAmt = '';
        //            DrAmt = 'Rs.&nbsp;' + (MyLedgerDataTable["Description"][i]["DrAmt"]).toFixed(2) + '';
        //        }

        //    }
        //    else {
        //        if (parseFloat(MyLedgerDataTable["Description"][i]["DrAmt"]) == 0) {
        //            DrAmt = '';
        //        }
        //        else
        //            DrAmt = 'Rs.&nbsp;' + (MyLedgerDataTable["Description"][i]["DrAmt"]).toFixed(2) + '';


        //        if (parseFloat(MyLedgerDataTable["Description"][i]["CrAmt"]) == 0) {
        //            CrAmt = '';
        //        }
        //        else
        //            CrAmt = 'Rs.&nbsp;' + (MyLedgerDataTable["Description"][i]["CrAmt"]).toFixed(2) + '';
        //    }


        //    //if (MyLedgerDataTable[i]["mSno"] == 1)
        //    //    if (MyLedgerDataTable[i]["DrCr"] == 0)
        //    //        DrCrIcon = '<i class="fa fa-plus-circle"></i>';
        //    //    else
        //    //        DrCrIcon = '<i class="fa fa-minus-circle"></i>';
        //    //else if (MyLedgerDataTable[i]["DrCr"] == 0)
        //    //    DrCrIcon = '<i class="fa fa-plus-circle"></i>';
        //    //else
        //    //    DrCrIcon = '<i class="fa fa-minus-circle"></i>';

        //    //if (MyLedgerDataTable[i]["mSno"] == 1)
        //    //    PeriodDate = '<i class="mdi-editor-insert-invitation"></i>&nbsp;' + PeriodFrm;
        //    //else
        //    //    PeriodDate = '<i class="mdi-editor-insert-invitation"></i>&nbsp;From&nbsp;' + PeriodFrm + ' To ' + PeriodTo + '';

        //    TableHtml += '<tr>' +
        //                          '<td class="FullDrCr">' + PeriodFrm + '</td>' +
        //                           '<td>' +
        //                               '<div style="padding: 8px 0px 8px 0px;">' +
        //                                  // '<div style="float: left; font-size: 22px; border: 0px solid; padding: 4px 0px 2px 0px; border-radius: 3px; color:' + color + ' ;">' + DrCrIcon + '</div>' +
        //                                   '<div style="float: left; margin-left: 0px;">' +
        //                                       '<p style="font-size: 15px; font-weight: 500;">' + MyLedgerDataTable["Description"][i]["Particular"] + '</p>' +
        //                                       //'<p style="color: #888282;">' + TrasNo + '</p>' +
        //                                       //'<p style="color: #888282;"><i class="mdi-editor-insert-invitation"></i>&nbsp;' + PeriodFrm + '</p>' +
        //                                       '<p style="font-size: 15px; font-weight: 500;" class="RspDrCr">' + PeriodFrm + '</p>' +
        //                                       '<p style="color: #888282;" class="RspDrCr">' + (DrAmt == 0 ? "" : "" + DrAmt + "&nbsp;Dr") + '</p>' +
        //                                       '<p style="color: #888282;" class="RspDrCr">' + (CrAmt == 0 ? "" : "" + CrAmt + "&nbsp;Cr") + '</p>' +
        //                                   '</div>' +
        //                                   '<div style="clear: both;"></div>' +
        //                               '</div>' +
        //                           '</td>' +
        //                           '<td class="FullDrCr">' + DrAmt + '</td>' +
        //                           '<td class="FullDrCr">' + CrAmt + '</td>' +
        //                  '</tr>';

        //}

    }
    else
        TableHtml = null;


    $('#vertical-timeline').empty();

    $('#vertical-timeline').append(TableHtml);



    //$('#PaymentHistoryDataTable').dataTable({
    //    "ordering": false,
    //    "bPaginate": false,
    //    "info": false,
    //    "oLanguage": {
    //        "sEmptyTable": "No Record Found.",
    //        "sStripClasses": "",
    //        "sSearch": "",
    //        "sSearchPlaceholder": "Enter Keywords Here"
    //    },
    //    bAutoWidth: false
    //});
    }

   // $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}

function OnFailGetMyPaymentHistory(result) {
 //  $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}

function AddMoneyToWallet() {
    if ($("#txtWalletAmount").val().trim() != "") {
        localStorage.setItem("PaymentAmount", $("#txtWalletAmount").val().trim());
        window.location = "Payment.aspx";
    }
    else
        ErrorMsg("E", "Please enter amount for wallet.", "txtWalletAmount");
}


function PaymentReceptShow(ctrl) {
    try {

        $("#PaymentHistoryContainer").css("display", "none");
        //var OPID = $(ctrl).closest("td").data("opid");
        var PGID = $(ctrl).closest("td").data("pgid");

      //  $('.preloader-wrapper').fadeIn("slow");
        $('#Loadingbg').css('display', 'block');
        //CurrPGTransID = PGID;

        PushData('PGID', PGID);
        PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);

        //CallWebMethod('../PaymentHistory.aspx/GetPaymentRecpt', WebMethodData, OnPassGetPaymentRecpt, OnFailGetPaymentRecpt);

        CallPublicAPI('../MyPaymentHistory.aspx/GetPaymentRecpt', '', OnPassGetPaymentRecpt, OnFailGetPaymentRecpt);

    } catch (e) {

    }
}

function OnPassGetPaymentRecpt(result) {
    var result = result.d.split("|");

    var Data = JSON.parse(result[0]);
    if (Data["Description"][0] == "") {

        $("#PaymentHistoryContainer").css("display", "block");
        //$('.preloader-wrapper').css("display", "none");
        $('#Loadingbg').css('display', 'none');
        MsgBox("E", "Receipt not found.");
    }
    else {

        $("#SPayAmount").html('Your payment of Rs. ' + Data["Description"][0]["Receipt Amount"].toFixed(2) + ' received successfully.');
        //if receipt from paymentgetway
        //$("#RecpID").html(Data["Description"][0]["PayUTransID"]);
        // else receipt id
        $("#RecpID").html(Data["Description"][0]["Receipt ID"]);
        $("#RecpDate").html(Data["Description"][0]["Receipt Date"]);
        $("#SubsID").html("<b>Subscriber ID</b>&nbsp;" + Data["Description"][0]["MemShipNo"]);
        $("#SubsName").html(Data["Description"][0]["Company Name"]);
        $("#SubsEmail").html(Data["Description"][0]["Company EmailID"]);
        $("#SubsMob").html(Data["Description"][0]["Company Contact No"]);

        var add1 = "";
        //if (Data["Description"][0]["Colony Name"] != "" && Data["Description"][0]["Colony Name"] != null)
        //    add1 = Data["Description"][0]["Colony Name"];
        if (Data["Description"][0]["Address"] != "" && Data["Description"][0]["Address"] != null)
            add1 += Data["Description"][0]["Address"];

        $("#Add1").html(add1);

        var add2 = "";
        if (Data["Description"][0]["Company Address"] != "" && Data["Description"][0]["Company Address"] != null)
            add2 = Data["Description"][0]["Company Address"];

        $("#Add2").html(add2);


        var LastAdd = "";
        if (Data["Description"][0]["CityName"] != "" && Data["Description"][0]["CityName"] != null)
            LastAdd = Data["Description"][0]["CityName"];
        if (Data["Description"][0]["PinCode"] != "" && Data["Description"][0]["PinCode"] != null)
            LastAdd += "-" + Data["Description"][0]["PinCode"];
        if (Data["Description"][0]["StateName"] != "" && Data["Description"][0]["StateName"] != null)
            LastAdd += ", " + Data["Description"][0]["StateName"];

        $("#LastAdd").html(LastAdd);

        $("#PConvenienceFee").html('Rs.&nbsp;' + Data["Description"][0]["ConvenienceFees"].toFixed(2));

        if (Data["Description"][0]["IsPayInclusive"] == false) {
            $("#TotalAmt").html('Rs.&nbsp;' + Data["Description"][0]["TotalAmount"].toFixed(2) + '');
            $("#AmtPaid").html('Rs.&nbsp;' + Data["Description"][0]["TotalAmount"].toFixed(2) + '');

            $("#TrConvenienceFee").css("display", "");
            $("#TrTotalAmt").css("display", "");
        }
        else {
            $("#TrConvenienceFee").css("display", "none");
            $("#TrTotalAmt").css("display", "none");

            $("#TotalAmt").html('Rs.&nbsp;' + Data["Description"][0]["TotalAmount"].toFixed(2) + '');

        }
        // $("#AmtPaid").html('Rs.&nbsp;' + Data["Description"][0]["Receipt Amount"].toFixed(2) + '');
        if (Data["Description"][0]["Discount"] > 0) {
            $("#Amt").html('Rs.&nbsp;' + Data["Description"][0]["PayAmountWithDiscount"].toFixed(2) + '');
            $("#PaymnetDiscount").html('Rs.&nbsp;' + Data["Description"][0]["Discount"].toFixed(2) + '');
            $("#DisTotalAmt").html('Rs.&nbsp;' + Data["Description"][0]["Receipt Amount"].toFixed(2) + '');

            $("#TrTotalAmt").css("display", "none");
            $("#TrOnlinePayDiscount").css("display", "");

            if (Data["Description"][0]["IsPayInclusive"] == false)
                $("#TrDisTotalAmt").css("display", "");
            else
                $("#TrDisTotalAmt").css("display", "none");
        }
        else {
            $("#Amt").html('Rs.&nbsp;' + Data["Description"][0]["Receipt Amount"].toFixed(2) + '');
            $("#TrDisTotalAmt").css("display", "none");
            $("#TrOnlinePayDiscount").css("display", "none");
        }

        if (Data["Description"][0]["Payment Mode"] != "Payment Gateway") {
            $("#TrConvenienceFee").css("display", "none");
        }
        else
            $("#TrConvenienceFee").css("display", "block");

        var BalAmt = "";
        BalAmt = Data["Description"][0]["Balance"];



        if (parseFloat(BalAmt) < 0)
            BalAmt = (BalAmt.toString()).replace("-", "") + "&nbsp;Cr.";

        $("#BalanceAmt").html('Rs.&nbsp;' + BalAmt);


        $("#DownloadReceipt").css("display", "block");
        //$('.preloader-wrapper').css("display", "none");
        $('#Loadingbg').css('display', 'none');
        $('#RecptMainDiv').css("display", "block");
    }
}

function OnFailGetPaymentRecpt(result) {
    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}


function GoBackToPaymentHistory() {
    //$("#DownloadReceipt").html("");
    $("#DownloadReceipt").css("display", "none");
    $("#PaymentHistoryContainer").css("display", "block");
}

//function DownloadPayRecpt() {
//    try {
//        $('.preloader-wrapper').fadeIn("slow");

//        var Style = '<style type="text/css"> @font-face { font-family: Play-Bold; src: url(!fonts/Play-Bold.ttf!) format(!truetype!); }  #SuccessReceipt { font-size: 14px;  font-family: !Segoe UI!; color: #484848; margin-bottom: 20%; width: 90%; margin: auto; border: 1px solid #bfbcbc; border-radius: 1px; padding: 10px;  } #SuccessReceipt p { margin: 0px; padding: 0px; line-height: 25px; }#SuccessReceipt { padding: 15px; } #SuccessReceipt .mainDiv { padding: 2px !important; }</style>';
//        var HTML = encodeURIComponent(Style + $("#RecptMainDiv").html().trim());
//        PushData('RecpHtml', HTML);
//        PushData('IsCallByMobileApp', IsCallByMobileApp);
//        PushData('IsCallByIOSMobileApp', localStorage.getItem("IsCallByIOSMobileApp"));
//        CallWebMethod('../MyPaymentHistory.aspx/DownloadPaymentRecpt', WebMethodData, OnPassDownloadPayRecpt, OnFailDownloadPayRecpt);

//    } catch (e) {

//    }
//}

//function OnPassDownloadPayRecpt(result) {
//    var res = result.d;

//    if (res.indexOf("|") > 0) {
//        if (res.split("|")[0] == "S") {
//            var StrHtml = res.split("|")[1];
//            if (localStorage.getItem("IsCallByIOSMobileApp") == "true")
//                webkit.messageHandlers.ReceiptHandler.postMessage(StrHtml);
//            else
//                app.DownloadPayRecpt(StrHtml);
//        }
//    }
//    else if (res == "S") {
//        window.open("../DownloadPDF.ashx", '_blank');
//    }
//    $('.preloader-wrapper').css("display", "none");
//}

//function OnFailDownloadPayRecpt(result) {
//    $('.preloader-wrapper').css("display", "none");
//}




function DownloadPayRecpt() {
    try {

        fnDownloadInvoice($("#RecptMainDiv").html().trim())
      
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
   // $('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}

function OnFailDownloadInvoice(result) {
   // $('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}

$(window).load(function () {

    $('.mdi-action-search').text("");
    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Payment History") {
            $(this).addClass("active");
        }
    });

    $('.preloader-wrapper').css("display", "none");
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = date;

    var now = new Date();
    var hh = now.getHours();
    var min = now.getMinutes();

    var ampm = (hh >= 12) ? 'pm' : 'am';
    var FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
    //var FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + firstDay.toString().split(" ")[4];
    var ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + lastDay.getHours() + ":" + lastDay.getMinutes() + " " + ampm;


    GetMyPaymentHistory(FromDate, ToDate);

});
function GetBase64Img(Logo) {

    PushData('Logo', Logo);
    CallWebMethod('../MyPaymentHistory.aspx/GetBase64Img', WebMethodData, OnPassGetBase64Img, OnFailGetBase64Img);

}
function OnPassGetBase64Img(result) {
    var res = result.d;
    $("#PaymentCmpLogo").attr("src", "data:image/png;base64," + res);
}
function OnFailGetBase64Img(result) {
   // $('.preloader-wrapper').css("display", "none");
    $('#Loadingbg').css('display', 'none');
}
$(document).ready(function () {


    //called when key is pressed in textbox
    $("#txtWalletAmount").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    if (SetDefaultVal(localStorage.getItem("CompanyLogo") != '')) {
        GetBase64Img(localStorage.getItem("CompanyLogo"));
        // ImgPath = "../GetImage.ashx?imgid=" + localStorage.getItem("CompanyLogo");


    }
    else {
        ImgPath = "../Channel/images.png";


    }
    // encodeImagetoBase64(ImgPath)
    //$("#PaymentCmpLogo").attr("src", ImgPath);


    $('#drpMonthWise').on('change', function () {
        var MonthWise = $(this).find('option:selected').text();

        var FromDate = ToDate = "";
        var date = new Date();


        var now = new Date();
        var hh = now.getHours();
        var min = now.getMinutes();

        var ampm = (hh >= 12) ? 'pm' : 'am';
        if (MonthWise == "Current Month") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = date;

            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
        }

        if (MonthWise == "Last One Month") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setMonth(firstDay.getMonth() - 1, 1);
           // var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
            var lastDay = date;
            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
        }

        if (MonthWise == "Last Three Months") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setMonth(firstDay.getMonth() - 2, 1);
            var lastDay = date;

            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
        }

        if (MonthWise == "Last Six Months") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setMonth(firstDay.getMonth() - 5, 1);
            var lastDay = date;

            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + date.getHours() + ":" + date.getMinutes() + " " + ampm;
        }

        GetMyPaymentHistory(FromDate, ToDate);
    });
});



function GetDocument(DocID, DocType) {
            try {
             
                //$('.preloader-wrapper').fadeIn("slow");
                $('#Loadingbg').css('display', 'block');
                PushData('RcptID', DocID);
                PushData('RequestType', "HTML");
                PushData('OPID', OperatorId);
                CallPublicAPI('../MyPaymentHistory.aspx/GetRecpHTML', '', OnPassGetHTML, OnFailGetHTML);
            }
            catch (e) {
                //$('.preloader-wrapper').delay(100).fadeOut();
                $('#Loadingbg').css('display', 'none');
            }
}

function OnPassGetHTML(result, callby) {
    var MyDocument = "";
    if (callby == "AddMoney")
        MyDocument = JSON.parse(result);
    else
       MyDocument = result.d == "E" ? null : JSON.parse(result.d);

    if (MyDocument["Status"] == "Success" || MyDocument["Status"] == "S") {
        window.scrollTo(0, 0);
        DocHTML = MyDocument.Description[0]["HTML"];
        $("#RecptMainDiv").html(DocHTML);
        $("#DownloadReceipt").show();
        $("#PaymentHistoryContainer").hide();
        //$('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');

    } else {
       // $('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');
    }
}

function OnFailGetHTML(result) {
   // $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}



function ExcelExportGrid() {
    var MemberShipNo = localStorage.getItem("CurrMemShipNo");
    window.open("../Handler/ExcelDownload.ashx?Exportfilename=MyPaymentHistory&MemberShipNo=" + MemberShipNo, '_blank');
}

function PdfExportGrid() {
    var MemberShipNo = localStorage.getItem("CurrMemShipNo");
    window.open("../Handler/PdfDownload.ashx?Exportfilename=MyPaymentHistory&MemberShipNo=" + MemberShipNo, '_blank');
}
