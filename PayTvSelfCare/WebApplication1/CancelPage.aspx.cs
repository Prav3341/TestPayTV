using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class CancelPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            bool IsSyncPayment = false;
            string SubsPayAmt = "";
            HttpContext.Current.Session["IsFromMyConnection"] = null;
            if (HttpContext.Current.Session["IsCancel"] != null)
            {
                string ResData = HttpContext.Current.Session["IsCancel"].ToString();
                HttpContext.Current.Session["IsCancel"] = null;
                if (ResData.IndexOf("|") > 0)
                {

                    string OrderID = "";
                    OrderID = ResData.Split('|')[1].ToString();

                    string SubsMobileNo = ResData.Split('|')[2].ToString();
                    string SubsEmail = ResData.Split('|')[4].ToString();
                    string OperatorID = ResData.Split('|')[5].ToString();
                    string PGID = ResData.Split('|')[6].ToString();
                    SubsPayAmt = ResData.Split('|')[3].ToString();

                    string Criteria = SubsEmail + "|" + SubsMobileNo + "|" + SubsMobileNo + "-" + OperatorID;

                    
                }
            }

            ScriptManager.RegisterStartupScript(this, this.GetType(), "SetPaymentMessage", "javascript:SetPaymentMessage('" + IsSyncPayment.ToString() + "','" + SubsPayAmt.ToString() + "');", true);
        }


        public void SetSession(string constr)
        {
            HttpContext.Current.Session["UserLogOutStatus"] = "LogIn";
            HttpContext.Current.Session["sessionID"] = constr;
            HttpContext.Current.Session["CurrCompID"] = "1";
            HttpContext.Current.Session["CurrFinYearID"] = "1";
            HttpContext.Current.Session["CurrUserID"] = -1;
            HttpContext.Current.Session["CurrPanel"] = "APPWSER";
            HttpContext.Current.Session["UserLogOutStatus"] = "";
            HttpContext.Current.Session["CurrUserLogTransID"] = 0;
            HttpContext.Current.Session["CurrMenuID"] = "0";
            HttpContext.Current.Session["CurrEmployeeID"] = "0";
            HttpContext.Current.Session["CurrServiceID"] = "0";
            HttpContext.Current.Session["bIsWCFCall"] = false;
            HttpContext.Current.Session["WCFPath"] = "";
        }
        [WebMethod]
        public static DataTable XmlToTable(string xmlData)
        {
            StringReader theReader = new StringReader(xmlData);
            DataSet theDataSet = new DataSet();
            theDataSet.ReadXml(theReader);
            return theDataSet.Tables[0];
        }

        public string Generatehash512(string text)
        {
            byte[] message = Encoding.UTF8.GetBytes(text);
            UnicodeEncoding UE = new UnicodeEncoding();
            byte[] hashValue;
            SHA512Managed hashString = new SHA512Managed();
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }
    }
}