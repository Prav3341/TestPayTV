var MyProfileDataTable = LogInDataTable = null;
var stepper = active = null;
var MinimumAmount = chkDuepayAmt = 0;
var setIsPayDueAmtLimit = false;
var SetAmount = 0;
var updateprofile = false;
var Imgsize = 0
var DocumentHead = [];
function GetMyProfileData() {
    try {
        $('#Loadingbg').css('display', 'block');
        SubsId = localStorage.getItem("SubsUniqueID");
        OperatorId = localStorage.getItem("CableOperaterID");

        PushData('SubsId', SubsId);
        PushData('OPID', OperatorId);
        CallPublicAPI('MyProfile.aspx/GetMyProfileData', '', OnPassProfileData, OnFailProfileData);
    } catch (e) {

    }
}

function OnPassProfileData(result) {
    var res = result.d.split("|");
    MyProfileDataTable = JSON.parse(res);
    //LogInDataTable = JSON.parse(res[1]);

    if (MyProfileDataTable["Status"] == "Success") {
        MyProfileDataTable = JSON.parse(res).Description;
        if (MyProfileDataTable["NewDataSet"]["Customers"].length != 0) {
            localStorage.setItem("CustomerId", MyProfileDataTable["NewDataSet"]["Customers"][0]["CustomerID"]);
            localStorage.setItem("MemberShipNo", MyProfileDataTable["NewDataSet"]["Customers"][0]["MembershipNo"]);
            var ProfileAmt = 0;
            var Cr = "";
            if (MyProfileDataTable["NewDataSet"]["Customers"][0]["IsPrepaid"] == "true") {

                if (MyProfileDataTable["NewDataSet"]["Customers"][0]['CUSTOMERBALANCE'] == "" || MyProfileDataTable["NewDataSet"]["Customers"][0]['CUSTOMERBALANCE'] == undefined)
                    ProfileAmt = 0;
                else
                    ProfileAmt = MyProfileDataTable["NewDataSet"]["Customers"][0]['CUSTOMERBALANCE'];

                if (ProfileAmt < 0)
                    Cr = "Cr";
                else
                    Cr = "";
                var Amount = localStorage.getItem("BalanceAmount");
                $("#ProfileDate").html("Expiry Date");

                $("#ProfileAmountText").text("Balance Amount");
                $("#ProfileDue").hide();
                $("#PayNow").css('display', 'none');

                $("#WallateAmmount").show();
                $("#AddMony").css('display', 'inline-block');
                $('#Amount').html('<i class="fa fa-inr"></i>&nbsp;' + Amount.replace("-", "") + '&nbsp;' + Cr);
                $('#PdueDate').html("Expiry Date");

            }
            else {
                var TileName = "";

                if (MyProfileDataTable["NewDataSet"]["Customers"][0]["IsBillGen"] == "0") {
                    TileName = "Bill Amount";
                    ProfileAmt = MyProfileDataTable["NewDataSet"]["Customers"][0]["BillAmount"];
                }
                else {
                    TileName = "Due Amount";
                    ProfileAmt = MyProfileDataTable["NewDataSet"]["Customers"][0]["BalanceAmount"];
                }


                if (ProfileAmt == "" || ProfileAmt == undefined)
                    ProfileAmt = 0;
                else
                    ProfileAmt = ProfileAmt;



                if (ProfileAmt < 0) {
                    $("#ProfileAmountText").text("Advance Amount");
                    Cr = "Cr";
                    $("#ProfilePayNow").css("visibility", "visible");

                    $("#PDueDate").closest(".card").css("display", "none");
                }
                $("#WallateAmmount").hide();
                // $("#ProfileDate").html("Due Date");
                $('#PdueDate').html("Due Date");
                // $("#ProfileAmountText").text("Bill Amount");
                $("#PayNow").css('display', 'inline-block');
                $("#AddMony").css('display', 'none');
            }

            var Amount = localStorage.getItem("BalanceAmount");
            if (localStorage.getItem("EnablePayment") == 0) {
                $("#PayNow").css('display', 'none');
                $("#AddMony").css('display', 'none');
            }
            $('#PCustName').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['FullName']);
            $("#ProfileMemNo").html('Subscriber ID&nbsp;:&nbsp;' + MyProfileDataTable["NewDataSet"]["Customers"][0]['MembershipNo']);

            if (MyProfileDataTable["NewDataSet"]["Customers"][0]["IsPrepaid"] == "true")
                $("#ProfileDue").hide();
            else
                $("#ProfileDue").show();
            
            
            
            $('#Amount').html('<i class="fa fa-inr"></i>&nbsp;' + Amount.replace("-", "") + '&nbsp;' + Cr);
            var data = JSON.parse(localStorage.getItem("LDT"));
            if (data["Description"][0]["ActivateSms"] == true) {
                $("#SmsActive").html('<i class="mdi-action-done" style="color: #fff  !important;"></i>');
                $("#ActiveEmail").html('<i class="mdi-action-done" style="color: #fff  !important;"></i>');
            }
            else {
                $("#SmsActive").html('<i class="mdi-navigation-close" style="color: #e00707 !important;"></i>');
                $("#ActiveEmail").html('<i class="mdi-navigation-close" style="color: #e00707 !important;"></i>');
            }



            if (MyProfileDataTable["NewDataSet"]["Customers"][0]['IsAccVerifyflag'] == "true") {
                $("#AccVerified").html('<i class="mdi-action-done" style="color: #fff !important;"></i>');
            }
            else {
                $("#AccVerified").html('<i class="mdi-navigation-close" style="color: #e00707 !important;"></i>');
            }

            if (MyProfileDataTable["NewDataSet"]["Customers"][0]['IsPrepaid'] == "true") {
                $("#ProfileAddMoney").css("display", "none");
                $("#ProfilePayNow").css("display", "block");
            }
            else {
                $("#ProfilePayNow").css("display", "none");
                $("#ProfileAddMoney").css("display", "block");
            }

            CurrLogInDetails = JSON.parse(localStorage.getItem("CDT"))["Description"];

            /*label*/
            //$('#PDueDate').html('<i class="fa fa-calendar"></i>&nbsp;' + PDueDate);
            $('#PFirstName').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['FirstName']);
            $('#PMidName').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['MiddleName']);
            $('#PLastName').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['LastName']);
            $('#PAddress1').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address1']);
            $('#PAddress2').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address2']);
            $('#PAddress3').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address3']);
            $('#PMobNo').text(MyProfileDataTable["NewDataSet"]["Customers"][0]['REGISTERMOBILENUMBER']);
            $('#PEmailID').text(CurrLogInDetails[0]["RegEmailID"]);//MyProfileDataTable["NewDataSet"]["Customers"][0]['EMAIL']


            /*textbox*/
            $('#txtPFirstName').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['FirstName']);
            $('#txtPMiddleName').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['MiddleName']);
            $('#txtPLastName').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['LastName']);
            $('#txtPAddressLine1').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address1']);
            $('#txtPAddressLine2').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address2']);
            $('#txtPAddressLine3').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address3']);
            $('#txtPMobileNo').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['REGISTERMOBILENUMBER']);
            $('#txtPEmailID').val(CurrLogInDetails[0]["RegEmailID"]);//MyProfileDataTable["NewDataSet"]["Customers"][0]['EMAIL']
            $('#DueDate').html(localStorage.getItem("DueDate"))
            localStorage.setItem("CurrUserName", MyProfileDataTable["NewDataSet"]["Customers"][0]['FullName']);
            SetUserName();
        }
        // Call Get Document API

        ViewDocumentList();

    }
    else {
        MsgBox("E", "Something went wrong, please try again later!");
        $('#Loadingbg').css('display', 'none');
    }
}

