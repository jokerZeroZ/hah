/**
 * ui 布局控件，沈联成2012-8-23新建
 * 包括
 * -----------------
 *    |
 *    |
 * ------------
 */
/**
 * 布局控件值对像
 */
(function($) {
	$.IfromLayout = function() {
		/**
		 * 开始布局
		 */
		this.layout = function() {
			switch (this.layoutClass) {
			case 'wrap':
				var p = this;
				layoutHeaderLeftRigthNew(this.layoutID, this);
				$("#header").load(p.headerUrl?p.headerUrl:"ccapp/oa/common/newlayout/header.jsp", {});
				$("#funcBar_box").load(p.leftUrl?p.leftUrl:"ccapp/oa/common/newlayout/left.jsp", function() {
					newTree(tree);
					if(p.showList != null) {
						for(var i = 0;i < p.showList.length;i++){
							var b = new $.boxMenu();
							b.isClose = true;
							b.menuId = p.showList[i].menuId;
							b.menuName = p.showList[i].menuName;
							b.leftUrl = p.showList[i].lefturl;
							b.oper = p.showList[i].oper;
							b.isReload = false;
							b.isfristpage = p.showList[i].isfristpage;
							if(b.isfristpage) {
								b.isClose = false;
							}
							addBoxMenu(b, p.layoutID, p.showList[i].url, p.showList[i].secendmenu);
						}
					}
					if(fristMenu){
						$(fristMenu).click();
					}
				});
				
				// 自适应高度
				$(window).resize(function() {
					// 首先得到窗口H,W
					var allOpenMianDiv =  $("#main").children("div");
					for(i = 0; i < allOpenMianDiv.length; i++) {
						var menuId = $(allOpenMianDiv[i]).attr("id");
						if($(allOpenMianDiv[i]).is(":visible")) {//是否显示
							var boxMenu = new $.boxMenu();
							boxMenu.menuId = menuId.substring(17,menuId.length);
							adaptationWidthAndHeightMSNew(boxMenu,p.layoutID);
							computeBoxWidthSecond(boxMenu,p.layoutID);
							break;
						}
					}
				});
				break;

			default:
				// 生成布局
				var p = this;
				layoutHeaderLeftRigth(this.layoutID, this);

				$("#_header_" + this.layoutID).load(p.headerUrl?p.headerUrl:"header.jsp", {});
				$leftUrl=p.leftUrl;
				$("#_left_" + this.layoutID).load(p.leftUrl?p.leftUrl:"left_.jsp", function() {
					newTree(tree);
					var windowsWidth = $(window).width();
					var windowsHeight = $(window).height();
					adaptationWidthAndHeightMS(p, windowsWidth, windowsHeight);
					if(p.showList){
						for(var i = 0;i < p.showList.length;i++){
							var b = new $.boxMenu();
							b.isClose = false;
							if(p.showList[i].isClose){
								b.isClose = true;
							}
							b.menuId = p.showList[i].menuId;
							b.menuName = p.showList[i].menuName;
							b.leftUrl = p.showList[i].lefturl;
							b.oper = p.showList[i].oper;
							b.isReload = false;
							addBoxMenu(b, p.layoutID, p.showList[i].url);
						}
					}
					if(fristMenu){
						$(fristMenu).click();
					}
					var windowsWidth = $(window).width();
					var windowsHeight = $(window).height();
					adaptationWidthAndHeightMS(p, windowsWidth, windowsHeight);
				});

				// 自适应高度
				$(window).resize(function() {
					// 首先得到窗口H,W
					var windowsWidth = $(window).width();
					var windowsHeight = $(window).height();
					adaptationWidthAndHeightMS(p, windowsWidth, windowsHeight);
				});

				break;
			}

		}
		menuLayoutName = 'ms';
	};
	$.extend($.IfromLayout, {});
})(jQuery);
var fristMenu = false;
/**
 * 布局控件值对像
 */
(function($) {
	$.boxMenu = function() {
		menuName = "Menu Name"
	};
	$.extend($.IfromLayout, {
		menuId : ''/* 布局的DIVID */
	}, {
		menuName : ''/* 布局名字 */
	}, {
		SupermenuId : ''/* 是在哪个Menu下打开的标记 */
	}, {
		isClsoe : ''/* 是否有关闭按钮 */
	}, {
		boxObj : ''/* 放置Menu的容器 */
	}, {
		documentObj : ''/* 打开的窗口对像 */
	});
})(jQuery);



/**
 * 上，左右布局
 */

