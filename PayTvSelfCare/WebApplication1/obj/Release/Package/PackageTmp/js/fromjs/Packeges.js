var OpratorID = "PayTv";

function Add_ContactPerson() {
    $(".modal_bg ").show();
    $(".ChannalsView").show();
    $('body').css('overflow', 'hidden');
}
function genreclick(e) {
    var a = $(e).closest('.item');
    var b = $(a).hasClass('open');
    var c = $(a).closest('.accordion').find('.open');

    if (b != true) {
        $(c).find('.contents').slideUp(200);
        $(c).removeClass('open');
    }

    $(a).toggleClass('open');
    $(a).find('.contents').slideToggle(200);
}

$(document).ready(function () {
    $('.accordion .item .heading').click(function () {
        var a = $(this).closest('.item');
        var b = $(a).hasClass('open');
        var c = $(a).closest('.accordion').find('.open');

        if (b != true) {
            $(c).find('.contents').slideUp(200);
            $(c).removeClass('open');
        }

        $(a).toggleClass('open');
        $(a).find('.contents').slideToggle(200);

    });
    PushData('OPID', OpratorID)
    CallPublicAPI('packages.aspx/Statelist', '', OnPassStateList, OnFailStateList);
    $("#SelectState").on('change', function () {
        $("#Loadingbg").show();
        PushData('StateId', $(this).val());
        PushData('OPID', OpratorID)
        CallPublicAPI('packages.aspx/GetCityList', '', OnPassGetCityList, OnFailGetCityList);
    });
    $("#Citylist").on('change', function () {
        $("#Loadingbg").show();
        PushData('CityId', $(this).val());
        PushData('OPID', OpratorID)
        CallPublicAPI('packages.aspx/getSubOperatorList', '', OnPassGetLCOlist, OnFailGetLCOlist);
    });
    $('.modal-toggle').on('click', function (e) {
        e.preventDefault();
        $('.modal').removeClass('is-hidden');
        $('.modal').addClass('is-visible');
        $('body').css('overflow-y', 'hidden');
        $(window).scrollTop(0);
    });

    $('.ModalClose').on('click', function (e) {
        e.preventDefault();
        $('.modal').removeClass('is-visible');
        $('.modal').addClass('is-hidden');
        $('body').css('overflow-y', 'auto');
        $(window).scrollTop(0);

    });


});

function OnPassStateList(result) {
    result = result.d;
    // var Statelist = Reliable.parse(JSON.parse(result.d.split('|')[0]));
    var Statelist = JSON.parse(result);
    var State = '<option value="-1"  disabled selected >Select Your State</option>';
    var City = '<option value="-1"  disabled selected >Select Your City</option>';
    var LCO = '<option value="-1"  disabled selected >Select Your LCO</option>';
    var Option = '';
    if (Statelist != "" && Statelist != null && Statelist != undefined) {
        for (var i = 0; i < Statelist.Description.length; i++) {
            Option += '<option value="' + Statelist.Description[i]["StateID"] + '">' + Statelist.Description[i]["State Name"] + '</option>';
        }

    }
    var StateData = State + Option;
    $('#SelectState').html("");
    $('#SelectState').html(StateData);
    //$('#SelectState').val(DS["TABLE4"][0]["STATEID"]);
    $('#Citylist').html("");
    $('#Citylist').html(City);
    $('#LCOlist').html("");
    $('#LCOlist').html(LCO);
    $('#Edit_SelectState').html("");
    $('#Edit_SelectState').html(StateData);
    $('#Edit_Citylist').html("");

    if (City > 0 && City !== '') {
        $('#Edit_Citylist').html(City);
    }

}
function OnFailStateList(result) {
}

function OnPassGetCityList(result) {
    result = result.d;
    var Citylist = JSON.parse(result);
    if (Citylist["Status"] == "Success") {
        var Option = '<option value="-1" disabled selected >Select Your City</option>';
        if (Citylist != "" && Citylist != null && Citylist != undefined) {
            for (var i = 0; i < Citylist.Description.length; i++) {
                Option += '<option value="' + Citylist.Description[i]["CityID"] + '">' + Citylist.Description[i]["City Name"] + '</option>';
            }
        }
        $('.state_loading').css('display', 'none');
        $('#Citylist').html("");
        $('#Citylist').html(Option);
        $("#Loadingbg").hide();
    }
    else {
        $('#Citylist').val(-1);
        $('.state_loading').css('display', 'none');
        $('#Loadingbg').hide();
    }
}

function OnFailGetCityList(result) {
    result = result.d;
    var CityF = JSON.parse(result);
    if (CityF["Status"] == "Fail") {
        MsgBox("E", "Unable to get Citys");
    }
}