function OnFailProfileData(result) {
    //$('#Liteloding-wrapper').css('display', 'none');
    $('#Loadingbg').css('display', 'none');
}

function UpdateMyProfileDetails() {
    if (localStorage.getItem("IsProUpdate") == "true") {

        if ($("#txtPFirstName").val().trim() != "") {

            $('#Loadingbg').css('display', 'block');

            var IsContactInfoUpdate = false;

            if ($('#PEmailID').text().trim() == $('#txtPEmailID').val().trim() && $('#PMobNo').text().trim() == $('#txtPMobileNo').val().trim()) {
                IsContactInfoUpdate = false;
            }
            else { IsContactInfoUpdate = true; }

            PushData('OPID', localStorage.getItem("CableOperaterID"));
            //PushData('CustomerID', 11612);
            PushData('CustomerID', localStorage.getItem("CustomerId"));
            //   PushData('MemShipNo', "11609");
            PushData('FirstName', $('#txtPFirstName').val().trim());
            PushData('MiddleName', $('#txtPMiddleName').val().trim());
            PushData('LastName', $('#txtPLastName').val().trim());
            PushData('Add1', $('#txtPAddressLine1').val().trim());
            PushData('Add2', $('#txtPAddressLine2').val().trim());
            PushData('Add3', $('#txtPAddressLine3').val().trim());
            PushData('RegisteredMobileNo', $('#txtPMobileNo').val().trim());
            PushData('EmailID', $('#txtPEmailID').val().trim());
            PushData('IsContactInfoUpdate', IsContactInfoUpdate);
            //CallWebMethod('../MyProfile.aspx/UpadteMyProfileDetails', WebMethodData, OnPassEditProfileData, OnFailEditProfileData);
            CallPublicAPI('MyProfile.aspx/UpadteMyProfileDetails', '', OnPassEditProfileData, OnFailEditProfileData);
        }
        else {
            $("#txtPFirstName").focus();
            MsgBox('E', "Please Enter First Name !!");
           
        }

           // ErrorMsg("E", "Please Enter First Name.", "txtPFirstName");
    }
    else {
        MsgBox('E', "You have no permission for update profile !!")
    }
}

