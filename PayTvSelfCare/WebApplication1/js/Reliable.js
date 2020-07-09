var Reliable = new Array();
localStorage.setItem('ShortCodeLength', 10);
var LocalOnPassFun = null;
var LocalOnFailFun = null;
var FiledDataValue = "";
var currentMousePos = { x: -1, y: -1 };
var LogCommandName = '';
var HideSectionIds = undefined;
var ISListCalled = 0;

var MenuPermission = {
    FullAccess: 63,
    Deny: 0,
    AllowNew: 1,
    AllowEdit: 2,
    AllowDelete: 4,
    AllowView: 8,
    AllowExport: 16,
    AllowEditRefNo: 32
}

function MenuControlPermission(sender, chkvalue) {
    switch (sender) {
        case "A": return ((chkvalue & MenuPermission.AllowNew) == MenuPermission.AllowNew);
        case "E": return ((chkvalue & MenuPermission.AllowEdit) == MenuPermission.AllowEdit);
        case "D": return ((chkvalue & MenuPermission.AllowDelete) == MenuPermission.AllowDelete);
        case "V": return ((chkvalue & MenuPermission.AllowView) == MenuPermission.AllowView);
        case "Export": return ((chkvalue & MenuPermission.AllowExport) == MenuPermission.AllowExport);
        case "Refno": return ((chkvalue & MenuPermission.AllowEditRefNo) == MenuPermission.AllowEditRefNo);
        default: return false;
    }

}

