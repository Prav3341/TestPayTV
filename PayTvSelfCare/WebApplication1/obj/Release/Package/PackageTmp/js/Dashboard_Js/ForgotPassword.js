
var Msg = MsgType = CtrId = ForgetUserName = ForgetEmail = "";
var IsPasswordReset = false;
var ForgotType = "SMS";
var IsMobile = true;

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}



function ForGotvalidation() {
    var flag = true;
    MsgType = "E";

    if (ForgotType == "SMS") {
        if ($('#txtFMobileNo').val().trim() == "") {
            CtrId = "txtFMobileNo";
            Msg = "Please enter mobile number.";
            flag = false;
        }
        else if ($("#txtFMobileNo").val().trim().length != 10) {
            CtrId = "txtFMobileNo";
            Msg = "Please enter valid mobile number.";
            flag = false;
        }
    }

    if (ForgotType == "Email") {

        if ($('#txtFEmailId').val().trim() == "") {
            CtrId = "txtFEmailId";
            Msg = "Please enter an email address.";
            flag = false;
        }
        else if ($('#txtFEmailId').val().trim() != "") {
            if (isValidEmailAddress($('#txtFEmailId').val().trim()) == false) {
                CtrId = "txtFEmailId";
                Msg = "Please enter an valid email address.";
                flag = false;
            }
        }
    }


    return flag;
}

function SetForgetPassword() {
    if (ForGotvalidation() == true) {

        $('.preloader-wrapper').css('display', 'block');

        ForgetUserName = $("#txtFMobileNo").val().trim();
        ForgetEmail = $('#txtFEmailId').val().trim();
        if (ForgetEmail == "") {

            UserId = ForgetUserName
            IsMobile = true;
        }
        else {
            UserId = ForgetEmail
            IsMobile = false;
        }
        PushData('UserId', UserId);
        PushData('IsCallBy', 'ForgotPass')
        CallPublicAPI('../forgot_password.aspx/SetForgetPassword', '', OnPassSetPassword, OnFailSetPassword);
    }
    else
        ErrorMsg(MsgType, Msg, CtrId);
}

function OnPassSetPassword(result) {
    var result = JSON.parse(result.d);

    $('.preloader-wrapper').css('display', 'none');
    if (result["Status"] == "Fail") {
        if (ForgotType == "SMS")
            ErrorMsg("E", result["Description"], "txtFMobileNo");
        else
            ErrorMsg("E", result["Description"], "txtFEmailId");
    }
    else {

        if (IsMobile == true) {
            var MobNumber = $("#txtFMobileNo").val().trim();
            var EnteredMobileNo = MobNumber.slice(0, 2) + "******" + MobNumber.slice(-2);

            $("#OTPMsg").html('PayTV will send a OTP on <b id="MobNumber"></b>.');

            $("#MobNumber").html(EnteredMobileNo);
        }
        else {
            var Email = $("#txtFEmailId").val().trim();
            var EnteredEmail = Email.slice(0, 2) + "******" + Email.slice(-2);
            //$("#OTPMsg").html('OTP sent on <b id="MobNumber"></b>. Please enter OTP number.');
            $("#OTPMsg").html('PayTV will send a OTP to ' + Email + '');

            $("#MobNumber").html(EnteredEmail);
        }

        $('#materialize-lean-overlay-1').css('z-index', '1002');
        $('#materialize-lean-overlay-1').css('display', 'block');
        $('#materialize-lean-overlay-1').css('opacity', '0.6');
        $('#modal-bottom-sheet').show();

        $('#modal5').css('display', 'block');
        $('#modal5').css('opacity', '1');
        $('#modal5').css('bottom', '0px');
        $('#modal5').css('z-index', '9999');

        $("#txtTempOTP").focus();

    }
}

function OnFailSetPassword(result) {
    $('.preloader-wrapper').css('display', 'none');
}


function VerfiyForgotPassOTP() {

    if ($('#txtTempOTP').val().trim() != "") {
        $('#preloader-wrapper').css('display', 'block');
        $('.modal-content').addClass('disabled');

        if (ForgotType == "SMS") {
            PushData('UserId', $("#txtFMobileNo").val().trim());
        }
        else {
            PushData('UserId', $("#txtFEmailId").val().trim());
        }
        PushData('OTP', $('#txtTempOTP').val().trim());
        CallPublicAPI('../forgot_password.aspx/VerfiyPassOTP', '', OnPassVerfiyPassOTP, OnFailVerfiyPassOTP);
    }
    else
        ErrorMsg("E", "Please enter OTP.", "txtTempOTP");
}


