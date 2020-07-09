<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="CancelPage.aspx.cs" Inherits="WebApplication1.CancelPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <script src="Scripts/WebForms/CancelPage.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="container" id="CancelReceipt" style="color: gray; text-align: center;">
        <i class="fa fa-exclamation-circle" style="color: #e80303; font-size: 100px; margin-top: 12%; margin-bottom: 5%;"></i>
        <h6 style="font-family: inherit; font-size: 18px; margin-bottom: 4%;">Transaction is Failed/Cancelled, no payment has been made through online process.</h6>
        <a style="padding: 0 8rem; color: #5d5d5d; font-weight: 500; background: #FFF !important;" class="waves-effect waves-light btn modal-trigger  light-blue" href="javascript:void(0);" onclick="javascript:BackToDashboard(); return false;">Dismiss</a>
    </div>

    <div class="container" id="PaymnetInSync" style="color: gray; text-align: center; display: none;">
        <i class=" mdi-action-query-builder" style="color: #e80303; font-size: 100px; margin-top: 8%;"></i>
        <h6 style="font-family: inherit; font-size: 18px;">Dear customer your payment is in under process. So, Please do not attempt to pay again, Your payment of <b id="PayAmt"></b>will be completed within 24 Hrs.</h6>
        <a style="padding: 0 8rem; color: #5d5d5d; font-weight: 500; background: #FFF !important; margin-top: 5%;" class="waves-effect waves-light btn modal-trigger  light-blue" href="javascript:void(0);" onclick="javascript:BackToDashboard(); return false;">Done</a>
    </div>

</asp:Content>
