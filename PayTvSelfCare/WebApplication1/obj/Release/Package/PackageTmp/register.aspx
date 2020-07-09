<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="WebApplication1.register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>PayTvSelfCare</title>
    <link rel="icon" href="images/others/PaytvLogo.png" type="image/png" sizes="16x16" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="css/login/main.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <%-- <link href="css/bootstrap.min.css" rel="stylesheet" />--%>
    <link href="css/DashboardCSS/style.min.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/jquery-confirm.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/register.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css" />
    <%--<script src="js/jquery-1.12.3.min.js"></script>--%>
    <link href="css/DashboardCSS/Msgbox.css" rel="stylesheet" />

    <script src="js/Dashboard_Js/jquery-1.11.2.min.js"></script>
    <script src="js/Dashboard_Js/MsgBox.js"></script>
    <script src="js/Dashboard_Js/jquery-confirm.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/Register.js?ver=0.0.1?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Dashboard_Js/materialize.min.js"></script>
    <style>
        .RegisterHedingmMain { text-align: center; padding-top: 68px; padding-bottom: 0px; }
        .RegisterHeding h5 { color: #fff; font-size: 24px; font-family: "Roboto", sans-serif !important; font-weight: 400; }
        .RegisterHeding p { color: #232323; font-size: 15px; }
        select { background-color: transparent; width: 100%; padding: 5px; border: none; border-radius: 2px; height: 36px; border-bottom: 1px solid #fff; color: #fff; font-family: "Roboto", sans-serif !important; font-weight: 400; font-size: 15px; margin-bottom: 13px;}
            select:focus { outline: none; }
        #ServiceProvider .errorMsg { margin-left: 5px !Important; }
        .errorMsg { font-size: 14px; margin-left: 48px; color: #ea0000; visibility: hidden; min-height: 18px; }
        .wrap-input100 { margin-bottom: 9px; }
        html, body { height: 100%; overflow: auto !important; }
        #LogInTypeCheck .btn { height: 26px; line-height: 26px; padding: 0 1rem; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 0px 0px 0 rgba(0,0,0,0.12); }
        .lean-overlay { pointer-events: none; }

        #ServiceProvider .errorMsg { margin-left: 5px !Important; }
        .select-wrapper input.select-dropdown { margin: 0 0 0px 0 !important; }

        .RegTopGreen { color: #468847; background-color: #dff0d8; border-color: #d6e9c6; }
        .RegTopRed { color: #fb0a06 !important; margin: 0px 16px; background-color: #f2dede; border-color: #ebccd1; display: none; font-weight: 500; }

        .preloader-wrapper { display: none; }
            .preloader-wrapper.big { width: 30px; height: 30px; margin-left: 46%; }

        #RegisterNow { pointer-events: none; background: #9c9c9c; }
        #RegisterMinDiv { cursor: no-drop; }
        #modal2 ul li { list-style-type: circle; margin-left: 2%; }

        #overlay { position: fixed; display: none; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.75); z-index: 2; cursor: pointer; text-align: center; }

        #GetMCTUniqueIDDetails { margin-bottom: 20px; }
        .clsDetailFloat { float: left; }
        .clsDetailClear { clear: both; }
        .clsDetailLeft { width: 110px; padding: 5px; font-weight: 300; color: #ffffff; }
        .clsDetailMid { width: 5px; padding: 5px; }
        .clsDetailRight { width: 175px; padding: 5px; }
        #MCTUidCustDetail { word-break: break-all; }
        #OTPContinue a { background: #0099fd; color: #fff; font-size: 18px; padding: 10px 50px; font-family: Roboto; font-weight: 300; }
        #OTPRetry a { color: #0099fd; font-size: 16px; padding: 10px 10px; font-family: Roboto; font-weight: 300; }
        #OTPMsg { padding: 20px 0px; }
        #txtTempOIP { color: #232323; text-align: center; font-size: 16px; font-family: Roboto; width: 100%; }
        .modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; display: none; overflow: hidden; -webkit-overflow-scrolling: touch; outline: 0; }
        .modal-content { position: relative; background-color: #fff; -webkit-background-clip: padding-box; background-clip: padding-box; border: 1px solid #999; border: 1px solid rgba(0,0,0,.2); border-radius: 6px; outline: 0; -webkit-box-shadow: 0 3px 9px rgba(0,0,0,.5); box-shadow: 0 3px 9px rgba(0,0,0,.5); }
        label { display: inline-block; max-width: 100%; margin-bottom: 5px; font-weight: 700; font-size: 14px; }
        b, strong { font-weight: 700; }
        ul, li { margin: 0px; list-style-type: none; }
        
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
<body>

    <div class="limiter">
        <div class="container-login100" style="background-image: url('images/login/channel-bg.png');">
            <div class="wrap-login100">
                <form class="login100-form validate-form" autocomplete='off'>
                    <div class="Login_Logo">
                        <div class="login100-form-logo">
                            <i class="fa fa-user"></i>
                        </div>
                    </div>

                    <div class="row RegisterHedingmMain">
                        <div class="input-field col s12 center RegisterHeding" id="MCTUniqueId">
                            <h5>Account Registration</h5>
                            <p class="center"><b id="B1">Step-1</b>&nbsp;Enter Your PayTv Unique id.</p>
                        </div>
                        <div class="input-field col s12 center RegisterHeding" id="RegFirstHead" style="display: none;">
                            <h5>Account Registration</h5>
                            <p class="center"><b>Step-1</b>&nbsp;Select Your Geographical Details.</p>
                        </div>
                        <div class="input-field col s12 center RegisterHeding" id="RegSecondHead" style="display: none;">
                            <h5>Account Registration</h5>
                            <p class="center"><b id="SetStep1">Step-2</b>&nbsp;Enter Your Unique Identification Number.</p>
                            <p class="center RegTopRed">
                                Please fill any one of the field.
                            </p>
                        </div>
                        <div class="input-field col s12 center RegisterHeding" id="RegSubsDetailHead" style="display: none;">
                            <h5>Account Registration</h5>
                            <p class="center"><b id="B2">Step-2</b>&nbsp;Subscriber Details.</p>
                        </div>
                        <div class="input-field col s12 center RegisterHeding" id="RegLastHead" style="display: none;">
                            <h5>Account Registration</h5>
                            <p class="center"><b id="SetStep2">Step-3</b>&nbsp;Enter Your Login Credentials.</p>
                        </div>
                    </div>
                    <div class="wrap-loginInput">
                    <div id="MCTUniqueIdDiv" style="display: block">
                        <div class="input-field">
                            <div class="wrap-input100 validate-input" data-validate="Enter username" style="margin-bottom: 6px;">
                                <%--<input class="input100" type="text" name="username" placeholder="PayTvUniqId" />--%>
                                <input class="input100" id="txtMCTUniqueId" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" maxlength="15" autocomplete='off' placeholder="PayTvUniqId" />
                                <span class="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>
                            <div class="errorMsg" style="margin-left: 8px; margin-bottom: 24px;"></div>
                        </div>
                        <div class="container-login100-form-btn">
                            <a class="login100-form-btn" href="javascript:void(0);" id="GetMCTUniqueIDDetails" onclick="javascript:GetMCTUniqueIDDetails(); return false;">Continue&nbsp;<i class="fa fa-arrow-right" style="font-size: 16px;"></i>
                            </a>
                        </div>

                        <div class="p-t-90 text-center" style="font-size: 16px;">
                            <a class="txt1" href="javascript:void(0);" onclick="javascript:DontKnowID(); return false;">Register with other Details</a>
                        </div>
                    </div>

                    <div id="MCTUidCustDetail" style="display: none;">
                        <div class="row margin">
                            <div class="input-field col s12" style="margin-bottom: 20px">
                                <div>
                                    <div class="clsDetailFloat clsDetailLeft">Subscriber ID</div>
                                    <div class="clsDetailFloat clsDetailMid">:</div>
                                    <div class="clsDetailFloat clsDetailRight" id="MidSubsID"></div>
                                    <div class="clsDetailClear"></div>
                                </div>
                                <div>
                                    <div class="clsDetailFloat clsDetailLeft">STB Number</div>
                                    <div class="clsDetailFloat clsDetailMid">:</div>
                                    <div class="clsDetailFloat clsDetailRight" id="MidSTBNumber"></div>
                                    <div class="clsDetailClear"></div>
                                </div>
                                <div>
                                    <div class="clsDetailFloat clsDetailLeft">SC Number</div>
                                    <div class="clsDetailFloat clsDetailMid">:</div>
                                    <div class="clsDetailFloat clsDetailRight" id="MidSmartCardNum"></div>
                                    <div class="clsDetailClear"></div>
                                </div>
                                <div>
                                    <div class="clsDetailFloat clsDetailLeft">Name</div>
                                    <div class="clsDetailFloat clsDetailMid">:</div>
                                    <div class="clsDetailFloat clsDetailRight" id="MidName"></div>
                                    <div class="clsDetailClear"></div>
                                </div>
                                <div>
                                    <div class="clsDetailFloat clsDetailLeft">Address</div>
                                    <div class="clsDetailFloat clsDetailMid">:</div>
                                    <div class="clsDetailFloat clsDetailRight" id="MidAddress"></div>
                                    <div class="clsDetailClear"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="text-align: center;">
                            <div class="input-field col s12">
                                <div class="container-login100-form-btn">
                                    <a href="javascript:void(0);" id="A1" onclick="javascript:ContinueToReg(); return false;" class="login100-form-btn" tabindex="1">Continue&nbsp;<i class="fa fa-arrow-right" style="font-size: 16px;"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="ServiceProvider" style="display: none;">
                        <div class="row margin">
                            <div class="input-field col s12" id="State">
                                <select id="SelectState">
                                </select>
                                <div class="errorMsg"></div>
                            </div>
                        </div>

                        <div class="row margin">
                            <div class="input-field col s12">
                                <select id="Citylist" class="browser-default">
                                    <option value="" disabled selected>Select Your City</option>
                                </select>
                                <div class="errorMsg"></div>
                            </div>
                        </div>
                        <div class="row margin">
                            <div class="input-field col s12">
                                <select id="SelectServiceProvider" class="browser-default">
                                    <option value="" disabled selected>Select Your Service Provider</option>
                                </select>
                                <div class="errorMsg"></div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <div class="container-login100-form-btn">
                                    <a href="javascript:void(0);" onclick="javascript:SetServiceProvider(); return false;" class="login100-form-btn" tabindex="1">Continue&nbsp;<i class="fa fa-arrow-right" style="font-size: 16px;"></i>
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>


                    <div id="EnterMemSTBVC" style="display: none;">
                        <div class="row margin input-field">
                            <div class="wrap-input100 validate-input" style="margin-bottom: 15px;">
                                <input class="input100" id="txtMembershipNumber" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" autocomplete='off' placeholder="Subscriber ID" />
                                <span class="focus-input100" data-placeholder="&#xf292;"></span>

                            </div>
                            <div class="errorMsg" style="margin: 0px 0px 10px 10px;"></div>
                        </div>
                        <div class="row margin">
                            <div class="input-field col s12" style="text-align: center;">
                                OR
                            </div>
                        </div>
                        <div class="row margin input-field">
                            <div class="wrap-input100 validate-input" style="margin-bottom: 15px;">
                                <input class="input100" id="txtSTBNumber" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" autocomplete='off' placeholder="STB Number" />
                                <span class="focus-input100" data-placeholder="&#xf292;"></span>
                                <span class="STBVCInfo" onclick="javascript:STBIfo('STB'); return false;"><i class="fa fa-question-circle"></i></span>

                            </div>
                            <div class="errorMsg" style="margin: 0px 0px 10px 10px;"></div>
                        </div>
                        <div class="row margin">
                            <div class="input-field col s12" style="text-align: center;">
                                OR
                            </div>
                        </div>
                        <div class="row margin input-field">
                            <div class="wrap-input100 validate-input" style="margin-bottom: 15px;">
                                <input class="input100" id="txtSmartCardNumber" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" autocomplete='off' placeholder="Smart Card Number" />
                                <span id="lblSmartCardNumber" class="focus-input100" data-placeholder="&#xf292;"></span>
                                <span class="STBVCInfo" onclick="javascript:VCInfo('VC'); return false;"><i class="fa fa-question-circle"></i></span>

                            </div>
                            <div class="errorMsg" style="margin: 0px 0px 10px 10px;"></div>
                        </div>
                        <div class="row">
                            <div class="container-login100-form-btn">
                                <a href="javascript:void(0);" onclick="javascript:SetMemSTBVC(); return false;" class="login100-form-btn" tabindex="4">Continue&nbsp;<i class="fa fa-arrow-right" style="font-size: 16px;"></i></a>
                            </div>
                        </div>

                        <div id="overlay">
                            <div id="Skip"><a href="javascript:void(0);" onclick="javascript:Skip(); return false;">Got It&nbsp;<i class="fa fa-arrow-right"></i></a></div>
                            <div id="Skip1"><a href="javascript:void(0);" onclick="javascript:GotIt(); return false;">Got It&nbsp;<i class="fa fa-arrow-right"></i></a></div>

                            <div id="text">
                                <p style="font-size: 15px; padding: 5px; text-align: center; color: #fff;">Find the STB and Smart Card number on the back side or on the bottom of the Set Top Box. </p>
                                <p style="text-align: center; color: #fff;"><i class="fa fa-hand-o-down"></i></p>
                                <img src="Images/STBVCInfo.png" style="width: 32%;" />
                                <p style="font-size: 15px; padding: 5px; text-align: center; color: #fff;">Or</p>
                                <p style="font-size: 15px; padding: 5px; text-align: center; color: #fff;">Get your STB or Smart Card information in main menu settinges of the Set Top Box.</p>

                            </div>

                            <div id="text1">
                                <p style="font-size: 15px; padding: 5px; text-align: center; color: #fff">Find the Smart Card Number on the front side of the smart card. </p>
                                <p style="text-align: center; color: #fff"><i class="fa fa-hand-o-down"></i></p>
                                <img src="Images/SC.png" style="width: 35%; border-top-left-radius: 55%; margin-top: 5%;" />
                                <p style="font-size: 15px; padding: 5px; text-align: center; color: #fff">Or</p>
                                <p style="font-size: 15px; padding: 5px; text-align: center; color: #fff">Get your STB or Smart Card information in main menu settinges of the Set Top Box.</p>
                            </div>
                        </div>
                    </div>

                    <div style="display: none;" id="RegisterDiv">
                        <div class="row margin input-field">
                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="txtMobileNumber" maxlength="10" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" autocomplete='off' placeholder="Mobile Number" />
                                <span class="focus-input100" data-placeholder="&#xf2c8;"></span>

                            </div>
                            <div class="errorMsg"></div>
                        </div>

                        <div class="row margin input-field">
                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="txtEmail" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" autocomplete='off' placeholder="Email" />
                                <span class="focus-input100" data-placeholder="&#xf159;"></span>
                            </div>
                            <div class="errorMsg"></div>
                        </div>

                        <div class="row margin input-field" style="margin-bottom: 0px;">
                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="txtPassword" type="password" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" autocomplete='off' placeholder="Password" />
                                <span class="focus-input100" data-placeholder="&#xf183;"></span>
                                <span class="ShowHidePassword" onclick="javascript:ShowHidePassword(this); return false;"><i class="mdi-action-visibility-off"></i></span>

                            </div>
                            <div class="errorMsg"></div>
                        </div>

                        <div class="row" style="margin-bottom: 0px;">
                            <div class="col s12 contact100-form-checkbox" style="padding-left: 19px;">
                                <input class="input-checkbox100" type="checkbox" id="TermsConditions" onchange="javascript:SetTandC(); return false;" />
                                <label class="label-checkbox100" tabindex="4" for="TermsConditions" style="font-size: 13px; color: #ffffff; font-family: Roboto">By proceeding, you agree to <a href="#modal2" class="modal-trigger" style="font-size: 13px; color: #232323; font-family: Roboto" onclick="window.open('../TermsandConditions')">Terms & Conditions</a></label>
                            </div>
                        </div>
                        <div class="row text-center" id="RegisterMinDiv">
                            <div class="container-login100-form-btn">
                                <a href="javascript:void(0);" id="RegisterNow" onclick="javascript:RegisterNow(); return false;" class="login100-form-btn" tabindex="9">Register Now</a>
                            </div>
                        </div>
                    </div>


                    <!--OTP Div-->
                    <div class="preloader-wrapper">
                        <div class="showbox">
                            <div class="loader">
                                <svg class="circular" viewBox="25 25 50 50">
                                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="row">


                        <div class="p-t-90 p-b-34 text-left register_login" style="font-size: 18px; float: left;">
                            <p>Already have an account? <a class="txt2" href="javascript:void(0);" onclick="document.location.replace('../SignIn');">&nbsp; SignIn</a></p>
                        </div>

                        <div class="input-field p-t-90 col s3" id="BackToUniqueID" style="display: none; text-align: right;">
                            <a href="javascript:void(0);" onclick="javascript:BackToMCTUniqueID(); return false;" tabindex="10" title="Back">
                                <img src="Images/MyCableTvBack.png" style="width: 20px; margin-top: 2px; margin-right: 10px;" alt="Back" />
                            </a>
                        </div>

                        <div class="input-field p-t-90 col s3" id="BackToServiceProvider" style="display: none; text-align: right;">
                            <a href="javascript:void(0);" onclick="javascript:BackToServiceProvider(); return false;" tabindex="10" title="Back">
                                <img src="Images/MyCableTvBack.png" style="width: 20px; margin-top: 2px; margin-right: 10px;" alt="Back" />
                            </a>
                        </div>

                        <div class="input-field p-t-90 col s3" style="display: none; text-align: right;" id="BackToSTBVC">
                            <a href="javascript:void(0);" onclick="javascript:BackToSTBVC(); return false;" tabindex="11" title="Back">
                                <img src="Images/MyCableTvBack.png" style="width: 20px; margin-top: 2px; margin-right: 10px;" alt="Back" />
                            </a>
                        </div>

                        <div class="input-field col s3" style="display: none; text-align: right;" id="BackToSubsDetailReg">
                            <a href="javascript:void(0);" onclick="javascript:BackToMCTUIDSec(); return false;" tabindex="11" title="Back">
                                <img src="Images/MyCableTvBack.png" style="width: 20px; margin-top: 2px; margin-right: 10px;" alt="Back" />
                            </a>
                        </div>

                        <div class="input-field col s3" style="display: none; text-align: right;" id="BackToMCTUIDLast">
                            <a href="javascript:void(0);" onclick="javascript:BackToSubsDetail(); return false;" tabindex="11" title="Back">
                                <img src="Images/MyCableTvBack.png" style="width: 20px; margin-top: 2px; margin-right: 10px;" alt="Back" />
                            </a>
                        </div>
                    </div>
                    </div>
                </form>
            </div>

            <!--trems and condications-->
            <%--            <div id="modal2" class="modal modal-fixed-footer" style="background: #00000061;">
                
            </div>--%>


            <!--OTP Div-->

            <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 0; display: none; opacity: 0;"></div>
            <div id="modal-bottom-sheet">

                <div class="row" style="margin-bottom: 0px;">
                    <div class="col s12 m8 l9">
                        <div id="modal5" class="modal bottom-sheet" style="overflow-y: hidden; max-height: 100%; background: #0000007a;">

                            <div class="modal-content" style="width: 35%; margin: auto; text-align: center;">
                                <label id="OTPMsg" style="display: none;">PayTV SelfCare will send a OTP on <b id="MobNumber"></b>.</label>
                                <label id="OTPResendMsg" style="display: none;">PayTV SelfCare will resend a OTP on <b id="MobNumberResend"></b>.</label>
                                <ul class="collection">
                                    <li class="collection-item avatar">
                                        <div class="row margin input-field">
                                            <div style="width: 25%; margin: auto; border-bottom: 1px solid #808080;">
                                                <input id="txtTempOIP" type="password" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" maxlength="4" autocomplete='off' placeholder="OTP" />
                                            </div>
                                            <div class="errorMsg"></div>
                                        </div>
                                    </li>

                                </ul>
                                <div class="input-field col s12" id="OTPContinue">
                                    <a href="javascript:void(0);" onclick="javascript:CheckRegisterOTP(); return false;" class="btn waves-effect waves-light col s12" tabindex="2">Continue</a>
                                </div>

                                <div class="input-field col s12" style="margin-bottom: 35px; margin-top: 20px;" id="OTPRetry">
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
                    </div>
                </div>
            </div>


        </div>
    </div>
</body>
</html>
