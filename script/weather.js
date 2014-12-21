// JavaScript Document
var objXmlHttp = null;
var XMLHttpReq = null;
function createXMLHttpRequest()
{
    if(window.XMLHttpRequest)
    {
        XMLHttpReq = new XMLHttpRequest();
    }
    else if(window.ActiveXObject)
    {
        try
        {
            XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
            }
        }
    }
}

function sendRequest(url)
{
    // create xmlhttprequest
    createXMLHttpRequest();
    
    // 打开连接，以POST发送，进行异步
    //XMLHttpReq.open("POST", url, true);
    
    // 以POST发送时，必须设置RequestHeader
    //XMLHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // 打开连接，以GET发送，进行异步
    if (XMLHttpReq) {
        XMLHttpReq.open('GET', url, true);
        
        // 设置回调函数
        XMLHttpReq.onreadystatechange = processResponse;
        
        // 发送请求
        try {
            XMLHttpReq.send();
        }
        catch(e) {
            alert("send request package error!");
        }
        //XMLHttpReq.send();
    }
    else {
        //alert("无法创建 XMLHttpRequest");
    }
}
function processResponse(evtXHR)
{
    if(4 == XMLHttpReq.readyState)
    {
        if(200 == XMLHttpReq.status)
        {
            var data = XMLHttpReq.responseXML;
            alert(data);
        }
        else
        {
            //alert("不允许跨域请求");
        }
    }
    else {
        //alert("执行状态 readyState:" + XMLHttpReq.readyState);
    }
}

function openUrl(url)
{
    if(window.ActiveXObject)
    {
        objXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest)
    {
        objXmlHttp = new XMLHttpRequest();
    }
    else
    {
        objXmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    objXmlHttp.open("GET", url, false);
    objXmlHttp.onreadystatechange=stateChange;
    try
    {
        objXmlHttp.send(null);
    }
    catch(e)
    {
        alert("send request package error!");
    }
    /*
    try
    {
        var objXml = new ActiveXObject("Microsoft.XMLHTTP");
        alert("new");
        objXml.open("GET", url, false);
        objXml.send(null);
        //var objXmlHttp = new ActiveXObject("Microsoft.XMLHttp");
        // test
        var retInfo = objXml.responseText;
        if("200" == objXml.status)
        {
            return retInfo;
        }
        else
        {
            return "-1";
        }
    }
    catch(e)
    {
        alert("attach to url error!");
    }
    */
}
function stateChange()
{
    if(4 == objXmlHttp.readyState)
    {
        if(200 == objXmlHttp.status)
        {
            var data = objXmlHttp.responseXML;
            
        }
    }
}

function getWeather(cityId, days)
{
    var ret;
    var weather = "晴";
    var tempreature = 20;
    var url = "http://www.weather.com.cn/html/weather/" + cityId + ".shtml" + "#7d";
    //var xmlText = openUrl(url);
    //url = "http://tw.weather.yahoo.com/world_single.html? city= 10101";
    //sendRequest(url);
    // test
    var ret = weather + " " + tempreature + "℃";
    
    return ret;
}

function getCityId(city)
{
    var citySize = cityIds.length;
    var cityIndex = 0;
    for(var cityIndex = 0; cityIndex < citySize; cityIndex++)
    {
        if(city == cityIds[cityIndex][0])
        {
            return cityIds[cityIndex][1];
        }
    }
    if(cityIndex >= citySize)    // if no such city
    {
        return -1;
    }
}

function getPosition()
{
    var pos;
    
    // test
    pos = "厦门";
    return pos;
}

function writeWeather()
{
    var days;
    var city = getPosition();
    var cityId = getCityId(city);
    if(0 > cityId)
    {
        city = cityIds[0][0];
        cityId = cityIds[0][1];
    }
    
    // write out
    document.getElementById("divPosition").innerHTML = city;
    document.getElementById("divWeather").innerHTML = getWeather(cityId, days);
    
    //divPosition.innerHTML = pos;
    //divWeather.innerHTML = getWeather(pos, days);    
}

function writeWeatherProvider()
{
    var provider;
    var releaseTime;
    var years;
    var month;
    var days;
    var hours;
    var minutes;
    
    // test
    years = 2011;
    month = 3;
    days = 20;
    hours = 17;
    minutes = 20;
    
    provider = "中国气象局";
    releaseTime = years + "/" + month + "/" + days + " " + hours + ":" + minutes + " 发布";
    
    document.getElementById("weatherProvider").innerHTML = provider;
    document.getElementById("weatherReleaseTime").innerHTML = releaseTime;
    //weatherProvider.innerHTML = provider;
    //weatherReleaseTime.innerHTML = releaseTime;
}

writeWeather();
writeWeatherProvider();
