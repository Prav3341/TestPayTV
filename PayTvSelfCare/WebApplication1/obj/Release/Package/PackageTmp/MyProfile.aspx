<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="MyProfile.aspx.cs" Inherits="WebApplication1.MyProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%-- <link href="css/stepper.css" rel="stylesheet" />--%>
    <link href="css/DashboardCSS/stepper.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
   
    <script src="js/Dashboard_Js/Stepper.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <%--<script src="js/Dashboard_Js/RstForm/MyProfile.js?v0.01"></script>--%>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/Dashboard_Js/RstForm/MyProfile.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.4"></script>

    <%--<link href="js/plugins/dropify/css/dropify.min.css" rel="stylesheet" />--%>
    <link href="js/dropify/css/dropify.min.css" rel="stylesheet" />
    <style type="text/css">
        .errorMsg { font-size: 12px; }
        .dropify-wrapper { width: 100px; height: 100px; border-radius: 50%; }
            .dropify-wrapper .dropify-preview .dropify-render img { height: 100px; width: 100px; border-radius: 50%; }
            .dropify-wrapper .dropify-preview { padding: 0px; }
        .MobBtn { height: 100px; width: 100px; border-radius: 50%; border: 0px; background-color: #FFF; -webkit-box-shadow: 0px 1px 6px 1px rgba(179,179,179,1); -moz-box-shadow: 0px 1px 6px 1px rgba(179,179,179,1); box-shadow: 0px 1px 6px 1px rgba(179,179,179,1); display: none; }
            .MobBtn i { font-size: 23px; color: #c1c0c0; }
            .MobBtn:focus { background-color: #FFF; }
        #profile-page-sidebar { padding-left: 0px; padding-top: 5px; }
        #profile-page-header .card-content { padding: 0px; padding-top: 70px; margin-top: 0px; }
        .progress { margin: 0px; }
        .selectProfilePic { top: 143px; z-index: 1; left: 55%; text-align: right; position: absolute; }
        .ProfilePic { cursor: auto; margin: 0; background: #FFF; width: 100px; height: 100px; border-radius: 50%; box-shadow: 0px 1px 1px 2px rgba(222,222,222,1); }
        #ProfilePicUpload { display: none; }
        .EditProfilePic { font-size: 16px; color: #fc8002; margin-right: 24px; cursor: pointer; }
        .InAppPicBtn { display: none; }
        .Profile-header-bg { background-image: url("images/others/Myprofilebg.png"); background-repeat: no-repeat; background-attachment: scroll; height: 222px; background-size: cover; background-position: center; }
        #ProfileCustNameDiv h4 { font-size: 24px; font-weight: 400; }
        #ProfileCustNameDiv p { font-size: 16px !important; }
        /*Dashboard left design Start*/
        #vertical-timeline { position: relative; padding: 0px 7px 0px 0px; margin-top: 2em; margin-bottom: 2em; }
        .no-margins { margin: 0 !important; }
        .vertical-container { width: 100%; max-width: 1170px; margin: 0 auto; }
        #vertical-timeline.light-timeline:before { background: #e7eaec; }
        #vertical-timeline::before { content: ''; position: absolute; top: 0; left: 18px; height: 100%; width: 4px; background: #f1f1f1; }
        .vertical-timeline-block:first-child { margin-top: 0; }
        .vertical-timeline-block { position: relative; margin: 2em 0; }
        .navy-bg, .bg-primary { background-color: #1ab394 !important; color: #ffffff; }
        .vertical-timeline-icon { position: absolute; top: 0; left: 0; width: 40px; height: 40px; border-radius: 50%; font-size: 16px; border: 3px solid #f1f1f1; text-align: center; }
            .vertical-timeline-icon i { display: block; width: 24px; height: 24px; position: relative; left: 50%; top: 50%; margin-left: -12px; margin-top: -9px; }
        .vertical-timeline-content { position: relative; margin-left: 60px; border-radius: 0.25em; padding: 10px 10px 10px 20px; line-height: 2; -webkit-box-shadow: 0px 0px 5px -1px rgba(97,97,97,1); -moz-box-shadow: 0px 0px 5px -1px rgba(97,97,97,1); box-shadow: 0px 0px 5px -1px rgba(97,97,97,1); }
        .vertical-timeline-block:after { content: ""; display: table; clear: both; }
        .yellow-bg, .bg-warning { background: rgba(255,216,68,1); background: -moz-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,216,68,1)), color-stop(100%, rgba(212,158,36,1))); background: -webkit-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: -o-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: -ms-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: linear-gradient(to right, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); color: #ffffff; }
        .lazur-bg, .bg-info { background-color: #21baff !important; color: #ffffff; }
        .vertical-timeline-content::before { content: ''; position: absolute; top: 16px; right: 100%; height: 0; width: 0; border: 7px solid transparent; }
        .Content1Before::before { border-right: 7px solid #21baff; }
        .Content2Before::before { border-right: 7px solid #e8bd1a; }
        .Content3Before::before { border-right: 7px solid #1ab394; }
        .Content2Before a { color: #fff; }
        .Verifications { line-height: 2; font-size: 16px; float: left; }
        .vertical-timeline-content p { font-size: 18px; padding-left: 5px; }
        /*Dashboard left design End*/
        @media screen and (min-width: 100px) and (max-width: 990px) {
            .selectProfilePic { position: absolute; top: 125px; z-index: 1; left: 51%; }
            .ProfilePic { position: relative; left: -50%; }
            .EditProfilePic { font-size: 16px; color: #fc8002; position: relative; left: -50%; }
            #profile-page-header .card-content { text-align: center; }
            #profile-page-header .card-image { height: 160px; }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="content">
        <!--start container-->
        <div class="container">

            <div id="profile-page" class="section" style="width: 100%;">
                <!-- profile-page-header -->

                <div class="pro"></div>

                <div id="profile-page-header" class="Profile-header-bg">
                    <div class="selectProfilePic">
                        <img src="Images/Preview.ico" class="ProfilePic" id="XXProfilePic" style="padding: 30px;"  /><br />
                        <a href="javascript:void(0);" onclick="javascript:setProfilePic(); return false;" class="EditProfilePic InAppPicBtn"><i class="fa fa-pencil"></i>&nbsp;Edit</a>
                        <label class="EditProfilePic InWebPic" for="ProfilePicUpload"><i class="fa fa-pencil"></i>&nbsp;Edit</label>
                        <input type="file" class="InWebPic" id="ProfilePicUpload" onchange="javascript:ReadProfilePicURL(this); return false;" accept="image/*" />
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="col s4 offset-s8" id="ProfileCustNameDiv">
                                <h4 class="card-title grey-text text-darken-4" id="PCustName">&nbsp;</h4>
                                <p class="medium-small grey-text" id="ProfileMemNo" style="color: #313131 !important;">&nbsp;</p>
                            </div>
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                        </div>
                    </div>
                </div>


                <%--<div id="profile-page-header" class="card">
                    <div class="card-image waves-effect waves-block waves-light" style="pointer-events: none; cursor: pointer;">
                        <img class="activator" src="images/user-profile-bg.jpg" alt="user background" />
                    </div>

                    <div class="selectProfilePic">
                        <img src="Images/Preview.ico" class="ProfilePic" id="XXProfilePic" style="padding: 30px;" title="vbv" /><br />
                        <a href="javascript:void(0);" onclick="javascript:setProfilePic(); return false;" class="EditProfilePic InAppPicBtn"><i class="fa fa-pencil"></i>&nbsp;Edit</a>
                        <label class="EditProfilePic InWebPic" for="ProfilePicUpload"><i class="fa fa-pencil"></i>&nbsp;Edit</label>
                        <input type="file" class="InWebPic" id="ProfilePicUpload" onchange="javascript:ReadProfilePicURL(this); return false;" accept="image/*" />
                    </div>--%>

                <%--<figure class="card-profile-image">
                        <input type="file" id="input-file-max-fs" class="dropify" data-max-file-size="1M" accept="image/*" />
                        <button class="MobBtn" onclick="javascript:setProfilePic(); return false;"><i class="fa fa-camera"></i></button>
                        <a href="javascript:void(0);"><i class="fa fa-pencil"></i>&nbsp;Edit</a>
                    </figure>--%>

                <%--<div class="card-content">
                        <div class="row">
                            <div class="col s3 offset-s3" style="width: 65%;" id="ProfileCustNameDiv">
                                <h4 class="card-title grey-text text-darken-4" id="PCustName">&nbsp;</h4>
                                <p class="medium-small grey-text" id="ProfileMemNo">&nbsp;</p>
                            </div>
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                        </div>
                    </div>

                </div>--%>
                <!--/ profile-page-header -->
                <!-- profile-page-content -->
                <div id="profile-page-content" class="row mt-20">
                    <!-- profile-page-sidebar-->
                    <%--  <div id="profile-page-sidebar" class="col s12 m4">

                        <div id="vertical-timeline" class="vertical-container light-timeline no-margins">

                            <div class="vertical-timeline-block ">
                                <div class="vertical-timeline-icon lazur-bg">
                                    <i class="fa fa-inr"></i>
                                </div>

                                <div class="vertical-timeline-content Content1Before lazur-bg">
                                    <h5 id="ProfileDue">Due Amount</h5>
                                    <h5 id="WallateAmmount" style="display: none">Wallet Amount</h5>
                                    <p id="Amount">0</p>
                                    <a href="#" class="btn btn-sm btn-info" id="AddMony" onclick="javascript:GetPayment();" style="display: none">Add Money</a>
                                    <a href="#" class="btn btn-sm btn-info" id="PayNow" onclick="javascript:GetPayment();">Pay Now</a>
                                </div>
                            </div>

                            <div class="vertical-timeline-block">
                                <div class="vertical-timeline-icon yellow-bg">
                                    <i class="fa fa-calendar "></i>
                                </div>

                                <div class="vertical-timeline-content Content2Before yellow-bg">
                                    <h5 id="DueDate"></h5>
                                    <p id ="PdueDate">Due Date</p>
                                </div>
                            </div>

                            <div class="vertical-timeline-block">
                                <div class="vertical-timeline-icon navy-bg">
                                    <i class="fa fa-phone"></i>
                                </div>

                                <div class="vertical-timeline-content Content3Before navy-bg float-left">
                                    <div class=" col s7 Verifications">Sms Alerts</div>
                                    <div class="col s5 alignright" id="SmsActive"><i class="mdi-action-done" style="color: #fff  !important;"></i></div>
                                    <div class=" col s7 Verifications">Email Alerts  </div>
                                    <div class="col s5 alignright" id="ActiveEmail"><i class="mdi-action-done" style="color: #fff  !important;"></i></div>
                                    <div class=" col s7 Verifications">Account Verified</div>
                                    <div class="col s5 alignright" id="AccVerified"><i class="mdi-action-done" style="color: #fff  !important;"></i></div>
                                </div>
                            </div>
                        </div>


                    </div>--%>
                    <!-- profile-page-sidebar-->

                    <!-- profile-page-wall -->
                    <div id="profile-page-wall" class="col m8 s12" style="margin-top: 6px;">
                        <!-- profile-page-wall-share -->
                        <div id="profile-page-wall-share" class="row">
                            <div class="col s12">
                                <ul class="tabs tab-profile z-depth-1 light-blue" id="DetailsPanel">
                                    <li class="tab col s3"><a class="white-text waves-effect waves-light active" href="#ProfileDetail"><i class="mdi-action-account-circle" style="font-size: 18px;"></i>&nbsp;Details</a>
                                    </li>
                                    <li class="tab col s3"><a class="white-text waves-effect waves-light" href="#EditProfile" id="EditProfileDetails" onclick="EditProfileDetails()"><i class="mdi-editor-border-color"></i>&nbsp;Edit Details</a>
                                    </li>
                                </ul>
                                <!-- UpdateStatus-->
                                <div id="ProfileDetail" class="tab-content col s12  grey lighten-4" style="padding-top: 12px; padding-bottom: 30px;">
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">First Name</div>
                                            <div class="col s5 grey-text right-align" id="PFirstName"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Middle name</div>
                                            <div class="col s5 grey-text right-align" id="PMidName"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Last Name</div>
                                            <div class="col s5 grey-text right-align" id="PLastName"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Address Line1</div>
                                            <div class="col s5 grey-text right-align" id="PAddress1"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Address Line2</div>
                                            <div class="col s5 grey-text right-align" id="PAddress2"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Address Line3</div>
                                            <div class="col s5 grey-text right-align" id="PAddress3"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Mobile No.</div>
                                            <div class="col s5 grey-text right-align" id="PMobNo"></div>
                                        </div>
                                    </div>
                                    <div class="row" style="word-break: break-all;">
                                        <div class="input-field col s12">
                                            <div class="col s7 grey-text" style="font-weight: 500;">Email ID</div>
                                            <div class="col s5 grey-text right-align" id="PEmailID"></div>
                                        </div>
                                    </div>

                                </div>
                                <!-- AddPhotos -->
                                <div id="EditProfile" class="tab-content col s12  grey lighten-4" style="padding-top: 35px;">
                                    <div class="row">
                                        <div class="input-field col m4">
                                            <input id="txtPFirstName" type="text" onkeyup="javascript:RemoveError(this); return false;" maxlength="50" tabindex="1" />
                                            <label for="txtPFirstName" class="center-align">First Name</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col m4">
                                            <input id="txtPMiddleName" type="text" tabindex="2" />
                                            <label for="txtPMiddleName" class="center-align">Middle Name</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col  m4">
                                            <input id="txtPLastName" type="text" tabindex="3" />
                                            <label for="txtPLastName" class="center-align">Last Name</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col  m4">
                                            <input id="txtPAddressLine1" type="text" tabindex="5" />
                                            <label for="txtPAddressLine1" class="center-align">Address Line1</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col  m4">
                                            <input id="txtPAddressLine2" type="text" tabindex="6" />
                                            <label for="txtPAddressLine2" class="center-align">Address Line2</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col  m4">
                                            <input id="txtPAddressLine3" type="text" tabindex="7" />
                                            <label for="txtPAddressLine3" class="center-align">Address Line3</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col  m4 disabled">
                                            <input id="txtPMobileNo" type="text" tabindex="-99" />
                                            <label for="txtPMobileNo" class="center-align">Mobile No.</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="input-field col  m4 disabled">
                                            <input id="txtPEmailID" type="text" tabindex="-99" />
                                            <label for="txtPEmailID" class="center-align">Email ID</label>
                                            <div class="errorMsg"></div>
                                        </div>
                                        <div class="col  m4 right-align" style="padding-top: 35px;">
                                            <a class="waves-effect waves-light btn" tabindex="11" href="javascript:void(0);" onclick="javascript:UpdateMyProfileDetails(); return false;"><i class="mdi-content-save left"></i>Update</a>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 15px;">
                                        <div class="input-field col s12 m12">&nbsp;</div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <!--/ profile-page-wall-share -->

                    <!--/ DocumentDetails-page-wall-share -->
                    <div id="profile-page-sidebar" class="col m4 s12">
                        <ul class="tabs tab-profile z-depth-1" id="Ul1">
                            <li class="tab col s3"><a style="background: #d8a227; pointer-events: none" class="white-text waves-effect waves-light"><i class="fa fa-file-text"></i>&nbsp;KYC Details</a>
                            </li>
                        </ul>

                        <div class="row" style="position: relative">
                            <div class="documentDetalMain">
                                <%--<div class="documenntelement">
                                    <div class="DocumentImg">
                                        <img src="images/others/Untitled-1.png" />
                                    </div>
                                    <div class="DocumentTxt">
                                        <p style="font-weight: 700" class="DocumentHead">Adhar Card  <span class="DocumentHeads">( Address Proof )</span></p>

                                        <p style="text-transform: uppercase;">ade345fd5454fgt</p>
                                        <p style="text-transform: uppercase;">20-Jan-2020</p>

                                        <div class="Documentbtn">
                                            <a class="Ducumentviewbtn" href="#">View</a> &nbsp;&nbsp;
                                            <a class="DucumentDownloadbtn" href="#">Download</a>&nbsp;&nbsp;
                                            <a class="Ducumentdeletebtn" href="#">Delete</a>
                                        </div>
                                    </div>

                                </div>--%>

                                <div class="documenntelement">
                                    <%--<div class="DocumentImg">
                                        <img src="images/others/DefultIcon.png" />
                                    </div>
                                    <div class="DocumentTxt">
                                        <p style="font-weight: 700" class="DocumentHead">Adhar Card  <span class="DocumentHeads">( Address Proof )</span></p>

                                        <p style="text-transform: uppercase;">ade345fd5454fgt</p>
                                        <p style="text-transform: uppercase;">20-Jan-2020</p>

                                        <div class="Documentbtn">
                                            <a class="Ducumentviewbtn" href="#"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;&nbsp;
                                            <a class="DucumentDownloadbtn" href="#"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;&nbsp;
                                            <a class="Ducumentdeletebtn" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                        </div>
                                    </div>--%>

                                </div>

                                <%--<div class="documenntelement">
                                    <div class="DocumentImg">
                                        <img src="images/others/Untitled-1.png" />
                                        <i class="fa fa-trash DeleteIcon" id="DeleteIcon" aria-hidden="true"></i>'
                                    </div>
                                    <div class="DocumentTxt">
                                        <p style="font-weight: 700" class="DocumentHead">Adhar Card <span class="DocumentHeads">( Address Proof )</span></p>

                                        <p style="text-transform: uppercase;">ade345fd5454fgt</p>
                                        <p style="text-transform: uppercase;">20-Jan-2020</p>

                                        <div class="Documentbtn">
                                            <a class="Ducumentviewbtn" href="#"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;&nbsp;
                                            <a class="DucumentDownloadbtn" href="#"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;&nbsp;
                                          
                                        </div>
                                    </div>

                                </div>

                                <div class="documenntelement">
                                    <div class="DocumentImg">
                                        <img src="images/others/Untitled-1.png" />
                                        <i class="fa fa-trash DeleteIcon" id="DeleteIcon2" aria-hidden="true"></i>'
                                    </div>
                                    <div class="DocumentTxt">
                                        <p style="font-weight: 700" class="DocumentHead">Adhar Card <span class="DocumentHeads">( Address Proof )</span></p>

                                        <p style="text-transform: uppercase;">ade345fd5454fgt</p>
                                        <p style="text-transform: uppercase;">20-Jan-2020</p>

                                        <div class="Documentbtn">
                                            <a class="Ducumentviewbtn" href="#"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;&nbsp;
                                            <a class="DucumentDownloadbtn" href="#"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;&nbsp;
                                           
                                        </div>
                                    </div>

                                </div>--%>
                            </div>
                            <p onclick="DocumentUpload()" class="UploadBtn" title="Upload Documnet"><i class="fa fa-upload" aria-hidden="true"></i></p>
                        </div>

                    </div>
                </div>
                <!--/ profile-page-wall -->

            </div>

            <!--Payment Work -->
        </div>

        <!--end container-->
        <div class="lean-overlay" id="DocumentUploadPopup" style="z-index: 1002; display: none; opacity: 1;">
        </div>
        <div class="lean-overlay HideDiv" id="UploadImgView" style="z-index: 1002; display: none; opacity: 1;">
        </div>

        <div class="ViewImg" style="display: none">
            <div class="Viewdocument">
                <div class="closeIcon HideDiv"><i class="mdi-navigation-close modal-close"></i></div>
                <img src="" />
            </div>
        </div>
        <div id="DocumentUploadModal" class="modal">
            <div class="modal-content">
                <div class="container">
                    <div class="navbar-header">
                        <div style="float: left;">
                            <label id="SubsAmtType" style="font-size: 20px; color: #FFF;">Add Document</label>
                            <label id="TopTitleAmt" style="font-size: 18px; color: #FFF;"></label>
                        </div>
                        <div style="float: right; margin-top: 0px; margin-right: -10px; font-size: 24px;">
                            <a href="javascript:void(0);" title="Submit" onclick="javascript:SaveDocument(); return false;" style="color: #FFF; margin-right: 20px;"><i class="modal-action  mdi-content-send"></i></a>
                            <a href="javascript:void(0);" onclick="javascript:closePaymentBox(); return false;" style="color: #FFF;"><i class="mdi-navigation-close modal-close"></i></a>

                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>
            <div class="model-email-content">
                <div class="row" style="padding: 0px 14px 0px 14px;">
                    <div class="input-field col m6 s12">
                        <select id="drpCategory" class="browser-default" onchange="javascript:SelectCategory(this);">
                            <option value="0">Select Document Category</option>
                           <%-- <option value="1">Last One Month</option>
                            <option value="2">Last Three Months</option>
                            <option value="3">Last Six Months</option>--%>
                        </select>
                        <div class="errorMsg" style="margin-left: 12px;"></div>
                    </div>
                    <div class="input-field col m6 s12">
                        <select id="drpHead" class="browser-default">
                            <option value="0">Select Document Head</option>
                           <%-- <option value="1">Last One Month</option>
                            <option value="2">Last Three Months</option>
                            <option value="3">Last Six Months</option>--%>
                        </select>
                        <div class="errorMsg" style="margin-left: 12px;"></div>
                    </div>
                    <div class="input-field documetnm col m6 s12">
                        <input id="DicReference" type="text" onkeyup="javascript:RemoveError(this); return false;" maxlength="50" tabindex="1" />
                        <label for="DicReference" class="center-align Number">Document Number<span style="color:red">*</span></label>
                        <div class="errorMsg" style="margin-left: 12px;"></div>
                    </div>
                    <div class="input-field documetnm col m6 s12" id="UploadDivMain" style="visibility: hidden">
                        <input id="DocumentUpload" style="pointer-events: none;" type="text" disabled="disabled" onkeyup="javascript:RemoveError(this); return false;" maxlength="50" tabindex="1" />
                        <label for="DocumentUpload" class="center-align" id="Documentlable">Document Name<span style="color:red">*</span></label>
                        <div class="errorMsg" style="margin-left: 12px;"></div>
                    </div>


                </div>
                <div class="row" style="padding: 0px 14px 0px 14px;">
                    <div class="uploader col m12 s12">
                        <input type="file" class="InWebPic" id="DocumentUploader" accept=".JPG, .PNG, .PDF, .jpeg,.png,.pdf" onchange="FileUpload(this,event);document.getElementById('DocumentUpload').value = this.value.split('\\').pop().split('/').pop()" style="display: none" />

                        <label for="DocumentUploader" id="file-drag">
                            <br />
                            <i class="fa fa-upload" aria-hidden="true"></i>
                            <br />
                            <span>Browse your file to upload</span><br />
                            <p class="dragbtn">Browse Here</p>
                        </label>
                    </div>

                    <%--  <div class="col  m12 right-align" style="padding-top: 35px;">
                        <a class="waves-effect waves-light btn" tabindex="11" href="javascript:void(0);" onclick="javascript:void(0); return false;">SUBMIT</a>
                    </div>--%>
                </div>

            </div>
        </div>
    </section>

    <!-- dropify -->
    <script type="text/javascript" src="js/dropify/js/dropify.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('.dropify').dropify();
        });
    </script>
</asp:Content>