function OnPassEditProfileData(result) {
    var SplitResult = result.d.split("|");

    //$('#Liteloding-wrapper').css('display', 'none');
   
    if (SplitResult[0] == "S") {
        MsgBox(SplitResult[0], SplitResult[1]);        
        updateprofile = true;
        //GetMyProfileData();
    }
    else {
        MsgBox(SplitResult[0], SplitResult[1]);
    }

}

function OnFailEditProfileData(result) {
    //$('#Liteloding-wrapper').css('display', 'none');
    $('#Loadingbg').css('display', 'block');
}
//function ProfileValidate() {
//    var ProFilePicFlag = true;
//    if ($('#ProfilePicUpload').val() != '') {
//        if (typeof ($("#ProfilePicUpload")[0].files) != "undefined") {
//            var size = parseFloat($("#ProfilePicUpload")[0].files[0].size / 1024).toFixed(2);
//            if (size / 100 > 1) {

//                MsgBox("E", "Image size should Be less than 100 KB");
//                ProFilePicFlag = false;
//            }

//        }
//    }
//    if ($('#ProfilePicUpload').val() != '') {
//        var Addproofval = $("#ProfilePicUpload").val();
//        if (!Addproofval.match(/(?:jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
//            // inputted file path is not an image of one of the above types
//            //$(".Error_masg").show();
//            //$("#Eror_text").html("Invalid file format, please use only jpg & png files!");
//            //$("#Eror_text").css("color", 'red');
//            //$(".modal_bg").show();
//            MsgBox("E", "Invalid file format, Please Use only jpg & png files!");
//            ProFilePicFlag = false;
//        }

//    }
//    return ProFilePicFlag;
//}
var image = new Image();

