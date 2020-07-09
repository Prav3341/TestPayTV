var MsgContents = "Please Enter ";
var LoginDataTable = null;
var Msgbox = "";
var iosPassword = "";
var Path = "";

function LoginFunction() {
    $('#Loadingbg').css('display', 'block');
    var UserID = $('#txtUserName').val().trim();
    var Password = $('#txtUserPass').val().trim();
    var opID = "PayTV"
    if (UserID == "" || Password == "") {
        if (UserID == "") {
            $("#PUserId").css('visibility', 'visible');
            $("#PUserId").html('Enter a mobile number or an email. ');
            $("#PUserId").delay(4000).fadeOut(1000);
            $("#PUserId").css('display', 'block');
            $('#Loadingbg').css('display', 'none');

        }
        else {
            $("#PUserId").css('visibility', 'hidden');
            $("#PUserId").html('Enter a mobile number or an email.');
            $('#Loadingbg').css('display', 'none');

        }
        if (Password == "") {
            $("#PPwd").css('visibility', 'visible');
            $("#PPwd").html('Please Enter Password');
            $("#PPwd").delay(4000).fadeOut(1000);
            $("#PPwd").css('display', 'block');
            $('#Loadingbg').css('display', 'none');

        }
        else {
            $("#PPwd").css('visibility', 'hidden');
            $("#PPwd").html('Please Enter Password');
            $('#Loadingbg').css('display', 'none');

        }
    }
    else {
        $("#PPwd").css('visibility', 'hidden');
        $("#PUserId").css('visibility', 'hidden');
        $("#PPwd").html('Please Enter Password');
        $("#PUserId").html('Enter a mobile number or an email.');

        RememberMe();
        //PushData('opID', opID);
        PushData('UserID', UserID);
        PushData('Password', Password);
        localStorage.setItem("IOSUserID", UserID);
        localStorage.setItem("Password", Password);
        CallPublicAPI('login.aspx/LoginMethod', '', OnPassOperatorlogin, OnFailOperatorlogin);
    }
}


function OnPassOperatorlogin(result, newpass, callby) {
    try {
        var NewURL = "/SignIn";
        var res = "";
        if (callby == "1")////Login through https://login.paytvselfcare.tv
            res = result;
        else
            res = result.d;


        var msg = JSON.parse(res);
        if (msg["Status"] != null) {

            if (msg["Status"] == "Success") {
                CurrLogInDetails = JSON.parse(res).Description;
                var urlnew = CurrLogInDetails[0]["ClientPortal"]
                if (window.location.href.includes(urlnew) || window.location.href.includes("https://login.paytvselfcare.tv") || window.location.href.includes("localhost") || window.location.href.includes("http://192.168.2.140:98/")) {
                    if (CurrLogInDetails[0]["Verifyflag"] == true) {
                        if (CurrLogInDetails[0]["IsBlocked"] == false) {
                            localStorage.setItem("CDT", res);

                            localStorage.setItem("SubsUniqueID", CurrLogInDetails[0]["SubsUniqueID"]);
                            localStorage.setItem("CableOperaterID", CurrLogInDetails[0]["CableOperaterID"]);
                            localStorage.setItem("CustomerId", CurrLogInDetails[0]["CustomerID"]);
                            localStorage.setItem("ProfilePic", CurrLogInDetails[0]["ProfilePic"]);
                            localStorage.setItem('TransID', CurrLogInDetails[0]["TransID"]);

                            var Password;
                            var UserData = JSON.stringify(CurrLogInDetails);
                            if (callby == 1)
                                Password = newpass;
                            else
                                Password = localStorage.getItem("Password").toString();
                            /// On Login from Mobile Apps then Redirect to specific Operator Dashboard URL 
                            var url = CurrLogInDetails[0]["ClientPortal"]
                            if (window.location.href.includes("https://login.paytvselfcare.tv") == false)//When url not calling from Mobile Apps
                            {

                                //if (url == "")
                                //    window.location.href = url + "/MyDashboard";
                                //else
                                document.location.replace("MyDashboard");
                            }
                            else {
                                if (url != "") {

                                    result = '[{ "TransID": "' + CurrLogInDetails[0]["TransID"] + '", "OPID": "' + CurrLogInDetails[0]["OPID"] + '", "ProviderID": "' + CurrLogInDetails[0]["ProviderID"] + '", "CustomerID": "' + CurrLogInDetails[0]["CustomerID"] + '", "CompID": "' + CurrLogInDetails[0]["CompID"] + '", "UserID": "' + CurrLogInDetails[0]["UserID"] + '", "Password": "' + Password + '", "RegMoblileNo": "' + CurrLogInDetails[0]["RegMoblileNo"] + '", "RegEmailID": "' + CurrLogInDetails[0]["RegEmailID"] + '", "Verifyflag": "' + CurrLogInDetails[0]["Verifyflag"] + '", "IsActive": "' + CurrLogInDetails[0]["IsActive"] + '", "OTP": "' + CurrLogInDetails[0]["OPID"] + '", "OTPTimeStamp": "' + CurrLogInDetails[0]["OTPTimeStamp"] + '", "ClientPortal": "' + CurrLogInDetails[0]["ClientPortal"] + '", "OperatorID": "' + CurrLogInDetails[0]["CableOperaterID"] + '" }]';
                                    if (IsCallByMobileApp)
                                        app.RememberMe(UserData);
                                    if (localStorage.getItem("IsCallByIOSMobileApp") == "true")
                                        webkit.messageHandlers.LoginHandler.postMessage(result);
                                    var UID = Base64.encode(CurrLogInDetails[0]["UserID"].toString())
                                    var pwd = Base64.encode(Password)
                                    window.location.href = url + "/MyDashboard?IsMobcaller=1&UserID=" + UID + "&Password=" + pwd + ""
                                }
                            }
                            /// On Login from Mobile Apps then Redirect to specific Operator Dashboard URL 
                        }
                        else {
                            MsgBox("E", "Due to the Maintenance Activity, PayTv Selfcare services are not available for this moment. Please contact to your Service Provider. Sorry for the Inconvenience.");
                        }
                    }
                    else {
                        LoginSendOTP();
                    }
                }
                else {
                    var FinalURl = urlnew + NewURL;
                    MsgBox("E", "Your login url is <a href=" + FinalURl + ">" + FinalURl + '</a>')
                }
            }
            else {
                MsgBox("E", msg["Description"]);
            }
        }
        else {
            MsgBox("E", "Something Went Wrong. Please Try Again Later!");
        }
    }
    catch (e) {
        MsgBox("E", "Something Went Wrong. Please Try Again Later!");
    }
    $('#Loadingbg').css('display', 'none');
}