function OnPassVerfiyPassOTP(result) {
    var result = JSON.parse(result.d);

    if (result['Status'] == "Fail") {

        ErrorMsg("E", result["Description"], "txtTempOTP");

        $('#txtTempOTP').focus();

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

        $('#modal-bottom-sheet').hide();

        $("#ForgotPassword").css("display", "none");
        $("#ForgetPasswordBtn").css("display", "none");
        $("#BottomMenu").css("display", "block");

        $("#ResetPasswordDiv").css("display", "block");
        $("#ResetPasswordBtn").css("display", "block");

        $("#TryDifferentOption").css("display", "none");

        $("#txtNewPassword").focus();
    }
}

function OnFailVerfiyPassOTP(result) {
}


function ResendOTPNumber() {

    $('#preloader-wrapper').css('display', 'block');
    $('.modal-content').addClass('disabled');

    ForgetUserName = $("#txtFMobileNo").val().trim();
    ForgetEmail = $('#txtFEmailId').val().trim();
    if (ForgetEmail == "") {

        UserId = ForgetUserName
        IsMobile = true;
    }
    else {
        UserId = ForgetEmail
        IsMobile = false;
    }
    PushData('UserId', UserId);
    PushData('IsCallBy', 'ForgotPass')
    CallPublicAPI('../forgot_password.aspx/SetForgetPassword', '', OnPassResendOTP, OnFailResendOTP);
}

function OnPassResendOTP(result) {
    var result = JSON.parse(result.d);

    if (result['Status'] == "Fail") {

        ErrorMsg("E", result["Description"], "txtTempOTP");

        $('#txtTempOTP').focus();

        $('.modal-content').removeClass('disabled');

        $('#preloader-wrapper').css('display', 'none');

    }
    else {

        $('#preloader-wrapper').css('display', 'none');
        $('.modal-content').removeClass('disabled');

    }
}

function OnFailResendOTP(result) {
}


function SetNewPassword() {
    if ($("#txtNewPassword").val().trim() != "") {

        if ($("#txtNewPassword").val().trim() != "") {

            if ($('#txtConfirmNewPassword').val().trim() == $('#txtNewPassword').val().trim()) {

                $('.preloader-wrapper').css('display', 'block');

                if (ForgotType == "SMS")
                    PushData('UserID', ForgetUserName);
                else
                    PushData('UserID', ForgetEmail);
                PushData('NewPassword', $("#txtConfirmNewPassword").val().trim());
                CallPublicAPI('../forgot_password.aspx/SetNewPassword', '', OnPassResetPassword, OnFailResetPassword);
            }
            else {
                ErrorMsg("E", "Password And Confirm Password Mismatch", "txtConfirmNewPassword");
            }
        }
        else
            ErrorMsg("E", "Please enter Confirm Password", "txtConfirmNewPassword");
    }
    else
        ErrorMsg("E", "Please enter New Password", "txtNewPassword");
}

function OnPassResetPassword(result) {
    var result = JSON.parse(result.d);

    $('.preloader-wrapper').css('display', 'none');

    if (result['Status'] == "Fail") {
        MsgBox("E", result["Description"]);

        $("#ResetPasswordDiv").css("display", "none");
        $("#ResetPasswordBtn").css("display", "none");

        $("#ForgotPassword").css("display", "block");
        $("#ForgetPasswordBtn").css("display", "block");
        $("#BottomMenu").css("display", "block");

        $("#txtUserId").focus();
        IsPasswordReset = false;

    }
    else {
        IsPasswordReset = true;
        MsgBox("S", result['Description']);
    }
}

function OnFailResetPassword(result) {

    $('.preloader-wrapper').css('display', 'none');
}

function TryDifferentOption() {
    if ($(".clsEmail").css("display") == "none") {


        $("#txtFMobileNo").closest(".input-field").find(".errorMsg").css("visibility", "hidden");

        $(".clsMobile").css("display", "none");
        $(".clsEmail").css("display", "block");

        $("#txtFMobileNo").val("");
        $("#txtFEmailId").val("");

        $("#txtFEmailId").focus();

        ForgotType = "Email";
    }
    else {

        $("#txtFEmailId").closest(".input-field").find(".errorMsg").css("visibility", "hidden");

        $(".clsEmail").css("display", "none");
        $(".clsMobile").css("display", "block");

        $("#txtFMobileNo").val("");
        $("#txtFEmailId").val("");

        $("#txtFMobileNo").focus();

        ForgotType = "SMS";

    }
}


function confirmAction() {

    document.location.replace('../SignIn');

}


$(window).load(function () {
    $("#txtTempOTP").val("");
    $('#txtFMobileNo').focus();
});


$(document).ready(function () {
    $("#txtFMobileNo").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });


    $("#txtTempOTP").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

});