var fileReader = new FileReader();
function ReadProfilePicURL(input, evt) {
    if (localStorage.getItem("IsCallByIOSMobileApp") == "true") {
      
        var Width = 0, height = 0;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
          
            //reader.onload = function (e) {};
            if (input.files[0].size / 1024 > 100) {
                if (input.files[0].size / 1024 / 1024 > 2 && input.files[0].size / 1024 / 1024 < 7)
                    Imgsize = input.files[0].size / 1024 / 200;
                else if (input.files[0].size / 1024 / 1024 > 6 && input.files[0].size / 1024 / 1024 < 50)
                    Imgsize = input.files[0].size / 1024 / 300;
                else if (Imgsize = input.files[0].size / 1024 / 100 > 4)
                    Imgsize = input.files[0].size / 1024 / 100;
                else
                    Imgsize = 4;
            } else
                Imgsize = 0
            fileReader.readAsDataURL(input.files[0]);
            //  reader.readAsDataURL(input.files[0]);        
        }
        
        
    }

    else {
        if (ProfileValidate() == true) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //$('.ProfilePic').attr('src', e.target.result);
                    UploadProfilePic(e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    }
   
}




fileReader.onload = function (event) {
    var image = new Image();
    image.onload = function () {
        if (Imgsize != 0) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = 200;//image.width / Imgsize;
            canvas.height = 200;//image.height / Imgsize;
            context.drawImage(image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
            UploadProfilePic(canvas.toDataURL());

        } else
            UploadProfilePic(image.src);
    }
    image.src = event.target.result;
}


function UploadProfilePic(pic, callby) {
    try {
        if (pic != "" && pic != null && pic != undefined) {
            if (localStorage.getItem("IsCallByIOSMobileApp") == "true" || ProfileValidate() == true) {
                $('#Loadingbg').css('display', 'block');
                if (IsCallByMobileApp)
                    PushData('pic', "data:image/png;base64," + pic);
                else
                    PushData('pic', pic);

                CallWebMethod('../MyProfile.aspx/UpadteProfilePic', WebMethodData, OnPassUpadteProfilePic, OnFailUpadteProfilePic);
            }
        }
    }
    catch (e) {
        MsgBox("E", "Error");
    }
}

function OnPassUpadteProfilePic(result) {

    var res = result.d;

    if (res.split("|")[0] == "S") {

        var PPic = res.split("|")[2];
        localStorage.setItem("ProfilePic", PPic);
        $("ul.side-nav.leftside-navigation li.user-details").css("background", "");
        $("ul.side-nav.leftside-navigation li.user-details").css('background-image', 'url(\'' + PPic + '\')');
        $("#NavigationImg").attr("src", PPic);
        $("#UserProfilePic").attr("src", PPic);
        $(".ProfilePic").attr("src", PPic);

        $('.ProfilePic').css("padding", "1px");
        MsgBox("S", "Profile Pic Updated Successfully");
        //if (IsCallByMobileApp) {
        //    $("#UserProfilePic").attr("src", PPic);
        //    $("ul.side-nav.leftside-navigation li.user-details").css("background", "");
        //    $("ul.side-nav.leftside-navigation li.user-details").css("background-image", 'url("' + PPic + '")');
        //    $(".MobBtn").html("");
        //    $(".MobBtn").html('<img src="' + PPic + '" style="height: 100px;width: 100px;border-radius: 50%;"/>');
        //}
        //else {
        //    $("#UserProfilePic").removeAttr("src").attr("src", PPic);
        //    $("ul.side-nav.leftside-navigation li.user-details").css("background", "");
        //    $("ul.side-nav.leftside-navigation li.user-details").css("background-image", 'url("' + PPic + '")');
        //}
    }
    $('#Loadingbg').css('display', 'none');
    //$("#profile-page-header").find(".progress").css("visibility", "hidden");
}

function OnFailUpadteProfilePic(result) {
    $('#Loadingbg').css('display', 'none');
    //$("#profile-page-header").find(".progress").css("visibility", "hidden");
}


