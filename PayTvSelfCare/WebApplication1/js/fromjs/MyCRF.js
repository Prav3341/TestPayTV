
function GetCRF(TopRowWise) {
    $('.preloader-wrapper').fadeIn("slow");
    try {
        SubsId = localStorage.getItem("SubsUniqueID");
        OperatorId = localStorage.getItem("CableOperaterID");

        PushData('TopRowCount', TopRowWise);
        PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);
        CallPublicAPI('MyCRF.aspx/GetCRFList', '', OnPassGetCRF, OnFailGetCRF);
    } catch (e) {

    }
}

function OnPassGetCRF(result) {
    var res = result.d.split("|");
    var CRFDataTable = res[0] == "" ? null : JSON.parse(res[0]);
    //IsAddRequ = res[1];
    var TableHtml = Color = "";
    if ($.fn.DataTable.isDataTable('#CRFDataTable')) {
        $('#CRFDataTable').DataTable().destroy();
    }

    if (CRFDataTable["Status"] == "Success" && CRFDataTable["Status"] != "S") {

        for (var i = 0; i < CRFDataTable["Description"].length; i++) {

            /*Job*/
            if (CRFDataTable["Description"][i]["Last Status"] == "Registered/Assigned")
                Color = "#1aa3ff";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Pending")
                Color = "rgb(251, 64, 64)";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Rejected")
                Color = "rgb(234, 140, 39)";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Completed")
                Color = "#4abf11";
                /*Ticket*/
            else if (CRFDataTable["Description"][i]["Last Status"] == "Created")
                Color = "#1aa3ff";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Accepted")
                Color = "#1aa3ff";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Updated")
                Color = "rgb(234, 140, 39)";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Cancelled")
                Color = "rgb(234, 140, 39)";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Closed")
                Color = "#4abf11";
                /*CRF*/
            else if (CRFDataTable["Description"][i]["Last Status"] == "Registered" || CRFDataTable["Description"][i]["Last Status"] == "Requested")
                Color = "#1aa3ff";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Schedule Provisioning")
                Color = "#1aa3ff";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Under Provisioning")
                Color = "rgb(251, 64, 64)";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Cancelled Or Rejected")
                Color = "rgb(234, 140, 39)";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Provisioning Successfully")
                Color = "#4abf11";
            else if (CRFDataTable["Description"][i]["Last Status"] == "Provisioning Failed")
                Color = "rgb(234, 140, 39)";


            TableHtml += '<tr>' +
                                '<td>' +
                                    '<div style="padding: 8px 0px 8px 0px;">' +
                                        '<div style="float: left; font-size: 22px; border: 2px solid; padding: 4px 15px 2px 15px; border-radius: 3px; color:' + Color + ';">' +
                                            '<i class="mdi-communication-quick-contacts-mail"></i>' +
                                        '</div>' +
                                        '<div style="float: left; margin-left: 10px;">' +
                                            '<p style="font-size: 15px; font-weight: 500;">' + CRFDataTable["Description"][i]["Head"] + '</p>' +
                                            '<p style="color: #888282;">Order No.&nbsp;' + CRFDataTable["Description"][i]["CRFNo"] + '</p>' +
                                            '<p style="color: #888282;" class="ComplaintsSmall">Created At&nbsp;' + CRFDataTable["Description"][i]["Creation BY / Date"] + '</p>' +
                                            '<p style="color: #888282;" class="ComplaintsSmall">Updated At&nbsp;' + CRFDataTable["Description"][i]["UpdationDate"] + '</p>' +
                                            '<p style="color: #888282;" class="ComplaintsSmall">' + CRFDataTable["Description"][i]["Last Status"] + '</p>' +
                                        '</div>' +
                                        '<div style="clear: both;"></div>' +
                                    '</div>' +
                                '</td>' +
                                '<td class="ComplaintsFull">' + CRFDataTable["Description"][i]["Creation BY / Date"] + '</td>' +
                                '<td class="ComplaintsFull">' + CRFDataTable["Description"][i]["UpdationDate"] + '</td>' +
                                '<td class="ComplaintsFull">' + CRFDataTable["Description"][i]["Last Status"] + '</td>' +
                       '</tr>';


        }
    }
    else
        TableHtml = null;



    $('#MyCRF').empty();

    $('#MyCRF').append(TableHtml);


    $('#CRFDataTable').dataTable({
        "ordering": false,
        "bPaginate": false,
        "info": false,
        "oLanguage": {
            "sEmptyTable": "No Record Found.",
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Enter Keywords Here"
        },
        bAutoWidth: false
    });

    //if (IsAddRequ == "True")
    //    $(".btn").css("display", "block");
    //else
    //    $(".btn").css("display", "none");

    $('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').fadeOut("slow");
}

function OnFailGetCRF(result) {
    $('.preloader-wrapper').delay(100).fadeOut();
}
$(window).load(function () {

    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Orders") {
            $(this).addClass("active");
        }
    });

    $('.mdi-action-search').text("");

    GetCRF(5);

});

$(document).ready(function () {
    $('#drpDuration').on('change', function () {
        var TopRowWise = $(this).find('option:selected').val();
        GetCRF(TopRowWise);
    });

});
