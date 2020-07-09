<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="SubscriptionSuccess.aspx.cs" Inherits="WebApplication1.SubscriptionSuccess" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/fromjs/SubscriptionSuccess.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.2"></script>
     <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
 <style>
          .SuccessImg { width: 65px; margin-right: 43px; float: left; }
        .SucessMianHead { width: 80%; float: left; }
            .SucessMianHead h4 { color: #009049; font-size: 28px; }
            .SucessMianHead h5 { font-size: 24px; }
        .SubsDetail { width: 100%; float: left; margin: 0px 10px 0px 10px; }

        .SubsDetailHead { float: left; width: 100%; border-bottom: 1px solid #d1d1d1; }
            .SubsDetailHead h5 { width: auto; float: left; margin: 0px 15px 8px 10px; font-size: 22px; color: #171717; }
         .SubsDetailHead span { width: auto; float: left; margin: 0px 15px 8px 10px; font-size: 18px; color: #171717; cursor :pointer; }

        .SubsDetail h5 { font-size: 15px; float: left; margin: 10px 15px 10px 0px; width: 43%; }
        .SubsDetail h6 { font-size: 15px; float: left; margin: 10px 0px 10px 0px; font-weight: 500; color: #000; }
        #ConnectionModelPrepaid { visibility: visible; animation-name: fadeInTop; z-index: 1003; /* display: none; */ opacity: 1; transform: scaleX(1); top: 10%; width: 30%; }

        .textred { color: red; }
        .removePrepaidPack { text-decoration: line-through; }
        /*margin-right: 5.5% !important*/
        .ProductdetailsMainLeft { float: left; border-top: 5px solid #d6a025 !important; border: 1px solid #d1d1d1; border-radius: 4px; width: 65%; }
        .ProductdetailsMainRight { float: left; border-top: 5px solid #d6a025 !important; border: 1px solid #d1d1d1; border-radius: 4px; width: 32%; margin-left: 21px; }
        .Productdetails h5 { float: left; font-size: 15px; padding: 0px 0px 0px 20px; margin: 0px; width: 87%; }
        .Productdetails h6 { float: right; font-size: 15px; padding: 0px 0px; margin: 0px; }
        .Productdetails { width: 100%; float: left; padding-left: 10px; padding-right: 11px; float: left; width: 100%; height: 350px; overflow-y: auto; }
            .Productdetails p { font-weight: 500; font-size: 16px; padding: 8px 10px; }
        .ProductdetailsMain { float: left; width: 100%; max-height: 0px !important; overflow-y: inherit !important; min-height: 0px !important; }
        .Productdetails h4 { font-size: 15px !important; padding: 8px 10px 8px 20px; margin: 0px; float: left; width: 100%; }
        #OrderDeatil { float: left; width: 100%; }
        .ProductDetailMain { width: 100%; float: left; margin-bottom: 9px; padding: 4px 0px 4px 0px; }
        .tags { float: left; margin-top: 0.5px !important; font-size: 15px; }
        .tags2 { float: right; font-size: 15px; }
            .tags2 h6 { margin-top: 0.5px !important; }
        .PackageRateMain { float: left; width: 100%; line-height: 2.5; }
        .list-unstyled { list-style: none; float: left; width: 100%; padding: 16px 10px 10px 20px; border-top: 1px solid #abaaaa; }
        .list-unstyled-right { list-style: none; float: left; width: 100%; padding: 1px 10px 10px 15px; height: 300px; overflow-y: auto; }
        .TransDetails { float: left; border-radius: 5px; border-top: 5px solid #d6a025; -webkit-box-shadow: 0px 0px 2px 0px rgba(133,133,133,1); -moz-box-shadow: 0px 0px 2px 0px rgba(133,133,133,1); box-shadow: 0px 0px 2px 0px rgba(133,133,133,1); padding: 10px 0px 10px 0px; width: 32%; margin: 0px 20px 20px 00px; }
        #BroadMainPrePaid { float: left; width: 100%; }
        #AlamainPrePaid { float: left; width: 100%; }
        #ReversalPacks { float: left; width: 100%; }
        .SummeryHeding { padding: 0px 0px 10px 10px; border-bottom: 1px solid #ddd; font-size: 23px; color: #d6a025; }
        ul.stepper:not(.horizontal) .step:not(:last-child).active { margin-bottom: 3px; }
        .card { border: none; margin-bottom: 8px; }
            .card .card-content p { margin-top: 20px; }

        /*Dashboard left design Start*/
        .vertical-timeline { position: relative; padding: 0px 7px 0px 0px; margin-top: 2em; margin-bottom: 2em; }
            .vertical-timeline.light-timeline:before { background: #e7eaec; }
            .vertical-timeline::before { content: ''; position: absolute; top: 0; left: 18px; height: 100%; width: 4px; background: #f1f1f1; }
        /*.vertical-timeline.light-timeline:first-child:before { background: red;}*/
        .GreenBg:before { background: #009049 !important; }

        .no-margins { margin: 0 !important; }
        .vertical-container { width: 100%; max-width: 1170px; margin: 0 auto; }
        .vertical-timeline-block:first-child { margin-top: 0px; margin-bottom: 0px; padding-bottom: 26px; }

        .vertical-timeline-block { position: relative; margin: 2em 0; }
        .navy-bg, .bg-primary { border: 2px solid #009049 !important; color: #009049 !important; background: #fff; }
        .vertical-timeline-icon { position: absolute; top: 0; left: 0; width: 40px; height: 40px; border-radius: 50%; font-size: 16px; border: 3px solid #f1f1f1; text-align: center; }
            .vertical-timeline-icon i { display: block; width: 24px; height: 24px; position: relative; left: 50%; top: 50%; margin-left: -12px; margin-top: -9px; }
        .vertical-timeline-content { position: relative; margin-left: 60px; border-radius: 0.25em; padding: 1px 0px 11px 0px; line-height: 2; }
        .vertical-timeline-block:after { content: ""; display: table; clear: both; }
        .yellow-bg, .bg-warning { border: 2px solid rgb(220, 168, 42) !important; color: rgb(220, 168, 42); background: #fff; }
        .lazur-bg, .bg-info { border: 2px solid #ff3939 !important; color: #fe2323; background: #fff; }
        /*.vertical-timeline-content::before {position: absolute; top: 16px; right: 100%; height: 0; width: 0; border: 7px solid transparent; }*/
        .Content1Before::before { border-right: 7px solid #21baff; }
        .Content2Before::before { border-right: 7px solid #e8bd1a; }
        .Content3Before::before { border-right: 7px solid #1ab394; }
        .Content2Before a { color: #fff; }
        .Verifications { line-height: 2; font-size: 16px; float: left; }
        .vertical-timeline-content p { font-size: 18px; padding-left: 5px; }
        .vertical-timeline-content h5 { font-size: 16px; margin-top: 9px; }
     .HtmlView { position: fixed; z-index: 1004; top: 0; right: 0; left: 0; padding:20px }
        .rotate { -webkit-animation: spin 2s linear infinite; -moz-animation: spin 2s linear infinite; animation: spin 2s linear infinite; }
        td, th {padding: 0;}
     #CloseBtn { right: 0; font-size: 18px; text-align: right; padding: 5px 25px 5px 0px; cursor: pointer;border-bottom: 1px solid #dfdfdf; margin-bottom: 10px; position: absolute; width: 100%; background: #fff;}
        /*Dashboard left design End*/

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
    <%--<link href="css/Connections.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />--%>
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section>
        <div class="container">

            <div class="col s12">
                <div style="margin: 0; margin-top: 20px; float: left; width: 100%; border-bottom: 1px solid #e3e3e3; padding-bottom: 16px;">
                    <img src="images/others/sucess.png" class="SuccessImg" />
                    <div class="SucessMianHead">
                        <h4>Transaction Successful</h4>                     
                    </div>
                </div>

                <div class="col s12" style="float: left; width: 100%; margin-top: 40px">
                    <div class="col m4 l4 TransDetails Subscription " style="border-color: #06924d;display:none">
                        <div class="SubsDetailHead">
                            <h5 style="color: #06924d;">Product Invoice Details </h5>
                            <span style="float:right; color: #06924d;" id="ViewInvoice" onclick="ViewDeatls(this)"><i class="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                        <div class="SubsDetail">
                            <h5>Invoice No. </h5>
                            <h6>:&nbsp;&nbsp; <span id="InvoiceNo"></span></h6>
                        </div>
                        <div class="SubsDetail">
                           <h5>Invoice Amount </h5>
                           <h6>:&nbsp;&nbsp; <span id="InvoiceAmt"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Invoice Date </h5>
                           <h6>:&nbsp;&nbsp; <span id="InvoiceDate"></span></h6>
                        </div>
                    </div>
                    <div class="col m4 l4 TransDetails Reversal" style="border-color: #ec407a;display:none">
                        <div class="SubsDetailHead">
                            <h5 style="color: #ec407a;">Product Reversal Details</h5>
                            <span style="float:right; color: #ec407a;" id="ViewReversal" onclick="ViewDeatls(this)"><i class="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                        <div class="SubsDetail">
                            <h5>Credit No. </h5>
                            <h6>:&nbsp;&nbsp; <span id="CreditNo"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Credit Amount </h5>
                            <h6>:&nbsp;&nbsp; <span id="CreditAmount"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Credit Date </h5>
                            <h6>:&nbsp;&nbsp; <span id="CreditDate"></span></h6>
                        </div>
                    </div>
                    <div class="col m4 l4 TransDetails Addmoney" style="border-color: #00BCD4;display:none">
                        <div class="SubsDetailHead">
                            <h5 style="color: #00bcd4;">Add Money Details</h5>
                            <span style="float:right; color: #00bcd4;"  id="ViewAddmoney" onclick="ViewDeatls(this)"><i class="fa fa-eye" aria-hidden="true"></i></span>
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
                    <div class="col m4 l4 TransDetails DebitNote" style="border-color: #06924d;display:none">
                        <div class="SubsDetailHead">
                            <h5 style="color: #06924d;">Debit Note Details</h5>
                            <span style="float:right; color: #06924d;"  id="ViewDebitNote" onclick="ViewDeatls(this)"><i class="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                        <div class="SubsDetail">
                            <h5>Debit Note No. </h5>
                            <h6>:&nbsp;&nbsp; <span id="DebitNoteNo"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Debit Note Amount </h5>
                            <h6>:&nbsp;&nbsp; <span id="DebitNoteAmount"></span></h6>
                        </div>
                        <div class="SubsDetail">
                            <h5>Debit Note Date </h5>
                            <h6>:&nbsp;&nbsp; <span id="DebitNoteDate"></span></h6>
                        </div>
                    </div>
                </div>


                <div style="margin-top: 20px; float: left; width: 100%">
                    <div id="OrderDeatil">
                        <div class="ProductdetailsMainLeft">
                            <h5 class="SummeryHeding">Product Summary</h5>
                            <div class="Productdetails" style="padding-left: 0px;">
                                <div id="PrePaidFinalSummery" style="display: block;">
                                    <div id="RecPackMainPrePaid" style="display: block; float: left; width: 100%">
                                        <p style="color: #000; font-weight: 600;">Recommended Packs</p>
                                        <div id="FinalRecommendedPackPre" class="FinalPrepaid" style="display: block;"></div>
                                    </div>
                                    <div id="BroadMainPrePaid" style="display: none;float: left; width: 100%"">
                                           <p style="color: #000; font-weight: 600;">Broadcaster Packs</p>
                                           <div id="FinalBrodcastPackPre" class="FinalPrepaid" style="display: block;"></div>
                                     </div>
                                    <div id="AlamainPrePaid" style="display: none;float: left; width: 100%"">
                                              <p style="color: #000; font-weight: 600;">à la carte</p>
                                           <div id="FinalAlaCartePackPre" class="FinalPrepaid" style="display: block;"></div>
                                     </div>

                                       
                                </div>
                               

                             
                            </div>
                           
                        </div>

                        <div class="ProductdetailsMainRight">
                            <h5 class="SummeryHeding">Order Summary</h5>
                            <ul class="list-unstyled-right">
                                <li class="PackageRateMain">
                                    <span class="tags" style="font-weight: 600; color: #000; font-size: 16px">Sub Total (Products)<span class="ProductCount"></span></span>
                                    <h6 class="tags2" style="font-weight: 600; color: #000; font-size: 16px">Rs.&nbsp;<span class="val" id="ProductSubTotal"></span></h6>
                                </li>
                                <li class="PackageRateMain">
                                    <div class="tags">Tax On Product</div>
                                    <h6 class="tags2">Rs.&nbsp;<span class="val" id="TaxPre"></span></h6>
                                </li>
                                <li class="PackageRateMain Reversal" style="display: none; margin-top: 1%">
                                    <span class="tags">Sub Total (Product Reversal)<span class="ReverseProductCount"></span></span>
                                    <h6 class="tags2">Rs.&nbsp;<span class="val" id="ReversalTotal"></span></h6>
                                </li>
                                <li class="PackageRateMain Reversal" style="display: none">
                                    <span class="tags">Tax on product Reversal</span>
                                    <h6 class="tags2">Rs.&nbsp;<span class="val" id="TaxReversal"></span></h6>
                                </li>
                                <li class="PackageRateMain" style="margin-top: 1%">
                                    <div class="tags">NCF  <span class="NetworkFeeCount"></span></div>
                                    <h6 class="tags2">Rs.&nbsp;<span class="val" id="NetworkFeePre"></span></h6>
                                </li>
                                <li class="PackageRateMain">
                                    <div class="tags">Tax On NCF</div>
                                    <h6 class="tags2">Rs.&nbsp;<span class="val" id="NCFTaxPre"></span></h6>
                                </li>
                            </ul>
                            <ul class="list-unstyled" style="padding: 6px 12px 0px 24px">
                                <li class="PackageRateMain">
                                    <span class="tags" style="font-weight: 600; ">Grand Total</span>
                                    <h6 class="tags2" style="font-weight: 600; padding-bottom: 12px;">Rs.&nbsp;<span class="val" id="GradTotal"></span></h6>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div class="SubsDetail" style="margin-top: 20px; float: left; width: 97%; margin-bottom: 59px;">
                    <span><b>Note</b>: Your transaction has been processed. It will take effect on your subscription within <span id="hour">24</span> hr.</span>
                </div>
            </div>
        </div>
    </section>

        <div class="lean-overlay" id="DocumentView" style="z-index: 1003; opacity: 0.5; display: none; background: rgba(68, 69, 70, 0.4) !important; opacity: 0.8"></div>
        <div class="HtmlView" style="display:none;">
             
        <div style="overflow-y: auto; max-height: 800px; border-radius: 5px; min-height:350px; width: 1009px; margin: 0 auto; background:#fff; position:relative">
            <p id="CloseBtn"><i class="fa fa-times" aria-hidden="true"></i></p>
            <div  id="HTMLView" style="padding:47px 10px 0px 10px;" >

                </div>
            </div>

    </div>

    
</asp:Content>