var layoutHeaderLeftRigth = function(layoutID, p) {
	var obje = $("#" + layoutID);
	// 新建头DIV
	var heander = createDiv("_header_" + layoutID, "_header_" + layoutID);
	$(obje).append($(heander));
	// 新建头下面的DIV
	var body = createDiv("_body_" + layoutID, "_body_" + layoutID);
	$(obje).append($(body));
	// 新建头最下面的DIV
	if (p.isShowBottom) {
		var bottom = createDiv("_bottom_" + layoutID, "_bottom_" + layoutID);
		$(obje).append($(bottom));
	}
	// 新建左边DIV
	var left = createDiv("_left_" + layoutID, "_left_" + layoutID);
	$(body).append($(left));
	// 新建右边DIV
	var right = createDiv("_right_" + layoutID, "_right_" + layoutID);
	$(body).append($(right));
	// 新建右边上面DIV
	var rightTop = createDiv("_right_top_" + layoutID, "_right_top_" + layoutID);
	$(right).append($(rightTop));

	/* 这里以后做成配置型的 */
	msSoftMenu($(rightTop), layoutID);
	// 新建右边下面的DIV
	var rightBottom = createDiv("_right_bottom_" + layoutID, "_right_bottom_"
			+ layoutID);
	$(right).append($(rightBottom));
}

/* 打开页面导航条 */
var setMenu = function(superDiv, menuId, layoutID, menuLayoutName) {
	switch (menuLayoutName) {
	case 'lk':
		break;
	default:
		msSoftMenu(superDiv, layoutID);// 默认微软IE风格
		break;
	}
}


/**
 * 生成窗口
 */
var msSoftMenu = function(superDiv, layoutID) {

	var rightTopImg = createDiv("_right_top_img_" + layoutID, "_right_top_img_"
			+ layoutID);
	$(superDiv).append($(rightTopImg));

	var tabsDiv = createDiv("_right_menu_tabs_" + layoutID, "_right_menu_tabs_"
			+ layoutID);
	$(superDiv).append($(tabsDiv));

	var boxLeft = createDiv("_right_box_left_" + layoutID, "_right_box_left_"
			+ layoutID);
	$(tabsDiv).append($(boxLeft));

	
	
	var rigthBox = createDiv("_right_box_" + layoutID, "_right_box_" + layoutID);
	$(tabsDiv).append($(rigthBox));
	var boxright = createDiv("_right_box_right_" + layoutID,
			"_right_box_right_" + layoutID);

	$(tabsDiv).append($(boxright));
	$(boxright).html("<a></a>");
	$(boxright).hide();
	$(boxright).click(
			function() {
				displacementTabs($($("#_right_box_body_" + layoutID).children("div")).width(), layoutID, 'R');
				computeBoxWidth(layoutID);
			});

	$(boxLeft).hide();
	$(boxLeft).html("<a></a>");
	$(boxLeft).click(
			function() {
				displacementTabs($(
						$("#_right_box_body_" + layoutID).children("div"))
						.width(), layoutID, 'L');
				computeBoxWidth(layoutID);
			});

	var rightBoxSuper = createDiv("_right_box_super_" + layoutID,
			"_right_box_super_" + layoutID);
	$(rigthBox).append($(rightBoxSuper));

	var rightBoxBody = createDiv("_right_box_body_" + layoutID,
			"_right_box_body_" + layoutID);
	$(rightBoxSuper).append($(rightBoxBody));
	
	var closeAll = createDiv("_right_box_classall_" + layoutID,
			"_right_box_classall_" + layoutID);
	$(rigthBox).append($(closeAll));
	$(closeAll).html("<a href='javascript:closeAllTabs()'>&nbsp;</a>");
	$(closeAll).attr("title", "全部关闭");
}
function closeAll(){
	window.top.location.reload();
}
function closeAllTabs(){
	var p = new Object();
	p.headerText='提示';
	p.okName='确认';
	p.okFunction=closeAll;
	p.cancelName='取消';
	 alert("您是否关闭所有标签?",p);
}


/**
 * 高度自适应
 */
