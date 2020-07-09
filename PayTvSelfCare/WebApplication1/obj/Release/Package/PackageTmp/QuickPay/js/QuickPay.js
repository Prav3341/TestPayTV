var IsCallByMobileApp = false;
var Reliable = new Array();
var WebMethodData = new Array();
var OPID = ""
var IOSLogInData = "";
var ISMAMB = false;
var ISSTB = false;
var ISSMART = false;
var SubsDetails = ""
var IsPrepaid = "";
var IsBillGen = false;
var MinimumAmount = "";
var CableOPId = "";
var Amount = 0;
var CompID = "";
var MCTDetails = false;
var DebitNot = false;
var Arraynewpass = '1234567890abcdefghijklmnopqrstuvwxyzABCBEFGHIJKLMNOPQRSTUVWXYZ';
function DontKnowID() {
    $(".IDStep .sk-fading-circle").css("display", "block");
    $(".Step2Error").css("visibility", "hidden");
    $(".Step2Error").val(" ");
    GetProviderData();
}
function GetProviderData() {
    $(".IDStep .sk-fading-circle").css("display", "block");
    CallType = "Direct";
    CallPublicAPI('../login.aspx/GetProviderData', '', OnPassProviderData, OnFailProviderData);
}
function OnPassProviderData(result) {
    result = result.d;
    var data = JSON.parse(result);
    if (data["Status"] == "Success") {
        localStorage.setItem("ProviderStateID", data.Description[0]["StateID"]);
        localStorage.setItem("ProviderCityID", data.Description[0]["CityID"]);
        localStorage.setItem("ProviderID", data.Description[0]["ProviderID"]);
        localStorage.setItem("OpratorID", data.Description[0]["Operator ID"]);
        localStorage.setItem("Paylimit", data.Description[0]["Paylimit"]);
        CableOPId = data.Description[0]["OPID"];
    }
    else {
        $('.Step2Error').css("visibility", "visible")
        $(".Step2Error").html("Something went wrong please try again later !!");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
    if (MCTDetails == false) {
        StateList();
    }


}
function OnFailProviderData() {
    $('.Step2Error').css("visibility", "visible")
    $(".Step2Error").html("Something went wrong please try again later !!");
    $(".IDStep .sk-fading-circle").css("display", "none");
}
function StateList() {
    $(".IDStep .sk-fading-circle").css("display", "block");
    CallPublicAPI('../login.aspx/ProStatelist', '', OnPassStateList, OnFailStateList);
}
function OnPassStateList(result) {
    result = result.d;
    // var Statelist = Reliable.parse(JSON.parse(result.d.split('|')[0]));
    var Statelist = JSON.parse(result);
    if (Statelist["Status"] == "Success") {
        var Selected = Statelist["Description"]["Table"][0]["StateID"];
        var State = '<option value="-1"  disabled selected >Select Your State</option>';
        var City = '<option value="-1"  disabled selected >Select Your City</option>';
        var LCO = '<option value="-1"  disabled selected >Select Your Service Provider</option>';
        var Option = '';
        if (Statelist != "" && Statelist != null && Statelist != undefined) {
            for (var i = 0; i < Statelist.Description.Table.length; i++) {
                Option += '<option value="' + Statelist.Description.Table[i]["StateID"] + '">' + Statelist.Description.Table[i]["StateName"] + '</option>';
            }

        }
        var StateData = State + Option;

        $('#SelectState').html("");

        $('#SelectState').html(StateData);
        //$('#SelectState').val(Selected);
        //$('#SelectState').val(DS["TABLE4"][0]["STATEID"]);
        $('#SelectCity').html("");
        $('#SelectCity').html(City);
        $('#SelectServiceProvider').html("");
        $('#SelectServiceProvider').html(LCO);

        if (City > 0 && City !== '') {
            $('#Edit_Citylist').html(City);
        }
        if (CallType == "Direct") {
            var stateid = localStorage.getItem("ProviderStateID");
            $('#SelectState').val(stateid).change();
        }
        $(".IDStep").css("display", "none");
        $(".step-1").css("display", "block");

        //$(".step-1 .clsContinue").css("visibility", "hidden");
        $(".step-1 .sk-fading-circle").css("display", "none");
    }
    else {
        $('.Step2Error').css("visibility", "visible")
        $(".Step2Error").html("Something went wrong please try again later !!");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }

}

function OnFailStateList(result) {
    $('.Step2Error').css("visibility", "visible")
    $(".Step2Error").html("Something went wrong please try again later !!");
    $(".IDStep .sk-fading-circle").css("display", "none");
}
function OnPassGetCityList(result) {
    result = result.d;
    var Citylist = JSON.parse(result);
    if (Citylist["Status"] == "Success") {
        var Option = '<option value="-1" disabled selected >Select Your City</option>';
        if (Citylist != "" && Citylist != null && Citylist != undefined) {
            for (var i = 0; i < Citylist.Description.Table.length; i++) {
                Option += '<option value="' + Citylist.Description.Table[i]["CityID"] + '">' + Citylist.Description.Table[i]["CityName"] + '</option>';
            }
        }
        $('#SelectCity').html("");
        $('#SelectCity').html(Option);
        if (CallType == "Direct") {
            var cityid = localStorage.getItem("ProviderCityID");
            $('#SelectCity').val(cityid).change();
        }
        $(".step-1 .sk-fading-circle").css("display", "none");
    }
    else {
        $('#SelectCity').val(-1);
        $(".step-1 .sk-fading-circle").css("display", "none");
        $('.Step2Error').css("visibility", "visible")
        $(".Step2Error").html("Something went wrong please try again later !!");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
}

function OnFailGetCityList(result) {
    $(".step-1 .sk-fading-circle").css("display", "none");
    $('.Step2Error').css("visibility", "visible")
    $(".Step2Error").html("Something went wrong please try again later !!");
    $(".IDStep .sk-fading-circle").css("display", "none");
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
    $(".step-1 .sk-fading-circle").css("display", "none");

}

function OnFailProviderList(result) {
    $(".step-1 .sk-fading-circle").css("display", "none");
    $('.Step2Error').css("visibility", "visible")
    $(".Step2Error").html("Something went wrong please try again later !!");
    $(".IDStep .sk-fading-circle").css("display", "none");
}

function ContinueStep1() {
    $(".step-1").css("display", "none");

    $("#txtSubsID").val("");
    $("#txtSTB").val("");
    $("#txtSmartCard").val("");

}

function SetServiceProvider() {
    if ($('#SelectState option:selected').val() != "-1") {
        if ($('#SelectCity option:selected').val() != "-1") {
            if ($('#SelectServiceProvider option:selected').val() != "-1") {
                $(".step-1").css("display", "none");
                $("#txtSubsID").val("");
                $("#txtSTB").val("");
                $("#txtSmartCard").val("");
                $(".step-1 .clsContinue").css("visibility", "visible");
                $(".step-2 .clsContinue").css("visibility", "visible");
                $(".step-2").css("display", "block");
                $('.Step1Error').css('visibility', 'hidden');
                $('.step-1 .sk-fading-circle').hide();
            }
            else {
                //ErrorMsg("E", "Select Your Service Provider First.", "SelectServiceProvider");
                $('.Step1Error').html("Select Your Service Provider First.");
                $('.Step1Error').css('visibility', 'visible');
            }
        }
        else {
            //ErrorMsg("E", "Select Your City First.", "Citylist");
            $('.Step1Error').html("Select Your City First.");
            $('.Step1Error').css('visibility', 'visible');
        }
    }
    else {
        //ErrorMsg("E", "Select Your State First.", "SelectState");
        $('.Step1Error').html("Select Your State First.");
        $('.Step1Error').css('visibility', 'visible');
    }

}
function checkDetails() {
    if ($("#txtSTB").val().trim() != "" || $("#txtSmartCard").val().trim() != "") {

        $(".step-2 .sk-fading-circle").css("display", "block");

        var UIdValue = "";
        ISVC = false;
        if ($('#txtSTB').val().trim() != "") {
            ISSMART = false;
            ISSTB = true;
            UIdValue = $('#txtSTB').val().trim();
        }
        else if ($('#txtSmartCard').val().trim() != "") {
            ISSMART = true;
            ISSTB = false;
            ISVC = true
            UIdValue = $('#txtSmartCard').val().trim();
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
        CallPublicAPI('../login.aspx/SubscriberAuthenticate', '', OnPassRegisterMemSTBVCCheck, OnFailRegisterMemSTBVCCheck);

    }
    else {
        $(".Step2Error").html("Please fill any one of the field.");
        $(".Step2Error").css("visibility", "visible");
    }

}
function OnPassRegisterMemSTBVCCheck(result) {
    var result = JSON.parse(result.d);
    var SplitData = result["Status"].split("|");

    $(".step-2 .sk-fading-circle").css("display", "none");

    if (SplitData == "Fail") {

        if (ISMAMB == true) {
            $(".Step2Error").html("Please enter valid Mambership Number.");
            $(".Step2Error").css("visibility", "visible");
            $("#txtMembershipNumber").focus();
        }
        else if (ISSTB == true) {
            $(".Step2Error").html("Please enter valid STB Number.");
            $(".Step2Error").css("visibility", "visible");
            $("#txtSTBNumber").focus();
        }
        else if (ISSMART == true) {
            $(".Step2Error").html("Please enter valid SmartCard Number.");
            $(".Step2Error").css("visibility", "visible");
            $("#txtSmartCardNumber").focus();
        }
        else {
            $(".Step2Error").html("");
            $(".Step2Error").css("visibility", "hidden");
        }
    }
    else {
        SubsUniqId = result.Description[0]["SubsuniqueID"];
        PushData('OPID', 'GetfromWebConfig');
        PushData('SubsUniqueID', SubsUniqId);
        CallPublicAPI('../login.aspx/CustDetailsForPay', WebMethodData, OnPassGetMCTUniqueIDDetails, OnFailGetMCTUniqueIDDetails);
    }
}

function OnFailRegisterMemSTBVCCheck(result) {

}

function BackWork() {
    $('#ExtraText').show();
    $('#coformation').css('visibility', 'hidden');
    $('#ConfirmPayDiv').css('pointer-events', 'none');
}

function BackWorkPayMode() {
    $('#ExtraText').hide();
    $('#paymnetMobilenumber').css('pointer-events', 'all');
    $('#PayMentEmaiId').css('pointer-events', 'all');
    $('#PayModeDiv').css('pointer-events', 'none');
}



function GetCustDetails() {
    if ($("#MCTNO").val() != "") {
        if ($("#MCTNO").val().length == 14) {
            $(".IDStep .sk-fading-circle").css("display", "block");
            var SubsUniqId = $('#MCTNO').val();
            //PushData('OPID', 'GetfromWebConfig');
            PushData('SubsUniqueID', SubsUniqId);
            PushData('CallBy', 'QuickPay');
            CallPublicAPI('../login.aspx/GetMCTUniqueIDDetails', WebMethodData, OnPassGetMCTUniqueID, OnFailGetMCTUniqueID);
        }
        else {
            $(".IDStep .Step2Error").html("Please enter your 14 digit PayTV Unique id.");
            $(".IDStep .Step2Error").css("visibility", "visible");
            $(".IDStep .sk-fading-circle").css("display", "none");
        }
    }
    else {
        $(".IDStep .Step2Error").html("Please enter PayTV Unique id.");
        $(".IDStep .Step2Error").css("visibility", "visible");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
}

function OnPassGetMCTUniqueID(result) {
    var res = result.d;
    UniqId = JSON.parse(res);
    if (UniqId.Status == "Success") {
        MCTDetails = true;
        GetProviderData()

        var SubsUniqId = $('#MCTNO').val();
        PushData('OPID', 'GetfromWebConfig');
        PushData('SubsUniqueID', SubsUniqId);
        CallPublicAPI('../login.aspx/CustDetailsForPay', WebMethodData, OnPassGetMCTUniqueIDDetails, OnFailGetMCTUniqueIDDetails);
    }
    else {
        $(".IDStep .Step2Error").html(UniqId["Description"]);
        $(".IDStep .Step2Error").css("visibility", "visible");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
}

function OnFailGetMCTUniqueID(result) {
    $(".IDStep .Step2Error").html("Something went wrong please try again later !!");
    $(".IDStep .Step2Error").css("visibility", "visible");
    $(".IDStep .sk-fading-circle").css("display", "none");
}

function OnPassGetMCTUniqueIDDetails(result) {
    try {
        var res = result.d.split("|");
        SubsDetails = JSON.parse(res);
        if (SubsDetails["Status"] == "Success") {
            $("#SubsCriID").html(SubsDetails["Description"][0]["MemShipNo"]);
            $("#STBNo").html(SubsDetails["Description"][0]["StbID"]);
            $("#SmartCardNo").html(SubsDetails["Description"][0]["SmartCard"]);
            $("#SubsName").html(SubsDetails["Description"][0]["CustomerName"]);
            $("#SbsMobileNumber").html(SubsDetails["Description"][0]["RegContactNumber"]);
            $("#SbsEmailid").html(SubsDetails["Description"][0]["EmailAdd"]);
            $("#ExpiryDate").html(SubsDetails["Description"][0]["DueDate"]);


            $("#paymnetMobilenumber").val(SubsDetails["Description"][0]["MyCableTVMobileNo"]);
            $("#PayMentEmaiId").val(SubsDetails["Description"][0]["MyCableTVEmailID"]);
            $("#CompanyName").html(SubsDetails["Description"][0]["Company"]);
            $("#Totalconnection").html(SubsDetails["Description"][0]["NoOfActiveCon"]);
            if (SubsDetails["Description"][0]["IsRegister"] == 0) {
                $('#RegisterPayTv').css('display', 'block');
                $('#ErrorTextEx').css('display', 'block');

            }
            IsPrepaid = SubsDetails["Description"][0]["SubsTypeName"];
            IsBillGen = SubsDetails["Description"][0]["IsInvoice"];

            Amount = SubsDetails["Description"][0]["RequBal"];

            //Amount = SubsDetails["Description"][0]["RequBal"];

            //$("#txtPaymentAmount").val(SubsDetails["Description"][0]["RequBal"]);
            //$("#Amount").html(SubsDetails["Description"][0]["RequBal"]);

            var BillAmountColor = "";

            if (Amount == "" || Amount == undefined)
                Amount = 0;
            else
                Amount = Amount;

            if (Amount <= 0) {
                Cr = "Cr";
                BillAmountColor = "#28a021";
                $("#AmountType").html("Current Balance");
                $("#PayNowBtn").html("Add Money");
            }
            else {
                Cr = "Dr";
                BillAmountColor = "#ff0000";
                DebitNot = true;
                $("#PayNowBtn").html("Pay Now");
            }

            $("#DueAmount").css("color", BillAmountColor);
            $('#DueAmount').html('<i class="fa fa-inr"></i>&nbsp;' + ((Amount).toFixed(2)).replace("-", "") + '&nbsp;' + Cr);

            GetPayment();
        }
        else {
            $(".Step2Error").html("Something went wrong please try again later !!");
            $(".Step2Error").css("visibility", "visible");
            $(".IDStep .sk-fading-circle").css("display", "none");
        }
    }
    catch (e) {
        $(".Step2Error").html("Something went wrong please try again later !!");
        $(".Step2Error").css("visibility", "visible");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
}
function OnFailGetMCTUniqueIDDetails(result) {
    $(".Step2Error").html("Something went wrong please try again later !!");
    $(".Step2Error").css("visibility", "visible");
    $(".IDStep .sk-fading-circle").css("display", "none");
}

/*Payment Work*/

/* Step 1 */
function GetPayment() {
    try {
        //var OPIDS = localStorage.getItem("OpratorID");
        CompID = SubsDetails["Description"][0]["CompID"];
        //var CableOpId = localStorage.getItem("ProviderID");
        //SubsDetails.NewDataSet["Connections"][0]["CustomerID"]
        PushData('opId', 'GetfromWebConfig');//OpratorDetails .Table[1]["OPID"]);
        //PushData('cabelOpId', CableOPId);//OpratorDetails.Table[1]["CableOperatorID"]
        PushData('CompID', CompID);//OpratorDetails .Table[1]["CompanyID"]
        CallWebMethod('../login.aspx/GetPaymentGateway', WebMethodData, OnPassGetPaymentGateway, OnFailGetPaymentGateway);
    }
    catch (e) {
        $(".Step2Error").html("Something went wrong please try again later !!");
        $(".Step2Error").css("visibility", "visible");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
}
var PGCompID = 0;
/* Step 1 */
function OnPassGetPaymentGateway(result) {
    var res = result.d.split("|");
    if (res[0] == "S") {
        try {
            var PGType = JSON.parse(res[1]);
            var Option = '';
            var validatecount = PGType.length;
            //for (var i = 0; i < PGType.length; i++) {
            //    if (PGType[i]["IsPaymentPermit"] == 'true') {
            //        validatecount = validatecount + 1;
            //        Option += '<option value="' + PGType[i]["PGID"] + '">' + PGType[i]["PaymentGateway"] + '</option>';
            //    }
            //}
            //$("#drpPG").html("");
            //$("#drpPG").append(Option);
            //$('#drpPG   option:eq(0)').prop('selected', true);
            $("#HDFCBtn").prop("checked", true);
            if (validatecount == 2) {
                $(".HDFCDiv").show();
                $(".PayUDiv").show();
                $("#HDFCBtn").prop("checked", true);
            }
            else {
                if (PGType[0]["PGName"] == "HDFC") {
                    $(".HDFCDiv").show();
                    $("#HDFCBtn").prop("checked", true);
                }
                else if (PGType[0]["PGName"] == "PayUmoney") {
                    $(".PayUDiv").show();
                    $("#PayUBtn").prop("checked", true);
                }
            }
            if (validatecount == 0)
                $('.MobileviewMain').closest('.s12').css('display', 'none');
            else
                $('.MobileviewMain').closest('.s12').css('display', 'block');

            if (validatecount == 0 && PGType[0]["IsPaymentPermit"] == 'false' && (PGType[0]["PGID"] == "4" || PGType[0]["PGID"] == "9")) {
                //MsgBox("E", "Online Payment service is not available at this moment. Please contact to your Service Provider");
                $(".Step2Error").html("Online Payment service is not available at this moment. Please contact to your Service Provider");
                $(".Step2Error").css("visibility", "visible");
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
            $(".IDStep .sk-fading-circle").css("display", "none");
        }
        //MsgBox('E', "Online Payment service is not available at this moment. Please contact to your Service Provider")
        $(".Step2Error").html("Online Payment service is not available at this moment. Please contact to your Service Provider");
        $(".Step2Error").css("visibility", "visible");
        $(".IDStep .sk-fading-circle").css("display", "none");
    }
}

function OnFailGetPaymentGateway(result) {
    var res = result.d.split("|");
    //MsgBox("E", res[1]);
    $(".Step2Error").html(res[1]);
    $(".Step2Error").css("visibility", "visible");
    $(".IDStep .sk-fading-circle").css("display", "none");
}

function BindPaymentgateWay() {


    $('#PayTVPayment li input[type="text"]').removeClass("invalid");
    $("#PayTVPayment li").removeClass("wrong");
    $(".invalid").css("display", "none");
    $("#PayTVPayment li").removeClass("active");
    $("#PayTVPayment li").removeClass("done");
    $("#PayTVPayment .step-content").css("display", "none");
    $(".QuickPayMain").hide();
    $(".PaymentSubsDetails").show();
    $(".PaymentMode .svg").css("display", "none");
    $(".PaymentMode .selPayMode").attr("data-ispaymode", "false");
    $(".IDStep .sk-fading-circle").css("display", "none");
    $(".PaymentMode:first .svg").css("display", "block");
    $(".PaymentMode:first .selPayMode").attr("data-ispaymode", "true");

    /*Set Payment Details*/
    var Cr = "";

    if (IsPrepaid == "PrePaid") {
        if (Amount == "" || Amount == undefined)
            SetAmount = 0;
        else
            SetAmount = Amount;

    }
    else {

        Cr = "";

        if (IsBillGen == true) {
            SetAmount = Amount;
        }
        else {
            SetAmount = Amount;
        }

        if (Amount == "" || Amount == undefined)
            SetAmount = 0;
        else
            SetAmount = SetAmount;
    }

    $(".wait-feedback").remove();
    $("#PayTVPayment li").removeClass("feedbacking ");
    $("#txtPaymentAmount").val("");

    if (localStorage.getItem("Paylimit") == "" || localStorage.getItem("Paylimit") == 0) {
        $("#txtPaymentAmount").closest(".input-field").find('label[for="txtPaymentAmount"]').removeAttr("style");
        $("#txtPaymentAmount").closest(".input-field").removeAttr("style");
        $("#PayTVPayment li:first").css("display", "none");
        $("#PayTVPayment").find("li:nth-of-type(2)").addClass("active");
        $("#PayTVPayment").find("li:nth-of-type(2)").css("display", "block");
        $("#PayTVPayment").find("li:nth-of-type(2) .step-content").css("display", "block");
        $("#PayTVPayment").find("li:nth-of-type(2) .previous-step").css("display", "none");


    }
    else {
        $("#PayTVPayment li:first").addClass("active");
        $("#PayTVPayment li:first").css("display", "block");
        $("#PayTVPayment li:first").find(".step-content").css("display", "block");

        $("#txtPaymentAmount").closest(".input-field").find('label[for="txtPaymentAmount"]').css("display", "none");
        $("#txtPaymentAmount").closest(".input-field").css("margin-top", "18px");

        MinimumAmount = localStorage.getItem("Paylimit");
        $("#txtPaymentAmount").attr("placeholder", "Min. Amount " + MinimumAmount + " /-");
        $("#txtPaymentAmount").attr("data-paylimit", localStorage.getItem("Paylimit"));

        if (SetAmount > 0)
            $("#txtPaymentAmount").val(SetAmount.toFixed(2));
    }

    if (localStorage.getItem("Paylimit") == "" || localStorage.getItem("Paylimit") == 0)
        setIsPayDueAmtLimit = false;
    else
        setIsPayDueAmtLimit = true;

    PrevStep = BackStep = "";

    //$("body").addClass("overflow");

    $('#materialize-lean-overlay-2').css('z-index', '1002');
    $('#materialize-lean-overlay-2').css('display', 'block');
    $('#materialize-lean-overlay-2').css('opacity', '1');

    $('#modal1').css('z-index', '1003');
    $('#modal1').css('display', 'block');
    $('#modal1').css('opacity', '1');
    $('#modal1').css('transform', 'scaleX(1)');
    $('#modal1').css('top', '10%');

    $("#paymnetMobilenumber").focus();

}

function SetPaymentMode(ctrl) {

    $(".PaymentMode .svg").css("display", "none");
    $(ctrl).find(".svg").css("display", "block");

    $(".PaymentMode .selPayMode").attr("data-ispaymode", "false");
    $(ctrl).find(".selPayMode").attr("data-ispaymode", "true");

}
function ValidateDetails() {
    var flag = true;
    if ($("#paymnetMobilenumber").val().trim() == "") {
        $("#MobileNoError").html("Please Enter Mobile Number.");
        $("#MobileNoError").css('visibility', 'visible');
        $('#MobileNoError').show();
        flag = false;
    }
    else if (($('#paymnetMobilenumber').val().trim().length != 10)) {
        $("#MobileNoError").html("Please Enter Valid Mobile Number.");
        $("#MobileNoError").css('visibility', 'visible');
        $('#MobileNoError').show();
        flag = false;

    }
    else if ($("#PayMentEmaiId").val().trim() == "") {
        $("#EmailIdError").html("Please Enter Email ID.");
        $("#EmailIdError").css('visibility', 'visible');
        $('#EmailIdError').show();
        flag = false;
    }

    else if (isValidEmailAddress($('#PayMentEmaiId').val().trim()) == false) {
        //CtrId = "txtEmailID";
        $("#EmailIdError").html("Please Enter Valid Email ID.");
        $("#EmailIdError").css('visibility', 'visible');
        $('#EmailIdError').show();
        flag = false;
    }
    return flag
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
/* Step 2 */
function CountinuePayMode() {
    //ValidateDetails();
    if (ValidateDetails() == true) {
        var flag = true;
        if ($("#txtPaymentAmount").val() == "") {
            $(".invalid").html("Please enter amount.");
            active.removeClass('done').addClass('wrong'); paymnetMobilenumber
            $(".validate").removeClass('valid').addClass('invalid');
            $("#ErrorTextEx").show();
            $(".invalid").css("display", "block");
            flag = false;
        }
        if ($("#drpPG").val() == "" || $("#drpPG").data('value') == "") {
            $("#PG-error").css("display", "block");
            active.removeClass('done').addClass('wrong');
            $(".validate").removeClass('valid').addClass('invalid');
            $("#ErrorTextEx").show();
            flag = false;
        }
        if (DebitNot == true) {
            if ($("#txtPaymentAmount").val() < Amount) {
                $(".invalid").html("Please enter Minimum Amount " + Amount + "/-");
                active.removeClass('done').addClass('wrong');
                $(".validate").removeClass('valid').addClass('invalid');
                $(".invalid").css("display", "block");
                $("#ErrorTextEx").show();
                flag = false;
            }
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
                if (parseFloat($("#txtPaymentAmount").val() == "" ? 0 : $("#txtPaymentAmount").val()) < parseFloat(Amount)) {
                    $(".invalid").html("Please enter Minimum Amount " + Amount + "/-");
                    active.removeClass('done').addClass('wrong');
                    $(".validate").removeClass('valid').addClass('invalid');
                    $(".invalid").css("display", "block");
                    flag = false;
                }
            }

        }
    }

    if (flag == true && ValidateDetails() == true) {
        stepper.activateFeedback();
        stepper.openStep(next);
        stepper.trigger('nextstep');
        active.removeClass('wrong').addClass('done');
        try {
            $('.cover-spin').show();
            //$('#Loadingbg').css('display', 'block');
            var PGID = $("[name='PaymentGaetway']:checked").val();
            PushData('opId', 'GetfromWebConfig');
            PushData('PGID', PGID);
            CallWebMethod('../login.aspx/GetPayMode', WebMethodData, OnPassPayMode, OnFailPayMode);
        }
        catch (e) {
            $('#ErrorText').html("Something went wrong, please contact with your Provider !");
            $('.ErrorShowMian').show();
            $('.cover-spin').hide();
        }

    }
}

function OnPassPayMode(result) {
    var res = result.d.split("|");
    var RecomondedPack = "";
    
    if (res[0] == "S") {
        try {
            $('#ExtraText').show();
            $('#PayModeDiv').css('pointer-events', 'all');
            var CardType = JSON.parse(res[1]);
            var Card = '';
            var css = '';
            for (var i = 0; i < CardType.length; i++) {
                if (CardType[i]["CardName"] == "UPI" || CardType[i]["CardName"] == ["Wallet"]) {
                    RecomondedPack = '<p class="Reccomended">Recommended</p>';
                }
                else { RecomondedPack = "" }
                if (CardType[i]["CardName"] == "Net Banking") {
                    css = 'margin-top: 4px;';
                }
                else {
                    css = ""
                }
                Card += '<div class="col s12 PaymentMode" onclick="javascript:SetPaymentMode(this); return false;">' +
                    RecomondedPack +
                                 '<a href="javascript:void(0);" class="selPayMode" data-cardtype="' + CardType[i]["ShortCode"] + '" data-ispaymode="false" data-cardtypeid="' + CardType[i]["CardTypeID"] + '"><img style="' + css + '" src="' + CardType[i]["IconURL"] + '" class="responsive PaymntImmg" />&nbsp;<div class="clear"></div>' + CardType[i]["CardName"] + '</a>' +
                                            '<div class="svg" style="display: none;">' +
                                                '<img src="images/donemsg.gif" />' +
                                            '</div>' +
                                            '<div class="clear"></div>' +
                                        '</div>';
            }
            Card = Card.replace("Wallet", "UPI");// To replace only text of Wallet to Upi on frontEnd 13 apr-2020
            $("#PayMode").html(Card);
            $('#paymnetMobilenumber').css('pointer-events', 'none');
            $('#PayMentEmaiId').css('pointer-events', 'none');
            $('#PaymentAmount-error').hide();
            $(".PaymentMode:first .svg").css("display", "block");
            $(".PaymentMode:first .selPayMode").attr("data-ispaymode", "true");


        }
        catch (e) {
           
        }
    }
    else {

        //MsgBox("E", res[1]);
        //$('#PaymentError').html(res[1]);
        //$('#PaymentError').show();
        $('#ErrorText').html(res[1]);
        $('.ErrorShowMian').show();
        $('.cover-spin').hide();
    }
    $('.cover-spin').hide();
}


//for image
//function OnPassPayMode(result) {
//    var res = result.d.split("|");

//    if (res[0] == "S") {
//        try {
//            var CardType = JSON.parse(res[1]);
//            var Card = '';
//            for (var i = 0; i < CardType.length; i++) {
//                Card += '<div class="col s12 PaymentMode" onclick="javascript:SetPaymentMode(this); return false;">' +
//                                            '<a href="javascript:void(0);" class="selPayMode" data-cardtype="' + CardType[i]["ShortCode"] + '" data-ispaymode="false" data-cardtypeid="' + CardType[i]["CardTypeID"] +
//                                            '"><img  src="' + CardType[i]["IconURL"] + '" height="10" width="4" ></img>&nbsp;' + CardType[i]["CardName"] + '</a>' +
//                                            '<div class="svg" style="display: none;">' +
//                                                '<svg width="26" height="26" viewBox="-263.5 236.5 26 26">' +
//                                                    '<g class="svg-success">' +
//                                                        '<circle cx="-250.5" cy="249.5" r="12"></circle>' +
//                                                        '<path d="M-256.46 249.65l3.9 3.74 8.02-7.8"></path>' +
//                                                    '</g>' +
//                                                '</svg>' +
//                                            '</div>' +
//                                            '<div class="clear"></div>' +
//                                        '</div>';
//            }
//            Card = Card.replace("Wallet", "UPI");// To replace only text of Wallet to Upi on frontEnd 13 apr-2020
//            $("#PayMode").html(Card);
//            $('#paymnetMobilenumber').css('pointer-events', 'none');
//            $('#PayMentEmaiId').css('pointer-events', 'none');
//            $('#PaymentAmount-error').hide();
//            $(".PaymentMode:first .svg").css("display", "block");
//            $(".PaymentMode:first .selPayMode").attr("data-ispaymode", "true");

//        }
//        catch (e) {
//        }
//    }
//    else {

//        //MsgBox("E", res[1]);
//        $('#PaymentError').html(res[1]);
//        $('#PaymentError').show();
//    }
//    $('#Loadingbg').css('display', 'none');
//}

function OnFailPayMode(result) {
    var res = result.d.split("|");
    //MsgBox("E", res[1]);

    $('#ErrorText').html(res[1]);
    $('.ErrorShowMian').show();
}

function GetPaymentDetails() {

    try {
        if (ValidateDetails() == true) {
            $('.cover-spin').show();
            stepper.activateFeedback();
            var PayAmt = 0;
            if (localStorage.getItem("Paylimit") == "" || localStorage.getItem("Paylimit") == 0)
                PayAmt = SetAmount;
            else
                PayAmt = $("#txtPaymentAmount").val();
            var PGID = $("[name='PaymentGaetway']:checked").val();
            PushData('OPID', 'GetfromWebConfig');
            PushData('PayAmount', PayAmt);
            PushData('CardType', $('.selPayMode[data-ispaymode="true"]').data("cardtype"));
            PushData('PGID', PGID);
            PushData('CompID', CompID);
            CallWebMethod('../login.aspx/GetPaymentDetails', WebMethodData, OnPassGetPaymentDetails, OnFailGetPaymentDetails);
        }

    } catch (e) {
        //$('#PaymentError').html("Something went wrong, please contact with your Provider !");
        //$('#PaymentError').show();
        $('#ErrorText').html("Something went wrong, please contact with your Provider !");
        $('.ErrorShowMian').show();
        $('.cover-spin').hide();
    }
}

function OnPassGetPaymentDetails(result) {
    var res = result.d.split("|");
    if (res[0] == "S") {
        try {
            $('#ExtraText').hide();
            var PayData = JSON.parse(res[1]);
            $('#coformation').css('visibility', 'visible');
            $("#SubsPaymentAmount").html("Rs.&nbsp;" + PayData[0]["PaymentAmt"].toFixed(2));
            $('.step-content [data-discount="discount"]').addClass("hide");
            $("#ConvenienceFee").html("Rs.&nbsp;" + PayData[0]["ConvenienceFee"].toFixed(2));
            $('.step-content [data-inc="Inc"]').removeClass("hide");
            $("#PayableAmount").html("Rs.&nbsp;" + PayData[0]["PayableAmt"].toFixed(2));
            $('#ConfirmPayDiv').css('pointer-events', 'all');
            //$("#coformation").show();
            stepper.openStep(next);
            stepper.trigger('nextstep');
            active.removeClass('wrong').addClass('done');

        } catch (e) {
            //MsgBox('E', "Something went wrong, please contact with your Provider !");
            $('#ErrorText').html("Something went wrong, please contact with your Provider !");
            $('.ErrorShowMian').show();
        }
    }
    else {
        $('#ErrorText').html("Something went wrong, please contact with your Provider !");
        $('.ErrorShowMian').show();
    }
    $('.cover-spin').hide();
}

function OnFailGetPaymentDetails(result) {
    var res = result.d.split("|");
    $('#ErrorText').html(res);
    $('.ErrorShowMian').show();
    $('.cover-spin').hide();
}

function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 
  


function GetPaymentTransID() {
    try {
        $('.cover-spin').show();
        if ($("#IsRegisterCheck").prop('checked') == true) {
            var IsQuickPay = "1";
            var UIdType = "STBNO";
            UIdValue = $('#STBNo').text()
            //var UIdValue = $('#STBNo').text().join(', ');
            var FinalStbNo = UIdValue.split(',')[0];
            var pass = randomStr(6, Arraynewpass);

            PushData('SProviderID', localStorage.getItem("ProviderID"));
            PushData('UId', FinalStbNo);
            PushData('UIdType', UIdType);
            PushData('MobileNo', $('#paymnetMobilenumber').val().trim());
            PushData('EmailID', $('#PayMentEmaiId').val().trim());
            PushData('UserId', $('#paymnetMobilenumber').val().trim());
            PushData('Password', pass);
            PushData('IsQuickPay', IsQuickPay);
            CallWebMethod('../login.aspx/RegisterSubscriberCheck', WebMethodData);
        }
        stepper.activateFeedback();
        var PGID = $("[name='PaymentGaetway']:checked").val();
        var RegMobileNumber = $("#paymnetMobilenumber").val();
        var RegEmailID = $("#PayMentEmaiId").val();

        PushData('PGtypeID', PGID);
        PushData('MobileNo', RegMobileNumber);
        PushData('EamilID', RegEmailID);
        CallWebMethod('../login.aspx/GetTransIdForPayment', WebMethodData, OnPassGetPaymentTransID, OnFailGetPaymentTransID);

    } catch (e) {

        $('#ErrorText').html("Something went wrong, please contact with your Provider !");
        $('.ErrorShowMian').show();
        $('.cover-spin').hide();
    }
}

function OnPassGetPaymentTransID(result) {
    try {
        if (result.d.split("|")[0] == "S") {
            $('#Loadingbg').hide();
            window.location.replace("../PayU");
            $('.cover-spin').hide();
        }
        else {
            $('#Loadingbg').hide();
            $(".wait-feedback").remove();
            $("#PayTVPayment li").removeClass("feedbacking ");
            //MsgBox("E", result.d.split("|")[1]);

            $('#ErrorText').html(result.d.split("|")[1]);
            $('.ErrorShowMian').show();
            $('.cover-spin').hide();

        }
    }
    catch (e) {
        //MsgBox('E', "Something went wrong, please contact with your Provider !");
        $('#ErrorText').html("Something went wrong, please contact with your Provider !");
        $('.ErrorShowMian').show();
        $('.cover-spin').hide();
    }
}

function OnFailGetPaymentTransID(res) {
    var res = res.statusText;
    $('#ErrorText').html("E", res);
    $('.ErrorShowMian').show();
    $('.cover-spin').hide();

}
/*End Payment Work*/


function BackToStepID() {

    $(".clsContinue").css("visibility", "hidden");
    $(".step-1 .sk-fading-circle").css("display", "none");

    if ($(".Step2Error").css("visibility") == "visible") {
        $(".Step2Error").css("visibility", "hidden");
        $(".Step2Error").val(" ");
    }

    $("#SelectState").val("-1");
    $("#SelectCity").val("-1");
    $("#SelectServiceProvider").val("-1");
    $(".step-1").css("display", "none");
    $(".IDStep").css("display", "block");
    $(".IDStep .sk-fading-circle").css("display", "none");
}
function BackToStep1() {

    $(".Step2Error").css("visibility", "hidden");
    $(".Step2Error").val(" ");
    $(".step-2").css("display", "none");
    $(".step-1").css("display", "block");
    CallType = "";
}
function responsivecontinue() {
    $(".LeftDtails").hide();
    $(".RightDetails").show();
}
function CloseError() {
    $('.ErrorShowMian').hide();
    localStorage.clear
    $(".errortext").val("");
    CloseQuikPay();
    $('.cover-spin').hide();
}
function CloseQuikPay() {
    $("#MCTNO").val("");
    $("#txtSubsID").val("");
    $("#txtSTB").val("");
    $("#txtSmartCard").val("");

    $(".step-1").css("display", "none");
    $(".step-2").css("display", "none");
    $("#paymnetMobilenumber").val("");
    $("#PayMentEmaiId").val("");
    $("#ErrorTextEx").hide();
    $("#SelectState").val("-1");
    $("#SelectCity").val("-1");
    $("#SelectServiceProvider").val("-1");
    $('.error').hide();
    $('.ContactError').css("visibility", "hidden");
    $(".IDStep").css("display", "block");
    localStorage.clear();
    $(".clsContinue").css("visibility", "hidden");
    $(".Step2Error").css("visibility", "hidden");
    $(".Step2Error").val(" ");
    $("body").css("overflow", "auto");
    $("#coformation").css("visibility", "hidden");
    $('.QuickPayDiv').hide();
    $('.cover-spin').hide();
    $('#paymnetMobilenumber').css('pointer-events', 'all');
    $('#PayMentEmaiId').css('pointer-events', 'all');
}
$(document).ready(function () {
    $("#Download").click(function () {
        $('html, body').animate({
            scrollTop: $("#Div6").offset().top
        }, 1500);

    });
    $(".clsStep2txtbox").keyup(function () {
        $(".Step2Error").css("visibility", 'hidden')
        $(".Step2Error").val(" ");
    });
    $("#SelectState").on('change', function () {
        $(".step-1 .sk-fading-circle").css("display", "block");
        PushData('StateID', $(this).val());
        //PushData('OPID', OpratorID)
        CallPublicAPI('../login.aspx/ProGetCityList', '', OnPassGetCityList, OnFailGetCityList);
    });
    $("#SelectCity").on('change', function () {
        $(".step-1 .sk-fading-circle").css("display", "block");
        PushData('CityID', $(this).val());
        //PushData('OPID', OpratorID)
        CallPublicAPI('../login.aspx/GetProviderList', '', OnPassProviderList, OnFailProviderList);
    });

    $('#paymnetMobilenumber').keyup(function () {
        $('#MobileNoError').css('visibility', 'hidden');
    });

    $('#PayMentEmaiId').keyup(function () {
        $('#EmailIdError').css('visibility', 'hidden');
    });
    $('#txtPaymentAmount').keyup(function () {
        $('.PaymentAmount-error').hide();
    });
    $("#paymnetMobilenumber").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $("#txtPaymentAmount").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 46) {
            return false;
        }
    });
    $('.cover-spin').hide();
});

$(window).load(function () {
    $('#QuickPay').click(function () {
        $('#QuickPay').removeClass('current_page_item');
        $('.PaymentSubsDetails').hide();
        $('.QuickPayMain').show();
        $('.IDStep .sk-fading-circle').hide();
        $('body').css('overflow', 'hidden');
        $(".QuickPayDiv").show();
    });

    $(".SmalClosebtn").click(function () {
        $('.LeftDtails').css('display', 'block');
        $('.RightDetails').css('display', 'none');
    });
    //$(".overlay-close").click(function () {


    //});
});