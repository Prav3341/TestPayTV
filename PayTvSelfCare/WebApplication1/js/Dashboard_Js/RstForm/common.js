var LogInDataTable = CurrLogInDetails = null;
var IsCallByMobileApp = false;
var Reliable = new Array();
var WebMethodData = new Array();
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
var IOSLogInData = "";
var MinimumAmount = 0;

function PushData(name, value) {
    var NewVale = "";

    if (value.toString().indexOf("'") >= 0)
        NewVale = value.replace(/'/g, '♦');
    else
        NewVale = value;

    WebMethodData.push("'" + name + "':'" + NewVale + "'");
}

function CallWebMethod(MethodName, Data, OnPass, OnFail) {

    var Data = "{" + WebMethodData.toString().replace("[", "{").replace("]", "}") + "}";
    try {

        $.ajax({
            type: "POST",
            url: MethodName,
            data: Data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnPass,
            error: OnFail
        });
    }
    catch (e) {
        alert(e.message);
    }
}


function NewCallWebMethod(MethodName, Data, OnPass, OnFail) {

    var Data = "{" + WebMethodData.toString().replace("[", "{").replace("]", "}") + "}";
    try {

        $.ajax({
            type: "POST",
            url: MethodName,
            data: Data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnPass,
            error: OnFail
        });
    }
    catch (e) {
        alert(e.message);
    }
}

//$(document).ajaxStart(function () {

//});


//$(document).ajaxStop(function () {
//    WebMethodData = [];
//});



function reloadPage() {
    location.reload();
}

function Logout() {

    localStorage.removeItem("CurrMemShipNo");
    localStorage.removeItem("CurrUserName");
    localStorage.removeItem('CustId');
    localStorage.removeItem("IsAccountVerfiy");
    localStorage.removeItem("IsPrePostType");
    localStorage.removeItem("MyWalletBalance");
    localStorage.removeItem("PaymentAmount");
    localStorage.removeItem("CompEmail");
    localStorage.removeItem("CompMobNo");
    localStorage.removeItem("LDT");
    localStorage.removeItem("CDT");
    localStorage.removeItem("SubsId");
    localStorage.removeItem("OperatorId");
    localStorage.removeItem("CustomerId");
    //localStorage.removeItem("Password");
    localStorage.removeItem("IOSUserID");
    localStorage.removeItem("CurrentConnID");
    localStorage.removeItem("CompanyLogo");
    localStorage.removeItem("VCNO");
    localStorage.removeItem('DueDate');
    localStorage.removeItem('IsAddRequest');
    localStorage.removeItem('IsAddConn');
    localStorage.removeItem('IsProUpdate');
    localStorage.removeItem('IsManagePackage');
    localStorage.removeItem("CurrentPaacakges");
    localStorage.removeItem("BalanceAmount");
    localStorage.removeItem("CableOperaterID");
    localStorage.removeItem("CompanyID");
    localStorage.removeItem("ConnectionId");
    localStorage.removeItem("CustomerInfo");
    localStorage.removeItem("EnablePayment");

    localStorage.removeItem("IsPrepaid");
    localStorage.removeItem("MemberShipNo");
    localStorage.removeItem("ModifyTimeStamp");
    localStorage.removeItem("PackagePalicyId");
    localStorage.removeItem("PackagePolicyId");
    localStorage.removeItem("ProductID");
    localStorage.removeItem("ProfilePic");
    localStorage.removeItem("ShortCodeLength");
    localStorage.removeItem("SmartCardNumber");
    localStorage.removeItem("SubsUniqueID");
    localStorage.removeItem("VCNumber");
    localStorage.removeItem('TransID');
    localStorage.removeItem('IsCRFComplete');
    localStorage.removeItem('IsReversal');

    if (IsCallByMobileApp) {
        app.Logout();
        document.location.replace('../SignIn');
    }
    else if (localStorage.getItem("IsCallByIOSMobileApp") == "true") {
        webkit.messageHandlers.LogOutHandler.postMessage("LogOut By IOS Application" + localStorage.getItem("IsCallByIOSMobileApp"));
        document.location.replace('../SignIn');
        localStorage.removeItem("IsCallByIOSMobileApp");
    }
    else {
        document.location.replace('../SignIn');
    }
}

function GetTransIdForPayment(payType, InLimitPayAmt) {
    try {
        $('#Liteloding-wrapper').css('display', 'block');

        PushData('payType', payType);
        PushData('InLimitPayAmt', InLimitPayAmt);
        CallWebMethod('../Payment.aspx/GetTransIdForPayment', WebMethodData, OnPassGetTransIdForPayment, OnFailGetTransIdForPayment);
    } catch (e) {

    }
}

function OnPassGetTransIdForPayment(result) {

    var res = result.d.split("|");

    if (res[0] == "S") {
        try {
            PushData('payType', res[1]);
            CallWebMethod('../Payment.aspx/AmountPaymentNow', WebMethodData, OnPassAmountPaymentNow, OnFailAmountPaymentNow);
        } catch (e) {

        }
    }
    else {
        $('#Liteloding-wrapper').css('display', 'none');
        if (res[1] == "Last Payment Under Process.") {
            MsgBox("E", "Dear customer your last payment is in under process. Your last payment will be completed within 24 Hrs.");
        }
        else if (res[1] == "wating for response.") {
            MsgBox("P", 'We are unable to proccess your payment at this time.<br/>Please try again later.');
        }
        else {
            MsgBox("E", "Unable to connect server please try again later.");
        }
    }
}

function OnFailGetTransIdForPayment(result) {
    $('#Liteloding-wrapper').css('display', 'none');
}




function OnPassAmountPaymentNow(result) {
    if (result.d != "Unable to connect server please try again later.") {
        if (result.d == "Oops,your connection seems slow...") {
            $('#Liteloding-wrapper').css('display', 'none');
            MsgBox("E", result.d);
        }
        else
            window.location.replace("../PayU");
    }
    else {
        $('#Liteloding-wrapper').css('display', 'none');
        MsgBox("E", result.d);
    }
}

function OnFailAmountPaymentNow(result) {
    $('#Liteloding-wrapper').css('display', 'none');
    MsgBox("E", "Unable to connect server please try again later.");
}


function confirmAction() {

    /*For MsgBox confirmAction */
}

function Onpassmobloginpass(res)
{
    var msg = JSON.parse(res);
    localStorage.setItem("CDT", res);
    localStorage.setItem("SubsUniqueID", msg.Description[0]["SubsUniqueID"]);
    localStorage.setItem("CableOperaterID", msg.Description[0]["CableOperaterID"]);
    localStorage.setItem("CustomerId", msg.Description[0]["CustomerID"]);
    localStorage.setItem("ProfilePic", msg.Description[0]["ProfilePic"]);
    localStorage.setItem('TransID', msg.Description[0]["TransID"]);
}
function OnMobileLogIn(result) {
    var LoginDataTable = JSON.parse(result);
    if (LoginDataTable.length > 0) {

        var url = LoginDataTable[0]["ClientPortal"];
        var UID = Base64.encode(LoginDataTable[0].UserID.toString())
        var pwd = Base64.encode(LoginDataTable[0].Password.toString())
        window.location.href = url + "/MyDashboard?IsMobcaller=1&UserID=" + UID + "&Password=" + pwd + "";//Call from mobile
        //PushData('UserId', LoginDataTable[0].UserID);
        //PushData('Password', LoginDataTable[0].Password);
        //CallWebMethod('../Dashboard.aspx/ChkMobileLogIn', WebMethodData, OnPassAppLogIn, OnFailAppLogIn);
    }
}

function OnPassAppLogIn(result) {

    var result = result.d.split('<|>');
    var iosPassword = result[1];
    result = result[0];

    //  var LoginDataTable = result.d == "" ? null : JSON.parse(result.d);

    var LoginDataTable = result == "" ? null : JSON.parse(result);



    if (LoginDataTable != null) {
        if (LoginDataTable[0]['Value'] == "E") {
            MsgBox("E", LoginDataTable[0]['Message'], "AppUserId|AppLogIn");
            $("#AppLoginDiv .sk-fading-circle").css("display", "none");
            $("#btnLogin button").css("pointer-events", "all");
        }
        else {
            if (LoginDataTable[0]["Message"] != undefined) {
                AppCheckLogInData = JSON.parse(LoginDataTable[0]["Message"]);

                if (AppCheckLogInData[0]["IsBlocked"] == false) {

                    if (AppCheckLogInData[0]["Verifyflag"] == true) {
                        try {

                            var UserData = JSON.stringify(LoginDataTable[0]["Message"]);
                            if (IsCallByMobileApp)
                                app.RememberMe(UserData);

                            if (localStorage.getItem("IsCallByIOSMobileApp") != "") {
                                var result = '[{ "TransID": "' + AppCheckLogInData[0]["TransID"] + '", "OPID": "' + AppCheckLogInData[0]["OPID"] + '", "ProviderID": "' + AppCheckLogInData[0]["ProviderID"] + '", "CustomerID": "' + AppCheckLogInData[0]["CustomerID"] + '", "CompID": "' + AppCheckLogInData[0]["CompID"] + '", "UserID": "' + AppCheckLogInData[0]["UserID"] + '", "Password": "' + iosPassword + '", "RegMoblileNo": "' + AppCheckLogInData[0]["RegMoblileNo"] + '", "RegEmialID": "' + AppCheckLogInData[0]["RegEmialID"] + '", "Verifyflag": "' + AppCheckLogInData[0]["Verifyflag"] + '", "IsActive": "' + AppCheckLogInData[0]["IsActive"] + '", "OTP": "' + AppCheckLogInData[0]["OPID"] + '", "OTPTimeStamp": "' + AppCheckLogInData[0]["OTPTimeStamp"] + '", "OperatorID": "' + AppCheckLogInData[0]["OperatorID"] + '" }]';
                                webkit.messageHandlers.LoginHandler.postMessage(result);
                            }

                        } catch (e) {

                        }
                        document.location.replace('../MyDashboard');

                    }
                    else {

                        PushData('UserId', $('#AppUserId').val());
                        PushData('IsNumeric', $.isNumeric($("#AppUserId").val().trim()));
                        CallWebMethod('../LogIn.aspx/ResendOTPNumber', WebMethodData, OnPassAppLogInVerfiyOTP, OnFailAppLogInVerfiyOTP);

                    }
                }
                else {
                    ErrorMsg("E", "Your service provider blocked.", "AppUserId|AppLogIn");
                    $("#AppLoginDiv .sk-fading-circle").css("display", "none");
                    $("#btnLogin button").css("pointer-events", "all");
                }
            }
        }
    }
    else
        MsgBox("E", "Some SignIn Problem. Please try angain.", "AppUserId|AppLogIn");
}

function OnFailAppLogIn(result) {
    $('#loding-wrapper').css('display', 'none');
    MsgBox("E", "Some SignIn Problem. Please try angain.");
}



/*for set ios app call status*/
function GetIOSMobileVersion(result) {
    localStorage.setItem("IsCallByIOSMobileApp", result == undefined ? "false" : result);
    if (localStorage.getItem("IsCallByIOSMobileApp") != "false") {
        webkit.messageHandlers.callbackHandler1.postMessage('On Call GetIOSMobileVersion localstorage value is : ' + localStorage.getItem("IsCallByIOSMobileApp") + '-------------1');
        //GetIOSMobileVersion();
    }
}

/*for android login*/
function LoginByMobileApp() {

    if (IsCallByMobileApp) {
        var JSMethodData = new Array();
        var result = app.getUserDetail();
        if (result != '' && result != undefined && result != 'undefined' && result != null) {
            JSMethodData.push("'Value':'S'");
            JSMethodData.push("'Message':'" + result + "'");
            OnMobileLogIn(result);
        }
    }
}


/*for IOS login*/
function LoginByIOSMobileApp(result) {

    if (localStorage.getItem("IsCallByIOSMobileApp") != "false") {
        var loginstr
        var JSMethodData = new Array();

        if (result != '' && result != undefined && result != 'undefined' && result != null) {

            webkit.messageHandlers.HoldLoginDetailHandler.postMessage("Under If Condication LoginByIOSMobileApp called " + result + "------------------3");

            JSMethodData.push("'Value':'S'");
            JSMethodData.push("'Message':'" + result + "'");
            OnIOSMobileLogIn(result);
        }
    }
}

function OnIOSMobileLogIn(result) {
    try {


        var LoginDataTable = JSON.parse(result);
        webkit.messageHandlers.callbackHandler2.postMessage("OnIOSMobileLogIn Login UserID " + LoginDataTable[0].UserID.toString() + "|" + LoginDataTable[0].Password.toString() + "-----------------------4");
        if (LoginDataTable.length > 0) {


            var url = LoginDataTable[0]["ClientPortal"];
            var UID = Base64.encode(LoginDataTable[0].UserID.toString())
            var pwd = Base64.encode(LoginDataTable[0].Password.toString())
            window.location.href = url + "/MyDashboard?IsMobcaller=1&UserID=" + UID + "&Password=" + pwd + "";//Call from mobile

            webkit.messageHandlers.callbackHandler2.postMessage("OnIOSMobileLogIn Login UserID " + LoginDataTable[0].UserID.toString() + "|" + LoginDataTable[0].Password.toString() + "-----------------------4");


            //PushData('UserId', LoginDataTable[0].UserID.toString());
            //PushData('Password', LoginDataTable[0].Password.toString());
            //CallWebMethod('../login.aspx/ChkMobileLogIn', WebMethodData, OnPassIOSAppLogIn, OnFailIOSAppLogIn);
        }
    } catch (e) {
        // webkit.messageHandlers.callbackHandler2.postMessage(e.message.toString() + "-----------------------6");
    }
}



function OnPassIOSAppLogIn(result) {

    webkit.messageHandlers.callbackHandler2.postMessage("Message :: " + result.d + "----------------Common-------7");

    var result = result.d.split('|');
    var iosPassword = result[1];
    result = result[0];


    //  var LoginDataTable = result.d == "" ? null : JSON.parse(result.d);

    var LoginDataTable = result == "" ? null : JSON.parse(result);



    if (LoginDataTable != null) {
        if (LoginDataTable["Status"] != "Success") {
            ErrorMsg("E", LoginDataTable["Description"], "AppUserId|AppLogIn");
            $("#AppLoginDiv .sk-fading-circle").css("display", "none");
            $("#btnLogin button").css("pointer-events", "all");
        }
        else {
            if (LoginDataTable["Description"] != undefined) {
                AppCheckLogInData = LoginDataTable["Description"]

                if (AppCheckLogInData[0]["IsBlocked"] == false) {

                    if (AppCheckLogInData[0]["Verifyflag"] == true) {
                        try {

                            var UserData = JSON.stringify(LoginDataTable["Description"]);
                            if (IsCallByMobileApp)
                                app.RememberMe(UserData);

                            if (localStorage.getItem("IsCallByIOSMobileApp") != "false") {

                                var result = '[{ "TransID": "' + AppCheckLogInData[0]["TransID"] + '", "OPID": "' + AppCheckLogInData[0]["OPID"] + '", "ProviderID": "' + AppCheckLogInData[0]["ProviderID"] + '", "CustomerID": "' + AppCheckLogInData[0]["CustomerID"] + '", "CompID": "' + AppCheckLogInData[0]["CompID"] + '", "UserID": "' + AppCheckLogInData[0]["UserID"] + '", "Password": "' + iosPassword + '", "RegMoblileNo": "' + AppCheckLogInData[0]["RegMoblileNo"] + '", "RegEmailID": "' + AppCheckLogInData[0]["RegEmailID"] + '", "Verifyflag": "' + AppCheckLogInData[0]["Verifyflag"] + '", "IsActive": "' + AppCheckLogInData[0]["IsActive"] + '", "OTP": "' + AppCheckLogInData[0]["OPID"] + '", "OTPTimeStamp": "' + AppCheckLogInData[0]["OTPTimeStamp"] + '", "OperatorID": "' + AppCheckLogInData[0]["CableOperaterID"] + '" }]';
                                webkit.messageHandlers.LoginHandler.postMessage(result);
                            }

                        } catch (e) { }
                        document.location.replace("MyDashboard");

                    }
                    else {

                        PushData('UserId', $('#AppUserId').val());
                        PushData('IsNumeric', $.isNumeric($("#AppUserId").val().trim()));
                        CallWebMethod('../LogIn.aspx/ResendOTPNumber', WebMethodData, OnPassAppLogInVerfiyOTP, OnFailAppLogInVerfiyOTP);

                    }
                }
                else {
                    ErrorMsg("E", "Your service provider blocked.", "AppUserId|AppLogIn");
                    $("#AppLoginDiv .sk-fading-circle").css("display", "none");
                    $("#btnLogin button").css("pointer-events", "all");
                }
            }
        }
    }
    else
        ErrorMsg("E", "Some SignIn Problem. Please try angain.", "AppUserId|AppLogIn");
}


function OnFailIOSAppLogIn(result) {
    try {
        // webkit.messageHandlers.callbackHandler2.postMessage("Message :: " + result.d + "---------------Common js --------8");
        // webkit.messageHandlers.callbackHandler2.postMessage("Message :: " + result.responseText + "---------------Common js --------8");
        document.location.replace('../SignIn');
    }
    catch (err) {
        // webkit.messageHandlers.callbackHandler2.postMessage("Message :: " + err.message + "-----------Common Js ------------9");
    }
}





function ShowHidePassword(ctrl) {
    if ($(ctrl).find("i").hasClass("mdi-action-visibility-off") == true) {
        $(ctrl).find("i").remove();
        $(ctrl).html('<i class="mdi-action-visibility"></i>');
        $(ctrl).prev().prev('input[name="password"]').attr('type', 'text');
    }
    else {
        $(ctrl).find("i").remove();
        $(ctrl).html('<i class="mdi-action-visibility-off"></i>');
        $(ctrl).prev().prev('input[name="password"]').attr('type', 'password');
    }
}

function SetUserName() {
    var pathname = window.location.pathname;
    if (pathname != "/SignIn") {
        if (localStorage.getItem("CurrUserName") != undefined && localStorage.getItem("CurrUserName") != "") {
            $('#UserName').text(localStorage.getItem("CurrUserName"));
            $('#MembershipNo').text(localStorage.getItem("CurrMemShipNo"));
            $('#MyCableTVUID').text(localStorage.getItem("MCTUID"));


            if (localStorage.getItem("ProfilePic") != "") {
                $("#UserProfilePic").attr("src", "" + localStorage.getItem("ProfilePic") + "");
                $("ul.side-nav.leftside-navigation li.user-details").css("background", "");
                $("#liprofilepicdash").css('background', 'url(\'' + localStorage.getItem("ProfilePic") + '\')');
                $("#NavigationImg").attr("src", localStorage.getItem("ProfilePic"));
                $(".ProfilePic").attr("src", localStorage.getItem("ProfilePic"));
                $('.ProfilePic').css("padding", "1px");

            }

            else {
                $("#UserProfilePic").removeAttr("src").attr("src", "Images/noavatar.jpg");
                $("ul.side-nav.leftside-navigation li.user-details").css("background-image", "");
                $("ul.side-nav.leftside-navigation li.user-details").css("background", "url(../Images/download.png) center");
                $(".ProfilePic").attr("src", "Images/download.png");
                $('.ProfilePic').css("padding", "10px");
            }


            try {
                CallWebMethod('../Dashboard.aspx/GetLoginUserDetails', WebMethodData, OnPassGetLoginUserDetails, OnGetLoginUserDetails);
            } catch (e) {

            }
        }
    }
}


function OnPassGetLoginUserDetails(result) {
    var res = result.d;

    if (res != "") {
        $("#UserProfilePic").attr("src", "" + res + "");
        $("ul.side-nav.leftside-navigation li.user-details").css("background", "");
        $("ul.side-nav.leftside-navigation li.user-details").css("background-image", 'url("' + res + '")');
    }
    else {
        $("#UserProfilePic").removeAttr("src").attr("src", "Images/noavatar.jpg");
        $("ul.side-nav.leftside-navigation li.user-details").css("background-image", "");
        $("ul.side-nav.leftside-navigation li.user-details").css("background", "url(../Images/download.png) center");
    }

    var pathname = window.location.pathname; // Returns path only

    if (pathname.split("/")[1] == "MyProfile") {
        if (res != "") {
            $(".ProfilePic").attr("src", res);
            $('.ProfilePic').css("padding", "1px");
        }
        else {
            $(".ProfilePic").attr("src", "Images/download.png");
            $('.ProfilePic').css("padding", "15px");
        }
    }
}


function OnGetLoginUserDetails(result) {
    var res = result.d;

}


function RateUsOnPlayStore() {
    app.RateOnPlayStore();
}


function GoToRegisterNow() {
    document.location.replace('../Registration');
}



/*Payment Work*/

/* Step 1 */
function GetPayment() {
    try {
        LogInDataTable = JSON.parse(localStorage.getItem("LDT"))["Description"];
        CurrLogInDetails = JSON.parse(localStorage.getItem("CDT"))["Description"];
        PushData('opId', CurrLogInDetails[0]["OperatorID"]);
        PushData('cabelOpId', CurrLogInDetails[0]["OPID"]);
        PushData('CompID', LogInDataTable[0]["CompID"]);
        CallWebMethod('../Dashboard.aspx/GetPaymentGateway', WebMethodData, OnPassGetPaymentGateway, OnFailGetPaymentGateway);
    }
    catch (e) {

    }

    
       
}
var PGCompID = 0;
function OnPassGetPaymentGateway(result) {
    var res = result.d.split("|");
    if (res[0] == "S") {
        try {
            var PGType = JSON.parse(res[1]);
            var Option = '';
            var validatecount=0
            for (var i = 0; i < PGType.length; i++) {
                if (PGType[i]["IsPaymentPermit"] == 'true') {
                    validatecount = validatecount + 1;
                    Option += '<option value="' + PGType[i]["PGID"] + '">' + PGType[i]["PaymentGateway"] + '</option>';
                }
            }
                $("#drpPG").html("");
                $("#drpPG").append(Option);
                $('#drpPG   option:eq(0)').prop('selected', true);
                if (validatecount == 1)
                    $('#drpPG').closest('.s12').css('display', 'none');
                else
                    $('#drpPG').closest('.s12').css('display', 'block');

                if (PGType.length == 1 && PGType[0]["IsPaymentPermit"] == 'false' && (PGType[0]["PGID"] == "4" || PGType[0]["PGID"] == "9")) {
                    MsgBox("E", "Online Payment service is not available at this moment. Please contact to your Service Provider");
                }
                else {
                    BindPaymentgateWay();
                }
        }
        catch (e) {
        }
    }
    else {
        confirmAction = function () {
            $('#ConnectionModelPrepaid').hide();
            $('#materialize-lean-overlay-1').hide();
           
        }
        MsgBox('E', "Online Payment service is not available at this moment. Please contact to your Service Provider")
    }
}
function OnFailGetPaymentGateway(result) {
    var res = result.d.split("|");
    MsgBox("E", res[1]);
}
function BindPaymentgateWay() {
  

    $('#MyCableTVPayment li input[type="text"]').removeClass("invalid");
    $("#MyCableTVPayment li").removeClass("wrong");
    $(".invalid").css("display", "none");
    $("#MyCableTVPayment li").removeClass("active");
    $("#MyCableTVPayment li").removeClass("done");
    $("#MyCableTVPayment .step-content").css("display", "none");

    $(".PaymentMode .svg").css("display", "none");
    $(".PaymentMode .selPayMode").attr("data-ispaymode", "false");

    //$(".PaymentMode:first .svg").css("display", "block");
    //$(".PaymentMode:first .selPayMode").attr("data-ispaymode", "true");

    /*Set Payment Details*/
    var Cr = "";

    if (LogInDataTable[0]["SubsType"] == 0) {
        if (LogInDataTable[0]["BalanceAmount"] == "" || LogInDataTable[0]["BalanceAmount"] == undefined)
            SetAmount = 0;
        else
            SetAmount = LogInDataTable[0]["BalanceAmount"];

        if (SetAmount < 0)
            Cr = "Cr";
        else
            Cr = "";

        $('#TopTitleAmt').html('<i class="fa fa-inr"></i>&nbsp;' + ((SetAmount).toFixed(2)).replace("-", "") + '&nbsp;' + Cr);
        chkDuepayAmt = SetAmount.toFixed(2);
        $("#SubsAmtType").html("BALANCE&nbsp;");
    }
    else {

        Cr = "";

        if (LogInDataTable[0]["IsBillGen"] == true) {
            SetAmount = LogInDataTable[0]["BillAmount"];
        }
        else {
            SetAmount = LogInDataTable[0]["BalanceAmount"];
        }

        if (SetAmount == "" || SetAmount == undefined)
            SetAmount = 0;
        else
            SetAmount = SetAmount;

        if (SetAmount < 0)
            Cr = "Cr";

        $('#TopTitleAmt').html('<i class="fa fa-inr"></i>&nbsp;' + ((SetAmount).toFixed(2)).replace("-", "") + '&nbsp;' + Cr);

        chkDuepayAmt = SetAmount.toFixed(2);

        $("#SubsAmtType").html("BALANCE&nbsp;");
    }

    $(".wait-feedback").remove();
    $("#MyCableTVPayment li").removeClass("feedbacking ");
    $("#txtPaymentAmount").val("");

    if (CurrLogInDetails[0]["Paylimit"] == "" || CurrLogInDetails[0]["Paylimit"] == 0) {
        $("#txtPaymentAmount").closest(".input-field").find('label[for="txtPaymentAmount"]').removeAttr("style");
        $("#txtPaymentAmount").closest(".input-field").removeAttr("style");
        $("#MyCableTVPayment li:first").css("display", "none");
        $("#MyCableTVPayment").find("li:nth-of-type(2)").addClass("active");
        $("#MyCableTVPayment").find("li:nth-of-type(2)").css("display", "block");
        $("#MyCableTVPayment").find("li:nth-of-type(2) .step-content").css("display", "block");
        $("#MyCableTVPayment").find("li:nth-of-type(2) .previous-step").css("display", "none");
    }
    else {
        $("#MyCableTVPayment li:first").addClass("active");
        $("#MyCableTVPayment li:first").css("display", "block");
        $("#MyCableTVPayment li:first").find(".step-content").css("display", "block");

        $("#txtPaymentAmount").closest(".input-field").find('label[for="txtPaymentAmount"]').css("display", "none");
        $("#txtPaymentAmount").closest(".input-field").css("margin-top", "18px");

        MinimumAmount = CurrLogInDetails[0]["Paylimit"];
        $("#txtPaymentAmount").attr("placeholder", "Min. Amount " + CurrLogInDetails[0]["Paylimit"] + " /-");
        $("#txtPaymentAmount").attr("data-paylimit", CurrLogInDetails[0]["Paylimit"]);

        if (SetAmount > 0)
            $("#txtPaymentAmount").val(SetAmount.toFixed(2));
    }

    if (CurrLogInDetails[0]["IsPaylimit"] == "" || CurrLogInDetails[0]["IsPaylimit"] == 0)
        setIsPayDueAmtLimit = false;
    else
        setIsPayDueAmtLimit = true;

    PrevStep = BackStep = "";

    $("body").addClass("overflow");

    $('#materialize-lean-overlay-2').css('z-index', '1002');
    $('#materialize-lean-overlay-2').css('display', 'block');
    $('#materialize-lean-overlay-2').css('opacity', '1');

    $('#modal1').css('z-index', '1003');
    $('#modal1').css('display', 'block');
    $('#modal1').css('opacity', '1');
    $('#modal1').css('transform', 'scaleX(1)');
    $('#modal1').css('top', '10%');

    $("#txtPaymentAmount").focus();

    if (localStorage.getItem("CallFromSubscription") == "true")
    {
        $('#materialize-lean-overlay-2').hide();
        $('#materialize-lean-overlay-3').show();
        $('#materialize-lean-overlay-3').css('z-index', '1003');

        if (parseFloat(localStorage.getItem("Amount")) < MinimumAmount)
            $("#txtPaymentAmount").val(MinimumAmount);
        else
            $("#txtPaymentAmount").val(localStorage.getItem("Amount"));
        localStorage.removeItem("Amount");
        $("#txtPaymentAmount").attr('disabled', true);

        localStorage.removeItem("CallFromSubscription");
    }
   
}

function closePaymentBox() {

    $("body").removeClass("overflow");
    $('#materialize-lean-overlay-2').css('z-index', '0');
    $('#materialize-lean-overlay-2').css('display', 'none');
    $('#materialize-lean-overlay-2').css('opacity', '0');


    $('#materialize-lean-overlay-3').css('z-index', '0');
    $('#materialize-lean-overlay-3').css('display', 'none');
    $('#materialize-lean-overlay-3').css('opacity', '0');

    $('#modal1').css('z-index', '1003');
    $('#modal1').css('display', 'none');
    $('#modal1').css('opacity', '0');
    $('#modal1').css('transform', 'scaleX(1)');
    $('#modal1').css('top', '522.174px');

    $('#DocumentUploadPopup').hide();
    $('#DocumentUploadModal').hide();

}

function SetPaymentMode(ctrl) {

    $(".PaymentMode .svg").css("display", "none");
    $(ctrl).find(".svg").css("display", "block");

    $(".PaymentMode .selPayMode").attr("data-ispaymode", "false");
    $(ctrl).find(".selPayMode").attr("data-ispaymode", "true");

}
/* Step 2 */
function CountinuePayMode() {
    var flag = true;
    if ($("#txtPaymentAmount").val() == "") {
        $(".invalid").html("Please enter amount.");
        active.removeClass('done').addClass('wrong');
        $(".validate").removeClass('valid').addClass('invalid');
        $(".invalid").css("display", "block");
        flag = false;
    }
    if ($("#drpPG").val() == "" || $("#drpPG").data('value')=="") {
        $("#PG-error").css("display", "block");
        active.removeClass('done').addClass('wrong');
        $(".validate").removeClass('valid').addClass('invalid');
     
        flag = false;
    }
    
    if (flag == true) {
        if (MinimumAmount != "" && MinimumAmount != 0) {
            if (parseFloat($("#txtPaymentAmount").val() == "" ? 0 : $("#txtPaymentAmount").val()) < MinimumAmount) {
                $(".invalid").html("Please enter Minimum Amount " + MinimumAmount + "/-");
                active.removeClass('done').addClass('wrong');
                $(".validate").removeClass('valid').addClass('invalid');
                $(".invalid").css("display", "block");
                flag = false;
            }
        }
        else if (setIsPayDueAmtLimit == true && flag == true) {
            if (parseFloat($("#txtPaymentAmount").val() == "" ? 0 : $("#txtPaymentAmount").val()) < parseFloat(chkDuepayAmt)) {
                $(".invalid").html("Please enter Minimum Amount " + chkDuepayAmt + "/-");
                active.removeClass('done').addClass('wrong');
                $(".validate").removeClass('valid').addClass('invalid');
                $(".invalid").css("display", "block");
                flag = false;
            }
        }
    }

    if (flag == true) {
        stepper.activateFeedback();
        stepper.openStep(next);
        stepper.trigger('nextstep');
        active.removeClass('wrong').addClass('done');
        try {
            $('#Loadingbg').css('display', 'block');
            var PGID = $("#drpPG option:selected").val();
            PushData('opId', CurrLogInDetails[0]["OperatorID"]);
            PushData('PGID', PGID);
            CallWebMethod('../Dashboard.aspx/GetPayMode', WebMethodData, OnPassPayMode, OnFailPayMode);
        }
        catch (e) {

        }

       
    }
}
function OnPassPayMode(result) {
    var res = result.d.split("|");
    if (res[0] == "S") {
        try {
            var CardType = JSON.parse(res[1]);
            var Card = '';
            for (var i = 0; i < CardType.length; i++) {
                Card += '<div class="col s12 PaymentMode" onclick="javascript:SetPaymentMode(this); return false;">' +
                                            '<a href="javascript:void(0);" class="selPayMode" data-cardtype="' + CardType[i]["ShortCode"] + '" data-ispaymode="false" data-cardtypeid="' + CardType[i]["CardTypeID"] + '"><i class="'+CardType[i]["IconCSS"].replace('rel rel-ic','fa fa')+'"></i>&nbsp;' + CardType[i]["CardName"] + '</a>' +
                                            '<div class="svg" style="display: none;">' +
                                                '<svg width="26" height="26" viewBox="-263.5 236.5 26 26">'+
                                                    '<g class="svg-success">'+
                                                        '<circle cx="-250.5" cy="249.5" r="12"></circle>'+
                                                        '<path d="M-256.46 249.65l3.9 3.74 8.02-7.8"></path>'+
                                                    '</g>'+
                                                '</svg>'+
                                            '</div>'+
                                            '<div class="clear"></div>'+
                                        '</div>';
            }
            $("#PayMode").html(Card);
            

            $(".PaymentMode:first .svg").css("display", "block");
            $(".PaymentMode:first .selPayMode").attr("data-ispaymode", "true");
           
        }
        catch (e) {
        }
    }
    else {

        MsgBox("E", res[1]);
    }
    $('#Loadingbg').css('display', 'none');
}
function OnFailPayMode(result) {
    var res = result.d.split("|");
    MsgBox("E", res[1]);
}

function GetPaymentDetails() {

    try {

        stepper.activateFeedback();

        var PayAmt = 0;
        if (CurrLogInDetails[0]["Paylimit"] == "" || CurrLogInDetails[0]["Paylimit"] == 0)
            PayAmt = SetAmount;
        else
            PayAmt = $("#txtPaymentAmount").val();
        var PGID = $("#drpPG option:selected").val();

        PushData('OPID', CurrLogInDetails[0]["OperatorID"]);
        PushData('PayAmount', PayAmt);
        PushData('CardType', $('.selPayMode[data-ispaymode="true"]').data("cardtype"));
        PushData('PGID', PGID);
        PushData('CompID', LogInDataTable[0]["CompID"]);
        CallWebMethod('../Dashboard.aspx/GetPaymentDetails', WebMethodData, OnPassGetPaymentDetails, OnFailGetPaymentDetails);

    } catch (e) {

    }
}

function OnPassGetPaymentDetails(result) {
    var res = result.d.split("|");
    if (res[0] == "S") {
        try {
            var PayData = JSON.parse(res[1]);

            $("#SubsPaymentAmount").html("Rs.&nbsp;" + PayData[0]["PaymentAmt"].toFixed(2));

            //if (PayData[0]["IsDiscountAllowed"] == true) {
            //    $("#DiscountAmount").html("Rs.&nbsp;" + PayData[0]["DiscountAmount"].toFixed(2));
            //    $("#AfterDisPayAmount").html("Rs.&nbsp;" + PayData[0]["AfterDisPayAmount"].toFixed(2));
            //    $('.step-content [data-discount="discount"]').removeClass("hide");
            //}
            //else
                $('.step-content [data-discount="discount"]').addClass("hide");

            //if (PayData[0]["IsDisPayInc"] == true) {
            //    $('.step-content [data-inc="Inc"]').addClass("hide");
            //    if (PayData[0]["IsDiscountAllowed"] == true)
            //        $("#PayableAmount").html("Rs.&nbsp;" + PayData[0]["AfterDisPayAmount"].toFixed(2));
            //    else
            //        $("#PayableAmount").html("Rs.&nbsp;" + PayData[0]["SubsPaymentAmount"].toFixed(2));
            //}
            //else {
                $("#ConvenienceFee").html("Rs.&nbsp;" + PayData[0]["ConvenienceFee"].toFixed(2));
                $('.step-content [data-inc="Inc"]').removeClass("hide");
                $("#PayableAmount").html("Rs.&nbsp;" + PayData[0]["PayableAmt"].toFixed(2));
            //}

            stepper.openStep(next);
            stepper.trigger('nextstep');
            active.removeClass('wrong').addClass('done');
        } catch (e) {
            MsgBox('E', "Something went wrong, please contact with your Provider !");
        }
    }
}

function OnFailGetPaymentDetails(result) {
    var res = result.d.split("|");
}

function GetPaymentTransID() {
    try {
        stepper.activateFeedback();
        var PGID = $("#drpPG option:selected").val();
        PushData('PGtypeID', PGID);
        CallWebMethod('../Dashboard.aspx/GetTransIdForPayment', WebMethodData, OnPassGetPaymentTransID, OnFailGetPaymentTransID);
    } catch (e) {

    }
}

function OnPassGetPaymentTransID(result) {
    try {
        if (result.d.split("|")[0] == "S") {
            window.location.replace("../PayU");
        }
        else {
            $(".wait-feedback").remove();
            $("#MyCableTVPayment li").removeClass("feedbacking ");
            MsgBox("E", result.d.split("|")[1]);
        }
    }
    catch (e) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");
    }
}