var adaptationWidthAndHeightMS = function(p, windowsWidth, windowsHeight) {
	// 得到最小高与宽
	var minW = parseInt($("#" + p.layoutID).css("min-width").replace("px", ""));
	var minH = parseInt($("#" + p.layoutID).css("min-height").replace("px", ""));
	windowsWidth = minW > windowsWidth ? minW : windowsWidth;
	windowsHeight = minH > windowsHeight ? minH : windowsHeight;

	$("#" + p.layoutID).height(windowsHeight);
	$("#" + p.layoutID).width(windowsWidth);

	// 设置上下的高与宽
	var headerH = $("#_header_" + p.layoutID).height();
	$("#_header_" + p.layoutID).width(windowsWidth);
	if (p.isShowBottom) {
		headerH += $("#_bottom_" + p.layoutID).height();
		$("#_bottom_" + p.layoutID).width(windowsWidth);
	}

	$("#_body_" + p.layoutID).height(windowsHeight - headerH);
	$("#_body_" + p.layoutID).width(windowsWidth);
	// 设置左右的高度与宽度
	$("#_right_" + p.layoutID).width(
			windowsWidth - $("#_left_" + p.layoutID).width());
	$("#_right_" + p.layoutID).height($("#_body_" + p.layoutID).height());
	$("#_left_" + p.layoutID).height($("#_body_" + p.layoutID).height());
	$("#_right_menu_tabs_" + p.layoutID).width(
			$("#_right_" + p.layoutID).width() - 10);
	$("#_right_box_super_" + p.layoutID).width(
			$("#_right_" + p.layoutID).width() - 10);
	if ($("#_right_box_right_" + p.layoutID).is(':visible')) {
		$("#_right_box_super_" + p.layoutID).width(
				$("#_right_box_super_" + p.layoutID).width()
						- $("#_right_box_right_" + p.layoutID).width());
	}
	if ($("#_right_box_left_" + p.layoutID).is(':visible')) {
		$("#_right_box_super_" + p.layoutID).width(
				$("#_right_box_super_" + p.layoutID).width()
						- $("#_right_box_left_" + p.layoutID).width());
	}
	$("#_right_bottom_" + p.layoutID).width($("#_right_" + p.layoutID).width());
	$("#_right_bottom_" + p.layoutID).height($("#_right_" + p.layoutID).height()- $("#_right_menu_tabs_" + p.layoutID).height());
	$(getStyle("._document_body_" + p.layoutID)).width(
			$("#_right_bottom_" + p.layoutID).width());
	$(getStyle("._document_body_" + p.layoutID)).height(
			$("#_right_bottom_" + p.layoutID).height());
	window.top.pushPageCache("_documentBodyHeight", $(
			"#_right_bottom_" + p.layoutID).height());
	var hh = 146;
	try{
		hh=parseInt($(".left_to_do_list").css("max-height").replace("px", ""));
	}catch(error){}
	$("#_left_menu").height($("#_body_" + p.layoutID).height() - hh);
	computeBoxWidth(p.layoutID);
}

/**
 * 打开操作页
 */
var openDocument = function(body, url, layoutID, id) {
	var doc = "";
	switch (layoutID) {
	case 'wrap':
		doc = openDocumentMsNew(body, url, layoutID, id);
		break;
	default:
		doc = openDocumentMs(body, url, layoutID, id);
		break;
	}
	return doc;
}
 
  
/**
 * 默认打开的窗口
 */
var openDocumentMs = function(body, url, layoutID, id) {
	$("._document_" + layoutID).hide();
	var doc = createDiv("_document_" + layoutID + id, "_document_" + layoutID);
	var iframe = document.createElement("iframe");
	$(iframe).addClass(getStyle("_document_body_" + layoutID));
	$(iframe).attr('id', "_document_body_" + layoutID + id);
	$(iframe).width($(body).width());
	$(iframe).height($(body).height());
	$(iframe).attr("src", url);
	$(iframe).attr("marginheight", "0");
	$(iframe).attr("marginwidth", "0");
	$(iframe).attr("broder", "0");
	$(iframe).attr("frameborder", "0");
	$(iframe).attr("onload", "onloadFunction('_document_body_" + layoutID + id+"')");
	$(doc).append($(iframe));
	$(body).append($(doc));
	return doc;
}
var onloadFunction=function(id){
	//var doc = getIFrameDOM(id);
	//var win = getIFrameWindow(id);
	/*doc.onkeydown =function(evt){
		var evt = win.event?win.event:evt;
		if(evt.keyCode==8){
			evt.keyCode=0;
			evt.returnValue=false
		}as
	}; 
	doc.onkeypress=function(evt){
		var evt = win.event?win.event:evt;
		if(evt.keyCode==8){
			evt.keyCode=0;
			evt.returnValue=false
		}
	};*/
}

