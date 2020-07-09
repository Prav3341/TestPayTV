var Msg = MsgType = registerSucessMsg = CtrId = "";
var IsRegister = false;
var NewCustID = MCTUIDCustID = linkProviderID = 0;
var ServiceProviderDataTable = null;
var captchaContainer = null;
var CaptChaValue = IsInfoClick = "";
var OPID = "";
var IsCallByMCTUID = false;
var ISMAMB = false;
var ISSTB = false;
var ISSMART = false;
var OperatorId = "PayTv";
var CallType = "";
function BackToMCTUniqueID() {

    $("#RegFirstHead").css("display", "none");
    $("#ServiceProvider").css("display", "none");
    $("#BackToUniqueID").css("display", "none");

    $("#MCTUniqueId").css("display", "block");
    $("#MCTUniqueIdDiv").css("display", "block");

}

function SetServiceProvider() {

    if ($('#SelectState option:selected').val() != "-1") {
        if ($('#Citylist option:selected').val() != "-1") {
            if ($('#SelectServiceProvider option:selected').val() != "-1") {
                SetMyServiceProvider();
            }
            else
                ErrorMsg("E", "Select Your Service Provider First.", "SelectServiceProvider");
        }
        else
            ErrorMsg("E", "Select Your City First.", "Citylist");
    }
    else
        ErrorMsg("E", "Select Your State First.", "SelectState");

}