function setProfilePic() {
    try {
      
        var Image = "";
        if (IsCallByMobileApp) {
          
            Image = app.GetProfilePic();
          
            if (Image != "" && Image != null)
                UploadProfilePic(Image)
        }
     
    }
    catch (e) {
        var msg = e.message;
    }

}
// Call Back Handler By IOS : return reduse image from ios app
function SetPicCallBack(Image) {
    webkit.messageHandlers.ProfilePicHandler.postMessage("SetPicCallBack");
    // if (localStorage.getItem("IsCallByIOSMobileApp") == "true") {
       
    webkit.messageHandlers.ProfilePicHandler.postMessage("UploadProfilePic Called1----"+ Image);
        
    if (Image != "" && Image != null)
        UploadProfilePic(Image,2)
    // }

}


function confirmAction() {
    if (updateprofile == true) {
        location.reload();
    }
    else
        $('#Loadingbg').css("display", 'none');
}
function ProfileValidate() {
    var ProFilePicFlag = true;
    if ($('#ProfilePicUpload').val() != '') {
        if (typeof ($("#ProfilePicUpload")[0].files) != "undefined") {
            var size = parseFloat($("#ProfilePicUpload")[0].files[0].size / 1024).toFixed(2);
            if (size / 100 > 1) {

                MsgBox("E", "Image size should Be less than 100 KB");
                ProFilePicFlag = false;
            }

        }
    }
    if ($('#ProfilePicUpload').val() != '') {
        var Addproofval = $("#ProfilePicUpload").val();
        if (!Addproofval.match(/(?:jpg|jpeg|png|JPG|JPEG|PNG)$/)) {

            MsgBox("E", "Invalid file format, Please Use only jpg & png files!");
            ProFilePicFlag = false;
        }

    }
    return ProFilePicFlag;
}

$(window).load(function () {

    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "My Profile") {
            $(this).addClass("active");
        }
    });

    if (IsCallByMobileApp) {
        $(".InWebPic").css("display", "none");
        $(".InAppPicBtn").css("display", "block");
    }
    $('.HideDiv').click(function () {
        $('.ViewImg').hide();
        $('#UploadImgView').hide();
        $('html, body').animate({
            scrollTop: $("#profile-page-sidebar").offset().top
        });
    });
    

});


