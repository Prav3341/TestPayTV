using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class MyCRF : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetCRFList(string TopRowCount, long SubsId, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("TicketList?CallBy=CRF&opID=" + OPID + "&userID=" + -1 + "&pageSize=" + TopRowCount + "&subsUniqueID=" + SubsId + "");
        }
    }
}