function SetMyServiceProvider() {

    var CompIDRow = null;

    if (OPID == "") {
        CompIDRow = $.grep(ServiceProviderDataTable["Table"], function (e) {
            return e.ProviderID == $('#SelectServiceProvider').find('option:selected').val();
        });

        $("#SetStep1").html("Step-2");
        $("#SetStep2").html("Step-3");
    }
    else {
        if (linkProviderID == 0) {
            CompIDRow = $.grep(ServiceProviderDataTable["Table"], function (e) {
                return e.OPID == OPID;
            });
        }
        else {
            CompIDRow = $.grep(ServiceProviderDataTable["Table"], function (e) {
                return e.OPID == OPID && e.ProviderID == linkProviderID;
            });
        }

        $("#SetStep1").html("Step-1");
        $("#SetStep2").html("Step-2");
    }


    if (CompIDRow[0]["IsMemNoUnique"] == true) {
        $("#txtMembershipNumber").closest(".row").css("display", "block");
        $("#txtMembershipNumber").closest(".row").next(".row").css("display", "block");
    }
    else {
        $("#txtMembershipNumber").closest(".row").css("display", "none");
        $("#txtMembershipNumber").closest(".row").next(".row").css("display", "none");
    }


    $("#RegFirstHead").css("display", "none");
    $("#ServiceProvider").css("display", "none");
    $("#BackToUniqueID").css("display", "none");

    $("#txtSelectLogInType").val("");
    $("#txtEmail").val("");
    $("#txtMobileNumber").val("");


    var CopyMobHtml = "";
    if ($("#CopyMobUserId a").find("i").hasClass("mdi-action-done") == true) {
        CopyMobHtml = '<a href="javascript:void(0);" style="color: #a79e9e;" onclick="javascript:SetMobUserID(); return false;"><i class="mdi-image-crop-3-2" style="font-size: 13px;"></i>&nbsp;Copy As User ID</a>';

        $("#CopyMobUserId").html(CopyMobHtml);
        $("#CopyMobUserId").hide();
    }


    $("#txtUserId").val("");
    $("#txtPassword").val("");

    $("#RegisterDiv").find(".row i").removeClass("active");
    $("#RegisterDiv").find(".row label").removeClass("active");

    $('#LogInTypeCheck .btn').css('background', '#FC8002');
    $('#LogInTypeCheck .btn').css('color', '#FFF');

    $("#MemNo").css('background', 'rgb(0, 181, 31)');
    $("#MemNo").css('color', '#FFF');

    $('#lblSelectLogInType').text("Membership Number");

    $('#RegisterDiv').find('.input-field .errorMsg').html("");
    $('#RegisterDiv').find('.input-field .errorMsg').css('visibility', 'hidden');


    $("#EnterMemSTBVC").css("display", "block");
    $("#RegSecondHead").css("display", "block");

    if (OPID == "") {
        $("#overlay").css("display", "block");
        $("#BackToServiceProvider").css("display", "block");
    }

    if ($("#overlay").css("display") == "none") {
        if (CompIDRow[0]["IsMemNoUnique"] == true)
            $("#txtMembershipNumber").focus();
        else
            $("#txtSTBNumber").focus();
    }
}
function SetMemSTBVC() {
    if ($("#txtMembershipNumber").val().trim() != "" || $("#txtSTBNumber").val().trim() != "" || $("#txtSmartCardNumber").val().trim() != "") {

        $('.preloader-wrapper').css('display', 'block');

        var UIdValue = "";
        ISVC = false;
        if ($('#txtMembershipNumber').val().trim() != "") {
            ISVC = false;
            ISSMART = false;
            ISMAMB = true;
            UIdValue = $('#txtMembershipNumber').val().trim();
        }
        else if ($('#txtSTBNumber').val().trim() != "") {
            ISVC = false;
            ISSMART = false;
            ISSTB = true;
            UIdValue = $('#txtSTBNumber').val().trim();
        }
        else if ($('#txtSmartCardNumber').val().trim() != "") {
            ISVC = true;
            ISSMART = true;
            ISSTB = false;
            UIdValue = $('#txtSmartCardNumber').val().trim();
        }



        var SelectedProviderDT = null;

        if (OPID == "") {
            SelectedProviderDT = $.grep(ServiceProviderDataTable["Table"], function (e) {
                return e.ProviderID == $('#SelectServiceProvider').find('option:selected').val();
            });
        }
        else {
            if (linkProviderID == 0) {
                SelectedProviderDT = $.grep(ServiceProviderDataTable, function (e) {
                    return e.OPID == OPID;
                });
            }
            else {
                SelectedProviderDT = $.grep(ServiceProviderDataTable, function (e) {
                    return e.OPID == OPID && e.ProviderID == linkProviderID;
                });
            }
        }

        var criteria = "";

        PushData('UId', UIdValue);
        PushData('ISVc', ISVC);
        PushData('CableOperatorID', SelectedProviderDT[0]['CableOperatorID']);
        CallPublicAPI('../register.aspx/SubscriberAuthenticate', '', OnPassRegisterMemSTBVCCheck, OnFailRegisterMemSTBVCCheck);

    }
    else {
        $(".RegTopRed").css("display", "block");
    }
}


function OnPassRegisterMemSTBVCCheck(result) {
    var result = JSON.parse(result.d);
    var SplitData = result["Status"].split("|");

    $('.preloader-wrapper').css('display', 'none');

    if (SplitData == "Fail") {

        if (ISMAMB == true) {
            ErrorMsg("Fail", "Please enter valid Mambership Number", "txtMembershipNumber");
            //ErrorMsg("E", "Select Your Service Provider First.", "SelectServiceProvider");
            $("#txtMembershipNumber").focus();
        }
        if (ISSTB == true) {
            ErrorMsg("E", "Please enter valid STB Number", "txtSTBNumber");
            $("#txtSTBNumber").focus();
        }
        else {
            $('#txtSTBNumber').closest('.input-field').find('.errorMsg').html("");
            $('#txtSTBNumber').closest('.input-field').find('.errorMsg').css('visibility', 'hidden');
        }
        if (ISSMART == true) {
            ErrorMsg("E", "Please enter valid SmartCard Number", "txtSmartCardNumber");
            $("#txtSmartCardNumber").focus();
        }
        else {
            $('#txtSmartCardNumber').closest('.input-field').find('.errorMsg').html("");
            $('#txtSmartCardNumber').closest('.input-field').find('.errorMsg').css('visibility', 'hidden');
        }
    }
    else {

        $("#RegFirstHead").css("display", "none");
        $("#RegSecondHead").css("display", "none");
        $("#EnterMemSTBVC").css("display", "none");
        $("#BackToServiceProvider").css("display", "none");
        $("#BackToSTBVC").css("display", "block");
        $("#RegLastHead").css("display", "block");
        $("#RegisterDiv").css("display", "block");

        $("#txtMobileNumber").focus();
    }
}