function OnFailOperatorlogin(result) {
    MsgBox("E", "Something Went Wrong. Please Try Again Later!");
    $('#Loadingbg').css('display', 'none');
}

function LoginSendOTP() {
    $('#Loadingbg').css('display', 'block');
    UserID = $("#txtUserName").val().trim();
    PushData('UserId', UserID);
    CallPublicAPI('../login.aspx/SetLoginOTP', '', OnPassSendOTP, OnFailSendOTP);

}
function OnPassSendOTP(result) {
    $('#Loadingbg').css('display', 'block');
    var result = JSON.parse(result.d);

    if (result["Status"] == "Fail") {
        MsgBox("E", result["Description"]);
        $('#Loadingbg').css('display', 'none');
    }
    else {

        var MobNumber = $("#txtUserName").val().trim();
        var EnteredMobileNo = MobNumber.slice(0, 2) + "******" + MobNumber.slice(-2);
        $("#MobNumber").html(EnteredMobileNo);
        $("#OTPMsg").css("display", "block");
        $("#OTPResendMsg").css("display", "none");
        $('#materialize-lean-overlay-1').css('z-index', '1002');
        $('#materialize-lean-overlay-1').css('display', 'block');
        $('#materialize-lean-overlay-1').css('opacity', '0.6');

        $('#modal5').css('display', 'block');
        $('#modal5').css('opacity', '1');
        $('#modal5').css('bottom', '0px');
        $('#modal5').css('z-index', '9999');
        $('#txtTempOIP').focus();
        $('#Loadingbg').css('display', 'none');
    }
    $('#Loadingbg').css('display', 'none');
}
function OnFailSendOTP(result) {
    $('#Loadingbg').css('display', 'none');
}


function CheckRegisterOTP() {

    if ($('#txtTempOIP').val().trim() != "") {
        $('#preloader-wrapper').css('display', 'block');
        $('.modal-content').addClass('disabled');
        PushData('UserId', $('#txtUserName').val().trim());
        PushData('OTP', $('#txtTempOIP').val().trim());
        CallPublicAPI('../register.aspx/VerfiyRegisterOTP', '', OnPassVerfiyRegisterOTP, OnFailVerfiyRegisterOTP);
    }
    else
        ErrorMsg("E", "Please enter OTP.", "txtTempOIP");
}

function OnPassVerfiyRegisterOTP(result) {
    var result = JSON.parse(result.d);

    if (result["Status"] == "Fail") {
        IsRegister = false;

        ErrorMsg("E", result["Description"], "txtTempOIP");

        $('#txtTempOIP').focus();

        $('.modal-content').removeClass('disabled');

        $('#preloader-wrapper').css('display', 'none');

    }
    else {

        $('#preloader-wrapper').css('display', 'none');
        $('.modal-content').removeClass('disabled');
        $('#materialize-lean-overlay-1').css('z-index', '0');
        $('#materialize-lean-overlay-1').css('display', 'none');
        $('#materialize-lean-overlay-1').css('opacity', '0');
        $('#modal5').css('display', 'none');
        $('#modal5').css('opacity', '0');
        $('#modal5').css('bottom', '-100%');
        $('#modal5').css('z-index', '0');
        IsRegister = true;
        NewCustID = 0;
        MsgBox("S", result["Description"]);

    }
}

