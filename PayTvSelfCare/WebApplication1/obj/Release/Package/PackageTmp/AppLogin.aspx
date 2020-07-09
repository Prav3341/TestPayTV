<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AppLogin.aspx.cs" Inherits="WebApplication1.AppLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="msapplication-tap-highlight" content="no" />
    <link href="css/login/main.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/style.min.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/DashboardCSS/jquery-confirm.css" rel="stylesheet" />
    <link href="css/register.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <%--<link href="css/DashboardCSS/materialize.min.css" rel="stylesheet" />--%>
    <link href="fonts/iconic/css/material-design-iconic-font.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css" />
    <%--<script src="js/jquery-1.12.3.min.js"></script>--%>
    <link href="css/DashboardCSS/Msgbox.css" rel="stylesheet" />
    <script src="js/jquery-1.12.3.min.js"></script>
    <script src="js/Dashboard_Js/RstForm/common.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Dashboard_Js/jquery-confirm.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Login/Login.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Dashboard_Js/MsgBox.js"></script>
    <style>
        .ErrorOkBtn { background: #0099fd; color: #fff; padding: 9px 42px; -webkit-box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); -moz-box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); }

        #OTPContinue a { background: #0099fd; color: #fff; font-size: 18px; padding: 10px 50px; font-family: Roboto; font-weight: 300; }
        #OTPRetry a { color: #0099fd; font-size: 16px; padding: 10px 10px; font-family: Roboto; font-weight: 300; }
        #OTPMsg { padding: 20px 0px; }
        #txtTempOIP { color: #232323; text-align: center; font-size: 16px; font-family: Roboto; width: 100%; }
    </style>
</head>
<body>
    <div class="limiter">
        <div class="container-login100" style="background-image: url('images/login/36.png');">
            <div class="wrap-login100">
                <form class="login100-form validate-form" autocomplete='off'>
                    <span class="login100-form-logo">
                        <i class="fa fa-user"></i>
                    </span>
                    <span class="login100-form-title p-b-34 p-t-27">Log in
                    </span>

                    <div class="wrap-input100 validate-input" data-validate="Enter username">
                        <input class="input100" type="text" id="txtUserName" name="username" placeholder="Enter your Mobile Or Email" />
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>

                    </div>
                    <p style="visibility: hidden; position: absolute; display: block; color: #e10303; margin-top: -25px;" id="PUserId" class="">Please Enter Mobile Or Email</p>


                    <div class="wrap-input100 validate-input" data-validate="Enter password">
                        <input class="input100" type="password" id="txtUserPass" name="pass" autocomplete='off' placeholder="Enter your password" />
                        <span class="focus-input100" data-placeholder="&#xf191;"></span>
                    </div>
                    <p style="visibility: hidden; position: absolute; display: block; color: #e10303; margin-top: -25px;" id="PPwd" class="">Please Enter Password</p>

                    <div class="contact100-form-checkbox">
                        <input class="input-checkbox100" id="RememberMe" type="checkbox" name="remember-me" autocomplete='off' />
                        <label class="label-checkbox100" for="RememberMe">
                            Remember me
                        </label>
                    </div>

                    <div class="container-login100-form-btn">
                        <a class="login100-form-btn" onclick="LoginFunction();" style="cursor: pointer">Login
                        </a>
                    </div>

                    <div class="p-t-90 text-left" style="font-size: 16px;">
                        <a style="float: left;" class="txt1" href="javascript:void(0);" onclick="document.location.replace('../Register');">Register Now!</a>
                        <a style="float: right;" class="txt1" href="javascript:void(0);" onclick="document.location.replace('../ForgotPassword');">Forgot Password?</a>
                    </div>

                    <%-- <div class="p-t-90 text-center" style="font-size: 18px;">
                        <a class="txt2" href="javascript:void(0);" onclick="javascript:BackTOoHome('<%=System.Configuration.ConfigurationManager.AppSettings["Portalurl"].ToString() %>','<%=System.Configuration.ConfigurationManager.AppSettings["WebSiteurl"].ToString() %>')"><i class="fa fa-home"></i>&nbsp;Back To Home</a>
                    </div>--%>
                </form>
            </div>
        </div>
    </div>

    <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 0; display: none; opacity: 0;"></div>
    <div id="modal-bottom-sheet">

        <div class="row" style="margin-bottom: 0px;">
            <div class="col s12 m8 l9">
                <div id="modal5" class="modal bottom-sheet" style="overflow-y: hidden; max-height: 100%; background: #0000006b;">

                    <div class="modal-content" style="width: 35%; margin: auto; text-align: center;">
                        <label id="OTPMsg" style="display: none;">PayTv has sent an OTP on <b id="MobNumber"></b>.</label>
                        <label id="OTPResendMsg" style="display: none;">PayTv has resent an OTP on <b id="MobNumberResend"></b>.</label>
                        <ul class="collection">
                            <li class="collection-item avatar">
                                <div class="row margin input-field">
                                    <div style="width: 25%; margin: auto; border-bottom: 1px solid #808080;">
                                        <input id="txtTempOIP" type="text" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" maxlength="4" autocomplete='off' placeholder="Email" />
                                    </div>
                                    <div class="errorMsg"></div>
                                </div>
                            </li>

                        </ul>
                        <div class="input-field col s12" id="OTPContinue">
                            <a href="javascript:void(0);" onclick="javascript:CheckRegisterOTP(); return false;" class="btn waves-effect waves-light col s12" tabindex="2">Continue</a>
                        </div>

                        <div class="input-field col s12" style="margin-bottom: 35px;" id="OTPRetry">
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
    <div id="Loadingbg" style="display: none;">
        <div class="LoadingBg">
        </div>
        <div class="cssload-box-loading">
        </div>
    </div>
</body>
</html>
