 <%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="MyConnections.aspx.cs" Inherits="WebApplication1.MyConnections" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/Connections.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>" rel="stylesheet" />

    <link href="css/DashboardCSS/DatePicker.css" rel="stylesheet" />

    <style type="text/css">
        /*.collapsible { display: none; }*/

        .connection .preloader-wrapper { margin: 0% 0% 0% 45%; display: none; }
        .collapsible-body { height: auto; background-color: #FFF; overflow: auto; }
        .collapsible-header { background-color: rgba(252, 128, 2, 0.91); color: #FFF; }
        .card-reveal .btn { color: #333; background-color: #FFF; text-transform: none; }
        .commoncls { float: left; }
        .commonclsChannel { font-weight: 500; }
        /*width: 150px;*/
        .disconnected { pointer-events: none; cursor: no-drop; }
        .red { background-color: #ff3b3b !important; }
        .collapsible-body p { padding: 0rem !important; }

        #CollChannels .product .card .btn-price { width: 55px; height: 55px; line-height: 55px; margin: 5px; }
        #CollChannels .product { width: 18%; }

        .ConnActive { background-color: rgba(40, 197, 12, 0.9) !important; }
        .ConnInactive { background-color: rgba(255, 0, 0, 0.9) !important; }
        .NewConnInactive { background-color: rgba(255, 0, 0, 0.9) !important; }

        #breadcrumbs-wrapper1 { background: #FFF; }
            #breadcrumbs-wrapper1 .btn { height: 30px; line-height: 30px; padding: 0 1rem; text-transform: none; }

        .eyebtn {
         position: absolute;
            top: 28%;
            right: 7px;
            z-index: 2;
            box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.14);
            color:black;
            background:white;
            cursor:pointer;
            width:40px;
            border:1px solid #b7b7b7;
            line-height:40px;
            text-align:center;
            display:inline-block;
            border-radius:100%;
            transition:1s;
            
        }

           /*.eyebtn:before {
             content:'All Packs';
             position:absolute;
             top: -108%;
            right:24px;
            border-radius: 0px 80px 0px 80px;
            z-index: 3;
            width:100px;
            box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.14);
            color:black;
            background:white;
            opacity: 0;
            transition: 0.5s;
           
            }

            .eyebtn:hover::before {
                opacity: 1
            }*/


           


        .dialog-container,
        .loading-container { position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: auto; background: rgba(0, 0, 0, 0.4); z-index: 9999; opacity: 0; -webkit-transition: opacity 400ms ease-in; -moz-transition: opacity 400ms ease-in; transition: opacity 400ms ease-in; }

            .dialog-container > div { position: fixed; width: 90%; max-width: 50%; min-height: 25px; margin: 10% auto; z-index: 99999; padding: 16px 16px 0; left: 0; right: 0; }

        .dialog-button-bar { text-align: right; margin-top: 8px; }

        .loading-container > div { position: relative; width: 50px; height: 50px; margin: 10% auto; z-index: 99999; }
        #orrsDiag .collapsible-header { background-color: #fff; color: #3498db; }
        .loading-container > div > div { width: 100%; height: 100%; }
        .mdl-shadow--16dp { box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2); background: #fff; padding-left: 2px; padding-right: 2px; }
        .mdl-card { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; font-size: 16px; font-weight: 400; min-height: 200px; overflow: hidden; z-index: 1; position: relative; border-radius: 2px; box-sizing: border-box; }
        .row .col.l9 { width: 75%; margin-left: auto; left: auto; right: auto; }
        /*#orrsDiag { pointer-events: none; }*/
        #orrsDiag .collapsible-header { font-weight: 500; }
        #orrsDiag .collapsible-body { height: auto; background-color: #FFF; overflow: visible!important; }
        .packchannellist { padding: 0; margin: 0; list-style: none; }

        #AllChannelList .collapsible-body { border-bottom: 0px; }

        #AllChannelList .collapsible-header:before { color: #ececec; }

        #MangePacks .collapsible { border-top: 0px solid #ddd; border-right: 0px solid #ddd; border-left: 0px solid #ddd; margin: 0rem 0 0rem 0; }

            #MangePacks .collapsible li { margin-bottom: 15px; }

        #MangePacks .collapsible { box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0px 0px 0 rgba(0,0,0,0); }

        .Packheader { }
        .PackDetails { width: 100%; float: left; margin-right: 10px; }

        #breadcrumbs-wrapper2 .btn { padding: 0 1rem; height: 35px; line-height: 35px; }

        #breadcrumbs-wrapper2 { background: #FFF; width: 97%; margin: auto; margin-top: 2%; }

        #breadcrumbs-wrapper3 { background: #FFF; width: 97%; margin: auto; margin-top: 2%; padding-bottom: 1%; display: none; }

            #breadcrumbs-wrapper3 .btn { padding: 0 1rem; height: 35px; line-height: 35px; }

            #breadcrumbs-wrapper3 .container { padding: 0px; margin: 0px; width: 100%; }

            #breadcrumbs-wrapper3 #Heading { background: #fcaf02; padding: 5px; color: #FFF; }

            #breadcrumbs-wrapper3 #ApplyTitle { float: left; }
            #breadcrumbs-wrapper3 #ApplyTotal { float: right; font-weight: 500; }

        #MangePacks .collapsible .PackDetails { box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12); }

        #MangePacks #AlaCarteBody { padding: 0px; }

        .Packheader .float-right { margin-left: 5px; }

        #CollChannels .collapsible-body label { font-family: "lato_nova","Lucida Grande", "Lucida Sans Unicode", "Trebuchet MS", Helvetica, Arial, Verdana, sans-serif; color: #626262 !important; }
        .ChannelaHeading { float: left; color: #464646; padding-left: 19px; padding-top: 5px; font-size: 16px; }
        .PackageButton.Current { background: #fc8002; color: #fff; }
        .browschennal { border: 1px solid #daa729; margin-top: 6px; width: 300px; }

        /*@media screen and (min-width: 100px) and (max-width: 800px) {

            #AllChannelList .collapsible-body ul li { width: 100% !important; }
        }*/
        .datalist { height: 50px !important; max-height: 80px !important; overflow-y: auto; display: block !important; }
        .Dropdown { position: absolute; z-index: 9; height: 200px; overflow: auto; width: 300px; background: #eceaea; margin-top: 0px; padding-left: 13px; line-height: 31px; border: 1px solid #bfbfbf; border-top: 0px; }

        .SelectDropDown { cursor: pointer; width: 100%; padding: 9px 0px 7px 6px; /* margin-top: 8px; */ height: 100%; display: block; color: #000; }
            .SelectDropDown i { float: right; font-size: 22px; font-weight: 500; padding: 0px 11px 0px 0px; }
        .Generlable { color: #000 !important; width: 96%; }
        #GenerName li { float: left; padding: 12px 10px 10px 10px; font-size: 13px; }
            #GenerName li span { color: red; font-size: 13px; font-weight: 700; cursor: pointer; }
        #BroadCastChips li { float: left; padding: 12px 10px 10px 10px; font-size: 13px; }
            #BroadCastChips li span { color: red; font-size: 13px; font-weight: 700; cursor: pointer; }

        /*@media screen and (min-width: 100px) and (max-width: 800px) {

            #AllChannelList .collapsible-body ul li { width: 100% !important; }
        }*/
        .datalist { height: 50px !important; max-height: 80px !important; overflow-y: auto; display: block !important; }


        #myform { text-align: center; padding: 0px; margin: 0px 12px 0px 6px; float: left; }
        .qty { width: 40px !important; text-align: center; height: 23px !important; border: 0px !important; background: #eee; pointer-events: none; }
        input.qtyplus { width: 25px; height: 25px; }
        input.qtyminus { width: 25px; height: 25px; }
        #myform { border: 2px solid #f4c93c; }
        .AddBtn { border: 0px !important; background: #0000 !important; border-left: 2px solid #f4c93c !important; }
        .LessBtn { border: 0px !important; background: #0000 !important; border-right: 2px solid #f4c93c !important; }
        #ConnectionModelPrepaid { visibility: visible; animation-name: fadeInTop; z-index: 1003; /* display: none; */ opacity: 1; transform: scaleX(1); top: 10%; width: 30%; }
        #ApplyProduct { visibility: visible; animation-name: fadeInTop; z-index: 1003; opacity: 1; transform: scaleX(1); top: 30%; width: 28%; }

        .AddRemoveBtn { margin-right: 7px; }
        .MyPakages { background: #ffffff; /* width: 25px; */ padding: 10px 19px; border-radius: 50%; /* height: 30px; */ color: #008000 !important; text-align: center; position: absolute; right: 10px; top: -20px; z-index: 999; cursor: pointer; -webkit-box-shadow: 0px 0px 3px 0.5px rgba(0,0,0,0.75); -moz-box-shadow: 0px 0px 3px 0.5px rgba(0,0,0,0.75); box-shadow: 0px 0px 3px 0.5px rgba(0,0,0,0.75); }
        .VewDetailsChnl { float: left;font-size: 15px;}

        #ConnectionDetails { font-size:15px; }

        @media only screen and (max-width: 1100px) {
            #ConnectionModel { width: 80%; }
            #ConnectionModelPrepaid { width: 80%; }
            #ApplyProduct {width: 80%; }
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
    </style>

    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/MyConnection.js?ver=0.0.15?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.34"></script>
    <script src="js/Dashboard_Js/DatePicker.js?ver=0.0.2?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="content" class="connection" style="-webkit-overflow-scrolling: auto;">
        <!--breadcrumbs start-->
        <div id="breadcrumbs-wrapper1" style="display: none;">
            <!-- Search for small screen -->
            <div class="container" style="min-height: 75px !important;">
                <div class="row">
                    <div class="col m6 l6">
                        <h5 class="breadcrumbs-title" id="ContentTopBarTittle">My Packs And Channels <span id="ConnectionDetails"></span></h5>
                        <p id="PackSubTitle" style="font-size: 13px;"></p>
                    </div>
                    <div class="col m6 l6" style="text-align: right; padding-top: 2%;" id="ManagePakege">
                        <a class="waves-effect waves-light  btn" onclick="javascript:GoBackMyConnection(); return false;">Back</a>
                    </div>
                </div>
            </div>
        </div>
        <!--breadcrumbs end-->

        <!--breadcrumbs start-->
        <div id="breadcrumbs-wrapper2" style="display: none;">
            <!-- Search for small screen -->
            <div class="container" style="min-height: 75px !important;">
                <div class="row">
                    <div class="col m9 l9">
                        <h5 class="breadcrumbs-title" id="ContentTopBar">Manage Packs</h5>
                        <p id="P1" style="font-size: 13px;"></p>
                    </div>
                    <div class="col m3 l3" style="text-align: right;">
                    </div>
                </div>
            </div>
        </div>
        <!--breadcrumbs end-->


        <!--breadcrumbs start-->
        <div id="breadcrumbs-wrapper3">
            <!-- Search for small screen -->
            <div class="container" style="min-height: 75px !important;">
                <div class="row" id="Heading">
                    <div class="col m12 l12" style="width: 100%;">
                        <h6 id="ApplyTitle"></h6>
                        <h6 id="ApplyTotal">Total Rs. : 0</h6>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col m12 l12" id="ApplyDetails">
                    </div>
                </div>
                <div class="row">
                    <div class="col m12 l12" style="text-align: right;">
                        <a class="waves-effect waves-light  btn" style="margin-top: 2%;" onclick="javascript:SetConnectionDetails('true');" id="ApplyNow">Apply Now</a>
                    </div>
                </div>
            </div>
        </div>
        <!--breadcrumbs end-->

        <!--start container-->
        <div class="container" id="">
            <div class="row">
                <div class="section">

                    <div class="preloader-wrapper big active" id="ConnPreloader">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-red">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-yellow">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-green">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                    </div>

                    <section class="ProductDetails" id="ProductDetails" style="display: none">
                        <%--<div class="FullSize">--%>
                        <div style="width: 100%; float: left;" class="SmallSize">
                             <p id="SmallSizeInsfBal" style="text-align: right; padding-right: 7px; font-size: 14px; margin-top: -12px; margin-bottom: 4px; color: red; display: none;">
                                    Insufficient Balance, <a href="#" onclick="GetPayment(); return false;" style="color: #0099fd; text-decoration: underline; font-size: 15px; font-weight: 600;">Recharge Now </a>
                                </p>
                                <p id="SmallSizeSuffiBal"style="text-align: right; padding-right: 7px; font-size: 14px; margin-top: -10px; margin-bottom: 4px; color: green; display: none;">
                                    Sufficient balance for Auto-Renewal
                                         <%--You have sufficient balance!--%>
                                </p>

                           <%-- <h6 class="ProductDate" style="display: none">Product(s) Expiring Till 7-Aug-2019</h6>
                            <h6 class="BalamceMasg" style="color: red; display: none">Insufficient Balance, <a href="#" onclick="GetPayment(); return false;">Recharge Now</a></h6>--%>
                            <%--<h6 class="BalamceMasg" id="SufficientBal" style="color: green; display: none;">You have sufficient balance!</h6>--%>
                        </div>

                        <div class="ConnectionDetalsMain" style="display: none">
                            <div class="card-block">
                                <div class="row align-items-center">
                                    <div class="col-auto" style="color: #ec407a"><i class="fa fa-calendar-times-o"></i></div>
                                    <div class="col-auto">
                                        <h6>Showing Products Expiring in Next</h6>

                                        <h6 style="padding-top: 12px; padding-bottom: 7px;">Days</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ConnectionDetalsMain">
                            <div class="MainHeading FullSize">
                                <div class="card-block-top" style="background: #4caf50;">
                                    <h6>Total Active Connection(s)</h6>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <div style="float: left; color: #4caf50">
                                            <i class="fa fa-dropbox"></i>
                                        </div>
                                        <h4 class="SmallSize SmallHedding">Total Active
                                            <br />
                                            Connection(s)</h4>
                                        <h5 id="TotalActiveConnection">1</h5>
                                        <p class="SmallSize BottomText">Till <span>26-Jan-2019</span> <span id="Span3" class="DatpickerNew txtDate spanico" data-ctrltype="text" data-targetid="ExpiringTillDate"><i class="fa fa-pencil" aria-hidden="true"></i></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ConnectionDetalsMain ProductExpir">
                            <div class="MainHeading FullSize">
                                <div class="card-block-top" style="background: #ff5252;">
                                    <h6>Product(s) Expiring Till <span id="ExpiringTillDate"></span>&nbsp;
                                            <span id="ConnDatePicker" class="DatpickerNew txtDate spanico" data-ctrltype="text" data-targetid="ExpiringTillDate"><i class="fa fa-calendar" aria-hidden="true"></i></span>

                                    </h6>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <div style="float: left; color: #ff5252">
                                            <i class="fa fa-cube"></i>
                                        </div>
                                        <h4 class="SmallSize SmallHedding">Product(s)<br />
                                            Expiring</h4>
                                        <h5 id="TotalExpiringProduct" style="margin-bottom: 0px;">3</h5>
                                        <p class="SmallSize TillDate">Till  <span id="SmallExpDate"></span><span id="Span1" class="DatpickerNew txtDate spanico" data-ctrltype="text" data-targetid="ExpiringTillDate"><i class="fa fa-pencil" aria-hidden="true"></i></span></p>
                                    </div>
                                </div>
                            </div>
                            <%--<div style="float: right; text-align: right; width: 100%; margin-bottom: 0px; padding-right: 10px; visibility: hidden" class="">
                                    in next
                                    <input type="text" value="300" class="ExpiringDay" maxlength="3" id="ExpiringDay" onpaste="return false;" />

                                    <div id="GetConnecrtionDetail" class="GetConnecrtionDetail">
                                        <p id="EditDays" style="color: #0099fd;"><i class="fa fa-pencil" aria-hidden="true"></i></p>

                                        <p id="GetDtails" style="display: none; cursor: pointer; color: green; padding-right: 8px;">
                                            <i class="fa fa-check" aria-hidden="true"></i>
                                        </p>

                                        <p id="Notgetdetals" style="display: none; cursor: pointer; color: red;">
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </p>

                                    </div>
                                    <h6 style="padding-top: 0px; padding-bottom: 0px; margin: 0px; display: inline-block;">Days</h6>
                                    <%--<p id="ExpiringTillDate" style="text-align: right; padding-right: 7px; font-size: 14px">Till 12-Jan-2020</p>
                                </div>--%>
                        </div>

                        <div class="ConnectionDetalsMain">

                            <div class="MainHeading FullSize">
                                <div class="card-block-top" style="background: #fcaf02;">
                                    <h6>Recommended Recharge</h6>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <div style="float: left; color: #fcaf02">
                                            <i class="fa fa-inr"></i>
                                        </div>
                                        <h4 class="SmallSize SmallHedding">Recommended<br />
                                            Recharge</h4>
                                        <h5 id="TotalRecommededRecharge">0</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ConnectionDetalsMain">

                            <div class="MainHeading FullSize">
                                <div class="card-block-top" style="background: #0099fd;">
                                    <h6>Required Amount</h6>
                                </div>
                            </div>
                            <div class="card-block" style="padding-bottom: 0px">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <div style="float: left; color: #0099fd">
                                            <i class="fa fa-inr"></i>
                                        </div>
                                        <h4 class="SmallSize SmallHedding">Required<br />
                                            Amount</h4>
                                        <h5 id="RequiredAmount"></h5>
                                    </div>
                                </div>
                                <p id="InsufficientBal" class="FullSize" style="text-align: right; padding-right: 7px; font-size: 14px; margin-top: -12px; margin-bottom: 4px; color: red; display: block;">
                                    Insufficient Balance, <a href="#" onclick="GetPayment(); return false;" style="color: #0099fd; text-decoration: underline; font-size: 15px; font-weight: 600;">Recharge Now </a>
                                </p>
                                <p id="SufficientBal" class="FullSize" style="text-align: right; padding-right: 7px; font-size: 14px; margin-top: -10px; margin-bottom: 4px; color: green; display: none;">
                                    Sufficient balance for Auto-Renewal
                                         <%--You have sufficient balance!--%>
                                </p>

                            </div>


                            <%--<div class="card-block-expiring">
                                    <div class="row align-items-center">
                                        <div class="col-auto" style="color: #4caf50"><i class="fa fa-inr"></i></div>
                                        <div class="col-auto">
                                            <h6>Required Amount</h6>
                                            <h5 id="RequiredAmount">0</h5>
                                        </div>
                                    </div>
                                </div>
                                <p id="InsufficientBal" style="text-align: right; padding-right: 7px; font-size: 14px; margin-top: 5px; margin-bottom: 4px; color: red">
                                    Insufficient Balance, <a href="#" onclick="GetPayment(); return false;" style="color: #0020ba; text-decoration: underline;">( Add Money )</a>
                                </p>
                                <p id="SufficientBal" style="text-align: right; padding-right: 7px; font-size: 14px; margin-top: 5px; margin-bottom: 4px; color: green">You have sufficient balance!</p>--%>
                        </div>
                        <%--</div>--%>
                        <%--<div class="SmallSize">
                            <div class="col-auto">
                                <h6 style="float: left; margin-right: 10px;">Showing Products Expiring in Next</h6>
                                <input style="float: left; margin-right: 0px !important; border: 1px solid #d59f25; height: 23px !important; margin-top: 5px; padding-left: 4px; width: 12% !important;" type="text" value="300" class="ExpiringDay" />
                                <div style="float: left; margin-left: 0px; background: #d59f25; color: #fff; padding: 2px 6px 2px 6px; position: relative !important"
                                    class="GetConnecrtionDetail">
                                    Get
                                </div>
                                <h6 style="padding-top: 2px; padding-bottom: 6px; float: left; margin-left: 9px;">Days</h6>
                            </div>
                            <div class="SmallConnectionCont">
                                <div class="TotalConDetails">
                                    <h6>Total Active Connection(s)
                                        <br />

                                    </h6>
                                    <p>65</p>
                                </div>
                                <div class="TotalConDetails">
                                    <h6>Total Expiring Product(s)
                                        <br />

                                    </h6>
                                    <p>36</p>
                                </div>
                            </div>
                            <div style="clear: both"></div>
                            <div class="PriceDetals">
                                <h6>Recommended Recharge :- <span>789.00</span></h6>
                                <h6>Required Amount :- <span>789.00</span></h6>
                                <p>Insufficient Balance, please <a href="#">Add Money</a> </p>
                            </div>
                        </div>--%>
                    </section>


                    <section class="plans-container" id="plans">
                    </section>

                    <section class="plans-container" id="MangePacks" style="display: none;">

                        <div class="dropdown" id="Dropdown">
                            <button class="btn btn-primary SuggestiveTab dropdown-toggle PackageButton active" type="button" data-toggle="dropdown">
                                Recommended Pack
                            </button>
                            <button class="btn btn-primary BroadcasterTab dropdown-toggle PackageButton" type="button" data-toggle="dropdown">
                                Broadcaster Pack
                            </button>
                            <button class="btn btn-primary AlaCarteTab dropdown-toggle PackageButton" type="button" data-toggle="dropdown">
                                à la carte
                            </button>
                        </div>
                        <ul class="Connection_Tabs">
                            <li class="tab active SuggestiveTab" data-target="#page1" style=""><span>Recommended Packs</span>
                            </li>
                            <li class="tab BroadcasterTab" data-target="#page2"><span>Broadcaster Packs</span>
                            </li>
                            <li class="tab AlaCarteTab" data-target="#page3"><span>à la carte</span>

                            </li>
                        </ul>
                        <ul>

                            <li class="PackDetails" id="SugestedPacks" style="display: block">
                                <div class="PackageDetailMain">
                                    <div id="BasePackBody" style="background: #fff">
                                        <div id="MajorPack" class="RecomondedData">
                                        </div>
                                        <div id="AddonPack" class="RecomondedData">
                                        </div>


                                    </div>
                                </div>
                            </li>
                            <li class="PackDetails" id="BrodcasterPack" style="display: none">
                                <div>
                                    <ul id="BroadCastChips">
                                    </ul>
                                    <ul class=" browser-default browschennal" style="float: right; height: 39px;">
                                        <li id="SelectBroadDrop"><span class="SelectDropDown">Select BroadCaster <i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                            <ul class="Dropdown" id="BrowsBroad" style="display: none">
                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                                <div class="PackageDetailMain">
                                    <div id="AddOnPackBody" style="background: #fff">
                                        <div id="BrodCastMajor" class="BroadcasterData"></div>
                                        <div id="BrodCastAddOn" class="BroadcasterData"></div>
                                    </div>


                                </div>
                            </li>
                            <li class="PackDetails" id="Ala-Carte" style="display: none">
                                <div>
                                    <ul id="GenerName">
                                    </ul>
                                    <ul class=" browser-default browschennal" style="float: right; height: 39px;">
                                        <li id="SelectDrop"><span class="SelectDropDown">Select Channel Genre <i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                            <ul class="Dropdown" id="AlaCartbrow" style="display: none">
                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                                <div class="PackageDetailMain" id="AllChannelList">

                                    <div id="AlaCarteBody" class="AlaCartData" style="background: #fff">
                                    </div>
                                </div>
                            </li>
                        </ul>


                    </section>

                    <section class="plans-container" id="ConnectionTotal" style="display: none;">
                        <div class="SummeryHedding">
                            <h4>Selected Packs and Channels</h4>
                        </div>
                        <div class="ProductdetailsMain">
                            <div class="Productdetails">
                                <div id="RecPackMain" style="display: none">
                                    <p>Recommended Packs</p>
                                    <div id="RecommendedPack" style="float: left; width: 100%;">
                                    </div>
                                </div>
                                <div id="BroadMain" style="display: none">
                                    <p>Broadcaster Packs</p>
                                    <div id="BrodcastPack" style="float: left; width: 100%;">
                                    </div>
                                </div>
                                <div id="Alamain" style="display: none">
                                    <p>à la carte</p>
                                    <div id="AlaCartePack" style="float: left; width: 100%;">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <%--<ul class="list-unstyled">
                            <li class="d-flex justify-content-between">
                                <span class="tag">Subtotal</span>
                                <span class="val" id="ProductSubTotal"></span>
                            </li>
                            <li class="d-flex justify-content-between">
                                <span class="tag">Natwork Fee</span>
                                <span class="val" id="NetworkFee"></span>
                            </li>
                            <li class="d-flex justify-content-between">
                                <span class="tag" id="Tax">Estimated Tax</span>
                                <span class="val">0.00 </span>
                            </li>
                            <li class="d-flex justify-content-between" style="padding-top: 15px;">
                                <span class="tag">Grand Total</span>
                                <span class="val" id="TotalAmount"></span>
                            </li>
                        </ul>--%>
                        <div style="width: 100%; float: left;">
                            <a class="ApllyNowBtn" id="ConnectionChanges" onclick="javascript:GetNewConnectionDetail()">Proceed</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>

    </section>


    <div class="DatePickerBack">
        <div class="DatePicker">
        </div>
    </div>




    <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 1002; opacity: 0.5; display: none; background: #444546 !important; opacity: 0.8"></div>
    <div id="ConnectionModel" class="modal">
        <div class="modal-content" style="padding: 0px;">
            <nav style="background-color: #FC8002;">
                <div class="nav-wrapper ConnectionHead">
                    <div class="left col s12 m5 l5">
                        <ul>
                            <li><a href="javascript:void(0);" class="email-type SummryHedding" style="pointer-events: none;">&nbsp;&nbsp;</a></li>
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
                        <div class="ProductdetailsMain2">
                            <div class="Productdetails" style="padding-left: 0px;">
                                <div id="RecPackMain2" style="display: block">
                                    <p>Recommended Packs</p>
                                    <div id="RecommendedPack2" style="float: left; width: 100%;">
                                    </div>
                                </div>
                                <div id="BroadMain2" style="display: block">
                                    <p>Broadcaster Packs</p>
                                    <div id="BrodcastPack2" style="float: left; width: 100%;">
                                    </div>
                                </div>
                                <div id="Alamain2" style="display: block">
                                    <p>à la carte</p>
                                    <div id="AlaCartePack2" style="float: left; width: 100%;">
                                    </div>
                                </div>
                                <div id="Duplicate" style="display: none">
                                    <p>Duplicate Packs</p>
                                    <div id="DuplicatePacks" style="float: left; width: 100%;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul class="list-unstyled">
                            <li class="PackageRateMain">
                                <span class="tags">Subtotal</span>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="ProductSubTotal"></span></h6>
                            </li>
                            <li class="PackageRateMain">
                                <div class="tags">Network Fee  <span class="NetworkFeeCount"></span></div>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="NetworkFee"></span></h6>
                            </li>
                            <li class="PackageRateMain">
                                <span class="tags">Tax</span>
                                <h6 class="tags2">Rs.&nbsp;<span class="val" id="Tax">0.00 </span></h6>
                            </li>
                            <li class="PackageRateMain" style="padding-top: 8px;">
                                <span class="tags" style="font-weight: 500;">Estimated Monthly Charge</span>
                                <h6 class="tags2" style="color: rgba(255, 0, 0, 0.9)">Rs.&nbsp;<span class="val" id="TotalAmount"></span></h6>
                            </li>
                        </ul>
                        <div style="width: 100%; float: left; padding-top: 11px;">
                            <a class="ApllyNowBtn" onclick="javascript:Confirm();" style="display: none" id="MannagePackage">Manage Product</a>
                            <a class="ApllyNowBtn" onclick="javascript:ConfirmandApply()" id="ApplyNowBtn">Apply Now</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

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
                                        <div id="RecommendedPackPre" class="ManagePrepaid" style="float: left; width: 100%;">
                                        </div>
                                        <div id="FinalRecommendedPackPre" class="FinalPrepaid" style="float: left; width: 100%;">
                                        </div>
                                    </div>
                                    <div id="BroadMainPrePaid" style="display: none">
                                        <p>Broadcaster Packs</p>
                                        <div id="BrodcastPackPre" class="ManagePrepaid" style="float: left; width: 100%;">
                                        </div>
                                        <div id="FinalBrodcastPackPre" class="FinalPrepaid" style="float: left; width: 100%;">
                                        </div>

                                    </div>
                                    <div id="AlamainPrePaid" style="display: none">
                                        <p>à la carte</p>
                                        <div id="AlaCartePackPre" class="ManagePrepaid" style="float: left; width: 100%;">
                                        </div>
                                        <div id="FinalAlaCartePackPre" class="FinalPrepaid" style="float: left; width: 100%;">
                                        </div>
                                    </div>
                                    <%-- <div id="DuplicatePrePaid" style="display: none">
                                        <p>Duplicate Packs</p>
                                        <div id="DuplicatePacksPre" style="float: left; width: 100%;">
                                        </div>
                                    </div>--%>
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
                        <%--<a class="ApllyNowBtn ManagePrepaid" onclick="javascript:Confirm();" style="display: none">Manage Product</a>--%>
                        <a class="ApllyNowBtn FinalPrepaid" onclick="javascript:ConfirmandApply()" id="ApplyNowPre">Apply Now</a>
                        <%-- <p style="padding-left: 20px; color: red;" class="FinalPrepaid">*You do not have sufficient balance. </p>
                        <a class="ApllyNowBtnPre FinalPrepaid" onclick="javascript:Confirm();" id="AddMoney">Add Money</a>--%>
                        <%--<a class="ApllyNowBtnPre FinalPrepaid" onclick="javascript:ConfirmandApply()" id="ApplyNowPre" style="background: #9c9c9c; pointer-events: none;">Apply Now</a>--%>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <div class="lean-overlay" id="materialize-lean-overlay-3" style="z-index: 1003; opacity: 0.5; display: none; background: rgba(68, 69, 70, 0.4) !important; opacity: 0.8"></div>
    <%-- <div id="" style="display:none">
                          <div  style="max-height: 200px; overflow-y: auto; min-height: 150px;">
                           <p style="color: red;margin-top:2%;">You don't have sufficient balance in your account. </p>
                             <ul style="padding: 16px 10px 10px 20px;">
                                <li class="PackageRateMain">
                                     <span class="tags" style="font-weight: 600;">Available Balance</span>
                                    <h6 class="tags2" style="color: green;margin-right:55px"><span class="val" id="AvailableBal">0.00</span></h6>
                                </li>
                                <li class="PackageRateMain">
                                    <span class="tags" style="font-weight: 600;">Required Amount</span>
                                    <h6 class="tags2" style="color: rgba(255, 0, 0, 0.9);margin-right:55px"><span class="val" id="RequiredAmt">0.00</span></h6>
                                </li>
                                <li class="PackageRateMain">
                                 <span class="tags" style="font-weight: 600;">Remaining Amount</span>
                                    <h6 class="tags2" style="color: rgba(255, 0, 0, 0.9);margin-right:55px"><span class="val" id="RemainingAmt">0.00</span></h6>
                                 </li>
                            </ul>
                              <p style="margin-top:1%;">Please do add money for new subscription.</p>
                         
                          </div>
     </div>--%>
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