function OnFailGetPaymentTransID(res) {
    var res = res.statusText;
    MsgBox("E", res);
}
/*End Payment Work*/


$(window).load(function () {

    //var viewportWidth = $(window).width();
    //if (viewportWidth <= 600) {
    //    document.location.replace('login.aspx')
    //}
    //else {

    //    document.location.replace('../Home')
    //}



    IsCallByMobileApp = false;
    try {
        IsCallByMobileApp = app.GetMobileVersion();/*Is call by android app*/

    } catch (e) {
        IsCallByMobileApp = false;

    }

    if (IsCallByMobileApp) {
        $(".BackToHome").closest(".row").css("display", "none");
        $(".clsRatePlayStore").css("display", "block");
    }
    else {
        $(".BackToHome").closest(".row").css("display", "block");
        $(".clsRatePlayStore").css("display", "none");
    }

    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        //  if ($(this).find("a").id() == "MyDashboard") {
        if ($(this).find('a').attr('id') != undefined) {
            $(this).addClass("active");
        }
    });


    try {

        if (localStorage.getItem("IsCallByIOSMobileApp") == null) {
            localStorage.setItem("IsCallByIOSMobileApp", "false");
        }

        if (localStorage.getItem("IsCallByIOSMobileApp") == "") {
            localStorage.setItem("IsCallByIOSMobileApp", "false");
        }

        if (localStorage.getItem("IsCallByIOSMobileApp") == undefined) {
            localStorage.setItem("IsCallByIOSMobileApp", "false");
        }

    } catch (e) {

    }


    var pathname = window.location.pathname;

    //if (pathname == "/AppLogin")
    //  $("#ApploginDashBoard").removeClass("active");

    // if (IsCallByMobileApp) {
    // if (pathname == "/Login")
    // document.location.replace('../AppLogin');
    // }

    // if (localStorage.getItem("IsCallByIOSMobileApp") != "false") {
    // if (pathname == "/Login") {
    // document.location.replace('../Login');
    // }
    // }


    try {

        if (localStorage.getItem("IsPrePostType") == "0" & $(window).width() < 767 & window.location.pathname != "/SignIn")
            $(".brand-logo").css("display", "none");

        // if (window.location.pathname == "/AppLogin")
        // $("#PrePaidWallet").css("display", "none");

        //if (IsCallByMobileApp == false && (localStorage.getItem("IsCallByIOSMobileApp") == "false")) {
        //    if (pathname == "/Login") {
        //        document.location.replace('../Default');
        //    }
        //}

        //if (pathname == "/Login.aspx" || pathname == "/login.aspx") {
        //    if (IsCallByMobileApp == false && (localStorage.getItem("IsCallByIOSMobileApp") == "false")) {
        //        document.location.replace('../Default');
        //    }
        //}

        if (pathname == "/AppQuickPayFailed" || pathname == "/appquickpayfailed") {
            if (IsCallByMobileApp == false && (localStorage.getItem("IsCallByIOSMobileApp") == "false")) {
                document.location.replace('../Default');
            }
        }

        if (pathname == "/AppQuickPayFailed.aspx" || pathname == "/appquickpayfailed.aspx") {
            if (IsCallByMobileApp == false && (localStorage.getItem("IsCallByIOSMobileApp") == "false")) {
                document.location.replace('../Default');
            }
        }
    } catch (e) {

    }





});