var addBoxMenu = function(boxMenu, layoutID, url, secendmenu) {
	switch (layoutID) {
	case 'wrap':
		if (null != $("#" + boxMenu.menuId + "_body").attr("id")) {

			BoxoutDivCssNew(boxMenu.menuId, layoutID);
			BoxOverDivCssNew(boxMenu.menuId, layoutID);
	        
	        if ($("#submenu_" + boxMenu.menuId).attr('src') != url) {
				$("#submenu" + boxMenu.menuId).attr('src',url);
			} else {
				if (boxMenu.isReload) {
					window.frames["submenu" + boxMenu.menuId].document.location.href=url;
				}
			}
	        return;
		}
		boxMenu.boxObj = $("#mainleft");
		
		var documentcontent = createDiv("_documentcontent_" + boxMenu.menuId, "main_content");
		$("#main").append($(documentcontent));

		addBoxMenuMsNew(boxMenu, layoutID, secendmenu);
		///设置内容页面的高度
		var windowsHeight = $(window).height();
		$(documentcontent).height(windowsHeight -  $("#header").height() - $("#mainnav").height() - $("#subnav" + boxMenu.menuId).height() - $("#clear_"+boxMenu.menuId).height());//內容頁面高度
		
		if(boxMenu.secendMenuLocation == "left" && secendmenu.length > 1) {
			$("#document_lay_2_content_" + boxMenu.menuId).height($(documentcontent).height() - 20);
			boxMenu.documentObj = openDocument($("#document_lay_2_content_" + boxMenu.menuId), url, layoutID, boxMenu.menuId);
		} else {
			boxMenu.documentObj = openDocument(documentcontent, url, layoutID, boxMenu.menuId);
		}
		boxMenu.url = url;
		adaptationWidthAndHeightMSNew(boxMenu, layoutID);
		break;

	default:
		if (null != $("#" + boxMenu.menuId + "_body" + layoutID).attr("id")) {
			// 位置调整
			BoxoutDivCss(boxMenu.menuId, layoutID);
			BoxOverDivCss(boxMenu.menuId, layoutID);
			$("#_right_box_text_"+boxMenu.menuId).html(boxMenu.menuName);
	        $("#"+boxMenu.menuId + "_body" + layoutID).attr("title", boxMenu.menuName);
			// 计算TAB所在位置
			var width = 0;
			var leftW = 0;
			var prevObj = $("#" + boxMenu.menuId + "_body" + layoutID).prev();
			while (null != prevObj && $(prevObj).attr("id")) {
				width += $(prevObj).width();
				try {
					width += parseInt($(prevObj).css("margin-left").replace("px", ""));
				} catch (error) {
					try {
						width += parseInt($(prevObj).css("margin").replace("px", ""));
					} catch (error) {
						try {
							width += parseInt($(prevObj).css("margin-right").replace("px", ""));
						} catch (error) {
						}
					}
				}
				prevObj = $(prevObj).prev();
			}
			$("#_right_box_body_" + layoutID).css("margin-left", -width);
			if ($("#_document_body_" + layoutID + boxMenu.menuId).attr('src') != url) {
				$("#_document_body_" + layoutID + boxMenu.menuId).attr('src',url);
				if(boxMenu.win){
					//box.win = window.frames["_document_body_" + layoutID + boxMenu.menuId].documentwindow.frames["_document_body_" + layoutID + boxMenu.menuId].document;
				}
			} else {
				if (boxMenu.isReload) {
					window.frames["_document_body_" + layoutID + boxMenu.menuId].document.location
							.href=url;
					if(boxMenu.win){
						//box.win = window.frames["_document_body_" + layoutID + boxMenu.menuId].documentwindow.frames["_document_body_" + layoutID + boxMenu.menuId].document;
					}
				}
			}
			computeBoxWidth(layoutID);
			return;
		}
		boxMenu.boxObj = $("#_right_box_body_" + layoutID);
		boxMenu.documentObj = openDocument($("#_right_bottom_" + layoutID),url, layoutID, boxMenu.menuId);
		boxMenu.url = url;
		addBoxMenuMs(boxMenu, layoutID);
		break;
	}
}




var $leftUrl="left_.jsp";
var $initLeftUrl = "left_.jsp";
var $initSubSysName = "";

