/* 
这是抽出来公用的方法和变量定义，其目的是简化开发，重用代码，统一维护。具体可参考waitlist.jsp的实例
*/
var f2                  = true;
var f                   = true;
var _documentBodyHeight = window.top.findPageCacheName("_documentBodyHeight"); //设高度适配滚动条
var unCloseArray        = new Array(); //数据变量定义为全局的
var clickCloseArray     = new Array();
var closeCon;
var qryDIV;
var listType0Text       = "";
var listType1Text       = "";
var listType0Id         = "listType0Id"; //默认页面
var listType1Id         = "listType1Id"; //切换页面

//simple
var refreshbutton       = "refreshbutton"; //刷新按钮
var qryaltInfoId        = "qryaltInfoId"; //简单查询输入框id
var list_search_down    = "list_search_down"; //下拉图标
var list_search_button  = "list_search_button"; //搜索图标(简单查询)

//adv
var list_search_tan     = "list_search_tan"; //高级查询框
var qrybutton           = "qrybutton";
var cancelbutton        = "cancelbutton";

/**
 * [setEnterEvent 回车事件的注册（稍后考虑加入多浏览器的查询）]
 */
function setEnterEvent() {
    $(document).keydown(function() {
        if (event.keyCode == 13) {
            refreshGrid();
            qryDIV.fadeOut();
        }
    });
}
/**
 * [setChangeListTypeEvent 列表切换事件]
 */
function setChangeListTypeEvent() {
    if (!IsSpace(flag4ListType)) {
        if (flag4ListType == "0") {//点待处理进入时
            $("#listType1Id").show();//显示待阅读
        } else if (flag4ListType == "1") {//反之亦然
            $("#listType0Id").show();
        }

        $("#" + listType0Id).click(function(e) {
            $(this).hide();
            $("#" + listType1Id).show();
            flag4ListType = "0";
            refreshGrid();
            qryDIV.fadeOut();
        });
        $("#" + listType1Id).click(function(e) {
            $(this).hide();
            $("#" + listType0Id).show();
            flag4ListType = "1";
            refreshGrid();
            qryDIV.fadeOut();
        });
    }
}
/**
 * [setObj 初始化处理除日期框 的控件]
 */
function setObj() { //
    f = false; //只加载一次
    //定义 ----不关的
    unCloseArray.push($("#" + list_search_tan));
    $("#" + list_search_tan + " div").each(function() {
        unCloseArray.push(this);
    });
    //定义 ---- 关的
    clickCloseArray.push($("#" + refreshbutton)); //刷新按钮
    clickCloseArray.push($("#" + list_search_button)); //查询放大镜图标
    clickCloseArray.push($("#" + qrybutton)); //搜索
    clickCloseArray.push($("#" + cancelbutton)); //取消
    closeCon = new PubOPT.closeControl({
        clickId: list_search_tan,
        unCloseArray: unCloseArray,
        clickCloseArray: clickCloseArray,
        closeFunction: function() {
            qryDIV.fadeOut();
            $dp.hide();
        }
    });
}
/**
 * [setSimpleQryObj 简单查询栏和通用高级查询事件定义，及元素弹窗关窗处理]
 */
function setQryObjs() {
    //简单查询条件，基本固定
    qryDIV = $("#" + list_search_tan);
    var qryaltInfoObj = $("#" + qryaltInfoId); //会议室输入框
    var list_search_downObj = $("#" + list_search_down); //显示/隐藏的图标

    //简单查询中的元素事件处理
    $("#" + refreshbutton).click(function(e) { //刷新按钮
        refreshGrid();
        qryDIV.fadeOut();
    });
    qryaltInfoObj.click(function(e) {
        if (!qryDIV.is(':hidden')) {
            qryDIV.fadeOut();
        }
    });
    list_search_downObj.click(function(e) {
        if (qryDIV.is(':hidden') == true) {
            if (titleInputId != "") {
                $("#" + titleInputId).focus();
            }
            qryDIV.fadeIn();
        } else {
            qryDIV.fadeOut();
        }
    });
    $("#" + list_search_button).click(function(e) { //搜索放大镜图标()
        refreshGrid();
        qryDIV.fadeOut();
    });

    //高级查询中的元素 --------------------------------------------------
    $("#" + qrybutton).click(function(e) { //搜索按钮
        refreshGrid();
        qryDIV.fadeOut();
    });
    $("#" + cancelbutton).click(function(e) { //取消按钮
        qryDIV.fadeOut();
    });
}
/**
 * [callsetObj 调用注册日期框一次]
 * @return {[type]} [description]
 */
function callsetObj() {
    f2 && setTimeout(function() {
        setObjfromTime();
    }, 100);
}
/**
 * [setObjfromTime 注册日期框]
 */
function setObjfromTime() { //false 日期框不处理，true时注册日期框 的关闭回调
    var i = 1;
    f2 = false;
    //定义 ----不关的
    $("*", $dp.dd.lastChild.contentDocument).each(function() {
        unCloseArray.push(this);
    });
    closeCon.unCloseArray = unCloseArray;
    closeCon.init();
}