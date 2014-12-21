// JavaScript Document

// <!--

function loadImg(objImg, typeId, imgId)
{
    //var lyr = null;
    switch(typeId)
    {
    case 1:
        //lyr = document.getElementById("focus");
        objImg.src="images/button-focus.png";
        break;
    case 2:
        //lyr = document.getElementById("down");
        objImg.src="images/button-down.png";
        break;
    default:
        //lyr = document.getElementById("normal");
        objImg.src="images/button-normal.png";
        break;
    }
    //lyr.styles.left = objImg.styles.left;
    //lyr.styles.top = objImg.styles.top;
    //lyr.display="";
    //alert("test");
    //objImg.styles.backgroundImage = lyr;
}
function loadBkGndImg(objImg, typeId, imgId)
{
    //var lyr = null;
    switch(typeId)
    {
    case 1:
        //lyr = document.getElementById("focus");
        objImg.background="images/button-focus.png";
        break;
    case 2:
        //lyr = document.getElementById("down");
        objImg.background="images/button-down.png";
        break;
    default:
        //lyr = document.getElementById("normal");
        objImg.background="images/button-normal.png";
        break;
    }
    //lyr.styles.left = objImg.styles.left;
    //lyr.styles.top = objImg.styles.top;
    //lyr.display="";
    //alert("test");
    //objImg.styles.backgroundImage = lyr;
}

// -->