var addBoxMenuMs = function(boxMenu, layoutID) {
	//add by  jie.xiao 首页点击的BOX设置leftUrl
	if(!boxMenu.leftUrl){
		boxMenu.leftUrl=$leftUrl
	}
	//end
	BoxoutDivCss(boxMenu.menuId, layoutID);
	var box = createDiv(boxMenu.menuId + "_body" + layoutID,"_box_memu_body_over_" + layoutID);
	var boxbody = createDiv(boxMenu.menuId + layoutID, "_box_memu_over_"+ layoutID);
	var boxLeft = createDiv(boxMenu.menuId + "_left" + layoutID,"_box_memu_left_over_" + layoutID);
	var boxRight = createDiv(boxMenu.menuId + "_right" + layoutID,"_box_memu_right_over_" + layoutID);
	$(box).append($(boxLeft));
	$(box).append($(boxbody));
	$(box).append($(boxRight));
	$(box).attr("title", boxMenu.menuName);
	$(boxbody).append("<div class='_right_box_text_" + layoutID+ "' id='_right_box_text_" + boxMenu.menuId + "'>"+ boxMenu.menuName + "</div>");
	$("#" + boxMenu.menuId + layoutID).addClass("_box_memu_over_" + layoutID);
	$("#" + boxMenu.menuId + layoutID).removeClass("_box_memu_out_" + layoutID);
	var closeMouseFlag = true;// bug 移入标识

	var obj = new Object();
	obj.box = $(box);
	obj.layoutID = layoutID;
	obj.doc = boxMenu.documentObj;
	obj.boxMenu = boxMenu;
	pushPageCache(boxMenu.menuId, obj);
	if (boxMenu.isClose) {
		var close = createDiv(boxMenu.menuId + "_close_" + layoutID,
				"_box_memu_close_over_" + layoutID);
		$(box).append($(close));

		$(close).click(function() {
			removeBox($(box), boxMenu.documentObj, layoutID, boxMenu);
		});
		var closeName = createDiv(boxMenu.menuId + "_closename_" + layoutID,
				"_box_memu_close_name_" + layoutID);

		//$(close).hide();
		$(closeName).hide();
		if (boxMenu.menuName){
			$(closeName).html(boxMenu.closeName)
			$(close).append($(closeName));
		}
		$(close).mouseout(function() {
			$(close).removeClass();
			$(closeName).hide();
			closeMouseFlag = true;
			if ($(box).attr("class") != ("_box_memu_body_over_" + layoutID)) {
				$(close).addClass("_box_memu_close_out_" + layoutID);
			} else {
				$(close).addClass("_box_memu_close_over_" + layoutID);
			}
		});
		$(close).mouseover(function() {
			closeMouseFlag = false;
			$(close).removeClass();
			$(closeName).show();
			if ($(box).attr("class") != ("_box_memu_body_over_" + layoutID)) {
				$(close).addClass("_box_memu_close_hover_this_" + layoutID);
			} else {
				$(close).addClass("_box_memu_close_over_this_" + layoutID);
			}
		});
	}
	if(boxMenu.oper){
		fristMenu = box;
		$leftUrl = boxMenu.leftUrl;
		$initLeftUrl = $leftUrl;
	}
	$(box)
			.mouseover(
					function() {
						if ($(box).width() < 70
								&& $(box).attr("class") != ("_box_memu_body_over_" + layoutID)) {
							return false;
						}
						if (boxMenu.isClose) {
							$(close).show();
						}
						if ($(box).attr("class") != ("_box_memu_body_over_" + layoutID)) {
							$(boxLeft).addClass(
									"_box_memu_left_hover_" + layoutID);
							$(box).addClass("_box_memu_body_hover_" + layoutID);
							$(boxbody).addClass("_box_memu_hover_" + layoutID);
							$(boxRight).addClass(
									"_box_memu_right_hover_" + layoutID);
							if (boxMenu.isClose && closeMouseFlag) {
								$(close).removeClass();
								$(close).addClass(
										"_box_memu_close_hover_" + layoutID);
							}
							$(boxLeft).removeClass(
									"_box_memu_left_out_" + layoutID);
							$(box)
									.removeClass(
											"_box_memu_body_out_" + layoutID);
							$(boxbody).removeClass("_box_memu_out_" + layoutID);
							$(boxRight).removeClass(
									"_box_memu_right_out_" + layoutID);
						}
					});
	$(box).mouseout(function() {
		if (boxMenu.isClose) {
			//$(close).hide();
		}
		if ($(box).attr("class") != ("_box_memu_body_over_" + layoutID)) {
			$(boxLeft).addClass("_box_memu_left_out_" + layoutID);
			$(box).addClass("_box_memu_body_out_" + layoutID);
			$(boxbody).addClass("_box_memu_out_" + layoutID);
			$(boxRight).addClass("_box_memu_right_out_" + layoutID);
			if (boxMenu.isClose) {
				$(close).removeClass();
				$(close).addClass("_box_memu_close_out_" + layoutID);
			}
			$(boxLeft).removeClass("_box_memu_left_hover_" + layoutID);
			$(box).removeClass("_box_memu_body_hover_" + layoutID);
			$(boxbody).removeClass("_box_memu_hover_" + layoutID);
			$(boxRight).removeClass("_box_memu_right_hover_" + layoutID);
		}
	});
	$(box).click(function() {
		BoxoutDivCss(boxMenu.menuId, layoutID);
		BoxOverDivCss(boxMenu.menuId, layoutID);
		
		if (!boxMenu.isReload) {//只有开始打开的tab页面才刷新
			window.frames["_document_body_" + layoutID + boxMenu.menuId].document.location.href=boxMenu.url;
		}
		
		
		if((boxMenu.leftUrl && boxMenu.leftUrl!=$leftUrl) || boxMenu.subSysName != $initSubSysName){
			$leftUrl = boxMenu.leftUrl;
			$("#_left_" + layoutID).html("");
			$("#_left_" + layoutID).load($leftUrl,function() {
				if(tree){
					newTree(tree);
					var windowsWidth = $(window).width();
					var windowsHeight = $(window).height();
					adaptationWidthAndHeightMS({layoutID:'mian'}, windowsWidth, windowsHeight);
				}
			});
		}else if(!boxMenu.leftUrl && $initLeftUrl!=$leftUrl){
			$leftUrl = $initLeftUrl;
			$("#_left_" + layoutID).html("");
			$("#_left_" + layoutID).load($leftUrl,function() {
				if(tree){
					newTree(tree);
					var windowsWidth = $(window).width();
					var windowsHeight = $(window).height();
					adaptationWidthAndHeightMS({layoutID:'mian'}, windowsWidth, windowsHeight);
				}
			});
		}
		
		$initSubSysName = boxMenu.subSysName;
	});

	boxMenu.boxObj.append($(box));
	BoxOverDivCss(boxMenu.menuId, layoutID);
	displacementTabs(9999, layoutID, 'R');
	computeBoxWidth(layoutID);
	// 计算位置
}

