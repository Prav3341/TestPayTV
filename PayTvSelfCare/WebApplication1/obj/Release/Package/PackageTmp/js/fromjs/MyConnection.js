var CurrentCard = Msg = "";
var ConnectionDataTable = MCTChannelDataTable = MCTAddonDataTableList = null;
var AddPrepaidPolIDs = '';
var RemovePrepaidPolIDs = '';
var PrvBqId = SelectedConnectionId = 0;
var IsAddConnection = "";
var IsConnAddOrNot = "false";
var ConectionId = "";
var RemoveChannelID = RemoveChannel = RemoveBouquetIDs = RemoveBouquets = "";
var CurrentPackType = 0;
var clear = '<div style="clear:both;"></div>'
var Title1 = "You are currently subscribed to the following pack(s).";
var Title2 = "To change the existing pack, choose from the availabe packs below.";
var Title3 = "To add new A-la-Carte, choose from the availabe A-la-Carte below.";
var IsPrepaid = ""
var removeAddon = "true";
var removeAllaCart = "true";
var IsConnectionView = true
var NCFData = null;
var NCFFee = 0;
var ConnectionPakageType = 0;
var BouqueIdsList = "";
var BouqueNameList = "";
var BouqueBroadName = "";
var ChannelNameList = "";
var BroadCastIdsList = "";
var ChannelIdsList = "";
var AuthDauth = false;
var DeAuthBouqueIds = "";
var DeAuthBroadCastIds = "";

var AlaCart = false;
var Recomnded = false;
var BrodCaster = false;

var AuthBouqueIds = "";
var AuthBroadCastIds = "";
var AllBuquename = [];

var RecomondedArray = [];
var ChannelName = [];
var BroadCastArray = [];

var AuthChannelsIds = "";
var DeAuthChannelsIds = "";

var Counting = 0;
var ChannelsId = 0;
var IsOnload = false;
var NCFTax = 0;
var GrandTotal = 0;
var DropDawnhide = false;
var CurrentReversal = null;
var dupllicatedata = null;
var CalculateProduct = [];
var OrderSummaryTable1 = null;
var OrderSummaryTable2 = null;
var ErrorCode = ""
var DuplicateChannel = "";
var SmartCard = "";
var ConnectionDetailName = "";
var bit = "0";


function GetSubsAllConnection() {
    LogInDataTable = JSON.parse(localStorage.getItem("LDT"))["Description"];
    LogInDataTable[0]["BalanceAmount"] = parseFloat(localStorage.getItem("MyWalletBalance"));
    if (localStorage.getItem("IsPrePostType") == "0") {
        ExpiringProducts = JSON.parse(localStorage.getItem("ExpiringProducts"))["Description"];
    }
    //$("#plans").css("display", "none");
    $('#Loadingbg').css("display", 'block');
    localStorage.removeItem("SubscriptionFail");
    localStorage.removeItem("SubscriptionSuccess");
    SubsId = localStorage.getItem("SubsUniqueID");
    OperatorId = localStorage.getItem("CableOperaterID");

    PushData('SubsId', SubsId);
    PushData('OPID', OperatorId);
    CallPublicAPI('MyConnections.aspx/GetSubsAllConnection', '', OnPassGetSubsAllConnection, OnFailGetSubsAllConnection);
}

function OnPassGetSubsAllConnection(result) {

    var ConnectionHtml = "";
    //ar res = result.d.split("|");
    result = result.d;
    ConnectionDataTable = JSON.parse(result);
    localStorage.setItem('ConnectionDataTable', result);
    IsConnAddOrNot = localStorage.getItem("IsManagePackage");
    if (ConnectionDataTable["Status"] == "Success") {
        $('#Loadingbg').css("display", 'none');
        localStorage.setItem("IsPrepaid", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["IsPrepaid"]);
        localStorage.setItem("CustId", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["CustomerID"]);
        localStorage.setItem("ModifyTimeStamp", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["ModifyTimeStamp"]);

        var IsPrepaid = localStorage.getItem("IsPrepaid");


        if (IsPrepaid == "true") {
            var ConnectionExpiringProducts = $.grep(ExpiringProducts, function (items) {
                return (items['RowIndex'] >= '0');
            });
        }





        if (ConnectionDataTable["Status"] == "Success") {
            for (var i = 0; i <= (ConnectionDataTable["Description"]["NewDataSet"]["Connections"].length == undefined ? ConnectionDataTable["Description"]["NewDataSet"]["Connections"]["ConnectionID"].length - 1 : ConnectionDataTable["Description"]["NewDataSet"]["Connections"].length - 1) ; i++) {

                var StatusClass = disabledCls = VisibilityHidden = "";

                //localStorage.setItem("PackagePolicyId", ConnectionDataTable["Description"]["NewDataSet"]["Connections"]["Packages"][i]["ID"]);
                //localStorage.setItem("IsPrepaid", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["IsPrepaid"]);
                //localStorage.setItem("CustId", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["CustomerID"]);
                //localStorage.setItem("ModifyTimeStamp", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["ModifyTimeStamp"]);
                localStorage.setItem("VCNumber", ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"]);

                if ((ConnectionDataTable["Description"]["NewDataSet"]["Connections"].length == undefined ? ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"].length : ConnectionDataTable["Description"]["NewDataSet"]["Connections"].length) == 1) {
                    if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] == "DC" || ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] == "TDC") {
                        disabledCls = "disabled"; //disconnected
                        StatusClass = "red";
                        VisibilityHidden = "HideVisibility";
                    }
                    else {
                        disabledCls = "";
                        StatusClass = "green";
                        VisibilityHidden = "";
                    }

                    if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"] !== undefined) {

                        if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"].length > 1) {
                            for (var k = 0; k < ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"].length; k++) {
                                if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][k]["Type"] == "MPKG")
                                    PackagesName = ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][k]["Name"].toString();

                            }
                        }
                        else {
                            PackagesName = ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][0]["Name"].toString();
                        }
                    }
                    else {
                        PackagesName = "N/A";
                    }
                    ConnectionHtml += '<article class="col  m4 l4 MainConnDiv" >' +
                                                '<div class="card hoverable ' + disabledCls + ' ">';

                    if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] == "Active") {
                        ConnectionHtml += '<a id="ConectionsId" class="eyebtn"  onclick="javascript:GetParConnDetails('
                                                                                   + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"]
                                                                                   + ',this,\'' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"]
                                                                                   + '\',0); return false;" ><i class="fa fa-info" aria-hidden="true"></i></a>';
                    }
                    ConnectionHtml += '<div class="card-image ' + StatusClass + ' waves-effect">' +
                                                        '<div class="price">' + 'TV ' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + '</div>' +
                                                        '<div class="price-desc">' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] + ' - ' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Connection_Rank"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="card-content">' +
                                                        '<ul class="collection">' +
                                                            '<li class="collection-item ' + VisibilityHidden + ' ">';
                    if (IsPrepaid == "true") {
                        var ExpiringTableConnection = 0;
                        var ExpiringCount = 0;
                        var RequiredAmount = 0;
                        if (ConnectionExpiringProducts.length > 0) {
                            ExpiringTableConnection = $.grep(ConnectionExpiringProducts, function (items) {
                                return (items['Connection ID'] == ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"]);
                            });

                        }
                        if (ExpiringTableConnection.length > 0) {
                            ExpiringCount = ExpiringTableConnection[0]["CountExpiring"];
                            RequiredAmount = ExpiringTableConnection[0]["Total Required_Amt (A+B+C)"];
                        }


                        ConnectionHtml += '<p style="font-weight: 600;"> ' + '<span id = "ExpiringCount' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + '">' + ExpiringCount + '</span>' + ' Expiring Product(s) & <br> Required Amount</p>' +
                        '<p>' + '₹&nbsp;' + '<span id = "RequiredAmount' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + '">' + RequiredAmount + '</span>' + ' </p>' +
                        '</li>';
                    }
                    else {
                        ConnectionHtml += '<p style="font-weight: 600;">Base Pack</p>' +
                       '<p>' + PackagesName + '</p>' +
                   '</li>';
                    }


                    ConnectionHtml += '<li class="collection-item">' +
                                                                '<p style="font-weight: 600;">STB Number</p>' +
                                                                '<p>' + (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["STB"] == "" ? "&nbsp;" : ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["STB"]) + '</p>' +
                                                            '</li>' +
                                                            '<li class="collection-item" id="ConnectionDiv">' +
                                                                '<p style="font-weight: 600;">VC Number</p>' +
                                                                '<p data-SmartCard="' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] + '" >' + (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] == "" ? "&nbsp;" : ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"]) + '</p>' +
                                                            '</li>' +
                                                        '</ul>' +
                                                    '</div>' +
                                                    '<div class="card-action center-align" style="height:auto;">' +
                                                        '<a class="waves-effect waves-light light-blue btn AddRemoveBtn ' + VisibilityHidden + '" onclick="javascript:GetParConnDetails(' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + ',this,\'' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] + '\',2); return false;" class="btn-floating waves-effect waves-light light-blue " title="Connection Details" style="text-transform: none;">Add & Remove Product  <input type="radio" name="Cinection"> </a>' +
                                                        '<a class="waves-effect waves-light light-blue btn ' + VisibilityHidden + '" onclick="javascript:GetParConnDetails(' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + ',this,\'' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] + '\',1); return false;" class="btn-floating waves-effect waves-light light-blue " title="Connection Details" style="text-transform: none;">Renew Product  <input type="radio" name="Cinection"> </a>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</article>';
                }
                else if ((ConnectionDataTable["Description"]["NewDataSet"]["Connections"].length == undefined ? ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"].length : ConnectionDataTable["Description"]["NewDataSet"]["Connections"].length) > 1) {
                    //localStorage.setItem("PackagePalicyId", ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][i]["ID"]);
                    //localStorage.setItem("IsPrepaid", ConnectionDataTable["Description"]["NewDataSet"]["Customers"][0]["IsPrepaid"]);
                    //localStorage.setItem("CustId", ConnectionDataTable["Description"]["NewDataSet"]["Customers"]["CustomerID"]);
                    //localStorage.setItem("ModifyTimeStamp", ConnectionDataTable["Description"]["NewDataSet"]["Customers"]["ModifyTimeStamp"]);
                    localStorage.setItem("VCNumber", ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"]);

                    if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] == "DC" || ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] == "TDC") {
                        disabledCls = "disabled"; //disconnected
                        StatusClass = "red";
                        VisibilityHidden = "HideVisibility";
                    }
                    else {
                        disabledCls = "";
                        StatusClass = "green";
                        VisibilityHidden = "";
                    }


                    if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"] !== undefined) {
                        if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"].length > 1) {
                            for (var k = 0; k < ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"].length; k++) {
                                if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][k]["Type"] == "MPKG")
                                    PackagesName = ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][k]["Name"].toString();
                            }
                        }
                        else {
                            PackagesName = ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"][0]["Name"];
                        }

                    }
                    else {
                        PackagesName = "N/A";
                    }
                    //var CurrentPackage=ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"] == undefined ? null : JSON.stringify(ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Packages"]);
                    ConnectionHtml += '<article class="col  m4 l4 MainConnDiv" >' +
                                                '<div class="card hoverable ' + disabledCls + ' ">';

                    if (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] == "Active") {
                        ConnectionHtml += '<a id="ConectionsId" class="eyebtn"  onclick="javascript:GetParConnDetails('
                                                                                   + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"]
                                                                                   + ',this,\'' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"]
                                                                                   + '\',0); return false;" ><i class="fa fa-info" aria-hidden="true"></i></a>';
                    }

                    ConnectionHtml+='<div class="card-image ' + StatusClass + ' waves-effect">' +
                                                        '<div class="price">' + 'TV ' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + '</div>' +
                                                        '<div class="price-desc">' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Status"] + ' - ' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["Connection_Rank"] + '</div>' +
                                                    '</div>' +
                                                    '<div class="card-content">' +
                                                        '<ul class="collection">' +
                                                        '<li class="collection-item ' + VisibilityHidden + '">';

                    if (IsPrepaid == "true") {
                        var ExpiringTableConnection = 0;
                        var ExpiringCount = 0;
                        var RequiredAmount = 0;
                        if (ConnectionExpiringProducts.length > 0) {
                            ExpiringTableConnection = $.grep(ConnectionExpiringProducts, function (items) {
                                return (items['Connection ID'] == ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"]);
                            });

                        }
                        if (ExpiringTableConnection.length > 0) {
                            ExpiringCount = ExpiringTableConnection[0]["CountExpiring"];
                            RequiredAmount = ExpiringTableConnection[0]["Total Required_Amt (A+B+C)"];
                        }


                        ConnectionHtml += '<p style="font-weight: 600;"> ' + '<span id = "ExpiringCount' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + '">' + ExpiringCount + '</span>' + ' Expiring Product(s) & <br> Required Amount</p>' +
                        '<p>' +  '₹&nbsp;' + '<span id = "RequiredAmount' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + '">' + RequiredAmount + '</span>' + ' </p>' +
                        '</li>';
                    }
                    else {
                        ConnectionHtml += '<p style="font-weight: 600;">Base Pack</p>' +
                       '<p>' + PackagesName + '</p>' +
                   '</li>';
                    }

                    ConnectionHtml += '<li class="collection-item">' +
                                                                '<p style="font-weight: 600;">STB Number</p>' +
                                                                '<p>' + (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["STB"] == "" ? "&nbsp;" : ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["STB"]) + '</p>' +
                                                            '</li>' +
                                                            '<li class="collection-item" id="ConnectionDiv">' +
                                                                '<p style="font-weight: 600;">VC Number</p>' +
                                                                '<p data-SmartCard="' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] + '">' + (ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] == "" ? "&nbsp;" : ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"]) + '</p>' +
                                                            '</li>' +
                                                        '</ul>' +
                                                    '</div>' +
                                                    '<div class="card-action center-align" id="Conectrionmain">' +
                                                     '<a id="ConectionsId" class="waves-effect waves-light light-blue btn AddRemoveBtn ' + VisibilityHidden + ' " onclick="javascript:GetParConnDetails(' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + ',this,\'' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] + '\',2); return false;" class="btn-floating waves-effect waves-light light-blue " title="Connection Details" style="text-transform: none;">Add & Remove Product <input type="radio" name="Cinection">  </a>' +
                                                     '<a id="ConectionsId" class="waves-effect waves-light light-blue btn ' + VisibilityHidden + ' " onclick="javascript:GetParConnDetails(' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["ConnectionID"] + ',this,\'' + ConnectionDataTable["Description"]["NewDataSet"]["Connections"][i]["VC"] + '\',1); return false;" class="btn-floating waves-effect waves-light light-blue " title="Connection Details" style="text-transform: none;">Renew Product <input type="radio" name="Cinection">  </a>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</article>';
                }
            }

            //New MyConnection First Page (Top Section) work for Prepaid Case By Rounak

            var SubstypePrepaid = localStorage.getItem("IsPrepaid");
            var ExpiryUptoDate = localStorage.getItem("ExpiryUptoDate");
            var TotalExpiringProduct = localStorage.getItem("TotalExpiringCount");
            var TotalRecommendedAmount = localStorage.getItem("TotalRequiredAmount");
            var ExpiryDateValue = localStorage.getItem('ExpiryDateValue');
            var WalletAmount = 0;

            if (LogInDataTable[0]["BalanceAmount"] == "" || LogInDataTable[0]["BalanceAmount"] == undefined)
                WalletAmount = 0;
            else
                WalletAmount = LogInDataTable[0]["BalanceAmount"];

            WalletAmount = ((WalletAmount).toFixed(2)).replace("-", "");

            //var RequiredAmount = TotalRecommendedAmount - WalletAmount;
            var RequiredAmount = 0;
            if (LogInDataTable[0]["BalanceAmount"] <= 0)
                RequiredAmount = parseFloat(TotalRecommendedAmount) - parseFloat(WalletAmount);
            else
                RequiredAmount = parseFloat(TotalRecommendedAmount) + parseFloat(WalletAmount);


            TotalRecommendedAmount = (TotalRecommendedAmount == "" || TotalRecommendedAmount == undefined) ? 0 : parseFloat(TotalRecommendedAmount);
            if (SubstypePrepaid == "true") {
                if (LogInDataTable[0]["IsDayWise"] == true) {
                    $('#ProductDetails').css("display", "none");
                }
                else {
                    $('#ProductDetails').css("display", "block");
                    $('#TotalActiveConnection').html(LogInDataTable[0]["NoOfActiveCon"]);
                    $('#ExpiringTillDate').html(ExpiryUptoDate);
                    $('#ExpiringDay').val(ExpiryDateValue);
                    $('#TotalExpiringProduct').html(TotalExpiringProduct);
                    $('#TotalRecommededRecharge').html(TotalRecommendedAmount.toFixed(2));

                    if (RequiredAmount > 0) {
                        $('#RequiredAmount').html(RequiredAmount.toFixed(2));
                        $('#InsufficientBal').css("display", "block");
                        $('#SufficientBal').css("display", "none");
                        $('#SmallSizeInsfBal').css("display", "block");
                        $('#SmallSizeSuffiBal').css("display", "none");

                    }
                    else {
                        $('#RequiredAmount').html(0);
                        $('#InsufficientBal').css("display", "none");
                        $('#SufficientBal').css("display", "block");
                        $('#SmallSizeInsfBal').css("display", "none");
                        $('#SmallSizeSuffiBal').css("display", "block");
                    }
                }
            }
            else {
                $('#ProductDetails').css("display", "none");
            }

            //End MyConnection First Page (Top Section) work for Prepaid Case By Rounak

        }
    }
    else {
        MsgBox("E", "Something went wrong, please try again later!");
        $('#Loadingbg').css("display", 'none');
    }

    $('#plans').html("");
    $('#plans').html(ConnectionHtml + clear);

    if (IsConnAddOrNot == "false")
        $(".card-action a").text("View Package");
    else
        $(".AddRemoveBtn").text("Add & Remove Product");

    $("#plans").css("display", "block");
}

function OnFailGetSubsAllConnection(result) {
    $('#Loadingbg').css("display", 'none');
}
function TenureAddLess(value) {
    Id = '#' + value["id"];
    //var button = Id;
    var EndDateid = $(Id).closest('ul').find('input[type="checkbox"]').prop('id');
    var oldValue = $(Id).closest('#myform').find(".qty").val();

    if ($(Id).val() == "+") {
        var newVal = parseFloat(oldValue) + 1;
    }
    else {
        // Don't allow decrementing below=zero
        if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
        }
        else {
            return false;
        }
    }

    if ($("#" + EndDateid).prop("checked") == true) {
        if (newVal <= 12) {
            $(Id).parent().find("input.qty").val(newVal);
        }

        var tenureperiodin = $(Id).closest('ul').data('tenureperiodin');
        var tenureperiodvalue = $(Id).closest('ul').data('tenureperiodvalue');

        Id = Id.indexOf("minus") > 0 ? Id = Id.substr(9) : Id = Id.substr(8);//GetID


        EndDateCalculation(EndDateid);
    }
    //EndDateCalculation(tenureperiodin, "", newVal, tenureperiodvalue, Id);
}

function GetParConnDetails(Id, ctrl, VCNO,IsRenew) {
    bit = IsRenew;
    try {
        var listType = "";
        //ConectionId = id;
	$("#MajorPack").empty()
        $("#AddonPack").empty()
        $("#AlaCarteBody").empty()
        if ($(ctrl).closest(".MainConnDiv").find(".price-desc").text().trim() == "DC" || $(ctrl).closest(".MainConnDiv").find(".price-desc").text().trim() == "TDC") {
            MsgBox("E", "Your Connection Is " + $(ctrl).closest(".MainConnDiv").find(".price-desc").text().trim() + ".");
        }
        else {
            ConnectionDetailName = "For TV" + Id + " VC: " + VCNO;
            localStorage.setItem("ConnectionDetailName", ConnectionDetailName);
            ctime = 20;
            CurrentCard = ctrl;
            if ($(CurrentCard).closest('.card').find('.collapsible').css('display') == "block")
                $(CurrentCard).closest('.card').find('.collapsible').css('display', 'none');
            localStorage.setItem('ConnectionId', Id);
            localStorage.setItem('VCNO', VCNO);
            if (IsRenew !=1) {
                $("#plans").css("display", "none");
                $('#Loadingbg').css("display", 'block');
                listType = "0";
                SearchBy = "0";
                PushData('SearchBy', SearchBy);
                PushData('OPID', OperatorId);
                PushData('SmartCard', VCNO);
                PushData('listtype', listType);
                PushData('IsPrepaid', localStorage.getItem("IsPrepaid"));

                CallPublicAPI('MyConnections.aspx/GetMainBouquet', '', OnPassParConnDetails, OnFailParConnDetails, "relyMSOApp", "rely@3134");
            }
            else {
                document.location.replace("../RenewConnection");
            }

        }
        $("#ConectionsId").addClass("Active")
        //ManagePackage(id, VCNo, ctrl);

    }
    catch (e) {
        $('#Loadingbg').css("display", 'none');
        MsgBox("E", "Something went wrong, please try again later!");
    }
}

