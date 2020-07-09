<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="forgot_password.aspx.cs" Inherits="WebApplication1.forgot_password" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>PayTvSelfCare</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="images/others/PaytvLogo.png" type="image/png" sizes="16x16" />
    <link href="css/login/main.css" rel="stylesheet" />
    <link href="css/DashboardCSS/style.min.css" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <%-- <link href="css/bootstrap.min.css" rel="stylesheet" />--%>
    <link href="css/DashboardCSS/style.min.css" rel="stylesheet" />

    <link href="css/DashboardCSS/jquery-confirm.css" rel="stylesheet" />
    <link href="css/register.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css" />
    <link href="css/DashboardCSS/Msgbox.css" rel="stylesheet" />
    <script src="js/Dashboard_Js/jquery-1.11.2.min.js"></script>
    <script src="js/Dashboard_Js/materialize.min.js"></script>
    <link href="fonts/iconic/css/material-design-iconic-font.css" rel="stylesheet" />
    <link href="fonts/iconic/css/material-design-iconic-font.min.css" rel="stylesheet" />
    <script src="js/Dashboard_Js/jquery-confirm.js"></script>
    <script src="js/Global.js"></script>
    <script src="js/Dashboard_Js/RstForm/common.js"></script>
    <script src="js/Dashboard_Js/MsgBox.js"></script>
    <script src="js/Dashboard_Js/ForgotPassword.js"></script>
    <style>
        html, body { height: 100%; overflow: auto !important; }
        .switch-input { display: none !important; }
        .switch-label { position: relative !important; display: inline-block !important; min-width: 112px !important; cursor: pointer !important; font-weight: 500 !important; text-align: left !important; margin: 16px !important; padding: 16px 0 16px 44px !important; }
            .switch-label:before, .switch-label:after { content: "" !important; position: absolute !important; margin: 0 !important; outline: 0 !important; top: 50% !important; -ms-transform: translate(0, -50%) !important; -webkit-transform: translate(0, -50%) !important; transform: translate(0, -50%) !important; -webkit-transition: all 0.3s ease !important; transition: all 0.3s ease !important; }
            .switch-label:before { left: 1px !important; width: 34px !important; height: 14px !important; background-color: #9E9E9E !important; border-radius: 8px !important; }
            .switch-label:after { left: 0 !important; width: 20px !important; height: 20px !important; background-color: #FAFAFA !important; border-radius: 50% !important; box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084) !important; }
            .switch-label .toggle--on { display: none !important; }
            .switch-label .toggle--off { display: inline-block !important; }
        .switch-input:checked + .switch-label:before { background-color: #A5D6A7 !important; }
        .switch-input:checked + .switch-label:after { background-color: #4CAF50 !important; -ms-transform: translate(80%, -50%) !important; -webkit-transform: translate(80%, -50%) !important; transform: translate(80%, -50%) !important; }
        .switch-input:checked + .switch-label .toggle--on { display: inline-block !important; }
        .switch-input:checked + .switch-label .toggle--off { display: none !important; }
        .errorMsg { margin-left: 10px; }

        .ErrorOkBtn { background: #0099fd; color: #fff; padding: 9px 42px; -webkit-box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); -moz-box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); box-shadow: 0px 0px 5px 0px rgba(184,184,184,1); }
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
        .container-login100-form-btn { margin-top: 20px; }
        .wrap-input100 { margin-bottom: 8px; }
        .register_login { font-size: 18px; padding: 0px 27px 19px 17px; float: left; width: 100%; }

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
                <form class="login100-form validate-form" autocomplete="off">
                    <div class="Login_Logo">
                        <div class="login100-form-logo">
                            <i class="fa fa-user"></i>
                        </div>
                    </div>
                    <div id="ForgotPassword">
                        <span class="login100-form-title p-b-34 p-t-27">Forgot Password
                        </span>
                        <div class="wrap-loginInput">
                            <div class="StepTxt " style="text-align: center">
                                <p class="center clsMobile">You can reset your password using mobile number.</p>
                                <p class="center clsEmail" style="display: none">You can reset your password using email address.</p>
                            </div>

                            <div class="clsMobile">
                                <div class="input-field">
                                    <div class="wrap-input100 validate-input" data-validate="Enter username">
                                        <input id="txtFMobileNo" class="input100" type="text" onkeyup="javascript:RemoveError(this); return false;" maxlength="10" name="mobile" placeholder="MobileNumber" />
                                        <span class="focus-input100" data-placeholder="&#xf2cc;"></span>
                                    </div>
                                    <div class="errorMsg"></div>
                                </div>
                            </div>
                            <div class="clsEmail" style="display: none">
                                <div class="input-field">
                                    <div class="wrap-input100 validate-input" data-validate="Enter username">
                                        <input id="txtFEmailId" class="input100" type="text" name="Email" onkeyup="javascript:RemoveError(this); return false;" placeholder="Email" />
                                        <span class="focus-input100" data-placeholder="&#xf159;"></span>
                                    </div>
                                    <div class="errorMsg"></div>
                                </div>
                            </div>

                            <div class="container-login100-form-btn">
                                <a class="login100-form-btn" href="javascript:void(0);" style="cursor: pointer" onclick="javascript:SetForgetPassword(); return false;">Continue</a>
                            </div>

                            <div class="p-t-90 text-center" style="font-size: 16px;">
                                <a href="javascript:void(0);" onclick="javascript:TryDifferentOption(); return false;" id="TryDifferentOption" style="color: #fff">Try a different option</a>
                            </div>
                        </div>
                    </div>

                    <div id="ResetPasswordDiv" style="display: none;">
                        <div class="row">
                            <div class="input-field col s12 center">
                                <span class="login100-form-title p-b-34 p-t-27">Reset Password</span>
                                <p class="center" style="font-size: 13px;"></p>
                            </div>
                        </div>
                        <div class="wrap-loginInput">
                            <div class="row margin">
                                <div class="input-field">
                                    <div class="wrap-input100 validate-input">
                                        <input id="txtNewPassword" class="input100" type="password" name="Email" onkeyup="javascript:RemoveError(this); return false;" placeholder="New Password" />
                                        <span class="focus-input100" data-placeholder="&#xf183;"></span>
                                    </div>
                                    <div class="errorMsg"></div>
                                </div>
                            </div>

                            <div class="row margin">
                                <div class="input-field">
                                    <div class="wrap-input100 validate-input">
                                        <input id="txtConfirmNewPassword" class="input100" type="password" name="Email" onkeyup="javascript:RemoveError(this); return false;" placeholder="Confirm New Password" />
                                        <span class="focus-input100" data-placeholder="&#xf183;"></span>
                                    </div>
                                    <div class="errorMsg"></div>
                                </div>
                            </div>

                            <div class="container-login100-form-btn">
                                <a class="login100-form-btn" href="javascript:void(0);" style="cursor: pointer" onclick="javascript:SetNewPassword(); return false;">Reset Password</a>
                            </div>
                        </div>
                    </div>
                    <div class="preloader-wrapper" style="display: none">
                        <div class="showbox">
                            <div class="loader">
                                <svg class="circular" viewBox="25 25 50 50">
                                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="text-left register_login" style="font-size: 18px;">
                        <p style="width: 100%">
                            <a style="float: left" class="txt2" href="javascript:void(0);" onclick="document.location.replace('../SignIn');">&nbsp; SignIn</a>
                            <a style="float: right" class="txt2" href="javascript:void(0);" onclick="document.location.replace('../Register');">&nbsp; Register</a>
                        </p>
                    </div>
                </form>

            </div>

            <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 9; display: none; opacity: 0; background: #3c3c3cab; position: absolute; height: 100%; width: 100%;">
            </div>
            
                <div id="modal5" class="modal bottom-sheet" style="overflow-y: hidden; max-height: 60%;">
                    <div class="progress">
                        <div class="indeterminate"></div>
                    </div>
                    <div class="modal-content" style="width: 35%; margin: auto; text-align: center;">
                        <label id="OTPMsg"></label>
                        <ul class="collection">
                            <li class="collection-item avatar" style="padding-left: 15px;">
                                <div class="row margin">
                                    <div class="input-field col s12">
                                        <div style="width: 25%; margin: auto; border-bottom: 1px solid #808080;">
                                            <input style="text-align: center; width: 100%" id="txtTempOTP" type="password" tabindex="1" onkeyup="javascript:RemoveError(this); return false;" maxlength="4" />
                                        </div>
                                        <div class="errorMsg" style="margin: 2px 0px 9px 0px;"></div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="input-field col s12" id="OTPContinue">
                            <a href="javascript:void(0);" onclick="javascript:VerfiyForgotPassOTP(); return false;" tabindex="2">Continue</a>
                        </div>
                        <div class="input-field col s12" style="margin-bottom: 10px; margin-top: 10px;" id="OTPRetry">
                            <a href="javascript:void(0);" onclick="javascript:SetForgetPassword(); return false;" class="btn waves-effect waves-light col s12" tabindex="3">Resend OTP</a>
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
</body>
</html>
