using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Json;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class MyInvoiceHistory : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static string GetMyInvoiceHistory( long CustId, string OPID,string TopRowCount)//, string Logo
        {

            clsCommon objCommon = new clsCommon();
            var result = objCommon.CallAPI("PrepiadInvoiceSelectAll?&opID=" + OPID + "&CustomerID=" + CustId + "&Criteria=" + "" + "&InvoiceCount=" + TopRowCount + "&userID=-1");

            try
            {
                JsonValue ParseData = JsonObject.Parse(result);

                if (objCommon.JVal("Status", ParseData).Replace("\"", "") == "Success")
                {
                   
                    string Description = objCommon.JVal("Description", ParseData);
                    DataTable dtNew = JsonConvert.DeserializeObject<DataTable>(Description.ToString());

                     dtNew.Columns.Remove("CustomerID");
                     dtNew.Columns.Remove("InvoiceID");
                     dtNew.Columns.Remove("ConnID");
                     dtNew.Columns.Remove("DocMonth");
                     dtNew.Columns.Remove("DocDay");
                     dtNew.Columns.Remove("DocYear");
                     dtNew.Columns.Remove("DocTime");
                     dtNew.Columns.Remove("DocPeriod");


                     dtNew.Columns["InvoiceNo"].ColumnName = "Invoice No";
                     dtNew.Columns["InvoiceDate"].ColumnName = "Invoice Date";
                     dtNew.Columns["SmartCardNo"].ColumnName = "SmartCard No.";
                     dtNew.Columns["STBNo"].ColumnName = "STB No.";
                     dtNew.Columns["Amount"].ColumnName = "Invoice Amount";

            
                   HttpContext.Current.Session["ExportData"] = dtNew;

                }

            }
            catch
            { 
            
            }


            return result;
        }



        [WebMethod]
        public static string GetInvoiceHtml(string InvoiceId, string RequestType, string OPID)
        {

            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetPrepaidInvoicePDFHTML?&opID=" + OPID + "&InvoiceId=" + InvoiceId + "&RequestType=" + RequestType + "&userID=-1");


        }
        [WebMethod]
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
                        Msg = "S|" + DeCodeHTML.Replace("♦", "'");
                    }
                    else
                    {
                        HttpContext.Current.Session["DownloadPDF"] = DeCodeHTML.Replace("♦", "'");
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
        [WebMethod]
        public static string GetBase64Img(string Logo)
        {
            string base64image = "";
            DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
            if (dt != null)
            {
                string FtpServer = dt.Rows[0]["FTPServer"].ToString();// "www.cnmsonnet.com";
                string FtpUserID = dt.Rows[0]["FTPUSerID"].ToString();
                string FtpUserKey = dt.Rows[0]["FTPPassword"].ToString();
                if (FtpUserID != null)
                {
                    if (Logo != null)
                    {
                        FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + FtpServer + "/" + Logo));

                        request.Method = WebRequestMethods.Ftp.DownloadFile;
                        request.Credentials = new NetworkCredential(FtpUserID, FtpUserKey);

                        try
                        {
                            FtpWebResponse response = (FtpWebResponse)request.GetResponse();

                            Stream stream = response.GetResponseStream();

                            byte[] bytes = new byte[2048];
                            int i = 0;

                            MemoryStream mStream = new MemoryStream();
                            do
                            {

                                i = stream.Read(bytes, 0, bytes.Length);

                                mStream.Write(bytes, 0, i);

                            } while (i != 0);


                            base64image = Convert.ToBase64String(mStream.GetBuffer());
                        }
                        catch (WebException wex)
                        {

                            throw new Exception("An error occurred: " + wex);

                        }
                        catch (Exception ex)
                        {

                            throw new Exception("An error occurred: " + ex);
                        }


                    }
                }
            }
            return base64image;
        }
    }
}