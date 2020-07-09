
using System;
using System.Data;
using System.IO;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.SessionState;

namespace WebApplication1
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class GetImage : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {

            DataTable dt = HttpContext.Current.Session["CurrUserDetails"] as DataTable;
            if (dt != null)
            {
                string FtpServer = dt.Rows[0]["FTPServer"].ToString();// "www.cnmsonnet.com";
                string FtpUserID = dt.Rows[0]["FTPUSerID"].ToString();
                string FtpUserKey = dt.Rows[0]["FTPPassword"].ToString();
                if (FtpUserID != null)
                {
                    if (context.Request.QueryString["imgid"] != null && context.Request.QueryString["imgid"] != "null")
                    {
                        FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + FtpServer + "/" + context.Request.QueryString["imgid"]));
                        var Extention = context.Request.QueryString["imgid"].Split('.')[1].ToString();
                        request.Method = WebRequestMethods.Ftp.DownloadFile;
                        request.Credentials = new NetworkCredential(FtpUserID, FtpUserKey);
                        if (context.Request.QueryString["Callby"] != null && context.Request.QueryString["Callby"]!="")
                        {
                            request.Method = WebRequestMethods.Ftp.DownloadFile;
                            try
                            {

                                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                                Stream stream = response.GetResponseStream();
                                byte[] bytes = new byte[2048];
                                int i = 0;
                                MemoryStream mStream = new MemoryStream();
                                do { i = stream.Read(bytes, 0, bytes.Length); mStream.Write(bytes, 0, i); } while (i != 0);
                               // context.Response.ContentType = "application/pdf";
                                if (Extention.ToLower() != "pdf")
                                    context.Response.ContentType = "image/jpeg";
                                else
                                    context.Response.ContentType = "application/pdf";
                                context.Response.AddHeader("content-disposition", "attachment;filename=" + context.Request.QueryString["imgid"].Split('/')[4]);
                                context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                                context.Response.BinaryWrite(mStream.GetBuffer());
                                context.Response.End();

                            }
                            catch (Exception)
                            { throw; }
                        }
                        else
                        {
                            
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
                                context.Response.Clear();
                                context.Response.ClearHeaders();
                                context.Response.ClearContent();
                                if (Extention.ToLower() != "pdf")
                                    context.Response.ContentType = "image/jpeg";
                                else
                                    context.Response.ContentType = "application/pdf";

                                context.Response.BinaryWrite(mStream.GetBuffer());

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
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}