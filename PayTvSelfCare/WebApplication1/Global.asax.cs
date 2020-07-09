using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using WebApplication1;

namespace WebApplication1
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterOpenAuth();
           
        }
        void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            string sessionId = Session.SessionID;
        }
        void Application_BeginRequest(object sender, EventArgs e)
        {
            string originalPath = HttpContext.Current.Request.Path;

            if (originalPath == "/Home")
            {
                Context.RewritePath(originalPath.Replace("/Home", "/default.aspx"));
            }
            if (originalPath == "/AboutUs")
            {
                Context.RewritePath(originalPath.Replace("/AboutUs", "/AboutUs.aspx"));
            }
            if (originalPath == "/Packages")
            {
                Context.RewritePath(originalPath.Replace("/Packages", "/packages.aspx"));
            }
            if (originalPath == "/MyDashboard")
            {
                Context.RewritePath(originalPath.Replace("/MyDashboard", "/Dashboard.aspx"));
            }
            if (originalPath == "/MyProfile")
            {
                Context.RewritePath(originalPath.Replace("/MyProfile", "/MyProfile.aspx"));
            }
            if (originalPath == "/MyTransaction")
            {
                Context.RewritePath(originalPath.Replace("/MyTransaction", "/MyLedger.aspx"));
            }
            if (originalPath == "/MyConnection")
            {
                Context.RewritePath(originalPath.Replace("/MyConnection", "/MyConnections.aspx"));
            }
            if (originalPath == "/MyServiceRequests")
            {
                Context.RewritePath(originalPath.Replace("/MyServiceRequests", "/MyServiceRequests.aspx"));
            }

            if (originalPath == "/MyPaymentHistory")
            {
                Context.RewritePath(originalPath.Replace("/MyPaymentHistory", "/MyPaymentHistory.aspx"));
            }

            if (originalPath == "/AppLogin")
            {
                //Context.RewritePath(originalPath.Replace("/AppLogin", "/AppLogin.aspx"));
                Context.RewritePath(originalPath.Replace("/AppLogin", "/login.aspx"));
            }
            if (originalPath == "/PrivacyPolicy")
            {
                Context.RewritePath(originalPath.Replace("/PrivacyPolicy", "/PrivacyPolicy.aspx"));
            }
            if (originalPath == "/STBScheme")
            {
                Context.RewritePath(originalPath.Replace("/STBScheme", "/STBScheme.aspx"));
            }
            if (originalPath == "/TraiComplaints")
            {
                Context.RewritePath(originalPath.Replace("/TraiComplaints", "/TraiComplaints.aspx"));
            }
            if (originalPath == "/SignIn")
            {
                Context.RewritePath(originalPath.Replace("/SignIn", "/login.aspx"));
            }
            if (originalPath == "/Register")
            {
                Context.RewritePath(originalPath.Replace("/Register", "/register.aspx"));
            }
            if (originalPath == "/ForgotPassword")
            {
                Context.RewritePath(originalPath.Replace("/ForgotPassword", "/forgot_password.aspx"));
            }
            if (originalPath == "/PurchaseDetails")
            {
                Context.RewritePath(originalPath.Replace("/PurchaseDetails", "/PurchaseDetails.aspx"));
            }
            if (originalPath == "/Disclaimor")
            {
                Context.RewritePath(originalPath.Replace("/Disclaimor", "/Disclaimor.aspx"));
            }


            if (originalPath == "/PayU")
            {
                Context.RewritePath(originalPath.Replace("/PayU", "/PayU.aspx"));
            }
            if (originalPath == "/Success")
            {
                Context.RewritePath(originalPath.Replace("/Success", "/SuccessPage.aspx"));
            }
            if (originalPath == "/Failed")
            {
                Context.RewritePath(originalPath.Replace("/Failed", "/CancelPage.aspx"));
            }
            if (originalPath == "/SuccessPageQP")
            {
                Context.RewritePath(originalPath.Replace("/SuccessPageQP", "/SuccessPageQP.aspx"));
            }
            if (originalPath == "/CancelPageQP")
            {
                Context.RewritePath(originalPath.Replace("/CancelPageQP", "/CancelPageQP.aspx"));
            }
            if (originalPath == "/TermsandConditions")
            {
                Context.RewritePath(originalPath.Replace("/TermsandConditions", "/RegisterTAndC.aspx"));
            }
            if (originalPath == "/MyOrders")
            {
                Context.RewritePath(originalPath.Replace("/MyOrders", "/MyCRF.aspx"));
     
            }
            if (originalPath == "/SubscriptionSucess")
            {
                Context.RewritePath(originalPath.Replace("/SubscriptionSucess", "/SubscriptionSuccess.aspx"));
            }
            if (originalPath == "/SubscriptionFail")
            {
                Context.RewritePath(originalPath.Replace("/SubscriptionFail", "/SubscriptionFail.aspx"));
            }
            if (originalPath == "/SubscriptionProcess")
            {
                Context.RewritePath(originalPath.Replace("/SubscriptionProcess", "/SubscriptionProcess.aspx"));
            }
            if (originalPath == "/MyInvoiceHistory")
            {
                Context.RewritePath(originalPath.Replace("/MyInvoiceHistory", "/MyInvoiceHistory.aspx"));
            }
            if (originalPath == "/RenewConnection")
            {
                Context.RewritePath(originalPath.Replace("/RenewConnection", "/RenewConnection.aspx"));
            }
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }
    }
}