function OnPassGetLCOlist(result) {
    result = result.d;
    var LCOlist = JSON.parse(result);
    if (LCOlist["Status"] == "Success") {
        var Option1 = '<option value="-1" disabled selected >Select Your LCO</option>';
        if (LCOlist != "" && LCOlist != null && LCOlist != undefined) {
            for (var i = 0; i < LCOlist.Description.length; i++) {
                Option1 += '<option value="' + LCOlist.Description[i]["AccID"] + '">' + LCOlist.Description[i]["AccDesc"] + '</option>';
            }
        }
        $('#LCOlist').html("");
        $('#LCOlist').html(Option1);
        $('#Loadingbg').hide();
    }
    else {
        $('#LCOlist').val(-1);
        $('#Loadingbg').hide();
    }
}

function OnFailGetLCOlist(result) {
    result = result.d;
    var LCOF = JSON.parse(result);
    if (LCOF["Status"] == "Fail") {
        MsgBox("E", "Unable to get LCOs");
    }
}

function GetpaksValidation() {
    var PacksVal = true;
    if ($("#SelectState").val() == null && $("#SelectState").val() == undefined) {
        $("#ErrorTxt").show();
        $('#ErrorTxt').html("Please select State !");
        $(".ErrorTxt").delay(5000).fadeOut();
        PacksVal = false;
    }
    //else if ($("#Citylist").val() == null && $("#Citylist").val() == undefined) {
    //    $("#ErrorTxt").show();
    //    $('#ErrorTxt').html("Please select City!");
    //    $(".ErrorTxt").delay(5000).fadeOut();
    //    PacksVal = false;
    //}
    return PacksVal;
}

function GetPacks2() {

    if ($('#Channals').html() !== "" && GetpaksValidation() == true) {
        OpratorId = "PayTv";
        // $('#Channals').html("");
        $("#Loadingbg").show();
        if ($("#SelectState").val() !== '' || $("#SelectState").val() !== 0 || $("#SelectState").val() !== null) {
            var LocationID = $("#SelectState").val();
            var Locationtype = 1;
        }
        if ($("#Citylist").val() !== null) {
            var LocationID = $("#Citylist").val();
            var Locationtype = 2;
        }
        var listType = 5;
        PushData('OPID', OpratorID)
        PushData('locationType', Locationtype);
        PushData('locationid', LocationID);
        PushData('listtype', listType)
        CallPublicAPI('packages.aspx/GetPackges', '', OnPassPakegesList, OnFailGetPakegesList);
    }
}


function GetPacks3() {

    if ($('#Addon').html() !== "" && GetpaksValidation() == true) {
        $('#Addon').html("");
        $("#Loadingbg").show();
        if ($("#SelectState").val() !== '' || $("#SelectState").val() !== 0 || $("#SelectState").val() !== null) {
            var LocationID = $("#SelectState").val();
            var Locationtype = 1;
        }
        if ($("#Citylist").val() !== null) {
            var LocationID = $("#Citylist").val();
            var Locationtype = 2;
        }
        var listType = 2;
        PushData('OPID', OpratorID)
        PushData('locationType', Locationtype);
        PushData('locationid', LocationID);
        PushData('listtype', listType)
        CallPublicAPI('packages.aspx/GetPackges', '', OnPassPakegesList, OnFailGetPakegesList);
    }
}

function GetPacks() {
    if (GetpaksValidation() == true) {
        $("#Loadingbg").show();
        if ($("#SelectState").val() !== '' || $("#SelectState").val() !== 0 || $("#SelectState").val() !== null) {
            var LocationID = $("#SelectState").val();
            var Locationtype = 1;
        }
        if ($("#Citylist").val() !== null) {
            var LocationID = $("#Citylist").val();
            var Locationtype = 2;
        }
        var listType = 1
        PushData('OPID', OpratorID)
        PushData('locationType', Locationtype);
        PushData('locationid', LocationID);
        PushData('listtype', listType);
        CallPublicAPI('packages.aspx/GetPackges', '', OnPassPakegesList, OnFailGetPakegesList);
    }
}

