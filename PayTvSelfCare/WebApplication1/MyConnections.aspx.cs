using System;
using System.Collections.Generic;
using System.Json;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Data;
namespace WebApplication1
{
    public partial class MyConnections : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetSubsAllConnection(long SubsId, string OPID)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("SubsDetailWithBox?opID=" + OPID + "&serialNO=" + SubsId + "&searchBy=0&pageSize=-1");
            //CityList?PageSize=-1&StateID=" + StateId + ""

            return result;
        }

        [WebMethod]
        public static string GetMainAddonChannelList(int Criteria, string OPID)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("PackageComposition?pageSize=-1&PackageID=" + Criteria + "&opID=" + OPID + "");
            //CityList?PageSize=-1&StateID=" + StateId + ""
            return result;
        }

        //Get Pakegess
        [System.Web.Services.WebMethod]
        public static string GetMainBouquet(string OPID, string SearchBy, string SmartCard, string listtype, string IsPrepaid)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallAPI("SubscriptionProducts?PageSize=-1&opID=" + OPID + "&SearchBy=" + SearchBy + "&SmartCard=" + SmartCard + "&ListType=" + listtype + "&IsPrepaid=" + IsPrepaid + "&IsRenew=0");
            return result;
        }

        //Get Pakeges
        [System.Web.Services.WebMethod]
       //public static string ManageAuthDeAuth(string SmartCard, string SubsModifyTimeStamp, string AuthBouquets, string AuthAlaCartes, string DeAuthBouquets, string DeAuthAlaCartes, string OPID, string IsPrePaid, string OrderSummary1="", string OrderSummary2="")
        public static string ManageAuthDeAuth(string SmartCard, string SubsModifyTimeStamp, string Authxml, string DeAuthxml, string OPID, string IsPrePaid, string CustID="", string OrderSummary1 = "", string OrderSummary2 = "")
         {            
            if (OrderSummary1 != "" && OrderSummary2 != "")
            {
                DataTable OrderSummaryTable1 = (DataTable)JsonConvert.DeserializeObject(OrderSummary1, (typeof(DataTable)));
                DataTable OrderSummaryTable2 = (DataTable)JsonConvert.DeserializeObject(OrderSummary2, (typeof(DataTable)));
                DataSet ds = new DataSet();
                ds.Tables.Add(OrderSummaryTable1);
                ds.Tables.Add(OrderSummaryTable2);
                HttpContext.Current.Session["OrderSummary"] = ds;
            }                      
            string result = "";
            clsCommon objCommon = new clsCommon();
            string AuthData = JsonConvert.SerializeObject(Authxml);
            string DeAuthData = JsonConvert.SerializeObject(DeAuthxml);


            string Data = "{\"IsDay\":\"False\",\"SmartCard\":\"" + SmartCard + "\",\"SubsModifyTimeStamp\":\"" + SubsModifyTimeStamp + "\",\"AuthProduct\":" + AuthData + ",\"DeAuthProduct\":" + DeAuthData + ",\"IsPrePaid\":\"" + IsPrePaid + "\",\"opID\":\"" + OPID + "\",\"PGTransID\":\"0\",\"CustID\":\"" + CustID + "\"}";
           
            result = objCommon.CallPostAPI(Data, "SubscriberAuthDeAuthCard");
          //  result = objCommon.CallSMSAPI("SubscriberAuthDeAuthCard?PageSize=-1&SmartCard=" + SmartCard + "&SubsModifyTimeStamp=" + SubsModifyTimeStamp + "&AuthProduct=" + Authxml + "&DeAuthProduct=" + DeAuthxml + "&IsPrePaid=" + IsPrePaid + "&opID=" + OPID + "&PGTransID=" + 0 + "");
        
            return result;
        }

        //Manage Packages 
        [System.Web.Services.WebMethod]
        public static string PostpaidGenerateCRF(string SmartCard, string AuthBouquets, string AuthAlaCartes, string DeAuthBouquets, string DeAuthAlaCartes, string OPID)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            result = objCommon.CallSMSAPI("ManagePostpaidConnectionByCRF?OPID=" + OPID + "&SmartCard=" + SmartCard + "&NewChannelIDs=" + AuthAlaCartes + "&RemoveChannelIDs=" + DeAuthAlaCartes + "&RemoveBouquetIDs=" + DeAuthBouquets + "&NewBouquetIDs=" + AuthBouquets + "");
            return result;
        }
        // Get NCF Amount
        [System.Web.Services.WebMethod]
        public static string GetNCFAmount(string OPID, string NCF)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            string NCFData = JsonConvert.SerializeObject(NCF);
            string Data = "{\"opID\":\"" + OPID + "\",\"NCF\":" + NCFData + "}";
             result = objCommon.CallPostAPI(Data, "NCFForPayTVSelfCare");
          //  result = objCommon.CallSMSAPI("NCFForPayTVSelfCare?opID=" + OPID + "&NCF=\"" + NCF + "\"");
            return result;
        }
        //Get Pakeges
        [System.Web.Services.WebMethod]
        public static string GetNewConnectionDetails(string OPID, string BouquetID, string ChannelID, bool IsOnload)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            try
            {
                result = objCommon.CallSMSAPI("ValidateSubscribeProducts?opID=" + OPID + "&BouquetID=" + BouquetID + "&ChannelID=" + ChannelID + "");
                JsonValue Obj = JsonObject.Parse(result);
                string status = objCommon.JVal("Status", Obj);

                if (status.Replace("\"", "") == "Success")
                {
                    string Description = objCommon.JVal("Description", Obj);
                    JsonValue Obj1 = JsonObject.Parse(Description);
                    string ErrorDetail = objCommon.JVal("ErrorDetail", Obj1);

                    string ProductDetail = objCommon.JVal("ProductDetail", Obj1);
                    DataTable datatable1 = (DataTable)JsonConvert.DeserializeObject(ErrorDetail, (typeof(DataTable)));
                    DataTable datatable2 = (DataTable)JsonConvert.DeserializeObject(ProductDetail, (typeof(DataTable)));
                    if (IsOnload == true)
                    {
                        result = "S|" + JsonConvert.SerializeObject(datatable2).Replace("null", "\"\"").Replace("'", "\'");
                    }
                    else if (datatable1.Rows.Count > 0)
                    {

                        if (datatable1.Rows[0]["isReqbqError"].ToString() == "1")
                        {
                            string msg = "For " + datatable1.Rows[0]["Product"].ToString() + " product please select one of these packages : " + datatable1.Rows[0]["ErrorDesc"].ToString() + "";
                            result = "E|" + msg;
                        }
                        else if (datatable1.Rows[0]["isReqbqError"].ToString() == "0")
                        {
                            string msg = datatable1.Rows[0]["Product"].ToString() + " product occurred multiple times in selected packs : " + datatable1.Rows[0]["ErrorDesc"].ToString() + "";
                            result = "E|" + msg;

                        }
                        else
                        {
                            result = "E|Sorry,something went worng please try again.";
                        }
                    }
                    else
                    {
                        result = "S|" + JsonConvert.SerializeObject(datatable2).Replace("null", "\"\"").Replace("'", "\'");

                    }
                }
            }
            catch (Exception ex)
            {
                result = "E|" + ex.Message.ToString();
            }

            return result;
        }

        [System.Web.Services.WebMethod]
        public static string EndDateCalculation(string Data, Int64 CompID, string OPID, int Action, bool bIsDay, string Id)
        {
            string result = "";
            clsCommon objCommon = new clsCommon();
            try
            {
                string EndDateData = JsonConvert.SerializeObject(Data);
                result = objCommon.CallAPI("CalculateEndDate?OPID=" + OPID + "&Data=" + Data + "&bIsDay=" + bIsDay + "&Action=" + Action + "&CompID=" + CompID + "");

            }
            catch (Exception ex)
            {

            }
            return result + "|" + Id;//"|" + result;
        }
        [System.Web.Services.WebMethod]
        public static string CalwithValidateMethod(string OPID, string xml,  string CustomerDetail) // Call for 
        {
            string result = "";
            clsCommon objCommon = new clsCommon();          
            try
            {
                string xmlData = JsonConvert.SerializeObject(xml);
                string CustomerDetailData = JsonConvert.SerializeObject(CustomerDetail);

                string Data = "{\"OPID\":\"" + OPID + "\",\"xml\":" + xmlData + ",\"CustomerDetail\":" + CustomerDetailData + "}";
                result = objCommon.CallPostAPI(Data, "ProductReversal");
                //result = objCommon.CallAPI("ProductReversal?opID=" + OPID + "&xml=" + xml + "&CustomerDetail=" + CustomerDetail+"");
                
            }
            catch (Exception ex)
            {
                result = "E|" + ex.Message.ToString();
            }
           

            return result;
        }
        [System.Web.Services.WebMethod]
        public static void redirectToAddMoney(string SubscriptionProduct, string OrderSummary1, string OrderSummary2)
        {
            HttpContext.Current.Session["IsFromMyConnection"] = "1";
            HttpContext.Current.Session["SubsProductDetail"] = SubscriptionProduct;
            DataTable OrderSummaryTable1 = (DataTable)JsonConvert.DeserializeObject(OrderSummary1, (typeof(DataTable)));
            DataTable OrderSummaryTable2 = (DataTable)JsonConvert.DeserializeObject(OrderSummary2, (typeof(DataTable)));
            DataSet ds = new DataSet();
            ds.Tables.Add(OrderSummaryTable1);
            ds.Tables.Add(OrderSummaryTable2);
            HttpContext.Current.Session["OrderSummary"] = ds;
            
        }

    }
}