using CCA.Util;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace OnNetSinglePlay.CCAvenue
{
    public partial class ccavResponseHandler : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string workingKey = Convert.ToString(ConfigurationManager.AppSettings["ccavWorkingKey"]); //"F71563F7128A2706AB643A3F865CB6E0";//put in the 32bit alpha numeric key in the quotes provided here
            CCACrypto ccaCrypto = new CCACrypto();

            try
            {
                string encResponse = ccaCrypto.Decrypt(Request.Form["encResp"], workingKey);
                NameValueCollection Params = new NameValueCollection();
                string[] segments = encResponse.Split('&');
                foreach (string seg in segments)
                {
                    string[] parts = seg.Split('=');
                    if (parts.Length > 0)
                    {
                        string Key = parts[0].Trim();
                        string Value = parts[1].Trim();
                        Params.Add(Key, Value);
                    }
                }

                string str = "{";
                //Response.Write("{");
                for (int i = 0; i < Params.Count; i++)
                {
                    if (str == "{")
                        str = str + "\"" + Params.Keys[i] + "\"" + ":\"" + Params[i] + "\"";
                    else
                        str = str + "," + "\"" + Params.Keys[i] + "\"" + ":\"" + Params[i] + "\"";
                    //Response.Write("'" + Params.Keys[i] + "'" + ":'" + Params[i] + "'");
                }
                str = str + "}";
                Response.Write(str);
                Response.End();
            }
            catch (Exception exp)
            {
                // Response.Write("Exception " + exp);
            }

        }
    }
}