$(document).ready(function () {
    GetMyProfileData();
});
function ViewDocumentList() {
    $('#Loadingbg').css('display', 'block');
    PushData('OPID', CurrLogInDetails[0]["OPID"]);
    PushData('Criteria', " and RefDocID=" + localStorage.getItem("CustId") + "");
    PushData('CabOPID', OperatorId);
    PushData('CompID', CurrLogInDetails[0]["CompID"]);
    CallPublicAPI('MyProfile.aspx/GetDocumentListData', '', OnPassDocumentList, OnFailDocumentList);
}
function OnPassDocumentList(result) {
    try {
        
        var DocumentList = result.d == "" ? null : JSON.parse(result.d);
        if (DocumentList != null) {
            if (DocumentList["Status"] == "Success") {
                $(".documentDetalMain").html("");
                for (var i = 0; i < DocumentList["Description"]["Table"].length; i++) {
                    var ext = DocumentList["Description"]["Table"][i]["DocumentPath"].split('/')[2].split('.')[1];
                    var src = "";
                    if (ext == "pdf")
                        src = "images/others/PdfIcon.png";
                    else
                        src = 'data:image/png; base64,'+ DocumentList["Description"]["Table"][i]["base64document"]+'';

                    var html = '<div class="documenntelement">' +
                                 '<div class="DocumentImg">' +
                                                        '<img src="'+src+'" data-imgurl="' + DocumentList["Description"]["Table"][i]["base64document"] + '"/>' +
                                                    '</div>' +
                                                    '<div class="DocumentTxt">' +
                                                        '<p style="font-weight: 700" class="DocumentHead">' + DocumentList["Description"]["Table"][i]["DocumentHead"] + ' <span class="DocumentHeads">( ' + DocumentList["Description"]["Table"][i]["DocumentCategory"] + ' )</span></p>' +
                                                        '<p style="text-transform: uppercase;">' + DocumentList["Description"]["Table"][i]["Image Caption"] + '</p>' +
                                                        '<div class="Documentbtn">' +
                                                            '<a class="Ducumentviewbtn" href="#" onclick="javascript:viewDocument(this,\'' + DocumentList["Description"]["Table"][i]["DocumentPath"] + '\');return false;"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;&nbsp;' +
                                                            '<a class="DucumentDownloadbtn" href="#" onclick="javascript:DownloadDocument(\'' + DocumentList["Description"]["Table"][i]["DocumentPath"] + '\');return false;"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;&nbsp;' +
                                                            '<a class="Ducumentdeletebtn" href="#" onclick="javascript:DeleteDocument(' + DocumentList["Description"]["Table"][i]["DocumentID"] + ');return false;"><i class="fa fa-trash" aria-hidden="true"></i></a>' +
                                                        '</div>' +
                                                    '</div>' +
                                '</div>';

                    $(".documentDetalMain").append(html);
                }
            }
            else {
                if (DocumentList["Status"] == "Fail" && DocumentList["Description"] == "No Records Found !!!")
                    $(".documentDetalMain").html("");
            }
        }
    }
    catch (err) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");
     
    }
    $('#Loadingbg').css('display', 'none');
}
function OnFailDocumentList(result) {
    //$('#Liteloding-wrapper').css('display', 'none');
    $('#Loadingbg').css('display', 'none');
}
function viewDocument(e,path) {
if (path.split('/')[2].split('.')[1] == "pdf") {
        var imagepath = "Documents/" + CurrLogInDetails[0]["OPID"] + "/" + path;
        window.open("../GetImage.ashx?imgid=" + imagepath, "_blank");
    }
    else {
        var base64image = $(e).closest('.documenntelement').find('img').data('imgurl');
        $('#UploadImgView').show();
        $('.ViewImg').show();
        $('.ViewImg').find('img').prop('src', 'data:image/png;base64,' + base64image);
        window.scrollTo(0, 0);
    }
}
function DownloadDocument(Path) {
    try{
        var imagepath = "Documents/" + CurrLogInDetails[0]["OPID"] + "/" + Path;
        //window.open("../GetImage.ashx?imgid=" + imagepath, "_blank");
        //var base64image = $(e).closest('.documenntelement').find('img').data('imgurl');
        
       // window.location.href = "data:image/png;base64," + base64image;
        // window.location.href = "data: application / octet - stream; base64," + base64image;
        // window.open("" + $(".selectProfilePic").find('img').prop('src') + "", "_blank");
        window.open("../GetImage.ashx?imgid=" + imagepath+"&Callby=Document", "_blank");
      
       // window.open('../GetImage.ashx?&URL=' + 'ftp://www.cnmsonnet.com/Documents/RAP/BillingDocumentsUpload/OPID-' + $('#HOPID').val() + '/CompID-' + $("#HCompID").val() + '/' + $(value).data('filename') + '' + '&imgname=' + $(value).data('filename'), '_blank');
        
    }
    catch (err) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");

    }
}
function DeleteDocument(DocId) {
    if (DocId == "" || DocId == null || DocId == undefined)
        MsgBox('E', "Please select Valid Docuemnt ID !");
    else {
        ConfOk = function () {
            $('#Loadingbg').css('display', 'block');
            PushData('OPID', OperatorId);
            PushData('Id', DocId);
            $('#Loadingbg').css('display', 'block');
            CallPublicAPI('MyProfile.aspx/DocumentsStoreDelete', '', OnPassDelete, OnFailDelete);
        }
        ConfCancel = function () { }
        MsgBoxConfirm('N', "Do you confirm to delete this Record?");
       
    }
}
function OnPassDelete(result) {
    try {
        $('#Loadingbg').css('display', 'block');
        var res = result.d == "" ? null : JSON.parse(result.d);
        if (res["Status"] == "Fail") {
            MsgBox('E', res["Description"]);
            $('#Loadingbg').css('display', 'none');
        }
        else {

            
            confirmAction = function () {
                $('#Loadingbg').css('display', 'block');
                ViewDocumentList();
            }
            MsgBox('S', res["Description"]);
        }
     
    }
    catch (err) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");
        $('#Loadingbg').css('display', 'none');
    }

}
function OnFailDelete(result) {
    $('#Loadingbg').css('display', 'none');
}
function DocumentUpload() {
    $('#Loadingbg').css('display', 'block');
    PushData('OPID', OperatorId);
    PushData('Criteria', "");
    CallPublicAPI('MyProfile.aspx/GetDocumentHeadCategory', '', OnPassDocHead, OnFailDocHead);
}
function OnPassDocHead(result) {
    try {
        var res = result.d == "" ? null : JSON.parse(result.d);
        if (res["Status"] == "Success") {
            DocumentHead = [];
            DocumentHead = res["Description"]["Table"];
            var CategoryOption = "", HeadOption = "";
            if (DocumentHead != null && DocumentHead.length > 0) {
                CategoryOption += '<option value="0">Select Document Category</option>';
                for (var i = 0; i < DocumentHead.length; i++) {
                 
                    if (CategoryOption.indexOf(DocumentHead[i]["Document Category"]) < 0)
                        CategoryOption += '<option value="' + DocumentHead[i]["DocumentCatID"] + '">' + DocumentHead[i]["Document Category"] + '</option>';
                }
                if (CategoryOption != "") {
                    $("#drpCategory").html("");
                    $("#drpCategory").append(CategoryOption);
                }

                var getHead = BindHeadList(DocumentHead, $('#drpCategory   option:eq(-1)').val());

                if (getHead != null && getHead.length > 0) {
                    HeadOption += '<option value="0">Select Document Head</option>';
                    for (var i = 0; i < getHead.length; i++) {
                        HeadOption += '<option value="' + DocumentHead[i]["DocumentHeadID"] + '">' + DocumentHead[i]["Document Head"] + '</option>';
                    }

                    if (HeadOption != "") {
                        $("#drpHead").html("");
                        $("#drpHead").append(HeadOption);
                    }
                }
            }
        }
        $('#drpCategory').val('0');
        $('#DicReference').val('');
        $('#DocumentUpload').val('');
        $('#drpHead').val('0');
        $('#UploadDivMain').css('visibility', 'hidden');
        $("#DocumentUpload").val("");
        $("#DocumentUploader").val('');
        $("#DocumentUpload").attr("data-base64doc", "");
        $('.Number').removeClass('active');
        $('#DocumentUploadPopup').show();
        $('#DocumentUploadModal').show();
    }
    catch (err) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");

    }
    $('#Loadingbg').css('display', 'none');
}
function OnFailDocHead(result) {
    //$('#Liteloding-wrapper').css('display', 'none');
    $('#Loadingbg').css('display', 'none');
}

