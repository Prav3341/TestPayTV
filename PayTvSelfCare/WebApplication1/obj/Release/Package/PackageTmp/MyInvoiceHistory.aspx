<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="MyInvoiceHistory.aspx.cs" Inherits="WebApplication1.MyInvoiceHistory" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/DashboardCSS/datatable.css" rel="stylesheet" />

    <script src="js/Dashboard_Js/dataTables.min.js"></script>
    <script src="js/Dashboard_Js/datatable.js"></script>
    <script src="js/Global.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/MyInvoiceHistory.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.4"></script>

    <style type="text/css">
        .preloader-wrapper { margin-right: 20px; margin-top: 5px; display:none;}

            .preloader-wrapper.big { width: 40px; height: 40px; margin-left: 50%; }

        #InvoiceHistoryDataTable thead th:last-child { width: 12%; }

        #DownloadInvoice { color: #484848; display: none; }
        #InvHistory{ display: block !important; height: auto !important; padding-top: 8px; padding-bottom: 8px; }

        /*@font-face { font-family: Play-Bold; src: url('fonts/Play-Bold.ttf') format('truetype'); }*/
        #SuccessReceipt { font-size: 14px; font-family: 'Segoe UI'; }
            #SuccessReceipt p { margin: 0px; padding: 2px; line-height: 25px; }
        #SuccessReceipt { padding: 15px; padding-top: 0px; }
            #SuccessReceipt .mainDiv { padding: 2px !important; }

        #DownloadInvoice { display: none; }
          .vertical-container { width: 100%; max-width: initial; margin: 0 auto; }
        /*#vertical-timeline.light-timeline:before { background: #e7eaec; }*/
        #vertical-timeline { position: relative; padding: 0px 7px 24px 0px; margin-top: 2em; margin-bottom: 2em; }
        .no-margins { margin: 0 !important; }
        #vertical-timeline::before { content: ''; position: absolute; top: 0; left: 56px; height: 100%; width: 4px; background: #fff; border-left: 1px dashed #c9c9c9; }
        .vertical-timeline-block:first-child { margin-top: 0; }
        .vertical-timeline-block { position: relative; margin: 15px 0; }
        .navy-bg, .bg-primary { background-color: #1ab394 !important; color: #ffffff; }
        .vertical-timeline-icon { position: absolute; top: 40px; left: 42px; width: 30px; height: 30px; border-radius: 50%; font-size: 16px; border: 3px solid #f1f1f1; text-align: center; }
            .vertical-timeline-icon i { display: block; width: 24px; height: 24px; position: relative; left: 50%; top: 50%; margin-left: -12px; margin-top: -9px; }
        .vertical-timeline-content { position: relative; margin-left: 80px; top: 20px; border-radius: 0.25em; line-height: 2; border: .5px solid #ddd; border-radius: 5px; }
        .vertical-timeline-block:after { content: ""; display: table; clear: both; }
        .yellow-bg, .bg-warning { background: rgba(255,216,68,1); background: -moz-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,216,68,1)), color-stop(100%, rgba(212,158,36,1))); background: -webkit-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: -o-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: -ms-linear-gradient(left, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); background: linear-gradient(to right, rgba(255,216,68,1) 0%, rgba(212,158,36,1) 100%); color: #ffffff; }
        .lazur-bg, .bg-info { background-color: #ffffff !important; color: #004fa4; border: 1px solid #e1ab2c; }
        /*.vertical-timeline-content::before { content: ''; position: absolute; top: 16px; right: 100%; height: 0; width: 0; border: 7px solid transparent; }*/
        .Content1Before::before { border-right: 7px solid #21baff; }
        .Content2Before::before { border-right: 7px solid #e8bd1a; }
        .Content3Before::before { border-right: 7px solid #1ab394; }
        .Content2Before a { color: #fff; }
        .Verifications { line-height: 2; font-size: 16px; float: left; }
        .vertical-timeline-content p { font-size: 16px; padding-left: 5px; display: inline-block; padding: 0px 15px 0px 15px; }
        .vertical-timeline-content h5 { font-weight: 500; color: #000; display: inline-block; font-size: 18px; margin: 6px 15px 12px 15px; }
            .vertical-timeline-content h5 span { font-weight: 400; color: #000; font-size: 16px; }
        .bottomdetails { border-top: .5px solid #eaeaea; }
        .upperdetails { margin-top: 7px; float: left; width: 100%; }
        .ledgerdate { float: left; margin-top: 13px; text-align: center; font-size: 14px; line-height: 18px; margin-left: 2px; width: 36px; }
        td, th { padding: 0; }

        @media (max-width:625px) {
            .vertical-timeline-content { float: left; width: 87%; margin-left: 40px; }
                .vertical-timeline-content p { float: left; }
            .bottomdetails { float: left; width: 100%; }
            .vertical-timeline-content h5 { font-size: 16px; }
                .vertical-timeline-content h5 span { font-size: 16px; }
        }

        @media (max-width:562px) {
            .vertical-timeline-content p { font-size: 13px; padding: 0px 6px 0px 6px; }
            .vertical-timeline-content { width: 81%; margin-left: 44px; }
                .vertical-timeline-content h5 { font-size: 13px; margin: 6px 6px 12px 6px; }
                    .vertical-timeline-content h5 span { font-size: 13px; }
            .vertical-timeline-icon i { font-size: 13px; padding-top: 2px; }
            .ledgerdate { font-size: 13px; }
        }

        @media (max-width:445px) {
            .vertical-timeline-content { width: 79%; }
                .vertical-timeline-content h5 { font-size: 12px; margin: 6px 4px 12px 8px; }
                .vertical-timeline-content p { width: auto; font-size: 11px; padding: 0px 4px 0px 8px; }
            .bottomdetails { width: 100%; }
            .vertical-timeline-content h5 span { font-size: 12px; }
        }

        @media (max-width:405px) {
            .vertical-timeline-content { width: 75%; }
                .vertical-timeline-content p { padding: 0px 0px 0px 8px; font-size: 14px; width: 100%; }
            .FullDrCr { display: none !important; }
            .RspDrCr { display: inline-block; }
            .vertical-timeline-content h5 { font-size: 16px; }
        }

        @media (max-width:340px) {
            .vertical-timeline-content { width: 71%; }
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section id="content">
        <!--start container-->
     

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

        <div class="container" id="PaymentHistoryContainer">
            <div class="row">
                <div id="admin" class="col s12">


                    <div class="card material-table">
                        <div class="table-header" id="InvHistory">
                            <div class="row">
                                <div class="col s7" style=" margin-top: 10px; "><span class="table-title" style="font-size: 19px;"><i class="fa fa-tags" style=" margin-right: 2px;font-size: 20px;"></i>&nbsp;Invoice History</span></div>
                          <%--      <div class="col m4" id="SelectMonth">
                                    <div class="actions" >
                                        <select id="drpMonthWise" class="browser-default">
                                            <option value="0">Current Month</option>
                                            <option value="1">Previous Month</option>
                                            <option value="2">Last Three Months</option>
                                            <option value="3">Last Six Months</option>
                                        </select>
                                        <a rel="nofollow" rel="noreferrer" href="javascript:void(0);" class="search-toggle waves-effect btn-flat nopadding" style="text-align: right;"><i class="mdi-action-search"></i></a>
                                    </div>
                                </div>--%>
                                    <div class="col m4" id="MyInvoiceFilter">
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

                                       <%-- <a rel="nofollow" rel="noreferrer" href="javascript:void(0);" class="search-toggle waves-effect btn-flat nopadding"><i class="mdi-action-search">search</i></a>--%>
                                    </div>
                                </div>


                                <div class="col s1" style="  margin-top: 10px;   color: #367200;">
                                
                                 <i  onclick="javascript:ExcelExportGrid();" class="fa fa-file-excel-o" style="margin-right: 2px;font-size: 20px;color: green; cursor:pointer; " title="Excel Download"></i>
                                    &nbsp;
                                 <i onclick="javascript:PdfExportGrid();"  class="fa fa-file-pdf-o " style="margin-right: 2px;font-size: 20px;color: Red; cursor:pointer; " title="PDF Download"></i>
                                
                                 </div>

                            </div>
                            <div class="clear"></div>
                        </div>


                        
                 <div id="LedgerDataTable_wrapper" class="dataTables_wrapper no-footer">

                            <%--<table id="LedgerDataTable" class="dataTableCommon">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th style="width: 45%;">Particular</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody id="MyLedger"></tbody>
                            </table>--%>

                            <div id="profile-page-sidebar" class="col s12">

                             <div id="vertical-timeline" class="vertical-container light-timeline no-margins"></div>
                           
                            </div> 

                     </div>

                     <%--   <table id="InvoiceHistoryDataTable" class="dataTableCommon">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th style="padding-left: 35px;">Invoice No.</th>                              
                                    <th>Smart Card</th>
                                     <th>STB No.</th>   
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="PaymentHistory"></tbody>
                        </table>--%>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" id="DownloadInvoice" style="display: none;">

            <div style="padding: 15px; font-size: 18px; padding-left: 0px; padding-right: 0px; width: 95%; margin: auto; padding-bottom: 0px;">
                <a href="javascript:void(0);" onclick="javascript:GoBackToPaymentHistory(); return false;" style="float: left;"><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Back</a>
                <a href="javascript:void(0);" style="float: right;" onclick="javascript:DownloadInvoice(); return false;"><i class="fa fa-download"></i>&nbsp;&nbsp;Download</a>
                <div style="clear: both;"></div>
            </div>


            <div id="RecptMainDiv" > </div>
        </div>

    </section>

</asp:Content>
