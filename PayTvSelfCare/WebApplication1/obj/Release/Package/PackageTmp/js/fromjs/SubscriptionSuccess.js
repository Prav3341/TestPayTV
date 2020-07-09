var AddMoneySuccess = null;
var SubscriptionSucess = null;
var InvoicNo = 0;
var CreditNoteId = "";
var InvoiceId = "";
var ReciptId = "";
var DebitNoteId = ""
function GetSubscriptionSucess() {
    CallPublicAPI('SubscriptionSuccess.aspx/GetSubscriptionSucess', '', OnPass, OnFail);
    $('#Loadingbg').css('display', 'block');

}
function OnPass(result) {
    $('#Loadingbg').css('display', 'none');
    var data = result.d.split("*");
    LogInDataTable = JSON.parse(localStorage.getItem("LDT"))["Description"];
    SubscriptionSucess=data[0];
 
    if ( SubscriptionSucess != "")
    {
        //Case when AddMoney and Subscription Both Success
       
       
        SubscriptionSucess = JSON.parse(SubscriptionSucess);
        if (SubscriptionSucess[0]["RecpNo"] != null && SubscriptionSucess[0]["RecpNo"]!="")
        {
          
            $(".Addmoney").show();
            $("#ReceiptDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
            $("#ReceiptAmount").html(parseFloat(SubscriptionSucess[0]["RecpAmt"]).toFixed(2));
            $("#RecpNo").html(SubscriptionSucess[0]["RecpNo"]);
            $("#ViewAddmoney").data('RecipNo', SubscriptionSucess[0]["RecpNo"]);
            $("#ViewAddmoney").attr('data-recipno', SubscriptionSucess[0]["RecpID"]);
            
        }
        if (SubscriptionSucess[0]["CrNoteNo"] != null && SubscriptionSucess[0]["CrNoteNo"] != "")
        {
                $(".Reversal").show();
                $("#CreditNo").html(SubscriptionSucess[0]["CrNoteNo"]);
                $("#CreditAmount").html(SubscriptionSucess[0]["CrAmt"].toFixed(2));
                $("#CreditDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
                $("#ViewReversal").attr('data-creditnote', SubscriptionSucess[0]["CrNoteID"]);
        }
        if (SubscriptionSucess[0]["InvoiceNo"] != null && SubscriptionSucess[0]["InvoiceNo"] != "" && LogInDataTable[0]["IsInvoice"].toUpperCase() == "TRUE")
        {
            $(".Subscription").show();
            $(".DebitNote").hide();
            $("#InvoiceNo").html(SubscriptionSucess[0]["InvoiceNo"]);
            $("#InvoiceAmt").html(SubscriptionSucess[0]["InvoiceAmt"].toFixed(2));
            $("#InvoiceDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
            $("#ViewInvoice").attr('data-invoiceno', SubscriptionSucess[0]["InvoiceID"]);
        }
        if (SubscriptionSucess[0]["DrNoteNo"] != null && SubscriptionSucess[0]["DrNoteNo"] != "" && LogInDataTable[0]["IsInvoice"].toUpperCase() == "FALSE") {
            $(".DebitNote").show();
            $(".Subscription").hide();
            $("#DebitNoteNo").html(SubscriptionSucess[0]["DrNoteNo"]);
            $("#DebitNoteAmount").html(SubscriptionSucess[0]["DrAmt"].toFixed(2));
            $("#DebitNoteDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
            $("#ViewDebitNote").attr('data-debitnoteid', SubscriptionSucess[0]["DrNoteID"]);
        }
        var Cr = "";
        if (parseFloat(SubscriptionSucess[0]["BalanceAmount"]) <= 0)
            Cr = " ";
        else
            Cr = "  - ";
            $("#WalletBalanceAmount").html("<i class='fa fa-inr' aria-hidden='true'></i>&nbsp;"+Cr + SubscriptionSucess[0]["BalanceAmount"].toString().replace("-", "") + "&nbsp;&nbsp;");
            localStorage.setItem("MyWalletBalance", SubscriptionSucess[0]["BalanceAmount"].toString());
            localStorage.setItem("BalanceAmount", SubscriptionSucess[0]["BalanceAmount"].toString());
            LogInDataTable[0]["BalanceAmount"] = parseFloat(SubscriptionSucess[0]["BalanceAmount"]);
            $("#hour").html(SubscriptionSucess[0]["SubscriptionHour"]);
            BindOrderSummary(data[1]);

    }
  
    else
    {
        /// When Call From My Connection in Case of Sufficient Balance
        if (localStorage.getItem("SubscriptionSuccess") == "" || localStorage.getItem("SubscriptionSuccess") == null)
            document.location.replace('../MyConnection');
        else
        {
            if (localStorage.getItem("SubscriptionSuccess") != null && localStorage.getItem("SubscriptionSuccess") != "")
             {
                var SubscriptionSucess = JSON.parse(localStorage.getItem("SubscriptionSuccess"));
                var Cr = "";
                if (parseFloat(SubscriptionSucess["Description"][0]["BalanceAmount"]) <= 0)
                    Cr = " ";
                else
                    Cr = "  - ";
                $("#WalletBalanceAmount").html("<i class='fa fa-inr' aria-hidden='true'></i>&nbsp;" +Cr+ SubscriptionSucess["Description"][0]["BalanceAmount"].toString().replace("-", "") + "&nbsp;&nbsp;");
                localStorage.setItem("MyWalletBalance", SubscriptionSucess["Description"][0]["BalanceAmount"].toString());
                LogInDataTable[0]["BalanceAmount"] = parseFloat(SubscriptionSucess["Description"][0]["BalanceAmount"]);
                localStorage.setItem("BalanceAmount", SubscriptionSucess["Description"][0]["BalanceAmount"]);
                $("#hour").html(SubscriptionSucess["Description"][0]["SubscriptionHour"]);
                if (SubscriptionSucess["Description"][0]["CrNoteNo"] != null && SubscriptionSucess["Description"][0]["CrNoteNo"] != "") {
                    $(".Reversal").show();
                    $("#CreditNo").html(SubscriptionSucess["Description"][0]["CrNoteNo"]);
                    $("#CreditAmount").html(SubscriptionSucess["Description"][0]["CrAmt"].toFixed(2));
                    $("#CreditDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
                    $("#ViewReversal").attr('data-creditNote', SubscriptionSucess["Description"][0]["CrNoteID"]);
                }
                if (SubscriptionSucess["Description"][0]["InvoiceNo"] != null && SubscriptionSucess["Description"][0]["InvoiceNo"] != "" && LogInDataTable[0]["IsInvoice"].toUpperCase() == "TRUE") {
                    $(".Subscription").show();
                    $("#InvoiceNo").html(SubscriptionSucess["Description"][0]["InvoiceNo"]);
                    $("#InvoiceAmt").html(SubscriptionSucess["Description"][0]["InvoiceAmt"].toFixed(2));
                    $("#InvoiceDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
                    $("#ViewInvoice").attr('data-invoiceno', SubscriptionSucess["Description"][0]["InvoiceID"]);
                    //$("#ViewReversal").attr('data-CreditNote', SubscriptionSucess["Description"][0]["CrNoteNo"]);

                }
                if (SubscriptionSucess["Description"][0]["DrNoteNo"] != null && SubscriptionSucess["Description"][0]["DrNoteNo"] != "" && LogInDataTable[0]["IsInvoice"].toUpperCase() == "FALSE") {
                    $(".DebitNote").show();
                    $("#DebitNoteNo").html(SubscriptionSucess["Description"][0]["DrNoteNo"]);
                    $("#DebitNoteAmount").html(SubscriptionSucess["Description"][0]["DrAmt"].toFixed(2));
                    $("#DebitNoteDate").html(Reliable.ReliableGetDate('S').split('|')[0]);
                    $("#ViewDebitNote").attr('data-debitnoteid', SubscriptionSucess["Description"][0]["DrNoteID"]);
                }
                BindOrderSummary(data[1]);
             }
                 localStorage.removeItem("SubscriptionSuccess");
        }
        
    }
   
}
function OnFail(result) {
    $('#Loadingbg').css('display', 'none');
}

function BindOrderSummary(Data) {
    try
    {
        var OrderData = JSON.parse(Data);
        var Payment = OrderData["Table2"];
        var Product = OrderData["Table1"];
        $("#ProductSubTotal").html(Payment[0]["SubTotalAmt"]);
        $("#TaxPre").html(Payment[0]["TaxProductAmt"]);
        $(".ProductCount").html(Payment[0]["ProductCount"]);
        if (Payment[0]["ReverseProductCount"] != "" && Payment[0]["ReverseProductCount"]!=null) {
            $(".Reversal").show();
            $("#ReversalTotal").html(Payment[0]["ReversalTotal"]);
            $("#TaxReversal").html(Payment[0]["TaxReversal"]);
            $(".ReverseProductCount").html(Payment[0]["ReverseProductCount"]);
        }
        else
            $(".Reversal").hide();

        $("#NetworkFeePre").html(Payment[0]["NetworkFeePre"]);
        $("#NCFTaxPre").html(Payment[0]["NCFTaxPre"]);
        $(".NetworkFeeCount").html(Payment[0]["NetworkFeeCount"]);
        $("#GradTotal").html(Payment[0]["GradTotal"]);
        var Bouquet="",Brodcaster="",Alacarte="";
    
        for (var i = 0; i < Product.length ; i++) {
            if (Product[i]["ProductType"] == "1") {
                Bouquet += '<div class="ProductDetailMain ' + (Product[i]["IsReversal"] == true ? 'textred' : '') + '"><h5 ' + (Product[i]["IsReversal"] == true ? 'class="removePrepaidPack"' : '') + '>' + Product[i]["ProductName"] + '</h5>' +
                              '<h6>Rs.&nbsp;<span class="RecommendRate">'+ (Product[i]["IsReversal"] == true? '-' :'')+' '+ (parseFloat(Product[i]["Amount"]).toFixed(2)) + '</span></h6>'+
                                '<div>'+
                                    '<div style="float: left; padding-left: 10px; font-size: 15px;">'+
                                        '<p style="display: inline-block; font-size: 15px;" ' + (Product[i]["IsReversal"] == true ? 'class="textred"' : '') + '>' + (Product[i]["IsReversal"] == false ? 'Subscription for the period' : 'Reversal for the period') + ' (' + Product[i]["StartDate"] + ' to ' + Product[i]["EndDate"] + ')' + '</p>' +
                                    '</div>'+
                               '</div>' +
                           '</div>';
            }
            else if (Product[i]["ProductType"] == "2") {
                Brodcaster += '<div class="ProductDetailMain ' + (Product[i]["IsReversal"] == true ? 'textred' : '') + '"><h5>' + Product[i]["ProductName"] + '</h5>' +
                              '<h6>Rs.&nbsp;<span class="RecommendRate">' + (Product[i]["IsReversal"] == true ? '-' : '') + ' ' + (parseFloat(Product[i]["Amount"]).toFixed(2)) + '</span></h6>' +
                                '<div>' +
                                    '<div style="float: left; padding-left: 10px; font-size: 15px;">' +
                                        '<p style="display: inline-block; font-size: 15px;" ' + (Product[i]["IsReversal"] == true ? 'class="textred"' : '') + '>' + (Product[i]["IsReversal"] == false ? 'Subscription for the period' : 'Reversal for the period') + ' (' + Product[i]["StartDate"] + ' to ' + Product[i]["EndDate"] + ')' + '</p>' +
                                    '</div>' +
                               '</div>' +
                           '</div>';
            }
            else {
                Alacarte += '<div class="ProductDetailMain ' + (Product[i]["IsReversal"] == true ? 'textred' : '') + '"><h5>' + Product[i]["ProductName"] + '</h5>' +
                              '<h6>Rs.&nbsp;<span class="RecommendRate">' + (Product[i]["IsReversal"] == true ? '-' : '') + ' ' + (parseFloat(Product[i]["Amount"]).toFixed(2)) + '</span></h6>' +
                                '<div>' +
                                    '<div style="float: left; padding-left: 10px; font-size: 15px;">' +
                                        '<p style="display: inline-block; font-size: 15px;" ' + (Product[i]["IsReversal"] == true ? 'class="textred"' : '') + '>' + (Product[i]["IsReversal"] == false ? 'Subscription for the period' : 'Reversal for the period') + ' (' + Product[i]["StartDate"] + ' to ' + Product[i]["EndDate"] + ')' + '</p>' +
                                    '</div>' +
                               '</div>' +
                           '</div>';

            }
        }
        if (Bouquet != "") {
            $("#RecPackMainPrePaid").show();
            $("#FinalRecommendedPackPre").html(Bouquet);
        }
        else
            $("#RecPackMainPrePaid").hide();

        if (Brodcaster != "") {
            $("#BroadMainPrePaid").show();
            $("#FinalBrodcastPackPre").html(Brodcaster);
        }
        else
            $("#BroadMainPrePaid").hide();

        if (Alacarte != "") {
            $("#AlamainPrePaid").show();
            $("#FinalAlaCartePackPre").html(Alacarte);
        }
        else
            $("#AlamainPrePaid").hide();
    }
    catch (err) {
        MsgBox("E", "Something went wrong, please try again later!");
      
    }
}
function ViewDeatls(ctrl)
{
    try {
        CreditNoteId = ctrl.dataset.creditnote;
        InvoiceId = ctrl.dataset.invoiceno;
        ReciptId = ctrl.dataset.recipno;
        DebitNoteId = ctrl.dataset.debitnoteid;

        if (CreditNoteId != "" && CreditNoteId != undefined)
        {
            WebMethodData = [];
            $('#Loadingbg').css('display', 'block');
            PushData('DocID', CreditNoteId);
            PushData('CallBy', "Cr");
            PushData('RequestType', "HTML");
            PushData('OPID', OperatorId);
            CallPublicAPI('../MyLedger.aspx/GetDrCrHTML', '', OnPassGetHTML, OnFailGetHTML);
        }
        if (InvoiceId != "" && InvoiceId != undefined)
        {
            WebMethodData = [];
            $('#Loadingbg').css('display', 'block');
            PushData('InvoiceID', InvoiceId);
            PushData('RequestType', "HTML");
            PushData('OPID', OperatorId);
            CallPublicAPI('../MyLedger.aspx/GetInvoiceHTML', '', OnPassGetHTML, OnFailGetHTML);
        }
        if (ReciptId != "" && ReciptId != undefined ) {
            WebMethodData = [];
            $('#Loadingbg').css('display', 'block');
            PushData('RcptID', ReciptId);
            PushData('RequestType', "HTML");
            PushData('OPID', OperatorId);
            CallPublicAPI('../MyLedger.aspx/GetRecpHTML', '', OnPassGetHTML, OnFailGetHTML);

        }
        if (DebitNoteId != "" && DebitNoteId != undefined) {
            WebMethodData = [];
            $('#Loadingbg').css('display', 'block');
            PushData('DocID', DebitNoteId);
            PushData('CallBy', "Dr");
            PushData('RequestType', "HTML");
            PushData('OPID', OperatorId);
            CallPublicAPI('../MyLedger.aspx/GetDrCrHTML', '', OnPassGetHTML, OnFailGetHTML);

        }
    }
    catch (err)
    {
        $('#Loadingbg').css('display', 'none');
        MsgBox("E", "Something went wrong, please try again later!");
    }

}

function OnPassGetHTML(result) {
    try {
        var MyDocument = result.d == "E" ? null : JSON.parse(result.d);

        if (MyDocument["Status"] == "Success" || MyDocument["Status"] == "S") {
            $('#Loadingbg').css('display', 'none');
            window.scrollTo(0, 0);
            DocHTML = MyDocument.Description[0]["HTML"];
            $("#HTMLView").html(DocHTML);
            $('.HtmlView').show();
            $('#DocumentView').show();
            //  $('.preloader-wrapper').delay(100).fadeOut();
            $('#Loadingbg').css('display', 'none');
            $("body").css("overflow", 'hidden');

        } else {
            //  $('.preloader-wrapper').delay(100).fadeOut();
            $('#Loadingbg').css('display', 'none');
        }
    }
    catch (err)
    {
        $('#Loadingbg').css('display', 'none');
        MsgBox("E", "Something went wrong, please try again later!");                  
    }

}

function OnFailGetHTML(result){
    $('#Loadingbg').css('display', 'none');
    MsgBox("E", "Something went wrong, please try again later!");
}

$(document).ready(function () {
    $('#Liteloding-wrapper').css('display', 'none');
    GetSubscriptionSucess();

    $('#CloseBtn').click(function ()
    {
        $('.HtmlView').hide();
        $('#DocumentView').hide();
        $("body").css("overflow", 'scroll');
    });
});
$(window).load(function () {

});