function OnPassParConnDetails(result) {
    var result = result.d;
    ConnectionDataTable = JSON.parse(result);
    var MainBouquetHtml = AddonHtml = BrodAPKGHtml = AlacartHtml = AmountColor = MainBouquetAddonHtml = "";
    var ChannelUlOpen = ChannelUlClose = ChannelLi = ChannelLiClose = ChannelMainHtml = BroadCastClose = ActiveClass = LiWiseChannel = AlaCartOption = ChannelData = ChannelData = "";
    var IsCallFirstTime = true;
    $('#ProductDetails').css('display', 'none');
    $('#Loadingbg').css("display", 'none');
    if (ConnectionDataTable["Status"] == "Success") {
        $("#RecomndedSearch").show();
        if (localStorage.getItem("IsPrepaid") == "false") {
            $('#ConnectionModelPrepaid').hide();
            $('#ConnectionModel').show();

        }
        else {
            $('#ConnectionModel').hide();
            if (parseInt(bit) != 2) {
                $('#Productdetails').html('');
                $('#ConnectionModelPrepaid').show();
                $('#materialize-lean-overlay-1').show();

            }
        }


        $('#materialize-lean-overlay-1').show();
        IsOnload = true;
        Recomnded = true;
        $('body').css('overflow', 'hidden');
        $("#SuggestiveTab").addClass('active');
        $("#BroadcasterTab").removeClass('active');
        $("#AlaCarteTab").removeClass('active');
        $("#ApplyNowBtn").hide();
        $("#MannagePackage").show();
        //localStorage.setItem("ProductId", ProductID);
        var ConnectionDataTable1 = $.grep(ConnectionDataTable["Description"], function (items) {
            return (items['ProductType'] == "MPkg" || items['ProductType'] == "APkg" || items['ProductType'] == "Ala") && items['IsbrodProduct'] == 0;
        });

        var ConnectionDataTable2 = $.grep(ConnectionDataTable["Description"], function (items) {
            return (items['ProductType'] == "MPkg" || items['ProductType'] == "APkg" || items['ProductType'] == "Ala") && items['IsbrodProduct'] == 1;
        });
        var CustomerId = localStorage["CustId"];
        var ConnectionId = localStorage["ConnectionId"];
        var index = 1;
        var count = 1;
        var PIDArray = [];
        for (var i = 0; i < ConnectionDataTable1.length; i++) {
            if (jQuery.inArray(ConnectionDataTable1[i]["Genre"], PIDArray) == -1 && ConnectionDataTable1[i]["Genre"] != '') {
                PIDArray.push(ConnectionDataTable1[i]["Genre"]);
            }
        }
        BouqueIdsList = "";
        BroadCastIdsList = "";
        ChannelIdsList = "";
        BouqueNameList = "";
        ChannelNameList = "";
        ChannelLiClose = '</ul></div></li>';
        BroadCastClose = '</ul></div></li>';
        MultiTermSubscription = "";
        MultiSubsAdd = ""; MultiSubsMinus = "";
        StartDate = "", EndDate = "";
        for (var i = 0; i < ConnectionDataTable1.length; i++) {
            ConnectionPakageType = 1;
            //// Common Work of MPKG/APKG of Bouquet
            if (localStorage.getItem("IsPrepaid") == "true") {
                if (ConnectionDataTable1[i]["MultiTermSubscription"] == false || ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    MultiTermSubscription = " Class=disabled style='display:none'";
                    MultiSubsAdd = " style='border-left: 2px solid #d2d0cc !important'";
                    MultiTenure = 'Class=hide';
                    MultiSubsMinus = " style='border-right: 2px solid #d2d0cc !important'";
                }
                else {
                    MultiTermSubscription = " style='border: 2px solid #f4c93c;display:block'";
                    MultiSubsAdd = " style='border-left: 2px solid #f4c93c !important'";
                    MultiTenure = 'Class=block';
                    MultiSubsMinus = " style='border-right: 2px solid #f4c93c !important'";
                }
            }
            var MainBouquet = "";

            if (localStorage.getItem("IsPrepaid") == "false") {
                MainBouquet = ConnectionDataTable1[i]["ProductName"];
                RecomondedArray += ConnectionDataTable1[i]["ProductName"] + ',';
            }
            else {
                MainBouquet = ConnectionDataTable1[i]["PolicyName"];
                RecomondedArray += ConnectionDataTable1[i]["PolicyName"] + ',';
                StartDate = ConnectionDataTable1[i]["StartDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : ConnectionDataTable1[i]["StartDate"];

            }


            if (ConnectionDataTable1[i]["ProductType"] == "MPkg") {

                //
                PolID = ConnectionDataTable1[i]["PrePolID"];
                //var MainBouquet = "";
                //if (localStorage.getItem("IsPrepaid") == "false") {
                //    MainBouquet = ConnectionDataTable1[i]["ProductName"];
                //    RecomondedArray += ConnectionDataTable1[i]["ProductName"] + ',';
                //}
                //else {
                //    MainBouquet = ConnectionDataTable1[i]["PolicyName"];
                //    RecomondedArray += ConnectionDataTable1[i]["PolicyName"] + ',';
                //    StartDate = ConnectionDataTable1[i]["StartDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : ConnectionDataTable1[i]["StartDate"];



                //}

                var MainBouquetRate = parseFloat(ConnectionDataTable1[i]["Rate"]).toFixed(2);
                var Channelcount = ConnectionDataTable1[i]["Channelcount"];
                var PackagetypeType = ConnectionDataTable1[i]['ProductType'];
                var IsPackwithSubs = false;
                var SubscriptionDate="";
                if (ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    BouqueIdsList += PolID + ",";
                    BouqueNameList += MainBouquet + ",";
                    IsPackwithSubs = "checked = true";
                    SubscriptionDate = '' + StartDate + ' to <br/><span class="EndDate" id="EndDate' + index + '">' + ConnectionDataTable1[i]["EndDate"] + '</span>';
                }
                else
                {
                    IsPackwithSubs = "";
                    SubscriptionDate = '<span id="StartDate' + index + '" class="StarttoEnd" style="display:none;float:right">' + StartDate + ' to </span><p style="display:none" class="StarttoEnd"></p><span class="EndDate" id="EndDate' + index + '">Only for selected product</span>';
                }
                MainBouquetHtml += '<ul class="PackageDetailMainss" data-productname="' + MainBouquet + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-CustID="' + CustomerId + '" data-polid="' + ConnectionDataTable1[i]["PrePolID"] + '"  data-ProductType=2 data-bouquetid="' + ConnectionDataTable1[i]["ProductID"] + '" data-mainbouquet="' + MainBouquet + '" data-channelscount="' + Channelcount + '"  data-mainrate="' + MainBouquetRate + '" data-tabtype=1 data-isapply="' + ConnectionDataTable1[i]["IsPckwithSubs"] + '" data-tenureperiodin="' + ConnectionDataTable1[i]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ConnectionDataTable1[i]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-multitermsubs="' + ConnectionDataTable1[i]["MultiTermSubscription"] + '" data-TenureType="' + ConnectionDataTable1[i]["TenureType"] + '" style="padding: 2px;background-color: #FFF;margin-bottom: 2px;margin-top: 2px;border-bottom: 1px solid #e4e2e2;">' +
                                        '<li style="color: #3e3e3e;padding: 5px;">' +
                                           '<div style="float: left;font-size: 18px;width: 46%;">' + MainBouquet + '</div>' +
                                           '<div style="float:right;font-weight: 400;font-size: 18px;color:black;">Rs.&nbsp;' + MainBouquetRate + '</div>';
                //if (localStorage.getItem("IsPrepaid") == "true")
                //       MainBouquetHtml +=  '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;">Start Date : &nbsp;&nbsp; ' + StartDate + '</div>' ;

                MainBouquetHtml += '<div style="clear:both;"></div>' +
                              '</li>' +
                              '<li style="color: #3e3e3e;padding: 5px;">';
                if (localStorage.getItem("IsPrepaid") == "false") {
                    MainBouquetHtml += '<div style="float: left; display:none" class="PostpaidSetting">' +
                                          '<div style="float:left;width: 100px;">Channels</div>' +
                                          '<div style="float:left;">:&nbsp ' + ConnectionDataTable1[i]["Channelcount"] + '&nbsp;</div>' +
                                          '<div style="float: left;font-size: 15px;  margin-right: 6px;">' +
                                              '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + '); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Channels</a>&nbsp;&nbsp;' +
                                          '</div>' +
                                        '</div>' +
                                        '<span style="float:right;" id="ChangeBouquet" class="PostpaidSetting">' +
                                            '<label class="switch">' +
                                                '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:NCFMajorCheckBox(this); return false;">' +
                                                '<div class="switch-slider round"></div>' +
                                            '</label>' +
                                        '</span>';
                }
                if (localStorage.getItem("IsPrepaid") == "true") {
                    MainBouquetHtml += '<div style="float: left; width:40%; display:block" class="PreapaidSetting">' +
                                             '<div style="float:left;" ' + MultiTenure + '>Product Term</div>' +
                                            '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">' +
                                                 '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + ' field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)"  />' +
                                                 '<input type="text" name="quantity" value="1" class="qty" />' +
                                                 '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />' +
                                             '</form>' +
                                             '<div class="VewDetailsChnl">' +
                                                 '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + ',\'' + ConnectionDataTable1[i]["TenureType"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodIN"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodValue"] + '\',\'' + ConnectionDataTable1[i]["Channelcount"] + '\',\'' + StartDate + '\'); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;' +
                                             '</div>' +
                                         '</div>' +


                                        '<span style="float:right;" id="ChangeBouquet" class="PreapaidSetting">' +
                                            '<label class="switch">' +
                                                '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:NCFMajorCheckBox(this); return false;">' +
                                                '<div class="switch-slider round"></div>' +
                                            '</label>' +
                                        '</span>' +
                                        '<div style="float:left;font-weight: 400;font-size: 15px;color:black;text-align: left" class="PreapaidSetting">Subscription for the period (' + SubscriptionDate+')</div>';
                }
                MainBouquetHtml += '<div style="clear:both;"></div>' +
                          '</li>' +
                      '</ul>';
                index++;
            }

            if (ConnectionDataTable1[i]["ProductType"] == "APkg") {
                //localStorage.setItem("SmartCardNumber", VCNo)
                PolID = ConnectionDataTable1[i]["PrePolID"];

                var MainBouquetRate = parseFloat(ConnectionDataTable1[i]["Rate"]).toFixed(2);
                var PackagetypeType = ConnectionDataTable1[i]['ProductType'];
                var IsPackwithSubs = false;
                var SubscriptionDate = "";
                if (ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    BouqueIdsList += PolID + ",";
                    BouqueNameList += MainBouquet + ",";
                    IsPackwithSubs = "checked = true";
                    SubscriptionDate = '' + StartDate + ' to <br/><span class="EndDate" id="EndDate' + index + '">' + ConnectionDataTable1[i]["EndDate"] + '</span>';
                }
                else {
                    IsPackwithSubs = "";
                    SubscriptionDate = '<span id="StartDate' + index + '" class="StarttoEnd" style="display:none;float:right">' + StartDate + ' to </span><p style="display:none" class="StarttoEnd"></p><span class="EndDate" id="EndDate' + index + '">Only for selected product</span>';
                }
                MainBouquetAddonHtml += '<ul class="PackageDetailMainss" data-productname="' + MainBouquet + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-custID="' + CustomerId + '" data-polid="' + ConnectionDataTable1[i]["PrePolID"] + '" data-producttype=2 data-bouquetid="' + ConnectionDataTable1[i]["ProductID"] + '" data-mainbouquet="' + MainBouquet + '" data-channelscount="' + ConnectionDataTable1[i]["Channelcount"] + '"  data-mainrate="' + MainBouquetRate + '" data-tabtype=1 data-isapply="' + ConnectionDataTable1[i]["IsPckwithSubs"] + '" data-tenureperiodin="' + ConnectionDataTable1[i]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ConnectionDataTable1[i]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-multitermsubs="' + ConnectionDataTable1[i]["MultiTermSubscription"] + '" data-TenureType="' + ConnectionDataTable1[i]["TenureType"] + '" style="padding: 2px;background-color: #FFF;margin-bottom: 2px;margin-top: 2px;border-bottom: 1px solid #e4e2e2;">  <span style="float: right;" class="SelectMainBroad"> </span>' +
                                            '<li style="color: #3e3e3e;padding: 5px;">' +
                                              '<div style="float: left;font-size: 18px;width: 46%;">' + MainBouquet + '</div>' +
                                              '<div style="float:right;font-weight: 400;font-size: 18px;color:black;">Rs.&nbsp;' + MainBouquetRate + '</div>';
                //if (localStorage.getItem("IsPrepaid") == "true")
                // MainBouquetAddonHtml += '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;">Start Date : &nbsp;&nbsp; ' + StartDate + '</div>';

                MainBouquetAddonHtml += '<div style="clear:both;"></div>' +
                                      '</li>' +

                                      '<li style="color: #3e3e3e;padding: 5px;">';
                if (localStorage.getItem("IsPrepaid") == "false") {
                    MainBouquetAddonHtml += '<div style="display:none" class="PostpaidSetting">' +
                                                     '<div style="float:left;width: 100px;">Channels</div>' +
                                                     '<div style="float:left;">:&nbsp ' + ConnectionDataTable1[i]["Channelcount"] + '&nbsp;</div>' +
                                                     '<div style="float: left;font-size: 15px;">' +
                                                         '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + '); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Channels</a>&nbsp;&nbsp;' +
                                                     '</div>' +
                                                 '</div>' +
                                                 '<span style="float:right;" id="ChangeBouquet" class="PostpaidSetting">' +
                                                     '<label class="switch">' +
                                                       '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:MainBouquetChange(this); return false;">' +
                                                          '<div class="switch-slider round"></div>' +
                                                     '</label>' +
                                                  '</span>';
                }
                if (localStorage.getItem("IsPrepaid") == "true") {
                    MainBouquetAddonHtml += '<div style="float: left; width:40%; display:block" class="PreapaidSetting">' +
                                                '<div style="float:left;" ' + MultiTenure + '>Product Term</div>' +
                                                '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">' +
                                                     '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + '  field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)"  />' +
                                                     '<input type="text" name="quantity" value="1" class="qty" />' +
                                                     '<input type="button" value="+" class="qtyplus AddBtn" field="quantity" ' + MultiSubsAdd + '  id="qtyplus' + index + '" onclick="TenureAddLess(this)" />' +
                                                '</form>' +
                                                '<div class="VewDetailsChnl">' +
                                                     '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + ',\'' + ConnectionDataTable1[i]["TenureType"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodIN"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodValue"] + '\',\'' + ConnectionDataTable1[i]["Channelcount"] + '\',\'' + StartDate + '\'); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;' +
                                                '</div>' +
                                              '</div>' +

                                              '<span style="float:right;" id="ChangeBouquet" class="PreapaidSetting">' +
                                                  '<label class="switch">' +
                                                    '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:EndDateCalculation(this.id);MainBouquetChange(this); return false;">' +
                                                       '<div class="switch-slider round"></div>' +
                                                  '</label>' +
                                               '</span>' +
                                               '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;text-align: left">Subscription for the period (' + SubscriptionDate + ')</div>';
                }

                MainBouquetAddonHtml += '<div style="clear:both;"></div>' +
                               '</li>' +
                          '</ul>';
                index++;

            }

        }

        var Finalala = '';
        var ActiveClass1 = '';
        var AlaIndex = 0;
        for (var i = 0; i < PIDArray.length; i++) {
            ConnectionPakageType = 3;

            var ChannelDataTable = $.grep(ConnectionDataTable1, function (items) {
                return (items['Genre'] == PIDArray[i]);
            });
            if (ChannelDataTable != null && ChannelDataTable != undefined && ChannelDataTable.length > 0) {
                ChannelLi = '<li ' + ActiveClass + '>' +
                                     '<div data-alcartgenernam="' + PIDArray[i] + '"  id="parentGenerDiv' + ChannelDataTable[0]["GenreID"] + '" style="padding: 0 0rem;font-size: 15px;color:#444444;background: #ececec;" class="collapsible-header Channels-header ' + ActiveClass + '" onclick="javascript:collapsibleNew(this); return false;"><i class="fa fa-plus-circle" style="margin-right: 0rem;font-size: 1.1rem;"></i>' + PIDArray[i] + '&nbsp;&nbsp;' + ChannelDataTable.length + ' Channel(s) <span style="float: right;" class="SelectMain"> </span> </div>' +
                                     '<div class="collapsible-body Channels-body"  id="childGenerDiv' + ChannelDataTable[0]["GenreID"] + '"  >'//' + FirstLiBody + '

                AlaCartOption += '<li data-genernames="' + PIDArray[i] + '" data-generid="' + ChannelDataTable[0]["GenreID"] + '"> <span onclick="javascript:filterChekBox(this); return false;" id="switched" style="margin-top: 0px;float:left;width:100%"><input type="checkbox" id="CHekBoxNew' + i + '" data-value="11"> <label class="Generlable" for="CHekBoxNew' + i + '">' + PIDArray[i] + '</label> </span></li>'
                AlacartHtml = '';
                for (var j = 0; j < ChannelDataTable.length; j++) {

                    var Channel = "";

                    if (localStorage.getItem("IsPrepaid") == "false") {
                        Channel = ChannelDataTable[j]["ProductName"];
                        ChannelName += ChannelDataTable[j]["ProductName"] + ',';
                    }
                    else {
                        Channel = ChannelDataTable[j]["PolicyName"];
                        ChannelName += ChannelDataTable[j]["PolicyName"] + ',';
                        StartDate = ChannelDataTable[j]["StartDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : ChannelDataTable[j]["StartDate"];
                        if (ChannelDataTable[j]["MultiTermSubscription"] == false || ChannelDataTable[j]["IsPckwithSubs"] == "1") {
                            MultiTermSubscription = " Class=disabled style='border: 2px solid #d2d0cc;display:none'";
                            MultiTenure = 'Class=hide';
                            MultiSubsAdd = " style='border-left: 2px solid #d2d0cc !important'";
                            MultiSubsMinus = " style='border-right: 2px solid #d2d0cc !important'";
                        }
                        else {
                            MultiTermSubscription = " style='border: 2px solid #f4c93c;display:block'";
                            MultiSubsAdd = " style='border-left: 2px solid #f4c93c !important'";
                            MultiTenure = 'Class=block';
                            MultiSubsMinus = " style='border-right: 2px solid #f4c93c !important'";
                        }
                    }

                    var ChannelRate = parseFloat(ChannelDataTable[j]["Rate"]).toFixed(2);
                    var PrePolID = RChannel = RChannelID = "";
                    var Channelcount = ChannelDataTable[j]["Channelcount"];

                    var IsPackwithSubs = false;
                    var SubscriptionDate = "";
                    if (ChannelDataTable[j]["IsPckwithSubs"] == "1") {
                        if (localStorage.getItem("IsPrepaid") == "true")
                            ChannelIdsList += ChannelDataTable[j]["PrePolID"] + ",";
                        else
                            ChannelIdsList += ChannelDataTable[j]["ProductID"] + ",";
                        IsPackwithSubs = "checked = true";
                        SubscriptionDate = '' + StartDate + ' to <br/><span class="EndDate" id="EndDate' + index + '">' + ChannelDataTable[j]["EndDate"] + '<span>';
                    }
                    else {
                        IsPackwithSubs = "";
                        SubscriptionDate = '<span id="StartDate' + index + '" class="StarttoEnd" style="display:none;float:right">' + StartDate + ' to </span><p style="display:none" class="StarttoEnd"></p><span class="EndDate" id="EndDate' + index + '">Only for selected product</span>';
                    }
                    AlacartHtml += '<ul data-productname="' + Channel + '" data-conectionid="' + ConnectionId + '" data-channelscount="' + Channelcount + '" data-custID="' + CustomerId + '" data-productType=1 data-bouquetid="' + ChannelDataTable[j]["ProductID"] + '" data-mainbouquet="' + Channel + '"  data-mainrate="' + ChannelRate + '" data-IsApply="' + ChannelDataTable[j]["IsPckwithSubs"] + '" data-tenureperiodin="' + ChannelDataTable[j]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ChannelDataTable[j]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-polid="' + ChannelDataTable[j]["PrePolID"] + '" data-multitermsubs="' + ChannelDataTable[j]["MultiTermSubscription"] + '" data-TenureType="' + ChannelDataTable[j]["TenureType"] + '" data-tabtype=3 style="margin:0px;float:left; text-align: center;min-width: auto;min-height: 46px;width: 100%;height: 100%;border-bottom: 1px solid #e4e2e2; border-left: 1px solid #e4e2e2;border-right: 1px solid #e4e2e2;padding: 2px 2px 2px 22px;">' +
                                     '<li style="width:100%float:left;width: 100%;text-align: left;"><label  style=" cursor: pointer;color: black;font-size: 15px;float:left; width: 46%;">' + Channel + '</label>';
                    //if (localStorage.getItem("IsPrepaid") == "true")
                    //AlacartHtml += '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;">Start Date : &nbsp;&nbsp; ' + StartDate + '</div>';

                    if (localStorage.getItem("IsPrepaid") == "false") {
                        AlacartHtml += '<div class="switch PostpaidSetting" id="switch" style="margin-top: 5px; margin-right: 6px;float:right;" onclick="javascript:CurrCSChannelBColor(this); return false;">' +
                                        '<input type="checkbox" ' + IsPackwithSubs + ' id="Check' + index + '" />' +
                                //'<label for="Check' + index + '"></label>' +
                                        '<div class="switch-slider round"></div>' +
                                        '</div>';
                    }
                    AlacartHtml += '<div style="padding: 3px 10px 0px 0px;float:right">' +
                                          '<label style=" cursor: pointer;font-weight: 500;font-size: 18px;color: #646464;">Rs.&nbsp;' + ChannelRate + '</label>' +
                                   '</div>' +
                            '</li>';
                    if (localStorage.getItem("IsPrepaid") == "true") {
                        AlacartHtml += '<li style="float:left;width:100%;" class="PreapaidSetting">' +
                                         '<div style="float: left; width:40%; display:block" class="PreapaidSetting">' +
                                             '<div style="float:left;margin-right: 5px;" ' + MultiTenure + '>Product Term</div>' +
                                             '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">' +
                                                    '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + ' field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)"  />' +
                                                    '<input type="text" name="quantity" value="1" class="qty" />' +
                                                    '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />' +
                                             '</form>' +
                                             '<div class="VewDetailsChnl">' +
                                                    '<a href="javascript:void(0);" title="Info" onclick="javascript:ChannelDeatils(\'' + ChannelDataTable[j]["TenureType"] + '\',\'' + ChannelDataTable[j]["TenurePeriodIN"] + '\',\'' + ChannelDataTable[j]["TenurePeriodValue"] + '\',\'' + StartDate + '\',\'' + ChannelDataTable[j]["EndDate"] + '\'); return false;" ><p class="mdi-action-info-outline"></p>&nbsp;View Details</a>&nbsp;&nbsp;' +
                                             '</div>' +
                                       '</div>' +


                                        '<div class="switch PreapaidSetting" id="switch" style="margin-top: 10px;margin-right: 6px;float:right;"  onclick="javascript:CurrCSChannelBColor(this); return false;">' +
                                            '<input type="checkbox" ' + IsPackwithSubs + ' id="Check' + index + '" />' +
                                            '<div class="switch-slider round"></div>' +
                                         '</div>' +
                                         '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;text-align: left">Subscription for the period (' + SubscriptionDate + ')</div>';
                    }
                    AlacartHtml += '<div style="clear:both;"></div>' +
                                   '</li>' +
                                '</ul>';
                    index++;
                    CurrCSChannelBColor();

                }
                Finalala = Finalala + ChannelLi + AlacartHtml + ChannelLiClose;
            }
        }

        AlacartHtml = Finalala;
        var FinalBroadCast = ""
        $("#BrodCastMajor").html('<div class="PackegsHeading">Basic Pack</div> ');
        $("#BrodCastAddOn").html('<div class="PackegsHeading">Addon Pack</div> ');

        //LiWiseChannel += ChannelLi + ChannelLiClose;
        //ChannelMainHtml = ChannelUlOpen + LiWiseChannel + ChannelUlClose;

        $(ConnectionDataTable2).each(function (e, k) {
            ConnectionPakageType = 2;
            BroadCasterLi = '';

            if ($('#brodheaderdiv' + k.BrodCasterID).length == 0) {
                BroadCasterLi = '<li ' + ActiveClass + '>' +
                                     '<div id ="brodheaderdiv' + k.BrodCasterID + '" style="padding: 0 0rem;font-size: 15px;color:#444444;background: #ffffff;" class="collapsible-header BrodcasterColsp-header ' + ActiveClass + '" onclick="javascript:collapsibleNew(this); return false;"><i class="fa fa-plus-circle" style="margin-right: 0rem;font-size: 1.1rem;"></i>' + k.BrodCasterName + ' <span class="SelectMainBroad" style="float:right"></span> </div>' +
                                     '<div class="collapsible-body BrodcasterColsp-body" id="brodChilddiv' + k.BrodCasterID + '">' +//' + FirstLiBody + '
                                     '';
                BroadOptions = '<li data-broadname="' + k.BrodCasterName + '" data-BroadCastid="' + k.BrodCasterID + '"> <span onclick="javascript:BroadfilterChekBox(this); return false;" id="switched" style="margin-top: 0px;float:left;width:100%"><input type="checkbox" id="CHekBoxNew' + k.BrodCasterID + '" data-value="11"> <label class="Generlable" for="CHekBoxNew' + k.BrodCasterID + '">' + k.BrodCasterName + '</label> </span></li>'
                $("#BrowsBroad").append(BroadOptions);
            }
            AddonHtml = '';
            if (k["IsbrodProduct"] == "1") {
                if (k["ProductType"] == "MPkg") {

                    var AddonRate = parseFloat(k["Rate"]).toFixed(2);
                    var IsPackwithSubs = false;
                    var PackagetypeType = k['ProductType'];
                    var Addon = "";// k["ProductName"];
                    // BroadCastArray += k["ProductName"];
                    if (k["IsPckwithSubs"] == "1") {
                        BroadCastIdsList += k["PrePolID"] + ",";
                        BouqueBroadName += Addon + ",";
                        IsPackwithSubs = "checked = true";
                    }
                    else
                        IsPackwithSubs = "";


                    if (localStorage.getItem("IsPrepaid") == "false") {
                        Addon = k["ProductName"];
                        BroadCastArray += k["ProductName"];
                    }
                    else {
                        Addon = k["PolicyName"];
                        BroadCastArray += k["PolicyName"];

                        StartDate = k["StartDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : k["StartDate"];
                        if (k["MultiTermSubscription"] == false)
                            MultiTermSubscription = " Class=disabled";
                        else
                            MultiTermSubscription = "";
                    }

                    AddonHtml = '<ul data-productname="' + Addon + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-custID="' + CustomerId + '" data-polid="' + k["PrePolID"] + '" data-channelscount="' + k["Channelcount"] + '" data-productType=2 data-bouquetid="' + k["ProductID"] + '" data-mainbouquet="' + Addon + '"  data-mainrate="' + AddonRate + '" data-tabtype=2 data-isapply="' + k["IsPckwithSubs"] + '" style="padding: 2px 2px 2px 22px;background-color: #FFF; margin-bottom: 2px; margin-top: 2px; border-bottom: 1px solid #ffffff; border-left: 1px solid #e4e2e2;border-right: 1px solid #e4e2e2;">' +
                                         '<li style="color: #3e3e3e;padding: 5px;">' +
                                           '<div style="float:left;font-size: 18px;width: 64%;">' + Addon + '</div>' +
                                           '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;">Start Date : &nbsp;&nbsp; 01-Sep-2019</div>' +
                                           '<div style="float:right;font-weight: 400; margin-right: 18px;font-size: 18px;color:black;">Rs.&nbsp;' + AddonRate + '</div>' +
                                           '<div style="clear:both;"></div>' +
                                         '</li>' +
                                         '<li style="color:black;padding: 0px 5px 0px 5px;font-size: 13px;">' +
                                          '<div style="float:left;width: 100px;">Channels</div>' +
                                              '<div style="float:left;">:&nbsp ' + k["Channelcount"] + '&nbsp;</div>' +
                                                '<div style="float:left;font-size: 15px;margin-left: 0px;">' +
                                                     '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + k["ProductID"] + '); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Channels</a>&nbsp;&nbsp;' +
                                                '</div>' +
                                                 '<div style="float:right;" id="ChangeBouquet">' +
                                                    '<label class="switch">' +
                                                    '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:NCFBrodMajorCheckBox(this); return false;">' +
                                                    '<div class="switch-slider round"></div>' +
                                                    '</label>' +
                                                     '</div>' +
                                                    '<div style="clear:both;"></div>' +
                                          '</li>' +
                                     '</ul>';
                    index++;

                    if ($('#brodheaderdiv' + k.BrodCasterID).length == 0) {
                        $("#BrodCastAddOn").append(BroadCasterLi)
                    }

                    if ($('#brodheaderdiv' + k.BrodCasterID).length > 0) {
                        $("#brodChilddiv" + k.BrodCasterID).append(AddonHtml)
                    }
                }

                if (k["ProductType"] == "APkg") {
                    var Addon = ""// k["ProductName"];
                    var AddonRate = parseFloat(k["Rate"]).toFixed(2);
                    var PackagetypeType = k['ProductType'];
                    var SubscriptionDate = "";
                    if (k["IsPckwithSubs"] == "1") {
                        BroadCastIdsList += k["PrePolID"] + ",";
                        BouqueBroadName += Addon + ",";
                        IsPackwithSubs = "checked = true";
                        SubscriptionDate = ''+ StartDate + ' to <br/><span class="EndDate" id="EndDate' + index + '">' + k["EndDate"] + '</span>';
                    }
                    else {
                        IsPackwithSubs = "";
                        SubscriptionDate = '<span id="StartDate' + index + '" class="StarttoEnd" style="display:none;float:right">' + StartDate + ' to</span><p style="display:none" class="StarttoEnd"></p><span class="EndDate" id="EndDate' + index + '">Only for selected product</span>';
                    }

                    if (localStorage.getItem("IsPrepaid") == "false") {
                        Addon = k["ProductName"];
                        BroadCastArray += k["ProductName"] + ",";
                    }
                    else {
                        Addon = k["PolicyName"];
                        BroadCastArray += k["PolicyName"] + ",";

                        StartDate = k["StartDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : k["StartDate"];
                        if (k["MultiTermSubscription"] == false || k["IsPckwithSubs"] == "1") {
                            MultiTermSubscription = " Class=disabled style='border: 2px solid #d2d0cc;display:none'";
                            MultiSubsAdd = " style='border-left: 2px solid #d2d0cc !important'";
                            MultiSubsMinus = " border-right: 2px solid #d2d0cc !important";
                        }
                        else {
                            MultiTermSubscription = " style='border: 2px solid #f4c93c;display:block'";
                            MultiSubsAdd = " style='border-left: 2px solid #f4c93c !important'";
                            MultiSubsMinus = " border-right: 2px solid #f4c93c !important";
                        }
                    }
                    BrodAPKGHtml = '<ul data-productname="' + Addon + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-custID="' + CustomerId + '"' +
                                    'data-channelscount="' + k["Channelcount"] + '" data-polid="' + k["PrePolID"] + '" data-productType=2 ' +
                                    'data-bouquetid="' + k["ProductID"] + '" data-mainbouquet="' + Addon + '"  data-mainrate="' + AddonRate + '" data-isapply="' + k["IsPckwithSubs"] + '"  data-tenureperiodin="' + k["TenurePeriodIN"] + '" data-tenureperiodvalue="' + k["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-multitermsubs="' + k["MultiTermSubscription"] + '" data-TenureType="' + k["TenureType"] + '" ' +
                                    'data-tabtype=2  style="padding: 2px 2px 2px 22px;background-color: #FFF; margin-bottom: 2px; margin-top: 2px; border-bottom: 1px solid #e4e2e2; border-left: 1px solid #e4e2e2;border-right: 1px solid #e4e2e2;">' +
                                         '<li style="color: #3e3e3e;padding: 5px;">' +
                                           '<div style="float:left;font-size: 18px;width: 46%;">' + Addon + '</div>';
                    //if (localStorage.getItem("IsPrepaid") == "true")
                    //    BrodAPKGHtml += '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;">Start Date : &nbsp;&nbsp; ' + StartDate + '</div>';

                    BrodAPKGHtml += '<div style="float:right;font-weight: 400; font-size: 18px;color:black;">Rs.&nbsp;' + AddonRate + '</div>' +
                                     '<div style="clear:both;"></div>' +
                                   '</li>' +
                                   '<li style="color:black;padding: 0px 5px 0px 5px;font-size: 13px;">';

                    if (localStorage.getItem("IsPrepaid") == "false") {
                        BrodAPKGHtml += '<div style="display:none" class="PostpaidSetting">' +
                                                '<div style="float:left;width: 100px;">Channels</div>' +
                                                '<div style="float:left;">:&nbsp ' + k["Channelcount"] + '&nbsp;</div>' +
                                                '<div style="float:left;font-size: 15px;margin-left: 0px;">' +
                                                       '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + k["ProductID"] + '); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Channels</a>&nbsp;&nbsp;' +
                                                  '</div>' +
                                               '</div>' +
                                         '<div style="float:right;" id="ChangeBouquet" class="PostpaidSetting">' +
                                               '<label class="switch">' +
                                                 '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:MainBouquetChange(this); return false;">' +
                                                 '<div class="switch-slider round"></div>' +
                                               '</label>' +
                                         '</div>';
                    }
                    if (localStorage.getItem("IsPrepaid") == "true") {
                        BrodAPKGHtml += '<div style="float: left; width:40%; display:block" class="PreapaidSetting">' +
                                           '<div style="float:left;font-size: 15px;" ' + MultiTenure + '>Product Term</div>' +
                                           '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">' +
                                            '<input style="float:left; ' + MultiSubsMinus + '" type="button" value="-" class="qtyminus LessBtn"  field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)"  />' +
                                            '<input style="float:left" type="text" name="quantity" value="1" class="qty" />' +
                                            '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />' +
                                           '</form>' +
                                           '<div class="VewDetailsChnl">' +
                                                '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + k["ProductID"] + ',\'' + k["TenureType"] + '\',\'' + k["TenurePeriodIN"] + '\',\'' + k["TenurePeriodValue"] + '\',\'' + k["Channelcount"] + '\',\'' + StartDate + '\'); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;' +
                                           '</div>' +
                                        '</div>' +
                                        '<div style="float:right;" id="ChangeBouquet" class="PreapaidSetting">' +
                                                 '<label class="switch">' +
                                                '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:EndDateCalculation(this.id);MainBouquetChange(this); return false;">' +
                                                '<div class="switch-slider round"></div>' +
                                                 '</label>' +
                                                '</div>' +
                                       '<div class="PreapaidSetting" style="float:left;font-weight: 400;font-size: 15px;padding-top: 3px;color:black;text-align: left">Subscription for the period (' + SubscriptionDate + ')</div>';
                    }
                    BrodAPKGHtml += '<div style="clear:both;"></div>' +
                                   '</li>' +
                              '</ul>';
                    index++;

                    if ($('#brodheaderdiv' + k.BrodCasterID).length == 0) {
                        $("#BrodCastAddOn").append(BroadCasterLi)
                    }

                    if ($('#brodheaderdiv' + k.BrodCasterID).length > 0) {
                        $("#brodChilddiv" + k.BrodCasterID).append(BrodAPKGHtml)
                    }

                }
            }
        });

        count++;
        //}

        $("#MajorPack").html("");
        $("#AddonPack").html("");


        $("#AlaCarteBody").html("");

        $("#BrodCastMajor").html("");
        $("#BrodAPKGHtml").html("");

        AllBuquename = RecomondedArray;
        var MainBouquetMesg = AddOnMesg = AlcartaMsg = "";
        if (IsConnAddOrNot == true) {
            MainBouquetMesg = "No Bouquet subscribed.";
            AddOnMesg = "No addon subscribed .";
            AlcartaMsg = "No à la carte subscribed .";

        }
        else {
            MainBouquetMesg = "No Bouquet subscribed.";
            AddOnMesg = "No addon subscribed .";
            AlcartaMsg = "No à la carte subscribed .";
        }

        $("#MajorPack").html(MainBouquetHtml == "" ? +$("#MajorPack").css('display', 'none') : '<div class="PackegsHeading">Basic Pack</div> ' + MainBouquetHtml);
        $("#AddonPack").html(MainBouquetAddonHtml == "" ? +$("#AddonPack").css('display', 'none') : '<div class="PackegsHeading">AddOn Pack</div> ' + MainBouquetAddonHtml);
        if (AddonHtml == "")
            $("#BrodCastMajor").css('display', 'none')//$("#BrodCastMajor").css('')//(AddonHtml == "" ? +$("#BrodCastMajor").css('display', 'none'));
        if (BrodAPKGHtml == "")
            $("#BrodCastAddOn").css('display', 'none') //$("#BrodCastAddOn").html(FinalBroadCast == "" ? +$("#BrodCastAddOn").css('display', 'none') : '<div class="PackegsHeading">Addon Pack</div> ' + FinalBroadCast);

        $("#AlaCarteBody").html(AlacartHtml == "" ? +$("#AlaCarteBody").css('display', 'none') : AlacartHtml + clear);
        $("#AlaCartbrow").append(AlaCartOption);
        $('#Loadingbg').css("display", 'none');


        if (parseInt(bit) == 2) {
             $("#plans").css("display", "none");
            $('#materialize-lean-overlay-1').hide();
            $("#PackSubTitle").html(Title1);
            $("#breadcrumbs-wrapper1").css("display", "block");
            $("#MangePacks").css("display", "block");
            $("#ConnectionTotal").css("display", "block");
        }
        else {
            $('#ProductDetails').css('display', 'block');
            $("#plans").css("display", "block");
            //$('#materialize-lean-overlay-1').show();
        }

        if (localStorage.getItem("IsPrepaid") == "true") {
            $(".PreapaidSetting").css('display', 'block');
            $(".PostpaidSetting").css('display', 'none');
            $(".PostpaidSetting").find('input[type="checkbox"]').prop('checked', false);

        }
        else {
            $(".PreapaidSetting").css('display', 'none');
            $(".PostpaidSetting").css('display', 'block');
            $(".PreapaidSetting").find('input[type="checkbox"]').prop('checked', false);
        }
        MainBouquetChange("all");
    }
    else {
        MsgBox("E", "Something went wrong, please try again later!");
    }
    $('#ConnectionDetails').text('');
    $('#ConnectionDetails').text($('#ConnectionDetails').text() + '(' + localStorage.getItem("ConnectionDetailName") + ')');
    bit = 2;
}

