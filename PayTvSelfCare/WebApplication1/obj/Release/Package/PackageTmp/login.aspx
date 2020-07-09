<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="WebApplication1.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>PayTvSelfCare</title>
    <link rel="icon" href="images/others/PaytvLogo.png" type="image/png" sizes="16x16" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="msapplication-tap-highlight" content="no" />

    <meta name="description" content="PayTV SelfCare" />
    <link href="css/login/main.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/style.min.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/jquery-confirm.css" rel="stylesheet" />
    <link href="css/register.css" rel="stylesheet" />
    <%--<link href="css/DashboardCSS/materialize.min.css" rel="stylesheet" />--%>
    <link href="fonts/iconic/css/material-design-iconic-font.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css" />


    <link href="QuickPay/css/QuickPay.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="QuickPay/css/stepper.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <%--<script src="js/jquery-1.12.3.min.js"></script>--%>

    <link href="css/DashboardCSS/Msgbox.css" rel="stylesheet" />
    <script src="js/jquery-1.12.3.min.js"></script>
    <%--<script src="js/Dashboard_Js/jquery-confirm.js"></script>--%>
    <script src="js/jquery.easing.1.3.js"></script>
    <script src="js/Dashboard_Js/MsgBox.js"></script>
    <script src="QuickPay/js/Stepper.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>

    <script src="js/Dashboard_Js/RstForm/common.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Dashboard_Js/jquery-confirm.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Login/Login.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <%--<script src="js/Dashboard_Js/MsgBox.js"></script>--%>
    <script src="QuickPay/js/QuickPay.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>


    <style>
        .ErrorOkBtn { background: #0099fd; color: #fff; padding: 9px 42px; -webkit-box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); -moz-box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); }

        #OTPContinue a { background: #0099fd; color: #fff; font-size: 16px; padding: 10px 35px; font-family: Roboto; font-weight: 300; }
        #OTPRetry a { color: #0099fd; font-size: 14px; padding: 2px 1px; font-family: Roboto; font-weight: 300; box-shadow: none; }
        #OTPMsg { padding: 6px 0px; }
        #OTPResendMsg { padding: 6px 0px; }
        #txtTempOIP { color: #232323; text-align: center; font-size: 16px; font-family: Roboto; width: 100%; }
        .errorMsg { margin-left: 13px !important; }
        .modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; display: none; overflow: hidden; -webkit-overflow-scrolling: touch; outline: 0; }
        .modal-content { position: relative; background-color: #fff; -webkit-background-clip: padding-box; background-clip: padding-box; border: 1px solid #999; border: 1px solid rgba(0,0,0,.2); border-radius: 6px; outline: 0; -webkit-box-shadow: 0 3px 9px rgba(0,0,0,.5); box-shadow: 0 3px 9px rgba(0,0,0,.5); }
        label { display: inline-block; max-width: 100%; margin-bottom: 5px; font-weight: 700; font-size: 14px; }
        b, strong { font-weight: 700; }
        ul, li { margin: 0px; list-style-type: none; }
        .showbox { padding: 1%; }
        .wrap-login100 { margin-top: 8%; }
        .jconfirm-scrollpane .container { padding: 0 15px; }
        .jconfirm-ErrorMsgicon { margin-top: -42px; width: 434px; }
        .jconfirm-SucessMsgicon { margin-top: -42px; width: 434px; }
        .jconfirm-Notification { margin-top: -42px; width: 434px; }

        @media screen and (max-width: 471px) and (min-width: 300px) {
            .jconfirm-ErrorMsgicon { width: 90% !important; }
            .jconfirm-SucessMsgicon { width: 90% !important; }
            .jconfirm-Notification { width: 90% !important; }
        }

        @media (min-width: 768px) {
            .modal-content { -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5); box-shadow: 0 5px 15px rgba(0,0,0,.5); }
        }
    </style>