var removeBox = function(box, body, layoutID, boxMenu) {
	// 定位上一层
	var R = 'R';
	if (boxMenu.superID && null != $("#" + boxMenu.superID + "_body" + layoutID).attr("id")) {
		BoxoutDivCss(boxMenu.menuId, layoutID);
		$("#" + boxMenu.superID + "_body" + layoutID).show();
		$("#_document_" + layoutID + boxMenu.superID).show();
		$("#" + boxMenu.superID + "_body" + layoutID).addClass("_box_memu_body_over_" + layoutID);
		$("#" + boxMenu.superID + "_body" + layoutID).removeClass("_box_memu_body_out_" + layoutID);
		$($("#" + boxMenu.superID + "_body" + layoutID).children("div")[1]).addClass("_box_memu_over_" + layoutID);
		$($("#" + boxMenu.superID + "_body" + layoutID).children("div")[0]).addClass("_box_memu_left_over_" + layoutID);
		$($("#" + boxMenu.superID + "_body" + layoutID).children("div")[2]).addClass("_box_memu_right_over_" + layoutID);
		$($("#" + boxMenu.superID + "_body" + layoutID).children("div")[1]).removeClass("_box_memu_out_" + layoutID);
		$($("#" + boxMenu.superID + "_body" + layoutID).children("div")[0]).removeClass("_box_memu_left_out_" + layoutID);
		$($("#" + boxMenu.superID + "_body" + layoutID).children("div")[2]).removeClass("_box_memu_right_out_" + layoutID);
	} else if ($(box).prev().attr('id')) {
		BoxoutDivCss(boxMenu.menuId, layoutID);
		$(box).prev().addClass("_box_memu_body_over_" + layoutID);
		$(box).prev().removeClass("_box_memu_body_out_" + layoutID);
		$($(box).prev().children("div")[1]).addClass("_box_memu_over_" + layoutID);
		$($(box).prev().children("div")[0]).addClass("_box_memu_left_over_" + layoutID);
		$($(box).prev().children("div")[2]).addClass("_box_memu_right_over_" + layoutID);

		$($(box).prev().children("div")[1]).removeClass("_box_memu_out_" + layoutID);
		$($(box).prev().children("div")[0]).removeClass("_box_memu_left_out_" + layoutID);
		$($(box).prev().children("div")[2]).removeClass("_box_memu_right_out_" + layoutID);
		// $(body).prev().show();
		$("#_document_"+ layoutID+ ($(box).prev().attr("id").replace("_body" + layoutID,''))).show();
		R = 'L'
	} else if ($(box).next().attr("id")) {
		BoxoutDivCss(boxMenu.menuId, layoutID);
		$(box).next().addClass("_box_memu_body_over_" + layoutID);
		$(box).next().removeClass("_box_memu_body_out_" + layoutID);
		$($(box).next().children("div")[1]).addClass("_box_memu_over_" + layoutID);
		$($(box).next().children("div")[0]).addClass("_box_memu_left_over_" + layoutID);
		$($(box).next().children("div")[2]).addClass("_box_memu_right_over_" + layoutID);

		$($(box).next().children("div")[1]).removeClass("_box_memu_out_" + layoutID);
		$($(box).next().children("div")[0]).removeClass("_box_memu_left_out_" + layoutID);
		$($(box).next().children("div")[2]).removeClass("_box_memu_right_out_" + layoutID);
		$("#_document_"+ layoutID+ ($(box).next().attr("id").replace("_body" + layoutID,''))).show();
		R = 'R'
	}
	var ww = $(box).width();
	$(box).remove();
	$(body).remove();
	// 改变
	displacementTabs(ww, layoutID, R);
	computeBoxWidth(layoutID);
}