function OnFailParConnDetails(result) {
    MsgBox("E", "Something went wrong, please try again later!");
}

function GetMainBouquet() {
    $("#MangePacks").css("display", "none");
    $("#ConnectionTotal").css("display", "none");
    $('#Loadingbg').css("display", 'block');
    //STBNumber = LogInDataTable[0]["StbID"];

    //MMNumber = LogInDataTable[0]["MemShipNo"];
    //var ConnectionID = "";
    //var SerialNo = "";
    //if (STBNumber != "") {
    //    SearchBy = "1"
    //}
    //else if (VCNumber != "") {
    //    SearchBy = "0";
    //}
    //else if (MMNumber != "") {
    //    SearchBy = "2";
    //}
    var listType = "1";
    SearchBy = "0";
    PushData('SearchBy', SearchBy);
    PushData('OPID', OperatorId);
    VCNumber = localStorage.getItem("SmartCardNumber");
    PushData('SmartCard', VCNumber);
    //PushData('STBNumber ', STBNumber);
    //PushData('MMNumber ', MMNumber);
    //PushData('ConnectionID ', ConnectionID);
    PushData('listtype', listType);
    PushData('IsPrepaid', localStorage.getItem("IsPrepaid"));
    CallPublicAPI('MyConnections.aspx/GetMainBouquet', '', OnPassGetMainBouquet, OnFailGetMainBouquet);
}

function OnPassGetMainBouquet(result) {

    var Data = result.d == "" ? null : JSON.parse(result.d);
    var BgColor = "";
    var index = 1;
    var Clear = '<div style="clear:both;"></div>';
    if (Data["Status"] == "Success") {
        $("#ManageAddOn").css("display", "none");
        $("#ManagePakege").css("display", "block");
        CurrentPackType = 1;
        var MainBouquetHtml = "";
        var PrePolID = "";
        var ProductID = $("#BasePackBody ul").data("mainbouquetid");

        localStorage.setItem("ProductId", ProductID);
        var MainBouquetList = $.grep(Data["Description"], function (items) {
            return items['ProductID'] != localStorage.getItem("ProductId");
        });

        if (MainBouquetList.length != 0) {
            for (var i = 0; i < MainBouquetList.length; i++) {
                MainBouquetHtml += '<ul data-polid="' + MainBouquetList[i]["PrePolID"] + '" data-bouquet="' + MainBouquetList[i]["ProductName"] + '"  data-rate="' + parseFloat(MainBouquetList[i]["Rate"]).toFixed(2) + '" style="padding: 2px;background-color: #FFF; margin-bottom: 2px; margin-top: 2px; border-bottom: 1px solid #e4e2e2;">' +
                                         '<li style="color: #fc8002;padding: 5px;">' +//background: #EFEFEF;
                                           '<div style="float:left;font-size: 18px;">' + MainBouquetList[i]["ProductName"] + '</div>' +
                                           '<div style="float:right;font-weight: 400; margin-right: 18px;font-size: 18px;color:black;">Rs.&nbsp;' + parseFloat(MainBouquetList[i]["Rate"]).toFixed(2) + '</div>' +
                                           '<div style="clear:both;"></div>' +
                                         '</li>' +
                                           '<li style="color: black;padding: 0px 5px 0px 5px;font-size: 13px;">' +
                                                '<div style="float:left;width: 100px;">Channels</div>' +
                                                '<div style="float:left;width: 10px;">:</div>' +
                                                '<div style="float:left;"> ' + MainBouquetList[i]["ChannelCount"] + '</div>' +
                                                '<div style="float:left;font-size: 15px;margin-left: 10px;">' +
                                                    '<a href="javascript:void(0);" title="Info"  onclick="javascript:GetMainAddonChannelList(this,' + MainBouquetList[i]["ProductID"] + '); return false; "><i class="mdi-action-info-outline"></i>&nbsp;View Channels</a>&nbsp;&nbsp;' +
                                                '</div>' +
                                                '<div style="float:right;margin-right: 18px;">' +
                                                '<label class="switch">' +
                                                  '<input type="checkbox" id="check' + index + '" onchange="javascript:MainBouquetChange(this); return false;">' +
                                                  '<div class="switch-slider round"></div>' +
                                                '</label>' +
                                                '</div>' +
                                                '<div style="clear:both;"></div>' +
                                            '</li>' +
                                     '</ul>';
                index++;
                $("#MainBouquetList").html("");
                $("#MainBouquetList").append(MainBouquetHtml + Clear);
                $('#Loadingbg').css("display", 'none');
                $("#PackSubTitle").html(Title2);
                $("#GoBackManagePacks").css("display", "inline-block");
                $("#Submit").css("display", "inline-block");
                $("#MainBouquetList").css("display", "block");
                $("#PackSubTitle").css("display", "block");
            }
        }
        else {
            $('#Loadingbg').css("display", 'none');
            $("#MangePacks").css("display", "block");
            $("#ConnectionTotal").css("display", "block");
            MsgBox("E", "No Bouquet avaliable.");
        }
    }
    else {
        $('#Loadingbg').css("display", 'none');
        $("#MangePacks").css("display", "block");
        $("#ConnectionTotal").css("display", "block");
        MsgBox("E", "No Bouquet avaliable.");
    }
}

function OnFailGetMainBouquet(result) {
    $('#Loadingbg').css("display", 'none');
    MsgBox("E", "Something went wrong, please try again later!");
}



function GetChannelList() {
    $("#MangePacks").css("display", "none");
    $('.preloader-wrapper').fadeIn("slow");

    var listType = "4";
    SearchBy = "0";
    PushData('SearchBy', SearchBy);
    PushData('OPID', OperatorId);
    VCNumber = localStorage.getItem("VCNumber");
    PushData('SmartCard', VCNumber);
    PushData('listtype', listType);
    PushData('IsPrepaid', localStorage.getItem("IsPrepaid"));
    CallPublicAPI('MyConnections.aspx/GetMainBouquet', '', OnPassGetChannelList, OnFailGetChannelList);
}

function OnPassGetChannelList(result) {
    var ChannelDataTable = result.d == "" ? null : JSON.parse(result.d);
    var BgColor = PrePolID = "";

    var ChannelUlOpen = ChannelUlClose = ChannelLi = ChannelLiClose = ChannelMainHtml = ActiveClass = ActiveClass1 = FirstLiBody = ChannelListHtml = LiWiseChannel = "";
    var FloatClear = '<div style="clear:both;"></div>';
    var IsCallFirstTime = true;
    var PIDArray = [];


    if (ChannelDataTable["Status"] == "Success") {
        $("#GoBackManagePacksAddon").show();
        CurrentPackType = 3;/*3 for à la carte*/
        $("#ContentTopBarTittle").text("à la carte");
        $("#breadcrumbs-wrapper3 #ApplyTitle").html("Your à la carte");

        ChannelUlOpen = '<ul class="collapsible collapsible-accordion" data-collapsible="accordion" id="CollChannels" style="display:block;">';
        ChannelUlClose = '</ul>';
        ChannelLiClose = '</div></li>';

        //for (var i = 0; i < ChannelDataTable.length; i++) {
        //    if (jQuery.inArray(ChannelDataTable[i]["PackageID"], PIDArray) == -1) {
        //        PIDArray.push(ChannelDataTable[i]["PackageID"]);
        //    }
        //}
        for (var i = 0; i < ChannelDataTable["Description"].length; i++) {
            if (jQuery.inArray(ChannelDataTable["Description"][i]["Genre"], PIDArray) == -1) {
                PIDArray.push(ChannelDataTable["Description"][i]["Genre"]);
            }
        }


        for (var i = 0; i < PIDArray.length; i++) {

            ChannelLi = "";
            ChannelListHtml = "";

            var DataTable = $.grep(ChannelDataTable["Description"], function (itm) {
                return itm['Genre'] == PIDArray[i];
            });

            for (var j = 0; j < DataTable.length; j++) {


                if (j == 0) {
                    ChannelLi += '<li ' + ActiveClass + '>' +
                                   '<div style="background-color: #FFF;color: #444444;" class="collapsible-header commonclsChannel ' + ActiveClass1 + '" onclick="javascript:collapsible(this); return false;" data-packageid="' + DataTable[j]["ProductID"] + '"><i class="fa fa-plus-circle"></i>&nbsp;' + DataTable[j]["ProductName"] + '</div>' +
                                   '<div class="collapsible-body" ' + FirstLiBody + '>' +
                                   '<div class="input-field ChkUnChkAll" style="margin-top: 0px;text-align: right;width: 98%;margin-bottom: 25px;">' +
                                          '<input type="checkbox" id="CheckAll' + DataTable[j]["RowIndex"] + '" onchange="javascript:CheckAllChannels(this); return false;" />' +
                                          '<label for="CheckAll' + DataTable[j]["RowIndex"] + '">Check All</label>' +
                                   '</div>';

                }
                if (localStorage.getItem("IsPrepaid") == "false")
                    PrePolID = DataTable[j]["ProductID"];
                else
                    PrePolID = 'data-prepaidpolid="' + DataTable[j]["PrepaidPolID"] + '"';

                var ChannelImg = "";
                if (DataTable[j]["ImgPath"] != "" || DataTable[j]["ImgPath"] != undefined) {
                    //ChannelImg = '<img src=" ../' + DataTable[j]["ImgPath"] + '" alt="' + DataTable[j]["ImgName"] + '" style="width:60%; max-height: 40px;"/>';
                    ChannelImg = '<img src="' + DataTable[j]["ImgPath"] + '" alt="' + DataTable[j]["ImgName"] + '" style="width:60%; max-height: 40px;"/>';

                    //
                }
                else
                    ChannelImg = '<img src="Images/imagenotavailable.png" style="height:40px;width: 40px;"/>';

                ChannelListHtml += '<ul onclick="javascript:checkCurrBox(this); return false;" data-channelid="' + DataTable[j]["PrePolID"] + '"  data-channel="' + DataTable[j]["ProductName"] + '"  data-rate="' + parseFloat(DataTable[j]["Rate"]).toFixed(2) + '" style="margin:8px;float:left; text-align: center;width: 120px;height: 120px;">' +
                                    '<li>' + /*style="min-height: 50px;"*/
                                        '<div class="input-field" style="margin-top: 3px;float:left;width:20%;">' +
                                            '<input type="checkbox" id="Check' + DataTable[j]["RowIndex"] + '" />' +
                                            '<label for="Check' + DataTable[j]["RowIndex"] + '"></label>' +
                                         '</div>' +
                                        '<label  style="cursor: pointer;float:left;width:80%;margin-top: 8px;">' + ChannelImg + '</label>' +
                                        '<div style="clear:both;"></div>' +
                                        '</li>' +
                                        '<li><label style="cursor: pointer;font-size: 10px;text-transform: uppercase;">' + DataTable[j]["ProductName"] + '</label></li>' +
                                        '<li style="padding: 0px 5px 0px 5px;">' +
                                               '<label  style=" cursor: pointer;font-weight: 600;font-size: 12px;">Rs.&nbsp;' + parseFloat(DataTable[j]["Rate"]).toFixed(2) + '</label>' +
                                        '</li>' +
                                     '</ul>';
            }

            LiWiseChannel += ChannelLi + ChannelListHtml + FloatClear + ChannelLiClose;
        }
        ChannelMainHtml = ChannelUlOpen + LiWiseChannel + ChannelUlClose;
        $("#MainBouquetList").html("");
        $("#MainBouquetList").append(ChannelMainHtml);
        $('#Loadingbg').css('display', 'none');

        $("#PackSubTitle").html(Title3);

        $("#CollChannels .active").find("i").removeClass("fa fa-plus-circle");
        $("#CollChannels .active").find("i").addClass("fa fa-minus-circle");

        $("#GoBackManagePacks").css("display", "inline-block");
        $("#Submit").css("display", "none");
        $("#MainBouquetList").css("display", "block");
        $("#PackSubTitle").css("display", "block");

        $("#breadcrumbs-wrapper3").css("display", "block");

        //$('#Loadingbg').css('display', 'none');
        $('.preloader-wrapper').delay(100).fadeOut();
    }
    else {
        $('.preloader-wrapper').delay(100).fadeOut();
        $("#MangePacks").css("display", "block");
        MsgBox("E", "No channel's avaliable.");
    }
}

function OnFailGetChannelList(result) {

    $('#Loadingbg').css('display', 'none');
}

function GoBackMyConnection() {


    $("#GoBackManagePacks").css("display", "none");
    $("#Submit").css("display", "none");
    $("#breadcrumbs-wrapper1").css("display", "none");

    $("#PackSubTitle").html(Title1);
    if (localStorage.getItem("IsPrePostType") == "0") {
        if (LogInDataTable[0]["IsDayWise"] == false)
            $('#ProductDetails').css('display', 'block');

        else
            $('#ProductDetails').css('display', 'none');
    }
    else
        $('#ProductDetails').css('display', 'none');

    //$("#ContentTopBarTittle").text("My Packs And Channels");

    $("#GoBackManagePacksAddon").hide();
    $("#SubmitAddOn").hide();


    $("#AlaCarteBody").html("");
    $("#MainBouquetList").html("");

    $("#MajorPack").html("");
    $("#AddonPack").html("");
    $("#BrodCastMajor").html("");
    $("#BrodAPKGHtml").html("");

    $("#breadcrumbs-wrapper3 #ApplyDetails").html("");
    $("#breadcrumbs-wrapper3").css("display", "none");

    $("#MangePacks").css("display", "none");
    $("#MainBouquetList").css("display", "none");
    $("#ConnectionTotal").css("display", "none");

    $("#plans").css("display", "block");
}

