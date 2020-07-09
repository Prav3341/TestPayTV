using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class SubscriptionFail : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }
        [System.Web.Services.WebMethod]
        public static string GetSubscriptionFail()
        {
            string AddMoneyFailData = "", SubsFail = "";
            if (HttpContext.Current.Session["IsFromMyConnection"] == "1" && HttpContext.Current.Session["SubscriptionFail"] != null)
            {

                SubsFail = HttpContext.Current.Session["SubscriptionFail"].ToString();
                HttpContext.Current.Session["SubscriptionFail"] = null;
                HttpContext.Current.Session["IsFromMyConnection"] = null;

            }
            else if (HttpContext.Current.Session["IsFromMyConnection"] == "1" && HttpContext.Current.Session["IsCancel"] != null)
            {
                AddMoneyFailData = HttpContext.Current.Session["IsCancel"].ToString();
                HttpContext.Current.Session["IsCancel"] = null;
                HttpContext.Current.Session["IsFromMyConnection"] = null;

            }
            return AddMoneyFailData + "*" + SubsFail;
        }
    }
}