function OnFailRegisterMemSTBVCCheck(result) {
}

function BackToSTBVC() {



    $("#txtEmail").val("");
    $("#txtMobileNumber").val("");
    $("#txtPassword").val("");

    $(".errorMsg").css("visibility", "hidden");

    $("#EnterMemSTBVC").css("display", "block");

    $("#TermsConditions").prop("checked", false);

    $("#RegisterDiv").css("display", "none");

    if (OPID == "")
        $("#BackToServiceProvider").css("display", "block");
    else
        $("#BackToServiceProvider").css("display", "none");

    $("#BackToSTBVC").css("display", "none");
    $("#RegLastHead").css("display", "none");
    $("#RegSecondHead").css("display", "block");

    $("#RegisterDiv .row").find("i").removeClass("active");
    $("#RegisterDiv .row").find("label").removeClass("active");

    $("#RegisterDiv").find('input[name="password"]').next().next("span i").remove();
    $("#RegisterDiv").find('input[name="password"]').next().next("span").html('<i class="mdi-action-visibility-off"></i>');
    $("#RegisterDiv").find('input[name="password"]').attr('type', 'password');

    $(".ShowHidePassword").css("display", "none");
}

function BackToServiceProvider() {

    $("#txtMembershipNumber").val("");
    $("#txtSTBNumber").val("");
    $("#txtSmartCardNumber").val("");

    $("#EnterMemSTBVC .errorMsg").css("visibility", "hidden");

    $("#BackToServiceProvider").css("display", "none");
    $("#BackToUniqueID").css("display", "block");
    $("#EnterMemSTBVC").css("display", "none");

    $("#RegSecondHead").css("display", "none");
    $("#RegFirstHead").css("display", "block");

    $("#ServiceProvider").css("display", "block");

    if ($(".RegTopRed").css("display") == "block") {
        $(".RegTopRed").css("display", "none");
    }
}

function Skip() {
    if (IsInfoClick == "STB") {

        $("#overlay").css("display", "none");

        IsInfoClick = "";

    } else {
        $("#Skip").css("display", "none");
        $("#text").css("display", "none");

        $("#Skip1").css("display", "block");
        $("#text1").css("display", "block");
    }
}

function CloseTandC() {
    $("#modal2").hide();

}

function GotIt() {

    $("#Skip1").css("display", "none");
    $("#text1").css("display", "none");

    $("#Skip").css("display", "block");
    $("#text").css("display", "block");

    $("#overlay").css("display", "none");
}

function STBIfo(val) {
    $("#overlay").css("display", "block");

    $("#Skip").css("display", "block");
    $("#text").css("display", "block");

    $("#Skip1").css("display", "none");
    $("#text1").css("display", "none");

    IsInfoClick = val;
}

function VCInfo(val) {
    $("#overlay").css("display", "block");


    $("#Skip").css("display", "none");
    $("#text").css("display", "none");

    $("#Skip1").css("display", "block");
    $("#text1").css("display", "block");

    IsInfoClick = val;
}

function SetTandC() {

    if ($("#TermsConditions").prop("checked") == true) {

        $("#RegisterNow").css("pointer-events", "all");
        $("#RegisterNow").css("background", "#1aa3ff");
        $("#RegisterMinDiv").css("cursor", "pointer");

    }
    else {

        $("#RegisterNow").css("pointer-events", "none");
        $("#RegisterNow").css("background", "#9c9c9c");
        $("#RegisterMinDiv").css("cursor", "no-drop");
    }
}

