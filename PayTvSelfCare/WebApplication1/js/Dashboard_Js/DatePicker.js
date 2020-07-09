/*-----------------------------------*/
/// Date & Time Javascript function ///
/*----------------------------------*/
var Dtp = null;
$(window).on('load', function () {
    $('body').click(function (evt) {
        try {
            if (evt.target.parentNode.id == "dtpickrth" || (evt.target.parentNode.id == "dtpickrRow1" || evt.target.parentNode.parentNode.parentNode.id == "dtpickrRow1") || (evt.target.parentNode.id == "dtpickrRow3" || evt.target.parentNode.parentNode.parentNode.id == "dtpickrRow3"))
                return;
            else
                $('.DtpDivClass').remove();
        }
        catch (exp)
        { $('.DtpDivClass').remove(); }
    });
});

function GetDateTime(type) {
    var param1 = new Date();
    var min = param1.getMinutes().toString().length == 1 ? "0" + param1.getMinutes() : param1.getMinutes();
    var sec = param1.getSeconds().toString().length == 1 ? "0" + param1.getSeconds() : param1.getSeconds();
    var hr = param1.getHours().toString().length == 1 ? "0" + param1.getHours() : param1.getHours();
    var param2 = param1.getDate() + '-' + MonthWord(param1.getMonth() + 1, type).split('|')[0] + '-' + param1.getFullYear() + ' ' + hr + ':' + min + ':' + sec;
    return param2 + "|" + MonthWord(param1.getMonth() + 1, type).split('|')[1];
}
function GetCurrentYear() {
    var param1 = new Date();
    return param1.getFullYear();
}

