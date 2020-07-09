using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class MyServiceRequests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetRequestList(string TopRowCount, long SubsId, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("TicketList?CallBy=SR&opID=" + OPID + "&userID=" + -1 + "&pageSize=" + TopRowCount + "&subsUniqueID=" + SubsId + "");
        }


        [WebMethod]
        public static string GetTicketHeadList(string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("TicketHead?opID=" + OPID + "&pageSize=-1");
            //CityList?PageSize=-1&StateID=" + StateId + ""
        }

        [WebMethod]
        public static string AdNewComplaints(long SubsId, string TicketHeadId, string Remarks, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallSMSAPI("CreateTicket?opID=" + OPID + "&Remarks=" + Remarks + "&TicketHeadId=" + TicketHeadId + "&subsUniqueID=" + SubsId + "");
        }

        [WebMethod]
        public static string GetRequestListChat(string OPID , string TicketId)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("GetLedgerStatusByTID?opId=" + OPID + "&userID=" + -1 + "&TicketID=" + TicketId + "");
        }

        [WebMethod]
        public static string saveRequestListChat(string opId, string userID, string remark, string TicketNo)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("ManageTicketsave?opId="+opId+"&userID="+userID+"&remark="+remark+"&TicketNo="+TicketNo+"");
        }

    }
}