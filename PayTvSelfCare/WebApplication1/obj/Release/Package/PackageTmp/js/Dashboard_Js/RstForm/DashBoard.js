var Details = true;
var ImgPath = '';
var TransNumber = localStorage.getItem("TransID");
$(document).ready(function () {

    try {
        //var CustomerId = localStorage.getItem("CustomerId");
        SubsId = localStorage.getItem("SubsUniqueID");
        OperatorId = localStorage.getItem("CableOperaterID");
        var CustId = localStorage.getItem("CustId");
        $('#Loadingbg').css('display', 'block');
        PushData('OPID', OperatorId);
        PushData('SubsUniqueID', SubsId);
        $("#imgLogo").attr("src", ImgPath);
        CallPublicAPI('Dashboard.aspx/GetDashboardDetail', '', OnPassDashboardDetail, OnFailDashboardDetail);
    }
    catch (e) {
        $('#Loadingbg').css('display', 'none');
        MsgBox('E', "Something went wrong, please try again later!");
    }


});

function OnPassDashboardDetail(result) {
    try {
        var res = result.d.split("|");
        if (res[0] != "E") {
            LogInDataTable = JSON.parse(res);
            if (LogInDataTable["Status"] == "Success") {
                LogInDataTable = JSON.parse(res).Description;
                CurrLogInDetails = JSON.parse(localStorage.getItem("CDT"))["Description"];
                localStorage.setItem("LDT", res);
                localStorage.setItem('EnablePayment', CurrLogInDetails[0]["EnablePayment"])
                //$("#imgLogo").attr("src", ImgPath);
                localStorage.setItem('CompanyID', CurrLogInDetails[0]["CustomerID"])
                
                localStorage.setItem('CompID', LogInDataTable[0]["CompID"]);
                localStorage.setItem('CustId', LogInDataTable[0]["CustomerID"]);
                localStorage.setItem("IsAccountVerfiy", LogInDataTable[0]["IsAccVerifyflag"]);

                localStorage.setItem("CurrUserName", LogInDataTable[0]["CustomerName"]);
                localStorage.setItem("CurrMemShipNo", LogInDataTable[0]["MemShipNo"]);
                localStorage.setItem("BalanceAmount", LogInDataTable[0]["BalanceAmount"]);
                localStorage.setItem("CompanyLogo", LogInDataTable[0]["ImgPath"]);
                localStorage.setItem('DueDate', LogInDataTable[0]["DueDate"]);

                localStorage.setItem('IsAddRequest', CurrLogInDetails[0]["IsAddRequest"]);
                localStorage.setItem('IsAddConn', CurrLogInDetails[0]["IsAddConn"]);
                localStorage.setItem('IsProUpdate', CurrLogInDetails[0]["IsProUpdate"]);
                localStorage.setItem('IsManagePackage', CurrLogInDetails[0]["IsManagePackage"]);
                localStorage.setItem('IsCRFComplete', CurrLogInDetails[0]["IsCRFComplete"]);
                localStorage.setItem('IsReversal', LogInDataTable[0]["IsReversal"]);
                $('#UserName').text(LogInDataTable[0]["CustomerName"]);
                $("#DashUserName").text(LogInDataTable[0]["CustomerName"]);

                $('#MembershipNo').text(LogInDataTable[0]["MemShipNo"]);
                $('#DashMemNo').text(LogInDataTable[0]["MemShipNo"]);

                $("#MyCableTVUID").text(localStorage.getItem("MCTUID"));



                $("#DashMobNo").html('<i class="mdi-action-perm-phone-msg cyan-text text-darken-2"></i>&nbsp;' + LogInDataTable[0]["MobileNo"]);
                $("#DashEmail").html('<i class="mdi-communication-email cyan-text text-darken-2"></i>&nbsp;' + LogInDataTable[0]["RegEmailID"]);


                $('#TotalConnection').text(LogInDataTable[0]["NoOfConn"]);
                $('#ConnDetails').html('<i class="fa fa-check-square-o" aria-hidden="true"></i>' + LogInDataTable[0]["NoOfActiveCon"] + ' Active/' + LogInDataTable[0]["NoOfDeActivecon"] + ' Inactive');


                localStorage.setItem("CompEmail", LogInDataTable[0]["CompEmail"] == "" ? "" : LogInDataTable[0]["CompEmail"]);
                localStorage.setItem("CompMobNo", LogInDataTable[0]["CompMobNo"] == "" ? "" : LogInDataTable[0]["CompMobNo"]);

              
                var MSOaddress = CurrLogInDetails[0]["MSOAddress"] + "&nbsp;" + CurrLogInDetails[0]["CityName"] + "&nbsp;" + CurrLogInDetails[0]["StateName"];

                //$("#CurrentCompName").text(LogInDataTable[0]["Company"]);
                $("#CurrentCompName").text(CurrLogInDetails[0]["ProviderName"]);
                $("#CompEmail").html(LogInDataTable[0]["CompEmail"] == "" ? "" : '<i class="mdi-communication-email"></i>&nbsp;' + LogInDataTable[0]["CompEmail"]);
                $("#CompMobNo").html(LogInDataTable[0]["CompMobNo"] == "" ? "" : '<i class="mdi-communication-stay-current-portrait"></i>&nbsp;' + LogInDataTable[0]["CompMobNo"]);
                $("#CompPhone").html(LogInDataTable[0]["CompPhoneNo"] == "" ? "" : '<i class="mdi-communication-phone"></i>&nbsp;' + LogInDataTable[0]["CompPhoneNo"]);
                $("#CompAdd").html(LogInDataTable[0]["CompAddress"] == "" ? "" : '<i class="fa fa-building-o"></i>&nbsp;' + LogInDataTable[0]["CompAddress"]);
                $("#CompWebAddress").html(LogInDataTable[0]["WebUrl"] == "" ? "" : '<i class="mdi-social-public"></i>&nbsp;' + LogInDataTable[0]["WebUrl"]);

                $("#MSOAddress").html(MSOaddress == "" ? "" : '<i class="fa fa-building-o"></i>&nbsp;&nbsp;' + MSOaddress +'');
                $("#MSOEmail").html(CurrLogInDetails[0]["ClientEmailID"] == "" ? "" : '<i class="mdi-communication-email"></i>&nbsp;&nbsp;' + CurrLogInDetails[0]["ClientEmailID"]);
                $("#MSOMobile").html(CurrLogInDetails[0]["ClientContactNo"] == "" ? "" : '<i class="mdi-communication-stay-current-portrait"></i>&nbsp;&nbsp;' + CurrLogInDetails[0]["ClientContactNo"]);
                $("#ProviderName").html(LogInDataTable[0]["Company"] == "" ? "" : LogInDataTable[0]["Company"]);

                var Cr = DueDate = "";
                var Amount = 0;

                if (LogInDataTable[0]["DueDate"] == "")
                    DueDate = "";
                else
                    DueDate = LogInDataTable[0]["DueDate"];

                if (LogInDataTable[0]["SubsType"] == 0) {
                    if (LogInDataTable[0]["BalanceAmount"] == "" || LogInDataTable[0]["BalanceAmount"] == undefined)
                        Amount = 0;
                    else
                        Amount = LogInDataTable[0]["BalanceAmount"];

                    if (Amount <= 0)
                        Cr = " "; //Cr
                    else
                        Cr = "  - ";

                    $("#WalletBalanceAmount").html('<i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + Cr + ((Amount).toFixed(2)).replace("-", "") + '&nbsp; &nbsp;');
                  //  $('#BillAmount').html('<i class="fa fa-inr"></i>&nbsp;' + ((Amount).toFixed(2)).replace("-", "") + '&nbsp;' + Cr);
                    $("#WallateAmmount").show()
                    $("#DueAmmount").hide()
                    $("#DashPrepaid").css("display", "block");
                    $('#SubTypeAmount').text("Balance Amount");

                    $('#PrePaidWallet').css('display', 'block');

                    $('#PayNow').css('display', 'none');
                    $('#AddMoney').css('display', 'none');

                    $('#PrepaidViewMore').css('display', 'block');

                    //$('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp;' + DueDate + '&nbsp;(Expiry Date)'); //work done in GetExpiryProducts()

                    //$('#PayNow').html('<i class="mdi-action-account-balance-wallet"></i>&nbsp;Add Money');


                    //if (DueDate == "")
                    //    $("#DueDate").css("visibility", "hidden");
                    //else
                    //    $("#DueDate").css("visibility", "visible");

                    localStorage.setItem("IsPrePostType", "0");
                    localStorage.setItem("MyWalletBalance", (Amount).toFixed(2));
                    localStorage.setItem('ExpiryDateValue', LogInDataTable[0]["ExpiryDateValue"]);

                    GetExpiryProducts();
                }
                else {

                    var TileName = "";

                    if (LogInDataTable[0]["IsBillGen"] == true) {
                        Amount = LogInDataTable[0]["BillAmount"];
                        TileName = "Bill Amount";
                    }
                    else {
                        Amount = LogInDataTable[0]["BalanceAmount"];
                        TileName = "Due Amount";
                    }
                    $('#PayNow').css('display', 'block');
                    $('#AddMoney').css('display', 'none');

                    $('#PrepaidViewMore').css('display', 'block');

                    if (Amount == "" || Amount == undefined)
                        Amount = 0;
                    else
                        Amount = Amount;

                    if (Amount < 0) {
                        Cr = "Cr";
                        $("#SubTypeAmount").html("Advance Amount");
                        $("#DashPostPaid").css("display", "block");
                        $("#DashPostPaid").closest(".product").css("pointer-events", "all");
                    }
                    else if (Amount == 0 && CurrLogInDetails[0]["Paylimit"] == 0) {
                        $("#SubTypeAmount").text(TileName);
                        $("#DashPostPaid").css("display", "none");
                        $("#DashPostPaid").closest(".product").css("pointer-events", "none");
                    }
                    else {
                        Cr = "";
                        $("#SubTypeAmount").text(TileName);
                        $("#DashPostPaid").css("display", "block");
                        $("#DashPostPaid").closest(".product").css("pointer-events", "all");
                    }

                    $('#BillAmount').html('<i class="fa fa-inr"></i>&nbsp;' + ((Amount).toFixed(2)).replace("-", "") + '&nbsp;' + Cr);

                    $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp;' + DueDate + '&nbsp;(Due Date)');
                    $("#WallateAmmount").hide()
                    $("#DueAmmount").show()
                    if (DueDate == "" || Amount < 0)
                        $("#DueDate").css("visibility", "hidden");
                    else
                        $("#DueDate").css("visibility", "visible");

                    $('#PrePaidWallet').css('display', 'none');

                    localStorage.setItem("IsPrePostType", "1");
                }


                if (CurrLogInDetails[0]["EnablePayment"] == 0) {
                    $('#PayNow').css('display', 'none');
                    $('#AddMoney').css('display', 'none');
                }

                //localStorage.setItem("MyWalletBalance", "1");

                $('#LastPaidDate').html('<i class="fa fa-calendar"></i>&nbsp;' + LogInDataTable[0]["LastPaidDate"] + '&nbsp;(Last Paid Date)');

                var LastPaidAmt = "";
                if (LogInDataTable[0]["LastPaidAmount"] == "" || LogInDataTable[0]["LastPaidAmount"] == undefined)
                    LastPaidAmt = 0;
                else
                    LastPaidAmt = LogInDataTable[0]["LastPaidAmount"];

                $('#LastPaidAmount').html('<i class="fa fa-inr"></i>&nbsp;' + ((LastPaidAmt).toFixed(2)).replace("-"), "");
                $('#OpenRequestCount').text(LogInDataTable[0]["OpenRequestCount"]);

                if (LogInDataTable[0]["SubsType"] != 0) {
                    $('#Loadingbg').css('display', 'none');
                }

         


            }
            else {
                MsgBox('E', LogInDataTable["Description"]);
                $('#Loadingbg').css('display', 'none');
                Details = false;

            }
            SetUserName();
        }
        else {
            MsgBox("E", "Something went wrong, please try again later!");
            Details = false;

        }

        if (SetDefaultVal(LogInDataTable[0]["ImgPath"], '') != '')
            ImgPath = "../GetImage.ashx?imgid=" + LogInDataTable[0]["ImgPath"];
        else
            ImgPath = "../Channel/images.png";

        $("#imgLogo").attr("src", ImgPath);
        $("#MasterLogo").attr("src", ImgPath);
    }
    catch (e) {
        $('#Loadingbg').css('display', 'none');

        MsgBox('E', "Something went wrong, please try again later!");
    }
}
function OnFailDashboardDetail(result) {
    $('#Loadingbg').css('display', 'none');
}
var ConnDetailsDataTable = null;
var AddImagesDataTable = PaymentDiscountDataTable = stepper = active = null;;
var ImgPath = '';
var MinimumAmount = chkDuepayAmt = SetAmount = 0;
var setIsPayDueAmtLimit = false;

//function GetDashBoardData(LogInDT, ConnectionDetails, ImagesData, CurrLogDetail, MCTUID, PaymentDisDetails, NewMerchantID) {
function GetDashBoardData(NewMerchantID) {




    //LogInDataTable = JSON.parse(LogInDT);
    //localStorage.setItem("LDT", LogInDT);
    //ConnDetailsDataTable = JSON.parse(ConnectionDetails);
    //AddImagesDataTable = JSON.parse(ImagesData);
    //CurrLogInDetails = JSON.parse(CurrLogDetail);
    //localStorage.setItem("CDT", CurrLogDetail);
    //PaymentDiscountDataTable = PaymentDisDetails == "No Records Found !!!" ? null : JSON.parse(PaymentDisDetails);
    PFtypeDt = NewMerchantID == "No Records Found !!!" ? null : JSON.parse(NewMerchantID);
    //localStorage.setItem("MCTUID", MCTUID);

    //if (SetDefaultVal(LogInDataTable[0]["ImgPath"], '') != '')
    //    ImgPath = "../MyCableTVlogo.ashx?imgid=" + LogInDataTable[0]["ImgPath"];
    //else
    //    ImgPath = "../Channel/images.png";
}

function confirmAction() {

    if (Details == false) {
        document.location.replace("SignIn");
    }

}


function GetExpiryProducts() {
    try {
        //var CustomerId = localStorage.getItem("CustomerId");
      
        OperatorId = localStorage.getItem("CableOperaterID");
        var CustId = localStorage.getItem("CustId");
        var ExpiryDateValue = localStorage.getItem('ExpiryDateValue');
        var today = new Date();

        if (LogInDataTable[0]["IsDayWise"]) {

            var finaldate = new Date(today.setDate(today.getDate() + parseInt(1)));
            //var ExpiryUptoDate = finaldate.toString().split(" ")[2] + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];
            var ExpiryUptoDate = LogInDataTable[0]["DueDate"];
            var Todaydate = finaldate.toString().split(" ")[2] - 1 + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];
            var ExpiryUptoDateTime = ExpiryUptoDate + " 11:59:59 PM ";

            $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp;' + ExpiryUptoDate + '&nbsp;(Expiry Date)');
        }
        else {
          
            var finaldate = new Date(today.setDate(today.getDate() + parseInt(ExpiryDateValue)));
            var ExpiryUptoDate = finaldate.toString().split(" ")[2] + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];
            var ExpiryUptoDateTime = ExpiryUptoDate + " 11:59:59 PM ";

            $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp; 0 Product(s) Expiring Till &nbsp;' + ExpiryUptoDate + '');
        }
       

        localStorage.setItem('ExpiryUptoDate', ExpiryUptoDate);
     
        $('#Loadingbg').css('display', 'block');
        PushData('OPID', OperatorId);
        PushData('CustId', CustId);
        PushData('ExpiryDateValue', ExpiryUptoDateTime);

        CallPublicAPI('Dashboard.aspx/GetExpiryProducts', '', OnPassGetExpiryProducts, OnFailGetExpiryProducts);
    }
    catch (e) {
        $('#Loadingbg').css('display', 'none');
        MsgBox('E', "Something went wrong, please try again later!");
    }


}


