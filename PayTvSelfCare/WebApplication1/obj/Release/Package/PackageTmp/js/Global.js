var WebMethodData = new Array();
var TotlaTime = 0;
var SessionTime = 0;
var TimeOut = 0;
var ctime;
var SecondTimer;
function PushData(name, value) {
    var NewVale = "";
    if (value.toString().indexOf("'") >= 0)
        NewVale = value.replace(/'/g, '♦');
    else
        NewVale = value;

    WebMethodData.push('"' + name + '":"' + NewVale + '"');
}
function CallWebMethod(MethodName, Data, OnPass, OnFail) {
    //if (MethodName == "MyProfile.aspx/BillAddressdetail")
    //Data = "{" + WebMethodData.toString().replace("[", "").replace("]", "") + "}";
    //else
    Data = "{" + WebMethodData.toString().replace("[", "{").replace("]", "}") + "}";
    try {

        $.ajax({
            type: "POST",
            url: MethodName,
            data: Data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnPass,
            error: OnFail
        });
        SetTimer = window.setInterval(function () { CallMe(); }, 20000);
        clearInterval(SetTimer);
        TotlaTime = SessionTime === undefined ? 2 : parseInt(SessionTime);
        ctime = SessionTime === undefined ? 2 : parseInt(SessionTime);
        TimeOut = 1;
        window.clearInterval(SetTimer);

    }
    catch (e) {
        alert(e.message);
    }
}

function CallPublicAPI(MethodName, Data, OnPass, OnFail, caller) {
    //if (MethodName == "MyProfile.aspx/BillAddressdetail")
    //Data = "{" + WebMethodData.toString().replace("[", "").replace("]", "") + "}";
    //else
    if (caller)
        Data = "{" + WebMethodData.toString() + "}";
    else
        Data = "{" + WebMethodData.toString().replace("[", "{").replace("]", "}") + "}";
    try {

        $.ajax({
            type: "POST",
            url: MethodName,
            data: Data,
            //headers: { 'Authorization': 'Basic ' + btoa(username + ':' + password) },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnPass,
            error: OnFail
        });
        SetTimer = window.setInterval(function () { CallMe(); }, 60000);
        clearInterval(SetTimer);
        TotlaTime = SessionTime === undefined ? 20 : parseInt(SessionTime);
        ctime = SessionTime === undefined ? 20 : parseInt(SessionTime);
        TimeOut = 1;
        window.clearInterval(SetTimer);

    }
    catch (e) {
        alert(e.message);
    }
}

function Stringify(DataObject) {
    //// <signature>
    ///   <summary>Stringifies the DataObject and clears the blank spaces and Also replaces the Single Quote(') with Double Quotes ('').</summary>
    ///   <param name="DataObject" type="JSON Object">A JSON Object which is to be stringified</param>
    /// </signature>
    data = JSON.stringify(DataObject, function (k, v) {
        return v === "" ? "" : v;
    });
    return data = data.replace(/'/g, '&apos;').replace(/\\/g, '\\\\').replace(/"/g, "\"").replace(/\"/g, "\\\"");;
}

Reliable.ReliableGetDate = function GetDate(type) {
    var param1 = new Date();
    var date = (param1.getDate()).toString().length == 1 ? '0' + param1.getDate() : param1.getDate()
    var param2 = date + '-' + MonthWord(param1.getMonth() + 1, type).split('|')[0] + '-' + param1.getFullYear();
    return param2 + "|" + MonthWord(param1.getMonth() + 1, type).split('|')[1];
}
function AddYear(NoOfYear) {
    var param1 = new Date();
    var param2 = param1.getDate() + '-' + MonthWord(param1.getMonth() + 1, 'S').split('|')[0] + '-' + parseInt(param1.getFullYear() + NoOfYear);
    return param2 + "|" + MonthWord(param1.getMonth() + 1, 'S').split('|')[1];
}

function MonthWord(num, Type, MnW) {
    var MonthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Month = "";
    if (MnW === undefined || MnW == "")
        Month = Type == "S" ? Month = MonthArray[parseInt(num - 1)].toString().slice(0, 3) : Month = MonthArray[parseInt(num - 1)].toString();
    else {
        for (var i = 0; i < MonthArray.length; i++) {
            if (MonthArray[i].toString().indexOf(MnW) >= 0) {
                if (Type == "S")
                    Month = MonthArray[i].toString().slice(0, 3);
                else
                    Month = MonthArray[i].toString();
                num = parseInt(i + 1);
                break;
            }
        }
    }
    return Month + "|" + num;
}

function DayWord(num, type, Dw) {
    var DayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var Day = "";
    if (Dw === undefined || Dw == "")
        Day = type == "S" ? Day = DayArray[parseInt(num - 1)].toString().slice(0, 3) : Day = DayArray[parseInt(num - 1)].toString();
    else {
        for (var i = 0; i < DayArray.length; i++) {
            if (DayArray[i].toString().indexOf(Dw) >= 0) {
                if (Type == "S")
                    Day = DayArray[i].toString().slice(0, 3);
                else
                    Day = DayArray[i].toString();
                num = parseInt(i + 1);
                break;
            }
        }
    }
    return Day + "|" + num;
}
function DateDiffInDay(StartDate, EndDate) {
    var date1 = new Date(StartDate);
    var date2 = new Date(EndDate);

    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
}