function OnPassPakegesList(result) {
    var ds;
    var ConnectionHtml;
    var DHD;
    //var Datach = null;
    result = result.d;
    ds = JSON.parse(result).Description;


    $('#Major').html("");
    var Channels = new Array();

    if (ds !== null) {
        for (var i = 0; i < ds.length; i++) {
            if (ds[i]['ProductType'] == 'Channel') {

                var data = $.grep(Channels, function (itm, p) {
                    return itm['Genre'] == ds[i]['Genre'];
                });

                //Imagepath = ds[0]['ImgPath'];

                //var imagename = ds[i]["ImgName"] == "" ? ds[i]["ChannelName"] : ds[i]["ImgName"];
                var ImgpathNew = 'images/imagenotavailable.png';
                if (ds[i]['ImgPath'] !== undefined && ds[i]['ImgPath'] != "" && ds[i]['ImgPath'] != null)
                    ImgpathNew = ds[i]['ImgPath'];

                if (data.length == 0) {
                    var ChannelHtml = new Array();
                    ChannelHtml.push(' <div class="channelsmain">' +
                                                '<span>' +
                                                    '<img src="' + ImgpathNew + '" alt="' + ds[i]['ProductName'] + '" style="height: 60px; width: 90px;" />' +
                                                    '<br />' +
                                                    '<span style="color: rgb(0, 0, 0); font-weight: 300; text-decoration: none; font-size: 15px;"><i class="fa fa-inr" aria-hidden="true"></i>&nbsp' + parseFloat(ds[i]['MSOMRP']).toFixed(2) + '</span>' +
                                                '</span>' +
                                                '<p>' +
                                                ds[i]['ProductName'] +
                                                '</p>' +
                                                '<div class="pack_select selected">Select</div>' +
                                            '</div>');
                    Channels.push({
                        'Genre': ds[i]['Genre'], 'Html': ChannelHtml
                    });
                }
                else {
                    var htmlArray = $.grep(Channels, function (itm, p) {
                        return itm['Genre'] == ds[i]['Genre'];
                    });
                    var ChannelHtml = new Array();
                    ChannelHtml = htmlArray[0].Html;



                    ChannelHtml.push(' <div class="channelsmain">' +
                                                '<span>' +
                                                    '<img src="' + ImgpathNew + '" alt="' + ds[i]['ProductName'] + '" style="height: 60px; width: 90px;" />' +
                                                    '<br />' +
                                                    '<span style="color: rgb(0, 0, 0); font-weight: 300; text-decoration: none; font-size: 15px;"><i class="fa fa-inr" aria-hidden="true"></i>&nbsp' + parseFloat(ds[i]['MSOMRP']).toFixed(2) + '</span>' +
                                                '</span>' +
                                                 '<p>' +
                                                ds[i]['ProductName'] +
                                                '</p>' +
                                                '<div class="pack_select selected">Select</div>' +
                                            '</div>');
                    Channels[ds[i]['Genre']] = ChannelHtml;
                }
                var jaiho = ''
                //parseFloat(PackageDataTable[j]["ChMSOMRP"]).toFixed(2);
            }
            if (ds[i]['ProductType'] == 'Major') {
                $('#Major').append('<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">' +
                        '<div class="card pricing mt--md shadow--long-light state">' +
                            '<div class="card__head">' +
                                '<h3 class="plan-name">' + ds[i]['ProductName'] + '</h3>' +
                                '<h3 class="plan-pricing numbers__figure--large color--kale"><i class="fa fa-inr" aria-hidden="true"></i> ' + parseFloat(ds[i]['MSOMRP']).toFixed(2) +
                                    '<input type="radio" checked="checked" name="radio" />' +
                                    '<span class="checkmark"></span>' +
                                '</h3>' +
                                '<p class="mb--0">' +
                                    '<span style="color: #212835;">Per Month</span><br />' +
                                    'Basic sales tracking for up to three users.' +
                                '</p>' +
                                '<div class="card__body">' +
                                    '<a class="button signup-link start-trial-button mt--sm modal-toggle">View Channels </a>' +
                                    '<a class="button signup-link start-trial-button mt--sm">Select Add on</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
            }
            if (ds[i]['ProductType'] == 'AddOn') {
                $('#Addon').append('<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">' +
                        '<div class="card pricing mt--md shadow--long-light state">' +
                            '<div class="card__head">' +
                                '<h3 class="plan-name">' + ds[i]['ProductName'] + '</h3>' +
                                '<h3 class="plan-pricing numbers__figure--large color--kale"><i class="fa fa-inr" aria-hidden="true"></i> ' + parseFloat(ds[i]['MSOMRP']).toFixed(2) +
                                    '<input type="radio" checked="checked" name="radio" />' +
                                    '<span class="checkmark"></span>' +
                                '</h3>' +
                                '<p class="mb--0">' +
                                    '<span style="color: #212835;">Per Month</span><br />' +
                                    'Basic sales tracking for up to three users.' +
                                '</p>' +
                                '<div class="card__body">' +
                                    '<a class="button signup-link start-trial-button mt--sm modal-toggle">View Channels </a>' +
                                    '<a class="button signup-link start-trial-button mt--sm">Select Add on</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
            }

        }
        if (Channels.length > 0) {
            $('#ChannalsAcc').html('');
            for (var j = 0; j < Channels.length; j++) {

                var ChannelFinal = '';
                for (var k = 0; k < Channels[j]['Html'].length; k++) {

                    ChannelFinal = ChannelFinal + Channels[j]['Html'][k];
                }

                var GenerHtml = $('  <div class="item">' +
                                     ' <div class="heading" onclick="genreclick(this)">' + Channels[j]['Genre'] + '            ' + Channels[j]['Html'].length + ' Channel(s)' + '</div>' +
                                      '<div class="contents" style="height: auto">' +
                                       '   <p class="selectall">' +
                                       '   Select All' +
                                       '   <input type="checkbox" name="vehicle1" value="Bike" />' +
                                        '  </p>' + ChannelFinal +

              '</div>');

                $('#ChannalsAcc').append(GenerHtml);
            }


        }
    }

    $("#Loadingbg").hide();


}

function OnFailGetPakegesList(r) {

}
// Quick & dirty toggle to demonstrate modal toggle behavior