function GetDateTimeAMPM(type, IsSec) {
    var param1 = new Date();
    var min = param1.getMinutes().toString().length == 1 ? "0" + param1.getMinutes() : param1.getMinutes();
    var sec = param1.getSeconds().toString().length == 1 ? "0" + param1.getSeconds() : param1.getSeconds();
    var hr = param1.getHours().toString().length == 1 ? "0" + param1.getHours() : param1.getHours();
    var Suffix = hr >= 12 ? "PM" : "AM";
    if (hr > 12) {
        hr = hr - 12;

    }
    var param2 = "";
    if (IsSec == true) {
        param2 = param1.getDate() + '-' + MonthWord(param1.getMonth() + 1, type).split('|')[0] + '-' + param1.getFullYear() + ' ' + hr + ':' + min + ':' + sec + ' ' + Suffix;
    }
    else {
        param2 = param1.getDate() + '-' + MonthWord(param1.getMonth() + 1, type).split('|')[0] + '-' + param1.getFullYear() + ' ' + hr + ':' + min + ' ' + Suffix;
    }

    //  var Suffix = crTime.getHours() >= 12 ? "PM" : "AM";
    //  if (Deftime[0] > 12)
    return param2 + "|" + MonthWord(param1.getMonth() + 1, type).split('|')[1];
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
Reliable.DateAdd = function (DatePart, Num, date) {
    try {
        Num = parseInt(Num);
        DatePart = DatePart.toUpperCase();
        var IsPm = 0, format = 0;
        var NewDate, NewMonth, NewYear, NewHour, NewMin, NewSec, Retval, MonthType = "S";
        date = date.toUpperCase();
        if (date.indexOf('PM') > -1)
            IsPm = 1
        date = date.replace('PM', '');
        date = date.replace('AM', '');
        var firstValue = date.split(' ');
        var Date1 = firstValue[0].split('-');
        if (firstValue[1] === undefined)
            format = 1;
        firstValue[1] = firstValue[1] === undefined ? '00:00:00' : firstValue[1];
        var time1 = firstValue[1].split(':');
        if (Date1[1].length > 3) {
            MonthType = "F";
            Date1[1] = Date1[1].slice(0, 3);
        }

        time1[0] = time1[0] === undefined ? '00' : time1[0];
        time1[1] = time1[1] === undefined ? '00' : time1[1];
        time1[2] = time1[2] === undefined ? '00' : time1[2];
        if (IsPm == 1)
            time1[0] = parseInt(time1[0]) + 12;

        var Month = GetMonthIndex(Date1[1]);

        if (DatePart == 'D') {
            NewDate = parseInt(Date1[0]) + parseInt(Num);
            if (NewDate > 0) {
                while (NewDate > GetMonthDays(Month, parseInt(Date1[2]))) {
                    NewDate = NewDate - GetMonthDays(Month, parseInt(Date1[2]));
                    Month++;
                    if (Month > 11) {
                        Month = 0;
                        Date1[2] = parseInt(Date1[2]) + 1;
                    }
                }
            }
            else if (NewDate < 0) {
                while (NewDate <= GetMonthDays(Month, parseInt(Date1[2]))) {
                    NewDate = NewDate + GetMonthDays(Month, parseInt(Date1[2]));
                    Month--;
                    if (Month < 0) {
                        Month = 11;
                        Date1[2] = parseInt(Date1[2]) - 1;
                    }
                }
            }
            else {
                Month--;
                if (Month < 0) {
                    Month = 11;
                    Date1[2] = parseInt(Date1[2]) - 1;
                }
                NewDate = GetMonthDays(Month, parseInt(Date1[2]))
            }
            NewMonth = Month;
            NewYear = parseInt(Date1[2]);
            NewHour = time1[0];
            NewMin = time1[1];
            NewSec = time1[2];
        }

        if (DatePart == "M") {
            NewMonth = Month + Num + 1;
            NewDate = parseInt(Date1[0]);
            if (NewMonth > 0) {
                while (parseInt(NewMonth / 12) > 0) {
                    NewMonth = NewMonth - 12;
                    Date1[2] = parseInt(Date1[2]) + 1;
                }
            }
            else if (NewMonth < 0) {
                while (parseInt(NewMonth / 12) < 0) {
                    NewMonth = NewMonth + 12;
                    Date1[2] = parseInt(Date1[2]) - 1;
                }
            }
            else {
                NewMonth = 12;
                Date1[2] = parseInt(Date1[2]) - 1;
            }
            NewMonth = NewMonth - 1;
            if (NewDate > GetMonthDays(NewMonth, parseInt(Date1[2]))) {
                NewDate = GetMonthDays(NewMonth, parseInt(Date1[2]));
            }
            NewYear = parseInt(Date1[2]);
            NewHour = time1[0];
            NewMin = time1[1];
            NewSec = time1[2];
        }
        if (DatePart == "Y") {
            NewYear = parseInt(Date1[2]) + Num;
            NewMonth = Month;
            NewDate = parseInt(Date1[0]);
            if (NewDate > GetMonthDays(NewMonth, parseInt(Date1[2]))) {
                NewDate = GetMonthDays(NewMonth, parseInt(Date1[2]));
            }
            NewHour = time1[0];
            NewMin = time1[1];
            NewSec = time1[2];
        }
    }
    catch (e) {

    }
    var ReturnDatetime = new Date(NewYear, NewMonth, NewDate, NewHour, NewMin, NewSec);
    if (format == 0) {
        Retval = "-" + MonthWord(ReturnDatetime.getMonth() + 1, MonthType, "").split('|')[0] + "-" + ReturnDatetime.getFullYear() + " " + ReturnDatetime.getHours() + ":" + ReturnDatetime.getMinutes() + ":" + ReturnDatetime.getSeconds();
    }
    else {
        Retval = "-" + MonthWord(ReturnDatetime.getMonth() + 1, MonthType, "").split('|')[0] + "-" + ReturnDatetime.getFullYear();
    }
    if (ReturnDatetime.getDate().toString().length == 1)
        Retval = "0" + ReturnDatetime.getDate() + Retval;
    else
        Retval = ReturnDatetime.getDate() + Retval;
    return Retval;
}
function IsLeapYear(Year) {
    if (Year % 4 == 0)
        return 1;
    else
        return 0;
}
function GetMonthDays(Month, year) {
    var Day = 0;
    if (Month == 0 || Month == 2 || Month == 4 || Month == 6 || Month == 7 || Month == 9 || Month == 11) {
        Day = 31;
    }
    else if (Month == 3 || Month == 5 || Month == 8 || Month == 10) {
        Day = 30;
    }
    else {
        Day = 28 + IsLeapYear(year);
    }
    return Day;
}
Reliable.DateComparer = function DateCompare(Date1, Date2) {
    try {

        var flag = -1;
        date1 = Date1.toUpperCase();
        date2 = Date2.toUpperCase();
        var IsPm1 = 0, IsPm2 = 0;
        if (date1.indexOf('PM') > -1)
            IsPm1 = 1
        if (date2.indexOf('PM') > -1)
            IsPm2 = 1
        date1 = date1.replace('PM', '');
        date1 = date1.replace('AM', '');
        date2 = date2.replace('PM', '');
        date2 = date2.replace('AM', '');

        var firstValue = date1.split(' ');
        var secondValue = date2.split(' ');
        var Date1 = firstValue[0].split('-');
        var Date2 = secondValue[0].split('-');
        firstValue[1] = firstValue[1] === undefined ? '00:00:00' : firstValue[1];
        secondValue[1] = secondValue[1] === undefined ? '00:00:00' : secondValue[1];
        var time1 = firstValue[1].split(':');
        var time2 = secondValue[1].split(':');
        time1[0] = time1[0] === undefined ? '00' : time1[0];
        time1[1] = time1[1] === undefined ? '00' : time1[1];
        time1[2] = time1[2] === undefined ? '00' : time1[2];
        time2[0] = time2[0] === undefined ? '00' : time2[0];
        time2[1] = time2[1] === undefined ? '00' : time2[1];
        time2[2] = time2[2] === undefined ? '00' : time2[2];
        if (IsPm1 == 1)
            time1[0] = parseInt(time1[0]) + 12;
        if (IsPm2 == 1)
            time2[0] = parseInt(time2[0]) + 12;

        var firstDate = new Date(Date1[2], GetMonthIndex(Date1[1]), Date1[0], time1[0], time1[1], time1[2]);
        //firstDate.setFullYear(Date1[2], GetMonthIndex(Date1[1]), Date1[0]);

        var secondDate = new Date(Date2[2], GetMonthIndex(Date2[1]), Date2[0], time2[0], time2[1], time2[2]);
        //secondDate.setFullYear(Date2[2], GetMonthIndex(Date2[1]), Date2[0]);
        if (firstDate.getTime() == secondDate.getTime()) {
            flag = 0;
        }
        else {
            if (firstDate.getTime() > secondDate.getTime()) {
                flag = 1;
            }
            else {
                flag = 2;
            }
        }

    } catch (e) {
        flag = -1;
    }
    return flag;
}
function GetMonthIndex(CMonth) {
    var mon = -1;
    switch (CMonth.toLowerCase()) {

        case "jan": mon = 0; break;
        case "feb": mon = 1; break;
        case "mar": mon = 2; break;
        case "apr": mon = 3; break;
        case "may": mon = 4; break;
        case "jun": mon = 5; break;
        case "jul": mon = 6; break;
        case "aug": mon = 7; break;
        case "sep": mon = 8; break;
        case "oct": mon = 9; break;
        case "nov": mon = 10; break;
        case "dec": mon = 11; break;
    }
    return mon;

}

function CreateDateTime(caller, CallerDiv, DefaultDate, TimeFlag) {
    if (TimeFlag === undefined)
        TimeFlag = false;
    var divDatePicker = $('.DatePicker');
    var CurrentDateDiv = $('<div></div>').attr('class', 'CurDate');
    var crdate = Reliable.ReliableGetDate('F').split('|')[0].split('-');
    var date = new Date();
    var day = date.getDay();
    if (day == 0)
        day = 6;
    day = DayWord(day, 'F').split('|')[0];
    CurrentDateDiv.append('<div><span>' + day + '</span></div><table cellspacing="0" cellpadding="0"><tbody><tr><td>' + crdate[1] + '</td></tr><tr><td>' + crdate[0] + '</td></tr><tr><td>' + crdate[2] + '</td></tr></tbody></table>');
    CurrentDateDiv.append('<div style="display:none;" class="todayDtp" title="' + crdate[0] + '-' + crdate[1].slice(0, 3) + '-' + crdate[2] + '"><span>Today:' + crdate[0] + '-' + crdate[1].slice(0, 3) + '-' + crdate[2] + '</span></div>')
    divDatePicker.append(CurrentDateDiv);

    var MonthDiv = $('<div></div>').attr('class', 'MnthClass');
    var crTime = new Date();
    var Suffix = "";//crTime.getHours() >= 12 ? "PM" : "AM";
    var crTime = new Date();
    var Suffix = crTime.getHours() >= 12 ? "PM" : "AM";
    var Hours = crTime.getHours();
    if (crTime.getHours().toString().length <= 1)
        Hours = '0' + crTime.getHours();
    else
        Hours = crTime.getHours();
    var Minutes = crTime.getMinutes();
    if (crTime.getMinutes().toString().length <= 1)
        Minutes = '0' + crTime.getMinutes();
    else
        Minutes = crTime.getMinutes();
    var Seconds = crTime.getSeconds();
    if (crTime.getSeconds().toString().length <= 1)
        Seconds = '0' + crTime.getSeconds();
    else
        Seconds = crTime.getSeconds();
    crTime = Hours + ':' + Minutes + ':' + Seconds + ' ' + Suffix;
    if (Suffix == "PM") {
        if (Hours == 12) {
            Hours = 12;
        }
        else {
            Hours = Hours - 12;
        }
    }
    var CurTime = "";
    if (TimeFlag === undefined || TimeFlag == false)
        CurTime = $('<div id="CurTime" style="display:none;">' + crTime + '</div>');
    else {
        CurTime = $('<div id="CurTime"><div class="DyDate">&nbsp;<span>HH:</span><input type="number" min="1" max="12" value="' + Hours + '" onKeyDown="if(this.value.length==2 && Global.KeyCode(event)!=8) return false;"/>&nbsp;<span>MM:</span><input type="number" min="0" max="60"  value="' + Minutes + '" onKeyDown="if(this.value.length==2 && Global.KeyCode(event)!=8) return false;"/>&nbsp;<span>SS:</span><input type="number" min="0" max="60"  value="' + Seconds + '" onKeyDown="if(this.value.length==2 && Global.KeyCode(event)!=8) return false;"/>&nbsp;<select><option value="0">AM</option><option value="1">PM</option></select></div></div>');
    }
    var MonthContainer = $('<div></div>');
    MonthContainer.append('<div data-monthContainer="true" title="Click To Change Month"><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',0);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + crdate[1] + ',' + crdate[2] + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',0);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span></div>');
    MonthDiv.append(CurTime);
    divDatePicker.attr({ 'data-date-year': crdate[2], 'data-date-month': MonthWord(0, 'S', crdate[1]).split('|')[0], 'data-date-monthNum': MonthWord(0, 'S', crdate[1]).split('|')[1] });
    MonthContainer.append('<div></div>');
    var table = null;
    var Deftime = null;
    if (DefaultDate !== undefined && DefaultDate != "") {
        if (TimeFlag) {
            Deftime = DefaultDate.split(' ')[1];
            DefaultDate = DefaultDate.split(' ')[0];
            DefaultDate = DefaultDate.split('-');
            Deftime = Deftime.split(':');

            if (Deftime[1].length == 4) {
                var NewData = Deftime[1].toUpperCase();
                if (NewData.slice(2, 4) == 'PM')
                    Deftime[0] = parseInt(Deftime[0]) + 12;
                Deftime[1] = Deftime[1].replace(NewData.slice(2, 4), '');
                Deftime.push('00');
            }
        }
        else
            DefaultDate = DefaultDate.split('-');
        table = CreateDays(DefaultDate[2], MonthWord(0, 'S', DefaultDate[1]).split('|')[1], DefaultDate[0], caller);
        if (Deftime !== null) {
            $(MonthDiv).find('#CurTime .DyDate').find('input').first().val(Deftime[0]);
            $(MonthDiv).find('#CurTime .DyDate').find('input:nth-of-type(2)').val(Deftime[1]);
            $(MonthDiv).find('#CurTime .DyDate').find('input:nth-of-type(3)').val(Deftime[2]);
            if (Deftime[0] > 12) {
                $(MonthDiv).find('#CurTime .DyDate').find('select').val("1");
                Suffix = 'PM'
                $(MonthDiv).find('#CurTime .DyDate').find('input').first().val(parseInt(Deftime[0]) - 12);
            }
            else {
                $(MonthDiv).find('#CurTime .DyDate').find('select').val("0");
                Suffix = 'AM'
            }
        }
        MonthContainer.find('*[data-monthContainer="true"]').html('<span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',0);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + MonthWord(0, 'F', DefaultDate[1]).split('|')[0] + ',' + DefaultDate[2] + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',0);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span>');
        divDatePicker.attr({ 'data-date-year': DefaultDate[2], 'data-date-month': MonthWord(0, 'S', DefaultDate[1]).split('|')[0], 'data-date-monthNum': MonthWord(0, 'S', DefaultDate[1]).split('|')[1] });
    }
    else
        table = CreateDays(crdate[2], MonthWord(0, 'S', crdate[1]).split('|')[1], crdate[0], caller);
    MonthContainer.find('div:last-child').append(table);

    MonthDiv.append(MonthContainer);
    var MonthSwapper = $('<div id="MnthSwaper"><div>').css('display', 'none');
    MonthSwapper.append('<div></div>');
    MonthDiv.append(MonthSwapper);
    var YearSwapper = $('<div id="YearSwaper"><div>').css('display', 'none');
    MonthDiv.append(YearSwapper);
    divDatePicker.append(MonthDiv);
    //var ControlDiv = $("<div id='dtPickerCtrlDiv'><span><a title='Cancel' href='#' onclick='javascript:SetDate(this,\"" + caller + "\");return false;'>Cancel</a><a title='OK' href='#' onclick='javascript:SetDate(this,\"" + caller + "\");return false;'>OK</a></span></div>");
    var ControlDiv = $("<div id='dtPickerCtrlDiv' style='padding-top: 3px;'><div class='smlbtncnt'><button data-icon='Cancel' title='Cancel' class='smlbtnCls rel-ic-times' onclick='javscript:buttonpulse(this, event);SetDate(this,\"" + caller + "\");return false;' tabindex='1'>Cancel</button></div><div class='smlbtncnt'><button data-icon='Ok' class='smlbtnCls rel-ic-check' title='OK' onclick='javscript:buttonpulse(this, event);SetDate(this,\"" + caller + "\");return false;' tabindex='2'>Ok</button></div></div>");
    //if (Global.BrowserName() != 'chrome' && Global.BrowserName() != 'safari')
    //    ControlDiv.css('margin-top', '-3.9%');
    divDatePicker.append(ControlDiv);
    $('.DatePickerBack').css({ 'opacity': 1, 'z-index': '99999' });

    //#region [Month Selection]
    $('*[data-monthcontainer="true"]').find('span[data-type="text"]').on('click', function () {
        var Month = MonthWord(0, 'S', $('.DatePicker').data('date-month')).split('|')[1];
        $('#MnthSwaper>div').remove();
        $('#MnthSwaper').append('<div></div>');
        if ($('#' + caller + '').val() !== '')
            $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',1);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + DefaultDate[2] + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',1);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span><span></span></div>');
        else
            $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',1);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + crdate[2] + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',1);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span></div>');
        $('#MnthSwaper>div').append(CreateMonth(Month, caller));
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').css('display', 'none');
        $('#MnthSwaper').css('display', 'block');

        //#region [Year Selection Process]
        $('*[data-Curyear="true"]').find('span[data-type="text"]').on('click', function () {
            $('#MnthSwaper').css('display', 'none');
            //#region[Year Cycle Creation]
            var first, last;
            var CurYear = parseInt($('*[data-Curyear="true"]').text());
            if (CurYear.toString().slice(3, 4) == "0") {
                first = CurYear - 10;
                last = first + 10;
            }
            else {
                var yearGap = parseInt(CurYear.toString().slice(3, 4));
                first = CurYear - yearGap;
                last = first + 10;
            }
            //#endregion
            $('#YearSwaper>div').html('<div data-navYear="true"><span data-navyearcycle="true">&nbsp;' + first + '-' + last + '&nbsp;</span>&nbsp;<span><i title="Down" class="rel rel-ic-angle-down"></i>&nbsp;<i title="Up" class="rel rel-ic-angle-up"></i></span></div>');
            $('#YearSwaper>div').append('<div class="DtpYearSelect"></div>');
            $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
            $('#YearSwaper').css('display', 'block');

            $('#YearSwaper > div').find('div:first-child span:nth-of-type(2)').on('click', 'i', function () {
                if ($(this).attr('title') == 'Up') {
                    last = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:first-child td:first-child').text());
                    first = last - 10;
                    $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                    $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                }
                else {
                    first = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:last-child td:last-child').text());
                    last = first + 10;
                    $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                    $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                }
                //#region [Cell click Year]
                $('#YearSwaper > div div.DtpYearSelect').find('table tr').on('click', 'td', function () {
                    $(this).closest('table').find('td').removeClass('SelectedYear');
                    $(this).addClass('SelectedYear');
                });
                //#endregion
            });

        });
        //#endregion
    });
    //#endregion
    if (TimeFlag == false) {
        Dtp = setInterval(function () {
            if ($('#CurTime').length > 0) {
                var crTime = new Date();
                var Suffix = "";//crTime.getHours() >= 12 ? "PM" : "AM";
                var Hours = crTime.getHours();
                if (crTime.getHours().toString().length <= 1)
                    Hours = '0' + crTime.getHours();
                else
                    Hours = crTime.getHours();
                var Minutes = crTime.getMinutes();
                if (crTime.getMinutes().toString().length <= 1)
                    Minutes = '0' + crTime.getMinutes();
                else
                    Minutes = crTime.getMinutes();
                var Seconds = crTime.getSeconds();
                if (crTime.getSeconds().toString().length <= 1)
                    Seconds = '0' + crTime.getSeconds();
                else
                    Seconds = crTime.getSeconds();
                crTime = Hours + ':' + Minutes + ':' + Seconds + ' ' + Suffix;
                $('#CurTime').text(crTime);
            }
        }, 1000);
    }

    if (Suffix == 'AM')
        $("#CurTime").find("select").val("0");
    else
        $("#CurTime").find("select").val("1");
    $('.todayDtp').unbind('click').on('click', function () {
        var CurDate = $(this).text().replace('Today:', '');
        $('#' + caller + '').val(CurDate);
        $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
        $('.DatePickerBack').find('.DatePicker').html('');
    });
    //if (TimeFlag == true)
    //    $('.CurDate').css('height', '22.3em')
    //else
    //    $('.CurDate').css('height', '20em')
}

