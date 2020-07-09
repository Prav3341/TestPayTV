var DocHTML = "";

function GetLedger(FromDate, ToDate) {
    try {
        //$('.preloader-wrapper').fadeIn("slow");
        $('#Loadingbg').css('display', 'block');
        //SubsId = 10126100000514;
        //OpretorId = "PayTv";
        //FromDate = "01-Jan-2012 16:26 pm";
        PushData('FromDate', FromDate);
        PushData('ToDate', ToDate);
        PushData('CustomerID', localStorage.CustId);
        PushData('OPID', OperatorId);
        //CallWebMethod('../MyLedger.aspx/GetLedgerHistory', WebMethodData, OnPassGetLedger, OnFailGetLedger);
        CallPublicAPI('../MyLedger.aspx/GetLedgerHistory', '', OnPassGetLedger, OnFailGetLedger);
    }
    catch (e) {
        //$('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');
    }

}

function OnPassGetLedger(result) {


    var MyLedgerDataTable = result.d == "E" ? null : JSON.parse(result.d);

    var TableHtml = "";
    var Visiblity = "";
    //if ($.fn.DataTable.isDataTable('#LedgerDataTable')) {
    //    $('#LedgerDataTable').DataTable().destroy();
    //}

    if (MyLedgerDataTable["Status"] == "Success" || MyLedgerDataTable["Status"] == "S") {

        var color = NewColor = "";
        var TrasNo = PeriodFrm = PeriodTo = DrCrIcon = IsDrCr = PeriodDate = "";
        var DrAmt = 0, CrAmt = 0;

        var DocIcon = "", EntryColor = "";

        var DrCr = "";
        var SubsBal = "";
        if (localStorage.getItem("BalanceAmount") < 0) {
            DrCr = "Cr";
            NewColor = "#28a021";
            SubsBal = -1 * (+localStorage.BalanceAmount);
        }
        else {
            DrCr = "Dr";
            NewColor = "#d41111";
            SubsBal =  (+localStorage.BalanceAmount);
        }
        if (SubsBal == "")
            $("#LBalAmt").html('&nbsp;My Account Balance&nbsp;:&nbsp;' + "0");
        else
            $("#LBalAmt").html('&nbsp;My Account Balance&nbsp;:&nbsp;' + SubsBal);

      
        $("#LBalAmt").css("color", NewColor);



        $(MyLedgerDataTable.Description).each(function (e, k) {
            var ConnectionName = "";
            if (k.EntryType == "Credit") {
                DocIcon = "fa-credit-card-alt";
                EntryColor = "Green";
            }
            else {
                DocIcon = "fa-tags";
                EntryColor = "Red";
            }
            if (k.Action == "Product Added" || k.Action == "Product Removed") {
                ConnectionName = ' for TV' + k.ConnID + ' ';
            }
            else {
                ConnectionName = "";
            }
            if (k.DoNotShowVC == "1") {
                Visiblity = "visibility:hidden"
            }
            else { Visiblity = "visibility:visible" }
            TableHtml +=
                '<div class="vertical-timeline-block ">'
                + '<div class="ledgerdate">'
                + '' + k.DocMonth + '</br>'
                + '' + k.DocDay + '</br>'
                + '' + k.DocYear + '</br>'
                + '' + k.DocTime + '</br>'
                + '' + k.DocPeriod + '</br>'
                + '</div>'

                + '<div class="vertical-timeline-icon lazur-bg">'
                + '<i class="fa ' + DocIcon + '"></i>'
                + '</div>'

                + '<div class="vertical-timeline-content Content1Before">'
                + '<input type="hidden" id="DocID" value="' + k.DocID + '">'
                + '<div class="upperdetails">'
            if (k.TransNo != 0) {
                TableHtml += '<p id="DocNo">' + k.DocCaption + ' : ' + k.DocShowID + '</p>'
            }
            TableHtml += '<p style="float: right; color: ' + EntryColor + '" class="FullDrCr">' + k.EntryType + '</p>'
            TableHtml += '</div>'

            TableHtml += '<div class="middledetails">'
            TableHtml += '<h5 id="ProfileDue">' + k.Action + ' ' + ConnectionName + '</span> </h5>'
          var  PdfIcon = "";
          if (k.TransNo == 0 || k.DocType == "101")
              PdfIcon = " ";
          else
              PdfIcon = ' <i onclick="javascript:GetDocument(' + k.DocID + ', ' + k.DocType + ')" class="fa fa-file-pdf-o"  aria-hidden="true" title="View" style="cursor:pointer; color:red;"></i> '

          TableHtml += '<p style="float: right; font-weight: 600; "><i class="fa fa-inr"></i>&nbsp;&nbsp;&nbsp;' + k.Amount + PdfIcon +' </p>' //<span class="RspDrCr">Dr</span>
            TableHtml += '</div>';

            TableHtml += '<div class="bottomdetails" ';
            if (k.TransNo == 0) {
                TableHtml += 'style = "visibility:hidden;"';
            }
            TableHtml += '>';

            TableHtml += '<p style="' + Visiblity + '">VC No. - ' + k.Smartcard + '</p>'
            TableHtml += '<p style="float: right;" id="Amount">Closing Balance &nbsp;<i class="fa fa-inr"></i>&nbsp;&nbsp;<span>&nbsp;' + k.ClosingBal + ' </span></p>'
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


    //$('#LedgerDataTable').dataTable({
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

   // $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}

function OnFailGetLedger(result) {
   // $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}


function OnFailGetHTML(result) {
    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}


function GetDocument(DocID, DocType) {
    switch (DocType) {
        case 14:
            try {
                WebMethodData = [];
                //$('.preloader-wrapper').fadeIn("slow");
                $('#Loadingbg').css('display', 'block');
                PushData('RcptID', DocID);
                PushData('RequestType', "HTML");
                PushData('OPID', OperatorId);
                CallPublicAPI('../MyLedger.aspx/GetRecpHTML', '', OnPassGetHTML, OnFailGetHTML);
            }
            catch (e) {
              //  $('.preloader-wrapper').delay(100).fadeOut();
                $('#Loadingbg').css('display', 'none');
            }
            break;
        case 30:
            try {
                WebMethodData = [];
                //$('.preloader-wrapper').fadeIn("slow");
                $('#Loadingbg').css('display', 'block');
                PushData('DocID', DocID);
                PushData('CallBy', "Dr");
                PushData('RequestType', "HTML");
                PushData('OPID', OperatorId);
                CallPublicAPI('../MyLedger.aspx/GetDrCrHTML', '', OnPassGetHTML, OnFailGetHTML);
            }
            catch (e) {
               // $('.preloader-wrapper').delay(100).fadeOut();
                $('#Loadingbg').css('display', 'none');
            }
            break;

        case 37:
            try {
                WebMethodData = [];
                //$('.preloader-wrapper').fadeIn("slow");
                $('#Loadingbg').css('display', 'block');
                PushData('DocID', DocID);
                PushData('CallBy', "Cr");
                PushData('RequestType', "HTML");
                PushData('OPID', OperatorId);
                CallPublicAPI('../MyLedger.aspx/GetDrCrHTML', '', OnPassGetHTML, OnFailGetHTML);
            }
            catch (e) {
                //$('.preloader-wrapper').delay(100).fadeOut();
                $('#Loadingbg').css('display', 'none');
            }
            break;
        case 135:
            try {
                WebMethodData = [];
                //$('.preloader-wrapper').fadeIn("slow");
                $('#Loadingbg').css('display', 'block');
                PushData('InvoiceID', DocID);
                PushData('RequestType', "HTML");
                PushData('OPID', OperatorId);
                CallPublicAPI('../MyLedger.aspx/GetInvoiceHTML', '', OnPassGetHTML, OnFailGetHTML);
            }
            catch (e) {
                //$('.preloader-wrapper').delay(100).fadeOut();
                $('#Loadingbg').css('display', 'none');
            }
            break;
    }
}

function OnPassGetHTML(result) {
    var MyDocument = result.d == "E" ? null : JSON.parse(result.d);

    if (MyDocument["Status"] == "Success" || MyDocument["Status"] == "S") {
        window.scrollTo(0, 0);
        DocHTML = MyDocument.Description[0]["HTML"];
        $("#HTMLView").html(DocHTML);
        $("#DocView").show();
        $("#LedgerView").hide();
      //  $('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');

    } else {
      //  $('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');
    }
}

function DownloadDoc() {
    try {
        WebMethodData = [];

       // $('.preloader-wrapper').delay(100).fadeIn();
        $('#Loadingbg').css('display', 'block');
        var html = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /></head><body>';
        html = html + DocHTML;
        html = html + '</body></html>';

        var HTML = encodeURIComponent(html);
        PushData('HTML', HTML);
        CallWebMethod('../MyLedger.aspx/DownloadDoc', WebMethodData, OnPassDownloadDoc, OnFailDownloadDoc);
    }
    catch (e) {
      //  $('.preloader-wrapper').delay(100).fadeOut();
        $('#Loadingbg').css('display', 'none');
    }
}

function OnPassDownloadDoc(result) {
    var res = result.d;
    if (res == "S") {
        window.open("../DownloadPDF.ashx", '_blank');
    }
    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}

function OnFailDownloadDoc(result) {
    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}

function BackToLedger() {
    $("#HTMLView").empty();
    $("#DocView").hide();
    $("#LedgerView").show();
}

$(window).load(function () {

    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Transaction") {
            $(this).addClass("active");
        }
    });

    $('#Loadingbg').css('display', 'none');
    // $('#drpMonthWise').select2();

    $('.mdi-action-search').text("");

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = date;

    var now = new Date();
    var hh = now.getHours();
    var min = now.getMinutes();

    var ampm = (hh >= 12) ? 'pm' : 'am';
    var FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + "00" + ":" + "00"+ " " + "AM";
    //var FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + firstDay.toString().split(" ")[4];
    var ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + "11" + ":" + "59" + " " + "PM";

    GetLedger(FromDate, ToDate);

});


$(document).ready(function () {
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

            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + "00" + ":" + "00" + " " + "AM";
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + "11" + ":" + "59" + ":00" + " PM";
        }

        if (MonthWise == "Last One Month") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setMonth(firstDay.getMonth() - 1, 1);
          //  var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
            var lastDay = date;
            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + "00" + ":" + "00" + " " + "AM";
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + "11" + ":" + "59" + ":00" + " PM";
        }

        if (MonthWise == "Last Three Months") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setMonth(firstDay.getMonth() - 2, 1);
            var lastDay = date;

            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3] + " " + "00" + ":" + "00" + " " + "AM";
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + "11" + ":" + "59" + ":00" + " PM";
        }

        if (MonthWise == "Last Six Months") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setMonth(firstDay.getMonth() - 5, 1);
            var lastDay = date;

            FromDate = firstDay.toString().split(" ")[2] + "-" + firstDay.toString().split(" ")[1] + "-" + firstDay.toString().split(" ")[3]  + " " + "00" + ":" + "00" + " " + "AM";
            ToDate = lastDay.toString().split(" ")[2] + "-" + lastDay.toString().split(" ")[1] + "-" + lastDay.toString().split(" ")[3] + " " + "11" + ":" + "59" + ":00" + " PM";
        }

        GetLedger(FromDate, ToDate);
    });
});




function ExcelExportGrid() {
    var MemberShipNo = localStorage.getItem("CurrMemShipNo");
    window.open("../Handler/ExcelDownload.ashx?Exportfilename=MyTransaction&MemberShipNo=" + MemberShipNo, '_blank');
}

function PdfExportGrid() {
    var MemberShipNo = localStorage.getItem("CurrMemShipNo");
    window.open("../Handler/PdfDownload.ashx?Exportfilename=MyTransaction&MemberShipNo=" + MemberShipNo, '_blank');
}