$(window).load(function () {
    $(document).mousemove(function (event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });
});
function Emailvalidation(email) {
    if (trimAll(email).length > 0) {
        var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        if (!pattern.test(email)) return false;
        return true;

    }
    else
        return true;
}
function trimAll(sString) {
    while (sString.substring(0, 1) == ' ') {
        sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length - 1, sString.length) == ' ') {
        sString = sString.substring(0, sString.length - 1);
    }
    return sString;
}
Reliable = {
    parse: function parse(datastring) {
        //// <signature>
        ///   <summary>Parses The JSONString and replaces the blank values and also Converts the key in UpperCase As Well</summary>
        ///   <param name="datastring" type="JSON String">A JSON String which is to be Prased</param>
        /// </signature>
        datastring = datastring.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toUpperCase() + '":'); });
        datastring = datastring.replace(/&apos;/g, '\'');
        return JSONdata = JSON.parse(datastring, function (i, v) {
            return v === null ? '' : v;
        });
    },
    ClassParse: function parse(datastring) {
        //// <signature>
        ///   <summary>Parses The JSONString and replaces the blank values and also Converts the key in UpperCase As Well</summary>
        ///   <param name="datastring" type="JSON String">A JSON String which is to be Prased</param>
        /// </signature>
        return JSONdata = JSON.parse(datastring, function (i, v) {
            return v === null ? '' : v;
        });
    },
    Stringify: function Stringify(DataObject) {
        //// <signature>
        ///   <summary>Stringifies the DataObject and clears the blank spaces and Also replaces the Single Quote(') with Double Quotes ('').</summary>
        ///   <param name="DataObject" type="JSON Object">A JSON Object which is to be stringified</param>
        /// </signature>
        data = JSON.stringify(DataObject, function (k, v) {
            return v === "" ? "" : v;
        });
        return data = data.replace(/'/g, '&apos;').replace(/\\/g, '\\\\').replace(/"/g, "\"").replace(/\"/g, "\\\"");
    },
    ClearHistory: function ClearHistory(xglobal) {
        //// <signature>
        ///   <summary>clears the Histroy so user cannot use Browser Back And Forward Buttons.</summary>
        ///   <param name="xglobal" type="bool">A bool variable for yes or no</param>
        /// </signature>
        //window.history.forward(1);
        var cHFlag = xglobal.toLowerCase() == "true" ? true : false;
        if (cHFlag) {
            if (document.referrer.toString() == "" && location.href.split('?')[1] != "xx=\'x\'") {
                window.location = ('default.aspx');
            }
        }
    },
    BuildGrid: function (DataTable, Selector, ColTable, IsScroll, IsSortable, Sender, IsSearchEnabled, IsNavigationEnabled, TabType, CallerFunction, IsEditable, start, end, AllowModification, OneTimeOnly, IsHierarchy, ColorTable, IsValueEditable, EditFunction, DeleteFunction, AddFunction, ViewFunction, FileNameExport, IsTreeView, AllowChild, GridAcCode, AdvancedSearch, AddClickFunction, Caller, IsBlankGrid, IsColumnEdit, IsExportFile) {
        //// <signature>
        ///   <summary>Builds A grid for The Form data</summary>
        ///   <param name="DataTable" type="JSON">Datatable with type JSON That COntains All the data which is to be shown in the Grid.</param>
        ///   <param name="Selector" type="String">Specifies the Selector for the Grid. Write 'R' for Radio-button,'C' for Checkbox,'A' for Plus Sign to Add,'N' for none But will add an Hiddenfields</param>
        ///   <param name="ColTable" type="JSON">Datatable which only holds the column Headers and Default Grid Styling.</param>
        ///   <param name="IsScroll" type="Bool">A Bool variable that specifies that weither the grid is scrollable or not.</param>
        ///   <param name="IsSortable" type="Bool">A Bool variable that specifies that weither the grid is Sortable or not.</param>
        ///   <param name="Sender" type="String">A string that is the ID of the Div Which will Hold the Grid(Mostly to be used for Other Grids instead of Main Grid.)</param>
        ///   <param name="IsSearchEnabled" type="Bool">A Bool variable that specifies that weither the grid is Searchable or not.</param>
        ///   <param name="IsNavigationEnabled" type="Bool">A Bool variable that specifies that weither the grid has Navigation or not.</param>
        ///   <param name="TabType" type="Numeric">A Numeric Value that determines the Table Order of the Grid.</param>
        ///   <param name="CallerFunction" type="String">A String containing the name of the funciton which will be called on RowClick.</param>				
        ///   <param name="IsEditable" type="Bool">A Bool Value Specifying weither the Grid Is Editable or Not (to Add or remove Rows).</param>				
        ///   <param name="start" type="Numeric">A Numeric Value Specifying grid starting index.</param>		
        ///   <param name="end" type="Numeric">A Numeric Value Specifying grid ending index.</param>		
        ///   <param name="AllowModification" type="Bool">A Bool Value Specifying weither the Grid allow Modification(If Data is retrieved with true then the Grid will be in disable mode to enable and edit check the corresponding checkbox of Grid.).</param>		
        ///   <param name="OneTimeOnly" type="Bool">A Bool Value specifying weither the Grid Is One Time Call Or Not.).</param>		
        ///   <param name="IsHierarchy" type="Bool">A Bool Value specifying weither the Grid Is Hierarchal or Not.).</param>		
        ///   <param name="ColorTable" type="JSON">A JSON (Array[object]) Datatable specifying the color table for Hierarchal data.).</param>
        ///   <param name="IsValueEditable" type="Bool">A Bool Value specifying weither the Grid Is Editable or Not.).</param>
        ///   <param name="EditFunction" type="String">A String variable that contains the name of the Edit Function to Be Used on the Click of Edit in Grid.).</param>
        ///   <param name="DeleteFunction" type="String">A String variable that contains the name of the Delete Function to Be Used on the Click of Delete in Grid.).</param>
        ///   <param name="AddFunction" type="String">A String variable that contains the name of the Add Function to Be Used on the Click of Add in Grid.).</param>
        ///   <param name="ViewFunction" type="String">A String variable that contains the name of the View Function to Be Used on the Click of View in Grid.).</param>
        ///   <param name="FileNameExport" type="String">A String variable that contains the name of the File to Be Exported.</param>		
        ///   <param name="IsTreeView" type="Bool">A Bool variable that specify weither the grid is a tree-view Container or Not.</param>		
        ///   <param name="AllowChild" type="Bool">A Bool variable that specify weither the grid's tree-view child can be disabled by Default it is True.</param>				
        ///   <param name="GridAcCode" type="Numeric">A Numeric variable that specify which set of permission does the Grid have.</param>		
        ///   <param name="AdvancedSearch" type="Bool">A Bool variable that specify weither the grid's Advanced Search is Enabled or not by Default it is False.</param>		
        ///   <param name="AddClickFunction" type="String">A String variable that contains the name of the Add Function to Be Used on the Click of Add Seelctor in Grid.).</param>
        ///   <param name="Caller" type="String">name of caller</param>		
        ///   <param name="IsBlankGrid" type="bool">Show empty grid only header</param>		
        ///   <param name="IsColumnEdit" type="bool">Show column grid for the column selection</param>		

        /// </signature>
        var IsCalledFTime = Caller === undefined ? '0' : Caller;
        if (IsCalledFTime != "" && GridMenus[Sender + TabType] != 'N') {
            GridMenus[Sender + TabType] = 'Y';
        }
        if (GridMenus[Sender + TabType] == 'N') {
            var GridID = Sender === '' ? 'DyGrid' : Sender;
            var rowID = Sender == "" ? "DyGridRow" : Sender + "Row";
            var templatebfcol = "";
            var templatebscol = "";
            var RowState = 0;
            var tableid = Sender == '' ? 'Gridtable' : Sender + 'table';
            var tableUID = TabType + tableid;
            $('#' + GridID + '').find('tbody tr').remove('');
            start = start === undefined ? start = 0 : start == "" ? start = 0 : start = start;
            end = end === undefined ? end = Range : end === "" || typeof (end) == "" ? end = Range : end = end;
            if (DataTable == null)
                end = end;
            else if (DataTable.length == 0 || DataTable == null || null)
                end = end;
            else
                if (IsNavigationEnabled == false)
                    end = DataTable.length;
                else
                    end = end;
            var tabBody_body = $('<tbody/>');

            var tabBody_body_tr = $('<tr/>');
            var cnt = 1;
            if (Sender == "")
                tabBody_body_tr.attr('id', 'DyGridRow' + cnt);
            else
                tabBody_body_tr.attr('id', '' + Sender + 'Row' + cnt);
            var Template_row = $('<tr></tr>');
            $('#' + GridID + '').find('tbody').append($(Internal.BodyBuildGrid(GridID, rowID, Selector, DataTable, ColumnDataArray[tableUID], start, end, TabType, IsEditable, IsScroll, tabBody_body, tabBody_body_tr, Template_row, AllowModification, IsHierarchy, IsValueEditable, EditFunction, DeleteFunction, AddFunction, ViewFunction, Exportfilename, IsTreeView, AllowChild, GridAcCode, IsColumnEdit)).html());
            if (DataTable == null || DataTable.length == 0) {
                $('#' + GridID + 'body').html('');
                var dtcnt = JSLINQ(ColumnDataArray[tableUID]).Where(function (item, index) { return (ColumnDataArray[tableUID][parseInt(index)].VISIBLE == true); }, 0).SelectWithLength(function (item) { return item; }, 0).ToJSONObjectArray();
                $('#' + GridID + 'body').append('<tr><td colspan="' + parseInt(dtcnt.length + 2) + '"class="blank">No Record(s) found. Click Add new to Add Data.</td></tr>');
                $('#Nfirst').removeAttr('data-id').attr('data-id', 1)
                $('#Nlast').removeAttr('data-id').attr('data-id', 1);
                $(".midpg span:nth-of-type(2)").text('1');
                $(".midpg span:nth-of-type(3)").text('1');
            }
            else {
                Range = DataTable[0]['RECPERPAGE']
                var LastPage = parseFloat(DataTable[0]['TOTALCOUNT'] / Range);
                if (LastPage.toString() == "NaN") LastPage = 0;
                var intpagenum = LastPage - parseInt(LastPage);
                if (parseFloat(intpagenum) < 1)
                    LastPage = parseInt(LastPage) + 1;
                else
                    LastPage = Math.round(LastPage);
                $('#cstrange').val(Range);
                $(".midpg span:nth-of-type(2)").text('' + DataTable[0]['PAGENO'] + '');
                $(".midpg span:nth-of-type(3)").text('' + LastPage + '');
                $('#Nfirst').removeAttr('data-id').attr('data-id', DataTable[0]['PAGENO'])
                $('#Nlast').removeAttr('data-id').attr('data-id', LastPage);
            }
            $('#' + GridID + '').find('table').attr({ 'data-isdbcalled': ColTable[0]['ISDBCALLED'], 'data-gridcaller': Caller, 'data-criteria': ReliableGridVariables.Criteria, 'data-sortcriteria': ReliableGridVariables.SortCriteria, 'data-tcount': DataTable[0]['TOTALCOUNT'], 'data-entityid': ColTable[0]['ENTITYID'] });
        }
        else {
            GridMenus[Sender + TabType] = 'N';
            if (Reliable.CurrMenuID != "412")
                RowTemplate = new Array();
            Internal.BuildGrid(DataTable, Selector, ColTable, IsScroll, IsSortable, Sender, IsSearchEnabled, IsNavigationEnabled, TabType, CallerFunction, IsEditable, start, end, AllowModification, OneTimeOnly, IsHierarchy, ColorTable, IsValueEditable, EditFunction, DeleteFunction, AddFunction, ViewFunction, FileNameExport, IsTreeView, AllowChild, GridAcCode, AdvancedSearch, AddClickFunction, Caller, IsBlankGrid, IsColumnEdit, IsExportFile);
        }
    },
    CustomGrid: function (DataTable, ColTable, Caller, TabType, RowCount, Sender, IsEditable) {
        //// <signature>
        ///   <summary>Builds A Custom Grid With Custom Controls</summary>
        ///   <param name="DataTable" type="JSON">Datatable with type JSON That COntains All the data which is to be shown in the Grid.</param>
        ///   <param name="ColTable" type="JSON">Datatable which only holds the column Headers and Default Grid Styling.</param>
        ///   <param name="Caller" type="Numeric">Specifies the Table Number from column Table</param>
        ///   <param name="TabType" type="Numeric">Specifies the Table Number for CustomGrid through Proerty table.</param>
        ///   <param name="RowCount" type="Numeric">Specifes the number of rows to be added.</param>		
        ///   <param name="Sender" type="String">This string contains the ID of Sender to which the grid is to be build.</param>
        ///   <param name="IsEditable" type="Bool">A Bool Value Specifying weither the Grid Is Editable or Not (to Add or remove Rows).</param>	
        /// </signature>
    },
    AddOption: function (text, value, control) {
        //// <signature>
        ///   <summary>Add Option Control the Given Select Control(Asp.net Or Html)</summary>
        ///   <param name="text" type="String">A Text of type String Which is to Be Shown in the Option</param>
        ///   <param name="value" type="Integer">A Value of type String Which is to Be Shown in the Option</param>
        ///   <param name="control " type="String">A Control ID which Specifies the Control.</param>
        /// </signature>
    },
    WebMethodData: {
        PushData: function push(name, value) {
        }
    },
    CallWebMethod: function CallWebFunction(MethodName, Data, SaveFunction, FailFunction, SetProgressbar) {
        //// <signature>
        ///   <summary>Calls a Webmethod from Server through Javascript.</summary>
        ///   <param name="MethodName" type="String">WebMethodName in String which is to be called(Case Sensitive).</param>
        ///   <param name="Data" type="JSON">JSON format string which is to be passed to the WebMethod.</param>
        ///   <param name="SaveFunction" type="handler">A Handler function which to be called when the WebMethod Passes.Returns Result.</param>
        ///   <param name="FailFunction" type="handler">A Handler function which to be called when the WebMethod Fails.Returns Result.</param>
        ///   <param name="SetProgressbar" type="Bool">A true Or false value specifies that weither to show progressbar or not.</param>
        /// </signature>
    },
    ReliableddlSet: function (Selector, Value) {
        //// <signature>
        ///   <summary>Sets the Value in the Reliable Select Box from Alredy Existing Data.</summary>
        ///   <param name="Selector" type="String">Name of the Select Box.</param>
        ///   <param name="Value" type="String">Value of Which Is to be Set.</param>
        /// </signature>
    },
    EventType: function (e) {
        //// <signature>
        ///   <summary>Rerturns Character Code in Javascript for the given Event.</summary>
        ///   <param name="e" type="event">An Event is To Be Passed.</param>		
        /// </signature>
        e = event || e;
        var Returntype = "";
        return Returntype = typeof e.type !== "undefined" ? e.type : e.type;
    },

    AddChildDataGrid: function (RowID, TabType, DataTable, GridID, Columns, CellIndex, CallerID, AllowModification) {
        //// <signature>
        ///   <summary>Appends a Child Grid to the Given Row.</summary>
        ///   <param name="RowID" type="String">A string containing the RowID to which the Grid is to be appended.</param>				
        ///   <param name="TabType" type="Numeric">An Numeric value Specifying the Table Number of the Child Table.</param>		
        ///   <param name="DataTable" type="JSON Data">A table containing the Data for the Child Table.</param>		
        ///   <param name="GridID" type="String">A string containg the Following Grid ID.</param>		
        ///   <param name="Columns" type="JSON Data">A datatable for the Columns.</param>		
        ///   <param name="CellIndex" type="Numeric">A numeric Value that specifies the Cell Index oF Caller.</param>		
        ///   <param name="CallerID" type="String">A String Value that specifies the ID of the Caller.</param>	
        ///   <param name="AllowModification" type="Bool">A Bool Value Specifying weither the Grid allow Modification(If Data is retrieved with true then the Grid will be in disable mode to enable and edit check the corresponding checkbox of Grid.).</param>		
        /// </signature>
    },
    AddChildGrid: function (RowID, TabType, Rows, GridID, Columns, CellIndex, CallerID, AllowModification) {
        //// <signature>
        ///   <summary>Appends a Child Grid to the Given Row.</summary>
        ///   <param name="RowID" type="String">A string containing the RowID to which the Grid is to be appended.</param>				
        ///   <param name="TabType" type="Numeric">An Numeric value Specifying the Table Number of the Child Table.</param>		
        ///   <param name="Rows" type="Numeric">A Numeric value defining the Numnber of Rows to Be Added.</param>		
        ///   <param name="GridID" type="String">A string containg the Following Grid ID.</param>		
        ///   <param name="Columns" type="JSON Data">A datatable for the Columns.</param>		
        ///   <param name="CellIndex" type="Numeric">A numeric Value that specifies the Cell Index oF Caller.</param>		
        ///   <param name="CallerID" type="String">A String Value that specifies the ID of the Caller.</param>
        ///   <param name="AllowModification" type="Bool">A Bool Value Specifying weither the Grid allow Modification(If Data is retrieved with true then the Grid will be in disable mode to enable and edit check the corresponding checkbox of Grid.).</param>		
        /// </signature>
    },
    AddRow: function (GridID, CallerID, Rows) {
        //// <signature>
        ///   <summary>Adds a New Row to the grid At The Bottom.</summary>
        ///   <param name="GridID" type="String">A string containing the ID of Grid to which the Grid is to Appended.</param>				
        ///   <param name="CallerID" type="String">A string containing the Id of the Caller TD Element.</param>
        ///   <param name="Rows" type="Numeric">A Numeric Value Specifying the Number of rows to be added at once(leave blank of not defined).</param>
        /// </signature>
    },
    DeleteRow: function (GridID, RowID) {
        //// <signature>
        ///   <summary>Delete's the Current Row from the Grid.</summary>
        ///   <param name="GridID" type="String">A string containing the ID of Grid to which the Grid whose row is to be Deleted.</param>				
        ///   <param name="RowID" type="String">A string containing the RowID of which the Row is to be Deleted.</param>
        /// </signature>
    },
    SetCriteria: function (sCriteria) {
        //// <signature>
        ///   <summary>It sets the criteria for the list</summary>
        ///   <param name="sCriteria" type="String">A string containing the criteria that is to be set.</param>						
        /// </signature>
    },
    ReliableddlClear: function (ID) {
        //// <signature>
        ///   <summary>This Function Clears the Modified Select Box</summary>
        ///   <param name="ID" type="String">A string containing the ID of the select box which is to be cleared.</param>					    
        /// </signature>
    },
    ReliableGetDate: function (type) {
        //// <signature>
        ///   <summary>This Function returns the date in String Format</summary>
        ///   <param name="type" type="String">A string containg the type of the Date format either (S) dd-MMM-yy or (M) dd-MMMM-yy</param>					    
        /// </signature>
    },
    SetCurCompID: function ()
    { },
    SetCurPassword: function ()
    { },
    SetRefSeqno: function (Type, Value) {
        //// <signature>
        ///   <summary>This Function Sets the Retrieved Refrence Sequence No</summary>
        ///   <param name="Type" type="String">A string contaning the type of the data to be appended.</param>					    
        ///   <param name="Value" type="String">A string containg the value of the data to be appended.</param>					    
        /// </signature>
    },
    SetContentPage: function (PageUrl, CallerUrl) {
        //// <signature>
        ///   <summary>This Function Sets the Page Url for the Content Page.</summary>
        ///   <param name="PageUrl" type="Array">An Array containing the Url(s) of the Page to be appended. Ex.(url1,url2,url3.......n)</param>					    		
        ///   <param name="CallerUrl" type="String">A String containing the Url of the Caller Page.</param>					    		
        /// </signature>
        var bdiv = $('<div id="blankDiv" style="display:none;"></div>');
        var MenuID = "";
        $(document).find('body').append(bdiv);
        if (PageUrl.length > 1)
            if (CallerUrl.URL !== undefined)
                PageUrl.unshift(CallerUrl.URL + '|#blankDiv');
            else
                PageUrl.unshift(CallerUrl + '|#blankDiv');
        if (PageUrl !== undefined)
            if (PageUrl.length > 1) {
                var Count = PageUrl.length, CurCount = 0;
                if (PageUrl[1].indexOf('..') >= 0 && PageUrl[1].indexOf('|') >= 0) {
                    function MultiLoad() {
                        if (CurCount < PageUrl.length) {
                            var url = PageUrl[CurCount].split('|')[0];
                            var CallerDiv = PageUrl[CurCount].split('|')[1];
                            if (PageUrl[CurCount].split('|').length > 2)
                                MenuID = PageUrl[CurCount].split('|')[2];
                            $.get(url, function (content) {
                                var Div = $('<div></div>');
                                $(Div).html(content);
                                $('#ContentContainerDiv').append($(Div).find(CallerDiv));
                                MultiLoad();
                                Count--;
                                CurCount++;
                            });
                            if (MenuID != "")
                                MenuAccessCode(MenuID);
                        }
                    }
                    MultiLoad();
                    Reliable.SetBasic();
                }
            }
            else {
                var url = PageUrl[0].split('|')[0];
                var CallerDiv = PageUrl[0].split('|')[1];

                if (PageUrl[0].split('|').length > 2)
                    MenuID = PageUrl[0].split('|')[2];
                try {

                } catch (e) {

                }
                $('#ContentContainerDiv').load(url, function (response, status, xhr) {
                    if (status == "error") {
                        var msg = "Sorry but there was an error: ";
                        $("#error").html(msg + xhr.status + " " + xhr.statusText);
                    }
                    var callerfunction = 'LoadNew' + CallerUrl + 'Data';
                    var callfun = window[callerfunction.toString()];
                    var param = [''];

                    callfun.apply(null, param);
                });
                //$.get(url, function (content)
                //{
                //    var Div = $('<div></div>');
                //    $(Div).html(content);
                //    $('#ContentContainerDiv').append($(Div).find(CallerDiv));
                //    Reliable.SetBasic();
                //});
                if (MenuID != "")
                    MenuAccessCode(MenuID);
            }
    },
    SetContentPageInUnderpage: function (PageUrl, CallerUrl) {
        //// <signature>
        ///   <summary>This Function Sets the Page Url for the Content Page.</summary>
        ///   <param name="PageUrl" type="Array">An Array containing the Url(s) of the Page to be appended. Ex.(url1,url2,url3.......n)</param>					    		
        ///   <param name="CallerUrl" type="String">A String containing the Url of the Caller Page.</param>					    		
        /// </signature>
        var bdiv = $('<div id="blankDiv" style="display:none;"></div>');
        var MenuID = "";
        $(document).find('body').append(bdiv);
        if (PageUrl.length > 1)
            if (CallerUrl.URL !== undefined)
                PageUrl.unshift(CallerUrl.URL + '|#blankDiv');
            else
                PageUrl.unshift(CallerUrl + '|#blankDiv');
        if (PageUrl !== undefined)
            if (PageUrl.length > 1) {
                var Count = PageUrl.length, CurCount = 0;
                if (PageUrl[1].indexOf('..') >= 0 && PageUrl[1].indexOf('|') >= 0) {
                    function MultiLoad() {
                        if (CurCount < PageUrl.length) {
                            var url = PageUrl[CurCount].split('|')[0];
                            var CallerDiv = PageUrl[CurCount].split('|')[1];
                            if (PageUrl[CurCount].split('|').length > 2)
                                MenuID = PageUrl[CurCount].split('|')[2];
                            $.get(url, function (content) {
                                var Div = $('<div></div>');
                                $(Div).html(content);
                                $('#ContentContainerDivAction').append($(Div).find(CallerDiv));
                                MultiLoad();
                                Count--;
                                CurCount++;
                            });
                            if (MenuID != "")
                                MenuAccessCode(MenuID);
                        }
                    }
                    MultiLoad();
                    Reliable.SetBasic();
                }
            }
            else {
                var url = PageUrl[0].split('|')[0];
                var CallerDiv = PageUrl[0].split('|')[1];

                if (PageUrl[0].split('|').length > 2)
                    MenuID = PageUrl[0].split('|')[2];
                $.get(url, function (content) {
                    var Div = $('<div></div>');
                    $(Div).html(content);
                    $('#ContentContainerDivAction').append($(Div).find(CallerDiv));
                    Reliable.SetBasic();
                    setcontrol();
                });
                if (MenuID != "")
                    MenuAccessCode(MenuID);
            }
    }
	, SetBasic: function () {
	    //// <signature>
	    ///   <summary>This Function Sets the basic features of the Content Page.</summary>					    		
	    /// </signature>
	    setToolTip();
	    ///<summary>Here we bind the keyup function for autocomp calling from the input[type=text]</summary>
	    $('.rel-dialog,#ContentContainerDivAction').find('button[data-icon="Reset"]').unbind('blur').on('blur', function () {
	        $('.rel-dialog,#ContentContainerDivAction').find('input:not([disabled="disabled"]):first').focus();
	    });
	    $('.ui-body ,#ContentContainerDivAction').find('.spanico').find('.rel-ic-bars').unbind('click').on('click', function (e) {
	        var control = $(this).closest('div').find('input[type="text"]');
	        try {
	            if ($(control).data('defined')) {
	                var callFun = window[$(control).data('definedcaller') + 'Criteria'];
	                var param = ['' + $(control).data('listcallby') + '', '' + $(control).attr('id') + ''];
	                callFun.apply(null, param);
	            }
	            else
	                Criteria($(control).data('listcallby'), '' + $(control).attr('id') + '').once();
	        }
	        catch (exp)
	        { }
	        var ListStatus = "";
	        if ($(control).data('liststatus') !== undefined)
	            ListStatus = $(control).data('liststatus');
	        else
	            ListStatus = true;
	        if (ListStatus == true || ListStatus == "Start") {
	            var dblclick = $('#' + control.id + '').data('calllist');
	            if ($(control).data('calllist') && $(control).data('listcallby') != "") {
	                if (Global.KeyCode(e) == 113 || (dblclick !== undefined || dblclick != "") && ListStatus) {
	                    //OpenList($(this).data('listcallby'), '' + control.id + '');
	                    RelListAutoComp.OpenList($(control).data('listcallby'), '' + $(control).attr('id') + '', $(control).data('multilist'), e);
	                }
	            }
	        }
	    });

	    $('.ui-body ,#ContentContainerDivAction').find('input[type=text]').unbind('keyup').on('keyup', function (e) {
	        var charCode = Global.KeyCode(e);
	        var control = this;
	        var KeyupFun = $('#' + control.id + '').data('callauto');
	        if (Global.KeyCode(e) != 38 && Global.KeyCode(e) != 40 && Global.KeyCode(e) != 13 && Global.KeyCode(e) != 9 && Global.KeyCode(e) != 16 && Global.KeyCode(e) != 113)
	            if ($(this).data('callauto') && $(this).data('listcallby') != "" && (KeyupFun !== undefined || KeyupFun != '')) {
	                try {
	                    if ($(this).data('defined')) {
	                        var callFun = window[$(this).data('definedcaller') + 'Criteria'];
	                        var param = ['' + $(this).data('listcallby') + '', '' + $(control).attr('id') + ''];
	                        callFun.apply(null, param);
	                    }
	                    else
	                        Criteria($(this).data('listcallby'), '' + $(control).attr('id') + '').once();
	                }
	                catch (exp)
	                { }

	                var ListStatus = "";
	                if ($(control).data('liststatus') !== undefined)
	                    ListStatus = $(control).data('liststatus');
	                else
	                    ListStatus = true;
	                if (ListStatus == true || ListStatus == "Start") {
	                    var KeyupFun = $('#' + control.id + '').data('callauto');
	                    if ($(this).data('callauto') && $(this).data('listcallby') != "" && (KeyupFun !== undefined || KeyupFun != '')) {

	                        if (Global.KeyCode(e) != 38 && Global.KeyCode(e) != 40 && Global.KeyCode(e) != 13 && Global.KeyCode(e) != 9 && Global.KeyCode(e) != 16)
	                            RelListAutoComp.OpenAutoComp($(this).data('listcallby'), '' + control.id + '', e);
	                        // AutoComplete($(this).data('listcallby'), '' + control.id + '');
	                    }
	                }
	            }
	    });
	    //$('.ui-body ,#ContentContainerDivAction').find('input[type=text]').unbind('keydown').on('keydown', function (e) {
	    $('.ui-body').find('input[type=text]').unbind('keydown').on('keydown', function (e) {
	        var charCode = Global.KeyCode(e);
	        var control = this;
	        var HiddendataID = "";
	        if (Global.KeyCode(e) == 113 && e.shiftKey == false && Global.KeyCode(e) != 9) {
	            if (ISListCalled == 0) {
	                ISListCalled = 1;
	                try {
	                    //var dblclick = $('#' + control.id + '').data('calllist');
	                    //var KeyupFun = $('#' + control.id + '').data('callauto');

	                    try {
	                        if ($(this).data('defined')) {
	                            var callFun = window[$(this).data('definedcaller') + 'Criteria'];
	                            var param = ['' + $(this).data('listcallby') + '', '' + $(control).attr('id') + ''];
	                            callFun.apply(null, param);
	                        }
	                        else
	                            Criteria($(this).data('listcallby'), '' + $(control).attr('id') + '').once();
	                    }
	                    catch (exp)
	                    { }

	                    var ListStatus = "";
	                    if ($(control).data('liststatus') !== undefined)
	                        ListStatus = $(control).data('liststatus');
	                    else
	                        ListStatus = true;
	                    if (ListStatus == true || ListStatus == "Start") {
	                        var dblclick = $('#' + control.id + '').data('calllist');
	                        if ($(this).data('calllist') && $(this).data('listcallby') != "") {
	                            if (Global.KeyCode(e) == 113 || (dblclick !== undefined || dblclick != "")) {
	                                //OpenList($(this).data('listcallby'), '' + control.id + '');
	                                RelListAutoComp.OpenList($(this).data('listcallby'), '' + $(control).attr('id') + '', $(this).data('multilist'), e);
	                            }
	                        }
	                    }

	                    if (Global.KeyCode(e) == 13 || Global.KeyCode(e) == 186 || Global.KeyCode(e) == 192 || Global.KeyCode(e) == 49 || (Global.KeyCode(e) >= 51 && Global.KeyCode(e) <= 56) || Global.KeyCode(e) == 187) //this disallows special characters in text-field
	                    {
	                        if (e.shiftKey != false)
	                            return false;
	                        else
	                            return true;
	                    }
	                    if (Global.KeyCode(e) == 8 && $(this)[0].value != "") {
	                        //HiddendataID = control.dataset.caller;
	                        $('#' + control.dataset.caller + '').val('0');
	                        return true;
	                    }
	                    if (Global.KeyCode(e) == 8 && $(this)[0].value == "")
	                        return false;
	                    //else
	                    //{
	                    //	if (KeyupFun != '' || typeof KeyupFun !== undefined)
	                    //	{
	                    //		try
	                    //		{
	                    //			Criteria($('#' + control.id + '').data('listcallby'));
	                    //		}
	                    //		catch (exp)
	                    //		{ }
	                    //		OpenAutoComp($('#' + control.id + '').data('listcallby'), '' + control.id + '');
	                    //	}
	                    //}


	                }
	                catch (e)
	                { }
	                ISListCalled = 0;
	            }
	        }

	    });

	    ///<summary>Here we Catch the focused element</summary>
	    $('.rel-dialog,#ContentContainerDivAction').find('input,span,a,table,textarea,ul,li,div,.btnCls').unbind('focus').on('focus', function () {

	        FocusedElement = this;

	        $(this).attr('autocomplete', 'false');
	    });


	    $('.rel-dialog,#ContentContainerDivAction').find('.txtNumcp').unbind('blur').on('blur', function () {
	        if (!$.isNumeric(this.value))
	            this.value = "";
	    });
	    //$('.tagline:contains("Show/Hide")').unbind('click').on('click', function () {
	    //    $('#' + $(this).next().attr('id') + '').toggle();
	    //    icon = $(this).find("i");
	    //    icon.toggleClass("rel rel-ic-angle-up rel rel-ic-angle-down");
	    //});
	    $('.ui-body ,#ContentContainerDivAction').find('.tagline:contains("Show/Hide")').unbind('click').on('click', function () {
	        $('#' + $(this).next().attr('id') + '').toggle();
	        if ($('#' + $(this).next().attr('id') + '').css('display') == "block") {
	            $('#' + $(this).next().attr('id') + '').css({ 'border-right': '1px solid rgb(38, 114, 236)', 'border-left': '1px solid rgb(38, 114, 236)', 'border-bottom': '1px solid rgb(38, 114, 236)', 'margin-left': '0.6%' });
	            $(this).css({ 'border-right': '1px solid rgb(38, 114, 236)', 'border-left': '1px solid rgb(38, 114, 236)', 'border-top': '1px solid rgb(38, 114, 236)' });
	        }
	        else {
	            $(this).find('span').css({ 'background-color': 'transparent', 'padding': '5px', 'font-weight': '600' });
	            $(this).css({ 'border': 'none' });
	        }
	        icon = $(this).find("i");
	        icon.toggleClass("rel rel-ic-angle-up rel rel-ic-angle-down");
	    });
	    $('.ui-body ,#ContentContainerDivAction').find('.tagline:contains("Show/Hide")').each(function () {

	        if ($('#' + $(this).next().attr('id') + '').css('display') == "block") {
	            $('#' + $(this).next().attr('id') + '').css({ 'border-right': '1px solid rgb(38, 114, 236)', 'border-left': '1px solid rgb(38, 114, 236)', 'border-bottom': '1px solid rgb(38, 114, 236)', 'margin-left': '0.6%' });
	            $(this).css({ 'border-right': '1px solid rgb(38, 114, 236)', 'border-left': '1px solid rgb(38, 114, 236)', 'border-top': '1px solid rgb(38, 114, 236)' });
	        }
	        else {
	            $(this).find('span').css({ 'background-color': 'transparent', 'padding': '5px', 'font-weight': '600' });
	            $(this).css({ 'border': 'none' });
	        }

	    });
	    ///<summary>Here we bind the dbclick function for list calling from the input[type=text]</summary>	
	    $('.rel-dialog,#ContentContainerDivAction').find('input[type=text]').unbind('dblclick').on('dblclick', function (e) {
	        //event.preventDefault();
	        var charCode = Global.KeyCode(e);
	        var control = this;
	        try {
	            if ($(this).data('defined')) {
	                var callFun = window[$(this).data('definedcaller') + 'Criteria'];
	                var param = ['' + $(this).data('listcallby') + '', '' + $(control).attr('id') + ''];
	                callFun.apply(null, param);
	            }
	            else
	                Criteria($(this).data('listcallby'), '' + $(control).attr('id') + '').once();
	        }
	        catch (exp)
	        { }
	        var ListStatus = "";
	        if ($(control).data('liststatus') !== undefined)
	            ListStatus = $(control).data('liststatus');
	        else
	            ListStatus = true;
	        if (ListStatus == true || ListStatus == "Start") {
	            var dblclick = $('#' + control.id + '').data('calllist');
	            if ($(this).data('calllist') && $(this).data('listcallby') != "") {
	                var eventwhich = Global.KeyCode(e);
	                if (eventwhich == 113 || (dblclick !== undefined || dblclick != "")) {
	                    RelListAutoComp.OpenList($(this).data('listcallby'), '' + $(control).attr('id') + '', $(this).data('multilist'), e);
	                }
	            }
	        }

	    });
	    $('.rel-dialog,#ContentContainerDivAction').find('input[type=text]').each(function ()//This Clear Every Input With type="text"
	    {
	        $(this).attr('onfocus', 'javascript:oninputFocus(this.id);');
	    });

	    $('.rel-dialog,#ContentContainerDivAction').find('.block-Full,.block-2td,.block,.block-half,.subBlock,.subBlock-2td,.subBlock-half,.subBlock-9td').on('focusin', 'input', function () {
	        $(this).parent().find('label').addClass('LabelOdd-big-focus').removeClass('LabelOdd-big');
	        $(this).animate({ 'border-bottom': '1px solid rgb(38, 114, 236)!important' }, 'fast');
	        $(this).addClass('lblin-focus');
	        if ($(this).attr('data-popup') !== undefined)
	            $(this).attr('placeholder', 'Press F8 to Add ' + $(this).parent().find('label').text() + '');

	        //work for showhide details
	        var text = '';
	        if ($(this).attr('data-popup') !== undefined)
	            text = ' * Press F8 to Add ' + $(this).parent().find('label').text() + '';
	        if ($(this).attr('data-calllist'))
	            text += ' * Press F2 or Double click to Open ' + $(this).parent().find('label').text() + '';
	        if ($(this).attr('data-popup') == undefined && $(this).attr('data-calllist') == undefined)
	            text = ' * Enter ' + $(this).parent().find('label').text() + '';
	        $('#divmaintext').find('p').text(text);
	        if ($(this).closest('.block').hasClass('disabled'))
	            $(this).attr('disabled', true)
	    });

	    $('.rel-dialog,#ContentContainerDivAction').find('.block-Full,.block-2td,.block,.block-half,.subBlock,.subBlock-2td,.subBlock-half,.subBlock-9td ').on('focusout', '.txtinp', function () {
	        $(this).attr('placeholder', '');
	        if ($(this).val().trim() == '')
	            $(this).parent().find('label').removeClass('LabelOdd-big-focus').addClass('LabelOdd-big');

	        $(this).removeClass('lblin-focus');
	        true;
	    });
	    //#region [Work for disabled Radio and checkbox]
	    //$('input[type="radio"],input[type="checkbox"]').unbind('click').on('click', function ()
	    //{
	    //	if ($(this).closest('div').hasClass('disabled'))
	    //	{
	    //		return false;
	    //	}
	    //	else
	    //		return true;
	    //});
	    //#endregion
	    $('.rel-dialog').find('.txtDate').each(function () {
	        $('#' + $(this).data('targetid') + '').unbind('blur').on('blur', function () {
	            var dtValue = $(this).val();
	            var dtRegex = new RegExp("^([0]?[1-9]|[1-2]\\d|3[0-1])-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-[1-2]\\d{3}$", 'i');
	            if (!dtRegex.test(dtValue))
	                $(this).val('');
	        });
	    });
	    //$('.rel-dialog,#ContentContainerDivAction').find('#' + $('.rel-dialog').find('.txtDate').data('targetid') + '').unbind('blur').on('blur', function () {
	    //    var dtValue = $(this).val();
	    //    var dtRegex = new RegExp("^([0]?[1-9]|[1-2]\\d|3[0-1])-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-[1-2]\\d{3}$", 'i');
	    //    if (!dtRegex.test(dtValue))
	    //        $(this).val('');
	    //});
	    $('.rel-dialog').find('.txtDate').each(function () {
	        $('#' + $(this).data('targetid') + '').unbind('keyup').on('keyup', function () {
	            var len = $(this).val().length;
	            if (len > 11)
	                $(this).val($(this).val().slice(0, 11));
	            else if (len == 1) {
	                if ("0,1,2,3".indexOf($(this).val()) == -1)
	                    $(this).val("");
	            }
	            else if (len == 2) {
	                if ("0,1,2,3,4,5,6,7,8,9".indexOf($(this).val().slice(1, 2)) == -1 && $(this).val() < 31)
	                    $(this).val($(this).val().slice(0, 1));
	                else
	                    $(this).val($(this).val() + "-");
	            }
	            else if (len == 3) {
	                if ($(this).val().slice(2, 3) != "-")
	                    $(this).val($(this).val().slice(0, 2) + "-");
	            }
	            else if (len == 4) {
	                if ("J,j,F,f,M,m,A,a,S,s,O,o,N,n,D,d".indexOf($(this).val().slice(3, 4)) == -1)
	                    $(this).val($(this).val().slice(0, 3));
	            }
	            else if (len == 5) {
	                if ("A,a,F,f,P,p,U,u,E,e,C,c,O,o".indexOf($(this).val().slice(4, 5)) == -1)
	                    $(this).val($(this).val().slice(0, 4));
	            }
	            else if (len == 6) {
	                if ("N,n,B,b,R,r,Y,y,N,n,L,l,G,g,P,p,T,t,V,v,C,c".indexOf($(this).val().slice(5, 6)) == -1)
	                    $(this).val($(this).val().slice(0, 5));
	                else
	                    $(this).val($(this).val() + "-");
	            }
	            else if (len == 7) {
	                if ($(this).val().slice(6, 7) != "-")
	                    $(this).val($(this).val().slice(0, 6) + "-");
	            }
	            else if (len == 8) {
	                if ("1,2".indexOf($(this).val().slice(7, 8)) == -1)
	                    $(this).val($(this).val().slice(0, 7));

	            }
	            else if (len == 9) {
	                if ("0,1,2,3,4,5,6,7,8,9".indexOf($(this).val().slice(8, 9)) == -1)
	                    $(this).val($(this).val().slice(0, 8));

	            }
	            else if (len == 10) {
	                if ("0,1,2,3,4,5,6,7,8,9".indexOf($(this).val().slice(9, 10)) == -1)
	                    $(this).val($(this).val().slice(0, 9));

	            }
	            else if (len == 11) {
	                if ("0,1,2,3,4,5,6,7,8,9".indexOf($(this).val().slice(10, 11)) == -1)
	                    $(this).val($(this).val().slice(0, 10));

	            }
	        });
	    });


	    $('.block-Full,.block-2td,.block,.block-half').each(function () {
	        if ($(this).find('input[type=text]').attr('disabled') != 'disabled' && (!$(this).hasClass('text-Content-ddl')))
	            if ($(this).find('input[type=text]').attr('data-calllist') !== undefined) {
	                $(this).find('label').attr('data-placeholder', 'Double click to open ');
	            }
	            else {
	                $(this).find('label').attr('data-placeholder', 'Enter ');
	            }
	    });
	    //$('span[data-open="open"]').unbind('click').on('click', function ()
	    //{
	    //    OpenSubsActionDiv($(this).closest('div').parent().prev()[0], 0);
	    //});
	    //$('div[data-open="open"]').unbind('click').on('click', function ()
	    //{
	    //    OpenSubsActionDiv(this, 1);
	    //});

	    CallAutoDocType();
	}
    , SetCompany: function (CompanyName, CompID) {
        //// <signature>
        ///   <summary>This Function Sets the Company Name and CompanyID.</summary>	
        ///   <param name="CompanyName" type="String">A  String containing the ID of Company Name.</param>					    		
        ///   <param name="CompID" type="String">A  String containing the ID of Company ID.</param>	
        /// </signature>
        $('#' + CompanyName + '').val(localStorage.getItem('LoggedInComp'));
        $('#' + CompID + '').val(localStorage.getItem('CurrentCompID'));
    }
    , SetFinYear: function (FinYear, FinYearID) {
        //// <signature>
        ///   <summary>This Function Sets the FinYear and FinYearID.</summary>	
        ///   <param name="FinYear" type="String">A  String containing the FinYear.</param>					    		
        ///   <param name="FinYearID" type="String">A  String containing the ID of Finyear.</param>	
        /// </signature>
        $('#' + FinYear + '').val(localStorage.getItem('CurrentFinYear'));
        $('#' + FinYearID + '').val(localStorage.getItem('CurrentFinYearID'));
    }
    , SetEmployee: function (Employee, EmployeeID) {
        //// <signature>
        ///   <summary>This Function Sets the Employee and EmployeeID.</summary>	
        ///   <param name="Employee" type="String">A  String containing the Employee.</param>					    		
        ///   <param name="EmployeeID" type="String">A  String containing the ID of Employee.</param>	
        /// </signature>
        $('#' + Employee + '').val(localStorage.getItem('CurrentEmpName'));
        $('#' + EmployeeID + '').val(localStorage.getItem('CurrentEmpID'));
    }
    , ResetForm: function (caller) {
        caller = caller === undefined ? 'dialogState' : caller;

        $('#' + caller + '').find('input[type=text]:not([data-reset="false"])').each(function ()//This Clear Every Input With type="text"
        {
            //// <signature>
            ///   <summary>This Function Resets the contents of the Div.</summary>	
            ///   <param name="caller" type="String">Name of the Content Div.</param>					    		
            /// </signature>
            $(this).val('');
            $(this)[0].style['border-color'] = "";//this clears the error color of the textbox		
            $('#error_' + $(this)[0].id + '').css('visibility', 'hidden');//to hide the error notifier
            //$('*[data-' + $(this).data('internal') + ']', '0');//to clear the data attribute value
        });
        //$('#' + caller + '').find('input:checkbox').removeAttr('checked');
        if ($('#' + caller + '').find('input:radio').length > 0)
            $('#' + caller + '').find('input:radio').removeAttr('checked');
        if ($('#' + caller + '').find('.Reliableddl').length > 0)
            $('#' + caller + '').find('.Reliableddl').each(function () {
                Reliable.ReliableddlClear($(this).find('select').attr('id'));
            });
        $('#' + caller + '').find('input[type=hidden]:not([data-reset="false"])').val('0');
        $('.block-error').removeClass('block-error');
        if ($('.autoListLoading').length > 0)
            $('.autoListLoading').remove();
        SetfocusInAll(caller);
    }
    , ReliableddlReset: function (ID) {
        //// <signature>
        ///   <summary>This Function Resets the Modified Select Box to its Initial State</summary>
        ///   <param name="ID" type="String">A string containing the ID of the select box which is to be cleared.</param>					    
        /// </signature>
    }
	, CreateCheckBoxRadio: function (id, attribute, AppendTo, Type, Text) {
	    //// <signature>
	    ///   <summary>This Function Creates the Modified Checkbox/radioButton and Append to Given Control.</summary>
	    ///   <param name="id" type="String">A string containing the ID for the Checkbox/radioButton which is to be appended.</param>					    
	    ///   <param name="Attribute" type="array">A string containing the Attributes for the Checkbox/radioButton which is to be appended.</param>					    
	    ///   <param name="AppendTo" type="String">An String containing the CallerDiv or control for the Checkbox/radioButton which is to be appended.</param>					    
	    ///   <param name="Type" type="String">A string containing the Type for the Checkbox/radioButton which is to be appended(R for RadioButton and C for CHeckbox).</param>					    
	    ///   <param name="Text" type="String">A string containing the Text for the Checkbox/radioButton which is to be appended(R for RadioButton and C for CHeckbox).</param>					    
	    /// </signature>

	    if (Type !== undefined) {
	        if (Type.toString().toLowerCase() == 'r') {
	            var Div = $('<div class="radio"></div>');
	            Text = Text === undefined ? Text = '' : Text = Text;
	            if ($('' + AppendTo + '').find('div.radio').length > 0) {
	                var Name = $('' + AppendTo + '').find('div.radio input').attr('name');
	                var input = $('<input type="radio" id="' + id + '" name="' + Name + '"/>').attr(attribute);
	                var label = $('<label for="' + id + '">' + Text + '</label>');
	                $('' + AppendTo + '').find('div.radio').append(input);
	                $('' + AppendTo + '').find('div.radio').append(label);
	            }
	            else {
	                var input = null;
	                var name = "CustRadio";
	                var CCount = 0;
	                if ($('input[name="CustRadio"]').length > 0) {
	                    var Length = $('input[type="radio"][name="CustRadio"]').length;
	                    for (var i = 1; i < 10; i++) {
	                        length = $('input[type="radio"][name="CustRadio' + i + '"]').length;
	                        if (length != 0) {
	                            length = $('input[type="radio"][name="CustRadio' + i + '"]').length;
	                        }
	                        else {
	                            CCount = i;
	                            break;
	                        }
	                    }
	                }
	                if (CCount > 0)
	                    name = name + CCount;
	                input = $('<input type="radio" id="' + id + '" name="' + name + '"/>').attr(attribute).prop('checked', true);
	                Div.append(input);
	                Div.append('<label for="' + id + '">' + Text + '</label>');
	                $('' + AppendTo + '').append(Div);
	            }
	        }
	        if (Type.toString().toLowerCase() == 'c') {
	            var Div = $('<div class="checkbox"></div>');
	            Text = Text === undefined ? Text = '' : Text = Text;
	            if ($('' + AppendTo + '').find('div.checkbox').length > 0) {
	                var Name = $('' + AppendTo + '').find('div.checkbox input').attr('type');
	                var input = $('<input type="checkbox" id="' + id + '" />').attr(attribute);
	                var label = $('<label for="' + id + '">' + Text + '</label>');
	                $('' + AppendTo + '').find('div.checkbox').append(input);
	                $('' + AppendTo + '').find('div.checkbox').append(label);
	            }
	            else {
	                var input = $('<input type="checkbox" id="' + id + '" name="CustChk"/>').attr(attribute).prop('checked', true);
	                Div.append(input);
	                Div.append('<label for="' + id + '">' + Text + '</label>');
	                $('' + AppendTo + '').append(Div);
	            }
	        }
	    }
	}
	, SetCheckBoxRadio: function () {
	    //$('.MainForm input[type="radio"],.MainForm input[type="checkbox"]').unbind('click').on('click', function ()
	    //{
	    //	if ($(this).closest('div').hasClass('disabled'))
	    //	{
	    //		return false;
	    //	}
	    //	else
	    //		return true;
	    //});
	}
    , DateComparer: function (date1, date2) {
        //// <signature>
        ///   <summary>This Function Compare the date and return the result as -1 for Some Error , 0 for equal, 1 for left date is greater, 2 for right date is greater.</summary>
        ///   <param name="date1" type="String">Left Date</param>					    
        ///   <param name="date2" type="String">Right Date</param>					    
        /// </signature>

    }
    , CreateTable: function (Object) {
        //// <signature>
        ///   <summary>This Function Creates a DataTable from json Object and returns it.</summary>
        ///   <param name="Object" type="Json Object">A Json Object containing the Data to be converted.</param>					    		
        /// </signature>
        Object = Object.replace(/_/g, "");
        Object = Object.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toUpperCase() + '":'); });
        var TenmpJsonData = null;
        TenmpJsonData = JSON.parse(Object, function (i, v) {
            return v === null ? '' : v;
        });
        var JSONdata = new Array();
        JSONdata.push(TenmpJsonData);
        return JSONdata;
    }
    , GridModifyEnable: function (sender, Grid) {
        //// <signature>
        ///   <summary>This Function is used to Unlock an lock the Row.</summary>
        ///   <param name="sender" type="Object">An Object that contains the row.</param>					    		
        ///   <param name="Grid" type="Object">An Object of the Grid which is calling the function.</param>					    		
        /// </signature>
    },
    ImportExcel: function (filename, call, GridCaller, HeaderParam, ExcelMenuID, DisableCheck, EntityID, IsMenuColRequired, CallBy, TabType) {
        //// <signature>
        ///   <summary>This Function is used to Import Excel feature.</summary>				    		
        ///  					    		
        ///   <param name="filename" type="String">FileName which will be used as Caller in the Database.</param>
        ///   <param name="call" type="Numeric">Write 0 for Front end import 1 for backend import 2 for Transaction forms</param>
        ///   <param name="GridCaller" type="String">Pipe (|) seperated function and Method Name of RefreshGrid. AjaxFunction|SuccessFunction|failfunction.</param>
        ///   <param name="HeaderParam" type="String">Send the Header of the Transaction forms and blank for others</param>
        ///   <param name="ExcelMenuID" type="String">Send the Menu ID for the Excel Import</param>
        ///   <param name="DisableCheck" type="String">Check the Checkbox for Error and Disable it</param>
        /// </signature>
    },
    CurrentTabtype: 0,
    MenuPermissions: null
    , DateAdd: function (DatePart, Num, date) {
        //// <signature>
        ///   <summary>Add or Subract the Date as Sql format DD-MMM-YYYY HH:MM:SS or DD-MMMM-YYYY HH:MM:SS or DD-MMM-YYYY or DD-MMMM-YYYY</summary>
        ///   <param name="DatePart" type="String">D for Day, M for Month, Y for Year, H for Hour ,MM for min</param>					    
        ///   <param name="Num" type="String">Count to be increase or decrease</param>					    
        ///   <param name="Date" type="String">Date</param>					    
        /// </signature>

    }
    , CurrMenuID: 0
     , ValidateIDField: function (value, replaceval) {
         if (value == null || value == undefined || value == "undefined" || value == "null" || value.trim().length == 0 || value == "0" || value == 0)
             return replaceval;
         else
             return parseInt(value);

     }
       , ValidateTextField: function (value, replaceval) {
           if (value == null || value == undefined || value == "undefined" || value == "null" || value.trim().length == 0)
               return replaceval.trim();
           else
               return value.trim();
       }
    , ValidateFloatField: function (value, replaceval) {
        if (value == null || value == undefined || value == "undefined" || value == "null" || value == "0" || value == 0)
            return replaceval;
        else
            return parseFloat(value);
    },
    DateDiff: function (type, Date1, Date2) {
        //// <signature>
        ///   <summary>DateDiff for two dates DD-MMM-YYYY HH:MM:SS or DD-MMM-YYYY</summary>
        ///   <param name="type" type="String">D for Day, M for Month, Y for Year</param>					    
        ///   <param name="Date1" type="String">Greater Date</param>					    
        ///   <param name="Date2" type="String">Smaller Date</param>					    
        /// </signature>
    }
};

