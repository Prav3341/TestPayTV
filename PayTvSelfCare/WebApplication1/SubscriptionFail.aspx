<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="SubscriptionFail.aspx.cs" Inherits="WebApplication1.SubscriptionFail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script src="js/fromjs/SubscriptionFail.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.2"></script>
     <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
     <style>
        .SuccessImg { width: 65px; margin-right: 43px; float: left; }
        .SucessMianHead { width: 80%; float: left; }
        .SucessMianHead h4 { color: red; font-size: 28px; }
        .SucessMianHead h5 { font-size: 24px; }
        .SubsDetail { width: 100%; float: left; margin: 0px 10px 0px 10px; }
        .SubsDetailHead { float: left; width: 100%; border-bottom: 1px solid #d1d1d1; }
        .SubsDetailHead h5 { width: auto; float: left; margin: 0px 15px 8px 10px; font-size: 22px; color: #171717; }
        .SubsDetail h5 { font-size: 15px; float: left; margin: 10px 15px 10px 0px; width: 43%; }
        .SubsDetail h6 { font-size: 15px; float: left; margin: 10px 0px 10px 0px; font-weight: 500; color: #000; }
        .TransDetails { float: left; border-radius: 5px; border-top: 5px solid #d6a025; -webkit-box-shadow: 0px 0px 2px 0px rgba(133,133,133,1); -moz-box-shadow: 0px 0px 2px 0px rgba(133,133,133,1); box-shadow: 0px 0px 2px 0px rgba(133,133,133,1); padding: 10px 0px 10px 0px; width: 32%; margin: 0px 20px 20px 00px; }
       
       
    @media screen and (max-width: 1786px) {
            .TransDetails { width: 31%; }
        }

        @media screen and (max-width: 1300px) {
            .SubsDetail h5 { width: 50%; }
        }

        @media screen and (max-width: 1144px) {
            .TransDetails { width: 47%; }
            .ProductdetailsMainLeft { width: 100%; }
            .ProductdetailsMainRight { width: 100%; margin-left: 0px; margin-top: 20px; }
        }

        @media screen and (max-width: 693px) {
            .TransDetails { width: 100%; }
        }

        @media screen and (max-width: 580px) {
            .SubsDetail h5 { width: 63%; }
            .SucessMianHead { width: 63%; }
            .SuccessImg { width: 52px; margin-right: 27px; }
            .SucessMianHead h4 { font-size: 24px; }
            .SucessMianHead h5 { font-size: 18px; }
        }

        @media screen and (max-width: 500px) {
            .SubsDetail h5 { width: 43%; }
        }

        @media screen and (max-width: 420px) {
            .SucessMianHead { width: 73%; }
            .SubsDetail h5 { width: 43%; font-size: 14px; }
            .SubsDetail h6 { font-size: 14px; }
            .SucessMianHead h4 { font-size: 20px; }
            .SucessMianHead h5 { font-size: 14px; }
            .SuccessImg { width: 49px; margin-right: 19px; }
        }
       
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section>
        <div class="container">
            <div class="col s12">
                <div style="margin: 0;float: left; width: 100%; border-bottom: 1px solid #e3e3e3; padding-bottom: 16px;">
                    <img src="images/others/Fail.png" class="SuccessImg" />
                    <div class="SucessMianHead">
                        <h4>Transaction Failed</h4>
                        <%--<h5>Your subscription has been failed. Details of transactions are included below.</h5>--%>
                    </div>
                </div>
                <div style="margin: 0px 0px 0px 15px;">
                    <div style="margin-top: 20px;">
                        <div class="Failmsg">
                             <h5 style="color:red;text-align:center" id="">Oops! Something went wrong</h5>
                             <h6 style="font-family: inherit; font-size: 18px; margin-bottom: 4%;text-align:center">We regret to inform you that we could not complete your transaction . Please try again later.</h6>
                             <h6 style="font-family: inherit; font-size: 18px; margin-bottom: 4%;text-align:center" id="Failmsg"></h6>
                        </div>
                        <div class="col s12" style="float: left; width: 100%; margin-top: 40px">
                      <div class="col m4 l4 TransDetails Addmoney" style="border-color: #00BCD4;display:none">
                        <div class="SubsDetailHead">
                            <h5 style="color: #00bcd4;">Add Money Details</h5>
                        </div>
                        <div class="SubsDetail">
                            <h5>Receipt No. </h5>
                            <h6>:&nbsp;&nbsp; <span id="RecpNo"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Receipt Amount </h5>
                            <h6>:&nbsp;&nbsp; <span id="ReceiptAmount"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Receipt Date </h5>
                            <h6>:&nbsp;&nbsp; <span id="ReceiptDate"></span></h6>
                        </div>
                    </div>
                   </div>
                    </div>
                </div>
              </div>
        </div>

    </section>
</asp:Content>
