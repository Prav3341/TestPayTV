using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Json;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string[] FindKey = null;
            string operatorID = "";
            string PortalUrl2 = HttpContext.Current.Request.Url.Authority;

            FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
            if (FindKey.Length > 0)
            {
                operatorID = ConfigurationManager.AppSettings[FindKey[0]];
                HttpContext.Current.Session["CableOperatorId"] = operatorID;
            }

        }
        //Get ProviderData
        [System.Web.Services.WebMethod]
        public static string GetProviderData()
        {
            string[] FindKey = null;
            string operatorID = "";
            string PortalUrl2 = HttpContext.Current.Request.Url.Authority;
            FindKey = ConfigurationManager.AppSettings.AllKeys.Where(key => key.Contains(PortalUrl2)).ToArray();
            if (FindKey.Length > 0)
            {
                operatorID = ConfigurationManager.AppSettings[FindKey[0]];
                HttpContext.Current.Session["CableOperatorId"] = operatorID;
            }
            clsCommon objCommon = new clsCommon();

            return objCommon.CallSMSAPI("GetProviderData?opId=" + operatorID + "");

        }
        //Get State
        [System.Web.Services.WebMethod]
        public static string Statelist()
        {

            clsCommon objCommon = new clsCommon();
           // string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallSMSAPI("GetProviderStateList");

        }

        //Get Citylist
        [System.Web.Services.WebMethod]
        public static string GetCityList(int StateId)
        {
            clsCommon objCommon = new clsCommon();
            //string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallSMSAPI("GetProviderCityList?StateID=" + StateId + "");

        }


        //Get Provider List
        [System.Web.Services.WebMethod]
        public static string GetProviderList(int CityID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallSMSAPI("GetSubsProviderList?CityID=" + CityID + "");
        }

        //Get Provider List
        [System.Web.Services.WebMethod]
        public static string SubscriberAuthenticate(string CableOperatorID, string UId, bool ISVc)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("SubscriberAuthenticate?PageNo=1&opID=" + CableOperatorID + "&serialNO=" + UId + "&isVC=" + ISVc + "");
        }
        //Check Register Or Not
        [System.Web.Services.WebMethod]
        public static string UserRegisterCheck(Int64 MobileNo, string EmailID, Int64 UserId, Int64 ProviderId)
        {
            clsCommon objCommon = new clsCommon();
            string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallAPI("CheckSubscriberRegisterRCNCP?PageNo=1&opID=" + OPID + "&ProviderId=" + ProviderId + "&MobileNo=" + MobileNo + "&EmailID=" + EmailID + "&UserId=" + UserId + "");
        }

        //Ragister
        [System.Web.Services.WebMethod]
        public static string RegisterNow(Int64 MobileNo, string EmailID, Int64 UserId, Int64 SProviderID, string UIdType, string Password, string UId)
        {
            clsCommon objCommon = new clsCommon();
            string OPID = HttpContext.Current.Session["CableOperatorId"].ToString();
            return objCommon.CallAPI("RegisterSubscriber?PageNo=1&opID=" + OPID + "&ProviderId=" + SProviderID + "&MobileNo=" + MobileNo + "&EmailID=" + EmailID + "&UserId=" + UserId + "&UIdType=" + UIdType + "&Password=" + Password + "&UId=" + UId + "");
        }
        //VeryfiOTP
        [System.Web.Services.WebMethod]
        public static string VerfiyRegisterOTP(string OTP, string UserId)
        {
            clsCommon objCommon = new clsCommon();
            string value = "false";
            if (objCommon.IsNumeric(UserId) == true)
            {
                value = "true";
            }
            return objCommon.CallAPI("VerifyOTP?PortalId=2&UserId=" + UserId + "&OTP=" + OTP + "&IsNumeric=" + value + "");
        }

        //VeryfiOTP
        [System.Web.Services.WebMethod]
        public static string ResendOTP(string UserId)
        {
            clsCommon objCommon = new clsCommon();
            string value = "false";
            if (objCommon.IsNumeric(UserId) == true)
            {
                value = "true";
            }
            return objCommon.CallSMSAPI("GenerateOTP?UserId=" + UserId + "&IsNumeric=" + value + "");

        }
        //SusUniqueID
        [System.Web.Services.WebMethod]
        public static string GetMCTUniqueIDDetails(string SubsUniqueID)
        {
            string res = "";
            bool IsError = false;
            string resChkMCTUID = "", returnMsg = "", result="";
            clsCommon objCommon = new clsCommon();


            try
            {
                bool allDigits = SubsUniqueID.All(char.IsDigit);
                if (allDigits == true)
                {
                    string OPID = (Convert.ToInt64(SubsUniqueID.Substring(0, 5)) - 10000).ToString();
                    if (Convert.ToInt64(OPID) != 0 && Convert.ToInt64(SubsUniqueID) != 0 && Convert.ToInt64(OPID) > 0 && Convert.ToInt64(SubsUniqueID) > 0)
                    {
                        string CheckSub = objCommon.CallAPI("CheckSubsUniqueID?opID=" + OPID + "&SubsUniqueID=" + SubsUniqueID + "");
                        JsonValue Obj = JsonObject.Parse(CheckSub);
                        string status = objCommon.JVal("Status", Obj);
                        if (status.Replace("\"", "") == "Success")
                        {
                            string CityID = objCommon.JValReplace("Description", Obj);
                            string response = objCommon.CallSMSAPI("GetSubsProviderList?CityID=" + CityID + "");
                            JsonValue data = JsonObject.Parse(response);
                            if (objCommon.JVal("Status", data).Replace("\"", "") == "Success")
                            {
                                string Description = objCommon.JVal("Description", data);
                                JsonValue Table = JsonObject.Parse(Description);


                                if (objCommon.JVal("Table", Table).ToString() != null && objCommon.JVal("Table", Table).ToString() != "")
                                {
                                    res = "S|" +  Table.ToString() + "|" + OPID + "|" + SubsUniqueID;
                                }
                                else
                                {
                                    IsError = true;
                                    res = "E|" + objCommon.JVal("Description", data).Replace("\"", "").ToString();
                                }
                            }
                            else
                            {
                                IsError = true;
                                res = "E|" + objCommon.JVal("Description", data).Replace("\"", "").ToString();
                            }

                            string CabOPID = HttpContext.Current.Session["CableOperatorId"].ToString();
                            string SubsDetail = objCommon.CallAPI("SubsDetailWithBox?opID=" + CabOPID + "&serialNO=" + SubsUniqueID + "&searchBy=0&pageSize=-1");
                            JsonValue SubsDetailData = JsonObject.Parse(SubsDetail);
                            if (objCommon.JVal("Status", SubsDetailData).Replace("\"", "") == "Success")
                            {
                                
                                 result = objCommon.JVal("Description", SubsDetailData).ToString();
                            }
                            else
                            {
                               IsError = true;
                               result = "E|No Record Found.";
                                
                            }


                        }
                        else
                            res = "E|"+ objCommon.JValReplace("Description", Obj).Replace("\"", "").ToString();
                    }
                    else
                        res = "E|Invalid PayTv Unique id.";

                }
                else
                    res = "E|Invalid PayTv Unique id.";
            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                res = "E|Something went wrong please try agian later. ";
            }


            if (IsError == true)
                returnMsg = "E|PayTv Unique id not exists.";
            else
                returnMsg = res + "|" + result;

            return returnMsg;
        }


    }
}