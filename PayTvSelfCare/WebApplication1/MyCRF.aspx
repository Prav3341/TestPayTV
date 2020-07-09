<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="MyCRF.aspx.cs" Inherits="WebApplication1.MyCRF" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/DashboardCSS/datatable.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <script src="js/Dashboard_Js/dataTables.min.js"></script>
    <script src="js/Dashboard_Js/datatable.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/MyCRF.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
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

        .preloader-wrapper { margin-right: 20px; margin-top: 5px; }

            .preloader-wrapper.big { width: 40px; height: 40px; margin-left: 50%; }

        #ComplaintModel .model-email-content { padding: 24px !important; }
        div.material-table .table-header i { margin-top: 10px; }
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
                        <div class="table-header" id="CRFTableHeader">
                            <div class="row">
                                <div class="col s8"><span class="table-title"><i class="fa fa-shopping-bag"></i>&nbsp; Orders</span></div>
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
                        <table id="CRFDataTable" class="dataTableCommon">
                            <thead>
                                <tr>
                                    <th>Detail</th>
                                    <%--<th>Type</th>--%>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="MyCRF"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
