using CCA.Util;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Json;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Session.Abandon();
                Session.Clear();
                Session.RemoveAll();
            }
            //if (Request.QueryString["IsMobcaller"] != null)
            //{
            //    string IsMobcaller = Request.QueryString["IsMobcaller"].ToString();
            //    if (IsMobcaller == "1")
            //    {
            //        clsCommon obj = new clsCommon();
            //        string Userid = string.Empty;
            //        string Password = string.Empty;
            //        var base64EncodedBytes = System.Convert.FromBase64String(Request.QueryString["UserID"].ToString());
            //        Userid = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                    
            //        base64EncodedBytes = System.Convert.FromBase64String(Request.QueryString["Password"].ToString());
            //        Password = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
            //        obj.LogWrite(Userid);
            //        obj.LogWrite(Password);
            //        string result= LoginMethod(Userid, Password);
            //        obj.LogWrite(result);
            //        ScriptManager.RegisterStartupScript(this, this.GetType(), "OnPassOperatorlogin", "javascript:OnPassOperatorlogin('" + result + "','"+Password+"',1)", true);

            //   }
            //}

            string[] FindKey = null;
            string operatorID = "";
            string PortalUrl2 = HttpContext.Current.Request.Url.Authority;
            clsCommon objcommon = new clsCommon();
            objcommon.LogWrite(PortalUrl2);
            FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
            if (FindKey.Length > 0)
            {
                operatorID = ConfigurationManager.AppSettings[FindKey[0]];
                objcommon.LogWrite(operatorID);
                HttpContext.Current.Session["CableOperatorId"] = operatorID;
                HttpContext.Current.Session["OpperatorID"] = operatorID.ToString();
            }

        }

        [System.Web.Services.WebMethod]
        public static string LoginMethod(string UserID, string Password)
        {
            string[] PortalUrl;
            string[] FindKey = null;
            string operatorID = "";
            PortalUrl = HttpContext.Current.Request.RawUrl.Split('/');
             string PortalUrl2 = HttpContext.Current.Request.Url.Authority;
             FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
             string sessionId = System.Web.HttpContext.Current.Session.SessionID;
            if (FindKey.Length > 0)
            {
                operatorID = ConfigurationManager.AppSettings[FindKey[0]];

                HttpContext.Current.Session["OpperatorID"] = operatorID.ToString();

            }
           
            string resullt = "";
            string opID =   HttpContext.Current.Session["OpperatorID"] as string;
            //string opID = ConfigurationManager.AppSettings["OPID"];
           
            clsCommon objCommon = new clsCommon();
            resullt = objCommon.CallAPI("PaySelfCareLogin?opID=" + opID + "&userID=" + UserID + "&password=" + Password + "");

            JsonValue Obj = JsonObject.Parse(resullt);
            string status = objCommon.JVal("Status", Obj);
            if (status.Replace("\"", "") == "Success")
            {
                string Description = objCommon.JVal("Description", Obj);
                HttpContext.Current.Session["CurrLogInDetails"] = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
            }
            return resullt;
        }
        //Submit OTP
        [System.Web.Services.WebMethod]
        public static string SetLoginOTP(string UserId)
        {
            clsCommon objCommon = new clsCommon();
            string value = "false";
            if (objCommon.IsNumeric(UserId) == true)
            {
                value = "true";
            }
            return objCommon.CallSMSAPI("GenerateOTP?UserId=" + UserId + "&IsNumeric=" + value +"");

        }

        [System.Web.Services.WebMethod]
        public static string GetWebsitePortalUrl()
        {
            string operatorID = "";
            string result = "";
            clsCommon objCommon = new clsCommon();
            string[] FindKey = null;
            string PortalUrl2 = HttpContext.Current.Request.Url.Authority;
             FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
             if (FindKey.Length > 0)
             {
                 operatorID = ConfigurationManager.AppSettings[FindKey[0]]; //got closem from Webconfig
             }

             result = objCommon.CallAPI("GetWebsitePortalUrl?opID=" + operatorID + "");
            return result;
        }
        [WebMethod]
        public static string ChkMobileLogIn(string UserId, string Password)
        {
            clsCommon objCommon = new clsCommon();
            objCommon.LogWrite("Reached");
            string LogInData = "";
            try
            {


                LogInData = objCommon.CallSMSAPI("PaySelfCareLogin?userID=" + UserId + "&password=" + Password + "");

                JsonValue Obj = JsonObject.Parse(LogInData);
                string status = objCommon.JVal("Status", Obj);
                objCommon.LogWrite("status:" + status);
                if (status.Replace("\"", "") == "Success")
                {
                    string Description = objCommon.JVal("Description", Obj);
                    DataTable Details = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                    HttpContext.Current.Session["CurrLogInDetails"] = Details;
                    HttpContext.Current.Session["CurrCustomerID"] = Details.Rows[0]["CustomerID"].ToString();

                    HttpContext.Current.Session["OpperatorID"] = Details.Rows[0]["CableOperaterID"].ToString();
                }
            }
            catch (Exception ex)
            {
                LogInData = ex.Message.ToString();
                objCommon.LogWrite("LogInData:" + LogInData);
            }
            objCommon.LogWrite("status:" + LogInData + "|" + Password);
            return LogInData + "|" + Password;
        }

        [System.Web.Services.WebMethod]
        public static string ProStatelist()
        {

            clsCommon objCommon = new clsCommon();
            // string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallAPI("GetProviderStateList");

        }

        //Get Citylist
        [System.Web.Services.WebMethod]
        public static string ProGetCityList(int StateID)
        {
            clsCommon objCommon = new clsCommon();
            //string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallAPI("GetProviderCityList?StateID=" + StateID + "");

        }
        //Get Provider List
        [System.Web.Services.WebMethod]
        public static string GetProviderList(int CityID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetSubsProviderList?CityID=" + CityID + "");
        }

        [System.Web.Services.WebMethod]
        public static string RegisterSubscriberCheck(string IsQuickPay, Int64 MobileNo, string EmailID, Int64 UserId, Int64 SProviderID, string UIdType, string Password, string UId)
        {
            clsCommon objCommon = new clsCommon();
            string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallAPI("RegisterSubscriber?IsQuickPay=" + IsQuickPay + "&PageNo=1&opID=" + OPID + "&ProviderId=" + SProviderID + "&MobileNo=" + MobileNo + "&EmailID=" + EmailID + "&UserId=" + UserId + "&UIdType=" + UIdType + "&Password=" + Password + "&UId=" + UId + "");
        }
        //Get ProviderData
        [System.Web.Services.WebMethod]
        public static string GetProviderData()
        {
            string[] FindKey = null;
            string operatorID = "";
            string resullt = "";
            string PortalUrl2 = HttpContext.Current.Request.Url.Authority;
            FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
            if (FindKey.Length > 0)
            {
                operatorID = ConfigurationManager.AppSettings[FindKey[0]];
                HttpContext.Current.Session["CableOperatorId"] = operatorID;
            }
            clsCommon objCommon = new clsCommon();

            //return objCommon.CallSMSAPI("GetProviderData?opId=" + operatorID + "");
            try
            {

                resullt = objCommon.CallAPI("GetProviderData?opID=" + operatorID + "");
                JsonValue Obj = JsonObject.Parse(resullt);
                string status = objCommon.JVal("Status", Obj);
                if (status.Replace("\"", "") == "Success")
                {
                    string Description = objCommon.JVal("Description", Obj);
                    HttpContext.Current.Session["ProviderData"] = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                }
            }
            catch (Exception ex)
            {
                resullt = "E|" + ex.Message.ToString();
            }
            return resullt;
        }

        //Get Provider List
        [System.Web.Services.WebMethod]
        public static string SubscriberAuthenticate(string CableOperatorID, string UId, bool ISVc)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("SubscriberAuthenticate?PageNo=1&opID=" + CableOperatorID + "&serialNO=" + UId + "&isVC=" + ISVc + "");
        }
        //Get Provider List
        [System.Web.Services.WebMethod]
        public static string GetMCTUniqueIDDetails(string SubsUniqueID, string CallBy)
        {
            clsCommon objCommon = new clsCommon();
            string OPIDNum = (Convert.ToInt64(SubsUniqueID.Substring(0, 5)) - 10000).ToString();
            HttpContext.Current.Session["OperatorIdNum"] = OPIDNum;
            return objCommon.CallAPI("CheckSubsUniqueID?opID=" + OPIDNum + "&SubsUniqueID=" + SubsUniqueID + "&CallBy=" + CallBy + "");
        }

        [System.Web.Services.WebMethod]
        public static string CustDetailsForPay(string SubsUniqueID, string OPID)
        {
            string resullt = "";

            try
            {
                clsCommon objcommon = new clsCommon();
                objcommon.LogWrite(OPID);
                string OPIDNum = (Convert.ToInt64(SubsUniqueID.Substring(0, 5)) - 10000).ToString();
                HttpContext.Current.Session["OperatorIdNum"] = OPIDNum;
                if (OPID == "GetfromWebConfig")
                    OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
                objcommon.LogWrite(OPID);
                string successUrl = "";
                string Failurl = "";
                successUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/SuccessPageQP";  //--localhost:27402/Success
                Failurl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/CancelPageQP";   //--localhost:27402/Failed
                clsCommon objCommon = new clsCommon();
                resullt = objCommon.CallAPI("PaySelfCareDashboard?opID=" + OPID + "&custId=" + SubsUniqueID + "");

                HttpContext.Current.Session["SuccessUrl"] = successUrl;
                HttpContext.Current.Session["FailUrl"] = Failurl;

                JsonValue Obj = JsonObject.Parse(resullt);
                string status = objCommon.JVal("Status", Obj);
                if (status.Replace("\"", "") == "Success")
                {
                    string Description = objCommon.JVal("Description", Obj);
                    HttpContext.Current.Session["CurrUserDetails"] = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                }
            }
            catch (Exception ex)
            {
                resullt = "E|" + ex.Message.ToString();
            }
            return resullt;

        }

        
        [System.Web.Services.WebMethod]
        public static string GetPaymentGateway(string opId, string CompID)
        {
            string Result = "";
            if (opId == "GetfromWebConfig")
                opId = HttpContext.Current.Session["CableOperatorId"].ToString();
            string cabelOpId = HttpContext.Current.Session["OperatorIdNum"].ToString();
            clsCommon objCommon = new clsCommon();
            var response = objCommon.CallAPI("getPaymentGateWay?opId=" + opId + "&userID=-1&cabelOpId=" + cabelOpId + "&CompID=" + CompID + "");

            JsonValue Obj = JsonObject.Parse(response);
            //old work by shilpa mam       
            //string Version = objCommon.JVal("Description", Obj);
            //Version = Version.Trim(new char[] { (char)39 });
            //DataTable DT = (DataTable)JsonConvert.DeserializeObject(Version, (typeof(DataTable)));
            //end  old work by shilpa mam   

            string status = objCommon.JVal("Status", Obj);
            if (status.Replace("\"", "") == "Success")
            {
                string Description = objCommon.JVal("Description", Obj);
                DataTable DT = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                if (DT != null && DT.Rows.Count > 0)
                {
                    HttpContext.Current.Session["PGType"] = DT;
                    Result = "S|" + JsonConvert.SerializeObject(DT).Replace("null", "\"\"").Replace("'", "\'");
                }
            }
            else
                Result = "E|Payment service is not available. Please contact to your LCO";


            return Result;
        }
        [System.Web.Services.WebMethod]
        public static string GetPayMode(string opId, string PGID)
        {
            string Result = "";
            if (opId == "GetfromWebConfig")
                opId = HttpContext.Current.Session["CableOperatorId"].ToString();
            clsCommon objCommon = new clsCommon();
            var response = objCommon.CallAPI("getPayModes?opId=" + opId + "&userID=-1&PGID=" + PGID + "");

            JsonValue Obj = JsonObject.Parse(response);
            string Version = objCommon.JVal("Description", Obj);
            Version = Version.Trim(new char[] { (char)39 });
            DataTable DT = (DataTable)JsonConvert.DeserializeObject(Version, (typeof(DataTable)));

            if (DT != null && DT.Rows.Count > 0)
            {
                HttpContext.Current.Session["CardType"] = DT;
                Result = "S|" + JsonConvert.SerializeObject(DT).Replace("null", "\"\"").Replace("'", "\'");
            }
            else
                Result = "E|No Record Found.";


            return Result;
        }
        [System.Web.Services.WebMethod]
        //public static string GetPaymentDetails(string OPID, string ProviderID, string PayAmount, string CardType, string SubsTotalNoCurrMonthPymt, string SubsTotalNoOfPayment, string Criteria, string PGtypeID, string CardTypeID)
        public static string GetPaymentDetails(string OPID, string PayAmount, string CardType, string PGID, string CompID)
        {

            string Result = "";
            try
            {
                if (OPID == "GetfromWebConfig")
                    OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
                clsCommon objCommon = new clsCommon();
                //var response = objCommon.CallAPI("SubscriberPaymentDetails?opId=" + OPID + "&userID=-1&Amt=" + PayAmount + "&Type=" + CardType + "&PGID=" + PGID + "");
                var response = objCommon.CallAPI("getPaymentChargesData?opId=" + OPID + "&userID=-1&Amt=" + PayAmount + "&Type=" + CardType + "&PGID=" + PGID + "&CompID=" + CompID + "");
                JsonValue Obj = JsonObject.Parse(response);
                string Version = objCommon.JVal("Description", Obj);
                Version = Version.Trim(new char[] { (char)39 });
                DataTable DT = (DataTable)JsonConvert.DeserializeObject(Version, (typeof(DataTable)));

                if (DT != null && DT.Rows.Count > 0)
                {
                    HttpContext.Current.Session["CurrPaymentDetails"] = DT;// JsonConvert.DeserializeObject<DataTable>(DT.Rows[0]["Message"].ToString());
                    Result = "S|" + JsonConvert.SerializeObject(DT).Replace("null", "\"\"").Replace("'", "\'");
                }
                else
                    Result = "E|No Record Found.";



            }
            catch (Exception ex)
            {
                Result = "E|" + ex.Message.ToString();
            }

            return Result;
        }

        [System.Web.Services.WebMethod]
        public static string GetTransIdForPayment(int PGtypeID, string MobileNo, string EamilID)
        {

            string Msg = "";

            if (PGtypeID == 0 || PGtypeID == null)
                PGtypeID = 6;
            HttpContext.Current.Session["txtPGtypeID"] = PGtypeID;
            HttpContext.Current.Session["MobileNumber"] = MobileNo;
            HttpContext.Current.Session["RegEamilID"] = EamilID;

            try
            {
                DataTable ProviderDT = HttpContext.Current.Session["ProviderData"] as DataTable;

                DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
                //PayTvSelfCareWebSite.PayuService.integrationserviceSoapClient objPGService = new PayTvSelfCareWebSite.PayuService.integrationserviceSoapClient();
                DataTable PaymentDetails = HttpContext.Current.Session["CurrPaymentDetails"] as DataTable;

                string PaymentPart = "";
                //if (Convert.ToBoolean(PaymentDetails.Rows[0]["IsDisPayInc"]) == true)
                //{
                //    if (Convert.ToBoolean(PaymentDetails.Rows[0]["IsDiscountAllowed"]) == true)
                //        PaymentPart = PaymentDetails.Rows[0]["AfterDisPayAmount"].ToString();

                //    else
                //        PaymentPart = PaymentDetails.Rows[0]["SubsPaymentAmount"].ToString();
                //}
                //else
                PaymentPart = PaymentDetails.Rows[0]["PayableAmt"].ToString();




                clsCommon objCommon = new clsCommon();
                var response = objCommon.CallAPI("MaxPGTransID?OPID=" + Convert.ToString(ProviderDT.Rows[0]["OPID"]) + "&CableOperaterID=" + ProviderDT.Rows[0]["Operator ID"] + "&ProviderID=" + Convert.ToString(ProviderDT.Rows[0]["ProviderID"]) + "&CustomerID=" + Convert.ToString(dt.Rows[0]["CustomerID"]) +
                                             "&PGID=" + Convert.ToString(PGtypeID) + "&CustCompID=" + Convert.ToString(dt.Rows[0]["CompID"]) + "&ReptBufferID =" + Convert.ToString(dt.Rows[0]["ReptBufferID"]) +
                                             "&PayAmount=" + PaymentPart + "&SendDetail=" + Convert.ToString(dt.Rows[0]["CustomerFirstName"]) + "|" + Convert.ToString(PaymentDetails.Rows[0]["PayableAmt"]) + "|" + Convert.ToString(PaymentDetails.Rows[0]["CardType"]) + "|" + Convert.ToString(dt.Rows[0]["Add1"]) + "|" + Convert.ToString(dt.Rows[0]["RegContactNumber"]) + "|" + Convert.ToString(dt.Rows[0]["RegEmailID"]) + "|" + Convert.ToString(ProviderDT.Rows[0]["Operator ID"]) + "|MyCableTVPanel" + "&Status=&ConvenienceFees=" + Convert.ToString(PaymentDetails.Rows[0]["ConvenienceFee"]) +
                                             "&IsDisPayInc=false");

                JsonValue Obj = JsonObject.Parse(response);
                string Version = objCommon.JVal("Description", Obj);
                string PGMAXID = "";

                //  DataTable DT = (DataTable)JsonConvert.DeserializeObject(Version, (typeof(DataTable)));
                string Details = (string)JsonConvert.DeserializeObject(Version, (typeof(string)));
                string OrderId = Convert.ToString(Details.Split('~')[1]);
                if (OrderId != null)
                {
                    if (OrderId != "")
                    {
                        PGMAXID = OrderId;
                        //PGMAXID = DT.Rows[0]["PGTransID"].ToString().Split('~')[1] + DT.Rows[0]["PGTransID"].ToString().Split('~')[3] + DT.Rows[0]["PGTransID"].ToString().Split('~')[2];
                        if (PGtypeID == 6)
                        {
                            Msg = AmountPaymentNow(PGMAXID, PGtypeID);
                        }
                        else
                        {
                            Msg = AmountPaymentNow_Others(PGMAXID, PGtypeID); // Call Other Payment Mode work 

                        }
                    }
                    else
                    {
                        Msg = "E|something went worng please try again.";
                    }
                }
                else
                {
                    Msg = "E|something went worng please try again.";
                }


            }
            catch (Exception ex)
            {
                clsCommon objCommon = new clsCommon();
                Msg = "E|" + ex.Message;
                objCommon.LogWrite("ex.Message" + ex.Message);
                objCommon.LogWrite("ex.Message" + ex.StackTrace);
                objCommon.LogWrite("ex.Message" + ex.InnerException);
            }

            return Msg;
        }

        [System.Web.Services.WebMethod]
        public static string AmountPaymentNow(string PGTransID, Int64 PGID)
        {
            string Result = "";
            string MobileNumber = "";
            string EmailAddress = "";
            clsCommon objcommon = new clsCommon();
            try
            {
                string MerchantKey = "", ServerIP = "", SALT = "", PayuSuccessURL = "", PayuFailURL = "";

                string DomainName = HttpContext.Current.Request.Url.Host;

                DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
                DataTable ProviderDT = HttpContext.Current.Session["ProviderData"] as DataTable;

                DataTable PaymentDetails = HttpContext.Current.Session["CurrPaymentDetails"] as DataTable;

                DataTable PGType = HttpContext.Current.Session["PGType"] as DataTable;
                PGType = PGType.AsEnumerable().Where(row => row.Field<Int64>("PGID") == PGID).CopyToDataTable();
                MobileNumber = HttpContext.Current.Session["MobileNumber"] as string;
                EmailAddress = HttpContext.Current.Session["RegEamilID"] as string;


                MerchantKey = PGType.Rows[0]["MerchantKey"].ToString();// ConfigurationManager.AppSettings["MerchantKey"].ToString();
                SALT = PGType.Rows[0]["Salt"].ToString();// ConfigurationManager.AppSettings["SALT"].ToString();

                ServerIP = PGType.Rows[0]["ServerIP"].ToString(); //ConfigurationManager.AppSettings["PayuUrl"].ToString();

                string UserID = MerchantKey;
                string Password = SALT;
                HttpContext.Current.Session["PGID"] = PGID;

                //if (DomainName == "localhost")
                //{
                //    PayuSuccessURL = ConfigurationManager.AppSettings["LocalPayuSuccessUrl"].ToString();
                //    PayuFailURL = ConfigurationManager.AppSettings["LocalPayuFailUrl"].ToString();
                //}
                //else if (DomainName == "192.168.2.100")
                //{
                //    PayuSuccessURL = ConfigurationManager.AppSettings["PublishedSuccessUrl"].ToString();
                //    PayuFailURL = ConfigurationManager.AppSettings["PublishedFailUrl"].ToString();
                //}
                //else
                //{
                //    PayuSuccessURL = ConfigurationManager.AppSettings["PayuSuccessUrl"].ToString();
                //    PayuFailURL = ConfigurationManager.AppSettings["PayuFailUrl"].ToString();
                //}

                PayuSuccessURL = HttpContext.Current.Session["SuccessUrl"] as string;
                PayuFailURL = HttpContext.Current.Session["FailUrl"] as string;


                DataTable dtP = new DataTable("paymentParts");
                dtP.Columns.Add("name", typeof(string));
                dtP.Columns.Add("description", typeof(string));
                dtP.Columns.Add("value", typeof(string));
                dtP.Columns.Add("merchantId", typeof(string));
                dtP.Columns.Add("commission", typeof(string));
                dtP.Columns.Add("IsDiscountAllowed", typeof(string));
                dtP.Columns.Add("SubsPaymentAmount", typeof(string));
                dtP.Columns.Add("DiscountAmount", typeof(string));
                dtP.Columns.Add("IsDisPayInc", typeof(string));
                dtP.Columns.Add("AfterDisPayAmount", typeof(string));
                dtP.Columns.Add("OperatorID", typeof(string));
                dtP.Columns.Add("CustomerID", typeof(string));
                dtP.Columns.Add("MemShipNo", typeof(string));
                dtP.Columns.Add("RegEmailID", typeof(string));
                dtP.Columns.Add("RegMoblileNo", typeof(string));
                dtP.Columns.Add("ProviderName", typeof(string));
                dtP.Columns.Add("CustomerName", typeof(string));
                dtP.Columns.Add("TRANSID", typeof(string));
                dtP.Columns.Add("CableOperaterID", typeof(string));

                string FinalAmount = "", PaymentPart = "";

                //if (Convert.ToBoolean(PaymentDetails.Rows[0]["IsDisPayInc"]) == true)
                //{
                //    if (Convert.ToBoolean(PaymentDetails.Rows[0]["IsDiscountAllowed"]) == true)
                //    {
                //        FinalAmount = PaymentDetails.Rows[0]["AfterDisPayAmount"].ToString();
                //        PaymentPart = PaymentDetails.Rows[0]["PayableAmount"].ToString();
                //    }
                //    else
                //    {
                //        FinalAmount = PaymentDetails.Rows[0]["SubsPaymentAmount"].ToString();
                //        PaymentPart = PaymentDetails.Rows[0]["PayableAmount"].ToString();
                //    }
                //}
                //else
                {
                    FinalAmount = PaymentDetails.Rows[0]["PayableAmt"].ToString();
                    PaymentPart = PaymentDetails.Rows[0]["PaymentAmt"].ToString();
                }

                //if (DomainName == "localhost" || DomainName == "192.168.2.100")
                //    dtP.Rows.Add("PayTv-" + PGTransID + "", "PayTv", PaymentPart, "6639375", PaymentDetails.Rows[0]["ConvenienceFee"].ToString(), PaymentDetails.Rows[0]["IsDiscountAllowed"], PaymentDetails.Rows[0]["SubsPaymentAmount"], PaymentDetails.Rows[0]["DiscountAmount"], PaymentDetails.Rows[0]["IsDisPayInc"], PaymentDetails.Rows[0]["AfterDisPayAmount"], ProviderDT.Rows[0]["OperatorID"].ToString(), ProviderDT.Rows[0]["CustomerID"].ToString(), dt.Rows[0]["MemShipNo"].ToString(), ProviderDT.Rows[0]["RegEmailID"].ToString(), dt.Rows[0]["MobileNo"].ToString(), ProviderDT.Rows[0]["ProviderName"].ToString(), dt.Rows[0]["CustomerName"].ToString(), ProviderDT.Rows[0]["TRANSID"].ToString(), ProviderDT.Rows[0]["CableOperaterID"].ToString());
                //else
                dtP.Rows.Add(PGTransID + "", "PayTv", PaymentPart, PGType.Rows[0]["UniqueMerchantID"].ToString(), PaymentDetails.Rows[0]["ConvenienceFee"].ToString(), "false", PaymentDetails.Rows[0]["PaymentAmt"], "0", "false", "0", ProviderDT.Rows[0]["Operator ID"].ToString(), dt.Rows[0]["CustomerID"].ToString(), dt.Rows[0]["MemShipNo"].ToString(), EmailAddress, MobileNumber, ProviderDT.Rows[0]["ProviderName"].ToString(), dt.Rows[0]["CustomerName"].ToString(), ProviderDT.Rows[0]["OPID"].ToString(), ProviderDT.Rows[0]["Operator ID"].ToString());


                string ProductInfo = "{\"paymentParts\":" + objcommon.GetJson(dtP).ToString() + "}";

                PayuService.integrationserviceSoapClient objPGService = new PayuService.integrationserviceSoapClient();
                //PayTvSelfCareWebSite.PayuService.integrationserviceSoapClient objPGService = new PayTvSelfCareWebSite.PayuService.integrationserviceSoapClient();
                HttpContext.Current.Session["IsReceiptShow"] = "1";

                string FirstNameMemShipNo = dt.Rows[0]["CustomerFirstName"].ToString() + "(SubscriberID-" + dt.Rows[0]["MemShipNo"].ToString() + ")";



                if (Convert.ToDecimal(FinalAmount) == (Convert.ToDecimal(PaymentPart) + Convert.ToDecimal(PaymentDetails.Rows[0]["ConvenienceFee"])) && Convert.ToDecimal(PaymentDetails.Rows[0]["ConvenienceFee"]) > 0)
                {

                    Result = objPGService.PG_RequestUrlWithPayMode(PGID, "PayUMoney", ServerIP, UserID, Password, PayuSuccessURL, PayuFailURL, PayuFailURL,
                                                                   PGTransID, ProductInfo, MobileNumber,
                                                                   EmailAddress, FinalAmount, FirstNameMemShipNo,
                        dt.Rows[0]["CustomerLastName"].ToString().Trim(), dt.Rows[0]["Add1"].ToString(), dt.Rows[0]["Add2"].ToString(), "", "", "",
                       dt.Rows[0]["PinCode"].ToString(), PGTransID, "", "", "INR", "0",
                       DateTime.Now.ToString("dd-MMM-yyyy"), "", "", "", "", "", MerchantKey, PaymentDetails.Rows[0]["CardType"].ToString(), "");


                    HttpContext.Current.Session["CurrPaymentDetails"] = null;

                    if (dt.Rows[0]["SubsType"].ToString() == "0")
                        HttpContext.Current.Session["AddMoneyAmount"] = null;

                    HttpContext.Current.Session["PayUPage"] = Result;

                    Result = "S|Payment Process";

                }
                else
                    Result = "E|Oops,your connection seems slow...";
            }
            catch (Exception e)
            {
                e.Message.ToString();
                Result = "E|Unable to connect server please try again later.";
            }

            return Result;
        }

        [System.Web.Services.WebMethod]
        public static string AmountPaymentNow_Others(string PGTransID, Int64 PGID)
        {
            string Result = "";
            clsCommon objCommon = new clsCommon();
            try
            {
                string MerchantID = "", MerchantKey = "", ServerIP = "", SALT = "", PayuSuccessURL = "", PayuFailURL = "", MobileNumber = "", EmailAddress = "";

                string DomainName = HttpContext.Current.Request.Url.Host;

                DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
                DataTable ProviderDT = HttpContext.Current.Session["ProviderData"] as DataTable;

                DataTable PaymentDetails = HttpContext.Current.Session["CurrPaymentDetails"] as DataTable;

                DataTable PGType = HttpContext.Current.Session["PGType"] as DataTable;
                PGType = PGType.AsEnumerable().Where(row => row.Field<Int64>("PGID") == PGID).CopyToDataTable();

                MobileNumber = HttpContext.Current.Session["MobileNumber"] as string;
                EmailAddress = HttpContext.Current.Session["RegEamilID"] as string;

                HttpContext.Current.Session["PGID"] = PGID;
                MerchantKey = PGType.Rows[0]["MerchantKey"].ToString();
                SALT = PGType.Rows[0]["Salt"].ToString();
                MerchantID = PGType.Rows[0]["UniqueMerchantID"].ToString();

                ServerIP = PGType.Rows[0]["ServerIP"].ToString();

                string UserID = MerchantKey;
                string Password = SALT;


                PayuSuccessURL = HttpContext.Current.Session["SuccessUrl"] as string;
                PayuFailURL = HttpContext.Current.Session["FailUrl"] as string;

                string ccaRequest = "";
                string encRequest = "";
                string Tid = DateTime.Now.ToString("yyyyMMddHHmmssfff"); // HttpContext.Current.Session["CurrUserLogTransID"].ToString();
                DataTable CCAvenueParam = new DataTable("CCAvenueParam");
                CCAvenueParam.Columns.Add("tid", typeof(string));
                CCAvenueParam.Columns.Add("merchant_id", typeof(string));
                CCAvenueParam.Columns.Add("order_id", typeof(string));
                CCAvenueParam.Columns.Add("amount", typeof(decimal));
                CCAvenueParam.Columns.Add("currency", typeof(string));
                CCAvenueParam.Columns.Add("redirect_url", typeof(string));
                CCAvenueParam.Columns.Add("cancel_url", typeof(string));
                CCAvenueParam.Columns.Add("billing_name", typeof(string));
                CCAvenueParam.Columns.Add("billing_address", typeof(string));
                CCAvenueParam.Columns.Add("billing_city", typeof(string));
                CCAvenueParam.Columns.Add("billing_state", typeof(string));
                CCAvenueParam.Columns.Add("billing_zip", typeof(string));
                CCAvenueParam.Columns.Add("billing_country", typeof(string));
                CCAvenueParam.Columns.Add("billing_tel", typeof(string));
                CCAvenueParam.Columns.Add("billing_email", typeof(string));
                CCAvenueParam.Columns.Add("delivery_name", typeof(string));
                CCAvenueParam.Columns.Add("delivery_city", typeof(string));
                CCAvenueParam.Columns.Add("delivery_state", typeof(string));
                CCAvenueParam.Columns.Add("delivery_zip", typeof(string));
                CCAvenueParam.Columns.Add("delivery_country", typeof(string));
                CCAvenueParam.Columns.Add("merchant_param1", typeof(string));
                CCAvenueParam.Columns.Add("merchant_param2", typeof(string));
                CCAvenueParam.Columns.Add("merchant_param3", typeof(string));
                CCAvenueParam.Columns.Add("merchant_param4", typeof(string));
                CCAvenueParam.Columns.Add("merchant_param5", typeof(string));
                CCAvenueParam.Columns.Add("promo_code", typeof(string));
                CCAvenueParam.Columns.Add("delivery_address", typeof(string));
                CCAvenueParam.Columns.Add("customer_identifier", typeof(string));




                CCAvenueParam.Rows.Add(Tid, MerchantID, PGTransID, PaymentDetails.Rows[0]["PGAmount"],
                                       PGType.Rows[0]["Currency"], PayuSuccessURL, PayuFailURL, dt.Rows[0]["CustomerFirstName"].ToString(),
                                       dt.Rows[0]["Add1"].ToString(), dt.Rows[0]["CityName"].ToString(), dt.Rows[0]["StateName"].ToString(),
                                       dt.Rows[0]["PinCode"].ToString(), "", MobileNumber,
                                       EmailAddress, "", "", "", "", "", Convert.ToString(dt.Rows[0]["Company"]), Convert.ToString(ProviderDT.Rows[0]["Operator ID"]),
                                       Convert.ToString(PGType.Rows[0]["sub_acc_id"]), "additional Info.", "additional Info.", "", Convert.ToString(dt.Rows[0]["Add1"]), "");

                if (!string.IsNullOrEmpty(PaymentDetails.Rows[0]["CardType"].ToString()))
                {
                    DataColumn newColumn2 = new DataColumn("card_type", typeof(System.String));
                    newColumn2.DefaultValue = PaymentDetails.Rows[0]["CardType"].ToString();
                    CCAvenueParam.Columns.Add(newColumn2);
                }
                // New Column of Sub_acc_id
                if (!string.IsNullOrEmpty(PGType.Rows[0]["sub_acc_id"].ToString()) && Convert.ToInt64(PGType.Rows[0]["CompID"]) > 0)
                {
                    DataColumn newColumn2 = new DataColumn("sub_account_id", typeof(System.String));
                    newColumn2.DefaultValue = PGType.Rows[0]["sub_acc_id"].ToString();
                    CCAvenueParam.Columns.Add(newColumn2);
                }


                for (int i = 0; i <= CCAvenueParam.Columns.Count - 1; i++)
                {
                    ccaRequest = ccaRequest + CCAvenueParam.Columns[i].ToString() + "=" + CCAvenueParam.Rows[0][i] + "&";
                }
                CCACrypto ccaCrypto = new CCACrypto();
                encRequest = ccaCrypto.Encrypt(ccaRequest, Convert.ToString(MerchantKey));
                Hashtable data = new Hashtable();
                data.Add("encRequest", encRequest);
                data.Add("access_code", Convert.ToString(SALT));
                data.Add("request_type", "JSON");
                data.Add("response_type", "JSON");
                string url = Convert.ToString(ServerIP);
                Result = PreparePOSTFormForCCAVenue(url, data);
                HttpContext.Current.Session["CurrPaymentDetails"] = null;
                HttpContext.Current.Session["PayUPage"] = Result;

                if (Result != "")
                    Result = "S|Payment Process";
                else
                    Result = "E|Oops,your connection seems slow...";

            }
            catch (Exception e)
            {
                e.Message.ToString();
                Result = "E|Unable to connect server please try again later.";
            }

            return Result;
        }

        [System.Web.Services.WebMethod]
        public static string PreparePOSTFormForCCAVenue(string url, Hashtable data)
        {
            string str = "PostForm";

            StringBuilder builder = new StringBuilder();
            builder.Append("<form id=\"" + str + "\" name=\"" + str + "\" action=\"" + url + "\" method=\"POST\">");
            foreach (DictionaryEntry entry in data)
            {
                builder.Append(string.Concat(new object[] { "<input type=\"hidden\" name=\"", entry.Key, "\" value=\"", entry.Value, "\">" }));
            }
            builder.Append("</form>");
            StringBuilder builder2 = new StringBuilder();

            builder2.Append("<script language='javascript'>");
            builder2.Append("var v" + str + " = document." + str + ";");
            builder2.Append("v" + str + ".submit();");
            builder2.Append("</script>");

            return (builder.ToString() + builder2.ToString());
        }

        [System.Web.Services.WebMethod]
        public static string DownloadInvoice(string RecpHtml, bool IsCallByMobileApp, bool IsCallByIOSMobileApp)
        {
            string Msg = "";
            try
            {
                if (RecpHtml != "")
                {
                    string DeCodeHTML = System.Uri.UnescapeDataString(RecpHtml);
                    //string html= "<style type='text/css'> @font-face { font-family: Play-Bold; src: url(!fonts/Play-Bold.ttf!) format(!truetype!); }  #SuccessReceipt { font-size: 14px;  font-family: !Segoe UI!; color: #484848; margin-bottom: 20%; width: 90%; margin: auto; border: 1px solid #bfbcbc; border-radius: 1px; padding: 10px;  } #SuccessReceipt p { margin: 0px; padding: 0px; line-height: 25px; }#SuccessReceipt { padding: 15px; } #SuccessReceipt .mainDiv { padding: 2px !important; }</style>";
                    //RecpHtml = html + RecpHtml;
                    if (IsCallByMobileApp == true || IsCallByIOSMobileApp == true)
                    {
                        Msg = "S|" + DeCodeHTML.Replace("!", "'");
                    }
                    else
                    {
                        HttpContext.Current.Session["DownloadPDF"] = DeCodeHTML.Replace("!", "'");
                        Msg = "S";
                    }

                }

            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                Msg = "E";
            }

            return Msg;

        }


    }
}