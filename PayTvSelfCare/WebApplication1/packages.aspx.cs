using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Configuration;
using System.Text;


namespace WebApplication1
{
    public partial class packages : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //Get State
        [System.Web.Services.WebMethod]
        public static string Statelist(string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("StateList?PageSize=-1&opID=" + OPID + "");
        }

        //Get Citylist
        [System.Web.Services.WebMethod]
        public static string GetCityList(int StateId, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("CityList?PageSize=-1&StateID=" + StateId + "&opID=" + OPID + "");
        }

        //Get SubOperator
         [System.Web.Services.WebMethod]
        public static string getSubOperatorList(int CityId, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            //return objCommon.CallSMSAPI("getSubOperatorList?opID=" + OPID + "&pageSize=-1 &cityID=" + CityId + "");
            return objCommon.CallAPI("getSubOperatorList?opID=" + OPID + "&pageSize=-1&cityID=" + CityId + "");
        }

        //Get Pakeges
        [System.Web.Services.WebMethod]
        public static string GetPackges(int locationType, int locationid, int listtype, string OPID)
        {
            clsCommon objCommon = new clsCommon();
            return objCommon.CallAPI("ProductMaster?PageSize=-1&locationType=" + locationType + "&locationId=" + locationid + "&listType=" + listtype + "&opID=" + OPID + "");
        }


    }
}