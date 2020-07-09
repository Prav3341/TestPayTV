<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaster.Master" AutoEventWireup="true" CodeBehind="PrivacyPolicy.aspx.cs" Inherits="WebApplication1.PrivacyPolicy" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .PolicyMain { margin: 40px 0px 40px 0px; line-height: 31px; }
            .PolicyMain p { line-height: 20px; line-height: 31px; }
       .PolicyMain h4 { font-size: 23px;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <div class="container">
            <div class="raw">
                <div class="col-lg-12">
                    <div class="PolicyMain">
                        <h4>Privacy Policy
                        </h4>
                        <p>
                            We follow the best practises to protect your Personal Information from disclosure or misuse. We update our policy periodically without notice so it is recommended to check the same occasionally for any changes.
                        </p>
                        <h4>Information collected by us:
                        </h4>
                        <p>
                            Some of your personal information (such as Name, Contact Number, Email id, Home or Office Address, Credit Card Information) is provided by you when you subscribe to our services or express interest on them. While some of it is collected automatically (such as Network, IP Address, Domain name, Device Identifiers, Device Settings, browser, browser setting and much more) when you access our website or from the device which you use to access our website. 
                        </p>
                        <h4>Purpose of collecting Personal Information:
                        </h4>
                        We collect some of your Information so that we can<br />
                        <span>•	Conduct statistical research on feedback to improve our service.
                            <br />
                            •	Provide solution to queries raised by you.<br />
                            •	Advise you on any product/ service you expressed interest on.
                            <br />
                            •	Meet out compliance and regulatory requirements laid down by the law.<br />
                            •	Send periodic information about our latest offers.<br />
                            •	Notify you on the upcoming events.<br />
                        </span>
                        Please note that we have to disclose if legally required to do so by government agencies or law enforcement bodies.

                        
                        <h4>How we safeguard your Information:</h4>
                        <p>
                            We take utmost care to safeguard your information just in the way we do for our own. We maintain strict adherence to standard policies which includes technical and procedural steps to protect your data from misuse, unauthorized access or disclosure, loss, alteration, or destruction. Credit card information is transmitted using secure socket layer (SSL) encryption.
By entering your Personally Identifiable Information, you agree that we may store and use that information for our reference and also share with our third party partners who are in contract with us to use your information however it will be shared only on “need to know” basis. 
The information collected automatically is not to personally identify you but just to obtain the stats of visitors accessing our website. 

                        </p>
                        <h4>Privacy policy of other companies</h4>
                        <p>
                            This site may contain reference links to sites of some other companies with whom we have a business relationship. We advise you to read their privacy statements, as they may differ from ours. We shall not be held responsible for the privacy practices of the business partners.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
