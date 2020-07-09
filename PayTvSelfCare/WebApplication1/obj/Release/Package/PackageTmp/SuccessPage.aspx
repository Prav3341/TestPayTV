<%@ Page Title="" Language="C#" MasterPageFile="~/PatTVMainMaster.Master" AutoEventWireup="true" CodeBehind="SuccessPage.aspx.cs" Inherits="WebApplication1.SuccessPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/WebForms/SuccessPage.js"></script>
     <style type="text/css">
        .mainDiv { padding: 15px; word-wrap: break-word; }
        .marginBottom { margin-bottom: 1px; }
        .headingDiv { text-align: center; font-size: 18px; }
        /*.headingDiv p { background: #fd9932; color: #FFF; }*/

        .padding { padding: 0px; }
        .txtalign { text-align: right; }
        #SuccessReceipt { margin-bottom: 60px; }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    

    <section id="content">
        <div class="container" id="SuccessReceipt" style="color: #484848; margin-bottom: 20%;">
            <div class="section">
                <div class="card material-table mainDiv">
                    <div class="row marginBottom" style="padding: 2px;">
                        <div class="col s12 headingDiv" style="background: #FC8002;">
                            <p style="float: left; font-size: 30px; color: #19e619;">
                                <i class="mdi-action-done"></i>&nbsp;
                            </p>
                            <p style="float: left; font-size: 18px; padding-top: 8px; color: #FFF; width: 85%; text-align: left;" id="SPayAmount"></p>
                            <p style="clear: both;"></p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 5px;">
                        <div class="col s4" style="text-align: left;">
                            <img src="Images/MyCableTvLogoIn.png" style="width: 75px;" />
                        </div>
                        <div class="col s8" style="text-align: right; font-size: 14px;">
                            <p style="color: #525252; font-weight: 500; font-size: 15px; margin-top: 5px;">Transaction ID</p>
                            <p id="RecpID"></p>
                            <p id="RecpDate"></p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 5px;">
                        <div class="col s12" style="text-align: left;">
                            <p id="SubsID"></p>
                            <p id="SubsName"></p>
                            <p id="Add1"></p>
                            <p id="Add2"></p>
                            <p id="LastAdd"></p>
                            <p id="SubsEmail"></p>
                            <p id="SubsMob"></p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 5px; padding: 5px;">
                        <table>
                            <thead style="border-bottom: 0px solid #d0d0d0; background: #e8e8e8;">
                                <tr>
                                    <th colspan="2" style="color: #060505; font-size: 15px; font-weight: 400; padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb;">Payment Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb;">Subscription Charges</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb;" id="Amt"></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb;">Online Payment Discount</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb;" id="PaymnetDiscount"></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb;">Total Amount</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb;" id="DiscountTotalAmt"></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb;">Technology Fee</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb;" id="SConvenienceFee"></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb;">Total Amount</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb;" id="TotalAmt"></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb; color: #FC8002; font-weight: 500;">Amount Paid</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb; color: #FC8002; font-weight: 500;" id="AmtPaid"></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; padding-left: 10px; border: 1px solid #e6dbdb; width: 80%;">Balance</td>
                                    <td style="padding: 10px; padding-right: 8px; text-align: right; border: 1px solid #e6dbdb; width: 20%;" id="BalanceAmt"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row" style="margin-bottom: 5px; padding: 12px; font-size: 13px;">
                        <p style="font-size: 18px; font-weight: 500; color: #464646;">Declaration </p>
                        <p>This is a system generated document and does not require signature. Any unauthorized use, disclosure, dissemination, or copying of this document is strictly prohibited and may be unlawful.</p>
                    </div>
                    <div class="row" style="margin-bottom: 5px; padding: 12px; font-size: 13px;">
                        <p><b>NOTE : </b>Your Payment is successful. Please quote your Transaction ID for any queries relating to this transaction in future.</p>
                    </div>
                    <div class="row" style="margin-bottom: 5px; padding: 12px; font-size: 13px; text-align: center; border-top: 1px solid #b3b1b1; border-top-style: dotted;">
                        <h6 style="font-weight: 500;" id="CompanyName"></h6>
                        <p id="CompanyAddress"></p>
                        <p id="ComapnyMobNo"></p>
                        <p id="CompanyEmail"></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
