

var IsConnAddOrNot = "false";
var ConectionId = "";
var RemoveChannelID = RemoveChannel = RemoveBouquetIDs = RemoveBouquets = "";
var CurrentPackType = 0;

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
function GetRenewProduct() {
    $('#Loadingbg').css('display', 'block');

    var VCNO = localStorage.getItem("VCNO");
    PushData('SearchBy', "0");
    PushData('OPID', OperatorId);
    PushData('SmartCard', VCNO);
    PushData('listtype', "0");
    PushData('IsPrepaid', localStorage.getItem("IsPrepaid"));
    CallPublicAPI('RenewConnection.aspx/GetMainBouquet', '', OnPassRenewProduct, OnFailRenewProduct, "relyMSOApp", "rely@3134");
}
function OnPassRenewProduct(result) {
    var result = result.d;
    ConnectionDataTable = JSON.parse(result);
    var RenewHTML = "";
    var ActiveClass = "";
    var IsCallFirstTime = true;
    var MultiTenure = "";
    $('#Loadingbg').css("display", 'none');
    if (ConnectionDataTable["Status"] == "Success") {

        IsOnload = true;
        Recomnded = true;
        //  $('body').css('overflow', 'hidden');     
        var ConnectionDataTable1 = $.grep(ConnectionDataTable["Description"], function (items) {
            return (items['ProductType'] == "MPkg" || items['ProductType'] == "APkg" || items['ProductType'] == "Ala");// && items['IsbrodProduct'] == 0;
        });

        //var ConnectionDataTable2 = $.grep(ConnectionDataTable["Description"], function (items) {
        //    return (items['ProductType'] == "MPkg" || items['ProductType'] == "APkg" || items['ProductType'] == "Ala") && items['IsbrodProduct'] == 1;
        //});
        var CustomerId = localStorage["CustId"];
        var ConnectionId = localStorage["ConnectionId"];
        var index = 1;
        var count = 1;
        var PIDArray = [];
        //for (var i = 0; i < ConnectionDataTable1.length; i++) {
        //    if (jQuery.inArray(ConnectionDataTable1[i]["Genre"], PIDArray) == -1 && ConnectionDataTable1[i]["Genre"] != '') {
        //        PIDArray.push(ConnectionDataTable1[i]["Genre"]);
        //    }
        //}
        BouqueIdsList = "";
        BroadCastIdsList = "";
        ChannelIdsList = "";
        BouqueNameList = "";
        ChannelNameList = "";
        MultiTermSubscription = "";
        MultiSubsAdd = ""; MultiSubsMinus = "";
        StartDate = "", EndDate = "";
        for (var i = 0; i < ConnectionDataTable1.length; i++) {
            ConnectionPakageType = 1;

            if (ConnectionDataTable1[i]["MultiTermSubscription"] == false)//|| ConnectionDataTable1[i]["IsPckwithSubs"] == "1"
            {
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
            PolID = ConnectionDataTable1[i]["PrePolID"];
            var PolicyName = ConnectionDataTable1[i]["PolicyName"];
            var Rate = parseFloat(ConnectionDataTable1[i]["Rate"]).toFixed(2);
            var PackagetypeType = ConnectionDataTable1[i]['ProductType'];
            StartDate = ConnectionDataTable1[i]["EndDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : ConnectionDataTable1[i]["EndDate"]; //ConnectionDataTable1[i]["StartDate"] == "" ? Reliable.ReliableGetDate('S').split('|')[0] : ConnectionDataTable1[i]["StartDate"];

            if (ConnectionDataTable1[i]["ProductType"] == "MPkg" && ConnectionDataTable1[i]["IsbrodProduct"] == 0) {

                var Channelcount = ConnectionDataTable1[i]["Channelcount"];
                RecomondedArray += ConnectionDataTable1[i]["PolicyName"] + ',';
                var IsPackwithSubs = false;
                if (ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    BouqueIdsList += PolID + ",";
                    BouqueNameList += PolicyName + ",";
                    //IsPackwithSubs = "checked = true";
                    IsPackwithSubs = "";
                }
                else
                    IsPackwithSubs = "";


                RenewHTML += '<ul class="PackageDetailMainss" data-productname="' + PolicyName + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-CustID="' + CustomerId + '" data-polid="' + ConnectionDataTable1[i]["PrePolID"] + '"  data-ProductType=2 data-bouquetid="' + ConnectionDataTable1[i]["ProductID"] + '" data-mainbouquet="' + PolicyName + '" data-channelscount="' + Channelcount + '"  data-mainrate="' + Rate + '" data-tabtype=1 data-isapply="' + ConnectionDataTable1[i]["IsPckwithSubs"] + '" data-tenureperiodin="' + ConnectionDataTable1[i]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ConnectionDataTable1[i]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-multitermsubs="' + ConnectionDataTable1[i]["MultiTermSubscription"] + '" data-tenuretype="' + ConnectionDataTable1[i]["TenureType"] + '" style="padding: 2px;background-color: #FFF;margin-bottom: 2px;margin-top: 2px;border-bottom: 1px solid #e4e2e2;">'
                                  + '<li style="color: #3e3e3e; padding: 5px;">'
                                    + '<div style="float: left; font-size: 18px; width: 46%;">' + PolicyName + ' <span class="PacksName"><span>(Recommended Pack - </span><span>Basic Pack)</span></span></div>'
                                    + '<div style="float: right; font-weight: 400; font-size: 18px; color: black; padding-right: 10px;">Rs.&nbsp;' + Rate + '</div>'
                                    + '<div style="clear: both;"></div>'
                                  + '</li>'
                                  + '<li style="color: #3e3e3e; padding: 5px;">'
                                        + '<div style="display: block" class="PreapaidSetting ProductTenure">'
                                            + '<div style="float: left; width: 100px;"  ' + MultiTenure + '>Product Term</div>'
                                            + '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">'
                                                + '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + ' field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)" />'
                                                + '<input type="text" name="quantity" value="1" class="qty" />'
                                                + '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />'
                                            + '</form>'
                                            + '<div style="float: left; font-size: 15px; margin-right: 6px;">'
                                              + '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + ',\'' + ConnectionDataTable1[i]["TenureType"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodIN"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodValue"] + '\',\'' + ConnectionDataTable1[i]["Channelcount"] + '\',\'' + StartDate + '\'); return false;"><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;'
                                            + '</div>'
                                       + '</div>'
                                       + '<div style="position: relative;">'
                                          + '<span style="float: right; margin-right: 15px; display: block;" id="Span1" class="PreapaidSetting">'
                                             + '<label class="switch Renew">'
                                               + '<input type="checkbox"  id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:EndDateCalculation(this); return false;" />'
                                               + '<div class="switch-slider round"></div>'
                                             + '</label>'
                                             + '<p class="RemoveTxt">Renew in<br />Next Cycle</p>'
                                          + '</span>'
                                       + '</div>'
                                       + '<div style="float: left; font-weight: 400; font-size: 15px; color: black; text-align: left; display: block;" class="PreapaidSetting">'
                                         + '<span style="color: red" class="ProductDateExp">Expiry Date -<span>' + ConnectionDataTable1[i]["EndDate"] + '</span></span>'
                                           + '<br />'
                                         + '<span class="ProductDateExp">Renew Up To -<span class="EndDate" id="EndDate' + index + '"></span></span>'
                                      + '</div>'
                                      + '<div style="clear: both;"></div>'
                               + '</li>'
                            + '</ul>';
                index++;
            }
            if (ConnectionDataTable1[i]["ProductType"] == "APkg" && ConnectionDataTable1[i]["IsbrodProduct"] == 0) {
                RecomondedArray += ConnectionDataTable1[i]["PolicyName"] + ',';
                var IsPackwithSubs = false;
                if (ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    BouqueIdsList += PolID + ",";
                    BouqueNameList += PolicyName + ",";
                    // IsPackwithSubs = "checked = true";
                    IsPackwithSubs = "";
                }
                else
                    IsPackwithSubs = "";

                RenewHTML += '<ul class="PackageDetailMainss" data-productname="' + PolicyName + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-custID="' + CustomerId + '" data-polid="' + ConnectionDataTable1[i]["PrePolID"] + '" data-producttype=2 data-bouquetid="' + ConnectionDataTable1[i]["ProductID"] + '" data-mainbouquet="' + PolicyName + '" data-channelscount="' + ConnectionDataTable1[i]["Channelcount"] + '"  data-mainrate="' + Rate + '" data-tabtype=1 data-isapply="' + ConnectionDataTable1[i]["IsPckwithSubs"] + '" data-tenureperiodin="' + ConnectionDataTable1[i]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ConnectionDataTable1[i]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-multitermsubs="' + ConnectionDataTable1[i]["MultiTermSubscription"] + '" data-tenuretype="' + ConnectionDataTable1[i]["TenureType"] + '" style="padding: 2px;background-color: #FFF;margin-bottom: 2px;margin-top: 2px;border-bottom: 1px solid #e4e2e2;">  <span style="float: right;" class="SelectMainBroad"> </span>'
                                   + '<li style="color: #3e3e3e; padding: 5px;">'
                                   + '<div style="float: left; font-size: 18px; width: 46%;">' + PolicyName + ' <span class="PacksName"><span>(Recommended Pack - </span><span>Add-on)</span></span></div>'
                                   + '<div style="float: right; font-weight: 400; font-size: 18px; color: black; padding-right: 10px;">Rs.&nbsp;' + Rate + '</div>'
                                   + '<div style="clear: both;"></div>'
                                 + '</li>'
                                 + '<li style="color: #3e3e3e; padding: 5px;">'
                                       + '<div style="display: block" class="PreapaidSetting ProductTenure">'
                                           + '<div style="float: left; width: 100px;"  ' + MultiTenure + '>Product Term</div>'
                                           + '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">'
                                               + '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + ' field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)" />'
                                               + '<input type="text" name="quantity" value="1" class="qty" />'
                                               + '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />'
                                           + '</form>'
                                           + '<div style="float: left; font-size: 15px; margin-right: 6px;">'
                                             + '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + ',\'' + ConnectionDataTable1[i]["TenureType"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodIN"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodValue"] + '\',\'' + ConnectionDataTable1[i]["Channelcount"] + '\',\'' + StartDate + '\'); return false;"><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;'
                                           + '</div>'
                                      + '</div>'
                                      + '<div style="position: relative;">'
                                         + '<span style="float: right; margin-right: 15px; display: block;" id="ChangeBouquet" class="PreapaidSetting">'
                                            + '<label class="switch Renew">'
                                              + '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:EndDateCalculation(this); return false;" />'
                                              + '<div class="switch-slider round"></div>'
                                            + '</label>'
                                            + '<p class="RemoveTxt">Renew in<br />Next Cycle</p>'
                                         + '</span>'
                                      + '</div>'
                                      + '<div style="float: left; font-weight: 400; font-size: 15px; color: black; text-align: left; display: block;" class="PreapaidSetting">'
                                        + '<span style="color: red" class="ProductDateExp">Expiry Date -<span>' + ConnectionDataTable1[i]["EndDate"] + '</span></span>'
                                          + '<br />'
                                        + '<span class="ProductDateExp">Renew Up To -<span class="EndDate" id="EndDate' + index + '"></span></span>'
                                     + '</div>'
                                     + '<div style="clear: both;"></div>'
                              + '</li>'
                           + '</ul>';
                index++;

            }

            if (ConnectionDataTable1[i]["IsbrodProduct"] == 1) {
                if (ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    BroadCastIdsList += ConnectionDataTable1[i]["PrePolID"] + ",";
                    BouqueBroadName += PolicyName + ",";
                    IsPackwithSubs = "";
                }
                else
                    IsPackwithSubs = "";

                BroadCastArray += ConnectionDataTable1[i]["PolicyName"] + ",";



                RenewHTML += '<ul data-productname="' + PolicyName + '" data-packagetype="' + PackagetypeType + '" data-conectionid="' + ConnectionId + '" data-custID="' + CustomerId + '"' +
                                      'data-channelscount="' + ConnectionDataTable1[i]["Channelcount"] + '" data-polid="' + ConnectionDataTable1[i]["PrePolID"] + '" data-productType=2 ' +
                                      'data-bouquetid="' + ConnectionDataTable1[i]["ProductID"] + '" data-mainbouquet="' + PolicyName + '"  data-mainrate="' + Rate + '" data-isapply="' + ConnectionDataTable1[i]["IsPckwithSubs"] + '"  data-tenureperiodin="' + ConnectionDataTable1[i]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ConnectionDataTable1[i]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-multitermsubs="' + ConnectionDataTable1[i]["MultiTermSubscription"] + '" data-tenuretype="' + ConnectionDataTable1[i]["TenureType"] + '" ' +
                                      'data-tabtype=2  style="padding: 2px;background-color: #FFF; margin-bottom: 2px; margin-top: 2px; border-bottom: 1px solid #e4e2e2; border-left: 1px solid #e4e2e2;border-right: 1px solid #e4e2e2;">'
                           + '<li style="color: #3e3e3e; padding: 5px;">'
                                      + '<div style="float: left; font-size: 18px; width: 46%;">' + PolicyName + ' <span class="PacksName"><span>(Broadcaster Pack)</span></span></div>'
                                      + '<div style="float: right; font-weight: 400; font-size: 18px; color: black; padding-right: 10px;">Rs.&nbsp;' + Rate + '</div>'
                                      + '<div style="clear: both;"></div>'
                                    + '</li>'
                                    + '<li style="color: #3e3e3e; padding: 5px;">'
                                          + '<div style="display: block" class="PreapaidSetting ProductTenure">'
                                              + '<div style="float: left; width: 100px;"  ' + MultiTenure + '>Product Term</div>'
                                              + '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">'
                                                  + '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + ' field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)" />'
                                                  + '<input type="text" name="quantity" value="1" class="qty" />'
                                                  + '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />'
                                              + '</form>'
                                              + '<div style="float: left; font-size: 15px; margin-right: 6px;">'
                                                + '<a href="javascript:void(0);" title="Info" onclick="javascript:GetMainAddonChannelList(this,' + ConnectionDataTable1[i]["ProductID"] + ',\'' + ConnectionDataTable1[i]["TenureType"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodIN"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodValue"] + '\',\'' + ConnectionDataTable1[i]["Channelcount"] + '\',\'' + StartDate + '\'); return false;"><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;'
                                              + '</div>'
                                         + '</div>'
                                         + '<div style="position: relative;">'
                                            + '<span style="float: right; margin-right: 15px; display: block;" id="ChangeBouquet" class="PreapaidSetting">'
                                               + '<label class="switch Renew">'
                                                 + '<input type="checkbox" id="check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:EndDateCalculation(this); return false;" />'
                                                 + '<div class="switch-slider round"></div>'
                                               + '</label>'
                                               + '<p class="RemoveTxt">Renew in<br />Next Cycle</p>'
                                            + '</span>'
                                         + '</div>'
                                         + '<div style="float: left; font-weight: 400; font-size: 15px; color: black; text-align: left; display: block;" class="PreapaidSetting">'
                                           + '<span style="color: red" class="ProductDateExp">Expiry Date -<span>' + ConnectionDataTable1[i]["EndDate"] + '</span></span>'
                                             + '<br />'
                                           + '<span class="ProductDateExp">Renew Up To -<span class="EndDate" id="EndDate' + index + '"></span></span>'
                                        + '</div>'
                                        + '<div style="clear: both;"></div>'
                                 + '</li>'
                              + '</ul>';
                index++;
            }
            if (ConnectionDataTable1[i]["ProductType"] == "Ala") {
                ChannelName += ConnectionDataTable1[i]["PolicyName"] + ',';
                var PrePolID = RChannel = RChannelID = "";
                var IsPackwithSubs = false;
                if (ConnectionDataTable1[i]["IsPckwithSubs"] == "1") {
                    ChannelIdsList += ConnectionDataTable1[i]["PrePolID"] + ",";
                    //IsPackwithSubs = "checked = true";
                    IsPackwithSubs = "";
                }
                else
                    IsPackwithSubs = "";
                RenewHTML += '<ul data-productname="' + PolicyName + '" data-conectionid="' + ConnectionId + '" data-channelscount="' + ConnectionDataTable1[i]["Channelcount"] + '" data-custID="' + CustomerId + '" data-productType=1 data-bouquetid="' + ConnectionDataTable1[i]["ProductID"] + '" data-mainbouquet="' + PolicyName + '"  data-mainrate="' + Rate + '" data-IsApply="' + ConnectionDataTable1[i]["IsPckwithSubs"] + '" data-tenureperiodin="' + ConnectionDataTable1[i]["TenurePeriodIN"] + '" data-tenureperiodvalue="' + ConnectionDataTable1[i]["TenurePeriodValue"] + '" data-startdate="' + StartDate + '" data-polid="' + ConnectionDataTable1[i]["PrePolID"] + '" data-multitermsubs="' + ConnectionDataTable1[i]["MultiTermSubscription"] + '" data-tenuretype="' + ConnectionDataTable1[i]["TenureType"] + '" data-tabtype=3 ' +
                           'style="padding: 2px;background-color: #FFF; margin-bottom: 2px; margin-top: 2px; border-bottom: 1px solid #e4e2e2; border-left: 1px solid #e4e2e2;border-right: 1px solid #e4e2e2;">'
                           + '<li style="color: #3e3e3e; padding: 5px;">'
                                     + '<div style="float: left; font-size: 18px; width: 46%;">' + PolicyName + ' <span class="PacksName"><span>(à la carte)</span></span></div>'
                                     + '<div style="float: right; font-weight: 400; font-size: 18px; color: black; padding-right: 10px;">Rs.&nbsp;' + Rate + '</div>'
                                     + '<div style="clear: both;"></div>'
                                   + '</li>'
                                   + '<li style="color: #3e3e3e; padding: 5px;">'
                                         + '<div style="display: block" class="PreapaidSetting ProductTenure">'
                                             + '<div style="float: left; width: 100px;" ' + MultiTenure + '>Product Term</div>'
                                             + '<form id="myform" ' + MultiTermSubscription + ' method="POST" action="#">'
                                                 + '<input type="button" value="-" class="qtyminus LessBtn" ' + MultiSubsMinus + ' field="quantity" id="qtyminus' + index + '" onclick="TenureAddLess(this)" />'
                                                 + '<input type="text" name="quantity" value="1" class="qty" />'
                                                 + '<input type="button" value="+" class="qtyplus AddBtn" ' + MultiSubsAdd + ' field="quantity" id="qtyplus' + index + '" onclick="TenureAddLess(this)" />'
                                             + '</form>'
                                             + '<div style="float: left; font-size: 15px; margin-right: 6px;">'
                                               + '<a href="javascript:void(0);" title="Info" onclick="javascript:ChannelDeatils(\'' + ConnectionDataTable1[i]["TenureType"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodIN"] + '\',\'' + ConnectionDataTable1[i]["TenurePeriodValue"] + '\',\'' + StartDate + '\',\'' + ConnectionDataTable1[i]["EndDate"] + '\'); return false;" ><i class="mdi-action-info-outline"></i>&nbsp;View Details</a>&nbsp;&nbsp;'
                                             + '</div>'
                                        + '</div>'
                                        + '<div style="position: relative;">'
                                           + '<span style="float: right; margin-right: 15px; display: block;" class="PreapaidSetting">'
                                              + '<label class="switch Renew">'
                                                + '<input type="checkbox" id="Check' + index + '" ' + IsPackwithSubs + ' onchange="javascript:EndDateCalculation(this); return false;"/>'
                                                + '<div class="switch-slider round"></div>'
                                              + '</label>'
                                              + '<p class="RemoveTxt">Renew in<br />Next Cycle</p>'
                                           + '</span>'
                                        + '</div>'
                                        + '<div style="float: left; font-weight: 400; font-size: 15px; color: black; text-align: left; display: block;" class="PreapaidSetting">'
                                          + '<span style="color: red" class="ProductDateExp">Expiry Date -<span>' + ConnectionDataTable1[i]["EndDate"] + '</span></span>'
                                            + '<br />'
                                          + '<span class="ProductDateExp">Renew Up To -<span class="EndDate" id="EndDate' + index + '"></span></span>'
                                       + '</div>'
                                       + '<div style="clear: both;"></div>'
                                + '</li>'
                             + '</ul>';
                index++;
                //CurrCSChannelBColor();
            }

        }

        AllBuquename = RecomondedArray;
        $("#RenwProdusDetails").html("");
        if (RenewHTML != "")
            $("#RenwProdusDetails").append(RenewHTML);

        $('#Loadingbg').css("display", 'none');

        $("#breadcrumbs-wrapper1").css("display", "block");
        $("#MangePacks").css("display", "block");
        $("#RenewConnectionTotal").css("display", "block");
        var DefaultApply = true;

        $("#RenwProdusDetails ul").find('.Renew input[type="checkbox"]').each(function () {
            if ($(this).prop("checked") == true && $(this).closest("ul").data("isapply") == 1) {
                DefaultApply = false;
            }
            //else if ($(this).prop("checked") == false && $(this).closest("ul").data("isapply") == 1) {
            //    DefaultApply = false;
            //}

        });

        if (DefaultApply == true) {
            $("#ConnectionChanges").closest('div').addClass("disabled");
            $("#ConnectionChanges").css('background', '#ccc');
        }
        else {
            $("#ConnectionChanges").closest('div').removeClass("disabled");
            $("#ConnectionChanges").css('background', '#0099fd');
        }
        //MainBouquetChange("all");
    }
    else {
        MsgBox("E", "Something went wrong, please try again later!");
    }
    $('#ConnectionDetails').text('');
    $('#ConnectionDetails').text($('#ConnectionDetails').text() + '(' + localStorage.getItem("ConnectionDetailName") + ')');

}

