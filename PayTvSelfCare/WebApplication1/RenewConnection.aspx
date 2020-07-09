<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="RenewConnection.aspx.cs" Inherits="WebApplication1.RenewConnection" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/Connections.css" rel="stylesheet" />
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/RenewConnection.js?ver=0.0.17?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.1"></script>
    <style>
        #MangePacks { width: 67%; float: left; }
        #myform { text-align: center; padding: 0px; margin: 0px 5px 0px 0px; float: left; }
        .qty { width: 40px !important; text-align: center; height: 23px !important; border: 0px !important; background: #eee; pointer-events: none; }
        input.qtyplus { width: 25px; height: 25px; }
        input.qtyminus { width: 25px; height: 25px; }
        #myform { border: 2px solid #f4c93c; }
        .AddBtn { border: 0px !important; background: #0000 !important; border-left: 2px solid #f4c93c !important; }
        .LessBtn { border: 0px !important; background: #0000 !important; border-right: 2px solid #f4c93c !important; }
        #ConnectionModelPrepaid { visibility: visible; animation-name: fadeInTop; z-index: 1003; /* display: none; */ opacity: 1; transform: scaleX(1); top: 10%; width: 30%; }
        #ApplyProduct { visibility: visible; animation-name: fadeInTop; z-index: 1003; opacity: 1; transform: scaleX(1); top: 30%; width: 28%; }
        #ConnectionDetails { font-size: 18px; }

        .PreapaidSetting:hover .tooltiptext { visibility: visible; opacity: 1; }
        .ProductTenure { float: left; width: 40%; }
        .tooltiptext { visibility: hidden; width: auto; background-color: #555; color: #fff; text-align: center; border-radius: 6px; padding: 5px 5px; position: absolute; z-index: 999999; bottom: 83%; opacity: 0; transition: opacity 0.3s; }
            .tooltiptext::after { content: ""; position: absolute; top: 50%; left: 100%; margin-top: -5px; border-width: 5px; border-style: solid; border-color: transparent transparent transparent #555; }
        .tooltip-left { top: -5px; bottom: auto; right: 7%; }
        .RenwProdusDetails { min-height: 637px; overflow-x: auto; max-height: 637px; padding: 0; margin-bottom: 65px; width: 100%; }
        .RenewalData { -webkit-box-shadow: 0px 0px 7px 0px rgb(171, 171, 171); -moz-box-shadow: 0px 0px 7px 0px rgba(112,112,112,1); box-shadow: 0px 0px 7px 0px rgb(171, 171, 171); margin-top: 0px; }
        #RenewConnectionTotal { float: right; width: 30%; background: #fff; margin-top: 0px; -webkit-box-shadow: 0px 0px 7px 0px rgb(171, 171, 171); -moz-box-shadow: 0px 0px 7px 0px rgba(112,112,112,1); box-shadow: 0px 0px 7px 0px rgb(171, 171, 171); margin-left: 21px; margin-bottom: 68px; }
        .RemoveTxt { font-size: 12px; color: #000; font-weight: 500; padding: 0px; margin: 0px; text-align: center; }
        .RenewApllyNowBtn { background: #0099fd; text-align: center; color: #fff; padding: 14px 51px; margin: 0px 0% 10px 15%; float: left; border-radius: 4px; width: 70%; cursor: pointer; }
        .PacksName { font-size: 14px; }
        .ProductDateExp { padding-right: 16px;  text-align: center; }

        @media only screen and (max-width: 1290px) {
            #MangePacks { width: 100%; }
            #RenewConnectionTotal { width: 100%; }
        }
         @media only screen and (max-width: 1100px) {
            #ConnectionModel { width: 80%; }
            #ConnectionModelPrepaid { width: 80%; }
            #ApplyProduct {width: 80%; }
        }

        @media only screen and (max-width: 800px) {
            .ProductTenure { width: 32%; }
        }

        @media only screen and (max-width: 662px) {
            .ProductTenure { width: 54%; }
        }
        @media only screen and (max-width: 400px) {
            #ApplyProduct {width: 95%; }
            #Conectrionmain a { margin-bottom: 6px;}
            #ConnectionModel { width: 95%; }
            #ConnectionModelPrepaid { width: 95%; }
        }
        .textred { color: red; }
        .removePrepaidPack { text-decoration: line-through; }
        /*margin-right: 5.5% !important*/
        .SmartCardno { font-size: 16px; }

        .ChannelaHeading { float: left; color: #464646; padding-left: 19px; padding-top: 5px; font-size: 16px; }
        #AllChannelList .collapsible-body { border-bottom: 0px; }

        #AllChannelList .collapsible-header:before { color: #ececec; }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" style="min-height: 75px !important;">
        <div class="row">
            <div class="col m9 l9">
                <h5 class="breadcrumbs-title" id="ContentTopBarTittle">Renew My Packs And Channels <span id="ConnectionDetails"></span> </h5>
                <p id="PackSubTitle" style="font-size: 13px;">You are currently subscribed to the following pack(s).</p>
            </div>
            <div class="col m3 l3" style="text-align: right; padding-top: 2%;" id="ManagePakege">
                <a class="waves-effect waves-light  btn" onclick="javascript:GoBackMyConnection(); return false;">Back</a>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="RenewPackage section">
            <section class="plans-container" id="MangePacks" style="display: block;">
                <div id="MajorPack" class="RenewalData">
                    <div class="PackegsHeading">Your Packs and Channels</div>
                    <div class="RenwProdusDetails" id="RenwProdusDetails">
                        
                    </div>
                </div>
            </section>
            <section class="plans-container" id="RenewConnectionTotal" style="display: block;">
                <div class="SummeryHedding">
                    <h4>Selected Packs and Channels</h4>
                </div>
                <div class="ProductdetailsMain">
                    <div class="Productdetails">
                        <div id="RecPackMain" style="display: block;">
                            <p>Recommended Packs</p>
                            <div id="RecommendedPack" style="float: left; width: 100%;">
                            </div>
                        </div>
                        <div id="BroadMain" style="">
                            <p>Broadcaster Packs</p>
                            <div id="BrodcastPack" style="float: left; width: 100%;">
                            </div>
                        </div>
                        <div id="Alamain" style="">
                            <p>à la carte</p>
                            <div id="AlaCartePack" style="float: left; width: 100%;">
                            </div>
                        </div>

                    </div>
                </div>

                <div style="width: 100%; float: left;" class="">
                    <a class="RenewApllyNowBtn" id="ConnectionChanges" onclick="javascript:GetNewConnectionDetail()" style="background: rgb(0, 153, 253);">Proceed</a>
                </div>
            </section>

        </div>
    </div>
     <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 1002; opacity: 0.5; display: none; background: #444546 !important; opacity: 0.8"></div>
     <div id="ConnectionModelPrepaid" class="modal" style="max-height: 80%; overflow-y: auto; min-height: 60%;">
        <div class="modal-content" style="padding: 0px;">
            <nav style="background-color: #FC8002;">
                <div class="nav-wrapper ConnectionHead">
                    <div class="left col s12 m5 l5">
                        <ul>
                            <li><a href="javascript:void(0);" class="email-type SummryHedding" style="pointer-events: none;">&nbsp;&nbsp; Final Summery</a></li>
                        </ul>
                    </div>
                    <div class="col s12 m7 l7 hide-on-med-and-down">
                        <ul class="right">
                            <li><a href="javascript:void(0);" title="Close"><i class="mdi-navigation-close modal-close"></i></a></li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
        <div class="model-email-content">
            <div class="row" style="margin-bottom: 10px;">
                <form class="col s12">
                    <div class="row" style="margin-bottom: 0px;">
                        <div class="ProductdetailsMain2" style="max-height: 280px; overflow-y: auto; min-height: 220px;">
                            <div class="Productdetails" style="padding-left: 0px;">
                                <div id="PrePaidFinalSummery" style="display: block">
                                    <div id="RecPackMainPrePaid" style="display: block">
                                        <p>Recommended Packs</p>
                                        <div id="FinalRecommendedPackPre" class="FinalPrepaid" style="float: left; width: 100%;"></div>
                                    </div>
                                    <div id="BroadMainPrePaid" style="display: none">
                                        <p>Broadcaster Packs</p>
                                        <div id="FinalBrodcastPackPre" class="FinalPrepaid" style="float: left; width: 100%;"></div>

                                    </div>
                                    <div id="AlamainPrePaid" style="display: none">
                                        <p>à la carte</p>
                                       <div id="FinalAlaCartePackPre" class="FinalPrepaid" style="float: left; width: 100%;"></div>
                                    </div>
                                   
                                    <div id="ReversalPacks Reversal" style="display: none">
                                        <p>Reversal Packs</p>
                                        <div id="ReversalPrePaid" style="float: left; width: 100%;">
                                            <div class="ProductDetailMain" style="color: red;">
                                                <h5>Reliable Tv Base Pack</h5>
                                                <h6>Rs.&nbsp; <span class="RecommendRate">100.00</span><span style="color: red; margin-left: 10px; cursor: pointer; display: none;" onclick="javascript:DeleteRecomPack(check1,'MPkg')"><i class="fa fa-trash-o" aria-hidden="true"></i></span></h6>
                                                <div style="float: left; padding-left: 10px; font-size: 14px;">
                                                    <p style="display: inline-block; font-size: 14px;">Reversal Period : </p>
                                                    <span>26-Nov-2019</span> &nbsp; To &nbsp;<span> 25-Jan-2019</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                        <ul class="list-unstyled">
                            <li class="PackageRateMain">
                                <span class="tags">Sub Total (Products)<span class="ProductCount"></span></span>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="ProductSubTotalPre">0.00</span></h6>
                            </li>
                            <li class="PackageRateMain">
                                <div class="tags">Tax On Product</div>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="TaxPre">0.00</span></h6>
                            </li>


                            <li class="PackageRateMain Reversal" style="display: none; margin-top: 1%">
                                <span class="tags">Sub Total (Product Reversal)<span class="ReverseProductCount"></span></span>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="ReversalTotal">0.00 </span></h6>
                            </li>
                            <li class="PackageRateMain Reversal" style="display: none">
                                <span class="tags">Tax on product Reversal</span>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="TaxReversal">0.00 </span></h6>
                            </li>
                            <li class="PackageRateMain" style="margin-top: 1%">
                                <div class="tags">NCF  <span class="NetworkFeeCount"></span></div>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="NetworkFeePre"></span></h6>
                            </li>
                            <li class="PackageRateMain">
                                <div class="tags">Tax On NCF</div>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="NCFTaxPre">0.00</span></h6>
                            </li>
                            <li class="PackageRateMain" style="padding-top: 8px;">
                                <span class="tags" style="font-weight: 600;">Grand Total</span>
                                <h6 class="tags2" style="font-weight: 600; padding-bottom: 20px;">Rs.&nbsp;<span class="val" id="GradTotal">0.00</span></h6>
                            </li>



                        </ul>

                    </div>



                    <div style="width: 100%; float: left; padding-top: 11px;">
                       <a class="ApllyNowBtn FinalPrepaid" onclick="javascript:ConfirmandApply()" id="ApplyNowPre">Apply Now</a>
                   </div>
                </form>
            </div>
        </div>

    </div>

    <div class="lean-overlay" id="materialize-lean-overlay-3" style="z-index: 1003; opacity: 0.5; display: none; background: rgba(68, 69, 70, 0.4) !important; opacity: 0.8"></div>
    
    <div id="ApplyProduct" class="modal" style="z-index: 1003; max-height: 50%; overflow-y: auto; min-height: 40%; display: none">
        <div class="modal-content" style="padding: 0px;">
            <nav style="background-color: #FC8002;">
                <div class="nav-wrapper ConnectionHead">
                    <div class="left col s12 m5 l5">
                        <ul>
                            <li><a href="javascript:void(0);" class="email-type" style="pointer-events: none;">&nbsp;&nbsp; Subscription Confirmation</a></li>
                        </ul>
                    </div>
                    <div class="col s12 m7 l7 hide-on-med-and-down">
                        <ul class="right">
                            <li><a href="javascript:void(0);" onclick="javascript:closepopup(this); return false;" title="Close"><i class="mdi-navigation-close"></i></a></li>
                        </ul>
                    </div>

                </div>

            </nav>
        </div>
        <div class="model-email-content">
            <div class="row" style="margin-bottom: 10px;">
                <form class="col s12">
                    <div class="row" style="margin-bottom: 0px;">
                        <div style="width: 100%; float: left; padding-top: 11px;">
                            <%--<p style="color: red;margin-top:2%;">You don't have sufficient balance in your account. </p>--%>
                            <ul style="padding: 16px 10px 10px 20px;">
                                <li class="PackageRateMain">
                                    <span class="tags" style="font-weight: 600;">Available Balance</span>
                                    <h6 class="tags2" style="color: green;"><span class="val" id="AvailableBal">0.00</span></h6>
                                </li>
                                <li class="PackageRateMain">
                                    <span class="tags reqtext" style="font-weight: 600;">Amount to be Deducted</span>

                                    <h6 class="tags2" style="color: rgba(255, 0, 0, 0.9);"><span class="val" id="RequiredAmt">0.00</span></h6>
                                </li>
                                <li class="PackageRateMain">
                                    <span class="tags insuff" style="font-weight: 600;">Required Amount</span>

                                    <span class="tags suff remaintext" style="font-weight: 600;">Balance After Deduction</span>
                                    <h6 class="tags2" style="color: rgba(255, 0, 0, 0.9);"><span class="val" id="RemainingAmt">0.00</span></h6>
                                </li>

                            </ul>
                            <p style="padding: 90px 10px 10px 20px;" class="insuff">Please click on Add Money to complete this transaction.</p>
                            <p style="padding: 90px 10px 10px 20px;" class="suff">Please click on Continue to complete this transaction.</p>
                            <div style="width: 100%; float: left; padding-top: 11px;" class="insuff">
                                <a class="ApllyNowBtn" onclick="javascript:AddMoney();">Add Money</a>
                            </div>
                            <div style="width: 40%; float: left; padding-top: 11px;" class="suff">
                                <a class="ApllyNowBtn" onclick="javascript:ApplyProduct();" style="width: 100%; margin: 0 !important">Continue</a>
                            </div>
                            <div style="width: 40%; float: right; padding-top: 11px;" class="suff">
                                <a class="ApllyNowBtn" onclick="javascript:closepopup(this);" style="width: 100%; margin: 0 !important">Cancel</a>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>






    <!-- PAYMENT -->
    <div id="modal1" class="modal" style="z-index: 1003; display: none; opacity: 1; transform: scaleX(1); top: 10%;">
        <div class="modal-content">
            <div class="container">
                <div class="navbar-header">
                    <div class="navbar-brand">
                        <div class="brandlogo" style="display: none">
                            <img src="Images/MyCableTvLogoIn.png" />
                        </div>
                    </div>
                    <div style="float: left; margin-left: 18px; margin-top: -5px;">
                        <label id="SubsAmtType" style="font-size: 18px; color: #FFF;">BALANCE&nbsp;</label>
                        <label id="TopTitleAmt" style="font-size: 18px; color: #FFF;"><i class="fa fa-inr"></i>&nbsp;2191.89&nbsp;</label>
                    </div>
                    <div style="float: right; margin-top: -2px; margin-right: -10px; font-size: 18px;"><a href="javascript:void(0);" onclick="javascript:closePaymentBox(); return false;" style="color: #FFF;"><i class="fa fa-times"></i></a></div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
        <div class="model-email-content">

            <div class="card">
                <div class="card-content">
                    <form action="?" method="GET">
                        <ul class="stepper" id="MyCableTVPayment">
                            <li class="step active" style="display: block;">
                                <div class="step-title">Payment Detail</div>
                                <div class="step-content" style="display: block;">
                                    <div class="row">
                                    <div class="input-field col s12">
                                        <label for="compose" class="active">Payment Gateway </label>
                                        <select id="drpPG" class="browser-default">
                                           
                                        </select>
                                         <label id="PG-error" class="active" for="drpPG" style="display: none;">Select Payment Gateway</label>
                                       </div>   
                                        <div class="input-field col s12" style="margin-top: 18px;">
                                            <input name="PaymentAmount" type="text" class="validate valid" id="txtPaymentAmount" autocomplete="off" maxlength="6" placeholder="Min. Amount 10 /-" data-paylimit="10">
                                            <label id="PaymentAmount-error" class="invalid active" for="PaymentAmount" style="display: none;"></label>
                                            <label for="txtPaymentAmount" style="display: none;" class="active">Enter Amount</label>
                                        </div>
                                    </div>
                                    <div class="step-actions">
                                        <button class="waves-effect waves-dark btn blue next-step" data-feedback="CountinuePayMode">CONTINUE</button>
                                    </div>
                                </div>
                            </li>
                            <li class="step">
                                <div class="step-title">Payment Mode</div>
                                <div class="step-content" style="display: none;">
                                    <div class="row" id="PayMode">
                                      
                                    </div>
                                    <div class="step-actions">
                                        <button class="waves-effect waves-dark btn blue next-step" data-feedback="GetPaymentDetails">CONTINUE</button>
                                        <button class="waves-effect waves-dark btn-flat previous-step">BACK</button>
                                    </div>
                                </div>
                            </li>
                            <li class="step">
                                <div class="step-title">Confirm Payment</div>
                                <div class="step-content" style="display: none;">
                                    <div class="PayLeft">Amount</div>
                                    <div class="PayRight" id="SubsPaymentAmount"></div>
                                    <div class="clear"></div>

                                    <div data-discount="discount" class="PayLeft hide">Discount</div>
                                    <div data-discount="discount" class="PayRight hide" id="DiscountAmount"></div>
                                    <div data-discount="discount" class="clear hide"></div>

                                    <div data-discount="discount" class="PayLeft hide">Total Amount</div>
                                    <div data-discount="discount" class="PayRight hide" id="AfterDisPayAmount"></div>
                                    <div data-discount="discount" class="clear hide"></div>

                                    <div data-inc="Inc" class="PayLeft">Technology Fee</div>
                                    <div data-inc="Inc" class="PayRight" id="ConvenienceFee"></div>
                                    <div data-inc="Inc" class="clear"></div>

                                    <div class="PayLeft" style="color: #fc8002;">Payable Amount</div>
                                    <div class="PayRight" style="color: #fc8002;" id="PayableAmount"></div>
                                    <div class="clear"></div>

                                    <div class="step-actions">
                                        <button class="waves-effect waves-dark btn blue next-step" data-feedback="GetPaymentTransID">PAY NOW</button>
                                        <button class="waves-effect waves-dark btn-flat previous-step">BACK</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div style="font-size: 12px; background-color: #dedede; padding: 8px; text-align: justify; display: none" id="coformation">
                Please confirm the payment details given above. After confirmation please click on the [Pay Now] to continue payment process.
            </div>

        </div>
    </div>

    <!-- PAYMENT -->
</asp:Content>
