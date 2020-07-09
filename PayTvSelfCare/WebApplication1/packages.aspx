<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaster.Master" AutoEventWireup="true" CodeBehind="packages.aspx.cs" Inherits="WebApplication1.packages" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/packeges.css?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0" rel="stylesheet" />
    <script src="js/jquery-1.12.3.min.js?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>
    <script src="js/fromjs/Packeges.js?ver=0.0.3?v=<%= System.Configuration.ConfigurationManager.AppSettings["ReleaseVersion"] %>.0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="wrapper-lg bg-custom-home">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="widget padding-lg bg-dark">
                        <h1 class="heading-lg text-center text-light mb-20">PACKS & CHANNELS</h1>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="">Select State</label>
                                <select class="form-control selectpicker show-tick" title="Choose One" data-style="btn-primary" id="SelectState">
                                    <option>Select State</option>
                                </select>
                                <p id="ErrorTxt" class="Error" style="display: none"></p>
                            </div>
                            <!-- /.col -->
                            <div class="col-md-3">
                                <label for="">Select City</label>
                                <select class="form-control selectpicker show-tick" id="Citylist" title="Choose One" data-style="btn-primary">
                                </select>
                            </div>
                               <div class="col-md-3">
                                <label for="">Select LCO</label>
                                <select class="form-control selectpicker show-tick" id="LCOlist" title="Choose One" data-style="btn-primary">
                                </select>
                            </div>


                            <%--<div class="col-md-3">
                                <label for="">Select Area</label>
                                <select class="form-control selectpicker show-tick" title="Choose One" data-style="btn-primary">
                                    <option>Select Area</option>
                                    <option>Basni</option>
                                    <option>Chopasni</option>
                                    <option>New</option>
                                </select>
                            </div>--%>
                            <!-- /.col -->
                            <div class="col-md-2">
                                <label for="">Ready?</label>
                                <a class="btn btn-primary btn-block" onclick="GetPacks()">Search</a>
                            </div>

                        </div>

                    </div>
                    <!-- /.widget -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <br />
    <section class="sec-cards">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="tabs-style-2">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="active"><a href="#Major" role="tab" data-toggle="tab" aria-expanded="true" onclick="GetPacks()">Major Pack</a></li>
                            <li class=""><a href="#Addon" role="tab" data-toggle="tab" aria-expanded="false" onclick="GetPacks3()">Addon</a></li>
                            <li class=""><a href="#Channals" role="tab" data-toggle="tab" aria-expanded="false" onclick="GetPacks2()">Channels</a></li>
                        </ul>
                        <!-- Tab panes -->

                        <div class="tab-content">
                            <div class="tab-pane fade active in" id="Major">
                            </div>
                            <div class="tab-pane fade" id="Channals">
                                <div class="accordion" id="ChannalsAcc">

                                </div>
                            </div>
                            <div class="tab-pane fade" id="Addon">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <br />
        <br />
    </section>

</asp:Content>
