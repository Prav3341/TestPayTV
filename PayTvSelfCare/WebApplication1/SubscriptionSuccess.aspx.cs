using Newtonsoft.Json;
using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Json;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.UI;

namespace WebApplication1
{
    public partial class SubscriptionSuccess : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        [System.Web.Services.WebMethod]
        public static string GetSubscriptionSucess()
        {
            string SubscriptionSuccess = "";
            string OrderSummary="";
            OrderSummary = JsonConvert.SerializeObject(HttpContext.Current.Session["OrderSummary"]);
            HttpContext.Current.Session["OrderSummary"] = null;
            if (Convert.ToString(HttpContext.Current.Session["IsFromMyConnection"]) == "1" && HttpContext.Current.Session["SubscriptionSuccess"] != null)
            {
                SubscriptionSuccess = HttpContext.Current.Session["SubscriptionSuccess"].ToString();
                HttpContext.Current.Session["SubscriptionSuccess"] = null;
                HttpContext.Current.Session["IsFromMyConnection"] = null;              
            }
            return SubscriptionSuccess + "*" + OrderSummary;
        }
        
    }
}