// JavaScript Document



// 焦点图片框幻灯片 构造函数 
// edited 2011.5.31
// resource from sina
/*
    discription: 焦点图片框幻灯片类的公用工具集
*/
var focusUtils = {
    hoverNum:function(I){
        I = window.event ? event : I;
        var i = I.srcElement || I.target;
        if(i)
        {
            i.className = "NumberHover";
            i.setAttribute("ishovering", "true")
        }
    }, leaveNum:function(I){
        I = window.event ? event : I;
        var i = I.srcElement || I.target;
        if(i)
        {
            i.removeAttribute("ishovering");
            if(i.className != "selected")
            {
                i.className = "NumberLeave"
            }
        }
    }, absPosition:function(o,I){
        var l = o.offsetLeft, O=o.offsetTop, i=o;
        while(i.id != document.body & i.id != document.documentElement & i != I)
        {
            i = i.offsetParent;
            l += i.offsetLeft;
            O += i.offsetTop
        };
        return{left:l, top:O}
    }
};

function Pixviewer(FocusImgID, BigPicID, NumberID, NumberBgID, width, height)
{
    this.Data = [];
    this.TimeOut = 5000;
    var isIE = navigator.appVersion.indexOf("MSIE") != -1 ? true : false;
    this.width = width;
    this.height = height;
    this._divtriangle = null;
    this.titleHeight = 0;
    this.TitleID=null;
    this.selectedIndex = 0;
    var TimeOutObj;
    if(!Pixviewer.childs)
    {
        Pixviewer.childs=[]
    };
    this.showTime = null;
    this.showSum = 10;
    this.ID = Pixviewer.childs.push(this) - 1;
    this.listCode = '<span style="cursor:pointer; margin:0px; padding:1px 7px 1px 8px; border-left:solid 1px #cccccc; [$rightborder]" src="[$pic]" onclick="Pixviewer.childs[[$thisId]].select([$num])">[$numtoShow]</span>';
    this.Add = function(jsnObj){
        this.Data.push(jsnObj)
    };
    this.TimeOutBegin = function(){
        clearInterval(TimeOutObj);
        TimeOutObj = setInterval("Pixviewer.childs[" + this.ID + "].next()", this.TimeOut)
    };
    this.TimeOutEnd = function(){
        clearInterval(TimeOutObj)
    };
    this.select = function(num, noAction){
        if(num > this.Data.length - 1){return};
        if(num == this.selectedIndex){return};
        this.TimeOutBegin();
        if(BigPicID)
        {
            if(this.$(BigPicID))
            {
                var aObj = this.$(BigPicID).getElementsByTagName("a")[0];
                aObj.href = this.Data[num].url;
                if(this.aImgY)
                {
                    this.aImgY.style.display = 'none';
                    this.aImg.style.zIndex = 0
                };
                this.aImgY=this.$('F' + this.ID + 'BF' + this.selectedIndex);
                this.aImg=this.$('F' + this.ID + 'BF' + num);
                clearTimeout(this.showTime);
                this.showSum = 5;
                if(!noAction)
                { 
                    var appleMobileCheck = /\((iPad|iPhone|iPod)/i;
                    if(appleMobileCheck.test(navigator.userAgent))
                    {
                        if(this.aImgY)
                        {
                            this.aImgY.style.display = 'none'
                        };
                        this.aImg.style.display = 'block';
                        this.aImg.style.zIndex = 0;
                        this.aImg.style.opacity = 1;
                        this.aImgY = null
                    }
                    else
                    {
                        this.showTime = setTimeout("Pixviewer.childs[" + this.ID + "].show()", 30)
                    }
                }
                else
                {
                    if(isIE)
                    {
                        this.aImg.style.filter = "alpha(opacity=100)"
                    }
                    else
                    {
                        this.aImg.style.opacity = 1
                    }
                }
            }
        };
        if(NumberID)
        {
            if(this.$(NumberID) && FocusImgID&&this.$(FocusImgID))
            {
                var sImg = this.$(NumberID).getElementsByTagName("span"), i;
                for(i = 0; i < sImg.length; i++)
                {
                    if(i == num || num == (i - this.Data.length))
                    {
                        sImg[i].className = "selected"
                    }
                    else
                    {
                        sImg[i].className = "";
                        if(sImg[i].getAttribute("ishovering") != "true")
                        {
                            sImg[i].className="NumberLeave"
                        }
                    }
                };
                if(!this._divtriangle)
                {
                    this._divtriangle = document.createElement("div");
                    this._divtriangle.className = "Triangle";
                    this._divtriangle.style.bottom = this.titleHeight + "px";
                    this.$(FocusImgID).appendChild(this._divtriangle)
                };
                if(this._divtriangle)
                {
                    this._divtriangle.style.right = (sImg.length - num - 1) * 21 + (sImg.length - num) + 1 + "px"
                }
            }
        };
        if(this.TitleID && this.$(this.TitleID))
        {
            this.$(this.TitleID).innerHTML = "<a href=\"" + this.Data[num].url + "\" target=\"_blank\">" + this.Data[num].title + "</a>"
        };
        this.selectedIndex = num;
        if(this.onchange)
        {
            this.onchange()
        }
    };
    this.show = function(){
        this.showSum--;
        if(this.aImgY)
        {
            this.aImgY.style.display = 'block'
        };
        this.aImg.style.display = 'block';
        if(isIE)
        {
            this.aImg.style.filter = "alpha(opacity=0)";
            this.aImg.style.filter = "alpha(opacity=" + (5 - this.showSum) * 20 + ")"
        }
        else
        {
            this.aImg.style.opacity = 0;
            this.aImg.style.opacity = (5 - this.showSum) * 0.2
        };
        if(this.showSum <= 0)
        {
            if(this.aImgY)
            {
                this.aImgY.style.display = 'none'
            };
            this.aImg.style.zIndex = 0;
            this.aImgY = null
        }
        else
        {
            this.aImg.style.zIndex = 2;
            this.showTime = setTimeout("Pixviewer.childs[" + this.ID + "].show()", 30)
        }
    };
    this.next = function(){
        var temp = this.selectedIndex;
        temp++;
        if(temp >= this.Data.length)
        {
            temp = 0
        };
        this.select(temp)
    };
    this.pre = function(){
        var temp = this.selectedIndex;
        temp--;
        if(temp < 0)
        {
            temp = this.Data.length - 1
        };
        this.select(temp)
    };
    this.begin = function(){
        this.selectedIndex = -1;
        var i, temp = "";
        if(FocusImgID)
        {
            if(this.$(FocusImgID))
            {
                var topObj = this.$(FocusImgID);
                topObj.style.width = this.width + "px";
                topObj.style.height = this.height + this.titleHeight + "px";
                var _hb = document.createElement("div");
                _hb.className = "BorderHack1";
                _hb.style.width = this.width + "px";
                topObj.appendChild(_hb);
                _hb = document.createElement("div");
                _hb.className = "BorderHack2";
                _hb.style.height = this.height + "px";
                topObj.appendChild(_hb);
                _hb = document.createElement("div");
                _hb.className = "BorderHack3";
                _hb.style.width = this.width + "px";
                _hb.style.bottom = this.titleHeight + "px";
                topObj.appendChild(_hb);
                _hb = document.createElement("div");
                _hb.className = "BorderHack4";
                _hb.style.height = this.height + "px";
                topObj.appendChild(_hb)
            }
        };
        if(this.TitleID)
        {
            if(this.$(this.TitleID))
            {
                if(this.titleHeight == 0)
                {
                    this.$(this.TitleID).style.display = 'none'
                }
            }
        };
        if(NumberBgID)
        {
            if(this.$(NumberBgID))
            {
                this.$(NumberBgID).style.bottom = this.titleHeight + 1 + "px"
            }
        };
        if(BigPicID)
        {
            if(this.$(BigPicID))
            {
                var aObj = this.$(BigPicID).getElementsByTagName("a")[0];
                aObj.style.zoom = 1;
                this.$(BigPicID).style.position = "relative";
                this.$(BigPicID).style.zoom = 1;
                this.$(BigPicID).style.overflow = "hidden";
                this.$(BigPicID).style.height = this.height + "px";
                for(i = 0; i < this.Data.length; i++)
                {
                    temp += '<img src="'+this.Data[i].pic+'" id="F'+this.ID+'BF'+i+'" style="display:'+(i==0?'block':'none')+'" galleryimg="no"'+(this.width?' width="'+this.width+'"':'')+(this.height?' height="'+this.height+'"':'')+' alt="'+this.Data[i].title+'" />'
                };
                aObj.innerHTML = temp;
                var imgObjs = aObj.getElementsByTagName("img"), XY = focusUtils.absPosition(imgObjs[0], this.$(BigPicID));
                for(i = 0; i < imgObjs.length; i++)
                {
                    imgObjs[i].style.position = "absolute";
                    imgObjs[i].style.top = XY.top + "px";
                    imgObjs[i].style.left = XY.left + "px";
                    imgObjs[i].style.width = this.width + "px";
                    imgObjs[i].style.height = this.height + "px"
                }
            }
        };
        if(NumberID)
        {
            if(this.$(NumberID))
            {
                tempHTML = "";
                for(i = 0; i < this.Data.length; i++)
                {
                    temp = this.listCode;
                    temp = temp.replace(/\[\$thisId\]/ig, this.ID);
                    temp = temp.replace(/\[\$num\]/ig, i);
                    temp = temp.replace(/\[\$numtoShow\]/ig, i + 1);
                    temp=temp.replace(/\[\$title\]/ig, this.Data[i].title);
                    if(i == this.Data.length - 1)
                    {
                        temp = temp.replace(/\[\$rightborder\]/ig, "border-right:solid 1px #cccccc;")
                    };
                    tempHTML += temp
                };
                this.$(NumberID).innerHTML = tempHTML;
                this.$(NumberID).style.bottom = this.titleHeight + 1 + "px";
                var sImg = this.$(NumberID).getElementsByTagName("span"), i;
                for(i = 0; i < sImg.length; i++)
                {
                    if(window.attachEvent)
                    {
                        sImg[i].attachEvent("onmouseover", focusUtils.hoverNum);
                        sImg[i].attachEvent("onmouseout", focusUtils.leaveNum)
                    }
                    else
                    {
                        sImg[i].addEventListener("mouseover", focusUtils.hoverNum, false);
                        sImg[i].addEventListener("mouseout", focusUtils.leaveNum, false)
                    }
                }
            }
        };
        this.TimeOutBegin();
        this.select(0, true)
    };
    this.$=function(objName){
        if(document.getElementById)
        {
            return eval('document.getElementById("'+objName+'")')
        }
        else
        {
            return eval('document.all.'+objName)
        }
    }
};

var picviewer_02 = new Pixviewer("div_PixViewer","div_BigPic_2","div_Number_2", "div_NumberBg_2", 339, 255);
picviewer_02.TimeOut = 5000;
picviewer_02.TitleID = "div_TitleBox_2";
picviewer_02.titleHeight = 28;
picviewer_02.htmlData = document.getElementById('focusData_01').getElementsByTagName('dl');
for(var i = 0; i < picviewer_02.htmlData.length; i++){
    var jsonData = {
        title : picviewer_02.htmlData[i].getElementsByTagName('a')[0].innerHTML,
        url : picviewer_02.htmlData[i].getElementsByTagName('a')[0].href,
        pic : picviewer_02.htmlData[i].getElementsByTagName('dd')[0].innerText || picviewer_02.htmlData[i].getElementsByTagName('dd')[0].textContent
    };
    picviewer_02.Add(jsonData);
};
picviewer_02.begin();


