using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Json;
using CCA.Util;

namespace WebApplication1
{
    public partial class SuccessPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Int64 txtPGtypeID = Convert.ToInt64(HttpContext.Current.Session["PGID"]);
           
            if (txtPGtypeID == 6)
                PayuDeails(txtPGtypeID);
            else if(txtPGtypeID==9 || txtPGtypeID==4)
                CCAvenueDetails(txtPGtypeID);
            
        }
        public void PayuDeails(Int64 txtPGtypeID)
        {
            DataTable LoginTable = HttpContext.Current.Session["CurrLogInDetails"] as DataTable;
            DataTable Paymentchargedt = (DataTable)HttpContext.Current.Session["PGType"];
            Paymentchargedt = Paymentchargedt.AsEnumerable().Where(row => row.Field<Int64>("PGID") == txtPGtypeID).CopyToDataTable();
            try
            {
                DataSet ProductInfo = new DataSet();
                DataTable dt = new DataTable();
                clsCommon objcommon = new clsCommon();
                string CancelVar = "";
                string[] merc_hash_vars_seq;
                string merc_hash_string = string.Empty;
                string merc_hash = string.Empty;
                string order_id = string.Empty;
                string hash_seq = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";
                string CurrPaymentDate = DateTime.Now.ToString("dd MMM yyyy HH:mm:ss");//DateTime.Now.ToString(BaseClass_CNMS.DateTimeStringFormatWithSec);
                string BillDeskStatus = "";

                HttpContext.Current.Session["txtPGtypeID"] = null;
              
                HttpContext.Current.Session["IsReceiptShow"] = null;
                ProductInfo = JsonConvert.DeserializeObject<DataSet>(Request.Form["productinfo"]);
                string PaymentAmount = "";
                if (Convert.ToBoolean(ProductInfo.Tables[0].Rows[0]["IsDisPayInc"]) == true)
                {
                    if (Convert.ToBoolean(ProductInfo.Tables[0].Rows[0]["IsDiscountAllowed"]) == true)
                        PaymentAmount = ProductInfo.Tables[0].Rows[0]["AfterDisPayAmount"].ToString();

                    else
                        PaymentAmount = ProductInfo.Tables[0].Rows[0]["SubsPaymentAmount"].ToString();
                }
                else
                    PaymentAmount = ProductInfo.Tables[0].Rows[0]["value"].ToString();
                
                
                    CancelVar = "true|" + Request.Form["txnid"] + "|" + Request.Form["phone"] + "|" + (Request.Form["amount"] == null ? "0" : Request.Form["amount"]) + "|" + Request.Form["email"].ToString() + "|" + ProductInfo.Tables[0].Rows[0]["OperatorID"].ToString() + "|" + txtPGtypeID + "|" + Request.Form["txnid"] + "|" + Request.Form["mode"].ToString();

                    merc_hash_vars_seq = hash_seq.Split('|');
                    Array.Reverse(merc_hash_vars_seq);


                    merc_hash_string = Paymentchargedt.Rows[0]["Salt"] + "|" + Request.Form["status"];

                    foreach (string merc_hash_var in merc_hash_vars_seq)
                    {
                        merc_hash_string += "|";
                        merc_hash_string = merc_hash_string + (Request.Form[merc_hash_var] != null ? Request.Form[merc_hash_var] : "");

                    }

                merc_hash = Generatehash512(merc_hash_string).ToLower();
                bool Isredirect = false;
                if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1" && Request.Form["status"] != "fail")
                {
                    string APIData = ProductInfo.Tables[0].Rows[0]["OperatorID"].ToString() +
                                   "|" + ProductInfo.Tables[0].Rows[0]["CustomerID"].ToString() +
                                   "|" + Convert.ToString(Request.Form["txnid"]) + "|" + Convert.ToString(Request.Form["mihpayid"]) + "|" + Convert.ToString(Request.Form["mode"]) + "|" + Convert.ToString(Request.Form["status"]) +
                                   "|" + PaymentAmount + "|" + ProductInfo.Tables[0].Rows[0]["DiscountAmount"].ToString() +
                                   "|" + Convert.ToString(Request.Form["bankcode"]) + "|" + Convert.ToString(Request.Form["bank_ref_num"]) +
                                   "|" + Convert.ToString(Request.Form["bankcode"]) + "|" + Convert.ToString(Request.Form["error"]) + "|" + Convert.ToString(Request.Form["name_on_card"]) +
                                   "|" + Convert.ToString(Request.Form["cardnum"]) + "|''" +
                                   "|" + ProductInfo.Tables[0].Rows[0]["MemShipNo"].ToString() +
                                   "|" + txtPGtypeID;
                    HttpContext.Current.Session["SubscriptionProcess"] = APIData + "*" + Request.Form["status"] + "*" + CancelVar;
                    Isredirect = true;
                    Response.Redirect("/SubscriptionProcess", false);
                }
                else
                {
                    if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                    {
                        HttpContext.Current.Session["IsCancel"] = CancelVar;
                        //Used IsCancel Session on Subscription Fail Page
                        Isredirect = true;
                        Response.Redirect("/SubscriptionFail", false);
                    }
                }
                if (Isredirect == false)
                {
                    if (Request.Form["status"] == "success" || BillDeskStatus == "S")
                    {
                        {
                            string output = "", RecpPGTransID = "", RecpNo = "", RecpAmount = "";
                            DataTable dtResult = new DataTable();
                            /////////////////////  Process Started /////////////////////////////////
                            try
                            {
                                clsCommon objCommon = new clsCommon();
                                var response = objCommon.CallAPI("PaymentSave?OPID=" + ProductInfo.Tables[0].Rows[0]["OperatorID"].ToString() +
                                    "&CustomerID=" + ProductInfo.Tables[0].Rows[0]["CustomerID"].ToString() +
                                    "&OrderID=" + Convert.ToString(Request.Form["txnid"]) + "&PGTransID=" + Convert.ToString(Request.Form["mihpayid"]) + "&PayMode=" + Convert.ToString(Request.Form["mode"]) + "&PayStatus=" + Convert.ToString(Request.Form["status"]) +
                                    "&PaidAmount=" + PaymentAmount + "&Discount=" + ProductInfo.Tables[0].Rows[0]["DiscountAmount"].ToString() +
                                    "&PGType=" + Convert.ToString(Request.Form["bankcode"]) + "&BankRefNo=" + Convert.ToString(Request.Form["bank_ref_num"]) +
                                    "&BankCode=" + Convert.ToString(Request.Form["bankcode"]) + "&Error=" + Convert.ToString(Request.Form["error"]) + "&NameOnCard=" + Convert.ToString(Request.Form["name_on_card"]) +
                                    "&CardNumber=" + Convert.ToString(Request.Form["cardnum"]) + "&CardHash=''" +
                                    "&MemShipNo=" + ProductInfo.Tables[0].Rows[0]["MemShipNo"].ToString() +
                                    "&PGID=" + txtPGtypeID + "");


                                JsonValue Obj = JsonObject.Parse(response);
                                string Status = objCommon.JVal("Status", Obj);
                                string Description = objCommon.JVal("Description", Obj);
                                if (Description != null && Description != "")
                                {

                                    output = Status.Replace("\"", "");
                                    DataTable RecepSuccess = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                                    RecpPGTransID = RecepSuccess.Rows[0]["PGTransID"].ToString();
                                    RecpNo = RecepSuccess.Rows[0]["RecpNo"].ToString();
                                    RecpAmount = RecepSuccess.Rows[0]["RecpAmt"].ToString();
                                }                              
                                if (output.ToLower() == "success")
                                {
                                    HttpContext.Current.Session["AddMoney"] = "yes";
                                    HttpContext.Current.Session["PGID"] = RecpPGTransID;
                                    Response.Redirect("/MyPaymentHistory", false);
                                }
                                else
                                {
                                    output = "Payment transcation " + output + ",please try again in new Browser window.";
                                    HttpContext.Current.Session["IsCancel"] = CancelVar;
                                    Response.Redirect("/Failed", false);
                                }
                            }
                            catch (Exception ex)
                            {
                                output = "Payment transcation failed,please try again in new Browser window.";
                                HttpContext.Current.Session["IsCancel"] = CancelVar;
                                if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                                {
                                    //Used IsCancel Session on Subscription Fail Page
                                    Response.Redirect("/SubscriptionFail", false);
                                }
                                else
                                    Response.Redirect("/Failed", false);
                            }
                        }
                    }
                    else
                    {
                        HttpContext.Current.Session["IsCancel"] = CancelVar;
                        if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                        {
                            //Used IsCancel Session on Subscription Fail Page
                            Response.Redirect("/SubscriptionFail", false);
                        }
                        else
                            Response.Redirect("/Failed", false);
                    }                  
                }
            }
            catch (Exception ex)
            {
                HttpContext.Current.Session["IsCancel"] = "true|" + Request.Form["txnid"] + "|" + Request.Form["phone"].ToString() + "|" + (Request.Form["amount"] == null ? "0" : Request.Form["amount"]) + "|" + Request.Form["email"].ToString() + "|" + LoginTable.Rows[0]["OperatorID"].ToString() + "|" + txtPGtypeID;
                if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                {
                    //Used IsCancel Session on Subscription Fail Page
                    Response.Redirect("/SubscriptionFail", false);
                }
                else
                    Response.Redirect("/Failed", false);
            }
        }
        public void CCAvenueDetails(Int64 txtPGtypeID)
        {
            DataTable Paymentchargedt = (DataTable)HttpContext.Current.Session["PGType"];

            Paymentchargedt = Paymentchargedt.AsEnumerable().Where(row => row.Field<Int64>("PGID") == txtPGtypeID).CopyToDataTable();


            DataTable LogInDT = HttpContext.Current.Session["CurrLogInDetails"] as DataTable;
            DataTable DsahboardDT = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
            try
            {
                string workingKey = (Paymentchargedt.Rows[0]["IsPGTest"].ToString().ToLower() == "no") ? Paymentchargedt.Rows[0]["MerchantKey"].ToString() : Paymentchargedt.Rows[0]["testMerchantKey"].ToString();//Access code of CCAvenue from PayType Form.
                CCACrypto ccaCrypto = new CCACrypto();
                string encResponse = ccaCrypto.Decrypt(Request.Form["encResp"], workingKey);
                string[] segments = encResponse.Split('&');
                DataTable ResponseDT = new DataTable();
                Int64 PGID = txtPGtypeID;
                foreach (string seg in segments)
                {
                    string[] parts = seg.Split('=');
                    if (parts.Length > 0)
                    {
                        ResponseDT.Columns.Add(parts[0].Trim());
                    }
                }
                var row = ResponseDT.NewRow();
                foreach (string seg in segments)
                {
                    string[] parts = seg.Split('=');
                    if (parts.Length > 0)
                    {
                        row[parts[0].Trim()] = (parts[1] == "" || parts[1] == null) ? "" : parts[1].Trim();
                    }
                }
                ResponseDT.Rows.Add(row);
                string output = "Fail";

                string PaymentName = "CCAvenue Payment";
                if (PGID == 9)
                    PaymentName = "HDFC Payment";

                string CancelVar = "true|" + Convert.ToString(ResponseDT.Rows[0]["tracking_id"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["billing_tel"]) + "|" + (ResponseDT.Rows[0]["amount"] == null ? "0" : ResponseDT.Rows[0]["amount"]) + "|" + ResponseDT.Rows[0]["billing_email"] + "|" + LogInDT.Rows[0]["CableOperaterID"].ToString() + "|" + txtPGtypeID + "|" + Convert.ToString(ResponseDT.Rows[0]["tracking_id"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["payment_mode"]);


                if (ResponseDT.Rows[0]["order_status"].ToString() == "Success")
                {
                    bool Isredirect = false;
                    if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1" && Request.Form["status"] != "fail")
                    {
                        string APIData = LogInDT.Rows[0]["CableOperaterID"].ToString() +
                                       "|" + LogInDT.Rows[0]["CustomerID"].ToString() +
                                       "|" + Convert.ToString(ResponseDT.Rows[0]["order_id"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["tracking_id"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["payment_mode"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["order_status"]) +
                                       "|" + Convert.ToString(ResponseDT.Rows[0]["amount"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["discount_value"]) +
                                       "|" + "" + "|" + Convert.ToString(ResponseDT.Rows[0]["bank_ref_no"]) +
                                       "|" + PaymentName + "|" + Convert.ToString(ResponseDT.Rows[0]["failure_message"]) + "|" + Convert.ToString(ResponseDT.Rows[0]["card_name"]) +
                                       "|" + Convert.ToString(Request.Form["cardnum"]) + "|''" +
                                       "|" + DsahboardDT.Rows[0]["MemShipNo"].ToString() +
                                       "|" + txtPGtypeID;
                        HttpContext.Current.Session["SubscriptionProcess"] = APIData + "*" + Convert.ToString(ResponseDT.Rows[0]["order_status"]) + "*" + CancelVar;
                        Isredirect = true;
                        Response.Redirect("/SubscriptionProcess", false);
                    }
                    else
                    {
                        if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                        {
                            HttpContext.Current.Session["IsCancel"] = CancelVar;
                            //Used IsCancel Session on Subscription Fail Page
                            Isredirect = true;
                            Response.Redirect("/SubscriptionFail", false);
                        }
                    }

                    if (Isredirect == false)
                    {
                        string RecpPGTransID = "", RecpNo = "", RecpAmount = "";
                        DataTable dtResult = new DataTable();
                        /////////////////////  Process Started /////////////////////////////////
                        try
                        {
                            clsCommon objCommon = new clsCommon();
                            var response = objCommon.CallAPI("PaymentSave?OPID=" + LogInDT.Rows[0]["CableOperaterID"].ToString() +
                                "&CustomerID=" + LogInDT.Rows[0]["CustomerID"].ToString() +
                                "&OrderID=" + Convert.ToString(ResponseDT.Rows[0]["order_id"]) + "&PGTransID=" + Convert.ToString(ResponseDT.Rows[0]["tracking_id"]) + "&PayMode=" + Convert.ToString(ResponseDT.Rows[0]["payment_mode"]) + "&PayStatus=" + Convert.ToString(ResponseDT.Rows[0]["order_status"]) +
                                "&PaidAmount=" + Convert.ToString(ResponseDT.Rows[0]["amount"]) + "&Discount=" + Convert.ToString(ResponseDT.Rows[0]["discount_value"]) +
                                "&PGType=" + PaymentName + "&BankRefNo=" + Convert.ToString(ResponseDT.Rows[0]["bank_ref_no"]) +
                                "&BankCode=" + "" + "&Error=" + Convert.ToString(ResponseDT.Rows[0]["failure_message"]) + "&NameOnCard=" + Convert.ToString(ResponseDT.Rows[0]["card_name"]) +
                                "&CardNumber=" + Convert.ToString(Request.Form["cardnum"]) + "&CardHash=''" +
                                "&MemShipNo=" + Convert.ToString(DsahboardDT.Rows[0]["MemShipNo"]) +
                                "&PGID=" + txtPGtypeID + "");



                            JsonValue Obj = JsonObject.Parse(response);
                            string Status = objCommon.JVal("Status", Obj);
                            string Description = objCommon.JVal("Description", Obj);
                            if (Description != null && Description != "")
                            {

                                output = Status.Replace("\"", "");
                                DataTable RecepSuccess = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                                RecpPGTransID = RecepSuccess.Rows[0]["PGTransID"].ToString();
                                RecpNo = RecepSuccess.Rows[0]["RecpNo"].ToString();
                                RecpAmount = RecepSuccess.Rows[0]["RecpAmt"].ToString();
                            }
                            if (output.ToLower() == "success")
                            {
                                HttpContext.Current.Session["AddMoney"] = "yes";
                                HttpContext.Current.Session["PGID"] = RecpPGTransID;
                                Response.Redirect("/MyPaymentHistory", false);
                            }
                            else
                            {
                                output = "Payment transcation " + output + ",please try again in new Browser window.";
                                HttpContext.Current.Session["IsCancel"] = CancelVar;
                                Response.Redirect("/Failed", false);
                            }
                        }
                        catch (Exception ex)
                        {
                            output = "Payment transcation failed,please try again in new Browser window.";
                            HttpContext.Current.Session["IsCancel"] = CancelVar;
                            if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                            {
                                //Used IsCancel Session on Subscription Fail Page
                                Response.Redirect("/SubscriptionFail", false);
                            }
                            else
                                Response.Redirect("/Failed", false);
                        }
                    }
                }
                else
                {
                    HttpContext.Current.Session["IsCancel"] = CancelVar;
                    if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                    {
                        //Used IsCancel Session on Subscription Fail Page
                        Response.Redirect("/SubscriptionFail", false);
                    }
                    else
                        Response.Redirect("/Failed", false);
                }
            }
            catch (Exception ex)
            {
               HttpContext.Current.Session["IsCancel"] = "true|" + Request.Form["tracking_id"] + "|" + Request.Form["billing_tel"].ToString() + "|" + (Request.Form["amount"] == null ? "0" : Request.Form["amount"]) + "|" + Request.Form["billing_email"].ToString() + "|" + LogInDT.Rows[0]["CableOperaterID"].ToString() + "|" + txtPGtypeID;
                if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1")
                {
                    //Used IsCancel Session on Subscription Fail Page
                    Response.Redirect("/SubscriptionFail", false);
                }
                else
                    Response.Redirect("/Failed", false);
            }
        }








        public void SetSession(string constr)
        {
            HttpContext.Current.Session["UserLogOutStatus"] = "LogIn";
            HttpContext.Current.Session["sessionID"] = constr;
            HttpContext.Current.Session["CurrCompID"] = "1";
            HttpContext.Current.Session["CurrFinYearID"] = "1";
            HttpContext.Current.Session["CurrUserID"] = -1;
            HttpContext.Current.Session["CurrPanel"] = "APPWSER";
            HttpContext.Current.Session["UserLogOutStatus"] = "";
            HttpContext.Current.Session["CurrUserLogTransID"] = 0;
            HttpContext.Current.Session["CurrMenuID"] = "0";
            HttpContext.Current.Session["CurrEmployeeID"] = "0";
            HttpContext.Current.Session["CurrServiceID"] = "0";
            HttpContext.Current.Session["bIsWCFCall"] = false;
            HttpContext.Current.Session["WCFPath"] = "";
        }
        [WebMethod]
        public static DataTable XmlToTable(string xmlData)
        {
            StringReader theReader = new StringReader(xmlData);
            DataSet theDataSet = new DataSet();
            theDataSet.ReadXml(theReader);
            return theDataSet.Tables[0];
        }
        public string Generatehash512(string text)
        {
            byte[] message = Encoding.UTF8.GetBytes(text);
            UnicodeEncoding UE = new UnicodeEncoding();
            byte[] hashValue;
            SHA512Managed hashString = new SHA512Managed();
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }

        public static string GetJson(string str)
        {

            //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            //Dictionary<string, object> row;
            str = str.Replace("._.", "å").Replace(".@.", "☻");
            string[] StrArry;
            StrArry = str.Split('å');

            DataTable dt = new DataTable();

            int i = 0;
            foreach (string StrArryData in StrArry)
            {
                //row = new Dictionary<string, object>();
                //row.Add(merc_hash_var, ResponceStr[i]);
                string NewColName = StrArryData.Split('☻')[0].Replace("_cm", "commission").Replace("_DA", "IsDiscountAllowed").Replace("_PAmt", "SubsPaymentAmount").Replace("_DsAmt", "DiscountAmount").Replace("_DsInc", "IsDisPayInc").Replace("_AftDsAt", "AfterDisPayAmount").Replace("_dsp", "description").Replace("_mrId", "merchantId").Replace("_OpID", "OperatorID").Replace("_CustID", "CustomerID").Replace("_MmSNo", "MemShipNo").Replace("_PrdNm", "ProviderName").Replace("_CustNm", "CustomerName");
                dt.Columns.Add(NewColName);
                if (dt.Rows.Count == 0)
                    dt.Rows.Add(StrArryData.Split('☻')[1]);
                else
                    dt.Rows[0][NewColName] = StrArryData.Split('☻')[1];
                i++;
            }
            return JsonConvert.SerializeObject(dt);
        }
    }
}