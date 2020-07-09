<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaster.Master" AutoEventWireup="true" CodeBehind="PurchaseDetails.aspx.cs" Inherits="WebApplication1.PurchaseDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div id="PurheseDetails">
            <div class="inner_container" style="height: 100%; overflow: hidden;">
                <div>
                    <div class="plans_header_text">Review your Order</div>
                    <div class="plans_header_text" style="margin-top: -71px; margin-left: 505px;">Submit your order</div>
                    <div style="clear: both;"></div>
                    <div style="width: 480px; height: 100%; overflow: hidden; float: left; line-height: 20px;">
                        <div class="order_header">
                            <div class="order_title order_title1">Description</div>
                            <div class="order_title order_title2">Item</div>
                            <div class="order_title order_title3">Price</div>
                        </div>
                        <div style="clear: both"></div>
                        <div id="divSubmitOrderDetails" style="display: block;">
                            <div class="order_content" id="divSubmit_SDBasePack" style="display: none;">
                                <div class="order order_title1" style="color: #b1392e;">
                                    <label name="spSDBasePackName"></label>
                                    <br />
                                    <span>(Main TV)</span>
                                    <span class="free_addons" name="cart_freeadonsSubmit">+2 Free Regional Add ons :</span>
                                    <span class="free_addons" name="cart_freeadonsName">GUJARATI &amp; RAJASTHANI,BANGALA &amp; ORIYA</span>
                                </div>
                                <div class="order order_title2" name="spSDBasePackCnt"></div>
                                <div class="order order_title3">
                                    <div class="rupee_icon">
                                        <img src="/assets/img/common/gray_rupee.png" />
                                    </div>
                                    <div class="price">
                                        <label name="spSDBasePackPrice"></label>
                                    </div>
                                </div>

                            </div>
                            <div class="order_content" id="divSubmit_HDBasePack">
                                <div class="order order_title1" style="color: #b1392e;">
                                    <label name="spHDBasePackName">royal hd</label>
                                    <br />
                                    <span>(Main TV)</span>
                                    <span class="free_addons" name="cart_freeadonsSubmit">+2 Free Regional Add ons :</span>
                                    <span class="free_addons" name="cart_freeadonsName">GUJARATI &amp; RAJASTHANI,BANGALA &amp; ORIYA</span>
                                </div>
                                <div class="order order_title2" name="spHDBasePackCnt">1</div>
                                <div class="order order_title3">
                                    <div class="rupee_icon">
                                        <img src="/assets/img/common/gray_rupee.png">
                                    </div>
                                    <div class="price">
                                        <label name="spHDBasePackPrice">466.10</label>
                                    </div>
                                </div>

                            </div>

                            <div class="order_content" id="divSubmit_AddOnPack" style="display: none;">
                                <div class="order order_title1" style="color: #b1392e;">
                                    Add On<br />
                                    <span>(Main TV)</span>
                                </div>
                                <div class="order order_title2" name="spAddOnCnt"></div>

                                <div id="addonPacks">
                                </div>
                            </div>
                            <div class="order_content" id="divSubmit_ALaCartes" style="display: none;">
                                <div class="order order_title1" style="color: #b1392e;">
                                    à la carte Channels<br />
                                    <span>(Main TV)</span>
                                </div>
                                <div class="order order_title2" name="spALaCarteCnt"></div>

                                <div id="alacarteChannels">
                                </div>
                            </div>
                            <div class="total_price">
                                <div>
                                    <div class="order order_title1" style="color: #374A82; font-weight: bold;">Total</div>
                                    <div class="order order_title2" name="OrderTotalCnt">1</div>
                                    <div class="order order_title3">
                                        <div class="rupee_icon">
                                            <i class="fa fa-inr" aria-hidden="true"></i>
                                        </div>
                                        <div class="price">
                                            <label name="OrderTotalPrice">466.10</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total_price">
                                <div>
                                    <div class="order order_title1" style="color: #374A82; font-weight: bold;">GST(18%)</div>
                                    <div class="order order_title2" name="OrderTotalCnt">1</div>
                                    <div class="order order_title3">
                                        <div class="rupee_icon">
                                            <i class="fa fa-inr" aria-hidden="true"></i>
                                        </div>
                                        <div class="price">
                                            <label name="GSTTotalPrice">83.90</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total_price">
                                <div>
                                    <div class="order order_title1" style="color: #374A82; font-weight: bold;">
                                        You Pay<br />
                                        <span>(Pack + Add On + à la carte)</span>
                                    </div>
                                    <div class="order order_title2"></div>
                                    <div class="order order_title3">
                                        <div class="rupee_icon">
                                            <i class="fa fa-inr" aria-hidden="true"></i>
                                        </div>
                                        <div class="price">
                                            <label name="subTotalPrice">550.00</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="total_price">
                                <input type="button" value="Reset" class="reset" onclick="javascript: ResetCart();">
                            </div>
                        </div>
                        <div class="order_content" id="divSubmitNoOrder" style="display: none;">
                            <div class="order order_title1" style="color: #b1392e;">
                                There are no orders available
                            </div>
                        </div>
                    </div>
                    <div style="width: 50%; height: 100%; overflow: hidden; float: left; margin-left: 24px;">
                        <div class="submit_form">
                            <div style="float: left;">
                                <div>
                                    <div class="order_label">Name<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_name" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Smart Card No/MAC ID<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_smc" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Mobile No<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" maxlength="10" onkeypress="javascript:return AllowNumbers(event);" name="cust_mobNo" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Email Id<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_email" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Local Cable Operator<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_lcoName" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Cable Operator Number</div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" onkeypress="javascript:return AllowNumbers(event);" name="cust_cableoperatorno" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label" style="padding: 15px 0;">Address</div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">House No<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_houseno" />
                                    </div>
                                </div>
                                <div>
                                    <div class="order_label">Building No<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_buildingno">
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Area<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" name="cust_area" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">City<span style="color: red">*</span></div>
                                    <select id="Select1" class="State_Select">
                                        <option></option>
                                    </select>

                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">State<span style="color: red">*</span></div>
                                    <select id="State" class="State_Select">
                                        <option></option>
                                    </select>

                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label">Pin Code<span style="color: red">*</span></div>
                                    <div class="order_txt">
                                        <input type="text" class="order_textbox" onkeypress="javascript:return AllowNumbers(event);" name="cust_pincode" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div>
                                    <div class="order_label"></div>
                                    <div class="order_txt_txt">
                                        <input type="button" class="order_submit" value="Submit" onclick="javascript: validateSubmitfield();" />
                                    </div>
                                </div>
                                <div style="clear: both"></div>
                                <div style="margin-top: 20px;">
                                    <span id="ErrorMsgDiv" style="font-size: 15px;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
