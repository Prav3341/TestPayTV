<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="WebApplication1.Dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Dashboard_Js/RstForm/DashBoard.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.6"></script>
    <style>
        .LCODetails { bottom: 0; float: right; right: 0; padding: 10px 20px 20px 20px; border: 1px solid #dcdcdc; width: 100%; font-size: 17px; word-break: break-word; line-height: 37px; }
        #ProviderName { font-size: 23px; padding-bottom: 4px; padding-left: 0px; }
        .Providerhead { font-size: 25px; padding-bottom: 4px; padding-left: 20px; }
        .balancmsg { margin-top: -5px; color: red; font-size: 14px; font-weight: 500; }
            .balancmsg a { color: #00bcd4; border-bottom: 1px solid; }
        #ProfileContact { width:100%;float:left}
        @media only screen and (max-width: 1687px) {

            .balancmsg { font-size: 11px; }
        }
        @media only screen and (max-width: 1450px) {

            .balancmsg { font-size: 10px; }
        }
        @media only screen and (max-width: 1400px) {

            .row .col.l3 { width: 50%; }
            .balancmsg { font-size: 14px; }
        }
        @media only screen and (max-width: 768px) {
        
        .row .col.l3 { width: 100%; }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <!-- START CONTENT -->
    <section id="content">
   
        <!--start container-->
        <div class="container" id="DashboardDiv">
            <div class="section">
                <%--<div class="slider">
                    <ul class="slides">
                        <li>
                            <img id="Slide1" src="Images/istock_000003158926_large.jpg" />
                        </li>
                        <li>
                            <img src="Images/1488188138966.jpg" />
                        </li>
                    </ul>
                </div>--%>
                <!--card widgets start-->
                <div id="card-widgets">
                    <div class="row">

                        <div class="col s12 m6 l3" >
                            <div class="card">
                                <div class="card-body Card_effect1" style="padding-bottom: 0px;">
                                    <div class="card-header headerPinkWhite red">
                                        <i class="fa fa-inr"></i>
                                    </div>
                                    <div class="d-flex flex-row" style="text-align: right;">
                                        <div class="m-l-10 align-self-center" style="width: 100%">
                                            <h5 class="m-b-0 font-light" id="BillAmount" style="margin-bottom: 0px;">0</h5>
                                            <h6 class="text-muted m-b-0" id="DueAmmount" style="display: none">Due Amount</h6>
                                            <h6 class="text-muted m-b-0" id="WallateAmmount" style="display: none">Required Amount</h6>
                                           <p class="balancmsg" id="InsufficientBal" style="color: red;visibility:hidden;">Insufficient Balance, <a style="font-weight: 600;" onclick="javascript:GetPayment(); return false;" href="#"> Recharge Now</a></p>
                                           <%--<p class="balancmsg" id="InsufficientBal" style="color: red ;visibility:hidden;">Insufficient Balance, <a href="#"  onclick="javascript:GetPayment(); return false;">ADDMONEY</a></p>--%>
                                           
                                             <p class="balancmsg" id="SufficientBal" style="color: green; display: none;">Sufficient balance for Auto-Renewal</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action CardFont pink darken-2" style="color: white;">
                                    <p class="float-left" id="DueDate"></p>
                                    <p id="PayNow" style="cursor: pointer" class="float-right" onclick="javascript:GetPayment(); return false;"><i class="fa fa-credit-card" aria-hidden="true"></i>&nbsp; Pay Now </p>
                                    <p id="AddMoney" style="cursor: pointer; display: none" class="float-right" onclick="javascript:GetPayment(); return false;"><i class="fa fa-credit-card" aria-hidden="true"></i>&nbsp; Add Money</p>
                                    <p id="PrepaidViewMore" style="cursor: pointer; display: block;"  class="float-right"><a href="javascript:void(0);" onclick="document.location.replace('../MyConnection');"><i class="fa fa-eye" aria-hidden="true"></i></a>  </p>
                                </div>
                            </div>
                        </div>

                        <div class="col s12 m6 l3">
                            <div class="card">
                                <div class="card-body Card_effect2">
                                    <div class="card-header yellow darken-3 Yellow">
                                        <i class="fa fa-inr"></i>
                                    </div>
                                    <div class="d-flex flex-row" style="text-align: right;">
                                        <div class="m-l-10 align-self-center" style="width: 100%">
                                            <h5 class="m-b-0 font-light" id="LastPaidAmount">0</h5>
                                            <h6 class="text-muted m-b-0">Last Paid Amount</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action CardFont yellow darken-3" style="color: white;">
                                    <p class="float-left" id="LastPaidDate"></p>
                                    <p class="float-right"><a href="javascript:void(0);" onclick="document.location.replace('../MyPaymentHistory');"><i class="fa fa-eye" aria-hidden="true"></i> </a></p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6 l3">
                            <div class="card">
                                <div class="card-body Card_effect">
                                    <div class="card-header light-green darken-1 green">
                                        <i class="fa fa-dropbox"></i>
                                    </div>
                                    <div class="d-flex flex-row" style="text-align: right;">
                                        <div class="m-l-10 align-self-center" style="width: 100%">
                                            <h5 class="m-b-0 font-light" id="TotalConnection">0</h5>
                                            <h6 class="text-muted m-b-0">Total Connection</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action CardFont light-green darken-1" style="color: white;">
                                    <p class="float-left" id="ConnDetails">1 Active / 0 InActive</p>
                                    <p class="float-right"><a href="javascript:void(0);" onclick="document.location.replace('../MyConnection');"><i class="fa fa-eye" aria-hidden="true"></i></a>  </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6 l3">
                            <div class="card">
                                <div class="card-body Card_effect3">
                                    <div class="card-header Blue blue accent-2">
                                        <i class="fa fa-pencil-square-o"></i>
                                    </div>
                                    <div class="d-flex flex-row" style="text-align: right;">
                                        <div class="m-l-10 align-self-center" style="width: 100%">
                                            <h5 class="m-b-0 font-light" id="OpenRequestCount">0</h5>
                                            <h6 class="text-muted m-b-0">Open Request</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action CardFont blue accent-2" style="color: white;">
                                    <p class="float-right"><a href="javascript:void(0);" onclick="document.location.replace('../MyServiceRequests');"><i class="fa fa-eye" aria-hidden="true"></i></a> </p>
                                </div>
                            </div>
                        </div>
                        <div id="ProfileContact">
                            <div class="col s12 m6 l6">
                                <div id="profile-card" class="card" style="min-height: 320px; word-break: break-all;">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img src="Images/user-bg.jpg" alt="Service Provider" />
                                    </div><%--Images/MyCableTvLogoIn.png--%>
                                    <div class="card-content" style="padding-top: 35px;">
                                        <img src="images/others/PaytvLogo.png" alt="Profile Image" id="imgLogo" class="circle responsive-img activator z-depth-2 card-profile-image" />
                                        <span class="card-title activator grey-text text-darken-4" id="CurrentCompName"></span>
                                        <p id="MSOMobile"></p>
                                        <p id="MSOEmail"></p>
                                        <p id="MSOAddress"></p>
                                    </div>
                                    <p class="Providerhead">LCO Detail</p>
                                    <div class="LCODetails">
                                        <p id="ProviderName"></p>
                                        <p id="CompEmail"></p>
                                        <p id="CompMobNo"></p>
                                        <p id="CompPhone"></p>
                                        <p id="CompAdd"></p>
                                        <p id="CompWebAddress"></p>
                                    </div>
                                </div>

                                <div class="col s12 m6 l6" id="DiscountDetails">
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
            <!--end container-->
    </section>
    <!-- END CONTENT -->

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
                                        <div class="input-field col s12" style="margin-top:18px;">
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
            <div style="font-size: 12px; background-color: #dedede; padding: 8px; text-align: justify; display:none" id="coformation">
                Please confirm the payment details given above. After confirmation please click on the [Pay Now] to continue payment process.
            </div>

        </div>
    </div>

    <!-- PAYMENT -->


</asp:Content>
