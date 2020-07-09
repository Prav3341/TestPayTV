using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class forgot_password : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        //Submit OTP
        [System.Web.Services.WebMethod]
        public static string SetForgetPassword(string UserId, string IsCallBy)
        {
            clsCommon objCommon = new clsCommon();
            string value = "false";
            if (objCommon.IsNumeric(UserId) == true)
            {
                value = "true";
            }
            return objCommon.CallAPI("GenerateOTP?UserId=" + UserId + "&IsNumeric=" + value + "&IsCallBy=" + IsCallBy + "");

        }
        //VeryfiOTP
        [System.Web.Services.WebMethod]
        public static string VerfiyPassOTP(string OTP, string UserId)
        {
            clsCommon objCommon = new clsCommon();
            string value = "false";
            if (objCommon.IsNumeric(UserId) == true)
            {
                value = "true";
            }
            return objCommon.CallAPI("VerifyOTP?PortalId=2&UserId=" + UserId + "&OTP=" + OTP + "&IsNumeric=" + value + "&IsCallBy=ForgotPass"+"");
        }

        //Change Password
        [System.Web.Services.WebMethod]
        public static string SetNewPassword(string NewPassword, string UserId)
        {
            clsCommon objCommon = new clsCommon();
            string value = "false";
            if (objCommon.IsNumeric(UserId) == true)
            {
                value = "true";
            }
            return objCommon.CallAPI("ChangeLoginPassword?userID=" + UserId + "&isNumeric=" + value + "&password=" + NewPassword + "");
        }
    }
}