function GoBackManagePacks() {

    $("#GoBackManagePacks").css("display", "none");
    $("#Submit").css("display", "none");

    $("#MainBouquetList").html("");
    $("#MainBouquetList").css("display", "none");

    $("#GoBackManagePacksAddon").hide();
    $("#SubmitAddOn").hide();

    $("#ContentTopBarTittle").html("Manage Packs");
    $("#PackSubTitle").html(Title1);

    $("#breadcrumbs-wrapper3 #ApplyDetails").html("");
    $("#breadcrumbs-wrapper3").css("display", "none");

    $("#ConectionsId").removeClass("Active");

    $("#ApplyTotal").html("Total Rs. : 0");

    // $("#BasePackBody").css("display", "block");
    // $("#AddOnPackBody").css("display", "none");
    // $("#AlaCarteBody").css("display", "none");
    $("#MangePacks").css("display", "block");
    $("#ConnectionTotal").css("display", "none");

}

function GetshowhideChannelDetails(ctrl) {
    $("#orrsDiag .collapsible > li").removeClass("active");
    $("#orrsDiag .collapsible-header").removeClass("active");
    $("#orrsDiag .active").removeClass('active');
    $("#orrsDiag .collapsible-header").css("color", '#444444');

    //$("#orrsDiag .collapsible-body").css("display", 'none');
    //$("#orrsDiag .collapsible-body").stop(!0, !1).slideUp({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function () { $(ctrl).next('div').css("height", "") } });

    $(ctrl).closest('li').addClass("active");
    $(ctrl).next("#orrsDiag .collapsible-body").stop(!0, !1).toggle({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function () { $(ctrl).next('div').css("height", "") } });

    if ($(ctrl).find("i").hasClass("fa-minus-circle")) {
        $(ctrl).find("i").removeClass("fa fa-minus-circle");
        $(ctrl).find("i").addClass("fa fa-plus-circle");
    }
    else {
        $(ctrl).find("i").removeClass("fa fa-plus-circle");
        $(ctrl).find("i").addClass("fa fa-minus-circle");
    }

}

function collapsibleNew(ctrl) {
    $("#AlaCarteBody  > li").removeClass("active");
    $("#AlaCarteBody .collapsible-header").removeClass("active");
    //$("#AlaCarteBody .collapsible-body").stop(!0, !1).toggle({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function () { $(this).css("height", "") } });

    //$(ctrl).parent().addClass("active").parent().addClass("active");
    $(ctrl).next(".collapsible-body").stop(!0, !1).toggle({ duration: 200, easing: "easeOutQuart", queue: !1, complete: function () { $(this).css("height", "") } });
    if ($(ctrl).find("i").hasClass("fa-minus-circle")) {
        $(ctrl).find("i").removeClass("fa fa-minus-circle");
        $(ctrl).find("i").addClass("fa fa-plus-circle");
    }
    else {
        $(ctrl).find("i").removeClass("fa fa-plus-circle");
        $(ctrl).find("i").addClass("fa fa-minus-circle");
    }
}

function RemoveAddonBuq() {
    var Addonid = Addon = "";

    if ($("#MangePacks #AddOnPackBody").find('.switch input[type="checkbox"]:checked').length > 0) {

        if (localStorage.getItem("IsPrepaid") == "false") {

            $("#MangePacks #AddOnPackBody ul").each(function () {
                if ($(this).find('.switch input[type="checkbox"]').prop("checked") == true) {
                    Addonid += $(this).closest("ul").data("polid") + ",";
                    //Addon += $(this).closest("ul").data("bouquet") + ",";
                }
            });

            RemoveBouquetIDs = Addonid;
            //RemoveBouquets = Addon;
            CurrentPackType = 2;
            RemoveConnectionDetails(true);
            removeAddon = "false";
            removeAllaCart = "false";
        }
        else {
            RemoveBouquetIDs = AddOnID + '~0~0~1';
            CurrentPackType = 2;
            RemoveConnectionDetails(true);
            removeAllaCart = "false";
            removeAddon = "false";

        }
    }
    else
        MsgBox("E", "Please select Addon.");
}

function RemoveAlaCartes() {

    var channelid = channel = "";

    if ($("#MangePacks #AlaCarteBody ul").find('input[type="Checkbox"]:checked').length > 0) {
        if (localStorage.getItem("IsPrepaid") == "false") {

            $("#MangePacks #AlaCarteBody ul").each(function () {
                if ($(this).find('input[type="checkbox"]').prop("checked") == true) {
                    channelid += $(this).data("channelid") + ",";
                    //channel += $(this).data("channel") + ",";
                }
            });

            RemoveChannelID = channelid;
            //RemoveChannel = channel;
            CurrentPackType = 3;
            RemoveConnectionDetails(true);
            removeAllaCart = "false";
            removeAddon = "false";


        }
        else {
            RemoveChannelID = RID + '~1~0~1';
            CurrentPackType = 3;
            RemoveConnectionDetails(true);
            removeAllaCart = "false";
            removeAddon = "false";
        }
    }
    else
        MsgBox("E", "Please select à la carte.");
}

function NewSetConnectionDetails() {
    MsgBoxConfirm();
}

function CheckAllChannels(ctrl) {

    var CheckStatus = $(ctrl).prop("checked");
    if (CheckStatus == true) {
        $(ctrl).next("label").text("Uncheck All");
        $(ctrl).closest(".collapsible-body").find('ul').css("box-shadow", "0px 1px 5px 1px rgb(252, 128, 2)");

        var channelImg = "";
        var TotalRate = 0;

        $(ctrl).closest(".collapsible-body").find('ul').each(function () {
            if ($(this).find('input[type="checkbox"]').prop("checked") == false) {
                channelImg += '<ul style="float:left;margin: 10px;"><li style="text-align:right;"><a href="javascript:void(0)" style="color: red;" onclick="javascript:RemoveApplyDetail(this,\'channel\'); return false;"><i class="fa fa-times-circle"></i></a></li><li style="box-shadow: 0px 0px 8px 2px rgba(199,199,199,1);"><img src="' + $(this).find("img").attr("src") + '"  style="height:60px;width: 90px;" data-polid="' + $(this).data("polid") + '" data-channelid="' + $(this).data("channelid") + '"  data-rate="' + $(this).data("rate") + '"  data-channel="' + $(this).data("channel") + '" /></li></ul>';
                TotalRate = TotalRate + $(this).data("rate");
            }
        });

        $("#ApplyDetails").append(channelImg);

        $("#breadcrumbs-wrapper3 #ApplyTotal").html("Total Rs. : " + (parseFloat($("#breadcrumbs-wrapper3 #ApplyTotal").text().split(":")[1]) + parseFloat(TotalRate.toFixed(2))) + "");
    }
    else {
        $(ctrl).next("label").text("Check All");
        $(ctrl).closest(".collapsible-body").find('ul').css("box-shadow", "0px 1px 5px 1px rgba(186,186,186,1)");


        var TotalRate = 0;

        $(ctrl).closest(".collapsible-body").find('ul').each(function () {
            if ($(this).find('input[type="checkbox"]').prop("checked") == true) {
                $('#ApplyDetails img[data-channelid="' + $(this).data("channelid") + '"]').closest("ul").remove();
                TotalRate = TotalRate + $(this).data("rate");
            }
        });

        $("#breadcrumbs-wrapper3 #ApplyTotal").html("Total Rs. : " + (parseFloat($("#breadcrumbs-wrapper3 #ApplyTotal").text().split(":")[1]) - parseFloat(TotalRate.toFixed(2))).toFixed(2) + "");
    }

    $(ctrl).closest(".collapsible-body").find('input[type="checkbox"]').prop("checked", CheckStatus);
}

function checkCurrBox(ctrl) {
    var Status = $(ctrl).find('input[type="checkbox"]').prop("checked");

    if (Status == false) {
        $(ctrl).find('input[type="checkbox"]').prop("checked", true);

        $(ctrl).css("box-shadow", "0px 1px 5px 1px rgb(252, 128, 2)");

        $("#breadcrumbs-wrapper3 #ApplyTotal").html("Total Rs. : " + (parseFloat($("#breadcrumbs-wrapper3 #ApplyTotal").text().split(":")[1]) + $(ctrl).data("rate")) + "");

        $("#ApplyDetails").append('<ul style="float:left;margin: 10px;"><li style="text-align:right;"><a href="javascript:void(0)" style="color: red;" onclick="javascript:RemoveApplyDetail(this,\'channel\'); return false;"><i class="fa fa-times-circle"></i></a></li><li style="box-shadow: 0px 0px 8px 2px rgba(199,199,199,1);"><img src="' + $(ctrl).closest("ul").find("img").attr("src") + '"  style="height:60px;width: 90px;" data-polid="' + $(ctrl).data("polid") + '" data-channelid="' + $(ctrl).data("channelid") + '"  data-rate="' + $(ctrl).data("rate") + '"  data-channel="' + $(ctrl).data("channel") + '" /></li></ul>');
    }
    else {
        $(ctrl).find('input[type="checkbox"]').prop("checked", false);

        $(ctrl).css("box-shadow", "0px 1px 5px 1px rgba(186,186,186,1)");

        $("#breadcrumbs-wrapper3 #ApplyTotal").html("Total Rs. : " + (parseFloat($("#breadcrumbs-wrapper3 #ApplyTotal").text().split(":")[1]) - $(ctrl).data("rate")) + "");

        $("#ApplyDetails img").each(function () {
            if ($(this).data("channelid") == $(ctrl).data("channelid")) {
                $(this).closest("ul").remove();
            }
        });
    }
}