function OnFailRenewProduct(result) {
    MsgBox("E", "Something went wrong, please try again later!");
}

function CurrCSChannelBColor(ctrl) {
    if (ctrl != undefined) {
        var CheckStatus = $(ctrl).find('input[type="checkbox"]').prop("checked");
        if (CheckStatus == false) {
            $(ctrl).find('input[type="checkbox"]').prop("checked", true);
            MainBouquetChange(ctrl);
        }
        else {
            $(ctrl).find('input[type="checkbox"]').prop("checked", false);
            MainBouquetChange(ctrl);
        }

        if ($(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {

            if ($(ctrl).context.tagName != "UL")
                $(ctrl).closest(".collapsible-body").closest("li").find(".collapsible-header").find(".SelectMain").html("");
            else
                $(ctrl).closest('li').find('.SelectMain').html("");

        }
        else {

            if ($(ctrl).context.tagName != "UL")
                $(ctrl).closest(".collapsible-body").closest("li").find(".collapsible-header").find(".SelectMain").html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
            else
                $(ctrl).closest('li').find('.SelectMain').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');

        }
    }
    //else {
    //    $("ul").find("data-producttype=1").find('input[type="checkbox"]:checked').each(function () {

    //        var CheckStatus = $(this).find('input[type="checkbox"]').prop("checked");
    //        if (CheckStatus == false) {
    //            $(this).find('input[type="checkbox"]').prop("checked", true);
    //            $(this).css("box-shadow", "rgb(224, 224, 224) 0px 1px 5px 1px");

    //            MainBouquetChange(ctrl);
    //        }
    //        else {
    //            $(this).find('input[type="checkbox"]').prop("checked", false);
    //            $(this).css("box-shadow", "0px 1px 5px 1px rgb(255, 255, 255)");

    //            MainBouquetChange(ctrl);
    //        }

    //        if ($(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length <= 0) {
    //            $(ctrl).closest('li').find('.SelectMain').html("");
    //        }
    //        else {
    //            $(ctrl).closest('li').find('.SelectMain').html('<span style="color:#028a00;margin-right: 2px;">Selected - ' + $(ctrl).closest('.collapsible-body').find('input[type="checkbox"]:checked').length + '</span>');
    //        }


    //    });
    //}
}

function MainBouquetChange(ctrl) {

    NCFData = [];
    if (ctrl == "all" || $(ctrl).closest('ul').data('tabtype') == 1) {
        $("#RecommendedPack").html("");
        $("#FinalRecommendedPackPre").html("");

        if ($("#RecommendedPack").html("")) {
            $('#RecPackMain').hide();
        }

        $("#RenwProdusDetails").find('ul[data-tabtype=1]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
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
                var EndDate = $(this).closest("ul").find(".EndDate").text();
                var CheckboxId = $(this).attr('id');

                var ProductID = $(this).closest("ul").data("bouquetid").toString();
                var PolID = $(this).closest("ul").data("polid");
                var TenureNo = $(this).closest('div').find('#myform').find(".qty").val();
                if (tabtype == 1) {
                    if ($(this).prop("checked") == true) {
                        var green = ($(this).closest("ul").data("isapply") == 0) ? " style='color: green;'" : "";

                        $("#RecommendedPack").append('<div class="ProductDetailMain"><h5 ' + green + '>' + ProductName + '</h5><h6 ' + green + '>Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span> <span style="color: red; margin-left: 10px; cursor: pointer;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><h4 ' + green + '>Channels : ' + ChannelCounts + '</h4></div>');
                        // if ($(this).closest("ul").data("isapply") == 0) {
                        $("#FinalRecommendedPackPre").append('<div class="ProductDetailMain" data-productid=' + ProductID + ' data-polid=' + PolID + '><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                         '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                         '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                         '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                         '</div>');

                        // }

                    }
                    if ($(this).prop("checked") == false) {
                        //if (localStorage.getItem("IsReversal").toLocaleString() == 'true' && $(this).closest("ul").data("isapply") == 1) {

                        //    $("#RecommendedPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4></div>');
                        //    $("#FinalRecommendedPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                        //       '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                        //        '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                        //        '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Reversal for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                        //      '</div>');
                        //}
                        //else {
                        //    $("#RecommendedPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4></div>');
                        //    $("#FinalRecommendedPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                        //    '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                        //    '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                        //    '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                        //    '</div>');
                        //}
                    }
                }
            }
        });
    }

    if (ctrl == "all" || $(ctrl).closest('ul').data('tabtype') == 2) {
        $("#BrodcastPack").html("");
        if ($("#BrodcastPack").html("")) {
            $('#BroadMain').hide();
        }
        $("#FinalBrodcastPackPre").html("");
        $("#RenwProdusDetails").find('ul[data-tabtype=2]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
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
                        //if ($(this).closest("ul").data("isapply") == 0) {
                        $("#FinalBrodcastPackPre").append('<div class="ProductDetailMain" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                            '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');">' +
                            '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                            '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                            '</div>');
                        //}

                    }
                    if ($(this).prop("checked") == false) {
                        //if (localStorage.getItem("IsReversal").toLocaleString() == 'true' && $(this).closest("ul").data("isapply") == 1) {
                        //    $("#BrodcastPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4><div>');
                        //    $("#FinalBrodcastPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="RecommendRate">-' + ProductRate + '</span>' +
                        //        '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;";  onclick="javascript:DeleteRecomPack(' + CheckboxId + ',\'' + packagetype + '\')">' +
                        //        '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                        //        '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Reversal for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                        //    '</div>');
                        //}
                        //else {
                        //    $("#BrodcastPack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6><h4 class="">Channels : ' + ChannelCounts + '</h4><div>');
                        //    $("#FinalBrodcastPackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + '  data-polid=' + PolID + '><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="BrodcastRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                        //        '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; onclick="javascript:DeleteBroadPack(' + CheckboxId + ',\'' + packagetype + '\');">' +
                        //        '<i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                        //        '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                        //        '</div>');
                        //}

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

        })


    }
    if (ctrl == "all" || $(ctrl).closest('ul').data('tabtype') == 3) {
        $("#AlaCartePack").html("");
        if ($("#AlaCartePack").html("")) {
            $('#Alamain').hide();
        }
        $("#FinalAlaCartePackPre").html("")
        $("#RenwProdusDetails").find('ul[data-tabtype=3]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
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

                        //if ($(this).closest("ul").data("isapply") == 0) {
                        $("#FinalAlaCartePackPre").append('<div class="ProductDetailMain" data-productid="' + $(this).closest("ul").data("bouquetid").toString() + '"  data-polid="' + PolID + '" data-checkid="' + CheckboxId + '"><h5>' + ProductName + '</h5><h6>Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>' + ProductRate + '</span>' +
                               '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                               '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                               '</div>');
                        //}
                    }
                    if ($(this).prop("checked") == false) {
                        //if (localStorage.getItem("IsReversal").toLocaleString() == 'true' && $(this).closest("ul").data("isapply") == 1) {
                        //    var IsThisDuplicate = "";

                        //    $("#AlaCartePack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6></div>');
                        //    $("#FinalAlaCartePackPre").append('<div class="ProductDetailMain textred" data-productid="' + ProductID + '" data-checkid="' + CheckboxId + '"  data-polid="' + PolID + '" data-duplicate="' + IsThisDuplicate + '"><h5 class="removePrepaidPack">' + ProductName + '  ' + IsThisDuplicate + ' </h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                        //        '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                        //        '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Reversal for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                        //    '</div>');

                        //}
                        //else {
                        //    var IsThisDuplicate = "";

                        //    $("#AlaCartePack").append('<div class="ProductDetailMain textred"><h5 class="removePrepaidPack">' + ProductName + '</h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span></h6></div>');

                        //    if ($("#FinalAlaCartePackPre").find("div[data-productid=" + $(this).closest("ul").data("bouquetid").toString() + "]").length == 0) {
                        //        $("#FinalAlaCartePackPre").append('<div class="ProductDetailMain textred" data-productid=' + ProductID + ' data-polid="' + PolID + '" data-checkid="' + CheckboxId + '" data-duplicate="' + IsThisDuplicate + '"><h5 class="removePrepaidPack">' + ProductName + ' ' + IsThisDuplicate + '</h5><h6 class="">Rs.&nbsp; <span class="AlaCarteRate" data-isapply=' + $(this).closest("ul").data("isapply") + '>-' + ProductRate + '</span>' +
                        //            '<span style="color: red; margin-left: 10px; cursor: pointer;display: none;"; class="del" onclick="javascript:DeleteAlaCartPack(' + CheckboxId + ');"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6><div>' +
                        //            '<div style="float: left;padding-left: 10px;font-size: 14px;"><p style="display: inline-block;font-size: 14px;">Subscription for the period (' + StartDate + ' to ' + EndDate + ')</p></div>' +
                        //            '</div>');

                        //    }
                        //}
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

        });

    }

    var DefaultApply = true;
    var Class = (localStorage.getItem("IsPrepaid") == 'false') ? "PostpaidSetting" : "PreapaidSetting";
    $("#RenwProdusDetails ul").find('.Renew input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true && $(this).closest("ul").data("isapply") == 1) {
            DefaultApply = false;
        }
        //else if ($(this).prop("checked") == false && $(this).closest("ul").data("isapply") == 1) {
        //    DefaultApply = false;
        //}

    });

    if (DefaultApply == true) {
        $("#ConnectionChanges").closest('div').addClass("disabled");
        $("#ConnectionChanges").css('background', '#ccc');
    }
    else {
        $("#ConnectionChanges").closest('div').removeClass("disabled");
        $("#ConnectionChanges").css('background', '#0099fd');
    }

}
function DeleteRecomPack(ctrl, ProductType) {
    $(ctrl).prop("checked", false);
    MainBouquetChange(ctrl);
}
function DeleteBroadPack(ctrl, ProductType) {
    $(ctrl).prop("checked", false);
    MainBouquetChange(ctrl);
}
function DeleteAlaCartPack(ctrl) {
    $(ctrl).prop("checked", false);
    CurrCSChannelBColor(ctrl)
}