$(window).on('click', function (e) {
    if ($(e.target).hasClass('AddNew')) {
        var control = e.target;
        if ($(control).data('popup') !== undefined) {
            var callFun = window['AddNew' + $(control).data('popup') + 'Data'];
            var param = [''];
            callFun.apply(null, param);
        }
    }
});
//Work to Create A Global Class of Functions
Internal = {
    BuildGrid: {},
    BodyBuildGrid: {},
}

//New CallWebmethod By Vikrant
var MethodArray = new Array();
Reliable.WebMethodData = {
    PushData: function push(name, value) {
        //// <signature>
        ///   <summary>Adds the data to the WebMethod with name,value</summary>
        ///   <param name="name" type="String">A string Format data which is the name of the parameter of c# function.</param>
        ///   <param name="value" type="String">A string Format value for the WebMethod.</param>
        /// </signature>
        MethodArray.push("'" + name + "':'" + value + "'");
    }
};
Reliable.CallWebMethod = function CallWebFunction(MethodName, Data, SaveFunction, FailFunction, SetProgressbar) {
    var strpoint = window.location.href.indexOf("?");
    //var substr = window.location.href.substr(window.location.href.length, window.location.href.length)

    var MethodLocationWeb = window.location.href.replace("#", "") + "/" + MethodName;
    var Data = "{" + MethodArray.toString().replace("[", "{").replace("]", "}") + "}";
    CallWebMethod(MethodLocationWeb, Data, SaveFunction, FailFunction, SetProgressbar);
}
$.fn.Outerhtml = function (htmldata) {
    /// <signature>
    ///   <summary>A Multi Purpose Function to Get or to Set the Outer Html Of The Caller</summary>
    ///   <param name="htmldata" type="String">An optional String Parameter Which holds or return the Outer HTML Data.</param>
    ///   <returns type="String" />
    /// </signature>
    if (this.length > 0) {
        if (htmldata != "" && typeof htmldata != "undefined")
            return this[0].outerHTML = htmldata;
        else
            return this[0].outerHTML;
    }
};

