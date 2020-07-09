<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CancelPageQP.aspx.cs" Inherits="WebApplication1.CancelPageQP" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/style.min.css" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="QuickPay/css/QuickPay.css" rel="stylesheet" />
    <script src="QuickPay/js/CancelPage.js"></script>
</head>
<body>

    <div class="container" id="CancelReceipt" style="color: gray; text-align: center;">
        <div style="width: 50%; margin: 0 auto; margin-top: 10%; -webkit-box-shadow: 0px 0px 3px 0px rgba(138,138,138,1); -moz-box-shadow: 0px 0px 3px 0px rgba(138,138,138,1); box-shadow: 0px 0px 3px 0px rgba(138,138,138,1);">
            <i class="fa fa-exclamation-circle" style="color: #e80303; font-size: 100px; margin-top: 8%; margin-bottom: 5%;"></i>
            <h6 style="font-family: inherit; font-size: 18px; margin-bottom: 4%; line-height: 32px;">Transaction is Failed/Cancelled, no payment has been made through online process.</h6>
            <a style="padding: 8px 8rem; color: #5d5d5d; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12); font-weight: 500; margin-bottom: 40px; background: #FFF !important;" class="waves-effect waves-light btn modal-trigger  light-blue" href="javascript:void(0);" onclick="javascript:BackToDashboard(); return false;">Dismiss</a>
        </div>
    </div>

    <div class="container" id="PaymnetInSync" style="color: gray; text-align: center; display: none;">
        <div style="width: 50%; margin: 0 auto; margin-top: 10%; -webkit-box-shadow: 0px 0px 3px 0px rgba(138,138,138,1); -moz-box-shadow: 0px 0px 3px 0px rgba(138,138,138,1); box-shadow: 0px 0px 3px 0px rgba(138,138,138,1);">
            <i class=" mdi-action-query-builder" style="color: #e80303; font-size: 100px; margin-top: 8%;"></i>
            <h6 style="font-family: inherit; font-size: 18px; line-height: 32px;">Dear customer your payment is in under process. So, Please do not attempt to pay again, Your payment of <b id="PayAmt"></b>will be completed within 24 Hrs.</h6>
            <a style="padding: 8px 8rem; color: #5d5d5d; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12); font-weight: 500; margin-bottom: 40px; background: #FFF !important; margin-top: 5%;" class="waves-effect waves-light btn modal-trigger  light-blue" href="javascript:void(0);" onclick="javascript:BackToDashboard(); return false;">Done</a>
        </div>
    </div>

</body>
</html>