function BindHeadList(DocumentHead, CatId) {
    var getHead = $.grep(DocumentHead, function (items) {
        return (items['DocumentCatID'] == CatId);

    });
    return getHead;
}
function SelectCategory(e) {
    var getHead = BindHeadList(DocumentHead, $(e).val());
    var HeadOption = "";
    if (getHead != null && getHead.length > 0) {
        HeadOption += '<option value="0">Select Document Head</option>';
        for (var i = 0; i < getHead.length; i++) {
            HeadOption += '<option value="' + getHead[i]["DocumentHeadID"] + '">' + getHead[i]["Document Head"] + '</option>';
        }
        if (HeadOption != "") {
            $("#drpHead").html("");
            $("#drpHead").append(HeadOption);
        }
    }
}
function FileUpload(ctrl, ev) {
    //('#DocumentUpload').k

    if (ctrl.value !== '') {
        $('#UploadDivMain').css('visibility', 'visible');
        $('#Documentlable').addClass('active');
        ////Get Base64 Document
        if (ctrl.files && ctrl.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //$('.ProfilePic').attr('src', e.target.result);
                $("#DocumentUpload").attr("data-base64doc",e.target.result);
               };
            reader.readAsDataURL(ctrl.files[0]);
        }
    }
    else {
        $('#UploadDivMain').css('visibility', 'hidden');
        $('#Documentlable').removeClass('active');

    }

}
function SaveDocument() {
    try
    {
        $('#Loadingbg').css('display', 'block');
    
        if ($("#drpCategory").val() == "0" || $("#drpCategory").val() == "") {
            MsgBox('E', "Please Select Document Category.");
        }
        else if ($("#drpHead").val() == "0" || $("#drpHead").val() == "")
            MsgBox('E', "Please Select Document Head.");

        else if ($("#DicReference").val() == "")
            MsgBox('E', "Please enter Docuemnt Reference.");

        else if ($("#DocumentUpload").val() == "")
            MsgBox('E', "Please Upload the Document.");
        else {
            $('#Loadingbg').css('display', 'block');
            $('#DocumentUploadPopup').hide();
            $('#DocumentUploadModal').hide();
            var base64document = $("#DocumentUpload").attr("data-base64doc");
            var filename = uuidv4() +'.'+ $("#DocumentUpload").val().split('.')[1];

            PushData('CabOPID', OperatorId);
            PushData('OpID', CurrLogInDetails[0]["OPID"]);
            PushData('DocumentHeadID', $("#drpHead").val());
          
            PushData('DocumentReference', $("#DicReference").val());
            PushData('DocumentDesc', $("#DicReference").val());
            PushData('DocumentDate', Reliable.ReliableGetDate('S').split('|')[0]);
            PushData('CustID', localStorage.getItem("CustId"));
            PushData('CompID', CurrLogInDetails[0]["CompID"]);
            PushData('base64document', base64document);
            PushData('fileName', filename);
       
            CallPublicAPI('MyProfile.aspx/DocumentsStoreSave', '', OnPassDocumentSave, OnFailDocumentSave);
        }
    }
    catch (err) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");
        $('#Loadingbg').css('display', 'none');
    }
}
function OnPassDocumentSave(result) {
    try {
        var res = result.d == "" ? null : JSON.parse(result.d);
        if (res["Status"] == "Fail") {
            MsgBox('E', res["Description"]);
            $('#Loadingbg').css('display', 'none');
        }
        else {
            $('#drpCategory').val('0');
            $('#DicReference').val('');
            $('#DocumentUpload').val('');
            $('#drpHead').val('0');
            confirmAction = function () {
                $('#Loadingbg').css('display', 'block');
                ViewDocumentList();
            }
            MsgBox('S', res["Description"]);
        }
       
    }
    catch (err) {
        MsgBox('E', "Something went wrong, please contact with your Provider !");
        $('#Loadingbg').css('display', 'none');
    }

}
function OnFailDocumentSave(result) {
    $('#Loadingbg').css('display', 'none');
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function EditProfileDetails() {
    $('#txtPFirstName').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['FirstName']);
    $('#txtPMiddleName').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['MiddleName']);
    $('#txtPLastName').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['LastName']);
    $('#txtPAddressLine1').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address1']);
    $('#txtPAddressLine2').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address2']);
    $('#txtPAddressLine3').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['Address3']);
    $('#txtPMobileNo').val(MyProfileDataTable["NewDataSet"]["Customers"][0]['REGISTERMOBILENUMBER']);
    $('#txtPEmailID').val(CurrLogInDetails[0]["RegEmailID"]);//MyProfileDataTable["NewDataSet"]["Customers"][0]['EMAIL']
    $('#DueDate').html(localStorage.getItem("DueDate"))
    localStorage.setItem("CurrUserName", MyProfileDataTable["NewDataSet"]["Customers"][0]['FullName']);
    SetUserName();
}