function TandCShow() {
    $("#modal2").show();
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function validation() {
    var flag = true;
    MsgType = "E";

    if ($('#txtMobileNumber').val().trim() == "") {
        CtrId = "txtMobileNumber";
        Msg = "Please Enter Mobile Number.";
        flag = false;
    }
    else if ($("#txtMobileNumber").val().trim().length != 10) {

        $("#CopyMobUserId").css("display", "none");

        CtrId = "txtMobileNumber";
        Msg = "Please Enter Valid Mobile Number.";
        flag = false;
    }
    else if ($('#txtEmail').val().trim() == "") {
        CtrId = "txtEmail";
        Msg = "Please Enter Email.";
        flag = false;
    }

    else if (isValidEmailAddress($('#txtEmail').val().trim()) == false) {
        CtrId = "txtEmail";
        Msg = "Please Enter Valid Email.";
        flag = false;
    }



    else if ($('#txtPassword').val().trim() == "") {
        CtrId = "txtPassword";
        Msg = "Please enter Password.";
        flag = false;
    }

    return flag;
}

function RegisterNow() {
    try {


        if (validation() == true) {

            if ($("#TermsConditions").prop("checked") == true) {

                $("#captcha_container").next("div").css("visibility", "hidden");

                $('.preloader-wrapper').css('display', 'block');
                //PushData('OPID', OperatorId);
                PushData('MobileNo', $('#txtMobileNumber').val().trim());
                PushData('EmailID', $('#txtEmail').val().trim());
                PushData('UserId', $('#txtMobileNumber').val().trim());
                PushData('ProviderId', ServiceProviderDataTable["Table"][0]["ProviderID"]);
                CallPublicAPI('../register.aspx/UserRegisterCheck', '', OnPassRegisterCheck, OnFailRegisterCheck);
            }
            else {
                $("#TermsConditions").next("label").css("color", "red");
            }
        }
        else {
            ErrorMsg(MsgType, Msg, CtrId);
        }

    } catch (e) {

    }


}

function OnPassRegisterCheck(result) {
    var result = JSON.parse(result.d);
    var SplitData = result["Status"];
    if (result != "") {
        if (SplitData[0] == "Fail") {
            MsgBox("E", result["Description"]);
            $('.preloader-wrapper').css('display', 'none');
        }
        else {
            var UIdType = UIdValue = "";
            if (IsCallByMCTUID == false) {
                if ($('#txtMembershipNumber').val().trim() != "") {
                    UIdType = "MMNO";
                    UIdValue = $('#txtMembershipNumber').val().trim();
                }
                else if ($('#txtSTBNumber').val().trim() != "") {
                    UIdType = "STBNO";
                    UIdValue = $('#txtSTBNumber').val().trim();
                }
                else if ($('#txtSmartCardNumber').val().trim() != "") {
                    UIdType = "VCNO";
                    UIdValue = $('#txtSmartCardNumber').val().trim();
                }
            }
            else {
                UIdType = "CustID";
                UIdValue = MCTUIDCustID;
            }


            var SelectedProviderDT = null;


            if (OPID == "") {
                SelectedProviderDT = $.grep(ServiceProviderDataTable["Table"], function (e) {
                    return e.ProviderID == $('#SelectServiceProvider').find('option:selected').val();
                });
            }
            else {
                SelectedProviderDT = $.grep(ServiceProviderDataTable["Table"], function (e) {
                    return e.OPID == OPID;
                });
            }
            $('.modal-content').removeClass('disabled');
            $('#materialize-lean-overlay-1').css('z-index', '0');
            $('#materialize-lean-overlay-1').css('display', 'none');
            $('#materialize-lean-overlay-1').css('opacity', '0');
            $('#modal5').css('display', 'none');
            $('#modal5').css('opacity', '0');
            $('#modal5').css('bottom', '-100%');
            $('#modal5').css('z-index', '0');
            PushData('SProviderID', SelectedProviderDT[0]['ProviderID']);
            PushData('UId', UIdValue);
            PushData('UIdType', UIdType);
            PushData('MobileNo', $('#txtMobileNumber').val().trim());
            PushData('EmailID', $('#txtEmail').val().trim());
            PushData('UserId', $('#txtMobileNumber').val().trim());
            PushData('Password', $('#txtPassword').val().trim());
            CallPublicAPI('../register.aspx/RegisterNow', '', OnPassRegister, OnFailRegister);
        }


    }
}


function confirmAction() {
    $(".jconfirm").css("display", "none");

    if (IsRegister == true) {
        document.location.replace('../SignIn');
    }

}
function OnFailRegisterCheck(result) {
    $('.preloader-wrapper').css('display', 'none');
}

function OnPassRegister(result) {
    var result = JSON.parse(result.d);

    $('.preloader-wrapper').css('display', 'none');

    if (result != "") {

        if (result["Status"] == "Fail") {
            MsgBox("E", result["Description"]);
            IsRegister = false;
            $('#txtTempOIP').focus();
        }
        else {

            //NewCustID = result[0]['CustomerId'];

            var MobNumber = $("#txtMobileNumber").val().trim();
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
            IsRegister = true;

            //registerSucessMsg = result[0]['Message'];

        }
    }
}

function OnFailRegister(result) {
    $('#Liteloding-wrapper').css('display', 'none');
}

function CheckRegisterOTP() {

    if ($('#txtTempOIP').val().trim() != "") {
        $('#preloader-wrapper').css('display', 'block');
        $('.modal-content').addClass('disabled');
        PushData('UserId', $('#txtMobileNumber').val().trim());
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
        $('#preloader-wrapper').css('display', 'none')
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
        $('#RegLastHead').hide();
        $('#RegisterDiv').hide();
        $("#txtMembershipNumber").val("");
        $("#txtSTBNumber").val("");
        $("#txtSmartCardNumber").val("");
        $("#SelectState").val("-1");
        $("#Citylist").val("-1");
        $("#SelectServiceProvider").val("-1");
        $("#RegFirstHead").hide();
        $("#MCTUniqueIdDiv").hide();
        $("#ServiceProvider").hide();
        $("#EnterMemSTBVC").hide();
        $("#RegSecondHead").hide();
        $("#RegLastHead").hide();
        $("#RegSecondHead").hide();
        $("#BackToSTBVC").hide();
        $("#RegisterDiv").hide();
        $(".jconfirm-content").css('text-align', 'center !important');
        BackToMCTUniqueID();
        IsRegister = true;
        NewCustID = 0;
        MsgBox("S", "Registered Successfully!");

    }
}

function OnFailVerfiyRegisterOTP(result) {
}


function ResendOTPNumber() {

    $('#preloader-wrapper').css('display', 'block');
    $('.modal-content').addClass('disabled');


    PushData('UserId', $("#txtMobileNumber").val().trim());
    CallPublicAPI('../register.aspx/ResendOTP', '', OnPassResendOTP, OnFailResendOTP);
}

function OnPassResendOTP(result) {
    var result = JSON.parse(result.d);

    if (result["Status"] == "Fail") {
        IsRegister = false;

        ErrorMsg("E", result["Description"], "txtTempOIP");

        $('#txtTempOIP').focus();

        $('.modal-content').removeClass('disabled');

        $('#preloader-wrapper').css('display', 'none');

    }
    else {

        var MobNumberResend = $("#txtMobileNumber").val().trim();
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


function DontKnowID() {
    $("#MCTUniqueId").css("display", "none");
    $("#MCTUniqueIdDiv").css("display", "none");

    $("#SelectState").val("-1");
    $("#Citylist").val("-1");
    $("#SelectServiceProvider").val("-1");
    $("#RegFirstHead").css("display", "block");
    $("#ServiceProvider").css("display", "block");
    $("#BackToUniqueID").css("display", "block");
    $('#SelectState').val("-1");
    $('#Citylist').val("-1");

    if (window.location.href.includes("https://login.paytvselfcare.tv") == false)//When url not calling from Mobile Apps
        GetProviderData();
    else
        StateList();
   
    IsCallByMCTUID = false;
}
function GetProviderData() {
    $('.preloader-wrapper').css('display', 'block');
    CallType = "Direct";
    CallPublicAPI('register.aspx/GetProviderData', '', OnPassProviderData, OnFailProviderData);
}
function OnPassProviderData(result) {
    result = result.d;
    var data = JSON.parse(result);
    if (data["Status"] == "Success") {
        localStorage.setItem("ProviderStateID", data.Description[0]["StateID"]);
        localStorage.setItem("ProviderCityID", data.Description[0]["CityID"]);
        localStorage.setItem("ProviderID", data.Description[0]["ProviderID"]);
       
    }
    StateList();
    
}
function OnFailProviderData(result) {
    $('.preloader-wrapper').css('display', 'none');
}
function StateList() {
    $('.preloader-wrapper').css('display', 'block');
   
    CallPublicAPI('register.aspx/Statelist', '', OnPassStateList, OnFailStateList);
}

function OnPassStateList(result) {
    result = result.d;
    // var Statelist = Reliable.parse(JSON.parse(result.d.split('|')[0]));
    var Statelist = JSON.parse(result);
    var State = '<option value="-1"  disabled selected >Select Your State</option>';
    var City = '<option value="-1"  disabled selected >Select Your City</option>';
    var SelectProvider = '<option value="-1" disabled="" selected="">Select Your Service Provider</option>';
    var Option = '';
    if (Statelist != "" && Statelist != null && Statelist != undefined) {
        for (var i = 0; i < Statelist.Description["Table"].length; i++) {
            Option += '<option style="color:#313131 !important" value="' + Statelist.Description["Table"][i]["StateID"] + '">' + Statelist.Description["Table"][i]["StateName"] + '</option>';
        }
    }
    var StateData = State + Option;
    $('#SelectState').html("");
    $('#SelectState').html(StateData);
    //$('#SelectState').val(DS["TABLE4"][0]["STATEID"]);
    $('#Citylist').html("");
    $('#Citylist').html(City);
    $('#SelectServiceProvider').html("");
    $('#SelectServiceProvider').html(SelectProvider);


    if (CallType == "Direct") {
        var stateid = localStorage.getItem("ProviderStateID");
       $('#SelectState').val(stateid).change();
    }
    $('.preloader-wrapper').css('display', 'none');

}
function OnFailStateList(result) {
    $('.preloader-wrapper').css('display', 'none');
}

function OnPassGetCityList(result) {
    result = result.d;
    var Citylist = JSON.parse(result);
    if (Citylist["Status"] == "Success") {
        var Option = '<option value="-1" disabled selected >Select Your City</option>';
        if (Citylist != "" && Citylist != null && Citylist != undefined) {
            for (var i = 0; i < Citylist.Description["Table"].length; i++) {
                Option += '<option style="color:#313131 !important" value="' + Citylist.Description["Table"][i]["CityID"] + '">' + Citylist.Description["Table"][i]["CityName"] + '</option>';
            }
        }
        $('.preloader-wrapper').css('display', 'none');
        $('#Citylist').html("");
        $('#Citylist').html(Option);
        if (CallType == "Direct") {
            var cityid = localStorage.getItem("ProviderCityID");
            $('#Citylist').val(cityid).change();
        }
        $('.preloader-wrapper').css('display', 'none');

    }
    else {
        $('#Citylist').val(-1);
        $('.preloader-wrapper').css('display', 'none');
        $('#Loadingbg').hide();
    }
}

function OnFailGetCityList(result) {
    $('.preloader-wrapper').css('display', 'none');
}

function OnPassProviderList(result) {

    ServiceProviderDataTable = result == "" ? "" : JSON.parse(result.d).Description;

    var Option = '<option value="-1" disabled selected>Select Your Service Provider</option>';

    if (ServiceProviderDataTable["Table"] != "" && ServiceProviderDataTable["Table"] != null && ServiceProviderDataTable["Table"] != undefined) {
        for (var i = 0; i < ServiceProviderDataTable["Table"].length; i++) {
            Option += '<option style="color:#313131 !important" value="' + ServiceProviderDataTable["Table"][i]["ProviderID"] + '">' + ServiceProviderDataTable["Table"][i]["ProviderName"] + '</option>';
        }
    }
    $("#SelectServiceProvider").html("");
    $("#SelectServiceProvider").html(Option);
    if (CallType == "Direct") {
        var ProviderID = localStorage.getItem("ProviderID");
        $('#SelectServiceProvider').val(ProviderID).change();
        SetServiceProvider();
    }
    $('.preloader-wrapper').css('display', 'none');
}

function OnFailProviderList(result) {
    $('.preloader-wrapper').css('display', 'none');
}
function GetMCTUniqueIDDetails() {
    if ($("#txtMCTUniqueId").val() != "") {
        $(".preloader-wrapper").css("display", "block");
        PushData('SubsUniqueID', $("#txtMCTUniqueId").val());
        CallWebMethod('register.aspx/GetMCTUniqueIDDetails', WebMethodData, OnPassGetMCTUniqueIDDetails, OnFailGetMCTUniqueIDDetails);
    }
    else {
        $("#txtMCTUniqueId").closest(".input-field").find(".errorMsg").html("Please enter PayTV Unique id.");
        $("#txtMCTUniqueId").closest(".input-field").find(".errorMsg").css("visibility", "visible");
    }
}

function OnPassGetMCTUniqueIDDetails(result) {
    var res = result.d;
    var Data = res.split("|");


    if (Data[0] != "E") {
        ServiceProviderDataTable = JSON.parse(Data[1]);

        OPID = parseInt(Data[2]);
        MCTUIDCustID = Data[3];

        var CustDetail = JSON.parse(Data[4]);
        $("#MCTUniqueId").css("display", "none");
        $("#MCTUniqueIdDiv").css("display", "none");

        $("#BackToSubsDetailReg").css("display", "block");

        $("#MidSubsID").html(CustDetail["NewDataSet"]["Customers"][0]["MembershipNo"]);

        var STBNO = CustDetail["NewDataSet"]["Connections"][0]["STB"];
        if (STBNO.indexOf(",") > 0)
            STBNO = STBNO.split(",")[0] + "...";

        var SmartCardNO = CustDetail["NewDataSet"]["Connections"][0]["VC"];
        if (SmartCardNO.indexOf(",") > 0)
            SmartCardNO = SmartCardNO.split(",")[0] + "...";

        $("#MidSTBNumber").html(STBNO);
        $("#MidSmartCardNum").html(SmartCardNO);
        $("#MidName").html(CustDetail["NewDataSet"]["Customers"][0]["FullName"]);

        var CustAddress = "";

        if (CustDetail["NewDataSet"]["Customers"][0]["Address1"] != "" && CustDetail["NewDataSet"]["Customers"][0]["Address1"] != null)
            CustAddress += CustDetail["NewDataSet"]["Customers"][0]["Address1"] + ", ";
        else
            CustAddress += "";
        if (CustDetail["NewDataSet"]["Customers"][0]["Address2"] != "" && CustDetail["NewDataSet"]["Customers"][0]["Address2"] != null)
            CustAddress += CustDetail["NewDataSet"]["Customers"][0]["Address2"] + ", ";
        else
            CustAddress += "";
        if (CustDetail["NewDataSet"]["Customers"][0]["Address3"] != "" && CustDetail["NewDataSet"]["Customers"][0]["Address3"] != null)
            CustAddress += CustDetail["NewDataSet"]["Customers"][0]["Address3"] + ", ";
        else
            CustAddress += "";
        if (CustDetail["NewDataSet"]["Customers"][0]["CITYName"] != "" && CustDetail["NewDataSet"]["Customers"][0]["CITYName"] != null)
            CustAddress += CustDetail["NewDataSet"]["Customers"][0]["CITYName"] + ", ";
        else
            CustAddress += "";
        if (CustDetail["NewDataSet"]["Customers"][0]["STATEName"] != "" && CustDetail["NewDataSet"]["Customers"][0]["STATEName"] != null)
            CustAddress += CustDetail["NewDataSet"]["Customers"][0]["STATEName"];
        else
            CustAddress += "";


        $("#MidAddress").html(CustAddress);

        $("#RegSubsDetailHead").css("display", "block");

        $("#MCTUidCustDetail").css("display", "block");

        IsCallByMCTUID = true;

        $(".preloader-wrapper").css("display", "none");
    }
    else {
        $(".preloader-wrapper").css("display", "none");
        $("#txtMCTUniqueId").closest(".input-field").find(".errorMsg").html(Data[1]);
        $("#txtMCTUniqueId").closest(".input-field").find(".errorMsg").css("visibility", "visible");
    }
}

function OnFailGetMCTUniqueIDDetails(result) {
    var res = result.d;
}
function ContinueToReg() {

    $("#RegSubsDetailHead").css("display", "none");
    $("#MCTUidCustDetail").css("display", "none");
    $("#BackToSubsDetailReg").css("display", "none");

    $("#txtEmail").val("");
    $("#txtMobileNumber").val("");
    $("#txtPassword").val("");

    $("#RegisterDiv .input-field").find(".errorMsg").css("visibility", "hidden");

    $("#RegisterDiv .input-field").find("i").removeClass("active");
    $("#RegisterDiv .input-field").find("label").removeClass("active");
    $("#TermsConditions").prop("checked", false);

    $("#BackToMCTUIDLast").css("display", "block");
    $("#RegLastHead").css("display", "block");
    $("#RegisterDiv").css("display", "block");
}
function BackToMCTUIDSec() {

    $("#RegSubsDetailHead").css("display", "none");
    $("#MCTUidCustDetail").css("display", "none");
    $("#BackToSubsDetailReg").css("display", "none");

    $("#MCTUniqueId").css("display", "block");
    $("#MCTUniqueIdDiv").css("display", "block");

    MCTUIDCustID = 0;
    OPID = "";
    IsCallByMCTUID = false;

}


function BackToSubsDetail() {
    $("#RegLastHead").css("display", "none");
    $("#RegisterDiv").css("display", "none");
    $("#BackToMCTUIDLast").css("display", "none");

    $("#RegSubsDetailHead").css("display", "block");
    $("#MCTUidCustDetail").css("display", "block");
    $("#BackToSubsDetailReg").css("display", "block");
}



$(document).ready(function () {
    //var OpratorID = "PayTv";

    $('.preloader-wrapper').css('display', 'none');
    $("#SelectState").on('change', function () {
        $('.preloader-wrapper').css('display', 'block');
        $('.errorMsg').css('visibility', 'hidden');
        PushData('StateId', $(this).val());
        //PushData('OPID', OperatorId)
        CallPublicAPI('register.aspx/GetCityList', '', OnPassGetCityList, OnFailGetCityList);
    });

    $("#Citylist").on('change', function () {
        $('.preloader-wrapper').css('display', 'block');
        $('.errorMsg').css('visibility', 'hidden ');
        PushData('CityID', $(this).val());
        //PushData('OPID', OperatorId)
        CallPublicAPI('register.aspx/GetProviderList', '', OnPassProviderList, OnFailProviderList);
    });

    $("#txtMobileNumber").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $("#txtMCTUniqueId").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $("#txtTempOIP").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $("#txtMCTUniqueId").val("");

    $('#txtMobileNumber').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $("#TermsConditions").on('change', function () {
        if ($(this).prop("checked") == true) {
            $("#TermsConditions").next("label").css("color", "#fff");
        }
    });
});