function OnPassGetExpiryProducts(result)
{
    try {
      
        var res = result.d.split("|");
        if (res[0] != "E") {
            ExpiringProducts = JSON.parse(res);
          if (ExpiringProducts["Status"] == "Success") {
              ExpiringProducts = JSON.parse(res).Description;

              localStorage.setItem("ExpiringProducts", res);
              var ConnectionExpiringProducts = $.grep(ExpiringProducts, function (items) {
                  return (items['RowIndex'] >='0');
              });
               
              var TotalExpiringCount = 0;
              var TotalRequiredAmount = 0;
              if (ConnectionExpiringProducts.length > 0) {
                  
                  for (i = 0; i < ConnectionExpiringProducts.length; i++)
                  {
                      
                       TotalExpiringCount = TotalExpiringCount + parseInt(ConnectionExpiringProducts[i]["CountExpiring"]);
                       TotalRequiredAmount = TotalRequiredAmount + ConnectionExpiringProducts[i]["Total Required_Amt (A+B+C)"];
                  }

              }

                 localStorage.setItem("TotalExpiringCount", TotalExpiringCount);
                 localStorage.setItem("TotalRequiredAmount", TotalRequiredAmount);



              //balance sufficient or not 
                 var WalletAmount = 0;
                 if (LogInDataTable[0]["BalanceAmount"] == "" || LogInDataTable[0]["BalanceAmount"] == undefined)
                     WalletAmount = 0;
                 else
                     WalletAmount = LogInDataTable[0]["BalanceAmount"];


                 WalletAmount = ((WalletAmount).toFixed(2)).replace("-", "");

                 var RequiredAmount = 0;
                 if (LogInDataTable[0]["BalanceAmount"] <= 0)
                     RequiredAmount = parseFloat(TotalRequiredAmount) - parseFloat(WalletAmount);
                 else
                     RequiredAmount = parseFloat(TotalRequiredAmount) + parseFloat(WalletAmount);

                 if (RequiredAmount > 0) {

                     $('#InsufficientBal').css("display", "block");
                     $('#InsufficientBal').css("visibility", "visible");
                     $('#SufficientBal').css("display", "none");
                 }
                 else {
                     $('#InsufficientBal').css("display", "none");
                     $('#SufficientBal').css("display", "block");

                 }

              //End balance sufficient or not 

                 if (RequiredAmount > 0)
                     $('#BillAmount').html('<i class="fa fa-inr"></i>&nbsp;' + ((RequiredAmount).toFixed(2)) + '&nbsp;');
                 else
                 {
                     $('#BillAmount').html('<i class="fa fa-inr"></i>&nbsp;' + (0) + '&nbsp;');
                 }

              if (!LogInDataTable[0]["IsDayWise"]) {
                  var ExpiryDateValue = localStorage.getItem('ExpiryDateValue');
                  var today = new Date();
                  var finaldate = new Date(today.setDate(today.getDate() + parseInt(ExpiryDateValue)));
                  var ExpiryUptoDate = finaldate.toString().split(" ")[2] + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];

                    //$('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp; Product(s) Expiring Till &nbsp;' + ExpiryUptoDate + ' : ' + TotalExpiringCount);
                    $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp; ' + TotalExpiringCount + ' Product(s) Expiring Till &nbsp;' + ExpiryUptoDate + '');
                }



              $('#Loadingbg').css('display', 'none');

            }
            else {
                MsgBox('E', LogInDataTable["Description"]);
                $('#Loadingbg').css('display', 'none');
                Details = false;

            }
            
        }
        else {
            MsgBox("E", "Something went wrong, please try again later!");
            Details = false;

        }

    }
    catch (e) {
        $('#Loadingbg').css('display', 'none');

        MsgBox('E', "Something went wrong, please try again later!");
    }
}

function OnFailGetExpiryProducts()
{
    $('#Loadingbg').css('display', 'none');
}