function RetriveCurrentFieldCaptions(MenuID, OnPassFun, OnFailFun) {
    //// <signature>
    ///   <summary>This Function Sets the Dynamic Names of The Labels.</summary>	
    ///   <param name="OnPassFun" type="Object">An Object containing that will be called when the OnPass occurred.</param>					    		
    ///   <param name="OnFailFun" type="Object">An Object containing that will be called when the OnFail occurred.</param>	
    /// </signature>
    var MethodName = "../WCFList/ReliableSoftListService.svc/GetFieldCaptions";
    LocalOnPassFun = OnPassFun;
    LocalOnFailFun = OnFailFun;
    var Data = '{"MenuID":"' + MenuID + '"}';
    CallWebMethod(MethodName, Data, OnSucessCurrentFieldCaptions, OnFaillCurrentFieldCaptions);

}

function OnSucessCurrentFieldCaptions(result) {
    var FieldData = JSON.parse(result.d);
    $('*[data-fieldid]').each(function (idx) {
        if (idx < FieldData.length && ContainsData(FieldData, $(this).data('fieldid'))) {
            if (FiledDataValue != '')
                $(this).text(FiledDataValue);
        }
    });
    if (LocalOnPassFun != null)
        LocalOnPassFun();
}

function OnFaillCurrentFieldCaptions(result) {
    Global.MsgBox(JSON.parse(result.responseText).Message, 'E', '');
    if (LocalOnFailFun != null)
        LocalOnFailFun();
}


