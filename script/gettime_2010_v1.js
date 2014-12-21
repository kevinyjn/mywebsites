// JavaScript Document

// <!--

function getCurDate()
{
    var date = new Date();
    var week;
    switch(date.getDay())
    {
    case 1: week = "星期一"; break;
    case 2: week = "星期二"; break;
    case 3: week = "星期三"; break;
    case 4: week = "星期四"; break;
    case 5: week = "星期五"; break;
    case 6: week = "星期六"; break;
    default: week = "星期日"; break;    
    }
    var years = date.getYear();
    if(2000 > years)
        years += 1900;
    var month = add_zero(date.getMonth() + 1);
    var days = add_zero(date.getDate());
    
    document.getElementById("divDay").innerHTML = years + "年" + month + "月" + days + "日";
    document.getElementById("divDate").innerHTML = week;
}

function getCurTime()
{
    var date = new Date();
    var hours = add_zero(date.getHours());
    var minutes = add_zero(date.getMinutes());
    var seconds = add_zero(date.getSeconds());
    
    if("00" == hours && "00" == minutes && "00" == seconds)
    {
        getCurDate();        // 如果时间为00:00:00，则已经到第二天，更新日期
    }
    
    //var displayDate = years + "年" + month + "月" + days + "日" + week + " " + hours + ":" + minutes + ":" + seconds;
    
    document.getElementById("divTime").innerHTML = hours + ":" + minutes + ":" + seconds;
    //divDay.innerHTML = years + "年" + month + "月" + days + "日";        这种的firefox不支持，采用上面的做法
    //divDate.innerHTML = week;
    //divTime.innerHTML = hours + ":" + minutes + ":" + seconds;
}
function add_zero(_param)
{
    if(10 > _param)
        return "0" + _param;
    else
        return _param;
}

getCurDate();
getCurTime();
setInterval('getCurTime()', 1000);
// -->