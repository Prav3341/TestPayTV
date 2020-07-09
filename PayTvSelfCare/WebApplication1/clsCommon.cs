using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Net.Http;
using System.Json;
using System.Web.Script.Serialization;
using System.Data;
using System.Collections.Specialized;

namespace WebApplication1
{
    public class clsCommon
    {
        public string CallAPI(string APICaller)
        {
            string jsonResponse = string.Empty;
            try
            {
                WebRequest req2 = WebRequest.Create(@"" + ConfigurationManager.AppSettings["CallingUrl"].ToString() + APICaller);
                req2.Method = "GET";
                req2.ContentType = @"application/json; charset=utf-8";
                string username = ConfigurationManager.AppSettings["username"].ToString();// "relyMSOApp";
                string password = ConfigurationManager.AppSettings["password"].ToString(); //"rely@3134";

                string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));

                req2.Headers.Add("Authorization", "Basic " + svcCredentials);
                HttpWebResponse response = (HttpWebResponse)req2.GetResponse();

                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    jsonResponse = sr.ReadToEnd();
                }

            }
            catch (Exception e)
            {
                jsonResponse = e.Message.ToString();
            }

            return jsonResponse;
        }

        public string CallSMSAPI(string APICaller)
        {
            string jsonResponse = string.Empty;
            try
            {
                WebRequest req2 = WebRequest.Create(@"" + ConfigurationManager.AppSettings["callingurlsms"].ToString() + APICaller);
                req2.Method = "GET";
                req2.ContentType = @"application/json; charset=utf-8";
                string username = ConfigurationManager.AppSettings["username"].ToString();// "relyMSOApp";
                string password = ConfigurationManager.AppSettings["password"].ToString(); //"rely@3134";

                string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));

                req2.Headers.Add("Authorization", "Basic " + svcCredentials);
                HttpWebResponse response = (HttpWebResponse)req2.GetResponse();

                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    jsonResponse = sr.ReadToEnd();
                }

            }
            catch (Exception e)
            {
                jsonResponse = e.Message.ToString();
            }

            return jsonResponse;
        }


        public  bool IsNumeric(string val)
        {
            Double result;
            return Double.TryParse(val, out result);
        }



        //public string CallPostAPINew(string Parmeters)
        //{

        //    //var data = Encoding.ASCII.GetBytes(Parmeters);
        //    try
        //    {
        //        using (WebClient wc = new WebClient())
        //        {
        //            //.Method = "POST";
        //            string username = ConfigurationManager.AppSettings["username"].ToString();// "relyMSOApp";
        //            string password = ConfigurationManager.AppSettings["password"].ToString(); //"rely@3134";
        //            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));
        //            wc.Headers.Add("Authorization", "Basic " + svcCredentials);
        //            wc.Headers[HttpRequestHeader.ContentType] = "application/json";
        //            //wc.Headers[HttpRequestHeader.ContentLength] = data.Length.ToString();
        //            string HtmlResult = wc.UploadString(ConfigurationManager.AppSettings["CallingUrl"].ToString() + "CreateTicket","POST", Parmeters);
        //        }
        //    }
        //    catch (Exception ex)
        //    { 
        //    }
        //    return "";
        //}


        public void LogWrite(string logMessage)
        {
            string Path = HttpContext.Current.Server.MapPath("~/RstLog/");
            try
            {
                using (StreamWriter w = File.AppendText(Path + "\\" + "log.txt"))
                {
                    Log(logMessage, w);
                }
            }
            catch (Exception ex)
            {
            }
        }

        public void Log(string logMessage, TextWriter txtWriter)
        {
            try
            {

                txtWriter.WriteLine("============================================================================================================================================");
                txtWriter.WriteLine("----------------------------------------------------------------{0}-------------------------------------------------------------------------", DateTime.Now.ToLongTimeString());
                txtWriter.WriteLine("Message  :{0}", logMessage);
                txtWriter.WriteLine("============================================================================================================================================");
            }
            catch (Exception ex)
            {
            }
        }

        public string CallPostAPI(string JSONData, string FunName)
        {
            string jsonResponse = string.Empty;
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(@"" + ConfigurationManager.AppSettings["callingurl"].ToString() + FunName);
                var data = Encoding.ASCII.GetBytes(JSONData);
                request.Method = "POST";
                request.ContentType = "application/json";
                request.ContentLength = data.Length;
                string username = ConfigurationManager.AppSettings["username"].ToString();// "relyMSOApp";
                string password = ConfigurationManager.AppSettings["password"].ToString(); //"rely@3134";
                string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));
                request.Headers.Add("Authorization", "Basic " + svcCredentials);

                using (var stream = request.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
                //using (StreamReader sr = new StreamReader(request.GetResponse().GetResponseStream()))
                //{
                //    jsonResponse = sr.ReadToEnd();
                //}

                var response = (HttpWebResponse)request.GetResponse();
                 jsonResponse = new StreamReader(response.GetResponseStream()).ReadToEnd();

            }
            catch (Exception e)
            {
                jsonResponse = e.Message.ToString();
            }


            return jsonResponse;
        }


        public string JVal(string key, JsonValue obj)
        {
            ///return obj[key].ToString().Replace("\\", "").Replace("\"", "");
            return obj[key].ToString();
        }
        public string JValReplace(string key, JsonValue obj)
        {
            return obj[key].ToString().Replace("\\", "").Replace("\"", "");
            
        }
        public  string GetJson(DataTable table)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in table.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            return jss.Serialize(rows);
        }

        public  string GetDtToString(DataTable table)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            string DTtoString = "";
            foreach (DataRow dr in table.Rows)
            {
                //row = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    if (DTtoString == "")
                        DTtoString = col.ColumnName + ".@." + dr[col];
                    else
                        DTtoString = DTtoString + "._." + col.ColumnName + ".@." + dr[col];

                }

            }
            return DTtoString;
        }
        public string simpleCrypt(string Text, string EDType)
        {
            string strTempChar = "";
            string TempText = "";
            int i = 0;
            for (i = 1; i <= Text.Length; i++)
            {
                char c = Text.ToCharArray(i - 1, 1)[0];
                if (EDType == "E")
                {
                    if (Convert.ToInt32(c) < 128)
                    {
                        strTempChar = ((char)(c + 128)).ToString();
                    }
                    else
                    {
                        strTempChar = ((char)c).ToString();
                    }
                }
                else if (EDType == "D")
                {
                    if (Convert.ToInt32(c) > 128)
                    {
                        strTempChar = ((char)(c - 128)).ToString();
                    }
                    else
                    {
                        strTempChar = ((char)c).ToString();
                    }

                }
                else if (EDType == "R")
                {
                    if (Convert.ToInt32(c) < 128)
                    {
                        strTempChar = ((char)(c + 128)).ToString();
                    }
                    else if (Convert.ToInt32(c) > 128)
                    {
                        strTempChar = ((char)(c - 128)).ToString();
                    }
                }
                TempText = TempText + strTempChar;
            }
            return TempText;
        }

    }
}