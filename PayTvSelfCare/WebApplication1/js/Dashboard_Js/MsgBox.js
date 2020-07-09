var MsgConfirm = false;
function MsgBox(MsgType, Msg) {

    var MainMsgIcon = "";
    var MsgTittle = "";
    var MsgIcon = "";
    MsgConfirm == false;
    if (MsgType == "E") {
        MsgTittle = "&nbsp;Alert";
        //MsgIcon = '<i class="mdi-alert-warning"></i>';
        // $(".jconfirm-ErrorMsgicon").css("display", "block !important");
    }

    if (MsgType == "S") {
        MsgTittle = "Success";
        //$(".jconfirm-SucessMsgicon").css("display", "block !important");
        //MsgIcon = '<i class="mdi-navigation-check"></i>';
    }

    if (MsgType == "P") {
        MsgTittle = "Pending";
        //$(".jconfirm-SucessMsgicon").css("display", "block !important");
        //MsgIcon = '<i class="mdi-navigation-check"></i>';       
    }
    if (MsgType == "N") {
        MsgTittle = "Notification";
        //$(".jconfirm-SucessMsgicon").css("display", "block !important");
        //MsgIcon = '<i class="mdi-navigation-check"></i>';       
    }

    $('.jconfirm-buttons button').css("padding", "6px 45px");
    $('.jconfirm-buttons').css("margin-right", "40%");


    $.confirm({
        title: MsgTittle,
        content: Msg,
        icon: '',
        animation: 'scale',
        closeAnimation: 'scale',
        opacity: 0.5,
        buttons: {
            confirm: {
                text: 'Ok',
                btnClass: 'btn-warning' ,
                action: function () {
                    confirmAction();
                }
            }
        }
    });
    window.setInterval(function () {
        $('.jconfirm-box').find('.jconfirm-closeIcon').unbind('click').on('click', function () {

            confirmAction();

        });
    }, 1000);
}

function MsgBoxConfirm() {
    MsgConfirm = true;
    $.confirm({
        title: 'Confirm!',
        content: 'Are sure',
        buttons: {
            confirm: {
                text: "Confirm",
                action: function () {
                    ConfOk();
                }
            },
            cancel: {
                text: "Cancel",
                action: function () {
                    ConfCancel();
                }
            }
        }
    });

}

function ErrorMsg(MsgType, Msg, CtrId) {

    if (CtrId.indexOf("|") > 0) {
        $('#' + CtrId.split("|")[0] + '').focus();
        $('#' + CtrId.split("|")[0] + '').closest('.input-field').find('.AppLoginError').html(Msg);
        $('#' + CtrId.split("|")[0] + '').closest('.input-field').find('.AppLoginError').css('visibility', 'visible');
    }
    else {
        $('#' + CtrId + '').focus();
        $('#' + CtrId + '').closest('.input-field').find('.errorMsg').html(Msg);
        $('#' + CtrId + '').closest('.input-field').find('.errorMsg').css('visibility', 'visible');
    }
}




function RemoveError(ctrl) {

    if (ctrl.type == "password" || ctrl.type == "text") {
        if (ctrl.id == "txtPassword") {
            if ($("#txtPassword").val().trim().length == 0) {
                $(".ShowHidePassword").css("display", "none");

                $(ctrl).next().next("span i").remove();
                $(ctrl).next().next("span").html('<i class="mdi-action-visibility-off"></i>');
                $(ctrl).attr('type', 'password');
            }
            else
                $(".ShowHidePassword").css("display", "inline");
        }


        if (ctrl.id == "txtusername") {
            if ($.isNumeric($("#txtusername").val().trim()) == true) {
                $("#txtusername").attr("maxlength", "10");
            }
            else {
                $("#txtusername").attr("maxlength", "100");
            }
        }


    }

    $('#' + ctrl.id + '').closest('.input-field').find('.errorMsg').html("");
    $('#' + ctrl.id + '').closest('.input-field').find('.errorMsg').html("&nbsp;");
    $('#' + ctrl.id + '').closest('.input-field').find('.errorMsg').css('visibility', 'hidden');

    if (ctrl.id == "txtMobileNumber")
        showCopyUserId();


    if ($(".RegTopRed").css("display") == "block") {
        $(".RegTopRed").css("display", "none");
    }
}

function showCopyUserId() {
    if ($("#txtMobileNumber").val().trim() != "") {
        $('#CopyMobUserId').show("slow");
    }
    else {

        $('#CopyMobUserId').html('<a href="javascript:void(0);" style="color: #a79e9e;" onclick="javascript:SetMobUserID(); return false;"><i class="mdi-image-crop-3-2" style="font-size: 13px;"></i>&nbsp;Copy As User ID</a>');
        $('#CopyMobUserId').hide("slow");

        if ($('#CopyMobUserId').css("display") == "none") {
            $("#txtUserId").val("");
            $("#txtUserId").closest(".row").find("i").removeClass("active");
            $("#txtUserId").closest(".row").find("label").removeClass("active");
        }
    }

    if ($("#CopyMobUserId a").find("i").hasClass("mdi-action-done") == true) {
        $("#txtUserId").val($("#txtMobileNumber").val().trim());
    }
}

$(document).ready(function () {

});

