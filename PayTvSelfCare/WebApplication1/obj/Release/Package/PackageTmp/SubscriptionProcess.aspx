<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="SubscriptionProcess.aspx.cs" Inherits="WebApplication1.SubscriptionProcess" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <script src="js/fromjs/SubscriptionProcess.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
         <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.1"></script>
    <style>
        .SucessMianHead {
            width: 80%;
            float: left;
        }

        .card {
            box-shadow: none !important;
        }

        .tags {
            float: left;
            margin-top: 0.5px !important;
            font-size: 15px;
        }

        .tags2 {
            float: right;
            font-size: 15px;
        }

            .tags2 h6 {
                margin-top: 0.5px !important;
            }

        .list-unstyled {
            list-style: none;
            float: left;
            width: 100%;
            padding: 16px 10px 10px 20px;
            border-top: 1px solid #abaaaa;
        }

        .list-unstyled-right {
            list-style: none;
            float: left;
            width: 100%;
            padding: 1px 10px 10px 15px;
            height: 300px;
            overflow-y: auto;
        }

        .TransDetails {
            float: left;
            border-radius: 5px;
            border-top: 5px solid #d6a025;
            -webkit-box-shadow: 0px 0px 2px 0px rgba(133,133,133,1);
            -moz-box-shadow: 0px 0px 2px 0px rgba(133,133,133,1);
            box-shadow: 0px 0px 2px 0px rgba(133,133,133,1);
            padding: 10px 0px 10px 0px;
            width: 32%;
            margin: 0px 20px 20px 00px;
        }

        .SummeryHeding {
            padding: 0px 0px 10px 10px;
            border-bottom: 1px solid #ddd;
            font-size: 23px;
            color: #d6a025;
        }

        ul.stepper:not(.horizontal) .step:not(:last-child).active {
            margin-bottom: 3px;
        }


        .vertical-timeline {
            position: relative;
            padding: 0px 7px 0px 0px;
            margin-top: 2em;
            margin-bottom: 2em;
        }

            .vertical-timeline.light-timeline:before {
                background: #e7eaec;
            }

            .vertical-timeline::before {
                content: '';
                position: absolute;
                top: 0;
                left: 18px;
                height: 100%;
                width: 4px;
                background: #f1f1f1;
            }
        /*.vertical-timeline.light-timeline:first-child:before { background: red;}*/
        .GreenBg:before {
            background: #009049 !important;
        }
        .yelloBg:before {
            background: rgb(220, 168, 42) !important;
        }
        .redBg:before {
            background: #fe2323 !important;
        }
        .GrayBg:before {
            background: #f1f1f1 !important;
        }

        .no-margins {
            margin: 0 !important;
        }

        .vertical-container {
            width: 100%;
            max-width: 1170px;
            margin: 0 auto;
        }

        .vertical-timeline-block:first-child {
            margin-top: 0px;
            margin-bottom: 0px;
            padding-bottom: 26px;
        }

        .vertical-timeline-block {
            position: relative;
            margin: 2em 0;
        }

        .navy-bg, .bg-primary {
            border: 2px solid #009049 !important;
            color: #009049 !important;
            background: #fff;
        }

        .vertical-timeline-icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 16px;
            border: 3px solid #f1f1f1;
            text-align: center;
        }

            .vertical-timeline-icon i {
                display: block;
                width: 24px;
                height: 24px;
                position: relative;
                left: 50%;
                top: 50%;
                margin-left: -12px;
                margin-top: -9px;
            }

        .vertical-timeline-content {
            position: relative;
            margin-left: 60px;
            border-radius: 0.25em;
            padding: 1px 0px 11px 0px;
            line-height: 2;
        }

        .vertical-timeline-block:after {
            content: "";
            display: table;
            clear: both;
        }

        .yellow-bg, .bg-warning {
            border: 2px solid rgb(220, 168, 42) !important;
            color: rgb(220, 168, 42);
            background: #fff;
        }

        .lazur-bg, .bg-info {
            border: 2px solid #ff3939 !important;
            color: #fe2323;
            background: #fff;
        }
        /*.vertical-timeline-content::before {position: absolute; top: 16px; right: 100%; height: 0; width: 0; border: 7px solid transparent; }*/
        .Content1Before::before {
            border-right: 7px solid #21baff;
        }

        .Content2Before::before {
            border-right: 7px solid #e8bd1a;
        }

        .Content3Before::before {
            border-right: 7px solid #1ab394;
        }

        .Content2Before a {
            color: #fff;
        }

        .Verifications {
            line-height: 2;
            font-size: 16px;
            float: left;
        }

        .vertical-timeline-content p {
            font-size: 18px;
            padding-left: 5px;
        }

        .vertical-timeline-content h5 {
            font-size: 16px;
            margin-top: 9px;
        }

        .rotate {
            -webkit-animation: spin 2s linear infinite;
            -moz-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
        }

        #SubscriptionModel {
            width: 27% !important;
        }

        .card {
            border: none;
            margin-bottom: 8px;
        }

            .card .card-content p {
                margin-top: 20px;
            }

        @media screen and (max-width: 1280px) {
            #SubscriptionModel {    width: 33% !important;}
        }
        @media screen and (max-width: 1030px) {
            #SubscriptionModel {    width: 46% !important;}
        }
         @media screen and (max-width: 778px) {
            #SubscriptionModel {    width: 53% !important;}
        }
         @media screen and (max-width: 650px) {
            #SubscriptionModel {    width: 65% !important;}
        }
         @media screen and (max-width: 550px) {
            #SubscriptionModel {    width: 92% !important;}

        }

         @media screen and (max-width: 550px) {
            .ml-50 {    margin-left: 13px !important;}
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="lean-overlay" id="materialize-lean-overlay-2" style="z-index: 999999; display: block; opacity: 1;">
        <div id="SubscriptionModel" class="modal" style="display: block; top: 20%">
            <div class="modal-content">
                <div class="container">
                    <div class="navbar-header">
                        <div class="navbar-brand">
                            <div class="brandlogo" style="display: none;">
                                <img src="Images/MyCableTvLogoIn.png" />
                            </div>
                        </div>
                        <div style="float: left; margin-left: 18px; margin-top: -5px;">
                            <label id="SubsAmtType" style="font-size: 18px; color: #FFF;"></label>
                            <label id="TopTitleAmt" style="font-size: 18px; color: #FFF;"></label>
                        </div>
                        <div style="float: right; margin-top: -2px; margin-right: -10px; font-size: 18px;"><a href="javascript:void(0);" onclick="javascript:closePaymentBox(); return false;" style="color: #FFF;"><i class="fa fa-times"></i></a></div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>
            <div class="model-email-content">

                <div class="card">
                    <div class="card-content">
                        <p class="mt-20" id="error" style="color: red">
                            Transaction in process, Do not refresh or close this page. We appreciate your patience.
                        </p>
                        <div id="profile-page-sidebar" class="col s12 m4 mt-20 ml-50">

                            <div id="vertical-timeline" class="vertical-container yelloBg vertical-timeline light-timeline no-margins">
                                <div class="vertical-timeline-block ">
                                    <div class="vertical-timeline-icon lazur-bg rotate Step1">
                                        <i class="fa fa-spinner "></i>
                                    </div>

                                    <div class="vertical-timeline-content Content1Before">
                                        <h5><span id="Step1">Payment in verification  </span>&nbsp;  <span style="color: #0099fd; padding-top: 0px; cursor: pointer; text-decoration: underline; display: none" id="Retry" onclick="javascript:Retry()">Verify</span></h5>
                                    </div>
                                </div>
                            </div>

                            <div class="vertical-container yelloBg  vertical-timeline light-timeline no-margins">
                                <div class="vertical-timeline-block">
                                    <div class="vertical-timeline-icon yellow-bg Step2">
                                        <i class="fa fa-exclamation"></i>
                                    </div>

                                    <div class="vertical-timeline-content Content2Before">
                                        <h5 id="Step2">Balance update in process</h5>
                                    </div>
                                </div>
                            </div>

                            <div class="vertical-container light-timeline no-margins">
                                <div class="vertical-timeline-block">
                                    <div class="vertical-timeline-icon yellow-bg Step3">
                                        <i class="fa fa-exclamation"></i>
                                    </div>

                                    <div class="vertical-timeline-content Content2Before">
                                        <h5 id="Step3">Subscription in process</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="step-actions" style="text-align: center">
                            <button class="waves-effect waves-dark btn blue next-step" data-feedback="GetPaymentTransID" onclick="javascript:CancelTrans(); return false;">Cancel</button>
                            <%-- <button class="waves-effect waves-dark btn blue next-step" data-feedback="GetPaymentTransID">Retry</button>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
