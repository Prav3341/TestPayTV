using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NReco.PdfGenerator;
using System.Web.SessionState;
using System.IO;
namespace WebApplication1
{
    /// <summary>
    /// Summary description for DownloadPDF
    /// </summary>
    public class DownloadPDF : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            if (HttpContext.Current.Session["DownloadPDF"] != null)
            {
                try
                {
                    string NewData = HttpContext.Current.Session["DownloadPDF"].ToString();
                    DateTime now = DateTime.Now;
                    string Path = HttpContext.Current.Server.MapPath("~/RstLog/");
                    var htmlContent = NewData.Trim();
                    var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();

                    var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);
                    //context.Response.ClearHeaders();
                    //context.Response.AddHeader("Cache-Control", " no-store, no-cache ");

                    //context.Response.ContentType = "application/pdf";
                    context.Response.ContentType = "application/pdf; charset=utf-8";
                    context.Response.ContentEncoding = System.Text.Encoding.UTF8;
                    context.Response.AddHeader("content-disposition", "attachment;filename=PayTVCableReceipt" + now + ".pdf");
                    context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                    context.Response.BinaryWrite(pdfBytes);
                    context.Response.Flush();
                    context.Response.End();
                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                }

                catch (Exception ex)
                {
                    string m = ex.Message;
                }
                HttpContext.Current.Session["DownloadPDF"] = null;
            
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