function CurrCSChannelBColor(ctrl) {
    if (ctrl != undefined) {
        
      
        var CheckStatus = $(ctrl).find('input[type="checkbox"]').prop("checked");
        if (CheckStatus == false) {
            $(ctrl).find('input[type="checkbox"]').prop("checked", true);
            //$(ctrl).css("box-shadow", "rgb(224, 224, 224) 0px 1px 5px 1px");
            // Counting += $(ctrl).find('input[type="checkbox"]').prop("checked", true).length;
            MainBouquetChange(ctrl);
        }
        else {
            $(ctrl).find('input[type="checkbox"]').prop("checked", false);
            //$(ctrl).css("box-shadow", "0px 1px 5px 1px rgb(255, 255, 255)");
            // Counting -= $(ctrl).find('input[type="checkbox"]').prop("checked", true).length;
            MainBouquetChange(ctrl);
        }
        var enddateid = $(ctrl).closest('ul').find('input[type="checkbox"]').prop('id');
        if ($("#" + enddateid + "").prop("checked") == true) {
            EndDateCalculation(enddateid);
        }
        else {
            if ($(ctrl).closest('ul').data('isapply') == "0") {
                $("#" + enddateid + "").closest('li').find('.EndDate').text("Only for selected product");
                $("#" + enddateid + "").closest('li').find('.StarttoEnd').css("display", 'none');
            }
        }
        //   Counting += 0;
        if ($(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
            ////////New Work
            if ($(ctrl).context.tagName != "UL")
                $(ctrl).closest(".collapsible-body").closest("li").find(".collapsible-header").find(".SelectMain").html("");
            else
                $(ctrl).closest('li').find('.SelectMain').html("");
            ////////New Work
        }
        else {
            ////////New Work
            if ($(ctrl).context.tagName != "UL")
                $(ctrl).closest(".collapsible-body").closest("li").find(".collapsible-header").find(".SelectMain").html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
            else
                $(ctrl).closest('li').find('.SelectMain').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
            ////////New Work
        }
    }
    else {
        $("#Ala-Carte").find('#switch input[type="checkbox"]:checked').each(function () {

            var CheckStatus = $(this).find('input[type="checkbox"]').prop("checked");
            if (CheckStatus == false) {
                $(this).find('input[type="checkbox"]').prop("checked", true);
                $(this).css("box-shadow", "rgb(224, 224, 224) 0px 1px 5px 1px");
                // Counting += $(ctrl).find('input[type="checkbox"]').prop("checked", true).length;
                MainBouquetChange(ctrl);
            }
            else {
                $(this).find('input[type="checkbox"]').prop("checked", false);
                $(this).css("box-shadow", "0px 1px 5px 1px rgb(255, 255, 255)");
                // Counting -= $(ctrl).find('input[type="checkbox"]').prop("checked", true).length;
                MainBouquetChange(ctrl);
            }
            //   Counting += 0;
            if ($(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
                $(ctrl).closest('li').find('.SelectMain').html("");
            }
            else {
                $(ctrl).closest('li').find('.SelectMain').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
            }


        });
    }
}

function RemoveApplyDetail(ctrl, callType) {

    if (callType == "channel") {
        $('#CollChannels ul[data-channelid="' + $(ctrl).closest("ul").find("li:last img").data("channelid") + '"]').find('input[type="checkbox"]').prop("checked", false);
        $('#CollChannels ul[data-channelid="' + $(ctrl).closest("ul").find("li:last img").data("channelid") + '"]').css("box-shadow", "0px 0px 8px 2px rgba(199,199,199,1)");
        $(ctrl).closest("ul").remove();

        $("#breadcrumbs-wrapper3 #ApplyTotal").html("Total Rs. : " + (parseFloat($("#breadcrumbs-wrapper3 #ApplyTotal").text().split(":")[1]) - parseFloat($(ctrl).closest("ul").find("li:last img").data("rate"))) + "");
    }
}

function validation(IsAddRemove) {
    var flag = true;

    if (IsAddRemove == "true") {
        if (CurrentPackType == 1) {
            if ($("#MainBouquetList").find('.switch input[type="checkbox"]:checked').length == 0) {
                Msg = "Please Select Base Pack.";
                flag = false;
            }
        }


        if (CurrentPackType == 2) {
            if ($("#MainBouquetList").find('.switch input[type="checkbox"]:checked').length == 0) {
                Msg = "Please Select Addon.";
                flag = false;
            }
        }

        if (CurrentPackType == 3) {
            if ($("#ApplyDetails ul").length == 0) {
                Msg = "Please Select à la carte.";
                flag = false;
            }
        }
    }

    return flag;
}

function RemoveConnectionDetails(IsAddRemove) {
    if (validation(IsAddRemove)) {

        $('#Loadingbg').css('display', 'block');

        var CurrBouquetIDs = CurrBouquets = CurrChannelIDs = CurrChannels = RemoveChannelIDs = "";
        if (CurrentPackType == 1) {
            RemoveBouquetIDs = $("#BasePackBody ul").data("polid"); //mainbouquetid
            RemoveBouquets = $("#BasePackBody ul").data("mainbouquet");
        }
        if (CurrentPackType == 2) {

            AlaCartes = "";

        }

        if (CurrentPackType == 3) {

            RemoveBouquetIDs = "";

        }

        RemoveChannelID = RemoveChannelID == undefined ? "" : (RemoveChannelID.toString().indexOf(",") >= 0 ? RemoveChannelID.replace(/^,|,$/g, '') : RemoveChannelID);
        RemoveBouquetIDs = RemoveBouquetIDs == undefined ? "" : (RemoveBouquetIDs.toString().indexOf(",") >= 0 ? RemoveBouquetIDs.replace(/^,|,$/g, '') : RemoveBouquetIDs);

        var IsAuth = "false";
        var IsPrePaid = localStorage.getItem("IsPrepaid");
        var SmartCard = localStorage.getItem("SmartCardNumber");
        var TimeStamp = localStorage.getItem("ModifyTimeStamp");
        var AlaCartes = RemoveChannelID;

        PushData('SmartCard', SmartCard);
        PushData('SubsModifyTimeStamp', TimeStamp)
        PushData('Bouquets', RemoveBouquetIDs)
        PushData('AlaCartes', AlaCartes)
        PushData('OPID', OperatorId);
        PushData('IsAuth', IsAuth)
        PushData('IsPrePaid', IsPrePaid)
        CallPublicAPI('MyConnections.aspx/PostpaidGenerateCRF', '', OnPassRemoveConnection, OnFailRemoveConnection);
    }


    else {
        MsgBox("E", Msg);
    }

}

function OnPassRemoveConnection(result) {
    var RemoveConectionData = result.d == "" ? null : JSON.parse(result.d);
    if (RemoveConectionData["Status"] == "Success") {
        if (removeAddon == "true" || removeAllaCart == "true") {
            SetConnectionDetails("true");
        }
        else {

            var Msg = RemoveConectionData["Description"];
            MsgBox("S", Msg);
            $('#Loadingbg').css('display', 'none');
            IsAddConnection = true;
        }
    }
    else {
        var Msg = RemoveConectionData["Description"];
        MsgBox("E", Msg);
        $('#Loadingbg').css('display', 'none');
    }

}

function OnFailRemoveConnection(result) {

}

function SetConnectionDetails(IsAddRemove) {
    if (validation(IsAddRemove)) {

        $('#Loadingbg').css('display', 'block');

        var NewBouquetIDs = NewBouquets = NewChannelIDs = NewChannels = "";

        if (CurrentPackType != 1) {
            CurrBouquetIDs = localStorage.getItem("PackagePalicyId");
            CurrBouquets = $("#BasePackBody ul").data("mainbouquet") == undefined ? "" : $("#BasePackBody ul").data("mainbouquet") + ',';
        }
        else {
            //CurrBouquetIDs = $("#BasePackBody ul").data("polid");
            CurrBouquets = $("#BasePackBody ul").data("mainbouquet");
        }
        if (CurrentPackType == 1) {

            $("#MainBouquetList").find('.switch input[type="checkbox"]:checked').each(function () {
                NewBouquetIDs = $(this).closest("ul").data("polid");  //+ '@' + $(this).closest("ul").data("rate")
                NewBouquets = $(this).closest("ul").data("bouquet");
            });
        }

        if (CurrentPackType == 2) {

            $("#MainBouquetList").find('.switch input[type="checkbox"]:checked').each(function () {
                NewBouquetIDs += $(this).closest("ul").data("polid") + ","; //'@' + $(this).closest("ul").data("rate")
                NewBouquets += $(this).closest("ul").data("bouquet") + ",";
            });

        }

        if (CurrentPackType == 3) {

            $("#ApplyDetails ul").find('img').each(function () {
                NewChannelIDs += $(this).data("channelid") + ",";
                NewChannels += $(this).data("channel") + ",";
            });

        }

        NewChannelIDs = NewChannelIDs == undefined ? "" : (NewChannelIDs.toString().indexOf(",") >= 0 ? NewChannelIDs.replace(/^,|,$/g, '') : NewChannelIDs);

        NewBouquets = NewBouquets == undefined ? "" : (NewBouquets.toString().indexOf(",") >= 0 ? NewBouquets.replace(/^,|,$/g, '') : NewBouquets);

        NewBouquetIDs = NewBouquetIDs == undefined ? "" : (NewBouquetIDs.toString().indexOf(",") >= 0 ? NewBouquetIDs.replace(/^,|,$/g, '') : NewBouquetIDs);

        var IsAuth = "true";
        var IsPrePaid = localStorage.getItem("IsPrepaid");
        var SmartCard = localStorage.getItem("VCNumber");
        var TimeStamp = localStorage.getItem("ModifyTimeStamp");

        var AlaCartes = NewChannelIDs;
        PushData('OPID', OperatorId);
        PushData('SmartCard', SmartCard);
        PushData('SubsModifyTimeStamp', TimeStamp)
        PushData('IsAuth', IsAuth)
        PushData('IsPrePaid', IsPrePaid)
        PushData('Bouquets', NewBouquetIDs)
        PushData('AlaCartes', AlaCartes)

        CallPublicAPI('MyConnections.aspx/PostpaidGenerateCRF', '', OnPassAddConnection, OnFailAddConnection);
    }
    else {
        MsgBox("E", Msg);
    }

}

function OnPassAddConnection(result) {
    var res = result.d;
    //var Msg = res.split("|");
    var MSG = result.d == "" ? null : JSON.parse(result.d);
    $('#Loadingbg').css('display', 'none');

    if (MSG["Status"] == "Success") {
        RemoveChannelID = RemoveChannel = "";
        IsAddConnection = true;
        MsgBox("S", MSG["Description"]);
        //localStorage.getItem("")
        localStorage.removeItem("ProductId");
    }
    else {

        RemoveChannelID = RemoveChannel = "";

        MsgBox("E", MSG["Description"]);
    }
}

function OnFailAddConnection(result) {
    var res = result.d;

    $('#Loadingbg').css('display', 'none');
}

function confirmAction() {
    if (IsAddConnection == true) {
        GoBackMyConnection();
        IsAddConnection = false;
        GetSubsAllConnection();
    }
    if (IsConnectionView == false) {
        GetSubsAllConnection();
    }
    $('body').css('overflow', 'auto');
}

function NCFMajorCheckBox(ctrl) {
    if ($("#MajorPack").find('.switch input[type="checkbox"]:checked').length == 0 && $("#BrodCastMajor").find('.switch input[type="checkbox"]:checked').length == 0) {
        MsgBox("E", "At-least one Base Pack required");
        $(ctrl).prop("checked", true);

    }
    $("#MajorPack").find('.switch input[type="checkbox"]:checked').each(function () {
        if ($(this).attr("id") != ctrl.id) {
            $(this).prop("checked", false);
            if ($(this).closest('ul').data('isapply') == "0") {
                $(this).closest('li').find('.EndDate').text("Only for selected product");
                $(this).closest('li').find('.StarttoEnd').css("display", 'none');
            }
        }
    });
    $("#BrodCastMajor").find('.switch input[type="checkbox"]:checked').each(function () {
        if ($(this).attr("id") != ctrl.id) {
            $(this).prop("checked", false);
        }
    });
    if ($("#" + ctrl.id + "").prop("checked") == true) {
        EndDateCalculation(ctrl.id);
    }
    
    //EndDateCalculation("#" + ctrl.id + "");

    MainBouquetChange(ctrl);
}

function NCFBrodMajorCheckBox(ctrl) {

    if ($("#MajorPack").find('.switch input[type="checkbox"]:checked').length == 0 && $("#BrodCastMajor").find('.switch input[type="checkbox"]:checked').length == 0) {
        MsgBox("E", "At-least one Base Pack required");
        $(ctrl).prop("checked", true);

    }
    $("#MajorPack").find('.switch input[type="checkbox"]:checked').each(function () {
        if ($(this).attr("id") != ctrl.id) {
            $(this).prop("checked", false);
        }
    });
    $("#BrodCastMajor").find('.switch input[type="checkbox"]:checked').each(function () {
        if ($(this).attr("id") != ctrl.id) {
            $(this).prop("checked", false);
        }
    });
    MainBouquetChange(ctrl);
}

function MainBouquetChange(ctrl) {

    NCFData = [];
    if (ctrl == "all" || $(ctrl).closest('ul').data('tabtype') == 1) {
        $("#RecommendedPack").html("");
        if ($("#RecommendedPack").html("")) {
            $('#RecPackMain').hide();
        }
        /////PostPaid Case
        $("#RecommendedPack2").html("");
        if ($("#RecommendedPack2").html("")) {
            $('#RecPackMain2').hide();
        }
        ///PrePaid Case
        $("#RecommendedPackPre").html("");
        $("#FinalRecommendedPackPre").html("");
        if ($("#RecommendedPackPre").html("")) {
            $('#RecPackMainPrePaid').hide();
        }
        if (localStorage.getItem("IsPrepaid") == 'false') {
            $("#SugestedPacks").find('.PostpaidSetting input[type="checkbox"]:checked').each(function () {
                if ($(this).prop("checked") == true) {
                    var id = ctrl
                    $('#RecPackMain').show();
                    $('#RecPackMain2').show();
                    var Value = ctrl
                    var ProductName = $(this).closest("ul").data("mainbouquet").toString();
                    var ProductRate = $(this).closest("ul").data("mainrate").toString();
                    var tabtype = $(this).closest("ul").data("tabtype").toString();
                    var ChannelCounts = $(this).closest("ul").data("channelscount").toString();
                    var packagetype = $(this).closest("ul").data("packagetype").toString();
                    var CheckboxId = $(this).attr('id');
                    if (tabtype == 1) {
                        $("#RecommendedPack").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="RecommendRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4>Channels : ' + ChannelCounts + '</h4></div>');
                        //$("#RecommendedPack2").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="RecommendRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6> <h4>Channels : ' + ChannelCounts + '</h4></div>');
                        $("#RecommendedPack2").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="RecommendRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6></div>');
                    }
                }
            });
        }
        else {

            //Prepaid Case
            $("#SugestedPacks").find('.PreapaidSetting input[type="checkbox"]').each(function () {
                if ($(this).prop("checked") == true || $(this).closest("ul").data("isapply") == 1) {
                    var id = ctrl

                    $('#RecPackMain').show();
                    $('#RecPackMainPrePaid').show();
                    var Value = ctrl
                    var ProductName = $(this).closest("ul").data("mainbouquet").toString();
                    var ProductRate = $(this).closest("ul").data("mainrate").toString();
                    var tabtype = $(this).closest("ul").data("tabtype").toString();
                    var ChannelCounts = $(this).closest("ul").data("channelscount").toString();
                    var packagetype = $(this).closest("ul").data("packagetype").toString();
                    var StartDate = $(this).closest("ul").data("startdate").toString();
                    var EndDate = $(this).closest("ul").find(".EndDate").text()
                    var CheckboxId = $(this).attr('id');

                    var ProductID = $(this).closest("ul").data("bouquetid").toString();
                    var PolID = $(this).closest("ul").data("polid");
                    var TenureNo = $(this).closest('div').find('#myform').find(".qty").val();
                    if (tabtype == 1) {
                        if ($(this).prop("checked") == true) {
                            var green = ($(this).closest("ul").data("isapply") == 0) ? " style='color: green;'" : "";

                            $("#RecommendedPack").append('<div class="ProductDetailMain"><h5 ' + green + '>' + ProductName + '</h5><h6 ' + green + '>Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4 ' + green + '>Channels : ' + ChannelCounts + '</h4></div>');
                            if (IsOnload == true) {
                                $("#RecommendedPackPre").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                  '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                                  '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                  '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                  '</div>');

                            }
                            else if ($(this).closest("ul").data("isapply") == 0) {
                                $("#FinalRecommendedPackPre").append('<div class="ProductDetailMain" data-productid=' + ProductID + ' data-polid=' + PolID + '><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                 '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                                 '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                 '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                 '</div>');

                            }

                        }
                        if ($(this).prop("checked") == false) {
                            if (localStorage.getItem("IsReversal").toLocaleString() == 'true' && $(this).closest("ul").data("isapply") == 1) {

                                $("#RecommendedPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4></div>');
                                $("#FinalRecommendedPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                   '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                                    '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Reversal for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                  '</div>');
                            }
                            else {
                                $("#RecommendedPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4></div>');
                                $("#FinalRecommendedPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                                '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                                '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                '</div>');
                            }
                        }
                    }
                }
            });
        }
    }
    if (ctrl == "all" || $(ctrl).closest('ul').data('tabtype') == 2) {
        $("#BrodcastPack").html("");
        if ($("#BrodcastPack").html("")) {
            $('#BroadMain').hide();
        }
        /////PostPaid Case
        $("#BrodcastPack2").html("");
        if ($("#BrodcastPack2").html("")) {
            $('#BroadMain2').hide();
        }
        ///PrePaid Case
        $("#BrodcastPackPre").html("");
        $("#FinalBrodcastPackPre").html("");

        if ($("#BrodcastPackPre").html("")) {
            $('#BroadMainPrePaid').hide();
        }
        if (localStorage.getItem("IsPrepaid") == 'false') {
            //PostPaid Case
            $("#BrodcasterPack").find('.PostpaidSetting input[type="checkbox"]:checked').each(function () {
                if ($(this).prop("checked") == true) {
                    var id = ctrl
                    $('#BroadMain').show();
                    $('#BroadMain2').show();
                    var Value = ctrl
                    var ProductName = $(this).closest("ul").data("mainbouquet").toString();
                    var ProductRate = $(this).closest("ul").data("mainrate").toString();
                    var tabtype = $(this).closest("ul").data("tabtype").toString();
                    var ChannelCounts = $(this).closest("ul").data("channelscount").toString();
                    var packagetype = $(this).closest("ul").data("packagetype").toString();
                    var CheckboxId = $(this).attr('id');
                    if (tabtype == 2) {
                        //$("#BrodcastPack").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer; "; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4>Channels : ' + ChannelCounts + '</h4><div>');
                        $("#BrodcastPack").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4>Channels : ' + ChannelCounts + '</h4><div>');
                        //$("#BrodcastPack2").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4>Channels : ' + ChannelCounts + '</h4><div>');
                        $("#BrodcastPack2").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>');
                    }
                    if ($(this).closest("ul").data("isapply") == 1) {
                        if ($(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
                            $(this).closest("ul").closest('li').find('.SelectMainBroad').html("");
                        }
                        else {
                            $(this).closest("ul").closest('li').find('.SelectMainBroad').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
                        }
                    }
                }
                else {
                    $('#BroadMain').hide();
                    $('#BroadMain2').hide();
                }
            })
        }
        else {
            $("#BrodcasterPack").find('.PreapaidSetting input[type="checkbox"]').each(function () {
                if ($(this).prop("checked") == true || $(this).closest("ul").data("isapply") == 1) {
                    var id = ctrl

                    $('#BroadMain').show();
                    $('#BroadMainPrePaid').show();
                    var Value = ctrl
                    var ProductName = $(this).closest("ul").data("mainbouquet").toString();
                    var ProductRate = $(this).closest("ul").data("mainrate").toString();
                    var tabtype = $(this).closest("ul").data("tabtype").toString();
                    var ChannelCounts = $(this).closest("ul").data("channelscount").toString();
                    var packagetype = $(this).closest("ul").data("packagetype").toString();
                    var CheckboxId = $(this).attr('id');
                    var StartDate = $(this).closest("ul").data("startdate").toString();
                    var EndDate = $(this).closest("ul").find(".EndDate").text();

                    var ProductID = $(this).closest("ul").data("bouquetid").toString();
                    var PolID = $(this).closest("ul").data("polid");
                    var TenureNo = $(this).closest('li').find('#myform').find(".qty").val();

                    if (tabtype == 2) {
                        if ($(this).prop("checked") == true) {
                            var green = ($(this).closest("ul").data("isapply") == 0) ? " style='color: green;'" : "";
                            $("#BrodcastPack").append('<div class="ProductDetailMain"><h5 ' + green + '>' + ProductName + '</h5><h6 ' + green + '>Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4 ' + green + '>Channels : ' + ChannelCounts + '</h4><div>');

                            if (IsOnload == true) {
                                $("#BrodcastPackPre").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                    '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');">' +
                                    '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                    '</div>');
                            }
                            else if ($(this).closest("ul").data("isapply") == 0) {
                                $("#FinalBrodcastPackPre").append('<div class="ProductDetailMain" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                    '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');">' +
                                    '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                    '</div>');
                            }

                        }
                        if ($(this).prop("checked") == false) {
                            if (localStorage.getItem("IsReversal").toLocaleString() == 'true' && $(this).closest("ul").data("isapply") == 1) {
                                $("#BrodcastPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4><div>');
                                $("#FinalBrodcastPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate">-' + ProductRate + '</span>' +
                                    '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                                    '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Reversal for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                '</div>');
                            }
                            else {
                                $("#BrodcastPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4><div>');
                                $("#FinalBrodcastPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                                    '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');">' +
                                    '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                    '</div>');
                            }

                        }
                    }
                    if ($(this).closest("ul").data("isapply") == 1) {
                        if ($(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
                            $(this).closest("ul").closest('li').find('.SelectMainBroad').html("");
                        }
                        else {
                            $(this).closest("ul").closest('li').find('.SelectMainBroad').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
                        }
                    }

                }
                //else {
                //    $('#BroadMain').hide();
                //    $('#BroadMain2').hide();
                //}
            })
        }

    }
    if (ctrl == "all" || $(ctrl).closest('ul').data('tabtype') == 3) {
        $("#AlaCartePack").html("");
        if ($("#AlaCartePack").html("")) {
            $('#Alamain').hide();
        }
        /////PostPaid Case
        $("#AlaCartePack2").html("");
        if ($("#AlaCartePack2").html("")) {
            $('#Alamain2').hide();
        }
        ///PrePaid Case
        $("#AlaCartePackPre").html("");
        $("#FinalAlaCartePackPre").html("")
        if ($("#AlaCartePackPre").html("")) {
            $('#AlamainPrePaid').hide();
        }
        if (localStorage.getItem("IsPrepaid") == 'false') {
            $("#Ala-Carte").find('.PostpaidSetting input[type="checkbox"]:checked').each(function () {
                if ($(this).prop("checked") == true) {
                    var id = ctrl
                    $('#Alamain').show();
                    $('#Alamain2').show();
                    var Value = ctrl
                    var ProductName = $(this).closest("ul").data("mainbouquet").toString();
                    var ProductRate = $(this).closest("ul").data("mainrate").toString();
                    var tabtype = $(this).closest("ul").data("tabtype").toString();
                    var ChannelCounts = $(this).closest("ul").data("channelscount").toString();
                    var CheckboxId = $(this).attr('id');
                    if (tabtype == 3) {
                        $("#AlaCartePack").append('<div class="ProductDetailMain"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="AlaCarteRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;"; onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6></div>');//<h4>Channels : ' + ChannelCounts + '</h4>
                        $("#AlaCartePack2").append('<div class="ProductDetailMain" data-productid="' + $(this).closest("ul").data("bouquetid").toString() + '" data-checkid="' + CheckboxId + '"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="AlaCarteRate">' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6></div>');
                    }
                    if ($(this).closest("ul").data("isapply") == 1) {

                        if ($(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
                            $(this).closest("ul").closest('li').find('.SelectMain').html("");
                        }
                        else {
                            $(this).closest("ul").closest('li').find('.SelectMain').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
                        }
                    }
                }
                else {
                    $('#Alamain').hide();
                    $('#Alamain2').hide();
                }
            });
        }
        else {
            $("#Ala-Carte").find('.PreapaidSetting input[type="checkbox"]').each(function () {
                if ($(this).prop("checked") == true || $(this).closest("ul").data("isapply") == 1) {
                    var id = ctrl

                    $('#Alamain').show();
                    $('#AlamainPrePaid').show();
                    var Value = ctrl
                    var ProductName = $(this).closest("ul").data("mainbouquet").toString();
                    var ProductRate = $(this).closest("ul").data("mainrate").toString();
                    var tabtype = $(this).closest("ul").data("tabtype").toString();
                    var ChannelCounts = $(this).closest("ul").data("channelscount").toString();
                    var CheckboxId = $(this).attr('id');
                    var StartDate = $(this).closest("ul").data("startdate").toString();
                    var EndDate = $(this).closest("ul").find(".EndDate").text();
                    var ProductID = $(this).closest("ul").data("bouquetid").toString();
                    var PolID = $(this).closest("ul").data("polid");
                    var TenureNo = $(this).closest('li').find('#myform').find(".qty").val();
                    if (tabtype == 3) {
                        if ($(this).prop("checked") == true) {
                            var green = ($(this).closest("ul").data("isapply") == 0) ? " style='color: green;'" : "";
                            $("#AlaCartePack").append('<div class="ProductDetailMain" data-productid="' + $(this).closest("ul").data("bouquetid").toString() + '"><h5 ' + green + '>' + ProductName + '</h5><h6 ' + green + '>Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6></div>');
                            if (IsOnload == true) {
                                $("#AlaCartePackPre").append('<div class="ProductDetailMain" data-productid="' + $(this).closest("ul").data("bouquetid").toString() + '" data-checkid="' + CheckboxId + '"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                        '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                        '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + '</p></div>' +
                                        '</div>');
                            }
                            else if ($(this).closest("ul").data("isapply") == 0) {
                                $("#FinalAlaCartePackPre").append('<div class="ProductDetailMain" data-productid="' + $(this).closest("ul").data("bouquetid").toString() + '"  data-polid="' + PolID + '" data-checkid="' + CheckboxId + '"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                                       '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                       '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                       '</div>');
                            }
                        }
                        if ($(this).prop("checked") == false) {
                            if (localStorage.getItem("IsReversal").toLocaleString() == 'true' && $(this).closest("ul").data("isapply") == 1) {
                                var IsThisDuplicate = "";
                                if (dupllicatedata.length > 0) {
                                    IsThisDuplicate = $.grep(dupllicatedata, function (items) {
                                        return (items["ProductID"] == ProductID);
                                    });
                                    IsThisDuplicate = IsThisDuplicate.length > 0 ? '(Duplicate)' : '';
                                }
                                $("#AlaCartePack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6></div>');
                                $("#FinalAlaCartePackPre").append('<div class="ProductDetailMain textred" data-productid="' + ProductID + '" data-checkid="' + CheckboxId + '"  data-polid="' + PolID + '" data-duplicate="' + IsThisDuplicate + '"><h5 class="removePrepaidPack">' + ProductName + '  ' + IsThisDuplicate + ' </h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                                    '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Reversal for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                '</div>');
                                if (IsThisDuplicate != "") {

                                    $("#FinalAlaCartePackPre").find("div[data-productid=" + $(this).closest("ul").data("bouquetid") + "]").find("h5,h6").removeClass('removePrepaidPack');
                                }
                            }
                            else {
                                var IsThisDuplicate = "";
                                if (dupllicatedata.length > 0) {
                                    IsThisDuplicate = $.grep(dupllicatedata, function (items) {
                                        return (items["ProductID"] == ProductID);
                                    });
                                    IsThisDuplicate = IsThisDuplicate.length > 0 ? '(Duplicate)' : '';
                                }
                                $("#AlaCartePack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6></div>');

                                if ($("#FinalAlaCartePackPre").find("div[data-productid=" + $(this).closest("ul").data("bouquetid").toString() + "]").length == 0) {
                                    $("#FinalAlaCartePackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + ' data-polid="' + PolID + '" data-checkid="' + CheckboxId + '" data-duplicate="' + IsThisDuplicate + '"><h5 class="removePrepaidPack">' + ProductName + ' ' + IsThisDuplicate + '</h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                                        '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                                        '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                                        '</div>');
                                    if (IsThisDuplicate != "") {
                                        $("#AlaCartePackPre").find("div[data-productid=" + $(this).closest("ul").data("bouquetid") + "]").find("h5,h6").removeClass('removePrepaidPack');
                                        $("#FinalAlaCartePackPre").find("div[data-productid=" + $(this).closest("ul").data("bouquetid") + "]").find("h5,h6").removeClass('removePrepaidPack');

                                    }
                                }
                            }
                        }
                    }
                    if ($(this).closest("ul").data("isapply") == 1) {

                        if ($(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
                            $(this).closest("ul").closest('li').find('.SelectMain').html("");
                        }
                        else {
                            $(this).closest("ul").closest('li').find('.SelectMain').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
                        }
                    }

                }
                //else {
                //    $('#Alamain').hide();
                //    $('#AlamainPrePaid').hide();
                //}
            });
        }
    }
    ////////////////New Work by Shilpa on 12-03-2019 Select & Proceed Button Disable
    var DefaultApply = true;
    var Class = (localStorage.getItem("IsPrepaid") == 'false') ? "PostpaidSetting" : "PreapaidSetting";
    $("#SugestedPacks").find('.' + Class + ' input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true && $(this).closest("ul").data("isapply") == 0) {
            DefaultApply = false;
        }
        else if ($(this).prop("checked") == false && $(this).closest("ul").data("isapply") == 1) {
            DefaultApply = false;
        }

    });
    $("#BrodcasterPack").find('.' + Class + ' input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true && $(this).closest("ul").data("isapply") == 0) {
            DefaultApply = false;
        }
        else if ($(this).prop("checked") == false && $(this).closest("ul").data("isapply") == 1) {
            DefaultApply = false;
        }

        if ($(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
            $(this).closest("ul").closest('li').find('.SelectMainBroad').html("");
        }
        else {
            $(this).closest("ul").closest('li').find('.SelectMainBroad').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(this).closest("ul").closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
        }
    })
    $("#Ala-Carte").find('.' + Class + ' input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true && $(this).closest("ul").data("isapply") == 0) {
            DefaultApply = false;
        }
        else if ($(this).prop("checked") == false && $(this).closest("ul").data("isapply") == 1) {
            DefaultApply = false;
        }
    })

    if (DefaultApply == true) {
        $("#ConnectionChanges").closest('div').addClass("disabled");
        $("#ConnectionChanges").css('background', '#ccc');
    }
    else {
        $("#ConnectionChanges").closest('div').removeClass("disabled");
        $("#ConnectionChanges").css('background', '#0099fd');
    }
    ////////////////New Work by Shilpa on 12-03-2019 Select & Proceed Button Disable

    if (IsOnload == true)
        GetNewConnectionDetail("onload");
    //IsOnload = false;

}

function NCFCalculate(IsOnload) {
    var Class = (localStorage.getItem("IsPrepaid") == 'false') ? "PostpaidSetting" : "PreapaidSetting"
    $("#SugestedPacks").find('.' + Class + ' input[type="checkbox"]:checked').each(function () {
        if ($(this).prop("checked") == true) {
            if ($(this).closest("ul").attr('data-isapply') == 0 || IsOnload == true) {
                // var id = ctrl
                NCFData.push({
                    CustomerID: $(this).closest("ul").data("custid").toString(),
                    ConnID: $(this).closest("ul").data("conectionid").toString(),
                    ProductID: $(this).closest("ul").data("bouquetid").toString(),
                    ProductType: $(this).closest("ul").data("producttype").toString()
                });
            }
        }
    });
    $("#BrodcasterPack").find('.' + Class + ' input[type="checkbox"]:checked').each(function () {
        if ($(this).prop("checked") == true) {
            //var id = ctrl
            if ($(this).closest("ul").attr('data-isapply') == 0 || IsOnload == true) {
                NCFData.push({
                    CustomerID: $(this).closest("ul").data("custid").toString(),
                    ConnID: $(this).closest("ul").data("conectionid").toString(),
                    ProductID: $(this).closest("ul").data("bouquetid").toString(),
                    ProductType: $(this).closest("ul").data("producttype").toString()
                });
            }
        }
    });
    $("#Ala-Carte").find('.' + Class + ' input[type="checkbox"]:checked').each(function () {
        if ($(this).prop("checked") == true) {
            // var id = ctrl
            if ($(this).closest("ul").attr('data-isapply') == 0 || IsOnload == true) {
                NCFData.push({
                    CustomerID: $(this).closest("ul").data("custid").toString(),
                    ConnID: $(this).closest("ul").data("conectionid").toString(),
                    ProductID: $(this).closest("ul").data("bouquetid").toString(),
                    ProductType: $(this).closest("ul").data("producttype").toString()
                });
            }
        }
    });
    var NCF = Stringify(NCFData);
    if (NCFData.length > 0) {
        $('#Loadingbg').css('display', 'block');
        PushData('OPID', OperatorId);
        PushData('NCF', NCF);
        CallPublicAPI('../MyConnections.aspx/GetNCFAmount', '', OnPassNCFAmount, OnFailNCFAmount, true);
    }
}

function OnPassNCFAmount(result) {
    var NCFAmountDetails = result.d == "" ? null : JSON.parse(result.d);
    $('#Loadingbg').css('display', 'none');
    if (NCFAmountDetails["Status"] == "Success") {
        NCFFee = 0;
        // NCFTaxAmt = 0;
        if (NCFAmountDetails["Description"][0] != null) {
            var NCFAmt = parseFloat(NCFAmountDetails["Description"][0]["NCFAmount"] == null || NCFAmountDetails["Description"][0]["NCFAmount"] == "" ? 0 : NCFAmountDetails["Description"][0]["NCFAmount"]);
            var TaxAmt = parseFloat(NCFAmountDetails["Description"][0]["TaxAmount"] == null || NCFAmountDetails["Description"][0]["TaxAmount"] == "" ? 0 : NCFAmountDetails["Description"][0]["TaxAmount"]);
            NCFFee = NCFAmt;
            if (localStorage.getItem("IsPrepaid") == 'true') {
                $("#NCFTaxPre").html(TaxAmt.toFixed(2));
                $("#NetworkFeePre").html(NCFFee.toFixed(2));
            }
            NCFTax = parseFloat(NCFTax + TaxAmt);
            //+TaxAmt;
            $(".NetworkFeeCount").html("(Channel Count : " + NCFAmountDetails["Description"][0]["NCF_ChannelCount"].toString() + ")");
        }
        if (localStorage.getItem("IsPrepaid") == 'false') {
            $("#NetworkFee").html(NCFFee.toFixed(2));
            $("#Tax").html(NCFTax.toFixed(2));
        }
        //NCFTax = parseFloat(NCFTax+TaxAmt);     
        var subtotal = 0;
        if (localStorage.getItem("IsPrepaid") == 'false') {
            $("#RecommendedPack").find(".RecommendRate").each(function () {

                subtotal += parseFloat($(this).html());
            });
            $("#BrodcastPack").find(".BrodcastRate").each(function () {

                subtotal += parseFloat($(this).html());
            });

            $("#AlaCartePack").find(".AlaCarteRate").each(function () {

                subtotal += parseFloat($(this).html());
            });

            $("#ProductSubTotal").html(subtotal.toFixed(2));
        }
        else {
            var ProductCount = 0
            if (IsOnload == true) {
                $("#RecommendedPack").find(".RecommendRate").each(function () {
                    ProductCount++;
                    subtotal += parseFloat($(this).html());
                });
                $("#BrodcastPack").find(".BrodcastRate").each(function () {
                    ProductCount++;
                    subtotal += parseFloat($(this).html());
                });

                $("#AlaCartePack").find(".AlaCarteRate").each(function () {
                    ProductCount++;
                    subtotal += parseFloat($(this).html());
                });
            }
            else {
                ProductCount = 0
                $("#FinalRecommendedPackPre").find(".RecommendRate").each(function () {
                    ProductCount++;
                    subtotal += parseFloat($(this).html());
                });
                $("#FinalBrodcastPackPre").find(".BrodcastRate").each(function () {
                    ProductCount++;
                    subtotal += parseFloat($(this).html());
                });

                $("#FinalAlaCartePackPre").find(".AlaCarteRate").each(function () {
                    ProductCount++;
                    subtotal += parseFloat($(this).html());
                });
            }
            $("#ProductSubTotalPre").html(subtotal.toFixed(2));
            $(".ProductCount").html(" (" + ProductCount + ")");
        }

        GrandTotal = NCFFee + subtotal + NCFTax;//TaxAmt;
        if (localStorage.getItem("IsPrepaid") == 'false')
            $("#TotalAmount").html(GrandTotal.toFixed(2));
        else {
            $("#GradTotal").html(GrandTotal.toFixed(2));
        }

    }
    else {
        $("#NetworkFee").html("0.00");
        $("#NetworkFeePre").html("0.00");
        var subtotal = 0;
        var ProductCount = 0
        $("#RecommendedPack").find(".RecommendRate").each(function () {
            if ($(this).attr('data-isapply') == 0 || IsOnload == true) {
                ProductCount++;
                subtotal += parseFloat($(this).html());
            }
        })
        $("#BrodcasterPack").find(".BrodcastRate").each(function () {
            if ($(this).attr('data-isapply') == 0 || IsOnload == true) {
                ProductCount++;
                subtotal += parseFloat($(this).html());
            }
        })
        $("#AlaCartePack").find(".AlaCarteRate").each(function () {
            if ($(this).attr('data-isapply') == 0 || IsOnload == true) {
                ProductCount++;
                subtotal += parseFloat($(this).html());
            }
        })
        if (localStorage.getItem("IsPrepaid") == 'false')
            $("#ProductSubTotal").html(subtotal.toFixed(2));
        else {

            $("#ProductSubTotalPre").html(subtotal.toFixed(2));
            $(".ProductCount").html(" (" + ProductCount + ")");
        }

        GrandTotal = subtotal;
        if (localStorage.getItem("IsPrepaid") == 'false') {
            $("#TotalAmount").html(GrandTotal.toFixed(2));
        }
        else {
            $("#GradTotal").html(GrandTotal.toFixed(2));
        }
    }
    IsOnload = false;
}

function OnFailNCFAmount(result) {
    $('#Loadingbg').css('display', 'none');
}
//Apply Pakage
function ApplyConnection() {
    $('#materialize-lean-overlay-1').show();
    if (localStorage.getItem("IsPrepaid") == 'false') {
        $('#ConnectionModelPrepaid').hide();
        $('#ConnectionModel').show();
    }
    else {
        $('#ConnectionModel').hide();
        $('#ConnectionModelPrepaid').show();
    }
}

//Delete Pakage
function DeleteRecomPack(ctrl, ProductType) {
    $(ctrl).prop("checked", false);
    if (ProductType == "MPkg")
        NCFMajorCheckBox(ctrl);
    else
        MainBouquetChange(ctrl);
}
function DeleteBroadPack(ctrl, ProductType) {
    $(ctrl).prop("checked", false);
    if (ProductType == "MPkg")
        NCFBrodMajorCheckBox(ctrl);
    else
        MainBouquetChange(ctrl);
}
function DeleteAlaCartPack(ctrl) {
    $(ctrl).prop("checked", false);
    CurrCSChannelBColor(ctrl)
}
function Confirm() {
    $("#ConnectionModel").hide();
    $('#ConnectionModelPrepaid').hide();
    $('#materialize-lean-overlay-1').hide();
    $('body').css('overflow', 'auto');
}
function GetNewConnectionDetail(callby) {
    var Class = (localStorage.getItem("IsPrepaid") == 'false') ? "PostpaidSetting" : "PreapaidSetting";
    if (IsConnAddOrNot == "true") {
        if (IsOnload == true) {
            $(".SummryHedding").html("Current Packs And Channels");
            $("#MannagePackage").show();
            $("#ApplyNowBtn").hide();
            ////PrePaid case
            $(".ManagePrepaid").show();
            $(".FinalPrepaid").hide();
        }
        else {
            $(".SummryHedding").html("Final Summary");
            $("#MannagePackage").hide();
            $("#ApplyNowBtn").show();

            ////PrePaid case
            $(".ManagePrepaid").hide();
            $(".FinalPrepaid").show();
        }
        var bouquetlid = channelid = "";
        $("#SugestedPacks").find('.' + Class + ' input[type="checkbox"]:checked').each(function () {
            if ($(this).prop("checked") == true) {
                bouquetlid += $(this).closest("ul").data("bouquetid").toString() + ",";
            }
        });
        $("#BrodcasterPack").find('.' + Class + ' input[type="checkbox"]:checked').each(function () {
            if ($(this).prop("checked") == true) {
                bouquetlid += $(this).closest("ul").data("bouquetid").toString() + ",";
            }
        });
        $("#Ala-Carte").find('.' + Class + ' input[type="checkbox"]:checked').each(function () {
            if ($(this).prop("checked") == true) {
                channelid += $(this).closest("ul").data("bouquetid").toString() + ",";
            }
        });
        $('#Loadingbg').css('display', 'block');
        PushData('OPID', OperatorId);
        PushData('BouquetID', bouquetlid);
        PushData('ChannelID', channelid);
        PushData('IsOnload', IsOnload);
        CallPublicAPI('../MyConnections.aspx/GetNewConnectionDetails', '', OnPassNewConnectionDetails, OnFailNewConnectionDetails);

    }
    else {
        confirmAction = function () {
        }
        MsgBox('E', "You have no permission for add new connection !!")
    }
}

function OnPassNewConnectionDetails(result) {
    var res = result.d.split("|");
    $('#Loadingbg').css('display', 'none');
    if (res[0] == "S") {
        var Data = JSON.parse(res[1]);
        dupllicatedata = [];
        dupllicatedata = $.grep(Data, function (items) {
            return (items['AvlWithBq'] == 1);
        });
        if (dupllicatedata.length > 0)
            if (localStorage.getItem("IsPrepaid") == false) {
                $("#DuplicatePrePaid").hide();
                $("#Duplicate").show();
                $("#DuplicatePacks").html("");
                $("#AlaCartePack2").find('div').each(function () {
                    for (var i = 0; i < dupllicatedata.length; i++) {
                        if ($(this).data('productid') == dupllicatedata[i]["ProductID"]) {
                            var id = $(this).data('checkid');
                            $(this).find('.del').click();
                            // DeleteAlaCartPack(id);
                        }
                    }
                })
            }
            else {
                $("#Duplicate").hide();
                $("#DuplicatePrePaid").show();
                $("#DuplicatePacksPre").html("");
                $("#AlaCartePack").find('div').each(function () {
                    for (var i = 0; i < dupllicatedata.length; i++) {
                        if ($(this).data('productid') == dupllicatedata[i]["ProductID"]) {
                            var id = $(this).data('checkid');
                            $(this).find('.del').click();

                            // DeleteAlaCartPack(id);
                        }
                    }
                })
            }
        DuplicateChannel = "";
        for (var i = 0; i < dupllicatedata.length; i++) {
            var ProductName = dupllicatedata[i]["Product"];
            var ProductRate = parseFloat(dupllicatedata[i]["Rate"] == "" ? 0 : dupllicatedata[i]["Rate"]).toFixed(2);
            if (localStorage.getItem("IsPrepaid") == false)
                $("#DuplicatePacks").append('<div class="ProductDetailMain" style="color:red"><h5 style="text-decoration: line-through;">' + ProductName + '</h5><h6 style="text-decoration: line-through;">Rs.&nbsp; <span class="AlaCarteRate">' + ProductRate + '</span></h6></div>');
            else {
                DuplicateChannel += dupllicatedata[i]["Product"] + ",";
                //$("#DuplicatePacksPre").append('<div class="ProductDetailMain" style="color:red"><h5 style="text-decoration: line-through;">' + ProductName + '</h5><h6 style="text-decoration: line-through;">Rs.&nbsp; <span class="AlaCarteRate">' + ProductRate + '</span></h6></div>');
            }
        }


        if ($("#RecommendedPackPre").html() == "" && IsOnload == true) {
            $('#RecPackMainPrePaid').hide();

        }
        else if ($("#FinalRecommendedPackPre").html() == "" && IsOnload == false) {
            $('#RecPackMainPrePaid').hide();
        }
        if ($("#BrodcastPackPre").html() == "" && IsOnload == true) {
            $('#BroadMainPrePaid').hide();
        }
        else if ($("#FinalBrodcastPackPre").html() == "" && IsOnload == false) {
            $('#BroadMainPrePaid').hide();
        }

        if ($("#AlaCartePackPre").html() == "" && IsOnload == true) {
            $('#AlamainPrePaid').hide();
        }
        else if ($("#FinalAlaCartePackPre").html() == "" && IsOnload == false) {
            $('#AlamainPrePaid').hide();
        }

        //if (IsOnload == false && localStorage.getItem("IsPrepaid") == "true")
        //    CalcuateProduct();
        //else
        //    TaxCalculation(Data, IsOnload);
        if (IsOnload == true || localStorage.getItem("IsPrepaid") != "true")
            TaxCalculation(Data, IsOnload);
        /// open Final Summary
        $('body').css('overflow', 'scroll');
        //$('#materialize-lean-overlay-1').show();

        /// open Final Summary
        if (localStorage.getItem("IsPrepaid") == "true") {
            $('#ConnectionModel').hide();

            //if (ErrorCode == "")
            //{
            if (DuplicateChannel != "") {
                confirmAction = function () {
                    CalcuateProduct();
                    if (CalculateProduct.length > 0)
                        $('#ConnectionModelPrepaid').show();
                    else
                        $('#materialize-lean-overlay-1').hide();
                };
                MsgBox("W", "Some similar channel(s) " + DuplicateChannel + " found in subscription.<br/> System will automatically remove Duplicate Channel Subscription.");
            }
            else {
                if (IsOnload == false && localStorage.getItem("IsPrepaid") == "true")
                    CalcuateProduct();
                //$('#ConnectionModelPrepaid').show();
            }
            //}
            //else
            //    $('#materialize-lean-overlay-1').hide();
        }
        else {
            $('#ConnectionModelPrepaid').hide();
            $('#ConnectionModel').show();

        }



    }
    else if (res[0] == "E") {
        $('#materialize-lean-overlay-1').hide();
        $('#ConnectionModel').hide();
        $('#ConnectionModelPrepaid').hide();
        MsgBox("E", res[1]);
    }

}

function OnFailNewConnectionDetails(result) {
    $('#Loadingbg').css('display', 'none');
}

function TaxCalculation(Data, IsOnload) {
    var TaxCal = 0;
    for (var i = 0; i < Data.length; i++) {

        TaxCal += parseFloat(Data[i]['AvlWithBq'] == 0 ? Data[i]["TotalTax"] == null ? 0 : Data[i]["TotalTax"] : 0);
    }
    NCFTax = TaxCal;
    if (localStorage.getItem("IsPrepaid") == 'true')
        $("#TaxPre").html(TaxCal.toFixed(2));
    NCFCalculate(IsOnload);
}


function CloseDiv() {
    $('#orrsDiag').remove();
    $('body').css('overflow', 'auto');
}
var PrepaidDiv = "";
function GetMainAddonChannelList(ctrl, id, TenureType, TenurePeriodIn, TenurePeriodValue, ChannelCount, StartDate) {
    var BouquetID = "";
    var PolicyID = "";
    var SendCriteria = "";
    if (localStorage.getItem("IsPrepaid") == 'true') {
        var EndDate = $(ctrl).closest('li').find('.EndDate').text();
        var CurrentSubs = DateDiffInDay(StartDate, EndDate) + 1;
        PrepaidDiv = '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting "><p class="SubscriptionDetail">Default Subscription</p> :&nbsp;&nbsp; <span>' + TenurePeriodValue + ' ' + TenurePeriodIn + '</span></div>' +
        '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">Current Subscription</p> :&nbsp;&nbsp; <span>' + CurrentSubs + ' ' + 'Days</span></div>' +
        '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">No. of Channels</p> :&nbsp;&nbsp; <span>' + ChannelCount + '</span></div>';
    }
    $('.preloader-wrapper').fadeIn("slow");
    SendCriteria = id;
    //PushData('SubsId', SubsId);
    PushData('OPID', OperatorId);
    PushData('Criteria', SendCriteria);

    CallPublicAPI('MyConnections.aspx/GetMainAddonChannelList', '', OnPassChannelList, OnFailChannelList);
}

function OnPassChannelList(result) {

    var MyChannelListDataTable = result.d == "" ? null : JSON.parse(result.d);

    if (MyChannelListDataTable["Status"] == "Success") {
        $('body').css('overflow', 'hidden');
        if (MyChannelListDataTable["Description"]["NewDataSet"]["Package"][0]["Channel"] != undefined) {
            var PIDArray = [];
            var ChannelUlOpen = ChannelUlClose = ChannelLi = ChannelLiClose = ChannelMainHtml = ActiveClass = LiWiseChannel = ChannelData = ChannelData = "";
            var FloatClear = '<div style="clear:both;"></div>';
            var IsCallFirstTime = true;

            if (MyChannelListDataTable != null) {
                for (var i = 0; i < MyChannelListDataTable["Description"]["NewDataSet"]["Package"][0]["Channel"].length; i++) {
                    if (jQuery.inArray(MyChannelListDataTable["Description"]["NewDataSet"]["Package"][0]["Channel"][i]["Genre"], PIDArray) == -1) {
                        PIDArray.push(MyChannelListDataTable["Description"]["NewDataSet"]["Package"][0]["Channel"][i]["Genre"]);
                    }
                }
                ChannelUlOpen = '<div class="col s12 m8 l9" style="text-align: right;padding-bottom: 11px;background: rgba(255,216,68,1);background: -moz-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,216,68,1)), color-stop(100%, rgba(212,158,36,1)));background: -webkit-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -o-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -ms-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: linear-gradient(to right, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);padding-top: 7px;"><span class="ChannelaHeading" id ="ChannelaHeading">All Channels </span><a href="javascript:CloseDiv();" title="Close" style="padding: 15px; opacity: 1; background: #d6a125; color: white;">' +
                                '<i class="mdi-navigation-close modal-close" style="font-size: 20px;"></i></a></div>' +
                                '<div class="col s12 m8 l9 mdl-card mdl-shadow--16dp AllChannels" id="AllChannelList">' + PrepaidDiv +
                                // '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">Tenure Type</p> :&nbsp;&nbsp; <span>' + res[1] + '</span> </div>' +
                                //'<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">Tenure Period In</p> :&nbsp;&nbsp; <span>' + res[2] + '</span></div>' +
                                //'<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">Default Subscription</p> :&nbsp;&nbsp; <span>' + res[3] + ' ' + res[2] + '</span></div>' +
                                //'<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">Current Subscription</p> :&nbsp;&nbsp; <span>' + res[3] + ' ' +'Days</span></div>' +
                                //'<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">No. of Channels</p> :&nbsp;&nbsp; <span>' + res[4] + '</span></div>'
                '<ul class="collapsible collapsible-accordion" data-collapsible="expandable">';
                ChannelUlClose = '</ul></div>';
                ChannelLiClose = '</ul></div></li>';
                for (var i = 0; i < PIDArray.length; i++) {
                    ChannelLi = "";
                    ChannelData = "";
                    var PackageDataTable = $.grep(MyChannelListDataTable["Description"]["NewDataSet"]["Package"][0]["Channel"], function (itm, p) {
                        return itm['Genre'] == PIDArray[i];
                    });
                    for (var j = 0; j < PackageDataTable.length; j++) {

                        if (IsCallFirstTime == true) {
                            ActiveClass = 'class="active"';
                            ActiveClass1 = 'active';
                            FirstLiBody = 'style = "display:block;"';
                            IsCallFirstTime = false;
                        }
                        else {
                            ActiveClass = "";
                            ActiveClass1 = "";
                            FirstLiBody = "";
                        }

                        if (j == 0) {
                            ChannelLi += '<li ' + ActiveClass + '>' +
                                           '<div style="padding: 0 0rem;font-size: 15px;color:#444444;background: #ececec;" class="collapsible-header ' + ActiveClass1 + '" onclick="javascript:GetshowhideChannelDetails(this); return false;"><i class="fa fa-plus-circle" style="margin-right: 0rem;font-size: 1.1rem;"></i>' + PackageDataTable[j]['Genre'] + '&nbsp;&nbsp;' + PackageDataTable.length + ' Channel(s)</div>' +
                                           '<div class="collapsible-body" ' + FirstLiBody + '>' +
                                           '<ul>';    //class="packchannellist"
                        }

                        var Imagepath = "";
                        var ChannalName = "";
                        var ChannalPrice = "";
                        ChannalName = PackageDataTable[j]["ChannelName"];
                        ChannalPrice = parseFloat(PackageDataTable[j]["ChMSOMRP"]).toFixed(2);
                        if (PackageDataTable[j]["ImgPath"] != "")
                            Imagepath = '<img src="' + PackageDataTable[j]["ImgPath"] + '" alt="' + PackageDataTable[j]["ImgName"] + '" style="height:60px;width: 90px;"/>';
                        else
                            Imagepath = '<img src="images/imagenotavailable.png" style="height:60px;width: 52px;"/>';

                        var imagename = PackageDataTable[j]["ImgName"] == "" ? PackageDataTable[j]["ChannelName"] : PackageDataTable[j]["ImgName"];

                        ChannelData += '<li style="padding:10px; float: left;text-align:center;">' +
                                '<span>' +
                                Imagepath +
                             ' <br/>' +
                            '<span style="color:rgb(0, 0, 0); font-weight:300; text-decoration: none; font-size: 15px; ">' +
                         ' </span>' +
                         '<p style="font-size: 13px;">' +
                         ChannalPrice +
                         '</p>' +
                        '<p style="font-size: 13px;">' +
                        ChannalName +
                        '</p>' +
                        '</li>'

                    }
                    LiWiseChannel += ChannelLi + ChannelData + FloatClear + ChannelLiClose;
                }
                ChannelMainHtml = ChannelUlOpen + LiWiseChannel + ChannelUlClose;

                $('.preloader-wrapper').delay(100).fadeOut();
                showDialog({
                    title: '',
                    text: ''

                })
                $(".channellist").html(ChannelMainHtml);
                if (localStorage.getItem("IsPrepaid") == "true") {
                    $(".PreapaidSetting").css('display', 'block');
                    $(".PostpaidSetting").css('display', 'none');
                    $(".PostpaidSetting").find('input[type="checkbox"]').prop('checked', false);
                    $("#ChannelaHeading").html("More Details");
                }
                else {
                    $(".PreapaidSetting").css('display', 'none');
                    $(".PostpaidSetting").css('display', 'block');
                    $(".PreapaidSetting").find('input[type="checkbox"]').prop('checked', false);
                    $("#ChannelaHeading").html("All Channels");
                }
                $("#AllChannelList .active").find("i").removeClass("fa fa-plus-circle");
                $("#AllChannelList .active").find("i").addClass("fa fa-minus-circle");
            }
        }
        else {
            $('.preloader-wrapper').delay(100).fadeOut();
            MsgBox("E", "Channels Not Found !!!");
        }
    }
    else {
        $('.preloader-wrapper').delay(100).fadeOut();
        MsgBox("E", "Channels Not Found !!!");
    }
}

function OnFailChannelList(result) {
    var res = result.d;
    $('.preloader-wrapper').delay(100).fadeOut();
}
function ChannelDeatils(TenureType, TenurePeriodIn, TenurePeriodValue, StartDate, EndDate) {
    $('body').css('overflow', 'hidden');
    var ChannelUlOpen = ChannelUlClose = ChannelLi = ChannelLiClose = ChannelMainHtml = "";
    var currentsubs = DateDiffInDay(StartDate, EndDate);
    ChannelUlOpen = '<div class="col s12 m8 l9" style="text-align: right;padding-bottom: 11px;background: rgba(255,216,68,1);background: -moz-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,216,68,1)), color-stop(100%, rgba(212,158,36,1)));background: -webkit-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -o-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -ms-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: linear-gradient(to right, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);padding-top: 7px;"><span class="ChannelaHeading" id ="ChannelaHeading">More Details </span><a href="javascript:CloseDiv();" title="Close" style="padding: 15px; opacity: 1; background: #d6a125; color: white;">' +
                        '<i class="mdi-navigation-close modal-close" style="font-size: 20px;"></i></a></div>' +
                        '<div class="col s12 m8 l9 mdl-card mdl-shadow--16dp AllChannels" id="AllChannelList" style="min-height: 141px;">' +
                        // '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">Tenure Type</p> :&nbsp;&nbsp; <span>' + TenureType + '</span></div>' +
                        //'<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p style="display: inline-block;width: 20%;">Tenure Period In</p> :&nbsp;&nbsp; <span>' + TenurePeriodIn + '</span></div>' +
                        '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">Default Subscription</p> :&nbsp;&nbsp; <span>' + TenurePeriodValue + ' ' + TenurePeriodIn + '</span></div>' +
                         '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">Current Subscription</p> :&nbsp;&nbsp; <span>' + currentsubs + ' ' + 'Days</span></div>' +
    '<ul class="collapsible collapsible-accordion" data-collapsible="expandable">';
    ChannelUlClose = '</ul></div>';
    ChannelLiClose = '</ul></div></li>';
    ChannelMainHtml = ChannelUlOpen + ChannelUlClose;

    $('.preloader-wrapper').delay(100).fadeOut();
    showDialog({
        title: '',
        text: ''
    })
    $(".channellist").html(ChannelMainHtml);
}

//#endregion

function showDialog(options) {
    options = $.extend({
        id: 'orrsDiag',
        title: null,
        text: null,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false
    }, options);

    // remove existing dialogs
    $('.dialog-container').remove();
    $(document).unbind("keyup.dialog");
    $('<div id="' + options.id + '" class="dialog-container"><div class="channellist" ></div></div>').appendTo("body");// style = "pointer-events:all;"
    var dialog = $('#orrsDiag');
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $('<h5>' + options.title + '</h5>').appendTo(content);
    }
    if (options.text != null) {
        $('<p>' + options.text + '</p>').appendTo(content);
    }
    if (options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: function () {
                    return false;
                }
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                if (!options.negative.onClick(e))
                    hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: function () {
                    return false;
                }
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function (e) {
                e.preventDefault();
                if (!options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    // componentHandler.upgradeDom();
    if (options.cancelable) {
        //dialog.click(function ()
        //{
        //    hideDialog(dialog);
        //});
        $(document).bind("keyup.dialog", function (e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function (e) {
            e.stopPropagation();
        });
    }
    setTimeout(function () {
        dialog.css({ opacity: 1 });
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({ opacity: 0 });
    setTimeout(function () {
        dialog.remove();
    }, 400);
}
function ConfirmandApply() {
    if (localStorage.getItem("IsPrepaid") == "true") {
        //if ($("#RequiredAmt").html().indexOf("Dr") == -1) {


        // }
        if ($("#RemainingAmt").html().indexOf("Dr") > -1) {
            var amt = parseFloat($("#RemainingAmt").text().replace(" Dr.", ""));
            if (amt > 0) {
                $(".insuff").show();
                $(".suff").hide();
                $("#materialize-lean-overlay-3").show();
                $("#ApplyProduct").show();
            }
            else {
                $(".insuff").hide();
                $(".suff").show();
                $("#materialize-lean-overlay-3").show()
                $("#ApplyProduct").show();
            }
        }
        else {
            $(".insuff").hide();
            $(".suff").show();
            $("#materialize-lean-overlay-3").show()
            $("#ApplyProduct").show();
        }
    }
    else {
        confirmAction = function () {
            ApplyProduct();
        };
        var html = "<span style=color:green>Do you want to continue for the new subscription?</span>";
        MsgBox("I", html, "New Subscription");
        $("#ApplyProduct").hide();
        $('#materialize-lean-overlay-2').hide();
    }
}
function ApplyProduct() {
    $("#ApplyProduct").hide();
    // $('#materialize-lean-overlay-2').hide();
    CustType = localStorage.getItem("IsPrepaid");
    AutoCRF = localStorage.getItem("IsCRFComplete");
    var BqArray = BouqueIdsList.split(",");
    var BroadArray = BroadCastIdsList.split(",");
    var ChannelArray = ChannelIdsList.split(",");
    var Class = (localStorage.getItem("IsPrepaid") == false) ? "PostpaidSetting" : "PreapaidSetting";
    var AB = "", DB = "", AC = "", DC = "";
    var result = PrePaidSubscriptionProduct("AuthDeAuth");
    //AC = result.split('|')[0];
    //DC = result.split('|')[1];
    //AB = result.split('|')[2];
    //DB = result.split('|')[3];

    var IsPrePaid = localStorage.getItem("IsPrepaid");
    var SmartCard = localStorage.getItem("VCNO");
    var TimeStamp = localStorage.getItem("ModifyTimeStamp");
    PushData('SmartCard', SmartCard);
    PushData('SubsModifyTimeStamp', TimeStamp)
    //PushData('AuthBouquets', AB);
    //PushData('AuthAlaCartes', AC);
    //PushData('DeAuthBouquets', DB);
    //PushData('DeAuthAlaCartes', DC);
    PushData('Authxml', result.split('*')[0])
    PushData('DeAuthxml', result.split('*')[1])
    PushData('OPID', OperatorId);
    PushData('IsPrePaid', IsPrePaid);
    PushData('CustID', localStorage.getItem("CustId"));
    $('#Loadingbg').css('display', 'block');
    if (AutoCRF == 0)// if Auto CRF Setting is Off  then check ProductType and Call API
    {
        // IF PostPaid Call CRF API
        //IF Prepaid Call AuthDeauth API
        if (LogInDataTable[0]["SubsType"] == 0)//Prepaidcase
        {
            // Call AuthDeauth API  
            PushData('OrderSummary1', Stringify(OrderSummaryTable1));
            PushData('OrderSummary2', Stringify(OrderSummaryTable2));

            CallPublicAPI('MyConnections.aspx/ManageAuthDeAuth', '', OnPassAuthDeAuth, OnFailAuthDeAuth);
        }
        else//PostPaid
        {
            // Call CRF API
            CallPublicAPI('MyConnections.aspx/PostpaidGenerateCRF', '', OnPassAuthDeAuth, OnFailAuthDeAuth);
        }
    }
    else {
        //IF Auto CRF Setting is On 
        // Call AuthDeauth API 

        CallPublicAPI('MyConnections.aspx/ManageAuthDeAuth', '', OnPassAuthDeAuth, OnFailAuthDeAuth);
    }
}
function OnPassGenerateCRF(result) {
    $('#Loadingbg').css('display', 'none');

    var Data = result.d == "" ? null : JSON.parse(result.d);
    var Msg = Data["Description"];
    if (Data["Status"] == "Fail") {
        MsgBox("E", Msg);

        $("#ConnectionModel").hide();
        $("#ConnectionModelPrepaid").hide();
        $('#materialize-lean-overlay-1').hide();

        IsAddConnection = false;
    }
    else {
        AuthBouqueIds = "";
        AuthChannelsIds = "";
        DeAuthBouqueIds = "";
        DeAuthChannelsIds = "";
        AuthBroadCastIds = "";
        DeAuthBroadCastIds = "";
        $("#ConnectionModel").hide();
        $("#ConnectionModelPrepaid").hide();
        $('#materialize-lean-overlay-1').hide();
        $(".lean-overlay").hide();
        IsAddConnection = true;
        MsgBox("S", Msg);
    }
}

function OnFailGenerateCRF(result)
{ }
function OnPassAuthDeAuth(result) {
    $('#Loadingbg').css('display', 'none');
    try {
        var Data = result.d == "" ? null : JSON.parse(result.d);
        if (Data != null) {
            var Msg = Data["Description"];
            if (Data["Status"] == "Fail") {

                $(".lean-overlay").hide();
                $("#ConnectionModel").hide();
                $("#ConnectionModelPrepaid").hide();
                $("#materialize-lean-overlay-1").hide();
                IsAddConnection = false;
                if (localStorage.getItem("IsPrepaid") == 'true') {
                    localStorage.setItem("SubscriptionFail", Msg);
                    document.location.replace("../SubscriptionFail");
                }
                else
                    MsgBox("E", Msg);
            }
            else {
                AuthBouqueIds = "";
                AuthChannelsIds = "";
                DeAuthBouqueIds = "";
                DeAuthChannelsIds = "";
                AuthBroadCastIds = "";
                DeAuthBroadCastIds = "";
                $("#ConnectionModel").hide();
                $("#ConnectionModelPrepaid").hide();
                $('#materialize-lean-overlay-1').hide();

                $(".lean-overlay").hide();
                IsAddConnection = true;
                if (localStorage.getItem("IsPrepaid") == 'true') {
                    localStorage.setItem("SubscriptionSuccess", result.d);


                    document.location.replace("../SubscriptionSucess");
                }
                else
                    MsgBox("S", Msg);
            }
        }
        else {
            localStorage.setItem("SubscriptionFail", "Something went wrong, please try again later!");
            document.location.replace("../SubscriptionFail");
        }
    }
    catch (e) {
        confirmAction = function () {
        }
        MsgBox('E', "Something went wrong, please try again later!");
    }
}
function OnFailAuthDeAuth(result) {
    $('#Loadingbg').css('display', 'none');
}

function BroadfilterChekBox(nctrl) {
    var CheckBoxStatus = $(nctrl).find('input[type="checkbox"]').prop("checked");
    if (CheckBoxStatus == false) {
        $(nctrl).find('input[type="checkbox"]').prop("checked", true);
        BroadfilterFunction(nctrl);
    }
    else {
        $(nctrl).find('input[type="checkbox"]').prop("checked", false);
        BroadfilterFunction(nctrl);
    }

    if ($("#BroadCastChips").find('li').length <= 1) {
    }
}
var BroadCastername = "";
function RemoveBroadChip(ctrl) {
    $(ctrl).prop("checked", false);
    BroadCastername = $(ctrl).closest("li").data("broadname");
    BroadfilterFunction(ctrl);
}

function BroadfilterFunction(crl) {
    var CheckBoxStatus = $(crl).find('input[type="checkbox"]').prop("checked");
    var name = Newname = ""
    if (CheckBoxStatus == true) {
        name = $(crl).find('label').text();
        var CheckboxId = $(crl).find('input[type="checkbox"]').attr('id');
        Genername = '<li data-broadcastid="' + $(crl).closest("li").data("broadcastid") + '"><p style="float:left" >' + name + '</p> &nbsp<span onclick="javascript:RemoveBroadChip(' + CheckboxId + ');return false;">X<span></li>'
        $('#BroadCastChips').append(Genername);
        $('.BrodcasterColsp-header').hide();
        $('.BrodcasterColsp-body').hide();
        $(".collapsible-header").find('i').addClass('fa-plus-circle');
        $(".collapsible-header").find('i').removeClass('fa-minus-circle');
        $('#BroadCastChips li').each(function () {
            $('#brodheaderdiv' + $(this).data('broadcastid')).show();
            //$('#childGenerDiv' + $(this).data('generid')).show();
        });
        //if ()
    }
    else {
        Newname = $(crl).find('label').text();
        if (BroadCastername != "") {
            Newname = BroadCastername;
        }
        $('#BroadCastChips').find("li").each(function () {
            if ($(this).find("p").text() == Newname) {
                $(this).remove()
                BroadCastername = "";
            }
        });
        $('.BrodcasterColsp-header').hide();
        $('.BrodcasterColsp-body').hide();

        $('#BroadCastChips li').each(function () {
            $('#brodheaderdiv' + $(this).data('broadcastid')).show();
            //$('#childGenerDiv' + $(this).data('generid')).show();
        });
    }

    if ($('#BroadCastChips li').length == 0) {
        $('.BrodcasterColsp-header').show();
        //$('.collapsible-body').hide();
        $(".collapsible-header").find('i').addClass('fa-plus-circle');
        $(".collapsible-header").find('i').removeClass('fa-minus-circle')
    }
}

function filterChekBox(nctrl) {
    var CheckBoxStatus = $(nctrl).find('input[type="checkbox"]').prop("checked");
    if (CheckBoxStatus == false) {
        $(nctrl).find('input[type="checkbox"]').prop("checked", true);
        filterFunctionnew(nctrl);
    }
    else {
        $(nctrl).find('input[type="checkbox"]').prop("checked", false);
        filterFunctionnew(nctrl);
    }
}

var ChannelGenner = "";
function RemoveGenerName(ctrl) {
    $(ctrl).prop("checked", false);
    ChannelGenner = $(ctrl).closest("li").data("genernames");
    collapsibleNew(ctrl)
    filterFunctionnew(ctrl);
}

function filterFunctionnew(crl) {
    var CheckBoxStatus = $(crl).find('input[type="checkbox"]').prop("checked");
    var name = Newname = ""
    if (CheckBoxStatus == true) {
        name = $(crl).find('label').text();
        var CheckboxId = $(crl).find('input[type="checkbox"]').attr('id');
        Genername = '<li data-generid="' + $(crl).closest("li").data("generid") + '"><p style="float:left" >' + name + '</p> &nbsp<span onclick="javascript:RemoveGenerName(' + CheckboxId + ');return false;">X<span></li>'
        $('#GenerName').append(Genername);
        $('.Channels-header').hide();
        $('.Channels-body').hide();
        $(".collapsible-header").find('i').addClass('fa-plus-circle');
        $(".collapsible-header").find('i').removeClass('fa-minus-circle')
        $('#GenerName li').each(function () {
            $('#parentGenerDiv' + $(this).data('generid')).show();
            //$('#childGenerDiv' + $(this).data('generid')).show();
        });
        //if ()
    }
    else {
        Newname = $(crl).find('label').text();
        if (ChannelGenner != "") {
            Newname = ChannelGenner;
        }
        $('#GenerName').find("li").each(function () {
            if ($(this).find("p").text() == Newname) {
                $(this).remove()
                ChannelGenner = "";
            }
        });
        $('.Channels-header').hide();
        $('.Channels-body').hide();

        $('#GenerName li').each(function () {
            $('#parentGenerDiv' + $(this).data('generid')).show();
            //$('#childGenerDiv' + $(this).data('generid')).show();
        });
    }
    if ($('#GenerName li').length == 0) {
        $('.Channels-header').show();
        //$('.collapsible-body').hide();
        $(".collapsible-header").find('i').addClass('fa-plus-circle');
        $(".collapsible-header").find('i').removeClass('fa-minus-circle')
    }
}
function AutoSelect(e) {
    var AllBuqueArray = [];
    var searchString = $("#SearchBoxRecomnded").val();
    AllBuqueArray = AllBuquename.length == 0 ? AllBuquename = "" : AllBuquename;
    AllBuqueArray = AllBuquename.split(",");
    $("#SearchBoxRecomnded").autocomplete({
        source: AllBuqueArray,
        select: function (event, ui) {
            data = (ui.item.label);
            SearchPackage(data);
        }
    });
    if (searchString != "") {
        //$(".collapsible-header").show();
        //$('.collapsible-body').show();
        //$('.PackageDetailMainss').show();
        $('#SelectBroadDrop').css("pointer-events", 'none');
        $('#SelectDrop').css("pointer-events", 'none');
        $('#BroadCastChips').html("");
        $('#GenerName').html("");
        $("#BrowsBroad").find("li").find("input").prop("checked", false);
        $("#AlaCartbrow").find("li").find("input").prop("checked", false);
    } else {
        $('.collapsible-body').hide();
        $('.PackageDetailMainss').show();
        $('.BrodcasterColsp-body ul').show();
        $('.Channels-body ul').show();
        $(".collapsible-header").show();
        $("#BrodCastAddOn").find('li').css('display', 'block');
        $("#AlaCarteBody").find('li').css('display', 'block');
        $(".BrodcasterColsp-header").find('i').removeClass('fa-minus-circle');
        $(".BrodcasterColsp-header").find('i').addClass('fa-plus-circle');
        $("#AlaCarteBody").find('li').find('i').removeClass('fa-minus-circle');
        $("#AlaCarteBody").find('li').find('i').addClass('fa-plus-circle');
        $('#SelectBroadDrop').css("pointer-events", 'all');
        $('#SelectDrop').css("pointer-events", 'all');
        $("#BrowsBroad").find("li").find("input").prop("checked", false);
        $("#AlaCartbrow").find("li").find("input").prop("checked", false);

    }
};

function SearchPackage(val) {
    var searchString = val;
    if (BrodCaster == true) {
        $("#AddOnPackBody ul").each(function (index, value) {
            currentName = $(value).text();
            if ($(value).text().indexOf(searchString) == -1) {
                $(value).hide();
                $(value).closest("li").find(".BrodcasterColsp-header").hide();
            }
            else {
                $(value).closest("li").closest(".BroadcasterData").find("li").css("display", "none")
                $(value).closest("li").css("display", "block");
                $(value).closest("li").find(".BrodcasterColsp-header").show();
                $(value).closest("li").find(".BrodcasterColsp-header").click();
                $(value).closest("li").find(".BrodcasterColsp-body").show();
                $(value).closest("li").find(".BrodcasterColsp-body li").show();
                $(value).closest("div").find("ul").hide();
                $(value).show();
                return false;
            }
        });
    }
    if (Recomnded == true) {
        $("#BasePackBody ul").each(function (index, value) {
            currentName = $(value).text();
            if ($(value).text().indexOf(searchString) == -1) {
                $(value).hide();
                $(".PackageDetailMainss").hide();
            }
            else {
                $(value).closest("li").find('.PackageDetailMainss').hide()
                $(value).show();
                return false;
            }
        });
    }
    if (AlaCart == true) {
        $("#AlaCarteBody ul").each(function (index, value) {
            currentName = $(value).text();
            if ($(value).text().indexOf(searchString) == -1) {
                $(value).hide();
                $(value).closest("li").find(".Channels-header").hide();
            }
            else {
                $(value).closest("li").closest(".AlaCartData").find("li").css("display", "none")
                $(value).closest("li").css("display", "block");
                $(value).closest("li").find(".Channels-header").show();
                $(value).closest("li").find(".Channels-header").click();
                $(value).closest("li").find(".Channels-body").show();

                $(value).closest("div").find("ul").hide();
                $(value).closest("li").find(".Channels-body ul li").show();
                $(value).show();
                return false;
            }
        });
    }
}

$(window).load(function () {
    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Connection") {
            $(this).addClass("active");
        }
    });
    GetSubsAllConnection();
});

$(document).ready(function () {

    $("#ConectionsId").removeClass("Active");
    $('.card-reveal').find('.active').parent().addClass("active");
    $('.card-reveal').find('.active .collapsible-header  a').css("pointer-events", "all");

    $('.SuggestiveTab').click(function () {
        $('.SuggestiveTab').addClass("active");
        $('.BroadcasterTab').removeClass("active");
        $('.AlaCarteTab').removeClass("active");
        $('#SearchBoxRecomnded').val("");
        $('#SearchBoxRecomnded').keyup();
        $('#SugestedPacks').show();
        $('#BrodcasterPack').hide();
        $('#Ala-Carte').hide();
        $("#BroadCastChips").html("");
        $("#GenerName").html("");
        AlaCart = false;
        Recomnded = true;
        BrodCaster = false;
        AllBuquename = "";
        AllBuquename = RecomondedArray;
        ctime = 20;
    });
    $('.BroadcasterTab').click(function () {
        $('.SuggestiveTab').removeClass("active");
        $('.BroadcasterTab').addClass("active");
        $('.AlaCarteTab').removeClass("active");
        $('#SearchBoxRecomnded').val("");
        $('#SearchBoxRecomnded').keyup();
        $('#SugestedPacks').hide();
        $('#BrodcasterPack').show();
        $('#Ala-Carte').hide();
        $('#SelectBroadDrop').css("pointer-events", "all");
        $('#SelectDrop').css("pointer-events", "all");
        $("#BroadCastChips").html("");
        $("#GenerName").html("");
        AllBuquename = "";
        AllBuquename = BroadCastArray;
        AlaCart = false;
        Recomnded = false;
        BrodCaster = true;
        ctime = 20;
    });

    $('.AlaCarteTab').click(function () {
        $('.SuggestiveTab').removeClass("active");
        $('.BroadcasterTab').removeClass("active");
        $('.AlaCarteTab').addClass("active");
        $('#SearchBoxRecomnded').val("");
        $('#SearchBoxRecomnded').keyup();
        $('#SugestedPacks').hide();
        $('#BrodcasterPack').hide();
        $('#Ala-Carte').show();
        $("#BroadCastChips").html("");
        $("#GenerName").html("");
        AllBuquename = "";
        AllBuquename = ChannelName;
        AlaCart = true;
        Recomnded = false;
        BrodCaster = false;
        ctime = 20;
    });

    $(".modal-close").click(function () {
        $("#ConnectionModel").hide();
        $(".lean-overlay").hide();
        $("#ConnectionModelPrepaid").hide();
        $('body').css('overflow', 'auto');
    });
    $("#SelectBroadDrop").click(function () {
        //$("#brow").toggle();
        $(this).find("#BrowsBroad").show("fast");
    });
    $("#SelectDrop").click(function () {
        //$("#brow").toggle();
        $(this).find("#AlaCartbrow").show();
    });

    $("#ExpiringDay").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('#EditDays').click(function () {
        $('#GetDtails').show();
        $('#Notgetdetals').show();
        $('#ExpiringDay').css("pointer-events", "all");
        $('#EditDays').hide();
        $('.ExpiringDay').focus();
        $('.ExpiringDay').val(localStorage.getItem("ExpiryDateValue"));

    });

    $('#Notgetdetals').click(function () {
        $('#GetDtails').hide();
        $('#Notgetdetals').hide();
        $('#ExpiringDay').css("pointer-events", "none");
        $('#EditDays').show();
        $('.ExpiringDay').val(localStorage.getItem("ExpiryDateValue"));

    });

    $('#ExpiringTillDate').change(function () {
        GetExpiryProducts();
    });


});
$(document).on("click", function (event) {
    var $trigger = $("#SelectBroadDrop");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $("#BrowsBroad").slideUp("fast");
    }
});

$(document).on("click", function (event) {
    var $trigger = $("#SelectDrop");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $("#AlaCartbrow").slideUp("fast");
    }
});
function GetExpiryProducts() {
    try {
        //var CustomerId = localStorage.getItem("CustomerId");
        localStorage.setItem('ExpiryDateValue', $('#ExpiringDay').val());

        OperatorId = localStorage.getItem("CableOperaterID");
        var CustId = localStorage.getItem("CustId");
        var ExpiryDateValue = localStorage.getItem('ExpiryDateValue');
        var today = new Date();

        if (LogInDataTable[0]["IsDayWise"]) {

            var finaldate = new Date(today.setDate(today.getDate() + parseInt(1)));
            var ExpiryUptoDate = finaldate.toString().split(" ")[2] + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];

            var Todaydate = finaldate.toString().split(" ")[2] - 1 + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];
            var ExpiryUptoDateTime = ExpiryUptoDate + " 00:00:00 AM ";

            $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp;' + Todaydate + '&nbsp;(Expiry Date)');
        }
        else {

            var finaldate = new Date(today.setDate(today.getDate() + parseInt(ExpiryDateValue)));
            //var ExpiryUptoDate = finaldate.toString().split(" ")[2] + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];
            var ExpiryUptoDate = $('#ExpiringTillDate').text();
            var ExpiryUptoDateTime = ExpiryUptoDate + " 11:59:59 PM ";

            $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp; Product(s) Expiring Till &nbsp;' + ExpiryUptoDate + ' : ' + ' 0 ');
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
        confirmAction = function () {
        }
        MsgBox('E', "Something went wrong, please try again later!");
    }
}
function OnPassGetExpiryProducts(result) {
    try {

        var res = result.d.split("|");
        if (res[0] != "E") {
            ExpiringProducts = JSON.parse(res);
            if (ExpiringProducts["Status"] == "Success") {
                ExpiringProducts = JSON.parse(res).Description;

                localStorage.setItem("ExpiringProducts", res);
                var ConnectionExpiringProducts = $.grep(ExpiringProducts, function (items) {
                    return (items['RowIndex'] >= '0');
                });

                var TotalExpiringCount = 0;
                var TotalRequiredAmount = 0;
                if (ConnectionExpiringProducts.length > 0) {

                    for (i = 0; i < ConnectionExpiringProducts.length; i++) {

                        TotalExpiringCount = TotalExpiringCount + parseInt(ConnectionExpiringProducts[i]["CountExpiring"]);
                        TotalRequiredAmount = TotalRequiredAmount + ConnectionExpiringProducts[i]["Total Required_Amt (A+B+C)"];
                    }

                }

                localStorage.setItem("TotalExpiringCount", TotalExpiringCount);
                localStorage.setItem("TotalRequiredAmount", TotalRequiredAmount);




                $('#BillAmount').html('<i class="fa fa-inr"></i>&nbsp;' + ((TotalRequiredAmount).toFixed(2)) + '&nbsp;');
                if (!LogInDataTable[0]["IsDayWise"]) {
                    var ExpiryDateValue = localStorage.getItem('ExpiryDateValue');
                    var today = new Date();
                    var finaldate = new Date(today.setDate(today.getDate() + parseInt(ExpiryDateValue)));
                    //var ExpiryUptoDate = finaldate.toString().split(" ")[2] + "-" + finaldate.toString().split(" ")[1] + "-" + finaldate.toString().split(" ")[3];
                    var ExpiryUptoDate = $('#ExpiringTillDate').text();
                    $('#DueDate').html('<i class="fa fa-calendar"></i>&nbsp; Product(s) Expiring Till &nbsp;' + ExpiryUptoDate + ' : ' + TotalExpiringCount);
                }


                //balance sufficient or not 
                var WalletAmount = 0;
                if (LogInDataTable[0]["BalanceAmount"] == "" || LogInDataTable[0]["BalanceAmount"] == undefined)
                    WalletAmount = 0;
                else
                    WalletAmount = LogInDataTable[0]["BalanceAmount"];


                WalletAmount = ((WalletAmount).toFixed(2)).replace("-", "");
                var RequiredAmount = TotalRequiredAmount - WalletAmount;

                if (RequiredAmount > 0) {

                    $('#InsufficientBal').css("display", "block");
                    $('#InsufficientBal').css("visibility", "visible");
                    $('#SufficientBal').css("display", "none");
                    $('#SmallSizeInsfBal').css("display", "block");
                    $('#SmallSizeSuffiBal').css("display", "none");
                }
                else {
                    $('#InsufficientBal').css("display", "none");
                    $('#SufficientBal').css("display", "block");

                    $('#SmallSizeInsfBal').css("display", "none");
                    $('#SmallSizeSuffiBal').css("display", "block");
                }

                //End balance sufficient or not 

                $('#Loadingbg').css('display', 'none');

            }
            else {
                confirmAction = function () {
                }
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
        confirmAction = function () {
        }
        MsgBox('E', "Something went wrong, please try again later!");
    }

    //location.reload(true);
    //var ConnDataTable = localStorage.getItem('ConnectionDataTable');
    ExpiringBinding();
    //OnPassAgainConnectionData(ConnDataTable);
}

function OnFailGetExpiryProducts() {
    $('#Loadingbg').css('display', 'none');
}



function ExpiringBinding() {
    var IsPrepaid = localStorage.getItem("IsPrepaid");


    if (IsPrepaid == "true") {
        var ConnectionExpiringProducts = $.grep(ExpiringProducts, function (items) {
            return (items['RowIndex'] >= '0');
        });
    }

    for (var i = 1; i <= LogInDataTable[0]["NoOfActiveCon"]; i++) {
        var ExpiringCountfinal = $.grep(ConnectionExpiringProducts, function (items) {
            return (items['Connection ID'] == i);
        });




        if (ExpiringCountfinal.length > 0) {
            $('#ExpiringCount' + i).html(ExpiringCountfinal[0]["CountExpiring"]);
            $('#RequiredAmount' + i).html(ExpiringCountfinal[0]["Total Required_Amt (A+B+C)"]);
        }
        else {
            $('#ExpiringCount' + i).html(0);
            $('#RequiredAmount' + i).html(0);
        }
    }



    //New MyConnection Top Section work for Prepaid Case

    var SubstypePrepaid = localStorage.getItem("IsPrepaid");
    var ExpiryUptoDate = localStorage.getItem("ExpiryUptoDate");
    var TotalExpiringProduct = localStorage.getItem("TotalExpiringCount");
    var TotalRecommendedAmount = localStorage.getItem("TotalRequiredAmount");
    var ExpiryDateValue = localStorage.getItem('ExpiryDateValue');
    var WalletAmount = 0;

    if (LogInDataTable[0]["BalanceAmount"] == "" || LogInDataTable[0]["BalanceAmount"] == undefined)
        WalletAmount = 0;
    else
        WalletAmount = LogInDataTable[0]["BalanceAmount"];


    WalletAmount = ((WalletAmount).toFixed(2)).replace("-", "");



    //    var RequiredAmount=TotalRecommendedAmount - WalletAmount;
    var RequiredAmount = 0;
    if (LogInDataTable[0]["BalanceAmount"] <= 0)
        RequiredAmount = parseFloat(TotalRecommendedAmount) - parseFloat(WalletAmount);
    else
        RequiredAmount = parseFloat(TotalRecommendedAmount) + parseFloat(WalletAmount);

    TotalRecommendedAmount = (TotalRecommendedAmount == "" || TotalRecommendedAmount == undefined) ? 0 : parseFloat(TotalRecommendedAmount);
    if (SubstypePrepaid == "true") {
        if (LogInDataTable[0]["IsDayWise"] == true) {
            $('#ProductDetails').css("display", "none");
        }
        else {
            $('#ProductDetails').css("display", "block");
            $('#TotalActiveConnection').html(LogInDataTable[0]["NoOfActiveCon"]);
            $('#ExpiringTillDate').html(ExpiryUptoDate);
            $('#ExpiringDay').val(ExpiryDateValue);
            $('#TotalExpiringProduct').html(TotalExpiringProduct);
            $('#TotalRecommededRecharge').html(TotalRecommendedAmount.toFixed(2));

            if (RequiredAmount > 0) {
                $('#RequiredAmount').html(RequiredAmount.toFixed(2));
                $('#InsufficientBal').css("display", "block");
                $('#SufficientBal').css("display", "none");
                $('#SmallSizeInsfBal').css("display", "block");
                $('#SmallSizeSuffiBal').css("display", "none");

            }
            else {
                $('#RequiredAmount').html(0);
                $('#InsufficientBal').css("display", "none");
                $('#SufficientBal').css("display", "block");
                $('#SmallSizeInsfBal').css("display", "none");
                $('#SmallSizeSuffiBal').css("display", "block");

            }
        }
    }
    else {
        $('#ProductDetails').css("display", "none");
    }

    //End New MyConnection Top Section work for Prepaid Case


}
//function EndDateCalculation(tenurePeriod, startData, tenureNumber, tenurePeriodValue, Id) {
//    var EndDate = "";
//    var sDate = startData == "" ? Reliable.ReliableGetDate('S').split('|')[0] : startData;
//    var tenureMultiplier = parseInt(tenureNumber) * parseInt(tenurePeriodValue);
//    sDate = Reliable.DateAdd('D', -1, sDate)
//    if (tenurePeriod == "Days")
//        EndDate = Reliable.DateAdd('D', tenureMultiplier, sDate);
//    else
//        EndDate = Reliable.DateAdd('M', tenureMultiplier, sDate);

//    $("#EndDate" + Id).text(EndDate);

//}
function EndDateCalculation(Id) {
    try {
        Id = "#" + Id;
        if ($(Id).prop("checked") == true) {
           
            var tenureperiodin = $(Id).closest('ul').data('tenureperiodin');
            var TenureNo = $(Id).closest('li').find('#myform').find(".qty").val();
            var ProductType = $(Id).closest('ul').data('producttype');
            var PolID = $(Id).closest('ul').data('polid');
            var ProductID = $(Id).closest('ul').data('bouquetid');
            var EndDate = null;
            EndDate = new Array();
            $('#Loadingbg').css('display', 'block');
            EndDate.push({
                ProductType: ProductType,
                TenureNo: TenureNo,
                PolID: PolID,
                ProductID: ProductID,
                CustomerID: localStorage.getItem("CustId"),
                ConnID: localStorage["ConnectionId"],
                IsAuth: true
            });
            var Data = Stringify(EndDate);
            PushData('Data', Data);
            PushData('CompID', localStorage.getItem("CompID"));
            PushData('OPID', localStorage.getItem("CableOperaterID"));
            PushData('Action', "0");
            PushData('bIsDay', tenureperiodin == "Days" ? true : false);
            PushData('Id', $(Id).prop('id'));
            CallPublicAPI('RenewConnection.aspx/EndDateCalculation', '', OnPassEndDate, OnFailEndDate, true);
        }
        else {
            if ($(Id).closest('ul').data('isapply') == "0")
            $(Id).closest('li').find('.EndDate').text("Only for selected product");
            $(Id).closest('li').find('.StarttoEnd').css("display", 'none');
        }
        
       
    }
    catch (err) {
        $('#Loadingbg').css('display', 'none');
        MsgBox('E', "Something went wrong, please contact with your Provider !");
    }
}
function OnPassEndDate(result) {
    try {
        $('#Loadingbg').css('display', 'none');
        var res = result.d.split("|");
        var Data = result.d == "" ? null : JSON.parse(res[0]);
        if (Data["Status"] == "Success") {
            var EndDate = Data["Description"][0]["TODate"];
            if ($("#" + res[1] + "").prop("checked") == true) {
                $("#" + res[1] + "").closest('li').find('.EndDate').text(EndDate);
                $("#" + res[1] + "").closest('li').find('.StarttoEnd').css("display", 'block');;
            }
            else {
                if ($("#" + res[1] + "").closest('ul').data('isapply') == "0") {
                    $("#" + res[1] + "").closest('li').find('.EndDate').text("Only for selected product");
                    $("#" + res[1] + "").closest('li').find('.StarttoEnd').css("display", 'none');
                }
            }
        }
    }
    catch (err) {
        $('#Loadingbg').css('display', 'none');
        MsgBox('E', "Something went wrong, please contact with your Provider !");
    }

}
function OnFailEndDate(result) {
    $('#Loadingbg').css('display', 'none');
}
function CalcuateProduct() {

    //ProductID, ProductType, PolID, TenureNo, IsAuth
    var ConnID, ProductID, ProductType, PolID, TenureNo;
    var Revers = [];
    var BqArray = BouqueIdsList.split(",");
    var BroadArray = BroadCastIdsList.split(",");
    var ChannelArray = ChannelIdsList.split(",");
    CalculateProduct = [];
    $("#BasePackBody").find('.PreapaidSetting input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) < 0) {
                CreateCalculateData(this, 'true');
            }
        }
        else if ($(this).prop("checked") == false) {
            if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                CreateCalculateData(this, 'false');
            }

        }
    });
    $("#BrodcasterPack").find('.PreapaidSetting input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) < 0) {
                CreateCalculateData(this, 'true');
            }
        }
        else if ($(this).prop("checked") == false) {
            if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {

                CreateCalculateData(this, 'false');
            }

        }
    });
    $("#Ala-Carte").find('.PreapaidSetting input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) < 0)
                CreateCalculateData(this, 'true');
        }
        else if ($(this).prop("checked") == false) {
            if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                var isDuplicate = 'false';
                if ($("#FinalRecommendedPackPre").find('div[data-productid=' + $(this).closest("ul").data("bouquetid") + ']').data('duplicate') == "(Duplicate)")
                    isDuplicate = 'true';
                CreateCalculateData(this, 'false', isDuplicate);
            }
        }
    });
    if (CalculateProduct.length > 0) {
        PushData('OPID', OperatorId);
        //PushData('CustomerID', localStorage.getItem("CustId"));
        var Time = localStorage.getItem("ModifyTimeStamp").toString()
        PushData('xml', Stringify(CalculateProduct));
        var CustomerDetail = [];
        CustomerDetail.push({
            TransNo: 1,
            CustomerID: localStorage.getItem("CustId"),
            ConnID: localStorage["ConnectionId"],
            ModifyTimeStamp: Time.toString()
        })
        PushData('CustomerDetail', Stringify(CustomerDetail));

        CallPublicAPI('MyConnections.aspx/CalwithValidateMethod', '', OnPassCalculation, OnFailCalculation);
        $('#Loadingbg').css('display', 'block');
    }
}
function OnPassCalculation(result) {
    try {
        var Data = result.d == "" ? null : JSON.parse(result.d);
        $('#Loadingbg').css('display', 'none');
        if (Data["Status"] == "Fail") {
            confirmAction = function () {
            }
            MsgBox('E', "Something went wrong, please contact with your Provider !");
        }
        else {
            var ReverseNCFDataResult = [];
            var ReversdataResult = [];
            var ProductSubTotal = 0;
            var TaxOnProduct = 0;
            var IsNCFRevers = false;
            var NCFChannelCount = 0;
            var TotalNCFReverse = 0;
            var TotalNCFTaxReverse = 0;
            var TotalProductRevers = 0;
            var TotalProductTaxRevers = 0;
            var subtotal = 0;
            var ProductCount = 0;
            OrderSummaryTable1 = [];
            OrderSummaryTable2 = [];

            if (Data["Description"]["Table1"][0]["ErrorMsg"] != "") {
                $('#ConnectionModelPrepaid').hide();
                ErrorCode = "";
                ErrorCode = Data["Description"]["Table1"][0]["ErrorMsg"].split('~')[0].toString();
                confirmAction = function () {
                    $('body').css('overflow', 'auto');
                }
                MsgBox('E', "Something went wrong, please contact with your Provider with ErrorCode : '" + ErrorCode + "' !");
                $('#materialize-lean-overlay-1').hide();
            }
            else {
                $('#materialize-lean-overlay-1').show();
                if (Data["Description"] != "No Records Found !!!") {
                    ReverseNCFDataResult = Data["Description"]["Table1"];//NCF Table
                    ReversdataResult = Data["Description"]["Table2"];//Reversal Table       

                    NCFChannelCount = parseInt(Data["Description"]["Table"][0]["NCF_ChannelCount"]);
                    if (NCFChannelCount < 0)
                        NCFChannelCount = 0;
                }
                if (ReverseNCFDataResult.length > 0) {
                    for (var i = 0; i < ReverseNCFDataResult.length ; i++) {
                        // if(ReverseNCFDataResult[i]["ProductId"] !=-16 && ReverseNCFDataResult[i]["ProductId"] !=16 &&)
                        if (ReverseNCFDataResult[i]["ProductType"] != 16)
                            ProductCount++;
                        else if (ReverseNCFDataResult[i]["ProductId"] == -16)
                            IsNCFRevers = true;
                        //NCFChannelCount += parseInt(ReverseNCFDataResult[i]["NewNcfChnlCount"]);//;
                        ProductSubTotal += parseFloat(ReverseNCFDataResult[i]["DrpRate"]);
                        TaxOnProduct += parseFloat(ReverseNCFDataResult[i]["SubsDRPTax"]);
                        TotalNCFReverse += parseFloat(ReverseNCFDataResult[i]["SubsNCFAmount"]);
                        TotalNCFTaxReverse += parseFloat(ReverseNCFDataResult[i]["SubsNCFTax"]);
                        // if (ReverseNCFDataResult[i]["ProductId"] != -16 && ReverseNCFDataResult[i]["ProductId"] != 16)
                        if (ReverseNCFDataResult[i]["ProductId"] != -16 && ReverseNCFDataResult[i]["ProductType"] != 16) {
                            if (ReverseNCFDataResult[i]["ProductType"].toString() == "2") {
                                $("#FinalRecommendedPackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('h6 span').text(parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2));
                                $("#FinalRecommendedPackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('p').text("Subscription for the period ( " + ReverseNCFDataResult[i]["FromDate"] + " to " + ReverseNCFDataResult[i]["TODate"] + ")");

                                $("#FinalBrodcastPackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('h6 span').text(parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2));
                                $("#FinalBrodcastPackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('p').text("Subscription for the period ( " + ReverseNCFDataResult[i]["FromDate"] + " to " + ReverseNCFDataResult[i]["TODate"] + ")");

                                OrderSummaryTable1.push({
                                    ProductID: ReverseNCFDataResult[i]["ProductId"],
                                    ProductName: ReverseNCFDataResult[i]["PolicyName"],
                                    StartDate: ReverseNCFDataResult[i]["FromDate"],
                                    EndDate: ReverseNCFDataResult[i]["TODate"],
                                    Amount: parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2),
                                    ProductType: ReverseNCFDataResult[i]["IsBrodcasterBQ"] == "1" ? "2" : "1",
                                    IsReversal: false
                                })
                            }
                        }
                        if (ReverseNCFDataResult[i]["ProductType"].toString() == "1") {
                            $("#FinalAlaCartePackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('h6 span').text(parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2));
                            $("#FinalAlaCartePackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('p').text("Subscription for the period ( " + ReverseNCFDataResult[i]["FromDate"] + " to " + ReverseNCFDataResult[i]["TODate"] + ")");

                            OrderSummaryTable1.push({
                                ProductID: ReverseNCFDataResult[i]["ProductId"],
                                ProductName: ReverseNCFDataResult[i]["PolicyName"],
                                StartDate: ReverseNCFDataResult[i]["FromDate"],
                                EndDate: ReverseNCFDataResult[i]["TODate"],
                                Amount: parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2),
                                ProductType: "3",
                                IsReversal: false
                            })
                        }
                    }
                }

                if (ReversdataResult.length > 0) {
                    for (var i = 0; i < ReversdataResult.length ; i++) {
                        TotalProductRevers += parseFloat(ReversdataResult[i]["SubsReversalAmt"]);
                        TotalProductTaxRevers += parseFloat(ReversdataResult[i]["SubsReversalTaxAmt"]);
                        if (ReversdataResult[i]["ProductType"].toString() == "2") {
                            $("#FinalRecommendedPackPre").find('div[data-polid=' + ReversdataResult[i]["PolicyId"] + ']').find('h6 span').text("-" + parseFloat(ReversdataResult[i]["SubsReversalAmt"]).toFixed(2));
                            $("#FinalRecommendedPackPre").find('div[data-polid=' + ReversdataResult[i]["PolicyId"] + ']').find('p').text("Reversal for the period ( " + Reliable.ReliableGetDate('S').split('|')[0] + " to " + ReversdataResult[i]["PreEndDate"] + ")");

                            $("#FinalBrodcastPackPre").find('div[data-polid=' + ReversdataResult[i]["PolicyId"] + ']').find('h6 span').text("-" + parseFloat(ReversdataResult[i]["SubsReversalAmt"]).toFixed(2));
                            $("#FinalBrodcastPackPre").find('div[data-polid=' + ReversdataResult[i]["PolicyId"] + ']').find('p').text("Reversal for the period ( " + Reliable.ReliableGetDate('S').split('|')[0] + " to " + ReversdataResult[i]["PreEndDate"] + ")");
                            OrderSummaryTable1.push({
                                ProductID: ReversdataResult[i]["ProductId"],
                                ProductName: ReversdataResult[i]["PolicyName"],
                                StartDate: Reliable.ReliableGetDate('S').split('|')[0],
                                EndDate: ReversdataResult[i]["PreEndDate"],
                                Amount: parseFloat(ReversdataResult[i]["SubsReversalAmt"]).toFixed(2),
                                ProductType: ReversdataResult[i]["IsBrodcasterBQ"] == "1" ? "2" : "1",
                                IsReversal: true
                            })

                        }
                        if (ReversdataResult[i]["ProductType"].toString() == "1") {
                            $("#FinalAlaCartePackPre").find('div[data-polid=' + ReversdataResult[i]["PolicyId"] + ']').find('h6 span').text("-" + parseFloat(ReversdataResult[i]["SubsReversalAmt"]).toFixed(2));
                            $("#FinalAlaCartePackPre").find('div[data-polid=' + ReversdataResult[i]["PolicyId"] + ']').find('p').text("Reversal for the period ( " + Reliable.ReliableGetDate('S').split('|')[0] + " to " + ReversdataResult[i]["PreEndDate"] + ")");
                            OrderSummaryTable1.push({
                                ProductID: ReversdataResult[i]["ProductId"],
                                ProductName: ReversdataResult[i]["PolicyName"],
                                StartDate: Reliable.ReliableGetDate('S').split('|')[0],
                                EndDate: ReversdataResult[i]["PreEndDate"],
                                Amount: parseFloat(ReversdataResult[i]["SubsReversalAmt"]).toFixed(2),
                                ProductType: "3",
                                IsReversal: true
                            })
                        }
                    }
                }

                $("#ProductSubTotalPre").html(ProductSubTotal.toFixed(2));
                $("#TaxPre").html(TaxOnProduct.toFixed(2));
                $(".ProductCount").html(" (" + ProductCount + ")");
                if (ReversdataResult.length > 0) {
                    $("#ReversalTotal").html("-" + TotalProductRevers.toFixed(2));
                    $("#TaxReversal").html("-" + TotalProductTaxRevers.toFixed(2));
                    $(".ReverseProductCount").html(" (" + ReversdataResult.length + ")");
                    $(".Reversal").show();
                }
                else {
                    $(".Reversal").hide();
                }
                if (IsNCFRevers == true) {
                    $(".NetworkFeeCount").html(" Reversal");
                    $("#NetworkFeePre").html("-" + TotalNCFReverse.toFixed(2));
                    $("#NCFTaxPre").html("-" + TotalNCFTaxReverse.toFixed(2));
                }
                else {
                    $(".NetworkFeeCount").html("(Channel Count : " + NCFChannelCount + ")");
                    $("#NetworkFeePre").html(TotalNCFReverse.toFixed(2));
                    $("#NCFTaxPre").html(TotalNCFTaxReverse.toFixed(2));
                }
                var GrandTotal = 0;
                GrandTotal = (ProductSubTotal + TaxOnProduct);
                if (IsNCFRevers == true) {
                    if (GrandTotal > 0)
                        GrandTotal = (GrandTotal) - (TotalProductRevers + TotalProductTaxRevers + TotalNCFReverse + TotalNCFTaxReverse);
                    else
                        GrandTotal = (-1) * (TotalProductRevers + TotalProductTaxRevers + TotalNCFReverse + TotalNCFTaxReverse);

                    //if (GrandTotal < 0)
                    //    $("#GradTotal").html(GrandTotal.toFixed(2));
                    //else
                    $("#GradTotal").html(GrandTotal.toFixed(2));

                }
                else {
                    GrandTotal = GrandTotal + TotalNCFReverse + TotalNCFTaxReverse
                    GrandTotal = (GrandTotal - TotalProductRevers - TotalProductTaxRevers);

                    $("#GradTotal").html(GrandTotal.toFixed(2));
                }

                var WalletBalance = LogInDataTable[0]["BalanceAmount"];// parseFloat((localStorage.getItem("MyWalletBalance")).replace("-", ""));
                if (WalletBalance < 0) {

                    $("#AvailableBal").html((WalletBalance * (-1)).toFixed(2) + " Cr.");
                    $("#AvailableBal").css('color', 'green');
                }
                else {
                    $("#AvailableBal").html(WalletBalance.toFixed(2) + " Dr.");
                    $("#AvailableBal").css('color', 'red');
                }

                if (GrandTotal < 0) {
                    $("#RequiredAmt").html((GrandTotal * (-1)).toFixed(2) + " Cr.");
                    $(".reqtext").html("Amount to be reversed");
                    $("#RequiredAmt").css('color', 'green');
                }
                else {
                    $("#RequiredAmt").html(GrandTotal.toFixed(2) + " Dr.");
                    $(".reqtext").html("Amount to be Deducted");
                    $("#RequiredAmt").css('color', 'red');
                }
                var Remaining = 0;

                if (WalletBalance < 0) {
                    WalletBalance = WalletBalance * (-1);
                    if (WalletBalance > GrandTotal) {
                        Remaining = (WalletBalance - GrandTotal);
                        $("#RemainingAmt").html((Remaining).toFixed(2) + " Cr.");
                        if (GrandTotal < 0)
                            $(".remaintext").html("Balance After reversal");
                        else
                            $(".remaintext").html("Balance After Deduction");
                        $("#RemainingAmt").css('color', 'green');
                    }
                    else {
                        Remaining = (GrandTotal - WalletBalance);
                        $("#RemainingAmt").html(Remaining.toFixed(2) + " Dr.");
                        $(".remaintext").html("Balance After Deduction");
                        $("#RemainingAmt").css('color', 'red');
                    }
                }
                else {
                    //When Balance in debit
                    Remaining = (GrandTotal + WalletBalance);
                    if (WalletBalance > GrandTotal) {
                        if (Remaining < 0) {
                            Remaining = Remaining * (-1);
                            $("#RemainingAmt").html(Remaining.toFixed(2) + " Cr.");
                            $(".remaintext").html("Balance After reversal");
                            $("#RemainingAmt").css('color', 'green');
                        }
                        else {
                            $("#RemainingAmt").html(Remaining.toFixed(2) + " Dr.");
                            $(".remaintext").html("Balance After Deduction");
                            $("#RemainingAmt").css('color', 'red');
                        }
                    }
                    else {
                        $("#RemainingAmt").html(Remaining.toFixed(2) + " Dr.");
                        $(".remaintext").html("Balance After Deduction");
                        $("#RemainingAmt").css('color', 'red');
                    }


                }
                OrderSummaryTable2.push({
                    SubTotalAmt: $("#ProductSubTotalPre").html(),
                    TaxProductAmt: $("#TaxPre").html(),
                    ProductCount: $(".ProductCount").html(),
                    ReversalTotal: $("#ReversalTotal").html(),
                    TaxReversal: $("#TaxReversal").html(),
                    ReverseProductCount: $(".ReverseProductCount").html(),
                    NetworkFeePre: $("#NetworkFeePre").html(),
                    NCFTaxPre: $("#NCFTaxPre").html(),
                    NetworkFeeCount: $(".NetworkFeeCount").html(),
                    GradTotal: $("#GradTotal").html(),
                    AvailableBal: $("#AvailableBal").html(),
                    RequiredAmt: $("#RequiredAmt").html(),
                    RemainingAmt: $("#RemainingAmt").html()
                });
                if ($("#RecommendedPackPre").html() == "" && IsOnload == true) {
                    $('#RecPackMainPrePaid').hide();
                }
                else if ($("#FinalRecommendedPackPre").html() == "" && IsOnload == false) {
                    $('#RecPackMainPrePaid').hide();
                }
                else {
                    $('#RecPackMainPrePaid').show();
                }

                if ($("#BrodcastPackPre").html() == "" && IsOnload == true) {
                    $('#BroadMainPrePaid').hide();
                }
                else if ($("#FinalBrodcastPackPre").html() == "" && IsOnload == false) {
                    $('#BroadMainPrePaid').hide();
                }
                else {
                    $('#BroadMainPrePaid').show();
                }
                if ($("#AlaCartePackPre").html() == "" && IsOnload == true) {
                    $('#AlamainPrePaid').hide();
                }
                else if ($("#FinalAlaCartePackPre").html() == "" && IsOnload == false) {
                    $('#AlamainPrePaid').hide();
                }
                else {
                    $('#AlamainPrePaid').show();
                }

                $('#ConnectionModelPrepaid').show();
            }
        }
    }
    catch (err) {
        $('#Loadingbg').css('display', 'none');
        $('#ConnectionModelPrepaid').hide();
        $('#materialize-lean-overlay-1').hide();
        confirmAction = function () {
        }
        MsgBox('E', "Something went wrong, please contact with your Provider !");

    }
}
function OnFailCalculation(result) {
    $('#Loadingbg').css('display', 'none');
}
function CreateCalculateData(id, IsAuth, isDuplicate) {
  
    CalculateProduct.push({
        TransNo: 1,
        PrepaidPolID: $(id).closest("ul").data("polid").toString(),
        IsAuth: IsAuth,
        RenewMode: 1,
        IsExtend: false,//Use for Re-auth case
        NewTenureType: $(id).closest("ul").data("tenuretype") == "Fixed" ? 0 : 1,
        MultiTermSubscription: $(id).parent().parent().parent().find("input.qty").val()
    });

}
function AddMoney() {//amt, SubscriptionProduct
    $("#ApplyProduct").hide();
    $('#materialize-lean-overlay-3').hide();
    var SmartCard = localStorage.getItem("VCNO");
    var TimeStamp = localStorage.getItem("ModifyTimeStamp");
    var SubsProductDeatils = PrePaidSubscriptionProduct()


    SubsProductDeatils = SubsProductDeatils.split('*')[0] + "|" + SubsProductDeatils.split('*')[1] + "|" + SmartCard + "|" + TimeStamp + "|" + OperatorId;
    var OrderSummary = $("#ConnectionModelPrepaid").find('form').find('.row').html();
    localStorage.setItem("Amount", parseFloat($("#RemainingAmt").html()));
    PushData('SubscriptionProduct', SubsProductDeatils);
    PushData('OrderSummary1', Stringify(OrderSummaryTable1));
    PushData('OrderSummary2', Stringify(OrderSummaryTable2));
    CallPublicAPI('MyConnections.aspx/redirectToAddMoney', '', OnPassredirectToAddMoney, OnFailredirectToAddMoney);
}
function OnPassredirectToAddMoney() {
    localStorage.setItem("CallFromSubscription",true)
    GetPayment();
    
}
function OnFailredirectToAddMoney(result) {
    $('#Loadingbg').css('display', 'none');
}
function PrePaidSubscriptionProduct(CallBy) {
    var BqArray = BouqueIdsList.split(",");
    var BroadArray = BroadCastIdsList.split(",");
    var ChannelArray = ChannelIdsList.split(",");
    var Class = (localStorage.getItem("IsPrepaid") == false) ? "PostpaidSetting" : "PreapaidSetting";
    var AB = "", DB = "", AC = "", DC = "";
    var result = "";
    var Auth = [], DeAuth = [];
    $("#BasePackBody").find('.' + Class + ' input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) < 0) {
                AB += $(this).closest("ul").data("polid").toString() + ",";
                Auth.push({
                    PolID: $(this).closest("ul").data("polid").toString(),
                    IsChannel: 0,
                    MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
                });
            }
        }
        else if ($(this).prop("checked") == false) {
            if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                DB += $(this).closest("ul").data("polid").toString() + ",";
                DeAuth.push({
                    PolID: $(this).closest("ul").data("polid").toString(),
                    IsChannel: 0,
                    MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
                });
            }
        }
    });
    $("#BrodcasterPack").find('.' + Class + ' input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) < 0) {
                AB += $(this).closest("ul").data("polid").toString() + ",";
                Auth.push({
                    PolID: $(this).closest("ul").data("polid").toString(),
                    IsChannel: 0,
                    MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
                });
            }

        }
        else if ($(this).prop("checked") == false) {
            if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                DB += $(this).closest("ul").data("polid").toString() + ",";
                DeAuth.push({
                    PolID: $(this).closest("ul").data("polid").toString(),
                    IsChannel: 0,
                    MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
                });
            }

        }
    });
    $("#Ala-Carte").find('.' + Class + ' input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) < 0) {
                AC += $(this).closest("ul").data("polid").toString() + ",";
                Auth.push({
                    PolID: $(this).closest("ul").data("polid").toString(),
                    IsChannel: 1,
                    MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
                });
            }
        }
        else if ($(this).prop("checked") == false) {
            if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                DC += $(this).closest("ul").data("polid").toString() + ",";
                DeAuth.push({
                    PolID: $(this).closest("ul").data("polid").toString(),
                    IsChannel: 1,
                    MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
                });
            }
        }
    });

    AC = AC.slice(0, -1);
    DC = DC.slice(0, -1);
    AB = AB.slice(0, -1);
    DB = DB.slice(0, -1);
    // if (CallBy == "AuthDeAuth")
    result = Stringify(Auth) + "*" + Stringify(DeAuth);
    // else
    //    result = AC + "|" + DC + "|" + AB + "|" + DB;


    return result;
}

function closepopup(ctrl) {
    $(ctrl).closest(".modal").css("display", "none");
    $("#materialize-lean-overlay-3").hide();
}