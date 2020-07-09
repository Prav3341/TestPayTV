<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaster.Master" AutoEventWireup="true" CodeBehind="TraiComplaints.aspx.cs" Inherits="WebApplication1.TraiComplaints" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <img src="images/others/TryCompBanner.png" class="img-responsive" style="background-size: cover; background-position: center center;" />
    <div class="container">
        <div class="raw">
            <div class="col-lg-12">
                <div class="about_main">
                    <div class="about_head text-center">
                        <h1>Trai Compliance</h1>
                        <p>
                            New Regulatory Framework has been implemented by TRAI and the main objective of the same is to:<br />
                            <b>i.</b>	Notify the rates & regulate arrangement amongst Service Provider.<br />
                            <b>ii.</b>	Fix the terms and Conditions of Inter- Connectivity<br />
                            <b>iii</b>.	Lay down Standards of QOS keeping Subscriber’s / Consumer’s benefit in mind.<br />

                        </p>
                    </div>
                </div>

            </div>

            <div class="col-lg-12">
                <div class="col-lg-3 PDF_Img" style="margin-left: 13%;">
                    <a target="_blank" href="images/PDF/Interconnection_Regulation_03_Mar_2017.pdf">
                        <img src="images/others/Pdf.png" /></a>
                    <p>Interconnection Regulation</p>
                </div>
                <div class="col-lg-3 PDF_Img">
                    <a target="_blank" href="images/PDF/QOS_Regulation_03_Mar_2017.pdf">
                        <img src="images/others/Pdf.png" />
                    </a>
                    <p>QOS Regulation</p>
                </div>
                <div class="col-lg-3 PDF_Img">
                    <a target="_blank" href="images/PDF/Tariff_Order_English_03 Mar_2017.pdf">
                        <img src="images/others/Pdf.png" />
                    </a>
                    <p>Tariff Order English</p>
                </div>

            </div>
        </div>
    </div>

</asp:Content>