function CreateDays(Year, Mn, Defdate, Control) {
    Control = Control.id === undefined ? Control : Control.id;
    var DayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var table = $('<table cellspacing="0" cellpadding="0"></table>');
    var thead = $('<thead></thead>');
    var tbody = $('<tbody></tbody>');
    var tr = $('<tr></tr>');
    //#region [Creating Header]
    $(DayArray).each(function () {
        tr.append('<th>' + this.toString().slice(0, 3) + '</th>');
    });
    thead.append(tr);
    table.append(thead);
    //#endregion

    //#region [Creating Body]
    tr = $('<tr></tr>');
    var date = new Date(), y = parseInt(Year), m = parseInt(Mn);
    var firstDay = 1;
    var lastDay = new Date(y, m, 0);

    lastDay = parseInt(lastDay.toString().split(' ')[2]);
    var DCount = 1;
    var lastCount = 6;
    for (var i = 0; i < lastCount; i++) {
        for (var j = 0; j <= 6; j++) {
            var day = parseInt(new Date(Year, Mn - 1, DCount).getDay() - 1);

            if (day < 0)
                day = 6;
            if (j == day) {
                if (DCount <= lastDay) {
                    if (DCount == 1 && day == 6) {
                        if (lastDay >= 31 || lastDay >= 30)
                            lastCount = lastCount + 1;
                    }
                    if (Defdate == DCount)
                        tr.append("<td onclick='javascript:CellCheck(this,event,0);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",0);' title='" + DCount + "' class='SelectedDate'><span>" + DCount + "</span></td>");
                    else
                        tr.append("<td onclick='javascript:CellCheck(this,event,0);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",0);' title='" + DCount + "'><span>" + DCount + "</span></td>");
                    DCount++;
                }
            }
            else
                tr.append('<td></td>');
        }
        tbody.append(tr);
        tr = $('<tr></tr>');
    }
    table.append(tbody);
    //#endregion
    return table//.Outerhtml();
}