</head>
<body style="overflow: auto">
    <div class="limiter">
        <div class="container-login100" style="background-image: url('images/login/channel-bg.png');">
            <div>
                <div class="wrap-login100">
                    <form class="login100-form validate-form" autocomplete='off'>
                        <div class="Login_Logo">
                            <div class="login100-form-logo">
                                <i class="fa fa-user"></i>
                            </div>
                        </div>
                        <span class="login100-form-title p-b-34 p-t-27">Sign in
                        </span>
                        <div class="wrap-loginInput">
                            <div class="wrap-input100 validate-input" data-validate="Enter username">
                                <input class="input100" type="text" id="txtUserName" name="username" placeholder="Enter your Mobile Or Email" maxlength="100" />
                                <span class="focus-input100" data-placeholder="&#xf207;"></span>

                            </div>
                            <p style="visibility: hidden; position: absolute; display: block; color: #e10303; margin-top: -25px;" id="PUserId" class="">Please Enter Mobile Or Email</p>

                            <div style="position: relative">
                                <div class="wrap-input100 validate-input" data-validate="Enter password">
                                    <input class="input100" type="password" id="txtUserPass" name="pass" autocomplete='off' placeholder="Enter your password" maxlength="20" />
                                    <span class="focus-input100" data-placeholder="&#xf191;"></span>
                                </div>
                                <div class="Passwordlogin">
                                    <i class="fa fa-eye" aria-hidden="true" onmousedown="MouseupPass()" onmouseup="MouseupPass()"></i>
                                </div>
                            </div>
                            <p style="visibility: hidden; position: absolute; display: block; color: #e10303; margin-top: -25px;" id="PPwd" class="">Please Enter Password</p>

                            <div class="contact100-form-checkbox">
                                <input class="input-checkbox100" id="RememberMe" type="checkbox" name="remember-me" autocomplete='off' />
                                <label class="label-checkbox100" for="RememberMe">
                                    Remember me
                                </label>
                            </div>

                            <div class="container-login100-form-btn">
                                <a class="login100-form-btn" onclick="LoginFunction();" style="cursor: pointer">Sign in
                                </a>
                            </div>

                            <div class="p-t-90 text-left" style="font-size: 16px;">
                                <a style="float: left;" class="txt1" href="javascript:void(0);" onclick="document.location.replace('../Register');">Register Now!</a>
                                <a style="float: right;" class="txt1" href="javascript:void(0);" onclick="document.location.replace('../ForgotPassword');">Forgot Password?</a>
                            </div>

                            <div class="p-t-90 text-center" style="font-size: 18px;" id="bcktohome">
                                <%--<a class="txt2 QuickPay"  title="Quick Pay" style="float: left" href="javascript:void(0);"><i class="fa fa-home"></i>&nbsp;QuickPay</a>--%>
                                <a class="txt2" href="javascript:void(0);" onclick="javascript:GetWebsitePortalUrl()"><i class="fa fa-home"></i>&nbsp;Back To Home</a>
                            </div>
                        </div>
                    </form>

                </div>
                <div style="width: 279px; margin: 0 auto; height: auto;" id="QuickPay">
                    <div class="QickPayLink QuickPay Backgroung" title="Quick Pay" style="width: auto;">
                        <a href="javascript:void(0);" style="font-size: 15px; padding: 0px; margin: 0px;"><span>QuickPay</span> &nbsp;<img src="images/icon_upi.png" />
                            <p>
                                Pay Dues without Login
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 0; display: none; opacity: 0;"></div>

    <div id="modal5" class="modal bottom-sheet" style="overflow-y: hidden; max-height: 100%; background: #0000006b;">

        <div class="modal-content" style="width: 35%; padding-top: 10px; margin: auto; text-align: center;">
            <label id="OTPMsg" style="display: none;">PayTv has sent an OTP on <b id="MobNumber"></b>.</label>
            <label id="OTPResendMsg" style="display: none;">PayTv has resent an OTP on <b id="MobNumberResend"></b>.</label>
            <ul class="collection">
                <li class="collection-item avatar">
                    <div class="row margin input-field">
                        <div style="width: 25%; margin: auto; border-bottom: 1px solid #808080;">
                            <input id="txtTempOIP" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" maxlength="4" autocomplete='off' placeholder="" />
                        </div>
                        <div class="errorMsg" style="margin-bottom: 10px;"></div>
                    </div>
                </li>

            </ul>
            <div class="input-field col s12" id="OTPContinue">
                <a href="javascript:void(0);" onclick="javascript:CheckRegisterOTP(); return false;" class="btn waves-effect waves-light col s12" tabindex="2">Continue</a>
            </div>

            <div class="input-field col s12" style="margin-bottom: 17px; margin-top: 7px;" id="OTPRetry">
                <a href="javascript:void(0);" onclick="javascript:ResendOTPNumber(); return false;" class="btn waves-effect waves-light col s12" tabindex="3">Resend OTP</a>
            </div>
            <div id="preloader-wrapper" style="display: none">
                <div class="showbox">
                    <div class="loader">
                        <svg class="circular" viewBox="25 25 50 50">
                            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Quick Pay-->
    <div class="DefaultPage">
        <div class="overlay overlay-data overlay-open QuickPayDiv" style="display: none">
            <div class="QuickPayMain" style="display: block">

                <a href="javascript:void(0);" class="overlay-close" onclick=" javascript:CloseQuikPay(); return false;"><i class="fa fa-times-circle"></i></a>

                <div class="clear"></div>
                <div class="IDStep" style="display: block;">
                    <div style="text-align: center; font-size: 14px;">
                        <p style="font-size: 15px; font-weight: 600;">Enter Your PayTV Unique id</p>
                        <p class="Step2Error" style="visibility: hidden; margin: 5px;">Please fill any one of the field.</p>
                        <div class="innerDiv">
                            <input type="text" class="clsStep2txtbox" placeholder="Enter Your PayTV Unique id" id="MCTNO" maxlength="14" onkeyup="javascript:removeStepError(); return false;" style="margin-top: 2px;" />
                            <button type="button" class="btn btn-default" onclick="javascript:GetCustDetails(); return false;">Next&nbsp;<i class="fa fa-arrow-circle-right"></i></button>
                        </div>
                        <div class="innerDiv" style="margin-top: 16px;">
                            <a href="javascript:void(0);" class="clsSkipStep" onclick="javascript:DontKnowID(); return false;" style="width: 100%; margin-top: 25px; color: #005e9b; text-decoration: underline;">Don't know PayTV Unique id?</a>
                            <div class="clear"></div>
                            <div class="sk-fading-circle">
                                <div class="sk-circle1 sk-circle"></div>
                                <div class="sk-circle2 sk-circle"></div>
                                <div class="sk-circle3 sk-circle"></div>
                                <div class="sk-circle4 sk-circle"></div>
                                <div class="sk-circle5 sk-circle"></div>
                                <div class="sk-circle6 sk-circle"></div>
                                <div class="sk-circle7 sk-circle"></div>
                                <div class="sk-circle8 sk-circle"></div>
                                <div class="sk-circle9 sk-circle"></div>
                                <div class="sk-circle10 sk-circle"></div>
                                <div class="sk-circle11 sk-circle"></div>
                                <div class="sk-circle12 sk-circle"></div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="step-1" style="display: none;">
                    <div style="text-align: center; color: #000; margin-bottom: 1px; font-size: 16px;">
                        <p style="font-size: 15px; font-weight: 600;"><b>Step-1</b>&nbsp;Select Your Geographical Details.</p>
                        <p class="Step1Error" style="visibility: hidden; margin: 5px;">.</p>
                    </div>
                    <div class="innerDiv">
                        <select id="SelectState" class="browser-default">
                            <option value="-1">Select Your State</option>
                        </select>

                        <select id="SelectCity" class="browser-default">
                            <option value="-1">Select Your City</option>
                        </select>

                        <select id="SelectServiceProvider" class="browser-default">
                            <option value="-1">Select Your Service Provider</option>
                        </select>
                    </div>
                    <div class="innerDiv" style="position: relative">
                        <a href="javascript:void(0);" class="clsBack" onclick="javascript:BackToStepID(); return false;"><i class="fa fa-arrow-circle-left"></i>&nbsp;Back</a>
                        <div class="sk-fading-circle float-left">
                            <div class="sk-circle1 sk-circle"></div>
                            <div class="sk-circle2 sk-circle"></div>
                            <div class="sk-circle3 sk-circle"></div>
                            <div class="sk-circle4 sk-circle"></div>
                            <div class="sk-circle5 sk-circle"></div>
                            <div class="sk-circle6 sk-circle"></div>
                            <div class="sk-circle7 sk-circle"></div>
                            <div class="sk-circle8 sk-circle"></div>
                            <div class="sk-circle9 sk-circle"></div>
                            <div class="sk-circle10 sk-circle"></div>
                            <div class="sk-circle11 sk-circle"></div>
                            <div class="sk-circle12 sk-circle"></div>
                        </div>
                        <a href="javascript:void(0);" onclick="javascript:SetServiceProvider(); return false;" class="clsContinue clsNxt" style="visibility: hidden;">Next&nbsp;<i class="fa fa-arrow-circle-right"></i></a>
                        <div class="clear"></div>
                    </div>
                </div>

                <div class="step-2" style="display: none;">
                    <div style="text-align: center; color: #000; font-size: 16px;">
                        <p style="font-size: 15px; font-weight: 600;"><b>Step-2</b>&nbsp;Enter Your Unique Identification Number.</p>
                        <p class="Step2Error" style="visibility: hidden;">Please fill any one of the field.</p>
                    </div>
                    <div class="innerDiv">
                        <%--<input type="text" class="clsStep2txtbox" placeholder="Enter Your Subscriber ID" id="txtSubsID" maxlength="20" onkeyup="javascript:removeError(); return false;"/>
                            <p class="clsStep2OR">OR</p>--%>
                        <input type="text" class="clsStep2txtbox" placeholder="Enter Your STB Number" id="txtSTB" maxlength="20" onkeyup="javascript:removeError(); return false;" />
                        <p class="clsStep2OR">OR</p>
                        <input type="text" style="margin-bottom: 25px" class="clsStep2txtbox" placeholder="Enter Your Smart Card Number" id="txtSmartCard" maxlength="20" onkeyup="javascript:removeError(); return false;" />
                    </div>
                    <div class="innerDiv" style="position: relative">
                        <a href="javascript:void(0);" class="clsBack" onclick="javascript:BackToStep1(); return false;"><i class="fa fa-arrow-circle-left"></i>&nbsp;Back</a>
                        <div class="sk-fading-circle float-left">
                            <div class="sk-circle1 sk-circle"></div>
                            <div class="sk-circle2 sk-circle"></div>
                            <div class="sk-circle3 sk-circle"></div>
                            <div class="sk-circle4 sk-circle"></div>
                            <div class="sk-circle5 sk-circle"></div>
                            <div class="sk-circle6 sk-circle"></div>
                            <div class="sk-circle7 sk-circle"></div>
                            <div class="sk-circle8 sk-circle"></div>
                            <div class="sk-circle9 sk-circle"></div>
                            <div class="sk-circle10 sk-circle"></div>
                            <div class="sk-circle11 sk-circle"></div>
                            <div class="sk-circle12 sk-circle"></div>
                        </div>
                        <a href="javascript:void(0);" onclick="javascript:checkDetails(); return false;" class="clsContinue clsNxt" style="visibility: hidden;">Next&nbsp;<i class="fa fa-arrow-circle-right"></i></a>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>

            <div class="PaymentSubsDetails" style="display: none">
                <div class="DetailsMain">
                    <div class="LeftDtails">
                        <ul>
                            <li class="leftDueamountmain">
                                <p style="color: #005a95; font-weight: 600; padding-top: 5px; line-height: 23px; font-size: 15px;">
                                    Current Subscription Expiry Date
                                <br />
                                    <span id="ExpiryDate">00-Jan-0000</span>
                                </p>
                                <h4 class="Duamounttxt" style="position: relative; padding-bottom: 0px;"><span id="AmountType">Renewal Amount</span> <span style="cursor: pointer" class="tooltip"><i class="fa fa-info-circle" style="color: #ecb733; cursor: pointer;" aria-hidden="true"></i><span class="tooltiptext">Renewal Amount for Total no of Connection : <span id="Totalconnection"></span></span></span></h4>
                                <h5 style="padding-bottom: 0px;" class="Amount" id="DueAmount">00.00</h5>
                                <%--<p>Renewal Amount for Total No. of Connection</p>--%>
                            </li>
                            <li style="margin-top: 125px;">
                                <h4>Subscriber Account #</h4>
                                <h5 id="SubsCriID" style="text-transform: uppercase; word-break: break-all;"></h5>
                            </li>
                            <li>
                                <h4>STB Number</h4>
                                <h5 id="STBNo" style="text-transform: uppercase; word-break: break-all;"></h5>
                            </li>
                            <li>
                                <h4>Smart Card Number</h4>
                                <h5 id="SmartCardNo" style="text-transform: uppercase; word-break: break-all;"></h5>
                            </li>
                            <li>
                                <h4>Name</h4>
                                <h5 id="SubsName">Devendra Sharma</h5>
                            </li>
                            <li class="ExtraLi" style="visibility: hidden;">
                                <p style="padding: 0px 0px 0px 0px; color: #373737;">Want to see further Want to see <span id="ExtraText" style="display: none;">Want to see furtherWant to see</span></p>
                            </li>
                        </ul>
                        <div class="ContinueBtn">
                            <p onclick="javascript:responsivecontinue()">Continue &nbsp;<i class="fa fa-arrow-circle-right"></i></p>
                        </div>
                    </div>

                    <div class="RightDetails">
                        <div class="DueDateTop">
                            <p>Quick Pay (<span id="CompanyName"></span>)</p>
                            <a href="javascript:void(0);" class="overlay-close FullCloseBtn" onclick="javascript:CloseQuikPay(); return false;"><i class="fa fa-times"></i></a>
                            <a href="javascript:void(0);" class="overlay-close SmalClosebtn" onclick="javascript:CloseQuikPay(); return false;"><i class="fa fa-times"></i></a>
                        </div>
                        <div id="modal1" class="PaymentSteps">
                            <div class="model-email-content">
                                <div class="card">
                                    <div class="card-content">
                                        <form action="?" method="GET">
                                            <ul>
                                                <li>
                                                    <div class="input-field PaymentFormdetails">
                                                        <input name="MobileNumber" style="padding-left: 23px; width: 94%;" type="text" class="validate" id="paymnetMobilenumber" autocomplete="off" maxlength="10" placeholder="Mobile Number" />
                                                        <p style="position: absolute; color: #ecb733; float: left; margin-top: -27px; font-size: 17px;"><i class="zmdi zmdi-smartphone-iphone zmdi-hc-fw" aria-hidden="true"></i></p>
                                                        <label id="MobileNoError" class="active ContactError" for="PaymentAmount" style="visibility: hidden; color: red; font-size: 11px !important; margin-top: 4px; margin-bottom: 0px;">
                                                            .
                                                        </label>
                                                    </div>
                                                    <div class="input-field PaymentFormdetails">
                                                        <input name="EmailAddress" style="padding-left: 19px; width: 94%;" type="text" class="validate" id="PayMentEmaiId" autocomplete="off" placeholder="Email Id" />
                                                        <p style="position: absolute; color: #ecb733; float: left; margin-top: -25px; font-size: 14px;"><i class="zmdi zmdi-email zmdi-hc-fw" aria-hidden="true"></i></p>
                                                        <label id="EmailIdError" class="active ContactError" for="PaymentAmount" style="visibility: hidden; color: red; font-size: 11px !important; margin-top: 4px; margin-bottom: 0px;">.</label>
                                                    </div>

                                                </li>
                                            </ul>
                                            <ul class="stepper tabs" id="PayTVPayment" style="margin-top: -13px">

                                                <p class="PaymentError" style="display: block; margin: 0; padding-left: 10px;"></p>
                                                <li class="step active">
                                                    <div class="step-title">Payment Detail</div>
                                                    <div class="step-content" style="display: block;">
                                                        <div class="row">
                                                            <div class="input-field col s12" style="display: block;">
                                                                <label for="compose" class="active">Payment Gateway </label>
                                                                <select id="drpPG" class="browser-default" style="display: none">
                                                                    <option value="9">HDFC</option>
                                                                    <option value="6">PayUmoney</option>
                                                                </select>
                                                                <div class="MobileviewMain">
                                                                    <div class="RedioBtnMob HDFCDiv" style="display: none">
                                                                        <input id="HDFCBtn" value="9" class="Mobileview" name="PaymentGaetway" type="radio" checked="" />
                                                                        <label for="HDFCBtn" class="Mobileview-label RedioBtnMobN">
                                                                            <img src="images/ccavenue-logopng.png" style="width: 60%;" />
                                                                        </label>
                                                                    </div>
                                                                    <div class="RedioBtnMob PayUDiv" style="display: none">
                                                                        <input id="PayUBtn" value="6" class="Mobileview " name="PaymentGaetway" type="radio" />
                                                                        <label for="PayUBtn" class="Mobileview-label RedioBtnMobN">
                                                                            <img src="images/PayU_Corporate_Logo.png" style="width: 70%;" /></label>
                                                                    </div>
                                                                </div>

                                                                <label id="PG-error" class="active" for="drpPG" style="display: none;">Select Payment Gateway</label>
                                                            </div>
                                                            <div class="input-field col s12" style="margin-top: 18px;">
                                                                <input name="PaymentAmount" type="text" class="validate" id="txtPaymentAmount" autocomplete="off" maxlength="6" placeholder="Min. Amount 1 /-" data-paylimit="1" />
                                                                <label id="PaymentAmount-error" class="invalid active" for="PaymentAmount" style="display: none;"></label>
                                                                <label for="txtPaymentAmount" style="display: none;" class="active">Enter Amount</label>
                                                            </div>
                                                        </div>
                                                        <div class="step-actions">
                                                            <button class="waves-effect waves-dark btn yelow next-step" data-feedback="CountinuePayMode">CONTINUE</button>
                                                        </div>
                                                        <div class="cover-spin"></div>
                                                    </div>
                                                </li>
                                                <li class="step" id="PayModeDiv" style="pointer-events: none">
                                                    <div class="step-title">Payment Mode</div>
                                                    <div class="step-content" style="display: none;">
                                                        <div class="row" id="PayMode">
                                                        </div>
                                                        <div class="step-actions">
                                                            <button class="waves-effect waves-dark btn-flat previous-step" onclick="BackWorkPayMode()">BACK</button>
                                                            <button class="waves-effect waves-dark btn yelow next-step" data-feedback="GetPaymentDetails">CONTINUE</button>
                                                        </div>
                                                        
                                                    </div>
                                                    <div class="cover-spin"></div>
                                                </li>
                                                <li class="step" id="ConfirmPayDiv" style="pointer-events: none">
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

                                                        <div class="PayLeft" style="color: #ecb733;">Payable Amount</div>
                                                        <div class="PayRight" style="color: #ecb733;" id="PayableAmount"></div>
                                                        <div class="clear"></div>

                                                        <div class="step-actions">
                                                            <button class="waves-effect waves-dark btn-flat previous-step" onclick="BackWork()">BACK</button>
                                                            <button class="waves-effect waves-dark btn yelow next-step" id="PayNowBtn" data-feedback="GetPaymentTransID">PAY NOW</button>
                                                        </div>
                                                        <div class="cover-spin"></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                                <p style="padding: 0px 14px 0px 14px; color: #373737; margin: 0px; font-size: 13px; /* position: absolute; */">Want to see further bifurcatuion of Renewal amount? Click here to <a style="color: #0099fd;" target="_blank" href="https://demosignin.paytvselfcare.tv/SignIn">Login</a>  or <a style="color: #0099fd;" target="_blank" href="https://demosignin.paytvselfcare.tv/Register">Register Now</a></p>
                                <div style="display: none;" id="RegisterPayTv">
                                    <p>Would you Like to register with PayTvSelfCare? &nbsp; &nbsp;</p>
                                    <div class="MobileviewMain" style="width: auto; display: inline-block; float: left; margin-top: 0px;">
                                        <%--<input id="Register" value="9" class="CheckIsReg" name="Register" type="checkbox" checked="checked" />
                                        <label for="Register" class="CheckIsReg-label CheckIsRegBtn"></label>--%>
                                        <div class="input_wrapper">
                                            <input type="checkbox" class="switch_4" id="IsRegisterCheck" checked="checked" />
                                            <svg class="is_checked" viewBox="0 0 426.67 426.67">
                                                <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"></path>
                                            </svg>
                                            <svg class="is_unchecked" viewBox="0 0 212.982 212.982">
                                                <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="coformation">
                            Please confirm the payment details given above. After confirmation please click on the [Pay Now] to continue payment process.
                        </div>
                    </div>

                </div>
            </div>


        </div>
    </div>
    <div class="ErrorShowMian" style="display: none">
        <div class="ErrorMsgBox">
            <div class="ErrorMsgicon" style="display: block;">
                <img src="images/others/ErrorMasg.png" />
            </div>
            <p class="errortext" id="ErrorText">.</p>
            <div class="confirm-buttons"><a href="javascript:void(0)" onclick="javascript:CloseError()">OK</a></div>
        </div>
    </div>

    <div id="Loadingbg" style="display: none;">
        <div class="LoadingBg">
        </div>
        <div class="cssload-box-loading">
        </div>
    </div>
</body>
</html>