/*-----------------------------*/
///End of Log file Management///
/*----------------------------*/

function GetCurrentFieldCaptions(result) {
    var FieldData = JSON.parse(result);
    $('*[data-fieldid]').each(function (idx) {
        if (ContainsData(FieldData, $(this).data('fieldid')) && FieldData.length <= idx) {
            $(this).text(FieldData[idx].FieldCaption);
        }
    });
}

function ContainsData(senderData, SendVal) {
    var D = senderData;
    FiledDataValue = '';
    if (D != '') {
        if (D.length > 0) {
            var RFlag = null;
            for (var k = 0; k < D.length; k++) {
                if (D[k].FieldName == SendVal) {
                    FiledDataValue = D[k].FieldCaption;
                    return true;
                }
                else
                    RFlag = false;
            }
            return RFlag;
        }
    } return false;
}

//This function Adds Count to the Given Dictionary
$.fn.extend({
    SetDictionary: function (count) {
        var Dic = new Object();
        for (var i = 1; i <= count; i++) {
            var newObject = jQuery.extend(true, {}, this[0]);
            Dic[i] = newObject;
        }
        return Dic;
    },
    NewAddDictionary: function (len, count, BlankDictionary) {
        var Dic = new Object();
        Dic = this[0];
        for (var i = 1; i <= count; i++) {
            var newObject = jQuery.extend(true, {}, BlankDictionary[1]);
            Dic[len + i] = newObject;
        }
        return Dic;
    },
    AddDictionary: function (PLength, Count) {
        count = parseInt(PLength) + parseInt(Count);
        var Dic = new Object();
        for (var i = 1; i <= count; i++) {
            if (i <= PLength) {
                var newObject = jQuery.extend(true, {}, this[i - 1]);
            }
            else {
                var DictObj = this[0];
                var Dictionary = $.map(this[0], function (i, v) {
                    DictObj[v] = null;
                });
                var newObject = jQuery.extend(true, {}, DictObj);
            }
            Dic[i] = newObject;
        }
        return Dic;

        //count = parseInt(PLength) + parseInt(Count);
        //var Dic = new Object();
        //for (var i = parseInt(PLength) + 1; i <= count; i++)
        //{
        //    var DictObj = this[0];
        //    var Dictionary = $.map(this[0], function (i, v)
        //    {
        //        DictObj[v] = null;
        //    });
        //    var newObject = jQuery.extend(true, {}, DictObj);

        //    Dic[i] = newObject;
        //}
        //return JSLINQ(Dic).ToJSONObjectArray();

    }
    , Merge: function (obj2) {
        return $.extend(this, obj2);
    }
	, FocusToEnd: function () {
	    $(this).focus();
	    var MyValue = $(this).val();
	    $(this).val('').val(MyValue);
	    return this;
	}
	, SetCursurToEnd: function () {
	    var control = this[0];
	    var valueLength = control.value.length;
	    //work for IE
	    if (document.selection) {
	        control.focus();//set the focus
	        var oSel = document.selection.createRange();//set range for IE
	        //reseting the range to start from 0 then set at end
	        oSel.moveStart('character', -valueLength);
	        oSel.moveStart('character', valueLength);
	        oSel.moveStart('character', 0);
	        oSel.select();
	    }
	    else if (control.selectionStart || control.selectionStart == '0') {
	        control.selectionStart = valueLength;
	        control.selectionEnd = valueLength;
	        control.focus();
	    }
	}
});