function CreateMonth(defMnth, Control) {
    Control = Control.id === undefined ? Control : Control.id;
    var table = $('<table class="DtpMnth" cellspacing="0" cellpadding="0"></table>');
    var tbody = $('<tbody></tbody>');
    var tr = $('<tr></tr>');
    var MonthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var mnCount = 1;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (mnCount <= 12) {
                if (defMnth == mnCount)
                    tr.append("<td onclick='javascript:CellCheck(this,event,1);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",1);'  class='selectedMnth' data-mnthID='" + mnCount + "' title='" + MonthArray[parseInt(mnCount - 1)].toString() + "'><span>" + MonthArray[parseInt(mnCount - 1)].toString().slice(0, 3) + "</span></td>");
                else if (mnCount < defMnth)
                    tr.append("<td onclick='javascript:CellCheck(this,event,1);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",1);'  class='MnLess' data-mnthID='" + mnCount + "' title='" + MonthArray[parseInt(mnCount - 1)].toString() + "'><span>" + MonthArray[parseInt(mnCount - 1)].toString().slice(0, 3) + "</span></td>");
                else
                    tr.append("<td onclick='javascript:CellCheck(this,event,1);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",1);'  data-mnthID='" + mnCount + "' title='" + MonthArray[parseInt(mnCount - 1)].toString() + "'><span>" + MonthArray[parseInt(mnCount - 1)].toString().slice(0, 3) + "</span></td>");
                mnCount++;
            }
            else
                tr.append('<td></td>')
        }
        tbody.append(tr);
        tr = $('<tr></tr>');
    }
    table.append(tbody);
    return table//.Outerhtml();
}

function CreateYear(defYear, first, last, Control) {
    Control = Control.id === undefined ? Control : Control.id;
    var table = $('<table cellspacing="0" cellpadding="0"></table>');
    var tbody = $('<tbody></tbody>');
    var tr = $('<tr></tr>');
    var YrCount = first;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (YrCount <= last) {
                if (YrCount == defYear)
                    tr.append("<td onclick='javascript:CellCheck(this,event,2);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",2);' class='SelectedYear' title='" + YrCount + "'><span>" + YrCount + "</span></td>");
                else
                    tr.append("<td onclick='javascript:CellCheck(this,event,2);' ondblclick='javascript:SelectDate(this,event,\"" + Control + "\",2);' title='" + YrCount + "' ><span>" + YrCount + "</span></td>");
                YrCount++;
            }
        }
        tbody.append(tr);
        tr = $('<tr></tr>');
    }
    table.append(tbody);
    return table//.Outerhtml();
}

