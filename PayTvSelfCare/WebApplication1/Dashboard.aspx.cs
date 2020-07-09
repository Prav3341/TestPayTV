using System;
using System.Collections.Generic;




using System.Collections.Specialized;
using System.Configuration;
using System.Data;

using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Xml;
using System.Json;
using System.Collections;
using CCA.Util;

namespace WebApplication1
{
    public partial class Dashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                clsCommon ObjCommon = new clsCommon();
                try
                {

                    ObjCommon.LogWrite("IOS");
                    string[] FindKey = null;
                    string operatorID = "";
                    string PortalUrl2 = HttpContext.Current.Request.Url.Authority;
                    FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
                    if (FindKey.Length > 0)
                    {
                        operatorID = ConfigurationManager.AppSettings[FindKey[0]];
                        HttpContext.Current.Session["OpperatorID"] = operatorID;
                    }
                    if (Request.QueryString["IsMobcaller"] != null)
                    {
                        ObjCommon.LogWrite(Request.QueryString["IsMobcaller"] + "IOS");
                        string IsMobcaller = Request.QueryString["IsMobcaller"].ToString();
                        if (IsMobcaller == "1")
                        {
                            clsCommon obj = new clsCommon();
                            string Userid = string.Empty;
                            string Password = string.Empty;
                            var base64EncodedBytes = System.Convert.FromBase64String(Request.QueryString["UserID"].ToString());
                            Userid = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);

                            base64EncodedBytes = System.Convert.FromBase64String(Request.QueryString["Password"].ToString());
                            Password = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                            obj.LogWrite(Userid);
                            obj.LogWrite(Password);
                            string resullt = string.Empty;
                            clsCommon objCommon = new clsCommon();
                            resullt = objCommon.CallAPI("PaySelfCareLogin?opID=" + operatorID + "&userID=" + Userid + "&password=" + Password + "");

                            JsonValue Obj = JsonObject.Parse(resullt);
                            string status = objCommon.JVal("Status", Obj);
                            if (status.Replace("\"", "") == "Success")
                            {
                                string Description = objCommon.JVal("Description", Obj);
                                HttpContext.Current.Session["CurrLogInDetails"] = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                            }

                            ScriptManager.RegisterStartupScript(this, this.GetType(), "Onpassmobloginpass", "javascript:Onpassmobloginpass('" + resullt + "')", true);

                        }
                    }
                }
                catch (Exception ex)
                {
                    ObjCommon.LogWrite(ex.Message + "|" + ex.StackTrace);
                }
            }


            //string rsp = "[{ TransID: 5447, OPID: 682, ProviderID: 47, ProviderName: 'REL_12_2_R', CustomerID: 111781, CompID: 1, UserID: '7737380642', Password: '±²³', RegMoblileNo: 7737380642, RegEmailID: 'srs.sg@gmail.com', Verifyflag: true, IsActive: false, OTP: 2343, OTPTimeStamp: '2019-01-07T15:50:21.59', OperatorID: 'Rel_12_2_r', MerchantID: 5819677, IsUseClientAdd: true, Add1: 'Address Rsoft', Add2: 'RIICO Cyber Park', Add3: 'Heavy Industrial Area,Near Saras Dairy', PinCode: 342001, CityName: 'Jodhpur', StateName: 'Rajasthan', ClientContactNo: 8779979979, ClientEmailID: 'info@mycabletv.tv', IsProUpdate: true, IsAddConn: true, IsAddRequest: true, IsPayInc: false, Paylimit: 1, IsPaylimit: 1, IsBlocked: false, ProfilePic: 'bacasc.jpg',CableOperaterID:'Rel_12_2_R' }]";
            //string rsp1 = "[{'CustomerID':14169.0,'MemShipNo':'10170','CustomerName':'Basant Giri  ','RequBal':-146.67,'BalanceAmount':-155.00,'NoOfConn':1,'NoOfActiveCon':1,'NoOfDeActivecon':0,'LastPaidAmount':256.95,'LastPaidDate':'2-JAN-19','SubsType':0,'SubsTypeName':'PrePaid','OpenRequestCount':0,'RenewalAmount':250.00,'DueDate':'20-Jan-2019','Add1':'Sann,Wadda,Pth','Add2':'','Add3':'Pithoragarh(U.K.)','PinCode':'262501','PhMob':'','PhRes':'','PhOff':'','PhFax':'','EmailAdd':'','Salute':1,'CustomerFirstName':'Basant Giri','CustomerMiddleName':'','CustomerLastName':'','DOB':'1900-01-01T00:00:00','ConnDate':'14-Sep-2017','CustAcNoMSO':'','Colony':'Wadda','Road':'','SubArea':'','Area':'Wadda','TransNo':34161.0,'JobNo':0.0,'ActivateSms':false,'ColonyID':240.0,'EffectedDt':'04-May-2018','CompID':6.0,'Company':'Kunnu Cable Network','CompAddress':'S/o Ram Singh, Wadda, Pithoragarh','CompEmail':'','CompPhoneNo':'','CompMobNo':'9761352867','FinPeriod':6.0,'myCompCode':'0006','RootCompHeaderImage':'','RootCompLogoImage':'','myRootCompCode':'0001','BlockUser':false,'FirstLogIn':'0','Verifyflag':true,'IsAccVerifyflag':false,'PhoneNo':'','MobileNo':'9761352867','Status':0,'RegContactNumber':'','RegEmailID':'','LastTicketId':0,'LastTicketNo':'','LastTicketHead':'','Remarks':'','ReptBufferID':40285.0,'ProductCode':'RSoftSMS','ImgPath':'','FTPServer':'','FTPUSerID':'','FTPPassword':'','IsTicket':true,'MyCableTVMobileNo':'011126465228','MyCableTVEmailID':'hehe@gmail.com','StbID':'SDA4C8O8117739','SmartCard':'SDA4C8O8117739','MerchantID':'6330851','CityName':'Pithoragarh','StateName':'Uttarakhand','WebUrl':'','SubsTotalNoOfPayment':0,'SubsTotalNoOfCurrMonthPayment':0}]";

            //DataTable currentLogin = (DataTable)JsonConvert.DeserializeObject(rsp, (typeof(DataTable)));
            //DataTable currentuser = (DataTable)JsonConvert.DeserializeObject(rsp1, (typeof(DataTable)));
            //HttpContext.Current.Session["CurrLogInDetails"]=currentLogin ;
            //HttpContext.Current.Session["CurrUserDetails"]= currentuser;
        }
        [WebMethod]
        public static string GetDashboardDetail(string OPID, string SubsUniqueID)
        {

            string resullt = "";
            try
            {
                clsCommon objCommon = new clsCommon();
                //string a = HttpContext.Current.Request.Url.AbsoluteUri;  //--http://localhost:27402/Dashboard.aspx/GetDashboardDetail
                //string b = HttpContext.Current.Request.Url.AbsolutePath; //--Dashboard.aspx/GetDashboardDetail
                string dashboardUrl = HttpContext.Current.Request.Url.Authority;    //--localhost:27402
                string successUrl = "";
                string Failurl = "";
                successUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/Success";  //--localhost:27402/Success
                Failurl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/Failed";   //--localhost:27402/Failed
                //successUrl = HttpContext.Current.Request.Url.Authority + "/Success";  //--localhost:27402/Success
                //Failurl = HttpContext.Current.Request.Url.Authority + "/Failed";   //--localhost:27402/Failed

                //successUrl = HttpContext.Current.Request.Url.Authority + "/SubscriptionSuccess";  //--localhost:27402/Success
                //Failurl = HttpContext.Current.Request.Url.Authority + "/SubscriptionFailed";   //--localhost:27402/Failed
                HttpContext.Current.Session["SuccessUrl"] = successUrl;
                HttpContext.Current.Session["FailUrl"] = Failurl;

                resullt = objCommon.CallAPI("PaySelfCareDashboard?opID=" + OPID + "&custId=" + SubsUniqueID + "");
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
        [WebMethod]
        public static string GetPaymentGateway(string opId, string cabelOpId,string CompID)
        {
            string Result = "";
            clsCommon objCommon = new clsCommon();
            var response = objCommon.CallAPI("getPaymentGateWay?opId=" + opId + "&userID=-1&cabelOpId=" + cabelOpId + "&CompID="+CompID+"");

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
                 DataTable DT= (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
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
        [WebMethod]
        public static string GetPayMode(string opId, string PGID)
        {
            string Result = "";
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
        [WebMethod]
        //public static string GetPaymentDetails(string OPID, string ProviderID, string PayAmount, string CardType, string SubsTotalNoCurrMonthPymt, string SubsTotalNoOfPayment, string Criteria, string PGtypeID, string CardTypeID)
        public static string GetPaymentDetails(string OPID, string PayAmount, string CardType, string PGID, string CompID)
        {
           
            string Result = "";
            try
            {
                clsCommon objCommon = new clsCommon();
                //var response = objCommon.CallAPI("SubscriberPaymentDetails?opId=" + OPID + "&userID=-1&Amt=" + PayAmount + "&Type=" + CardType + "&PGID=" + PGID + "");
                var response = objCommon.CallAPI("getPaymentChargesData?opId=" + OPID + "&userID=-1&Amt=" + PayAmount + "&Type=" + CardType + "&PGID=" + PGID + "&CompID="+CompID+"");
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

        [WebMethod]
        public static string GetTransIdForPayment(int PGtypeID)
        {

            string Msg = "";
         
            if (PGtypeID == 0 || PGtypeID == null)
                PGtypeID = 6;
            HttpContext.Current.Session["txtPGtypeID"] = PGtypeID;
            try
            {
                DataTable LogInDT = HttpContext.Current.Session["CurrLogInDetails"] as DataTable;
                DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
                PayuService.integrationserviceSoapClient objPGService = new PayuService.integrationserviceSoapClient();
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
                var response = objCommon.CallAPI("MaxPGTransID?OPID=" + LogInDT.Rows[0]["OPID"].ToString() + "&CableOperaterID=" + LogInDT.Rows[0]["CableOperaterID"] + "&ProviderID=" + LogInDT.Rows[0]["ProviderID"].ToString() + "&CustomerID=" + dt.Rows[0]["CustomerID"].ToString() +
                                             "&PGID=" + Convert.ToString(PGtypeID) + "&CustCompID=" + dt.Rows[0]["CompID"].ToString() + "&ReptBufferID =" + dt.Rows[0]["ReptBufferID"].ToString() +
                                             "&PayAmount=" + PaymentPart + "&SendDetail=" + dt.Rows[0]["CustomerFirstName"].ToString() + "|" + PaymentDetails.Rows[0]["PayableAmt"].ToString() + "|" + PaymentDetails.Rows[0]["CardType"].ToString() + "|" + dt.Rows[0]["Add1"].ToString() + "|" + dt.Rows[0]["RegContactNumber"].ToString() + "|" + LogInDT.Rows[0]["RegEmailID"].ToString() + "|" + LogInDT.Rows[0]["OperatorID"].ToString() + "|MyCableTVPanel" + "&Status=&ConvenienceFees=" + PaymentDetails.Rows[0]["ConvenienceFee"].ToString() +
                                             "&IsDisPayInc=false");

                JsonValue Obj = JsonObject.Parse(response);
                string Version = objCommon.JVal("Description", Obj);
                string PGMAXID = "";

              //  DataTable DT = (DataTable)JsonConvert.DeserializeObject(Version, (typeof(DataTable)));
                string Details = (string)JsonConvert.DeserializeObject(Version, (typeof(string)));
                string OrderId = Convert.ToString(Details.Split('~')[1]);
                if (OrderId != null )
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
        public static string AmountPaymentNow(string PGTransID, Int64 PGID)
        {
            string Result = "";
            clsCommon objcommon = new clsCommon();
            try
            {
                string MerchantKey = "", ServerIP = "", SALT = "", PayuSuccessURL = "", PayuFailURL = "";

                string DomainName = HttpContext.Current.Request.Url.Host;

                DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
                DataTable LogInDT = HttpContext.Current.Session["CurrLogInDetails"] as DataTable;

                DataTable PaymentDetails = HttpContext.Current.Session["CurrPaymentDetails"] as DataTable;

                DataTable PGType = HttpContext.Current.Session["PGType"] as DataTable;
                PGType = PGType.AsEnumerable().Where(row => row.Field<Int64>("PGID") == PGID).CopyToDataTable();

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
                //    dtP.Rows.Add("PayTv-" + PGTransID + "", "PayTv", PaymentPart, "6639375", PaymentDetails.Rows[0]["ConvenienceFee"].ToString(), PaymentDetails.Rows[0]["IsDiscountAllowed"], PaymentDetails.Rows[0]["SubsPaymentAmount"], PaymentDetails.Rows[0]["DiscountAmount"], PaymentDetails.Rows[0]["IsDisPayInc"], PaymentDetails.Rows[0]["AfterDisPayAmount"], LogInDT.Rows[0]["OperatorID"].ToString(), LogInDT.Rows[0]["CustomerID"].ToString(), dt.Rows[0]["MemShipNo"].ToString(), LogInDT.Rows[0]["RegEmailID"].ToString(), dt.Rows[0]["MobileNo"].ToString(), LogInDT.Rows[0]["ProviderName"].ToString(), dt.Rows[0]["CustomerName"].ToString(), LogInDT.Rows[0]["TRANSID"].ToString(), LogInDT.Rows[0]["CableOperaterID"].ToString());
                //else
                dtP.Rows.Add( PGTransID + "", "PayTv", PaymentPart, PGType.Rows[0]["UniqueMerchantID"].ToString(), PaymentDetails.Rows[0]["ConvenienceFee"].ToString(), "false", PaymentDetails.Rows[0]["PaymentAmt"], "0", "false", "0", LogInDT.Rows[0]["OperatorID"].ToString(), dt.Rows[0]["CustomerID"].ToString(), dt.Rows[0]["MemShipNo"].ToString(), LogInDT.Rows[0]["RegEmailID"].ToString(), dt.Rows[0]["MobileNo"].ToString(), LogInDT.Rows[0]["ProviderName"].ToString(), dt.Rows[0]["CustomerName"].ToString(), LogInDT.Rows[0]["TRANSID"].ToString(), LogInDT.Rows[0]["CableOperaterID"].ToString());


                string ProductInfo = "{\"paymentParts\":" + objcommon.GetJson(dtP).ToString() + "}";


                PayuService.integrationserviceSoapClient objPGService = new PayuService.integrationserviceSoapClient();
                HttpContext.Current.Session["IsReceiptShow"] = "1";

                string FirstNameMemShipNo = dt.Rows[0]["CustomerFirstName"].ToString() + "(SubscriberID-" + dt.Rows[0]["MemShipNo"].ToString() + ")";



                if (Convert.ToDecimal(FinalAmount) == (Convert.ToDecimal(PaymentPart) + Convert.ToDecimal(PaymentDetails.Rows[0]["ConvenienceFee"])) && Convert.ToDecimal(PaymentDetails.Rows[0]["ConvenienceFee"]) > 0)
                {

                    Result = objPGService.PG_RequestUrlWithPayMode(PGID, "PayUMoney", ServerIP, UserID, Password, PayuSuccessURL, PayuFailURL, PayuFailURL,
                                                                   PGTransID, ProductInfo, dt.Rows[0]["MyCableTVMobileNo"].ToString(),
                                                                   LogInDT.Rows[0]["RegEmailID"].ToString(), FinalAmount, FirstNameMemShipNo,
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

        public static string AmountPaymentNow_Others(string PGTransID, Int64 PGID)
        {
            string Result = "";
            clsCommon objCommon = new clsCommon();
            try
            {
                string MerchantID = "", MerchantKey = "", ServerIP = "", SALT = "", PayuSuccessURL = "", PayuFailURL = "";

                string DomainName = HttpContext.Current.Request.Url.Host;

                DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
                DataTable LogInDT = HttpContext.Current.Session["CurrLogInDetails"] as DataTable;

                DataTable PaymentDetails = HttpContext.Current.Session["CurrPaymentDetails"] as DataTable;

                DataTable PGType = HttpContext.Current.Session["PGType"] as DataTable;
                PGType = PGType.AsEnumerable().Where(row => row.Field<Int64>("PGID") == PGID).CopyToDataTable();

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
                

               

                CCAvenueParam.Rows.Add(Tid, MerchantID, PGTransID, PaymentDetails.Rows[0]["PaymentAmt"],
                                       PGType.Rows[0]["Currency"], PayuSuccessURL, PayuFailURL, dt.Rows[0]["CustomerFirstName"].ToString(),
                                       dt.Rows[0]["Add1"].ToString(), dt.Rows[0]["CityName"].ToString(), dt.Rows[0]["StateName"].ToString(),
                                       dt.Rows[0]["PinCode"].ToString(), "", dt.Rows[0]["MyCableTVMobileNo"].ToString(),
                                       Convert.ToString(LogInDT.Rows[0]["RegEmailID"]), "", "", "", "", "", Convert.ToString(dt.Rows[0]["Company"]),Convert.ToString(LogInDT.Rows[0]["OperatorID"]),
                                       Convert.ToString(PGType.Rows[0]["sub_acc_id"]), "additional Info.", "additional Info.", "", Convert.ToString(dt.Rows[0]["Add1"]), "");

                if (!string.IsNullOrEmpty(PaymentDetails.Rows[0]["CardType"].ToString()))
                {
                    DataColumn newColumn2 = new DataColumn("card_type", typeof(System.String));
                    newColumn2.DefaultValue = PaymentDetails.Rows[0]["CardType"].ToString();
                    CCAvenueParam.Columns.Add(newColumn2);
                }
                // New Column of Sub_acc_id
                if (!string.IsNullOrEmpty(PGType.Rows[0]["sub_acc_id"].ToString()))
                {
                    DataColumn newColumn3 = new DataColumn("sub_account_id", typeof(System.String));
                    newColumn3.DefaultValue = PGType.Rows[0]["sub_acc_id"].ToString();
                    CCAvenueParam.Columns.Add(newColumn3);
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

        [WebMethod]
        public static string LogOut()
        {
            string res = "";
            try
            {
                HttpContext.Current.Session["CurrUserDetails"] = null;
                HttpContext.Current.Session["CurrLogInDetails"] = null;
            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }

            return res;
        }
        [WebMethod]
        public static string GetExpiryProducts(string OPID, string CustId, string ExpiryDateValue)
        {

            string resullt = "";
            try
            {
                clsCommon objCommon = new clsCommon();


                resullt = objCommon.CallAPI("getExpiringProductCount?opID=" + OPID + "&CustomerId=" + CustId + "&ExpiringUpto=" + ExpiryDateValue + "");
                JsonValue Obj = JsonObject.Parse(resullt);
                string status = objCommon.JVal("Status", Obj);
                if (status.Replace("\"", "") == "Success")
                {
                    string Description = objCommon.JVal("Description", Obj);
                    HttpContext.Current.Session["ExpiringProductDetails"] = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                }
            }
            catch (Exception ex)
            {
                resullt = "E|" + ex.Message.ToString();
            }
            return resullt;

        }
    }
}
