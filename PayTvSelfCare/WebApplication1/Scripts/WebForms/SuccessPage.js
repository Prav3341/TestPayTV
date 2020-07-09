var SplitData = null;

function GetReceiptData(result) {

    SplitData = result == "" ? null : result.split("|");

}

$(document).ready(function () {
    $('#Liteloding-wrapper').css('display', 'none');
});


$(window).load(function () {

    // $('#Liteloding-wrapper').css('display', 'block');


    //if (localStorage.getItem("IsPrePostType") == 1) {
    if (SplitData != null) {
        var DetailsDataTable = JSON.parse(SplitData[0]);

        if (SplitData[3].toLowerCase() == "success") {

            var IsPayInc = SplitData[8];

            $("#SPayAmount").html("Your payment of Rs. " + SplitData[2] + " received successfully");
            $("#RecpID").html(SplitData[4]);
            $("#RecpDate").html(SplitData[5]);
            $("#SubsID").html("<b>Subscriber ID</b>&nbsp;" + DetailsDataTable[0]["MemShipNo"]);
            $("#SubsName").html(DetailsDataTable[0]["CustomerName"]);
            $("#SubsEmail").html(DetailsDataTable[0]["MyCableTVEmailID"]);
            $("#SubsMob").html(DetailsDataTable[0]["MyCableTVMobileNo"]);

            var add1 = "";
            if (DetailsDataTable[0]["Add1"] != "" && DetailsDataTable[0]["Add1"] != null)
                add1 = DetailsDataTable[0]["Add1"];
            if (DetailsDataTable[0]["Add2"] != "" && DetailsDataTable[0]["Add2"] != null)
                add1 += ", " + DetailsDataTable[0]["Add2"];

            $("#Add1").html(add1);

            var add2 = "";
            if (DetailsDataTable[0]["Add3"] != "" && DetailsDataTable[0]["Add3"] != null)
                add2 = DetailsDataTable[0]["Add3"];

            $("#Add2").html(add2);


            var LastAdd = "";
            if (DetailsDataTable[0]["CityName"] != "" && DetailsDataTable[0]["CityName"] != null)
                LastAdd = DetailsDataTable[0]["CityName"];
            if (DetailsDataTable[0]["PinCode"] != "" && DetailsDataTable[0]["PinCode"] != null)
                LastAdd += "-" + DetailsDataTable[0]["PinCode"];
            if (DetailsDataTable[0]["StateName"] != "" && DetailsDataTable[0]["StateName"] != null)
                LastAdd += ", " + DetailsDataTable[0]["StateName"];

            $("#LastAdd").html(LastAdd);

            if (IsPayInc == "True") {
                $("#Amt").html('Rs.&nbsp;' + SplitData[10] + '');
                $("#AmtPaid").html('Rs.&nbsp;' + SplitData[2] + '');

                if (SplitData[9] == "True")
                    $("#PaymnetDiscount").html('Rs.&nbsp;' + SplitData[11]);
                else
                    $("#PaymnetDiscount").closest("tr").remove();

                $("#SConvenienceFee").closest("tr").remove();
                $("#DiscountTotalAmt").closest("tr").remove();
                $("#TotalAmt").closest("tr").remove();
            }
            else {
                if (SplitData[9] == "True") {
                    $("#Amt").html('Rs.&nbsp;' + SplitData[10] + '');
                    $("#PaymnetDiscount").html('Rs.&nbsp;' + SplitData[11]);
                    $("#DiscountTotalAmt").html('Rs.&nbsp;' + SplitData[12] + '');
                    $("#SConvenienceFee").html('Rs.&nbsp;' + SplitData[7] + '');

                    $("#TotalAmt").closest("tr").remove();
                }
                else {
                    $("#Amt").html('Rs.&nbsp;' + SplitData[10] + '');
                    $("#SConvenienceFee").html('Rs.&nbsp;' + SplitData[7] + '');
                    $("#TotalAmt").html('Rs.&nbsp;' + SplitData[2] + '');

                    $("#DiscountTotalAmt").closest("tr").remove();
                    $("#PaymnetDiscount").closest("tr").remove();
                }


                $("#AmtPaid").html('Rs.&nbsp;' + SplitData[2] + '');
            }

            var BalAmt = "";

            if (DetailsDataTable[0]["IsBillGen"] == "true") {
                BalAmt = DetailsDataTable[0]["BillAmount"];
            }
            else {
                BalAmt = DetailsDataTable[0]["BalanceAmount"];
            }

            var Cr = "";
            if (parseFloat(BalAmt) < 0)
                Cr = " ";
            else
                Cr = "  - ";
                //BalAmt = (BalAmt.toFixed(2)).replace("-", "") + "&nbsp;Cr.";
            BalAmt = (BalAmt.toFixed(2)).replace("-", "")
            // $("#BalanceAmt").html('Rs.&nbsp;' + BalAmt);


            if (localStorage.getItem("IsPrePostType") == 0)
                $("#WalletBalanceAmount").html('<i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' +Cr+ BalAmt);

            $("#CompanyName").text(DetailsDataTable[0]["Company"] == "" ? "" : DetailsDataTable[0]["Company"]);
            $("#CompanyAddress").text(DetailsDataTable[0]["CompAddress"] == "" ? "" : DetailsDataTable[0]["CompAddress"]);
            $("#ComapnyMobNo").text((DetailsDataTable[0]["CompMobNo"] == "" ? "" : "Mob. No.:-" + DetailsDataTable[0]["CompMobNo"]) + (DetailsDataTable[0]["CompPhoneNo"] == "" ? "" : " Phon. No.:-" + DetailsDataTable[0]["CompPhoneNo"]));
            $("#CompanyEmail").text(DetailsDataTable[0]["CompEmail"] == "" ? "" : "Email:-" + DetailsDataTable[0]["CompEmail"]);

            SplitData = null;
        }
        else
            document.location.replace('../Failed');
    }
    //}
    //else
    //    document.location.replace('../PaymentHistory');


    $('#slide-out li').removeClass("active");
    $('#slide-out li').each(function () {
        if ($(this).find("a").text() == "SuccessPage") {
            $(this).addClass("active");
        }
    });
});
