using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Json;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class SubscriptionProcess : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod]
        public static string ProcessStep1()
        {
            string IsPayUSuccess = "";
            string criteria = "", OPID = "";
            if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1" && HttpContext.Current.Session["SubscriptionProcess"] != null)
            {
                try
                {
                    string Data = HttpContext.Current.Session["SubscriptionProcess"].ToString();
                    if (Data.Split('*')[1].ToLower() == "success")
                    {
                        IsPayUSuccess = "true";
                    }
                    else if (Data.Split('*')[1].ToLower() == "initiated" || Data.Split('*')[1].ToLower() == "donothing")
                    {
                        //call Service API
                        string API = Data.Split('*')[0];
                        clsCommon objCommon = new clsCommon();
                        criteria = " And TransID=" + API.Split('|')[2] + "";
                        OPID = HttpContext.Current.Session["OpperatorID"].ToString();
                        var response = objCommon.CallAPI("PaymentsSyncWebService?OPID=" + OPID + "&Criteria=" + criteria + "");
                        JsonValue Obj = JsonObject.Parse(response);
                        string Status = objCommon.JValReplace("Status", Obj);
                        if (Status.ToLower() != "success")
                            IsPayUSuccess = "false";
                        else
                            IsPayUSuccess = "true";
                    }
                }
                catch (Exception ex)
                {
                    IsPayUSuccess = "false";
                }
            }

            return IsPayUSuccess + '|' + OPID + '|' + criteria;
        }
        [System.Web.Services.WebMethod]
        public static string ProcessStep2()
        {

            clsCommon objCommon = new clsCommon();
            string  RecpPGTransID = "", RecpNo = "", RecpAmount = "";
            string IsRecpCreated = "";
            if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1" && HttpContext.Current.Session["SubscriptionProcess"] != null)
            {
                try
                {
                    string Data = HttpContext.Current.Session["SubscriptionProcess"].ToString();
                    string API = Data.Split('*')[0];

                    var response = objCommon.CallAPI("PaymentSave?OPID=" + API.Split('|')[0] +
                                             "&CustomerID=" + API.Split('|')[1] +
                                             "&OrderID=" + API.Split('|')[2] + "&PGTransID=" + API.Split('|')[3] + "&PayMode=" + API.Split('|')[4] + "&PayStatus=" + API.Split('|')[5] +
                                             "&PaidAmount=" + API.Split('|')[6] + "&Discount=" + API.Split('|')[7] +
                                             "&PGType=" + API.Split('|')[8] + "&BankRefNo=" + API.Split('|')[9] +
                                             "&BankCode=" + API.Split('|')[10] + "&Error=" + API.Split('|')[11] + "&NameOnCard=" + API.Split('|')[12] +
                                             "&CardNumber=" + API.Split('|')[13] + "&CardHash=''" +
                                             "&MemShipNo=" + API.Split('|')[15] +
                                             "&PGID=" + API.Split('|')[16] + "");


                    JsonValue Obj = JsonObject.Parse(response);
                    string Status = objCommon.JVal("Status", Obj);
                    string Description = objCommon.JVal("Description", Obj);
                    if (Status.Replace("\"", "") == "Success")
                    {
                        if (Description != null && Description != "")
                        {

                            DataTable RecepSuccess = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                            RecpPGTransID = RecepSuccess.Rows[0]["PGTransID"].ToString();
                            RecpNo = RecepSuccess.Rows[0]["RecpNo"].ToString();
                            RecpAmount = RecepSuccess.Rows[0]["RecpAmt"].ToString();
                        }
                        IsRecpCreated = "true";
                    }
                    else
                    {
                        IsRecpCreated = "false";
                    }
                }
                catch (Exception ex)
                {
                    IsRecpCreated = "false";
                }
            }
            return IsRecpCreated + "|" + RecpPGTransID;
        }
        [System.Web.Services.WebMethod]
        public static string ProcessStep3(string PGTransID)
        {
            string IsSubsSuccess = "", SubsResult = "";
            clsCommon objCommon = new clsCommon();
            try
            {
                string result = "";
                if (HttpContext.Current.Session["SubsProductDetail"] != null && HttpContext.Current.Session["IsRenew"]==null)
                {
                    //Auth DeAuth Product
                    string[] input = HttpContext.Current.Session["SubsProductDetail"].ToString().Split('|');
                    string AuthData = JsonConvert.SerializeObject(input[0]);
                    string DeAuthData = JsonConvert.SerializeObject(input[1]);

                    string Data = "{\"opID\":\"" + input[4] + "\",\"userID\":\"-1\",\"SmartCard\":\"" + input[2] + "\",\"SubsModifyTimeStamp\":\"" + input[3] + "\",\"AuthProduct\":" + AuthData + ",\"DeAuthProduct\":" + DeAuthData + ",\"IsDay\":\"False\",\"NoOfMonth\":\"-1\",\"IsPrePaid\":\"true\",\"PGTransID\":\"" + PGTransID + "\",\"NoOfMonth\":\"0\"}";

                    //Thread.Sleep(20000);
                    result = objCommon.CallPostAPI(Data, "SubscriberAuthDeAuthCard");

                }
                else if(HttpContext.Current.Session["IsRenew"]!=null && HttpContext.Current.Session["SubsProductDetail"] != null)
                {
                    //Re New Product
                    string[] input = HttpContext.Current.Session["SubsProductDetail"].ToString().Split('|');
                    string CustomerData = JsonConvert.SerializeObject(input[0]);
                    string ProductData = JsonConvert.SerializeObject(input[1]);

                    string Data = "{\"OPID\":\"" + input[2] + "\",\"CustomerData\":" + CustomerData + ",\"ProductData\":" + ProductData + ",\"IsAuth\":1,\"RenewMode\":\"" + 1 + "\",\"IsExtend\":" + 1 + ",\"PgTransID\":\"" + PGTransID + "\"}";
                    //Thread.Sleep(20000);
                    result = objCommon.CallPostAPI(Data, "ExtendSubscription");
                    HttpContext.Current.Session["IsRenew"] = null;

                }
               JsonValue Obj = JsonObject.Parse(result);
                string status = objCommon.JVal("Status", Obj);
                SubsResult = objCommon.JVal("Description", Obj);

                if (status.Replace("\"", "") == "Success")
                {
                    /////////////////////////// On Subscription Success//////////////////////
                    HttpContext.Current.Session["SubscriptionSuccess"] = SubsResult;
                    HttpContext.Current.Session["SubsProductDetail"] = null;
                    IsSubsSuccess = "true";
                }
                else
                {
                    /////////////////////////// On Subscription Fail Redirect to Subscription Fail Page//////
                    HttpContext.Current.Session["SubscriptionFail"] = SubsResult;
                    IsSubsSuccess = "false";
                }
            }
            catch (Exception ex)
            {
                HttpContext.Current.Session["SubscriptionFail"] = SubsResult;
                IsSubsSuccess = "false";
            }
            return IsSubsSuccess + "|" + SubsResult;
        }
    }
}