var PrepaidDiv = "";
function GetMainAddonChannelList(ctrl, id, TenureType, TenurePeriodIn, TenurePeriodValue, ChannelCount, StartDate) {
    var BouquetID = "";
    var PolicyID = "";
    var SendCriteria = "";
    var EndDate = $(ctrl).closest('li').find('.EndDate').text();
    var CurrentSubs = 0;//DateDiffInDay(StartDate, EndDate) + 1;
    PrepaidDiv = '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">Default Subscription</p> :&nbsp;&nbsp; <span>' + TenurePeriodValue + ' ' + TenurePeriodIn + '</span></div>' +
    '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">Current Subscription</p> :&nbsp;&nbsp; <span>' + CurrentSubs + ' ' + 'Days</span></div>' +
    '<div style="padding:7px 10px 1px 10px;" class="PreapaidSetting"><p class="SubscriptionDetail">No. of Channels</p> :&nbsp;&nbsp; <span>' + ChannelCount + '</span></div>';

    $('.preloader-wrapper').fadeIn("slow");
    SendCriteria = id;

    PushData('OPID', OperatorId);
    PushData('Criteria', SendCriteria);

    CallPublicAPI('MyConnections.aspx/GetMainAddonChannelList', '', OnPassChannelList, OnFailChannelList);
}
function OnPassChannelList(result) {

    var MyChannelListDataTable = result.d == "" ? null : JSON.parse(result.d);

    if (MyChannelListDataTable["Status"] == "Success") {
        // $('body').css('overflow', 'hidden');
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
                $(".PreapaidSetting").css('display', 'block');
                $("#ChannelaHeading").html("More Details");
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

function TenureAddLess(value) {
    Id = '#' + value["id"];
    //var button = Id;
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

    if (newVal <= 12) {
        $(Id).parent().find("input.qty").val(newVal);
    }


    //var tenureperiodvalue = $(Id).closest('ul').data('tenureperiodvalue');
    //Id = Id.indexOf("minus") > 0 ? Id = Id.substr(9) : Id = Id.substr(8);//GetID
    var Renewcheckid = $(Id).closest('ul').find('.Renew').find('input[type="checkbox"]').prop('id');
    if ($("#" + Renewcheckid + "").prop("checked") == true)
        EndDateCalculation($("#" + Renewcheckid + ""));
    //EndDateCalculation(producttype, newVal, PolID, ProductID, tenureperiodin, Id);
}
function EndDateCalculation(Id) {
    try {
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
            PushData('Action', "1");
            PushData('bIsDay', tenureperiodin == "Days" ? true : false);
            PushData('Id', $(Id).prop('id'));
            CallPublicAPI('RenewConnection.aspx/EndDateCalculation', '', OnPassEndDate, OnFailEndDate, true);
        }
        else {
            $(Id).closest('li').find('.EndDate').text("");
            MainBouquetChange(Id);
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
            $("#" + res[1] + "").closest('li').find('.EndDate').text(EndDate);
            if ($("#" + res[1] + "").closest('ul').data('producttype') != "1")
                MainBouquetChange($("#" + res[1] + ""));
            else
                CurrCSChannelBColor($("#" + res[1] + ""));
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
function ChannelDeatils(TenureType, TenurePeriodIn, TenurePeriodValue, StartDate, EndDate) {
    $('body').css('overflow', 'hidden');
    var ChannelUlOpen = ChannelUlClose = ChannelLi = ChannelLiClose = ChannelMainHtml = "";
    var currentsubs = DateDiffInDay(StartDate, EndDate);
    ChannelUlOpen = '<div class="col s12 m8 l9" style="text-align: right;padding-bottom: 11px;background: rgba(255,216,68,1);background: -moz-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,216,68,1)), color-stop(100%, rgba(212,158,36,1)));background: -webkit-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -o-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: -ms-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);background: linear-gradient(to right, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%);padding-top: 7px;"><span class="ChannelaHeading" id ="ChannelaHeading">More Details </span><a href="javascript:CloseDiv();" title="Close" style="padding: 15px; opacity: 1; background: #d6a125; color: white;">' +
                        '<i class="mdi-navigation-close modal-close" style="font-size: 20px;"></i></a></div>' +
                        '<div class="col s12 m8 l9 mdl-card mdl-shadow--16dp AllChannels" id="AllChannelList" style="min-height: 141px;">' +
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



function GetNewConnectionDetail(callby) {

    $("#ApplyNowBtn").show();
    $(".FinalPrepaid").show();

    var bouquetlid = channelid = "";
    $("#RenwProdusDetails").find('ul[data-tabtype=1]').find('.PreapaidSetting input[type="checkbox"]:checked').each(function () {
        if ($(this).prop("checked") == true) {
            bouquetlid += $(this).closest("ul").data("bouquetid").toString() + ",";
        }
    });
    $("#RenwProdusDetails").find('ul[data-tabtype=2]').find('.PreapaidSetting input[type="checkbox"]:checked').each(function () {
        if ($(this).prop("checked") == true) {
            bouquetlid += $(this).closest("ul").data("bouquetid").toString() + ",";
        }
    });
    $("#RenwProdusDetails").find('ul[data-tabtype=3]').find('.PreapaidSetting input[type="checkbox"]:checked').each(function () {
        if ($(this).prop("checked") == true) {
            channelid += $(this).closest("ul").data("bouquetid").toString() + ",";
        }
    });
    $('#Loadingbg').css('display', 'block');
    PushData('OPID', OperatorId);
    PushData('BouquetID', bouquetlid);
    PushData('ChannelID', channelid);

    CallPublicAPI('../RenewConnection.aspx/GetNewConnectionDetails', '', OnPassNewConnectionDetails, OnFailNewConnectionDetails);
}

function OnPassNewConnectionDetails(result) {
    var res = result.d.split("|");
    $('#Loadingbg').css('display', 'none');
    if (res[0] == "S") {
        var Data = JSON.parse(res[1]);

        if ($("#FinalRecommendedPackPre").html() == "" && IsOnload == false) {
            $('#RecPackMainPrePaid').hide();
        }
        if ($("#FinalBrodcastPackPre").html() == "" && IsOnload == false) {
            $('#BroadMainPrePaid').hide();
        }
        if ($("#FinalAlaCartePackPre").html() == "" && IsOnload == false) {
            $('#AlamainPrePaid').hide();
        }
        $('body').css('overflow', 'block');
        $('#materialize-lean-overlay-1').show();
        CalcuateProduct();

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
function CalcuateProduct() {


    var ConnID, ProductID, ProductType, PolID, TenureNo;
    var Revers = [];
    var BqArray = BouqueIdsList.split(",");
    var BroadArray = BroadCastIdsList.split(",");
    var ChannelArray = ChannelIdsList.split(",");
    CalculateProduct = [];
    $("#RenwProdusDetails").find('ul[data-tabtype=1]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                CreateCalculateData(this, 'true');
            }
        }
        //else if ($(this).prop("checked") == false) {
        //    if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
        //        CreateCalculateData(this, 'false');
        //    }

        //}
    });
    $("#RenwProdusDetails").find('ul[data-tabtype=2]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
                CreateCalculateData(this, 'true');
            }
        }
        //else if ($(this).prop("checked") == false) {
        //    if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {

        //        CreateCalculateData(this, 'false');
        //    }

        //}
    });
    $("#RenwProdusDetails").find('ul[data-tabtype=3]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0)
                CreateCalculateData(this, 'true');
        }
        //else if ($(this).prop("checked") == false) {
        //    if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
        //        CreateCalculateData(this, 'false');
        //    }
        //}
    });
    if (CalculateProduct.length > 0) {
        PushData('OPID', OperatorId);

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

        CallPublicAPI('RenewConnection.aspx/CalwithValidateMethod', '', OnPassCalculation, OnFailCalculation);
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
                $('body').css('overflow', 'hidden');
                confirmAction = function () {
                    $('body').css('overflow', 'auto');
                }
                MsgBox('E', "Something went wrong, please contact with your Provider with ErrorCode : '" + ErrorCode + "' !");
                $('#materialize-lean-overlay-1').hide();
            }
            else {

                if (Data["Description"] != "No Records Found !!!") {
                    ReverseNCFDataResult = Data["Description"]["Table1"];//NCF Table
                    ReversdataResult = Data["Description"]["Table2"];//Reversal Table       

                    NCFChannelCount = parseInt(Data["Description"]["Table"][0]["NCF_ChannelCount"]);
                    if (NCFChannelCount < 0)
                        NCFChannelCount = 0;
                }
                if (ReverseNCFDataResult.length > 0) {
                    for (var i = 0; i < ReverseNCFDataResult.length ; i++) {

                        if (ReverseNCFDataResult[i]["ProductType"] != 16)
                            ProductCount++;


                        ProductSubTotal += parseFloat(ReverseNCFDataResult[i]["DrpRate"]);
                        TaxOnProduct += parseFloat(ReverseNCFDataResult[i]["SubsDRPTax"]);
                        TotalNCFReverse += parseFloat(ReverseNCFDataResult[i]["SubsNCFAmount"]);
                        TotalNCFTaxReverse += parseFloat(ReverseNCFDataResult[i]["SubsNCFTax"]);

                        if (ReverseNCFDataResult[i]["ProductId"] != -16 && ReverseNCFDataResult[i]["ProductType"] != 16) {
                            if (ReverseNCFDataResult[i]["ProductType"].toString() == "2") {
                                $("#FinalRecommendedPackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('h6 span').text(parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2));
                                $("#FinalBrodcastPackPre").find('div[data-polid=' + ReverseNCFDataResult[i]["PrePolID"] + ']').find('h6 span').text(parseFloat(ReverseNCFDataResult[i]["DrpRate"]).toFixed(2));
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



                $("#ProductSubTotalPre").html(ProductSubTotal.toFixed(2));
                $("#TaxPre").html(TaxOnProduct.toFixed(2));
                $(".ProductCount").html(" (" + ProductCount + ")");
                $(".Reversal").hide();


                $(".NetworkFeeCount").html("(Channel Count : " + NCFChannelCount + ")");
                $("#NetworkFeePre").html(TotalNCFReverse.toFixed(2));
                $("#NCFTaxPre").html(TotalNCFTaxReverse.toFixed(2));

                var GrandTotal = 0;
                GrandTotal = (ProductSubTotal + TaxOnProduct);

                GrandTotal = GrandTotal + TotalNCFReverse + TotalNCFTaxReverse
                GrandTotal = (GrandTotal - TotalProductRevers - TotalProductTaxRevers);

                $("#GradTotal").html(GrandTotal.toFixed(2));


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
                if ($("#FinalRecommendedPackPre").html() == "") {
                    $('#RecPackMainPrePaid').hide();
                }
                else {
                    $('#RecPackMainPrePaid').show();
                }

                if ($("#FinalBrodcastPackPre").html() == "") {
                    $('#BroadMainPrePaid').hide();
                }
                else {
                    $('#BroadMainPrePaid').show();
                }

                if ($("#FinalAlaCartePackPre").html() == "") {
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
function CreateCalculateData(id, IsAuth) {


    CalculateProduct.push({
        TransNo: 1,
        PrepaidPolID: $(id).closest("ul").data("polid").toString(),
        IsAuth: IsAuth,
        RenewMode: 1,
        IsExtend: true,//Use for Re-auth case
        NewTenureType: $(id).closest("ul").data("tenuretype") == "Fixed" ? 0 : 1,
        MultiTermSubscription: $(id).closest("ul").find("input.qty").val()
    });

}
function OnFailCalculation(result) {
    $('#Loadingbg').css('display', 'none');
}
function ConfirmandApply() {
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
function ApplyProduct() {
    $("#ApplyProduct").hide();
    $('#Loadingbg').css('display', 'block');
    var TimeStamp = localStorage.getItem("ModifyTimeStamp");
    var CustomerDetail = [];
    CustomerDetail.push({
        TransNo: 1,
        CustomerID: localStorage.getItem("CustId"),
        ConnID: localStorage["ConnectionId"],
        ModifyTimeStamp: TimeStamp
    })
    PushData('OPID', OperatorId);
    PushData('CustomerData', Stringify(CustomerDetail));
    PushData('ProductData', Stringify(CalculateProduct));
    PushData('IsAuth', "1");
    PushData('RenewMode', "1");
    PushData('IsExtend', "1");
    PushData('OrderSummary1', Stringify(OrderSummaryTable1));
    PushData('OrderSummary2', Stringify(OrderSummaryTable2));
    CallPublicAPI('RenewConnection.aspx/RenewProduct', '', OnPassRenew, OnFailRenew);

}
function OnPassRenew(result) {
    $('#Loadingbg').css('display', 'none');
    try {
        var Data = result.d == "" ? null : JSON.parse(result.d);
        if (Data != null) {
            var Msg = Data["Description"];
            if (Data["Status"] == "Fail") {

                $(".lean-overlay").hide();

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
            $('#materialize-lean-overlay-3').hide();
        }
        MsgBox('E', "Something went wrong, please try again later!");
    }
}
function OnFailRenew(result) {
    $('#Loadingbg').css('display', 'none');
}
function PrePaidSubscriptionProduct() {
    var BqArray = BouqueIdsList.split(",");
    var BroadArray = BroadCastIdsList.split(",");
    var ChannelArray = ChannelIdsList.split(",");
    var result = "";
    var Auth = [], DeAuth = [];
    $("#RenwProdusDetails").find('ul[data-tabtype=1]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
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
        //else if ($(this).prop("checked") == false) {
        //    if (BqArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
        //        DB += $(this).closest("ul").data("polid").toString() + ",";
        //        DeAuth.push({
        //            PolID: $(this).closest("ul").data("polid").toString(),
        //            IsChannel: 0,
        //            MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
        //        });
        //    }
        //}
    });
    $("#RenwProdusDetails").find('ul[data-tabtype=2]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
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
        //else if ($(this).prop("checked") == false) {
        //    if (BroadArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
        //        DB += $(this).closest("ul").data("polid").toString() + ",";
        //        DeAuth.push({
        //            PolID: $(this).closest("ul").data("polid").toString(),
        //            IsChannel: 0,
        //            MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
        //        });
        //    }

        //}
    });
    $("#RenwProdusDetails").find('ul[data-tabtype=3]').find('.PreapaidSetting input[type="checkbox"]').each(function () {
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
        //else if ($(this).prop("checked") == false) {
        //    if (ChannelArray.indexOf($(this).closest("ul").data("polid").toString()) >= 0) {
        //        DC += $(this).closest("ul").data("polid").toString() + ",";
        //        DeAuth.push({
        //            PolID: $(this).closest("ul").data("polid").toString(),
        //            IsChannel: 1,
        //            MultiTermSubscription: $(this).parent().parent().parent().find("input.qty").val() == undefined ? 1 : $(this).parent().parent().parent().find("input.qty").val()
        //        });
        //    }
        //}
    });

    result = Stringify(Auth) + "*" + Stringify(DeAuth);
    return result;
}

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
function CloseDiv() {
    $('#orrsDiag').remove();
    $('body').css('overflow', 'auto');
}
function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({ opacity: 0 });
    setTimeout(function () {
        dialog.remove();
    }, 400);
}
function GoBackMyConnection() {
    document.location.replace('../MyConnection');
}

function closepopup(ctrl) {
    $(ctrl).closest(".modal").css("display", "none");
    $("#materialize-lean-overlay-3").hide();
}
function AddMoney() {
    $("#ApplyProduct").hide();
    $('#materialize-lean-overlay-3').hide();
    var TimeStamp = localStorage.getItem("ModifyTimeStamp");
    var CustomerDetail = [];
    CustomerDetail.push({
        TransNo: 1,
        CustomerID: localStorage.getItem("CustId"),
        ConnID: localStorage["ConnectionId"],
        ModifyTimeStamp: TimeStamp
    })
    SubsProductDeatils = Stringify(CustomerDetail) + "|" + Stringify(CalculateProduct) + "|" + OperatorId;
    var OrderSummary = $("#ConnectionModelPrepaid").find('form').find('.row').html();
    localStorage.setItem("Amount", parseFloat($("#RemainingAmt").html()));
    PushData('SubscriptionProduct', SubsProductDeatils);
    PushData('OrderSummary1', Stringify(OrderSummaryTable1));
    PushData('OrderSummary2', Stringify(OrderSummaryTable2));
    CallPublicAPI('RenewConnection.aspx/redirectToAddMoney', '', OnPassredirectToAddMoney, OnFailredirectToAddMoney);
}
function OnPassredirectToAddMoney() {
    localStorage.setItem("CallFromSubscription", true);
    GetPayment();
}
function OnFailredirectToAddMoney(result) {
    $('#Loadingbg').css('display', 'none');
}
function GetshowhideChannelDetails(ctrl) {
    $("#orrsDiag .collapsible > li").removeClass("active");
    $("#orrsDiag .collapsible-header").removeClass("active");
    $("#orrsDiag .active").removeClass('active');
    $("#orrsDiag .collapsible-header").css("color", '#444444');
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
$(document).ready(function () {
    GetRenewProduct();
    LogInDataTable = JSON.parse(localStorage.getItem("LDT"))["Description"];
    LogInDataTable[0]["BalanceAmount"] = parseFloat(localStorage.getItem("MyWalletBalance"));
    $(".modal-close").click(function () {
        $("#ConnectionModel").hide();
        $(".lean-overlay").hide();
        $("#ConnectionModelPrepaid").hide();
        $('body').css('overflow', 'auto');
    });
})

$(window).load(function () {
    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Connection") {
            $(this).addClass("active");
        }
    });
});
