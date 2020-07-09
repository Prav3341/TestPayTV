using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class PayU : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["PayUPage"] != null)
            {
                string page = Session["PayUPage"] as string;
                Session["PayUPage"] = null;
                Page.Controls.Add(new LiteralControl(page));
            }
            else
            {
                Response.Redirect("/Dashboard");
            }
        }
    }
}