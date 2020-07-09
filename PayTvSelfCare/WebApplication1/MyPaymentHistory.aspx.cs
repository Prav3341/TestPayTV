using Newtonsoft.Json;
using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Json;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Services;
using System.Web.UI;

namespace WebApplication1
{
    public partial class MyPaymentHistory : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
      
            


        }
        [WebMethod(EnableSession = true)]
        public static string GetMyPaymentHistory(string FromDate, string ToDate, long SubsId, string OPID)//, string Logo
        {
             
              clsCommon objCommon = new clsCommon();
              string result="";
              if (HttpContext.Current.Session["AddMoney"] != null && HttpContext.Current.Session["AddMoney"] != "")
              {
                  var PGID = HttpContext.Current.Session["PGID"].ToString();
                  //Thread.Sleep(10000);
                  string  response = objCommon.CallAPI("GetAddMoneyRcptPDFHTML?opID=" + OPID + "&userID=-1&RcptID=0&RequestType=HTML&PGID=" + PGID + "");
                  HttpContext.Current.Session["PGID"] = null;
                  HttpContext.Current.Session["AddMoney"] = null;
                  result = response + "|" + "AddMoney";
              }
              else
              {
                  string response = objCommon.CallAPI("paymentHistory?&opID=" + OPID + "&subsUniqueID=" + SubsId + "&fromDate=" + FromDate + "&toDate=" + ToDate + "&pageSize=-1");
                  try
                  {
                      JsonValue ParseData = JsonObject.Parse(response);

                      if (objCommon.JVal("Status", ParseData).Replace("\"", "") == "Success")
                      {

                          string Description = objCommon.JVal("Description", ParseData);
                          DataTable dtNew = JsonConvert.DeserializeObject<DataTable>(Description.ToString());

                          dtNew.Columns.Remove("PageNo");
                          dtNew.Columns.Remove("RecPerPage");
                          dtNew.Columns.Remove("TotalCount");
                          dtNew.Columns.Remove("RowIndex");
                          
                          dtNew.Columns.Remove("DocMonth");
                          dtNew.Columns.Remove("DocDay");
                          dtNew.Columns.Remove("DocYear");
                          dtNew.Columns.Remove("DocTime");
                          dtNew.Columns.Remove("DocPeriod");

                          dtNew.Columns.Remove("Receipt Detail");
                          dtNew.Columns.Remove("SNo");
                          dtNew.Columns.Remove("Payment Mode");
                          dtNew.Columns.Remove("Receipt ID");

                          HttpContext.Current.Session["ExportData"] = dtNew;

                      }

                  }
                  catch
                  {   }

                  result = response + "|" + "";
              }
              return result;
        }



        [WebMethod]
        public static string GetPaymentRecpt(string PGID, long SubsId, string OPID)
        {
          
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("ReceiptDetail?opID=" + OPID + "&subsUniqueID=" + SubsId + "&receiptID=" + PGID + "");
             
              
        }

        [WebMethod]
        public static string GetRecpHTML(string RcptID, string RequestType, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetAddMoneyRcptPDFHTML?opID=" + OPID + "&userID=-1&RcptID=" + RcptID + "&RequestType=" + RequestType+"&PGID=0");
        }


        [WebMethod]
        public static string DownloadPaymentRecpt(string RecpHtml, bool IsCallByMobileApp, bool IsCallByIOSMobileApp)
        {
            string Msg = "";
            try
            {
                if (RecpHtml != "")
                {
                    string DeCodeHTML = System.Uri.UnescapeDataString(RecpHtml);
                    //string html= "<style type='text/css'> @font-face { font-family: Play-Bold; src: url(!fonts/Play-Bold.ttf!) format(!truetype!); }  #SuccessReceipt { font-size: 14px;  font-family: !Segoe UI!; color: #484848; margin-bottom: 20%; width: 90%; margin: auto; border: 1px solid #bfbcbc; border-radius: 1px; padding: 10px;  } #SuccessReceipt p { margin: 0px; padding: 0px; line-height: 25px; }#SuccessReceipt { padding: 15px; } #SuccessReceipt .mainDiv { padding: 2px !important; }</style>";
                    //RecpHtml = html + RecpHtml;
                    if (IsCallByMobileApp == true || IsCallByIOSMobileApp==true)
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
                         
                       
                            base64image= Convert.ToBase64String(mStream.GetBuffer());
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