<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaster.Master" AutoEventWireup="true" CodeBehind="STBScheme.aspx.cs" Inherits="WebApplication1.STBScheme" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <div class="container">
            <div class="raw">
                <div class="col-lg-12">
                    <section>
                        <h3 class="STBHeding">STB SCHEME</h3>
                        <ul class="nav nav-tabs common_tabs">
                            <!--li class="active"><a data-toggle="tab" href="#SpecialScheme">Special SITI Scheme</a></li-->
                            <li class="active" id="OutrightTab"><a data-toggle="tab" href="#" aria-expanded="false">Outright Purchase Schemes</a></li>
                            <li class="" id="StarndardTab"><a data-toggle="tab" href="#" aria-expanded="true">Rental Scheme </a></li>
                        </ul>
                        <div class="mb-40">
                            <div id="stb_ops">
                                <div class="brodband_speed">

                                    <h4 style="font-size: 19px; color: #272727; padding: 4px 0px 8px 0px;">Outright Purchase Schemes</h4>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Up front charges (Rs.)</p>
                                        <p class="MainText">Rs. 1200/- for SD STB and Rs. 1500/- for HD STB</p>
                                    </div>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Refund</p>
                                        <p class="MainText">STB sold under outright purchase scheme will be on non-returnable basis.</p>
                                    </div>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Activation charges</p>
                                        <p class="MainText">Rs.100/- for SD and HD STB</p>
                                    </div>
                                </div>
                                <div>
                                    <p>All prices above are exclusive of taxes, as applicable.</p>
                                </div>

                                <%--<div class="row">

                                <div class="col-md-12">
                                    <ul class="list-group m-15px-l">
                                        <li>Warranty period for STBs under outright purchase scheme shall be 12 months from the date of installation of STB.</li>
                                        <li>No repair and maintenance charges shall be applicable during the warranty period, provided STB has been used in normal working conditions and is not tampered with.</li>
                                        <li>During the warranty period the STB will be repaired or replaced within 24 hours of receipt of complaint.</li>
                                        <li>Post warranty period you can avail of Annual Maintenance Contract (AMC) on optional basis for Rs. 20/- per month.</li>
                                        <li>In case you do not opt for the AMC, repair will be undertaken by the Company on chargeable basis as per actual.</li>
                                        <li>Replacement or repair of accessories including adopter/remote etc. are chargeable as per actual price (as declared by the Company) of such accessories.</li>
                                        <li>Installation charges/Re-installation charges/re-location charges shall be charged as per applicable rates prescribed by TRAI under Quality of Service Regulations’ 2017.</li>
                                        <li>PayTv has the right to withdraw/replace this scheme at its sole discretion in compliance with the regulations</li>
                                    </ul>
                                </div>
                            </div>--%>
                            </div>

                            <div id="rental_scheme" style="display: none">

                                <div class="brodband_speed">
                                    <h4 style="font-size: 19px; color: #272727; padding: 4px 0px 8px 0px;">Rental Scheme </h4>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Security Deposit (Rs.)</p>
                                        <p class="MainText">Rs. 750/- for SD STB and Rs. 900/- for HD STB</p>
                                    </div>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Rent per month (Rs.)</p>
                                        <p class="MainText">Rs.50/- for SD STB and Rs.60/- for HD STB up to 36 months. No rental beyond 36 months.</p>
                                    </div>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Refund</p>
                                        <p class="MainText">Security deposit is refundable subject to deduction of 5% for each month of usage period subject to terms and conditions mentioned below.</p>
                                    </div>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Activation Charges</p>
                                        <p class="MainText">Rs,100 per STB</p>
                                    </div>
                                    <div style="width: 100%; float: left;">
                                        <p class="bluebg">Repair Charges</p>
                                        <p class="MainText">No repair charges for first 36 months. Actual repair charges beyond 36 months.</p>
                                    </div>
                                </div>
                                <div>
                                    <p>All prices above are exclusive of taxes, as applicable.</p>
                                </div>

                                <%--<div class="row">

                                <div class="col-md-12">


                                    <ul class="list-group m-15px-l">
                                        <li>No repair and maintenance charges shall be applicable for first 36 months, provided STB has been used in normal working conditions and is not tampered with.</li>

                                        <li>The security deposit is refundable subject to a deduction of 5% from the security deposit for each month of usage. Part of month will be considered as one month. The STB at all times remain property of <b>PayTv</b>.</li>

                                        <li>Replacement or repair of accessories including lead/remote etc. is chargeable as per actual price (as declared by <b>PayTv</b> ) of such accessories.</li>
                                        <li>Installation charges/Re-installation charges/re-location charges shall be charged as per applicable rates prescribed by TRAI under Quality of Service Regulations’ 2017.</li>
                                        <li>PayTv has the right to withdraw/replace this scheme at its sole discretion in compliance with the regulations.</li>
                                    </ul>
                                </div>
                            </div>--%>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
