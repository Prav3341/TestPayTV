using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace WebApplication1.Handler
{
    /// <summary>
    /// Summary description for PdfDownload
    /// </summary>
    public class PdfDownload : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {

            if (HttpContext.Current.Session["ExportData"] != null)
            {
                DataTable dt = HttpContext.Current.Session["ExportData"] as DataTable;
                string Exportfilename = Convert.ToString(context.Request.QueryString["Exportfilename"]);
                string MemberShipNo = context.Request.QueryString["MemberShipNo"].ToString();
               


                Document pdfDoc = new Document(PageSize.A4, 36, 36, 80, 36);
                try
                {

                    using (PdfWriter writer = PdfWriter.GetInstance(pdfDoc, System.Web.HttpContext.Current.Response.OutputStream))
                    {
                        // =============== PDF Header Starts ================================= //
                        writer.ViewerPreferences = PdfWriter.PageModeUseOutlines;
                        // Our custom Header and Footer is done using Event Handler
                        //PdfHeaderFooter PageEventHandler = new PdfHeaderFooter();
                        //writer.PageEvent = PageEventHandler;
                        //// Define the page header
                        //PageEventHandler.Title = "";
                        //PageEventHandler.HeaderFont = FontFactory.GetFont(BaseFont.HELVETICA, 10, iTextSharp.text.BaseColor.BLACK);
                        //PageEventHandler.HeaderLeft = CompanyName;
                        //PageEventHandler.HeaderRight = ExportFileName;
                        pdfDoc.Open();

                        BaseFont bf = null;
                        try
                        {

                            bf = BaseFont.CreateFont(Environment.GetEnvironmentVariable("windir") + @"\fonts\ARIALUNI.TTF", BaseFont.IDENTITY_H, false);
                        }
                        catch (Exception)
                        {
                            bf = null;
                        }
                        //Font font8 = FontFactory.GetFont("ARIAL", 7);
                        iTextSharp.text.Font font8 = new iTextSharp.text.Font(bf, 7, iTextSharp.text.Font.NORMAL);
                        if (dt != null)
                        {
                            //Create instance of the pdf table and set the number of column in that table  
                            PdfPTable PdfTable = new PdfPTable(dt.Columns.Count);
                            PdfPCell HeaderCell;
                            string[] columnNames = dt.Columns.Cast<DataColumn>().Select(x => x.ColumnName).ToArray();
                            foreach (String h in columnNames)
                            {
                                //HeaderCell = new iTextSharp.text.pdf.PdfPCell(new iTextSharp.text.Phrase(h, font8));
                                HeaderCell = new iTextSharp.text.pdf.PdfPCell(new iTextSharp.text.Phrase(h, new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 9, 1, iTextSharp.text.BaseColor.WHITE)));
                                HeaderCell.BackgroundColor = new BaseColor(218, 165, 32);//iTextSharp.text.BaseColor.LIGHT_GRAY;//#2D87B7
                                HeaderCell.PaddingBottom = 10;
                                HeaderCell.PaddingLeft = 10;
                                PdfTable.AddCell(HeaderCell);
                            }
                            PdfTable.HeaderRows = 1;

                            PdfPCell PdfPCell = null;
                            for (int rows = 0; rows < dt.Rows.Count; rows++)
                            {
                                for (int column = 0; column < dt.Columns.Count; column++)
                                {
                                    PdfPCell = new PdfPCell(new Phrase(new Chunk(dt.Rows[rows][column].ToString(), font8)));
                                    PdfPCell.PaddingTop = 10;
                                    PdfPCell.PaddingLeft = 10;
                                    PdfTable.AddCell(PdfPCell);
                                }
                            }
                            //PdfTable.SpacingBefore = 15f; // Give some space after the text or it may overlap the table            
                            pdfDoc.Add(PdfTable); // add pdf table to the document
                        }
                        pdfDoc.Close();
                        context.Response.ContentType = "application/pdf";
                        context.Response.AddHeader("content-disposition", "attachment; filename=" + Exportfilename + "-" + MemberShipNo + "-" + DateTime.Now.ToString("dd-MMM-yyyy") + ".pdf");
                        System.Web.HttpContext.Current.Response.Write(pdfDoc);
                        context.Response.Flush();
                        context.Response.End();
                        //HttpContext.Current.ApplicationInstance.CompleteRequest();  
                    }
                }
                catch (DocumentException de)
                {
                    System.Web.HttpContext.Current.Response.Write(de.Message);
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