function SelectDate(caller, event, Control, who) {
    var crdate = Reliable.ReliableGetDate('F').split('|')[0].split('-');
    if (who == 0) {
        $(caller).closest('table').find('td').removeClass('SelectedDate');
        $(caller).addClass('SelectedDate');
        if ($('#CurTime .DyDate').length > 0) {


            if ($('.SelectedDate').text().length == 1 && $('#' + caller + '').val($('.SelectedDate').text()).length == 1) {
                $('.SelectedDate').text("0" + $('.SelectedDate').text())
            }
            else {
                $('.SelectedDate').text($('.SelectedDate').text());
            }


            var suffix = $('#CurTime').find('select').val() == 1 ? 'PM' : 'AM';
            //var Hr;
            //if ($('#CurTime').find('select').val() == 1)
            //    Hr = parseInt($('#CurTime .DyDate').find('input').first().val()) + 12
            //else
            //    Hr = $('#CurTime .DyDate').find('input').first().val()
            $('#' + caller + '').val($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year') + ' ' + $('#CurTime .DyDate').find('input').first().val() + ':' + $('#CurTime .DyDate').find('input:nth-of-type(2)').val() + suffix); //':' + $('#CurTime .DyDate').find('input:nth-of-type(3)').val());
        }
        else if ($('.SelectedDate').text().length == 1 && $('#' + Control + '').val($('.SelectedDate').text()).length == 1) {
            $('.SelectedDate').text("0" + $('.SelectedDate').text())
        }
        else {
            $('.SelectedDate').text($('.SelectedDate').text());
        }

        if ($('[data-targetid="' + Control + '"]').data('ctrltype') == "text") {


            var TodayDate = new Date();
            var CurrentDate = TodayDate.toString().split(" ")[2] + "-" + TodayDate.toString().split(" ")[1] + "-" + TodayDate.toString().split(" ")[3];
            var SelectedDate = $('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year');
            var IsValidDate = true;

            if (Reliable.DateComparer(SelectedDate, CurrentDate) == 2) {
                IsValidDate = false;
            }
            else {
                IsValidDate = true;
            }

            var ExpiryOldText = "";
            if (Control == "ExpiringTillDate") {
                ExpiryOldText = $('#' + Control + '').text();
            }

            if (IsValidDate == false) {
                // alert('Please select a valid date');
                MsgBox('E', "Please Select Date Greater Than " + CurrentDate + " !");

                //Global.MsgBox("" + $('#' + newdate).parent().parent().siblings('label').text() + " will be greater or equal to last As On Date.", 'E', focus);
                //$('#' + newdate).val('');
            }
            else {

                if ($('#CurTime .DyDate').length > 0) {
                    var suffix = $('#CurTime').find('select').val() == 1 ? 'PM' : 'AM';

                    $('#' + Control + '').text($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year') + ' ' + $('#CurTime .DyDate').find('input').first().val() + ':' + $('#CurTime .DyDate').find('input:nth-of-type(2)').val() + suffix); //':' + $('#CurTime .DyDate').find('input:nth-of-type(3)').val());
                }
                else
                    $('#' + Control + '').text($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year'));



                if (ExpiryOldText != $('#' + Control + '').text()) {
                    $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
                    $('.DatePickerBack').find('.DatePicker').html('');
                    $('#' + Control + '').change();

                }

            }
        }
        else {
            $('#' + Control + '').val($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year'));
        }


        try {
            var callerfunction = $('#' + Control + '').data('callback');
            var callfun = window[callerfunction];
            var param = ['' + caller + ''];

            callfun.apply(null, param);
        } catch (e) {

        }

        $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
        $('#' + Control + '').blur();
        $('.DatePickerBack').find('.DatePicker').html('');
        clearInterval(Dtp);
        if (document.activeElement !== null)
            document.activeElement.blur();
    }
    if (who == 1) {
        $(caller).closest('table').find('td').removeClass('selectedMnth');
        $(caller).addClass('selectedMnth');
        var table = CreateDays(parseInt($('*[data-curyear="true"]').first().text()), parseInt($(caller).data('mnthid')), 0, Control);
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').find('div:first-child').html('<span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',0);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span  data-type="text">' + $(caller).attr('title') + ',' + $('*[data-curyear="true"]').text() + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',0);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span><span></span>');
        $('.DatePicker').attr({ 'data-date-year': $('*[data-curyear="true"]').first().text(), 'data-date-month': $(caller).text(), 'data-date-monthnum': $(caller).data('mnthid') }).data('date-year', $('*[data-curyear="true"]').first().text());
        $('.DatePicker').data('date-month', $(caller).text());
        $('.DatePicker').data('date-monthnum', $(caller).data('mnthid'));
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').find('div:last-child').html(table);
        $('#MnthSwaper').css('display', 'none');
        $('#MnthSwaper>div').html('');
        $('#MnthSwaper').find('div:last-child').html('');
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2),.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2) div:last-child').css('display', 'block');
        //#region [Month Selection]
        $('*[data-monthcontainer="true"]').find('span[data-type="text"]').on('click', function () {
            var Month = MonthWord(0, 'S', $('.DatePicker').data('date-month')).split('|')[1];
            $('#MnthSwaper>div').remove();
            $('#MnthSwaper').append('<div></div>');
            //if ($('#' + caller + '').val() !== '')
            //    $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(this,\'down\');return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + DefaultDate[2] + '</span><span onclick="javscript:SwapMonthYear(this,\'up\');return false;" style="float:right;padding-right: 1%;"><i class="rel rel-ic-chevron-right"></i></span><span></span></div>');
            //else
            $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',1);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + $('.DatePicker').data('date-year') + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',1);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span></div>');
            $('#MnthSwaper>div').append(CreateMonth(Month, caller));
            $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').css('display', 'none');
            $('#MnthSwaper').css('display', 'block');

            //#region [Year Selection Process]
            $('*[data-Curyear="true"]').find('span[data-type="text"]').on('click', function () {
                $('#MnthSwaper').css('display', 'none');
                //#region[Year Cycle Creation]
                var first, last;
                var CurYear = parseInt($('*[data-Curyear="true"]').text());
                if (CurYear.toString().slice(3, 4) == "0") {
                    first = CurYear - 10;
                    last = first + 10;
                }
                else {
                    var yearGap = parseInt(CurYear.toString().slice(3, 4));
                    first = CurYear - yearGap;
                    last = first + 10;
                }
                //#endregion
                $('#YearSwaper>div').html('<div data-navYear="true"><span data-navyearcycle="true">&nbsp;' + first + '-' + last + '&nbsp;</span>&nbsp;<span><i title="Down" class="rel rel-ic-angle-down"></i>&nbsp;<i title="Up" class="rel rel-ic-angle-up"></i></span></div>');
                $('#YearSwaper>div').append('<div class="DtpYearSelect"></div>');
                $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                $('#YearSwaper').css('display', 'block');

                $('#YearSwaper > div').find('div:first-child span:nth-of-type(2)').on('click', 'i', function () {
                    if ($(this).attr('title') == 'Up') {
                        last = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:first-child td:first-child').text());
                        first = last - 10;
                        $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                        $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                    }
                    else {
                        first = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:last-child td:last-child').text());
                        last = first + 10;
                        $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                        $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                    }
                    //#region [Cell click Year]
                    $('#YearSwaper > div div.DtpYearSelect').find('table tr').on('click', 'td', function () {
                        $(this).closest('table').find('td').removeClass('SelectedYear');
                        $(this).addClass('SelectedYear');
                    });
                    //#endregion
                });

            });
            //#endregion
        });
        //#endregion

    }
    if (who == 2) {
        $('#MnthSwaper>div').remove();
        $('#MnthSwaper').html('<div></div>');
        $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'down\',1);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + $(caller).text() + '</span><span onclick="javscript:SwapMonthYear(\'' + caller + '\',\'up\',1);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span></div>');
        $('.DatePicker').data('date-year', $(caller).text());
        $('#MnthSwaper>div').append(CreateMonth(undefined, Control));
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').css('display', 'none');
        $('#MnthSwaper').css('display', 'block');
        $('#YearSwaper').css('display', 'none');
        //#region [Year Selection Process]
        $('*[data-Curyear="true"]').find('span[data-type="text"]').on('click', function () {
            $('#MnthSwaper').css('display', 'none');
            //#region[Year Cycle Creation]
            var first, last;
            var CurYear = parseInt($('*[data-Curyear="true"]').text());
            if (CurYear.toString().slice(3, 4) == "0") {
                first = CurYear - 10;
                last = first + 10;
            }
            else {
                var yearGap = parseInt(CurYear.toString().slice(3, 4));
                first = CurYear - yearGap;
                last = first + 10;
            }
            //#endregion
            $('#YearSwaper>div').html('<div data-navYear="true"><span data-navyearcycle="true">&nbsp;' + first + '-' + last + '&nbsp;</span>&nbsp;<span><i title="Down" class="rel rel-ic-angle-down"></i>&nbsp;<i title="Up" class="rel rel-ic-angle-up"></i></span></div>');
            $('#YearSwaper>div').append('<div class="DtpYearSelect"></div>');
            $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, Control));
            $('#YearSwaper').css('display', 'block');

            $('#YearSwaper > div').find('div:first-child span:nth-of-type(2)').on('click', 'i', function () {
                if ($(this).attr('title') == 'Up') {
                    last = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:first-child td:first-child').text());
                    first = last - 10;
                    $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                    $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, Control));
                }
                else {
                    first = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:last-child td:last-child').text());
                    last = first + 10;
                    $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                    $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, Control));
                }
                //#region [Cell click Year]
                $('#YearSwaper > div div.DtpYearSelect').find('table tr').on('click', 'td', function () {
                    $(this).closest('table').find('td').removeClass('SelectedYear');
                    $(this).addClass('SelectedYear');
                });
                //#endregion
            });

        });
        //#endregion
    }
    
}