var computeBoxWidth = function(layoutID) {
	var boxW = $("#_right_box_super_" + layoutID).width()-$("#_right_box_classall_"+layoutID).width()-5;
	// 计算所有Tab的宽度
	var tabsW = 0;
	var margin = 0;
	var tabs = $("#_right_box_body_" + layoutID).children("div");
	if (!tabs)
		return;
	for (i = 0; i < tabs.length; i++) {
		tabsW += $(tabs[i]).width();
		try {
			margin += parseInt($(tabs[i]).css("margin-left").replace("px", ""));
		} catch (error) {
			try {
				margin += parseInt($(tabs[i]).css("margin").replace("px", ""));
			} catch (error) {
				try {
					margin += parseInt($(tabs[i]).css("margin-right").replace(
							"px", ""));
				} catch (error) {
				}
			}
		}
	}
	var maxSigleBoxW = 158;
	try {
		maxSigleBoxW = parseInt($("._box_memu_body_over_" + layoutID).css(
				"max-width").replace("px", ""));
	} catch (error) {
		maxSigleBoxW = 158;// 默认最小50
	}
	var singleBoxW = 0;
	if (tabs.length != 0)
		singleBoxW = parseInt(((boxW - margin) / tabs.length));

	var minSingleBoxW = 0;
	// 计算Tab的宽度
	if (maxSigleBoxW >= singleBoxW) {
		try {
			minSingleBoxW = parseInt($("._box_memu_body_over_" + layoutID).css(
					"min-width").replace("px", ""));
		} catch (error) {
			minSingleBoxW = 50;// 默认最小50
		}
		if (singleBoxW < minSingleBoxW) {
			// 增加样式判断
			var marginLeft = 0;
			try {
				marginLeft = parseInt($("#_right_box_body_" + layoutID).css(
						"margin-left").replace("px", ""));
			} catch (error) {
			}

			if (marginLeft <= 0 && (tabsW + margin + marginLeft) > boxW
					&& !$("#_right_box_right_" + layoutID).is(':visible')) {
				$("#_right_box_right_" + layoutID).show();
				$("#_right_box_super_" + layoutID).width(
						$("#_right_box_super_" + layoutID).width()
								- $("#_right_box_right_" + layoutID).width());

			} else if ((tabsW + margin + marginLeft) <= boxW
					&& $("#_right_box_right_" + layoutID).is(':visible')) {
				$("#_right_box_right_" + layoutID).hide();
				$("#_right_box_super_" + layoutID).width(
						$("#_right_box_super_" + layoutID).width()
								+ $("#_right_box_right_" + layoutID).width());

			}
			if (marginLeft < 0
					&& !$("#_right_box_left_" + layoutID).is(':visible')) {
				$("#_right_box_left_" + layoutID).show();
				$("#_right_box_super_" + layoutID).width(
						$("#_right_box_super_" + layoutID).width()
								- $("#_right_box_left_" + layoutID).width());
			} else if (marginLeft >= 0
					&& $("#_right_box_left_" + layoutID).is(':visible')) {
				$("#_right_box_left_" + layoutID).hide();
				$("#_right_box_super_" + layoutID).width(
						$("#_right_box_super_" + layoutID).width()
								+ $("#_right_box_left_" + layoutID).width());
			}
		} else {
			if ($("#_right_box_right_" + layoutID).is(':visible')) {
				$("#_right_box_super_" + layoutID).width(
						$("#_right_box_super_" + layoutID).width()
								+ $("#_right_box_right_" + layoutID).width());
				$("#_right_box_right_" + layoutID).hide();
			}
			if ($("#_right_box_left_" + layoutID).is(':visible')) {
				$("#_right_box_super_" + layoutID).width(
						$("#_right_box_super_" + layoutID).width()
								+ $("#_right_box_left_" + layoutID).width());
				$("#_right_box_left_" + layoutID).hide();
			}
		}
		boxW = $("#_right_box_super_" + layoutID).width()-$("#_right_box_classall_"+layoutID).width()-5;
		singleBoxW = parseInt(((boxW - margin) / tabs.length));
	} else {
		if ($("#_right_box_right_" + layoutID).is(':visible')) {
			$("#_right_box_super_" + layoutID).width(
					$("#_right_box_super_" + layoutID).width()
							+ $("#_right_box_right_" + layoutID).width())
			$("#_right_box_right_" + layoutID).hide();
		}
		if ($("#_right_box_left_" + layoutID).is(':visible')) {
			$("#_right_box_super_" + layoutID).width(
					$("#_right_box_super_" + layoutID).width()
							+ $("#_right_box_left_" + layoutID).width());
			$("#_right_box_left_" + layoutID).hide();
		}

		singleBoxW = maxSigleBoxW;
	}
	singleBoxW = singleBoxW > minSingleBoxW ? singleBoxW : minSingleBoxW;
	singleBoxW = singleBoxW < maxSigleBoxW ? singleBoxW : maxSigleBoxW;
	$($("#_right_box_body_" + layoutID).children("div")).width(singleBoxW);
	var leftWs = $("._box_memu_left_over_" + layoutID).width();
	var rightWs = $("._box_memu_right_over_" + layoutID).width();
	$("._box_memu_over_" + layoutID).width(singleBoxW - leftWs - rightWs);
	$("._box_memu_out_" + layoutID).width(singleBoxW - leftWs - rightWs);
	$("._right_box_text_" + layoutID).width(singleBoxW - leftWs - rightWs - 15);
	$("._box_memu_close_over_" + layoutID).css("margin-left", singleBoxW - 23);
	$("._box_memu_close_out_" + layoutID).css("margin-left", singleBoxW - 23);
	displacementTabs(0, layoutID, 'R');
}

