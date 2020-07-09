using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
//using System.Web.Services;
using System.Web.UI;
//using System.Web.UI.WebControls;
using System.Net;
using System.Collections.Specialized;
using System.Text;
using System.Configuration;
using System.IO;
using System.IO.Compression;
using Newtonsoft.Json;
using System.Web.Services;
using System.Json;
using System.Security.Cryptography;


namespace WebApplication1
{
    public partial class MyProfile : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetMyProfileData(long SubsId, string OPID)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("SubsDetailWithBox?&opID=" + OPID + "&serialNO=" + SubsId + "&searchBy=0&pageSize=-1");
            //CityList?PageSize=-1&StateID=" + StateId + ""

            return result;
        }

      

        [WebMethod]
        public static string UpadteMyProfileDetails(string OPID,Int64 CustomerID ,string FirstName, string MiddleName, string LastName, string Add1, string Add2, string Add3, string RegisteredMobileNo, string EmailID, string IsContactInfoUpdate)
        {

            string Result = "";

            try
            {
                clsCommon objCommon = new clsCommon();
                //var response = objCommon.CallAPI("SubscriberPaymentDetails?OPID=" + OPID + "&ProviderID=" + ProviderID + "&PayAmount=" + PayAmount + "&CardType=" + CardType + "&SubsTotalNoCurrMonthPymt=" + SubsTotalNoCurrMonthPymt + "&SubsTotalNoOfPayment=" + SubsTotalNoOfPayment + "&Criteria ='" + Criteria + "'&PGtypeID=" + PGtypeID + "&CardTypeID=" + CardTypeID + "");
                var response = objCommon.CallAPI("UpdateSubscriberDetails?opID=" + OPID + "&CustomerID=" + CustomerID + "&FirstName=" + FirstName + "&MiddleName=" + MiddleName + "&LastName=" + LastName + "&Add1=" + Add1 + "&Add2=" + Add2 + "&Add3=" + Add3 + "&RegisteredMobileNo=" + RegisteredMobileNo + "&EmailID=" + EmailID + "&IsContactInfoUpdate=" + IsContactInfoUpdate + "");
                // "/UpdateSubscriberDetails?opID={opID}&CustomerID={CustomerID}&userID={userID}&FirstName={FirstName}&MiddleName={MiddleName}&LastName={LastName}&Add1={Add1}&Add2={Add2}&Add3={Add3}&RegisteredMobileNo={RegisteredMobileNo}&EmailID={EmailID}&IsContactInfoUpdate={IsContactInfoUpdate}
                JsonValue Obj = JsonObject.Parse(response);
                string Version = objCommon.JValReplace("Description", Obj);
                string Status = objCommon.JValReplace("Status", Obj);

                if (Version != null && Version != "")
                {

                    if (Status == "Success")
                    {
                        //Result = "S|" + JsonConvert.SerializeObject(Version).Replace("null", "\"\"").Replace("'", "\'");
                        Result = "S|" + Version;
                    }
                    else
                    {
                        //Result = "E|" + JsonConvert.SerializeObject(Version).Replace("null", "\"\"").Replace("'", "\'");
                        Result = "E|" + Version;
                    }
                 
                }
                else
                    Result = "E|No Record Found.";
            }

            catch(Exception e)
            {
                Result = "E|"+e.Message;
            }


            return Result;
           // return MyProfileData + "|" + LogInDT.Rows[0]["OperatorID"].ToString() + "|" + LogInDT.Rows[0]["CustomerID"].ToString() + "|" + errorType;
        }


        [WebMethod]
        public static string UpadteProfilePic(string pic)
        {
            string Result = "";
            string ReturnPic = "";
            DataTable LogInDT = HttpContext.Current.Session["CurrLogInDetails"] as DataTable;
             var TransID= LogInDT.Rows[0]["TransID"].ToString();
           // var TransID = 5454;
            try
            {

                clsCommon objCommon = new clsCommon();
                //var response = objCommon.CallSMSAPI(?);
                var values = new NameValueCollection();
                values["ProfilePic"] = pic;
                values["TransID"] = TransID;
                values["PortalType"] = "2";
                string Data = "{\"ProfilePic\":\"" + pic + "\",\"TransID\":\"" + TransID + "\",\"PortalType\":\"2\"}";
                //string Data = "ProfilePic='" + pic + "'&TransID='" + TransID + "'&PortalType=2";
                //var response = objCommon.CallPostAPINew(values, "PayTvSelfCareProfilePicUpdate");
                var response = objCommon.CallPostAPI(Data,"PaySelfCareProfilePicUpdate");
                JsonValue Obj = JsonObject.Parse(response);
                string Description = objCommon.JValReplace("Description", Obj);
                string Status = objCommon.JValReplace("Status", Obj);



                // DataTable DT = JsonConvert.DeserializeObject<DataTable>(Encoding.Default.GetString(response));

                if (Description != null && Description != "")
                {
                    if (Status == "Success")
                    {
                        Result = "S|" + JsonConvert.SerializeObject(Description).Replace("null", "\"\"").Replace("'", "\'");
                    }
                    else
                    {
                        Result = "E|" + JsonConvert.SerializeObject(Description).Replace("null", "\"\"").Replace("'", "\'");
                    }
                }
                else
                    Result = "E|No Record Found.";
                //HttpContext.Current.Session["CurrLogInDetails"] = (DataTable)JsonConvert.DeserializeObject(Description, (typeof(DataTable)));
                string opID = LogInDT.Rows[0]["CableOperaterID"].ToString();
                string UserID = LogInDT.Rows[0]["UserID"].ToString();
                string Password = objCommon.simpleCrypt(LogInDT.Rows[0]["Password"].ToString(), "D");

                //decrypt data
                

                string LoginTable = objCommon.CallAPI("PaySelfCareLogin?opID=" + opID + "&userID=" + UserID + "&password=" + Password + "");
             

                JsonValue Obj2 = JsonObject.Parse(LoginTable);
                string Description2 = objCommon.JVal("Description", Obj2);
                string status2 = objCommon.JVal("Status", Obj2);

                
                if (Description2 != null && Description2 != "")
                {
                    if (status2.Replace("\"", "") == "Success")
                    {
                        DataTable dt = (DataTable)JsonConvert.DeserializeObject(Description2, (typeof(DataTable)));
                        ReturnPic = dt.Rows[0]["ProfilePic"].ToString();
                      
                    }
                }
                else
                    ReturnPic = "";

            }

            catch (Exception ex)
            {

                string msg = ex.Message;
            }

            return Result + "|" + ReturnPic;
        }

        [WebMethod]
        public static string GetDocumentListData(string OPID,string Criteria,string CabOPID,string CompID )
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("getDocumentList?&OPID=" + OPID + "&Criteria=" + Criteria + "&CabOPID=" + CabOPID + "&CompID=" + CompID);
            
            return result;
        }
        [WebMethod]
        public static string GetDocumentHeadCategory(string OPID, string Criteria)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("getDocumentHeadCategory?&OPID=" + OPID + "&Criteria=" + Criteria );

            return result;
        }
        [WebMethod]
        public static string DocumentsStoreSave(string CabOPID, string OpID, string DocumentHeadID, string DocumentReference, string DocumentDesc, string DocumentDate, string CustID, string CompID, string base64document, string fileName)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            string Data = "{\"CabOPID\":\"" + CabOPID + "\",\"OpID\":\"" + OpID + "\",\"DocumentHeadID\":\"" + DocumentHeadID + "\",\"DocumentReference\":\"" + DocumentReference + "\",\"DocumentDesc\":\"" + DocumentDesc + "\",\"DocumentDate\":\"" + DocumentDate + "\",\"CustID\":\"" + CustID + "\",\"CompID\":\"" + CompID + "\",\"base64document\":\"" + base64document + "\",\"fileName\":\"" + fileName + "\"}";
            result = objCommon.CallPostAPI(Data, "DocumentsStoreSave");
            return result;
        }
        [WebMethod]
        public static string DocumentsStoreDelete(string OPID, string Id)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("DocumentsStoreDelete?&OPID=" + OPID + "&Id=" + Id);

            return result;
        }
    }
}