function CellCheck(caller, event, who) {
    if (who == 0) {
        $(caller).closest('table').find('tr td').removeClass('SelectedDate');
        $(caller).addClass('SelectedDate');
        $('.DatePickerBack .DatePicker .CurDate table').find('tr:nth-of-type(1) td').text($('*[data-monthcontainer="true"]').text().split(',')[0]);
        $('.DatePickerBack .DatePicker .CurDate table').find('tr:nth-of-type(2) td').text($(caller).text());
        $('.DatePickerBack .DatePicker .CurDate table').find('tr:nth-of-type(3) td').text($('*[data-monthcontainer="true"]').text().split(',')[1]);
        var Year = parseInt($('*[data-monthcontainer="true"]').text().split(',')[1]);
        var Month = MonthWord(0, 'S', $('*[data-monthcontainer="true"]').text().split(',')[0]).toString().split('|')[1];
        day = parseInt($(caller).text());
        var SetedDate = new Date(Year, parseInt(Month - 1), day);
        var SetedDay = SetedDate.getDay();
        if (SetedDay == 0)
            SetedDay = 7;
        SetedDay = DayWord(SetedDay, 'F').split('|')[0];
        $('.DatePickerBack .DatePicker .CurDate div:first-child').find('span').text(SetedDay);
    }
    if (who == 1) {
        $(caller).closest('table').find('td').removeClass('selectedMnth');
        $(caller).addClass('selectedMnth');
    }
    if (who == 2) {
        $(caller).closest('table').find('td').removeClass('SelectedYear');
        $(caller).addClass('SelectedYear');
    }
}
function SetDateClose() {
    $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
    $('.DatePickerBack').find('.DatePicker').html('');
    clearInterval(Dtp);
    if (document.activeElement !== null)
        document.activeElement.blur();
 

}
function SetDate(Control, caller) {
    caller = caller.id === undefined ? caller : caller.id;
    if ($(Control).attr('title') == 'Cancel') {
        $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
        $('.DatePickerBack').find('.DatePicker').html('');
        clearInterval(Dtp);
        if (document.activeElement !== null)
            document.activeElement.blur();
    }
    else {
        if ($('#MnthSwaper').css('display') != 'none') {
            if ($('.selectedMnth').length > 0) {
                var table = CreateDays(parseInt($('*[data-curyear="true"]').first().text()), parseInt($('.selectedMnth').data('mnthid')), 0, caller);
                $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').find('div:first-child').html('<span>' + $('.selectedMnth').attr('title') + ',' + $('*[data-curyear="true"]').first().text() + '</span>');
                $('.DatePicker').attr({ 'data-date-year': $('*[data-curyear="true"]').first().text(), 'data-date-month': $('.selectedMnth').text(), 'data-date-monthnum': $('.selectedMnth').data('mnthid') }).data('date-year', $('*[data-curyear="true"]').first().text());
                $('.DatePicker').data('date-month', $('.selectedMnth').text());
                $('.DatePicker').data('date-monthnum', $('.selectedMnth').data('mnthid'));
                $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').find('div:last-child').html(table);
                $('#MnthSwaper').css('display', 'none');
                $('#MnthSwaper>div').html('');
                $('#MnthSwaper').find('div:last-child').html('');
                $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2),.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2) div:last-child').css('display', 'block');

                //#region CellClick [To Check the Current Cell]
                $('.MnthClass').find('div:nth-of-type(2)').first().find('div:last-child>table tr').on('click', 'td', function () {
                    $(this).closest('table').find('td').removeClass('SelectedDate');
                    $(this).addClass('SelectedDate');
                });
                //#endregion
            }
            else
                MsgBox('E', 'Please Select a Month');
        }
        else if ($('#YearSwaper').css('display') != 'none') {
            if ($('.SelectedYear').length > 0) {
                $('#MnthSwaper>div').remove();
                $('#MnthSwaper').append('<div></div>');
                //if ($('#' + caller + '').val() !== '')
                //    $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span>' + DefaultDate[2] + '</span><span></span></div>');
                //else
                $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span data-type="text">' + $('.SelectedYear').text() + '</span></div>');
                $('#MnthSwaper>div').append(CreateMonth(undefined, caller));
                $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').css('display', 'none');
                $('#MnthSwaper').css('display', 'block');
                $('#YearSwaper').css('display', 'none');
                //#region [Year Selection Process]
                $('*[data-Curyear="true"]').on('click', function () {
                    if ($('#MnthSwaper').length > 0)
                        $('#MnthSwaper').css('display', 'none');
                    //#region[Year Cycle Creation]
                    var first, last;
                    var CurYear = parseInt($('*[data-Curyear="true"]').text());
                    if (CurYear.toString().slice(3, 4) == "0") {
                        first = CurYear - 10;
                        last = first + 10;
                    }
                    else {
                        var yearGap = parseInt(CurYear.toString().slice(3, 4));
                        first = CurYear - yearGap;
                        last = first + 10;
                    }
                    //#endregion
                    $('#YearSwaper>div').html('<div data-navYear="true"><span data-navyearcycle="true">&nbsp;' + first + '-' + last + '&nbsp;</span>&nbsp;<span><i title="Down" class="rel rel-ic-angle-down"></i>&nbsp;<i title="Up" class="rel rel-ic-angle-up"></i></span></div>');
                    $('#YearSwaper>div').append('<div class="DtpYearSelect"></div>');
                    $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                    $('#YearSwaper').css('display', 'block');

                    //#region [Cell click Year]
                    $('#YearSwaper > div div.DtpYearSelect').find('table tr').on('click', 'td', function () {
                        $(this).closest('table').find('td').removeClass('SelectedYear');
                        $(this).addClass('SelectedYear');
                    });
                    //#endregion

                    $('#YearSwaper > div').find('div:first-child span:nth-of-type(2)').on('click', 'i', function () {
                        if ($(this).attr('title') == 'Up') {
                            last = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:first-child td:first-child').text());
                            first = last - 10;
                            $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                            $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                        }
                        else {
                            first = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:last-child td:last-child').text());
                            last = first + 10;
                            $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                            $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                        }
                        //#region [Cell click Year]
                        $('#YearSwaper > div div.DtpYearSelect').find('table tr').on('click', 'td', function () {
                            $(this).closest('table').find('td').removeClass('SelectedYear');
                            $(this).addClass('SelectedYear');
                        });
                        //#endregion
                    });

                });
                //#endregion
            }
            else {
                MsgBox('E', 'Please Select a Year to Proceed');
            }
        }
        else {
            if ($('.SelectedDate').length > 0) {

                if ($('.SelectedDate').text().length == 1 && $('#' + caller + '').val($('.SelectedDate').text()).length == 1) {
                    $('.SelectedDate').text("0" + $('.SelectedDate').text())
                }
                else {
                    $('.SelectedDate').text($('.SelectedDate').text());
                }

                //if ($('[data-targetid="' + caller + '"]').data('ctrltype') == "text")
                //{
                //    var ExpiryOldText="";
                //    if (caller == "ExpiringTillDate")
                //    {
                //        ExpiryOldText = $('#' + caller + '').text();
                //    }

                //    if ($('#CurTime .DyDate').length > 0) {
                //        var suffix = $('#CurTime').find('select').val() == 1 ? 'PM' : 'AM';
                //        //var Hr;
                //        //if ($('#CurTime').find('select').val() == 1)
                //        //    Hr = parseInt($('#CurTime .DyDate').find('input').first().val()) + 12
                //        //else
                //        //    Hr = $('#CurTime .DyDate').find('input').first().val()
                //        $('#' + caller + '').text($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year') + ' ' + $('#CurTime .DyDate').find('input').first().val() + ':' + $('#CurTime .DyDate').find('input:nth-of-type(2)').val() + suffix); //':' + $('#CurTime .DyDate').find('input:nth-of-type(3)').val());
                //    }
                //    else
                //        $('#' + caller + '').text($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year'));

                //    if (ExpiryOldText != $('#' + caller + '').text())
                //    {
                //        $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
                //        $('.DatePickerBack').find('.DatePicker').html('');
                //        $('#' + caller + '').change();

                //    }

                //}
                if ($('[data-targetid="' + caller + '"]').data('ctrltype') == "text") {
                    var TodayDate = new Date();
                    var CurrentDate = TodayDate.toString().split(" ")[2] + "-" + TodayDate.toString().split(" ")[1] + "-" + TodayDate.toString().split(" ")[3];
                    var SelectedDate = $('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year');
                    var IsValidDate = true;
                    if (Reliable.DateComparer(SelectedDate, CurrentDate) == 2) {
                        IsValidDate = false;
                    }
                    else {
                        IsValidDate = true;
                    }
                    var ExpiryOldText = "";
                    if (caller == "ExpiringTillDate") {
                        ExpiryOldText = $('#' + caller + '').text();
                    }
                    if (IsValidDate == false)
                    {
                        // alert('Please select a valid date');
                        MsgBox('E', "Please Select Date Greater Than " + CurrentDate + " !");

                        //Global.MsgBox("" + $('#' + newdate).parent().parent().siblings('label').text() + " will be greater or equal to last As On Date.", 'E', focus);
                        //$('#' + newdate).val('');
                    }
                    else {

                        if ($('#CurTime .DyDate').length > 0) {
                            var suffix = $('#CurTime').find('select').val() == 1 ? 'PM' : 'AM';

                            $('#' + caller + '').text($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year') + ' ' + $('#CurTime .DyDate').find('input').first().val() + ':' + $('#CurTime .DyDate').find('input:nth-of-type(2)').val() + suffix); //':' + $('#CurTime .DyDate').find('input:nth-of-type(3)').val());
                        }
                        else
                            $('#' + caller + '').text($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year'));

                        if (ExpiryOldText != $('#' + caller + '').text()) {
                            $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
                            $('.DatePickerBack').find('.DatePicker').html('');
                            $('#' + caller + '').change();

                        }

                    }
                }
                else {
                    if ($('#CurTime .DyDate').length > 0) {
                        var suffix = $('#CurTime').find('select').val() == 1 ? 'PM' : 'AM';
                        //var Hr;
                        //if ($('#CurTime').find('select').val() == 1)
                        //    Hr = parseInt($('#CurTime .DyDate').find('input').first().val()) + 12
                        //else
                        //    Hr = $('#CurTime .DyDate').find('input').first().val()
                        $('#' + caller + '').val($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year') + ' ' + $('#CurTime .DyDate').find('input').first().val() + ':' + $('#CurTime .DyDate').find('input:nth-of-type(2)').val() + suffix); //':' + $('#CurTime .DyDate').find('input:nth-of-type(3)').val());
                    }
                    else
                        $('#' + caller + '').val($('.SelectedDate').text() + '-' + $('*[data-date-month]').first().data('date-month') + '-' + $('*[data-date-month]').data('date-year'));
                }
                try {
                    var callerfunction = $('#' + caller + '').data('callback');
                    var callfun = window[callerfunction];
                    var param = ['' + caller + ''];

                    callfun.apply(null, param);
                } catch (e) {

                }
                $('.DatePickerBack').css({ 'opacity': 0, 'z-index': '-1' });
                $('.DatePickerBack').find('.DatePicker').html('');
            }
            else
                MsgBox('E', 'Please Select a Date');
        }

        clearInterval(Dtp);
        if (document.activeElement !== null)
            document.activeElement.blur();
    }


}

//function Catches the OnClick Event of the DOM element
document.onclick = function (e) {
    //var control = this.activeElement;
    var control = e.target;
    if ($(control)[0].tagName == 'I')
        control = $(control).parent();
    var ControlID = $(control).data('targetid');
    ControlID = ControlID === undefined ? $(control).attr('id') : ControlID = ControlID;
    var AppendTToDiv = $(control).data('targetid'); //$(control).data('callerdiv');
    var p = "";
    //Functioning of Date Picker Buttons
    if (control != null && typeof control !== "undefined" && $(control).closest('div').hasClass('disabled') == false)
        if ($(control).hasClass("txtDate")) {
            var Flag = true;
            var DefaultDate = undefined;
            if ($('#' + ControlID + '').text() != "")
                DefaultDate = $('#' + ControlID + '').text();
            if (DefaultDate !== undefined && DefaultDate != '')
                Flag = DateValidation(DefaultDate);
            if (Flag)
                CreateDateTime('' + ControlID + '', AppendTToDiv, DefaultDate, false);
            else
                MsgBox('E', 'Invalid Date Format');
        }
        else if ($(control).hasClass('txtDateTime')) {
            var Flag = true;
            var DefaultDate = undefined;
            if ($('#' + ControlID + '').text() != "")
                DefaultDate = $('#' + ControlID + '').text();
            if (DefaultDate !== undefined && DefaultDate != '')
                Flag = DateTimeValidation(DefaultDate);
            if (Flag)
                CreateDateTime('' + ControlID + '', AppendTToDiv, DefaultDate, true);
            else
                MsgBox('E', 'Invalid DateTime Format');
        }
}

function DateValidation(date) {
    var DateArray = date.toString().split('-');
    var FormatFlag = false;
    if ((DateArray[0].toString().length == 2 || DateArray[0].toString().length == 1) && DateArray[1].toString().length == 3 && DateArray[2].toString().length == 4)
        FormatFlag = true;

    if (FormatFlag) {
        var DateFlag = false;
        var MonthFlag = false;
        var YearFlag = false;
        if (!isNaN(parseInt(DateArray[0]))) {
            if (parseInt(DateArray[0]) <= 31)
                DateFlag = true;
        }
        if (isNaN(parseInt(DateArray[1]))) {
            var type = DateArray[1].toString().length == 3 ? "S" : "F";

            if (MonthWord(undefined, type, DateArray[1]).split('|')[0] !== undefined)
                MonthFlag = true;
        }
        if (!isNaN(parseInt(DateArray[2])))
            YearFlag = true;
        if (DateFlag == true && MonthFlag == true && YearFlag == true)
            return true;
        else
            return false;

    }
    else
        return false;
}

function buttonpulse(caller, event) {
    var parent, ink, d, x, y;
    var e = event;
    parent = $(caller).parent();
    //create .ink element if it doesn't exist
    if (parent.find(".ink").length == 0)
        parent.prepend("<span class='ink'></span>");

    ink = parent.find(".ink");
    ink.removeAttr('style');
    //incase of quick double clicks stop the previous animation
    //ink.removeClass("animate");

    //set size of .ink
    if (!ink.height() && !ink.width()) {
        //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({ height: d, width: d });
    }

    //get click coordinates
    //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
    x = e.pageX - parent.offset().left - ink.width() / 2;
    y = e.pageY - parent.offset().top - ink.height() / 2;

    //set the position and add class .animate
    //ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
}

function DateTimeValidation(date) {
    var DateArray = date.toString().split(' ')[0];
    var DateFlag = DateValidation(DateArray);
    var TimeArray = date.toString().split(' ')[1].split(':');
    if (TimeArray[1].length == 4) {
        var NewData = TimeArray[1].toUpperCase();
        if (NewData.slice(2, 4) == 'PM')
            TimeArray[0] = parseInt(TimeArray[0]) + 12;
        TimeArray[1] = TimeArray[1].replace(NewData.slice(2, 4), '');
        TimeArray.push('00');
    }

    if (DateFlag) {
        var Hrflag = false, MinFlag = false, SecFlag = false;
        if (!isNaN(parseInt(TimeArray[0])))
            if (parseInt(TimeArray[0]) <= 12 || parseInt(TimeArray[0]) <= 24)
                Hrflag = true;
        if (parseInt(TimeArray[0]) <= 60)
            MinFlag = true;
        if (!isNaN(parseInt(TimeArray[2])))
            SecFlag = true;
        if (Hrflag == true && MinFlag == true && SecFlag == true)
            return true;
        else
            return false;
    }
    else
        return false;
}

function SwapMonthYear(caller, type, Ym) {
    if (Ym == 0) {
        var NexMon, Nexyear, NexMnFull;
        if (type == 'up')
            NexMon = parseInt($('.DatePicker').attr('data-date-monthnum')) + 1;
        else
            NexMon = parseInt($('.DatePicker').attr('data-date-monthnum')) - 1;

        Nexyear = parseInt($('.DatePicker').attr('data-date-year'));
        if (NexMon > 12) {
            Nexyear = Nexyear + 1;
            NexMon = 1;
        }
        if (NexMon == 0) {
            Nexyear = Nexyear - 1;
            NexMon = 12;
        }
        NexMnFull = MonthWord(NexMon, 'F').split('|')[0];
        var table = CreateDays(Nexyear, NexMon, 0, caller);
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').find('div:first-child').html('<span onclick="javscript:SwapMonthYear(\'' + caller.id + '\',\'down\',0);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span  data-type="text">' + NexMnFull + ',' + Nexyear + '</span><span onclick="javscript:SwapMonthYear(\'' + caller.id + '\',\'up\',0);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span><span></span>');
        $('.DatePicker').attr({ 'data-date-year': Nexyear, 'data-date-month': MonthWord(NexMon, 'S').split('|')[0], 'data-date-monthnum': NexMon }).data('date-year', Nexyear);
        $('.DatePicker').data('date-month', MonthWord(NexMon, 'S').split('|')[0]);
        $('.DatePicker').data('date-monthnum', NexMon);
        $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').find('div:last-child').html(table);
        //#region [Month Selection]
        $('*[data-monthcontainer="true"]').find('span[data-type="text"]').on('click', function () {
            var Month = MonthWord(0, 'S', $('.DatePicker').data('date-month')).split('|')[1];
            $('#MnthSwaper>div').remove();
            $('#MnthSwaper').append('<div></div>');
            //if ($('#' + caller + '').val() !== '')
            //    $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(this,\'down\');return false;" style="float:left;padding-left: 1%;"><i class="rel rel-ic-chevron-left"></i></span><span data-type="text">' + DefaultDate[2] + '</span><span onclick="javscript:SwapMonthYear(this,\'up\');return false;" style="float:right;padding-right: 1%;"><i class="rel rel-ic-chevron-right"></i></span><span></span></div>');
            //else
            $('#MnthSwaper>div').append('<div data-Curyear="true" title="Click to Change Year"><span onclick="javscript:SwapMonthYear(\'' + caller.id + '\',\'down\',1);return false;" style="float:left;padding-left: 1%;"><i class="fa fa-chevron-left"></i></span><span data-type="text">' + $('.DatePicker').data('date-year') + '</span><span onclick="javscript:SwapMonthYear(\'' + caller.id + '\',\'up\',1);return false;" style="float:right;padding-right: 1%;"><i class="fa fa-chevron-right"></i></span></div>');
            $('#MnthSwaper>div').append(CreateMonth(Month, caller));
            $('.DatePickerBack .DatePicker .MnthClass div:nth-of-type(2)').css('display', 'none');
            $('#MnthSwaper').css('display', 'block');

            //#region [Year Selection Process]
            $('*[data-Curyear="true"]').find('span[data-type="text"]').on('click', function () {
                $('#MnthSwaper').css('display', 'none');
                //#region[Year Cycle Creation]
                var first, last;
                var CurYear = parseInt($('*[data-Curyear="true"]').text());
                if (CurYear.toString().slice(3, 4) == "0") {
                    first = CurYear - 10;
                    last = first + 10;
                }
                else {
                    var yearGap = parseInt(CurYear.toString().slice(3, 4));
                    first = CurYear - yearGap;
                    last = first + 10;
                }
                //#endregion
                $('#YearSwaper>div').html('<div data-navYear="true"><span data-navyearcycle="true">&nbsp;' + first + '-' + last + '&nbsp;</span>&nbsp;<span><i title="Down" class="rel rel-ic-angle-down"></i>&nbsp;<i title="Up" class="rel rel-ic-angle-up"></i></span></div>');
                $('#YearSwaper>div').append('<div class="DtpYearSelect"></div>');
                $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                $('#YearSwaper').css('display', 'block');

                $('#YearSwaper > div').find('div:first-child span:nth-of-type(2)').on('click', 'i', function () {
                    if ($(this).attr('title') == 'Up') {
                        last = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:first-child td:first-child').text());
                        first = last - 10;
                        $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                        $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                    }
                    else {
                        first = parseInt($('#YearSwaper>div').find('.DtpYearSelect table tr:last-child td:last-child').text());
                        last = first + 10;
                        $('*[data-navyearcycle="true"]').html('&nbsp;' + first + '-' + last + '&nbsp;');
                        $('#YearSwaper>div').find('.DtpYearSelect').html(CreateYear(CurYear, first, last, caller));
                    }
                    //#region [Cell click Year]
                    $('#YearSwaper > div div.DtpYearSelect').find('table tr').on('click', 'td', function () {
                        $(this).closest('table').find('td').removeClass('SelectedYear');
                        $(this).addClass('SelectedYear');
                    });
                    //#endregion
                });

            });
            //#endregion
        });
        //#endregion
    }
    else {
        var CurMn = parseInt($('#MnthSwaper').find('span[data-type="text"]').text());
        if (type == 'up')
            CurMn = CurMn + 1;
        else
            CurMn = CurMn - 1;
        $('#MnthSwaper').find('span[data-type="text"]').text(CurMn);
        $('.DatePicker').data('date-year', CurMn).attr('data-date-year', CurMn);
    }
}

/*------------------------------------------*/
/// End of Date & Time Javascript function///
/*-----------------------------------------*/


//For Days Count
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
Reliable.DateDiff = function (type, Date1, Date2) {
    var firstDate = new Date(Date1);
    var SecondDate = new Date(Date2);
    var diff = firstDate.getTime() - SecondDate.getTime();
    diff = parseInt(diff / 1000 / 60 / 60);
    if (type == "D") {
        diff = parseInt(diff / 24);
    }
    if (type == "M") {
        diff = parseInt(diff / 24 / 30);
    }
    if (type == "Y") {
        diff = parseInt(diff / 24 / 30 / 365);
    }
    return diff;
}