function SetNumberInComma(value) {
    var x = value;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;

}

$.fn.regexMask = function (mask) {
    $(this).keypress(function (event) {
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
};


function SetDefaultVal(CVal, SetVal) {
    if (CVal == undefined || CVal == 'undefined' || CVal == null)
        return SetVal;
    else
        return CVal;
}


function SearchPackages() {
    $('.app-search').show();
    $('#SearchBoxRecomnded').focus();
    $('#SearchBoxRecomnded').val("");
    $('#SearchBoxRecomnded').keyup();
    $("#BroadCastChips").html("");
    $("#GenerName").html("");
    $("#ResponsMenuBtn").hide();
    $("#backbtn").hide();
};

function CloseSearchBox() {
    $('.app-search').hide();
    $('#SearchBoxRecomnded').val("");
    $('#SearchBoxRecomnded').keyup();
    $("#BroadCastChips").html("");
    $("#GenerName").html("");
    $("#ResponsMenuBtn").show();
    $("#backbtn").show();
    
};

$(document).ready(function () {

    var pathname = window.location.pathname;
    //window.history.forward(1);
    $("#RecomndedSearch").hide();
    if (pathname == "/MyDashboard") {
        $("#backbtn").css("display", "none");
        $(".sidebar-collapse").css("left", "-166px");
        $(".fixed-action-btn").show();
    }
    if (SetDefaultVal(localStorage.getItem("CompanyLogo") != ''))
        ImgPath = "../GetImage.ashx?imgid=" + localStorage.getItem("CompanyLogo");
    else
        ImgPath = "../Channel/images.png";

    $("#MasterLogo").attr("src", ImgPath);
    $('#EditProfileDetails').click(function () {
        $('#EditProfile input[type="text"]').each(function () {
            if ($(this).val() != "") {
                $(this).closest('.input-field').find('label').addClass('active');
            }
        });
    });


    if (localStorage.getItem("IsPrePostType") == "0") {

        var Cr = "";
        if (localStorage.getItem("MyWalletBalance") <= 0)
            Cr = " ";//Cr
        else
            Cr = "  - "; 

        $("#WalletBalanceAmount").html('<i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' +  Cr + (localStorage.getItem("MyWalletBalance")).replace("-", "") + '&nbsp; &nbsp;');

        $('#PrePaidWallet').css('display', 'block');
    }
    else {
        $('#PrePaidWallet').css('display', 'none');
    }

    SetUserName();



    var Ischeck = false;

    if (Ischeck == false) {
        if (localStorage.getItem("IsCalledOnLoad") != "false") {
            Ischeck = true;
            if (pathname != "/Failed")
                localStorage.removeItem("IsCalledOnLoad");
            else if (pathname == "/Failed")
                localStorage.setItem("IsCalledOnLoad", true);
        }
        else {
            Ischeck = true;
            localStorage.removeItem("IsCalledOnLoad");
            document.location.replace('../MyDashboard');
        }
    }

    if (Ischeck == false) {
        if (localStorage.getItem("IsCalledOnLoad") != "false") {
            Ischeck = true;
            if (pathname != "/QuickPayFailed")
                localStorage.removeItem("IsCalledOnLoad");
            else if (pathname == "/QuickPayFailed")
                localStorage.setItem("IsCalledOnLoad", true);
        }
        else {
            Ischeck = true;
            localStorage.removeItem("IsCalledOnLoad");
            document.location.replace('../MyDashboard');
        }
    }

    if (Ischeck == false) {
        if (localStorage.getItem("IsCalledOnLoad") != "false") {
            Ischeck = true;
            if (pathname != "/AppQuickPayFailed")
                localStorage.removeItem("IsCalledOnLoad");
            else if (pathname == "/AppQuickPayFailed")
                localStorage.setItem("IsCalledOnLoad", true);
        }
        else {
            Ischeck = true;
            localStorage.removeItem("IsCalledOnLoad");
            document.location.replace('../MyDashboard');
        }
    }

    $('#txtPaymentAmount').keypress(function (e) {
        if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            e.preventDefault();
        }
    });

    $('#txtPaymentAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $(".validate").keyup(function (e) {
        if ($(e.target).next("label").css("display") == "block") {
            $(e.target).next("label").text("");
            $(e.target).next("label").css("display", "none");
            $(e.target).removeClass('invalid').addClass('valid');
            active.removeClass('wrong');
        }
    });

});

