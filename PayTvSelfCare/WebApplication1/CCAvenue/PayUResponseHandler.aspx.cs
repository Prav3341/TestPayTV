using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace OnNetSinglePlay.CCAvenue
{
    public partial class PayUResponseHandler : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string encResponse = Convert.ToString(Request.Form);
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
                for (int i = 0; i < Params.Count; i++)
                {
                    if (str == "{")
                        str = str + "\"" + Params.Keys[i] + "\"" + ":\"" + Params[i] + "\"";
                    else
                        str = str + "," + "\"" + Params.Keys[i] + "\"" + ":\"" + Params[i] + "\"";
                }
                str = str + "}";
                DataSet ds = new DataSet();
                DataTable dt = (DataTable)JsonConvert.DeserializeObject("[" + str + "]", (typeof(DataTable)));
                dt.TableName = "PaymentDT";
                ds.Tables.Add(dt);
                DataTable dt2 = ((System.Data.DataTable)(((DataTable)JsonConvert.DeserializeObject("[" + System.Uri.UnescapeDataString(((DataTable)JsonConvert.DeserializeObject("[" + str + "]", (typeof(DataTable)))).Rows[0]["productinfo"].ToString()) + "]", (typeof(DataTable)))).Rows[0]["paymentParts"])).DefaultView.Table.Copy();
                dt2.TableName = "paymentParts";
                ds.Tables.Add(dt2);
                try
                {
                    DataTable dt3 = ((System.Data.DataTable)(((DataTable)JsonConvert.DeserializeObject("[" + System.Uri.UnescapeDataString(((DataTable)JsonConvert.DeserializeObject("[" + str + "]", (typeof(DataTable)))).Rows[0]["payuMoneyId"].ToString()) + "]", (typeof(DataTable)))).Rows[0].Table.Rows[0]["splitIdMap"])).DefaultView.Table.Copy();
                    dt3.TableName = "splitIdMap";
                    ds.Tables.Add(dt3);
                }
                catch (Exception ex)
                {
                    DataTable dt3 = new DataTable();
                    dt3.Columns.Add("splitPaymentId");
                    dt3.Rows.Add(dt.Rows[0]["payuMoneyId"]);                        
                    dt3.TableName = "splitIdMap";
                    ds.Tables.Add(dt3);
                }
                Response.Write(JsonConvert.SerializeObject(ds));
                Response.End();
            }
            catch (Exception exp)
            {
                // Response.Write("Exception " + exp);
            }
        }
    }
}