String.prototype.f = String.prototype.format = function (arguments) {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
};

//function SetControlPermission(Caller, AccessCode, CallerID)
//{
//    AreaStatus = xMenuControlPermission(AccessCode);
//    if (AreaStatus[0] == false)
//        $('.Grid>div.AddNewClass').addClass('AddNewDisableClass');
//    $('.rel-ic-save').closest('.btncnt').addClass('disabled');

// //   $('.btnCls[title="Save"][data-caller = "' + Caller + '"]').addClass('disabled');


//    if ((AreaStatus[1] == true) && ($('' + CallerID + '').val()) != "0" && ($('' + CallerID + '').val()) != "")
//     //   $('.btnCls[title="Save"][data-caller="' + Caller + '"]').removeClass('disabled');
//        $('.rel-ic-save').closest('.btncnt').removeClass('disabled');

//    if ((AreaStatus[0] == true) && (($('' + CallerID + '').val()) == "0" || ($('' + CallerID + '').val()) == "" || ($('' + CallerID + '').val()) == undefined))
//       // $('.btnCls[title="Save"][data-caller="' + Caller + '"]').removeClass('disabled');
//        $('.rel-ic-save').closest('.btncnt').removeClass('disabled');
//    if ((AreaStatus[1] == true) && ($('' + CallerID + '').val()) != "0" && ($('' + CallerID + '').val()) != "")
//    //    $('.btnCls[title="Save"][data-caller="' + Caller + '"]').removeClass('disabled');
//        $('.rel-ic-save').closest('.btncnt').removeClass('disabled');
//    if (AreaStatus[2] == false)
//        $('.rel-ic-delete').closest('.btncnt').removeClass('disabled');
//    //    $('.btnCls[title="Delete"][data-caller="' + Caller + '"]').addClass('disabled');
//}