function fnDownloadInvoice(thtml) {
    try {
       // $('.preloader-wrapper').fadeIn("slow");
        $('#Loadingbg').css('display', 'none');
        //var Style = '<style type="text/css"> @font-face { font-family: Play-Bold; src: url(!fonts/Play-Bold.ttf!) format(!truetype!); }  #SuccessReceipt { font-size: 14px;  font-family: !Segoe UI!; color: #484848; margin-bottom: 20%; width: 90%; margin: auto; border: 1px solid #bfbcbc; border-radius: 1px; padding: 10px;  } #SuccessReceipt p { margin: 0px; padding: 0px; line-height: 25px; }#SuccessReceipt { padding: 15px; } #SuccessReceipt .mainDiv { padding: 2px !important; }</style>';
        var html = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /></head><body>'
        html = html + thtml;
        html = html + '</body></html>'
        WebMethodData = [];
        var HTML = encodeURIComponent(html);
        PushData('RecpHtml', HTML);
        PushData('IsCallByMobileApp', IsCallByMobileApp);
        PushData('IsCallByIOSMobileApp', localStorage.getItem("IsCallByIOSMobileApp"));
        CallWebMethod('../MyInvoiceHistory.aspx/DownloadInvoice', WebMethodData, OnPassDownloadInvoice, OnFailDownloadInvoice);

    } catch (e) {

    }
}

