<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaster.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication1.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <!-- Single Slide Start -->

    <!-- Slider 1 -->
    <div class="slider" id="slider1">
        <!-- Slides -->
        <div style="background-image: url(images/others/2.png)" class="responsive"></div>
        <div style="background-image: url(images/others/3.png)" class="responsive"></div>
        <div style="background-image: url(images/others/10.png)" class="responsive"></div>
        <div style="background-image: url(images/others/7.png)" class="responsive"></div>
        <div style="background-image: url(images/others/5.png)" class="responsive"></div>
        <!-- The Arrows -->
        <i class="left" class="arrows" style="z-index: 2; position: absolute;">
            <svg viewBox="0 0 100 100">
                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></path></svg></i>
        <i class="right" class="arrows" style="z-index: 2; position: absolute;">
            <svg viewBox="0 0 100 100">
                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" transform="translate(100, 100) rotate(180) "></path></svg></i>
    </div>
    </div>
        <!-- Single Slide End -->
    </section>
    <!-- =================== Section1 Area Start =================== -->
    <section class="Section1 mt-20 mb-60">
        <div class="container">
            <div class="row">
                <div class="site-title mb-50">
                    <h1 class="nex-title">Welcome to the World of Entertainment</h1>
                    <h4 class="nex-undertitle">At Reliable Digital Network Pvt Ltd, we strive to create a better experience for our viewers. <br />
                        We offer channels of all genres in SD & HD variants to keep our Subscribers <br />Entertained, Enlightened and Evolved.</h4>
                </div>
                <div class="col-md-12 mb-40" id="Section1">
                    <div class="col-sm-6" id="leftsection1">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max mt-60">
                                <h2>Entertainment & Movies</h2>
                                <%--<h5>Simple and Responsive</h5>--%>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>We are offering 126 SD Channels and 108 HD Channels in bouquets and a-la-carte packs under Entertainment and Movies Category which you can enjoy with your family in your leisure time. </p>

                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>
                    <div class="col-sm-6 m-t-60-xs-max p-l-45-sm-min p-l-75-md-min">
                        <div class="col-inner wow fadeInRight clearfix">
                            <img class="img-responsive float-r-sm-min m-x-auto-xs-max" src="images/homepage/lively-family-watching-tv.jpg" alt="" data-sr="right" data-sr-id="7" style="visibility: visible; -webkit-transform: translateX(0); opacity: 1; transform: translateX(0); opacity: 1; -webkit-transition: -webkit-transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; -webkit-box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75); -moz-box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75); box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75);" />
                        </div>
                    </div>
                    <div class="col-sm-6" id="Rightsection2" style="display: none; text-align: right">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max">
                                <h2>About Us #1</h2>
                                <%--<h5>Simple and Responsive</h5>--%>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-40 mt-40" id="Section2">
                    <div class="col-sm-6" id="Div2" style="display: none">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max ">
                                <h2>Sports</h2>
                                <%--<h5>Simple and Responsive</h5>--%>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>Don’t miss out on any of your favourite games whether it is Cricket, Football or Wrestling. We bring 45 Sports Channels to your doorstep to unleash the sports buff in you so you can relax and pursue your interest after a hectic day.</p>
                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>
                    <div class="col-sm-6 m-t-60-xs-max p-l-45-sm-min p-l-75-md-min">
                        <div class="col-inner wow fadeInRight clearfix">
                            <img class="img-responsive float-r-sm-min m-x-auto-xs-max" src="images/homepage/Smarttv.png" alt="" data-sr="right" data-sr-id="7" style="visibility: visible; -webkit-transform: translateX(0); opacity: 1; transform: translateX(0); opacity: 1; -webkit-transition: -webkit-transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s;" />
                        </div>
                    </div>
                    <div class="col-sm-6" id="Div3" style="text-align: right">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max mt-50">
                                <h2>Sports</h2>
                                <%--<h5>Simple and Responsive</h5>--%>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>Don’t miss out on any of your favourite games whether it is Cricket, Football or Wrestling. We bring 45 Sports Channels to your doorstep to unleash the sports buff in you so you can relax and pursue your interest after a hectic day.</p>
                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-40 mt-40" id="Section3">
                    <div class="col-sm-6" id="Div7">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max mt-30">
                                <h2>Video on Demand</h2>
                                <%--<h5>Simple and Responsive</h5>--%>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>If your plan for weekend is to enjoy your favourite movie at home then you don’t have to worry about it. We have a wide collection of movies available on demand. You can place request for your desired movie and get the services available at your convenience.</p>

                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>
                    <div class="col-sm-6 m-t-60-xs-max p-l-45-sm-min p-l-75-md-min">
                        <div class="col-inner wow fadeInRight clearfix">
                            <img class="img-responsive float-r-sm-min m-x-auto-xs-max" src="images/homepage/whatisnext.png" alt="" data-sr="right" data-sr-id="7" style="visibility: visible; -webkit-transform: translateX(0); opacity: 1; transform: translateX(0); opacity: 1; -webkit-transition: -webkit-transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; -webkit-box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75); -moz-box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75); box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75);" />
                        </div>
                    </div>
                    <div class="col-sm-6" id="Div8" style="display: none; text-align: right">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max">
                                <h2>About Us #1</h2>
                                <h5>Simple and Responsive</h5>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>



                </div>

                <div class="col-md-12 mt-40" id="Div1">
                    <div class="col-sm-6" id="Div4" style="display: none">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max">
                                <h2>About Us #1</h2>
                                <h5>Simple and Responsive</h5>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>
                    <div class="col-sm-6 m-t-60-xs-max p-l-45-sm-min p-l-75-md-min">
                        <div class="col-inner wow fadeInRight clearfix">
                            <img class="img-responsive float-r-sm-min m-x-auto-xs-max" src="images/homepage/Litilgirl.jpg" alt="" data-sr="right" data-sr-id="7" style="visibility: visible; -webkit-transform: translateX(0); opacity: 1; transform: translateX(0); opacity: 1; -webkit-transition: -webkit-transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s; -webkit-box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75); -moz-box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75); box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75);" />
                        </div>
                    </div>
                    <div class="col-sm-6" id="Div5" style="text-align: right">
                        <div class="col-inner">
                            <div class="section-heading align-c-xs-max mt-60">
                                <h2>Kids Entertainment</h2>
                                <%--<h5>Simple and Responsive</h5>--%>
                                <div class="divider"></div>
                            </div>
                            <!-- .section-heading -->
                            <div class="section-content">
                                <p> Sometimes it is essential to keep your little ones busy. We bring you 27 Channels in this Category featuring Cartoon & Informative Channels so you can choose the right mix of Knowledge and Entertainment for your kids and let them enjoy.</p>

                            </div>
                            <!-- .section-content -->
                        </div>
                    </div>



                </div>
            </div>
        </div>
        <!-- .end container -->
    </section>
    <div class="clearfix"></div>
    <!-- =================== Purchase Area End =================== -->



</asp:Content>
