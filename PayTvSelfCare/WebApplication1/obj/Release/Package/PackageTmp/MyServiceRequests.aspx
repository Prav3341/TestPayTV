<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="MyServiceRequests.aspx.cs" Inherits="WebApplication1.MyServiceRequests" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/DashboardCSS/datatable.css" rel="stylesheet" />

    <script src="js/Dashboard_Js/dataTables.min.js"></script>
    <script src="js/Dashboard_Js/datatable.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/MySeviceRequest.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.4"></script>
    <style type="text/css">
        .select-wrapper { width: 230px; }

        #ComplaintModel .select-wrapper { width: 100% !important; }
        .select-wrapper span.caret { top: 12px !Important; }
        .select-wrapper input.select-dropdown { line-height: 2rem !important; }

        .modal { width: 45%; }
        #ComplaintModel .select2-container { margin-top: 15px; width: 100% !important; }
        #ComplaintModel .select2-dropdown { top: 8px !important; }
        #ComplaintModel .input-field { margin-top: 2rem !important; }
        .select2-results__options { max-height: 130px !important; }

        #ComplaintTableHeader .select2-selection { margin-top: 8px; }

        .errorMsg { margin-left: 8px; }

        .preloader-wrapper { margin-right: 20px; margin-top: 5px;  display:none;}

            .preloader-wrapper.big { width: 40px; height: 40px; margin-left: 50%; }

        #ComplaintModel .model-email-content { padding: 24px !important; }
        .ServieceRequest { float: left; margin-left: 10px; }
        .remark_details { width: auto; }
        .RemarkComment { background: #88d0ff; padding: 10px; width: 69%; color: #202020; border-radius: 9px; -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75); -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75); box-shadow: 0px 1px 4px 0px rgba(69, 69, 69, 0.75); }
        .RemarkComment::after { content: ""; position: absolute; top: 13px; left: 14%; margin-left: -5px; border-width: 10px; border-style: solid; border-color: transparent transparent #88d0ff transparent; }
        .leftremark { position: relative; margin: 10px; }
        .rightremark { position: relative; margin: 10px; }
            .rightremark p { text-align: left; }
            .rightremark .RemarkComment { background: #e2ac2d; padding: 10px; width: 69%; color: #202020; margin: 0 0 0 auto; }
                .rightremark .RemarkComment::after { content: ""; position: absolute; top: 13px; left: 82%; margin-left: -5px; border-width: 10px; border-style: solid; border-color: transparent transparent #e2ac2d transparent; }
        .RemarkTxtbox { position: absolute; bottom: 0; width: 99%; z-index: 9999; background: #fff; }
        .RemarkTextArea { max-height: 22px !important; min-height: inherit !important; overflow-y: auto !important; resize: none !important; }
        .RemarkName { font-weight: 600; }
        #SubscriberRemark {width:35% ; }
        @media only screen and (max-width: 1800px) {
            .ServieceRequest { width: 67%; }
            #SubscriberRemark { width: 67%; }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="content">
        <!--start container-->
        <div class="container" id="Complaint">
            <div class="row">
                <div id="admin" class="col s12">


                    <div class="preloader-wrapper big active">
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


                    <div class="card material-table">
                        <div class="table-header" id="ComplaintTableHeader">
                            <div class="row">
                                <div class="col m8" style="padding-top: 10px; padding-left: 0px;"><a class="waves-effect waves-light btn light-blue modal-trigger" href="#ComplaintModel" id="AddComplaint" style="display:none"><i class="fa fa-plus" style="font-size: 18px; color: #FFF;"></i>&nbsp;Add Service Request</a></div>
                                <div class="col m4" id="ComplaintsFilter">
                                    <div class="actions">
                                        <select id="drpDuration" class="browser-default">
                                            <option value="5">Last 5</option>
                                            <option value="10">Last 10</option>
                                            <option value="15">Last 15</option>
                                            <option value="20">Last 20</option>
                                            <option value="25">Last 25</option>
                                            <option value="30">Last 30</option>
                                            <option value="35">Last 35</option>
                                            <option value="40">Last 40</option>
                                            <option value="45">Last 45</option>
                                            <option value="50">Last 50</option>
                                        </select>

                                        <a rel="nofollow" rel="noreferrer" href="javascript:void(0);" class="search-toggle waves-effect btn-flat nopadding"><i class="mdi-action-search">search</i></a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>



                        </div>
                        <table id="ComplaintsDataTable" class="dataTableCommon">
                            <thead>
                                <tr>
                                    <th>Detail</th>
                                    <%--<th>Type</th>--%>
                                    <th>Assigned To</th>
                                    <th>Created/Updated Date</th>
                                    <th>Status</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody id="MyComplaints"></tbody>
                        </table>
                    </div>
                </div>

                <div class="lean-overlay" id="materialize-lean-overlay-1" style="z-index: 1002; display: none; opacity: 0.5;"></div>
                <div id="ComplaintModel" class="modal" style="visibility: visible; animation-name: fadeInTop;">
                    <div class="modal-content" style="padding: 0px;">
                        <nav style="background-color: #FC8002;">
                            <div class="nav-wrapper">
                                <div class="left col s12 m5 l5">
                                    <ul>
                                        <li><a href="javascript:void(0);" class="email-type" style="font-size: 18px; pointer-events: none;" id="btnAddComplaint">&nbsp;&nbsp;Add Service Request</a></li>
                                    </ul>
                                </div>
                                <div class="col s12 m7 l7 hide-on-med-and-down">
                                    <ul class="right">
                                        <li><a href="javascript:void(0);" title="Send Complaint" onclick="javascript:AddNewComplainte(); return false;"><i class="modal-action  mdi-content-send"></i></a></li>
                                        <li><a href="javascript:void(0);" title="Close"><i class="mdi-navigation-close modal-close"></i></a></li>
                                    </ul>
                                </div>

                            </div>
                        </nav>
                    </div>
                    <div class="model-email-content">
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <label for="compose" class="active">Service Request Head </label>
                                        <select id="drpComplaintCatgeory" class="browser-default">
                                        </select>
                                        <div id="errorMsg1"class="errorMsg"></div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                        <textarea id="txtAComplaint" class="materialize-textarea" onkeyup="javascript:RemoveError(this); return false;" length="500" maxlength="500"></textarea>
                                        <label for="txtAComplaint">Remark</label>
                                        <div id="errorMsg2"class="errorMsg"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div id="SubscriberRemark" class="modal" style="visibility: visible; animation-name: fadeInTop; z-index: 1003; opacity: 1; transform: scaleX(1); top: 10%;">
                    <div class="modal-content" style="padding: 0px;">
                        <nav style="background-color: #FC8002;">
                            <div class="nav-wrapper">
                                <div class="left col s12 m5 l5">
                                    <ul>
                                        <li><a href="javascript:void(0);" class="email-type" style="font-size: 18px; pointer-events: none;" id="A1">&nbsp;&nbsp;Update Service Request</a></li>
                                    </ul>
                                </div>

                                <div class="col s12 m7 l7 hide-on-med-and-down">
                                    <ul class="right">
                                        <li style="display:none"><a href="javascript:void(0);" title="Send Complaint" onclick="<%--javascript:saveChat(); return false;--%>"><i class="modal-action  mdi-content-send"></i></a></li>
                                        <li><a href="javascript:void(0);" title="Close"><i class="mdi-navigation-close modal-close"></i></a></li>
                                    </ul>
                                </div>

                            </div>
                        </nav>
                    </div>
                    <div class="model-email-content">
                        <div class="row">
                            <form class="col s12">
                                <div ><%--style="height: 400px; overflow: auto"--%>
                                    <div>
                                        <div class="row">
                                            <div class="input-field col s12" style="margin-top: 32px; pointer-events: none;">
                                                <label for="compose" class="active">Service Request Head </label>
                                                <select id="Select1" class="browser-default" style="color: #7c7c7c" >
                                                    
                                                </select>
                                                <div id="Div2" class="errorMsg"></div>
                                            </div>
                                        </div>
                                        <div class="input-field col s12">
                                         <%--   <textarea id="Textarea1" class="materialize-textarea RemarkTextArea" onkeyup="javascript:RemoveError(this); return false;" length="500" maxlength="500"></textarea>--%>
                                            <%--<label for="txtAComplaint" class="">Remark</label>--%>
                                            <div id="Div1" class="errorMsg"></div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="remark_details">
                                        </div>
                                    </div>
                                    <%--<div class="row RemarkTxtbox">
                                        <div class="input-field col s12">
                                            <div>
                                                <input id="txtPLastName" type="text" tabindex="3" placeholder="" autocomplete="off" />
                                                <label for="txtPLastName" class="center-align active">Remark</label>
                                                <div class="errorMsg"></div>
                                            </div>
                                        </div>
                                    </div>--%>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>


</asp:Content>