function OnFailVerfiyRegisterOTP(result) {
    $('#preloader-wrapper').css('display', 'none');
}

function confirmAction() {
    $(".jconfirm").css("display", "none");
    $('#Loadingbg').css('display', 'none');
}


function ResendOTPNumber() {

    $('#preloader-wrapper').css('display', 'block');
    $('.modal-content').addClass('disabled');


    PushData('UserId', $("#txtUserName").val().trim());
    CallPublicAPI('../register.aspx/ResendOTP', '', OnPassResendOTP, OnFailResendOTP);
}

function OnPassResendOTP(result) {
    var result = JSON.parse(result.d);

    if (result["Status"] == "Fail") {
        IsRegister = false;

        ErrorMsg("E", result[0]['Message'], "txtTempOIP");

        $('#txtTempOIP').focus();

        $('.modal-content').removeClass('disabled');

        $('#preloader-wrapper').css('display', 'none');

    }
    else {

        var MobNumberResend = $("#txtUserName").val().trim();
        var EnteredMobileNoResend = MobNumberResend.slice(0, 2) + "******" + MobNumberResend.slice(-2);
        $("#MobNumberResend").html(EnteredMobileNoResend);

        $("#OTPMsg").css("display", "none");
        $("#OTPResendMsg").css("display", "block");

        $('#preloader-wrapper').css('display', 'none');
        $('.modal-content').removeClass('disabled');

        // MsgBox("S", registerSucessMsg);
    }
}

function OnFailResendOTP(result) {
}



function RememberMe() {

    if ($('#RememberMe').prop('checked') == true) {
        localStorage.setItem('IsRemember', true);

        localStorage.setItem('UserName', $('#txtUserName').val());
        localStorage.setItem('Password', $('#txtUserPass').val());
    }
    else {
        localStorage.setItem('IsRemember', false);
        localStorage.removeItem('UserName');
        localStorage.removeItem('Password');
    }

}

function AutoFill() {

    if (localStorage.getItem('IsRemember') == null)
        $('#RememberMe').prop('checked', false);
    else if (localStorage.getItem('IsRemember') == "true")
        $('#RememberMe').prop('checked', true);
    else if (localStorage.getItem('IsRemember') == "false")
        $('#RememberMe').prop('checked', false);


    if ($('#RememberMe').prop('checked') == true) {

        $('#txtUserName').val(localStorage.getItem('UserName'));

        $('#txtUserName').closest('.row').find('i').addClass('active');
        $('#txtUserName').closest('.row').find('label').addClass('active');


        $('#txtUserPass').val(localStorage.getItem('Password'));

        $('#txtUserPass').closest('.row').find('i').addClass('active');
        $('#txtUserPass').closest('.row').find('label').addClass('active');

        if ($.isNumeric($("#txtUserName").val().trim()) == true) {
            $("#txtUserName").attr("maxlength", "10");
        }
        else {
            $("#txtUserName").attr("maxlength", "100");
        }

    }
    else {

        $('#txtUserName').val("");
        $('#txtUserPass').val("");

        $('#txtUserName').closest('.row').find('i').removeClass('active');
        $('#txtUserName').closest('.row').find('label').removeClass('active');

        $('#txtUserPass').closest('.row').find('i').removeClass('active');
        $('#txtUserPass').closest('.row').find('label').removeClass('active');
    }
}
function GetWebsitePortalUrl() {
    $('#Loadingbg').css('display', 'block');
    CallPublicAPI('login.aspx/GetWebsitePortalUrl', '', OnPassGetlUrl, OnFailGetlUrl);
}

function OnPassGetlUrl(result) {
    $('#Loadingbg').css('display', 'none');
    var result = JSON.parse(result.d);
    if (result["Status"] == "Success") {
        var WebSiteURL = result["Description"][0]["WebsiteUrl"].toString();

        if (WebSiteURL != "")
            window.location.href = WebSiteURL;
    }
}

function OnFailGetlUrl() {
    $('#Loadingbg').css('display', 'none');
}

function BackTOoHome(PortalURL, WebSiteURL) {

    var str = Path.indexOf(PortalURL)
    if (str >= 0)
        window.location.href = WebSiteURL;

}
function MouseupPass() {
    var x = document.getElementById("txtUserPass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }

}
$(document).ready(function () {

    if (window.location.href.includes("https://login.paytvselfcare.tv")) {
        $('#bcktohome').hide();
    }
    Path = window.location.href;

    AutoFill();
    pathname = $(location).attr('pathname');

    $("#txtUserName").focus();
    $('#txtUserName').keypress(function (e) {
        if (e.which == 13 || e.keycode == 13) {
            $("#txtUserPass").focus();
        }
    });

    $('#txtUserPass').keypress(function (e) {
        if (e.which == 13 || e.keycode == 13) {
            if ($('#txtUserName').val() == "") {
                $("#txtUserName").focus();
            }
            LoginFunction();
        }
    });


});