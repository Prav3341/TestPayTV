//using OnNetSinglePlayLib;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication1;

namespace OnNetSinglePlay.CCAvenue
{
    public partial class GetRSA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            String message="";
            clsCommon com = new clsCommon();
            try
            {
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                string queryUrl = Convert.ToString(ConfigurationManager.AppSettings["ccavRSAKeyURL"]);  //"https://test.ccavenue.com/transaction/getRSAKey";
                string vParams = "";
                foreach (string key in Request.Params.AllKeys)
                {
                    vParams += key + "=" + Request[key] + "&";
                }
                com.LogWrite("queryUrl:" + queryUrl);
                com.LogWrite("vParams:" + vParams);
                // Url Connection
                Response.ContentType = "text/plain";
                message = postPaymentRequestToGateway(queryUrl, vParams);
                Response.Write(message);
                com.LogWrite("mgs:" + message);
                Response.End();
                
            }
            catch (Exception exp)
            {
                //Response.Write(exp.Message.ToString());
            }
        }

        private string postPaymentRequestToGateway(String queryUrl, String urlParam)
        {
            String message = "";
            clsCommon com = new clsCommon();
            try
            {
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                StreamWriter myWriter = null;// it will open a http connection with provided url
                WebRequest objRequest = WebRequest.Create(queryUrl);//send data using objxmlhttp object
                objRequest.Method = "POST";
                ServicePointManager.Expect100Continue = true;
               // ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
                //objRequest.ContentLength = TranRequest.Length;
                objRequest.ContentType = "application/x-www-form-urlencoded";//to set content type
                myWriter = new System.IO.StreamWriter(objRequest.GetRequestStream());
                myWriter.Write(urlParam);//send data
                myWriter.Close();//closed the myWriter object
               
                // Getting Response
                System.Net.HttpWebResponse objResponse = (System.Net.HttpWebResponse)objRequest.GetResponse();//receive the responce from objxmlhttp object 
                using (System.IO.StreamReader sr = new System.IO.StreamReader(objResponse.GetResponseStream()))
                {
                    com.LogWrite("message:" + message);
                    message = sr.ReadToEnd();
                }
            }
            catch (Exception exception)
            {
                com.LogWrite("exception:" + exception);
               message= "Exception occured while connection." + exception;
            }
            return message;
        }


    }
}