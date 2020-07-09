using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using OfficeOpenXml;
using System.IO;
using System.Web.Services;

namespace WebApplication1.Handler
{
   /// <summary>
   /// Summary description for ExcelDownload
   /// </summary>
     [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class ExcelDownload : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            if (HttpContext.Current.Session["ExportData"] != null)
            {
                using (ExcelPackage pck = new ExcelPackage())
                {
                    string rng = "";
                    DataTable dt = HttpContext.Current.Session["ExportData"] as DataTable;
                    string XLfile = context.Request.QueryString["Exportfilename"].ToString();
                    string MemberShipNo = context.Request.QueryString["MemberShipNo"].ToString();
                    ExcelWorksheet ws = pck.Workbook.Worksheets.Add(XLfile);
                    ws.Cells["A1"].LoadFromDataTable(dt, true);

                    rng = "A1:" + getCellValue(dt.Columns.Count) + "1";
                    
                    ws.Cells["A:XFD"].Style.Locked = false;

                    ws.Cells["A:XFD"].Style.Numberformat.Format = "@";

                    ws.Cells[rng].Style.Font.Bold = true;
                    ws.Cells[rng].Style.Font.Name = "Arial";
                    ws.Cells[rng].AutoFitColumns(24);
                    ws.Cells[rng].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    ws.Cells[rng].Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                    ws.Cells[rng].Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;

                    ws.Cells[rng].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    ws.Cells[rng].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Goldenrod);
                    ws.Cells[rng].Style.Font.Color.SetColor(System.Drawing.Color.White);


                    //Read the Excel file in a byte array
                    Byte[] fileBytes = pck.GetAsByteArray();
                    //Clear the response
                    context.Response.Clear();
                    context.Response.ClearContent();
                    context.Response.ClearHeaders();
                    context.Response.Cookies.Clear();
                    //Add the header & other information 
                    context.Response.Cache.SetCacheability(HttpCacheability.Private);
                    context.Response.CacheControl = "private";
                    context.Response.Charset = System.Text.UTF8Encoding.UTF8.WebName;
                    context.Response.ContentEncoding = System.Text.UTF8Encoding.UTF8;
                    context.Response.AppendHeader("Content-Length", fileBytes.Length.ToString());
                    context.Response.AppendHeader("Pragma", "cache");
                    context.Response.AppendHeader("Expires", "60");
                    context.Response.AppendHeader("Content-Disposition",
                    "attachment; " +
                    "filename=\"" + XLfile + "-" + MemberShipNo+"-" + DateTime.Now.ToString("dd-MMM-yyyy") + ".xlsx\"; " +   //  "filename=\"" + XLfile + "-Report-As-On-" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss") + ".xlsx\"; " +
                    "size=" + fileBytes.Length.ToString() + "; "
                    );
                    context.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    context.Response.BinaryWrite(fileBytes);
                    context.Response.End();
                }
            }
        }

        public string getCellValue(int ColCount)
        {
            string CellName = string.Empty;
            string[] Alphas = new string[] { "0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z" };
            while (ColCount / 26 > 26)
            {
                CellName = CellName + "Z";
                ColCount = ColCount - 676;
            }
            int div = ColCount / 26;
            if (div == 0)
                CellName = CellName + Alphas[ColCount];
            else
                CellName = CellName + Alphas[div] + Alphas[ColCount - (26 * div)];
            return CellName;
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