//function xMenuControlPermission(Accesscode)
//{
//    var permission = new Array(3);
//    permission[0] = ((Accesscode & MenuPermission.AllowNew) == MenuPermission.AllowNew);
//    permission[1] = ((Accesscode & MenuPermission.AllowEdit) == MenuPermission.AllowEdit);
//    permission[2] = ((Accesscode & MenuPermission.AllowDelete) == MenuPermission.AllowDelete);
//    return permission;
//}


function xMenuControlPermission(Accesscode) {
    var permission = new Array(3);
    permission[0] = ((Accesscode & MenuPermission.AllowNew) == MenuPermission.AllowNew);
    permission[1] = ((Accesscode & MenuPermission.AllowEdit) == MenuPermission.AllowEdit);
    permission[2] = ((Accesscode & MenuPermission.AllowDelete) == MenuPermission.AllowDelete);
    return permission;
}

function CloseDialog(caller, event) {

    if ($('.rel-list').length == 0) {
        if (SetLastFocus.length !== 0) {
            $('#' + SetLastFocus[SetLastFocus.length - 1] + '').focus();
            SetLastFocus.pop();
            setfocuslastindex--;
        }
    }

    Global.Dialog($(caller).closest('div[data-draggable="true"]').attr('id'), "close", event);
    if (RelLA.InputCtrlName !== undefined)
        $('#' + RelLA.InputCtrlName + '').focus();

}

