var IsCalledPageLoad = true;
var IsError = false;
var Msg = MsgType = CtrId = IsAddRequ = "";
var TickNo="";

function GetComplaintsHistory(TopRowWise) {

    if (IsCalledPageLoad == true)
        GetTicketHeadList();

    //$('.preloader-wrapper').fadeIn("slow");
    $('#Loadingbg').css('display', 'block');
    try {
        SubsId = localStorage.getItem("SubsUniqueID");
        OperatorId = localStorage.getItem("CableOperaterID");

        PushData('TopRowCount', TopRowWise);
        PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);
        CallPublicAPI('MyServiceRequests.aspx/GetRequestList', '', OnPassGetComplaints, OnPassGetComplaints);
    } catch (e) {

    }
}

function OnPassGetComplaints(result) {
    var res = result.d.split("|");
    var ComplaintsDataTable = res[0] == "" ? null : JSON.parse(res[0]);
    //IsAddRequ = res[1];
    var TableHtml = Color = "";
    if ($.fn.DataTable.isDataTable('#ComplaintsDataTable')) {
        $('#ComplaintsDataTable').DataTable().destroy();
    }

    if (ComplaintsDataTable["Status"] == "Success" && ComplaintsDataTable["Status"] != "S") {

        for (var i = 0; i < ComplaintsDataTable["Description"].length; i++) {

            /*Job*/
            if (ComplaintsDataTable["Description"][i]["Last Status"] == "Registered/Assigned")
                Color = "#1aa3ff";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Pending")
                Color = "rgb(251, 64, 64)";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Rejected")
                Color = "rgb(234, 140, 39)";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Completed")
                Color = "#4abf11";
                /*Ticket*/
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Created")
                Color = "#1aa3ff";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Accepted")
                Color = "#1aa3ff";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Updated")
                Color = "rgb(234, 140, 39)";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Cancelled")
                Color = "rgb(234, 140, 39)";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Closed")
                Color = "#4abf11";
                /*CRF*/
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Registered" || ComplaintsDataTable["Description"][i]["Last Status"] == "Requested")
                Color = "#1aa3ff";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Schedule Provisioning")
                Color = "#1aa3ff";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Under Provisioning")
                Color = "rgb(251, 64, 64)";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Cancelled Or Rejected")
                Color = "rgb(234, 140, 39)";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Provisioning Successfully")
                Color = "#4abf11";
            else if (ComplaintsDataTable["Description"][i]["Last Status"] == "Provisioning Failed")
                Color = "rgb(234, 140, 39)";


            TableHtml += '<tr>' +
                                '<td>' +
                                    '<div style="padding: 8px 0px 8px 0px;">' +
                                        '<div style="float: left; font-size: 22px; border: 2px solid; padding: 4px 15px 2px 15px; border-radius: 3px; color:' + Color + ';">' +
                                            '<i class="mdi-communication-quick-contacts-mail"></i>' +
                                        '</div>' +
                                        '<div class="ServieceRequest">' +
                                            '<p style="font-size: 15px; font-weight: 500;">' + ComplaintsDataTable["Description"][i]["Head"] + '</p>' +
                                            '<p style="color: #888282;">Request No.&nbsp;' + ComplaintsDataTable["Description"][i]["Ticket NO"] + '</p>' +
                                            '<p style="color: #888282;" class="ComplaintsSmall">Assigned To At&nbsp;' + ComplaintsDataTable["Description"][i]["Technical Person Info"] + '</p>' +
                                            '<p style="color: #888282;" class="ComplaintsSmall">Created/Updated Date At&nbsp;' + ComplaintsDataTable["Description"][i]["Creation /Updation Date"] + '</p>' +
                                            '<p style="color: #888282;" class="ComplaintsSmall">' + ComplaintsDataTable["Description"][i]["Last Status"] + '</p>' +
                                            '<p style="color: #0099fd;" class="ComplaintsSmall"><a  href="javascript:void(0);" onclick="javascript:SubsComplaintRemark(); return false;">View More </a></p>' +
                                        '</div>' +
                                        '<div style="clear: both;"></div>' +
                                    '</div>' +
                                '</td>' +
                                '<td class="ComplaintsFull">' + ComplaintsDataTable["Description"][i]["Technical Person Info"] + '</td>' +
                                '<td class="ComplaintsFull">' + ComplaintsDataTable["Description"][i]["Creation /Updation Date"] + '</td>' +
                                '<td class="ComplaintsFull">' + ComplaintsDataTable["Description"][i]["Last Status"] + '</td>' +
                                '<td class="ComplaintsFull"><a data-TicketNo="'+ComplaintsDataTable["Description"][i]["Ticket NO"]+'"  data-TicketID="' + ComplaintsDataTable["Description"][i]["TicketID"] + '" style="color:#0099fd" class="waves-effect waves-light modal-trigger" href="javascript:void(0);" onclick="javascript:SubsComplaintRemark(this); return false;">View More </a></td>' +
                       '</tr>';


        }
    }
    else
        TableHtml = null;



    $('#MyComplaints').empty();

    $('#MyComplaints').append(TableHtml);


    $('#ComplaintsDataTable').dataTable({
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

    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
    $('#Loadingbg').fadeOut("slow");
}

function OnFailGetComplaints(result) {
    //$('.preloader-wrapper').delay(100).fadeOut();
    $('#Loadingbg').css('display', 'none');
}

function SubsComplaintRemark(ref)
{

    var TicketID = parseInt($(ref).data("ticketid"));
    TickNo = parseInt($(ref).data("ticketno"));

    try{
        //SubsId = localStorage.getItem("SubsUniqueID");
        //OperatorId = localStorage.getItem("CableOperaterID");

        //PushData('TopRowCount', TopRowWise);
        //PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);
        PushData('TicketId', TicketID);
        CallPublicAPI('../MyServiceRequests.aspx/GetRequestListChat','', OnPassGetComplaintsChat, OnPassGetComplaintsChat);
    }
    catch(e){
        var a=e;
    }

    
}

function OnPassGetComplaintsChat(result) {
    var createChat = "";
    var res = result.d.split("|");
    var dt = res[0] == "" ? null : JSON.parse(res[0]);
    //var Ifexist = [];
    var defaultClass="";


    createChat +='<ul>';
    for (var i = 0; i < dt.Description.Table.length;i++)
    {
        var style = "";
        var name = "";
        defaultClass = "leftremark";
       
        name = dt.Description.Table[i].TechnicalEmployee;

        if (dt.Description.Table[i].TechnicalEmployee == "") {
            name = "YOU";
            defaultClass = "rightremark";
            style = "style='text-align:right'";
        }
        createChat += '<ul><li class="' + defaultClass + '"><p ' + style + '><span class="RemarkName">' + name + '</span><span>&nbsp;' + dt.Description.Table[i].TicketDT + '</span></p>';
        createChat += '<p class="RemarkComment">' + dt.Description.Table[i].Remarks + '</p></li>';
        
    }
    createChat+='</ul>'
   
    $('.remark_details').html(createChat);

    $('#SubscriberRemark').show();
    $('#materialize-lean-overlay-1').show();
}

function GetTicketHeadList() {
    try {
        //PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);
        CallPublicAPI('../MyServiceRequests.aspx/GetTicketHeadList', '', OnPassGetTicketHead, OnFailGetTicketHead);

    } catch (e) {

    }
}

function OnPassGetTicketHead(result) {
    var TicketHeadListDataTable = result.d == "" ? null : JSON.parse(result.d);

    //var Option = '<option value="-1" disabled selected>Select Service Request Head</option>';

    var Option = "";
    if (TicketHeadListDataTable["Status"] != "Fail") {
        for (var i = 0; i < TicketHeadListDataTable["Description"].length; i++) {

            Option += '<option value="' + TicketHeadListDataTable["Description"][i]["TicketHeadID"] + '" selected>' + TicketHeadListDataTable["Description"][i]["Ticket Head"] + '</option>';
        }
    }

    $("#drpComplaintCatgeory").html("");
    $("#drpComplaintCatgeory").append(Option);
    $("#Select1").html("");
    $("#Select1").append(Option);
  
    IsCalledPageLoad = false;
}

function OnFailGetTicketHead(result) {
    $('#Loadingbg').css('display', 'none');
}


function validation() {
    var flag = true;
    MsgType = "E";

    if ($("#drpComplaintCatgeory").val() == "-1" || $("#drpComplaintCatgeory").val() == null) {
        CtrId = "drpComplaintCatgeory";
        //Msg = "Please select service request head.";
        $("#errorMsg1").html("Please select service request head.");
        $("#errorMsg2").html('');
        $(".errorMsg").css('visibility', 'visible');
        flag = false;
    }
    else if ($('#txtAComplaint').val().trim() == "") {
        CtrId = "txtAComplaint";
        $("#errorMsg2").html("Please enter remark.");
        $("#errorMsg1").html('');
        $(".errorMsg").css('visibility', 'visible');
        //Msg = "Please enter remark.";
        flag = false;
    }

    return flag;
}

function AddNewComplainte() {
    if (localStorage.getItem("IsAddRequest") == "true") {
        if (validation() == true) {
            $('.lean-overlay').css('display', 'none');
            $('#Loadingbg').css('display', 'block');
            $('#ComplaintModel').hide();
            PushData('SubsId', SubsId);
            PushData('OPID', OperatorId)
            PushData('TicketHeadId', $('#drpComplaintCatgeory   option:eq(0)').val());
            PushData('Remarks', $('#txtAComplaint').val());
            CallPublicAPI('../MyServiceRequests.aspx/AdNewComplaints', '', OnPassAdNewComplaints, OnFailAdNewComplaints);
        }
    }
    else {
        MsgBox("E", "You do not have permission for Add New Request!!");
    }
}

function OnPassAdNewComplaints(result) {
    var result = JSON.parse(result.d);
    $('#drpComplaintCatgeory   option:eq(0)').prop('selected', true);
    $("#txtAComplaint").val("");
    if (result["Status"] == "Fail") {
        $('#Loadingbg').css('display', 'none');
        IsError = true;
        MsgBox("E", result["Description"]);
    }
    else {
        $('#Loadingbg').css('display', 'none');
        IsError = false;
        MsgBox("S", result["Description"]);
       
        GetComplaintsHistory($('#drpDuration').val());
    }
}

function OnFailAdNewComplaints(result) {
    $('#Loadingbg').css('display', 'none');
    $('#drpComplaintCatgeory   option:eq(0)').prop('selected', true);
    $("#txtAComplaint").val("");
    MsgBox("E", "Some Login Problem. Please try angain.");
}



function saveChatValidation() {

}

function saveChat() {
    //if (localStorage.getItem("IsAddRequest") == "true") {
        $('.lean-overlay').css('display', 'none');
        $('#Loadingbg').css('display', 'block');
      
        PushData('opId', OperatorId);
        PushData('userID', '-1');
        PushData('remark', $('#Textarea1').val());
        PushData('TicketNo',TickNo);
        //PushData('TicketHeadId', $('#Select1   option:eq(0)').val());;
        CallPublicAPI('../MyServiceRequests.aspx/saveRequestListChat', '', OnPassSaveChat, OnFailSaveChat);
    //}
    //else {
    //    MsgBox("E", "You do not have permission for Add New Request!!");
    //}
}



function OnPassSaveChat(result) {
   

    var result = JSON.parse(result.d);
    //$('#drpComplaintCatgeory   option:eq(0)').prop('selected', true);
    $("#Textarea1").val("");
    if (result["Status"] == "Fail") {
        $('#Loadingbg').css('display', 'none');
        IsError = true;
        MsgBox("E", result["Description"]);
    }
    else {
        $('#Loadingbg').css('display', 'none');
        IsError = false;
        MsgBox("S", result["Description"]);
    }
   
}

function OnFailSaveChat(result) {
    $('#Loadingbg').css('display', 'none');
    $("#Textarea1").val("");
    MsgBox("E", "Some Login Problem. Please try angain.");
}


$(window).load(function () {

    if (localStorage.getItem("IsAddRequest") == "true")
        $("#AddComplaint").css("display", "block");
    else
        $("#AddComplaint").css("display", "none");

    $('.preloader-wrapper').css("display", "none");
    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Service Requests") {
            $(this).addClass("active");
        }
    });

    $('.mdi-action-search').text("");



    GetComplaintsHistory(5);

});


$(document).ready(function () {
    $('#drpDuration').on('change', function () {
        var TopRowWise = $(this).find('option:selected').val();
        GetComplaintsHistory(TopRowWise);
    });


    $("#drpComplaintCatgeory").on('change', function () {
        $(this).closest(".row").find(".errorMsg").css("visibility", "hidden");
    });

    $("#AddComplaint").click(function () {
       
        $("#txtAComplaint").val("");
        $("#drpComplaintCatgeory").val("-1");
        $("#ComplaintModel").show();
       // $(".lean-overlay").show();
        // GetTicketHeadList();
    });

    $(".modal-close").click(function () {
        $("#ComplaintModel").hide();
        $(".lean-overlay").hide();
        $('#SubscriberRemark').hide();
    });
    

});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { $(".lean-overlay").hide(); }   // esc
});