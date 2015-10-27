/// <reference path="jquery-1.3.2.min-vsdoc.js" />
//--------------------------------------------------------------------------
/*参数：[可选参数在调用时可写可不写,其他为必写]
----------------------------------------------------------------------------
title:	窗口标题
sid:  id
width:	内容宽度
height:	内容高度(auto为高度根据内容自适应)
showbg:	设置是否显示遮罩层(false为不显示,true为显示)
drag:  [可选参数]是否可以拖动(ture为是,false为否)
time:	[可选参数]自动关闭等待的时间，为空是则不自动关闭
cssName:  [可选参数]附加class名称
isalert:  [可选参数]是否为提示信息窗口(false为不是,true为是)
------------------------------------------------------------------------*/
//示例:
//------------------------------------------------------------------------
//showDiv("例子","id","500","400","true","3000","true","exa","flase")
//------------------------------------------------------------------------
var showWindown = true;
var drag = false;
var showbg = true;
var getheight = function () { //窗口的高
    return $(window).height();
};
var getwidth = function() { //窗口的宽
    return $(window).width();
};
var isie6 = function() { //IE6判断
    if ($.browser.msie) {
        if ($.browser.version == "6.0") return true;
    }
    return false;
};

function showDiv(title, sid, width, height, showbg, drag, time, cssName, isalert) {
    var width = width >= 950 ? this.width = 950 : this.width = width;     //设置最大窗口宽度
    var height = height >= 527 ? this.height = 527 : this.height = height;  //设置最大窗口高度
    if (showWindown == true) {
        var simpleWindown_html = new String;
        simpleWindown_html = "<div id=\"windownbg\" style=\"height:" + getheight() + "px;background:#111;filter:alpha(opacity=0);opacity:0;z-index:10000;\"><iframe style=\"width:100%;height:100%;border:none;filter:alpha(opacity=0);opacity:0;\"></iframe></div>";
        $("body").append(simpleWindown_html);
        $("#" + sid).wrap("<div id=\"windown-box\"></div>").wrap("<div id=\"windown-content-border\"><div id=\"windown-content\"></div></div>");
        if (isalert != "false") {
            $("#windown-box").prepend("<div id=\"windown-title\"><h2></h2><span id=\"windown-close\" title=\"关闭\">关闭</span></div>");
        };
        show = false;
    };
    $("#windown-title h2").html(title);
    if (showbg == "true") { $("#windownbg").show(); } else { $("#windownbg").remove(); };
    $("#windownbg").animate({ opacity: "0.5" }, 1000, function () { }); //设置透明度
    
    $("#windown-box,#" + sid).show();
 if (height >= 527) {
        $("#windown-title").css({ width: (parseInt(width) + 22) + "px" });
        $("#windown-content").css({ width: (parseInt(width) + 17) + "px", height: height + "px" });
    } else {
        $("#windown-title").css({ width: (parseInt(width) + 10) + "px" });
        if(height=="auto"){
            $("#windown-content").css({ width: width + "px", height: (parseInt($("#" + sid).outerHeight()) + 10) + "px" });
        } else {
            $("#windown-content").css({ width: width + "px", height: height + "px" });
        };
};
    wsize();
    var _move = false; //移动标记
    var _x, _y; //鼠标离控件左上角的相对位置
    $("#windown-title").mouseover(function() {
        if (drag == "true") { $(this).css("cursor", "move"); } else { $(this).css("cursor", "default"); }
    }).mousedown(function(e) {
        if (drag == "true") {
            _move = true;
            _x = e.pageX - parseInt($("#windown-box").css("left"));
            _y = e.pageY - parseInt($("#windown-box").css("top"));
            //$("#windown-box").fadeTo(20, 0.25); //点击后开始拖动并透明显示
        } else { _move = false; }
    });
    $(document).mousemove(function(e) {
        if (_move) {
            var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            $("#windown-box").css({ top: y, left: x }); //控件新位置
        }
    }).mouseup(function() {
        _move = false;
        //$("#windown-box").fadeTo("fast", 1); //松开鼠标后停止移动并恢复成不透明
        //$("#windown-box").css({ opacity: "1" });
    });
    $("#windown-content").attr("class", cssName); //附加内容样式
    if (time == "" || typeof (time) == "undefined") {
        $("#windown-close").click(function() {
            closeDiv(sid);
        });
    } else {
        setTimeout(function() { $("#windownbg,#windown-title,#windown-close").remove(); $("#windown-box").fadeOut("slow"); $("#" + sid).replaceAll("#windown-box"); $("#" + sid).hide(); }, time);
    };
};
var closeDiv = function(tid) {
    $("#windownbg,#windown-title,#windown-close").remove();
    $("#windown-box").fadeOut("slow");
    $("#" + tid).replaceAll("#windown-box");
    $("#" + tid).hide();
};
var wsize = function () {
    if (isie6()) {
        $('#windownbg').css({ 'width': getwidth(), 'height': getheight() + $(document).scrollTop() });
        $('#windown-box').css({ 'left': getwidth() / 2 - $('#windown-box').outerWidth() / 2, 'top': getheight() / 2 - $('#windown-box').outerHeight() / 2 + $(document).scrollTop() });
    } else {
        if ($(document).height() > getheight()) {
            $('#windownbg').css({ 'width': getwidth(), 'height': getheight() });
        } else {
            $('#windownbg').css({ 'width': getwidth(), 'height': $(document).height() });
        };
//        var scrollpos = new ScollPostion();
        var scrolltop = $(document).scrollTop();
        var top = getheight() / 2 - $('#windown-box').outerHeight() / 2 + scrolltop;
//        alert(getheight() + "," + $('#windown-box').outerHeight() + "," + scrollpos.t)
        $('#windown-box').css({ 'left': getwidth() / 2 - $('#windown-box').outerWidth() / 2, 'top': top });
    };
};
$(function() {
    $(window).resize(function() {
        wsize();
    });
    $(window).scroll(function() {
        if (isie6()) {
            $('#windownbg').css({ 'width': getwidth(), 'height': getheight() + $(document).scrollTop() });
            //$('#windown-box').css({ 'left': getwidth() / 2 - $('#windown-box').outerWidth() / 2, 'top': getheight() / 2 - $('#windown-box').outerHeight() / 2 + $(document).scrollTop() });
        };
    });
});

var ScollPostion = function () {//滚动条位置        
    var t = 0, l = 0, w = 0, h = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    this.t = t;
    this.l = l;
    this.w = w;
    this.h = h;
}