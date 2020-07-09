using Newtonsoft.Json;
using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Json;
using System.Net;
using System.Web;
using System.Web.Services;

namespace WebApplication1
{
    public partial class MyLedger : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetLedgerHistory(string FromDate, string ToDate, long CustomerID, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            //return objCommon.CallAPI("SubsLedgerDetails?opID=" + OPID + "&subsUniqueID=" + SubsId + "&fromDate=" + FromDate + "&toDate=" + ToDate + "&PageSize=-1");
          
            var response = objCommon.CallAPI("SubscriberLedgerSelectAll?opID=" + OPID + "&userID=-1&CustomerID=" + CustomerID + "&FromDate=" + FromDate + "&ToDate=" + ToDate);
            try
            {
                JsonValue ParseData = JsonObject.Parse(response);

                if (objCommon.JVal("Status", ParseData).Replace("\"", "") == "Success")
                {

                    string Description = objCommon.JVal("Description", ParseData);
                    DataTable dtNew = JsonConvert.DeserializeObject<DataTable>(Description.ToString());

                    dtNew.Columns.Remove("TransNo");
                    dtNew.Columns.Remove("CustID");
                    dtNew.Columns.Remove("ConnID");
                    dtNew.Columns.Remove("ActionType");

                    dtNew.Columns.Remove("DocMonth");
                    dtNew.Columns.Remove("DocDay");
                    dtNew.Columns.Remove("DocYear");
                    dtNew.Columns.Remove("DocTime");
                    dtNew.Columns.Remove("DocPeriod");


                   
                    dtNew.Columns.Remove("DocID");
                    dtNew.Columns.Remove("DocType");
                    dtNew.Columns.Remove("DocCaptionMob");

                    dtNew.Columns["DocCaption"].ColumnName = "Doc Caption";
                    dtNew.Columns["ClosingBal"].ColumnName = "Closing Balance";
                    dtNew.Columns["DocShowID"].ColumnName = "Doc No.";
                    dtNew.Columns["EntryType"].ColumnName = "Entry Type";
                    dtNew.Columns["Smartcard"].ColumnName = "Smart Card";
             

                    dtNew.Columns["DocDate"].SetOrdinal(0);
                    dtNew.Columns["Action"].SetOrdinal(1);
                    dtNew.Columns["Smart Card"].SetOrdinal(2);
                    dtNew.Columns["Doc Caption"].SetOrdinal(3);
                    dtNew.Columns["Doc No."].SetOrdinal(4);
                    dtNew.Columns["Entry Type"].SetOrdinal(5);
                    dtNew.Columns["Amount"].SetOrdinal(6);
                    dtNew.Columns["Closing Balance"].SetOrdinal(7);
                    
            

                    HttpContext.Current.Session["ExportData"] = dtNew;

                }

            }
            catch
            { }

            return response;
        }

        [WebMethod]
        public static string GetRecpHTML(string RcptID, string RequestType, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetAddMoneyRcptPDFHTML?opID=" + OPID + "&userID=-1&RcptID=" + RcptID + "&RequestType=" + RequestType);
        }

        [WebMethod]
        public static string GetDrCrHTML(string DocID, string CallBy, string RequestType, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetDrCrNoteHTMLPDF?opID=" + OPID + "&userID=-1&DocID=" + DocID + "&CallBy=" + CallBy + "&RequestType=" + RequestType);
        }

        [WebMethod]
        public static string GetInvoiceHTML(string InvoiceID, string RequestType, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetPrepaidInvoicePDFHTML?opID=" + OPID + "&userID=-1&InvoiceID=" + InvoiceID + "&RequestType=" + RequestType);
        }

        [WebMethod]
        public static string DownloadDoc(string HTML)
        {
            string Msg = "";
            try
            {
                if (HTML != "")
                {
                    string DeCodeHTML = System.Uri.UnescapeDataString(HTML);
                 
                        HttpContext.Current.Session["DownloadPDF"] = DeCodeHTML.Replace("♦", "'");
                        Msg = "S";
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