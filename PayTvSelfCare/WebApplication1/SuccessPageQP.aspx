<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SuccessPageQP.aspx.cs" Inherits="WebApplication1.SuccessPageQP" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .mainDiv { padding: 15px; word-wrap: break-word; }
        .marginBottom { margin-bottom: 1px; }
        .headingDiv { text-align: center; font-size: 18px; }
        /*.headingDiv p { background: #fd9932; color: #FFF; }*/

        .padding { padding: 0px; }
        .txtalign { text-align: right; }
        #SuccessReceipt { margin-bottom: 0px; margin-top: 26px; }
        .BackBtns { float: left; color: #0099fd; }
        .Dawnloadbtn { float: right; color: #0099fd; }
        .BackDwBtn { width: 970px; margin: 0px auto; font-size: 17px; font-weight: 600; }
            .BackDwBtn a:hover { text-decoration: none; color: #0099fd; }
    </style>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/style.min.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="QuickPay/css/QuickPay.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />

    <script src="js/jquery-1.12.3.min.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>

    <script src="QuickPay/js/SucessPageQP.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
</head>
<body>
    <section id="content">
        <div class="container" style="color: #484848; margin-top: 50px;">
            <div class="BackDwBtn">
                <a class="BackBtns" href="javascript:(0)" onclick="javascript:BackTohomePage(); return false;"><i style="padding-right: 10px;" class="fa fa-arrow-left" aria-hidden="true"></i>Back</a>
                <a class="Dawnloadbtn" href="javascript:(0)" onclick="javascript:DownloadPayRecpt(); return false;"><i style="padding-right: 10px;" class="fa fa-download" aria-hidden="true"></i>Download</a>
            </div>
            <div id="SuccessReceipt">
            </div>

        </div>
    </section>
    <div class="ErrorShowMian" style="display: none">
        <div class="ErrorMsgBox">
            <div class="ErrorMsgicon" style="display: block;">
                <img src="images/others/ErrorMasg.png" />
            </div>
            <p class="errortext" id="ErrorText">.</p>
            <div class="confirm-buttons">
                <a href="javascript:void(0)" onclick="javascript:GetRceipt()" class="RetryBtn" style="display:inline-block">Retry</a>
                <a href="javascript:void(0)" onclick="javascript:CloseError()">OK</a>
            </div>
        </div>
    </div>
</body>
</html>