// 移位
var displacementTabs = function(width, layoutID, direction) {
	width = direction == 'R' ? -width : width;
	// 计算出已左移位置
	var marginLeft = 0;
    var leftWidth = 0;
	try {
		marginLeft = parseInt($("#_right_box_body_" + layoutID).css(
				"margin-left").replace("px", ""));
		leftWidth = marginLeft;
	} catch (error) {
	}

	var boxW = $("#_right_box_super_" + layoutID).width()-$("#_right_box_classall_"+layoutID).width()-5;
	// 计算所有Tab的宽度
	var maxMarginLeft = 0;
	var tabs = $("#_right_box_body_" + layoutID).children("div");
	if (!tabs)
		return;
	if(tabs.length > 2){
		$("#_right_box_classall_" + layoutID).show();
	}
	else{
		$("#_right_box_classall_" + layoutID).hide();
	}
	for (i = 0; i < tabs.length; i++) {
		maxMarginLeft += $(tabs[i]).width();
		try {
			maxMarginLeft += parseInt($(tabs[i]).css("margin-left").replace(
					"px", ""));
		} catch (error) {
			try {
				maxMarginLeft += parseInt($(tabs[i]).css("margin").replace(
						"px", ""));
			} catch (error) {
				try {
					maxMarginLeft += parseInt($(tabs[i]).css("margin-right")
							.replace("px", ""));
				} catch (error) {
				}
			}
		}
	}
	// 计算出最大左移位置
	var boxWidthS = maxMarginLeft;
	maxMarginLeft = maxMarginLeft - boxW;

	if (maxMarginLeft > 0) {

		if (-marginLeft > maxMarginLeft) {
			// 自动调整
			marginLeft = -maxMarginLeft;
		} else {
			marginLeft += width;
			if (-marginLeft > maxMarginLeft) {
				marginLeft = -maxMarginLeft;
			} else if (marginLeft > 0) {
				marginLeft = 0;
			}
		}
		boxWidthS = boxW;
	} else { 
		marginLeft = 0;
		leftWidth = 0;
	}
	$("#_right_box_body_" + layoutID).css("margin-left", marginLeft);
	$("#_right_box_classall_"+layoutID).css("margin-left", boxWidthS+leftWidth);
}


var BoxoutDivCss = function(boxId, layoutID) {
	$("._document_" + layoutID).hide();
	$("._box_memu_over_" + layoutID).addClass("_box_memu_out_" + layoutID);
	$("._box_memu_over_" + layoutID).removeClass("_box_memu_over_" + layoutID);
	$("._box_memu_body_over_" + layoutID).addClass("_box_memu_body_out_" + layoutID);
	$("._box_memu_body_over_" + layoutID).removeClass("_box_memu_body_over_" + layoutID);
	$("._box_memu_left_over_" + layoutID).addClass("_box_memu_left_out_" + layoutID);
	$("._box_memu_left_over_" + layoutID).removeClass("_box_memu_left_over_" + layoutID);
	$("._box_memu_right_over_" + layoutID).addClass("_box_memu_right_out_" + layoutID);
	$("._box_memu_right_over_" + layoutID).removeClass("_box_memu_right_over_" + layoutID);
	$("._box_memu_hover_" + layoutID).removeClass("_box_memu_hover_" + layoutID);
	$("._box_memu_body_hover_" + layoutID).removeClass("_box_memu_body_hover_" + layoutID);
	$("._box_memu_right_hover_" + layoutID).removeClass("_box_memu_right_hover_" + layoutID);
	$("._box_memu_left_hover_" + layoutID).removeClass("_box_memu_left_hover_" + layoutID);
	$("._box_memu_close_over_" + layoutID).removeClass("_box_memu_close_out_" + layoutID);
	$("._box_memu_close_over_" + layoutID).removeClass("_box_memu_hover_out_" + layoutID);

}
var BoxOverDivCss = function(boxId, layoutID) {
	$("#" + boxId + "_close_" + layoutID).removeClass();
	$("#" + boxId + "_right" + layoutID).removeClass();
	$("#" + boxId + "_left" + layoutID).removeClass();
	$("#" + boxId + "_body" + layoutID).removeClass();
	$("#" + boxId + layoutID).removeClass();
	$("#_document_" + layoutID + boxId).show();
	$("#" + boxId + "_body" + layoutID).addClass("_box_memu_body_over_" + layoutID);
	$("#" + boxId + layoutID).addClass("_box_memu_over_" + layoutID);
	$("#" + boxId + "_left" + layoutID).addClass("_box_memu_left_over_" + layoutID);
	$("#" + boxId + "_right" + layoutID).addClass("_box_memu_right_over_" + layoutID);
	$("#" + boxId + "_close_" + layoutID).addClass("_box_memu_close_over_" + layoutID);
}
