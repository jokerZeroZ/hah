/**
 * ui 布局控件，黄艺平2013-10-8新建
 * 包括
 * -----------------
 *    | 上,一级菜单, 内容(内容分为: 全部内容,上面二级菜单,内容,左边二级菜单,内容)
 *    |
 * ------------
 */

(function($) {
	$.IfromLayout = function() {
		this.layout = function() {
			switch (this.layoutClass) {
			case 'wrap':
				var p = this;
				layoutHeaderTopMenuMain(this.layoutID, this);//主体布局生成
				$("#header").load(p.headerUrl?p.headerUrl:"ccapp/oa/common/lightblue/header.jsp", {});//加载头部jsp
				$("#mainleft").load(p.leftUrl?p.leftUrl:"ccapp/oa/common/lightblue/left.jsp", function() { //加载一级菜单jsp
					
					newTree(tree);//创建菜单
					$('#funcBar_box_k').hide();
					
					var unCloseArray = new Array();
					var clickCloseArray = new Array();
					
					unCloseArray.push($('#funcBar_box_k')[0]);
					
					unCloseArray.push($('#funcBar_box')[0]);
					unCloseArray.push($('#funcBar_box ul')[0]);
					
					unCloseArray.push($('#funcBar_box_tan')[0]);
					unCloseArray.push($('#funcBar_box_tan ul')[0]);
					
					$(".funcBar_box_list").each(function(){
						unCloseArray.push(this);
					});
					
					$("#funcBar_box_tan li[id^=menu_type_li_]").each(function(){
						unCloseArray.push(this);
					});
					$("#funcBar_box_tan li[id^=menu_type_li_] a").each(function(){
						unCloseArray.push(this);
					});
					
					$("#funcBar_box li[id^=_menu_li_]").each(function(){
						unCloseArray.push(this);
					});
					$("#funcBar_box li[id^=_menu_li_] a").each(function(){
						unCloseArray.push(this);
					});
					
					$("#funcBar_box li[id^=_menu_li_] a").each(function(){
						 clickCloseArray.push(this);
					});
					
					var closeCon = new PubOPT.closeControl({
						 clickId : "funcBar",
						 unCloseArray : unCloseArray,
						 clickCloseArray : clickCloseArray,
						 closeFunction : function(){
							$('#funcBar_box_k').hide();
							$('#_menu_lock_div').hide();
						}
					});
					
					var url = "";
					if(p.showList != null) {//默认要打开的tab
						for(var i = 0;i < p.showList.length;i++){
							var b = new $.boxMenu();
							b.isClose = false;
							b.menuId = p.showList[i].menuId;
							b.menuName = p.showList[i].menuName;
							b.leftUrl = p.showList[i].lefturl;
							b.oper = p.showList[i].oper;
							b.isReload = false;
							b.isfristpage = p.showList[i].isfristpage;
							b.description = p.showList[i].description;
						    b.headimg = p.showList[i].headimg;
							b.secendMenuLocation = p.showList[i].secendMenuLocation;
							b.defaultShowSecendMenu = 0;
							
							if(b.oper) {
								b.defaultLoad = true; //是否默认加载
							} else {
								b.defaultLoad = false;
							}
							
							var url = "";
							var secendmenu = p.showList[i].secendmenu;
							if(secendmenu != null) {
						 		if(secendmenu.length >= 1) {
								    for(j = 0; j < secendmenu.length; j++) {
								    	url = secendmenu[j].url;
								    	break;
								    }
								}
							} else {
								url = p.showList[i].url;
							}
							
							addBoxMenu(b, p.layoutID, url, p.showList[i].secendmenu);
						}
					}
					if(fristMenu){//选中第一个tab
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
							adaptationWidthAndHeight(boxMenu,p.layoutID);
							computeBoxWidthSecond(boxMenu,p.layoutID);
							break;
						}
					}
				});
				break;

			default:
			}

		}
		menuLayoutName = 'ms';
	};
	$.extend($.IfromLayout, {});
})(jQuery);

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
 * 生成 头部,一级菜单,主体内容
 * @param layoutID
 * @param p
 * @return
 */
var layoutHeaderTopMenuMain = function(layoutID, p) {
	//生成提示框
	var loading = createDiv("loading","loading");
	$(window.top.document.body).append($(loading));
	
	var obje = $("#" + layoutID);
	// 新建头DIV
	var heander = createDiv("header");
	$(obje).append($(heander));
	
	//一级菜单导航区DIV
	var mainnav = createDiv("mainnav", "mainnav");
	$(obje).append($(mainnav));
	
	// 新建中间主体内容DIV
	var body = createDiv("main");
	$(obje).append($(body));

	fristMenuLayout(mainnav, layoutID, p);//生成一级菜单的主框架
	
}

/**
 * 关闭所有的标签
 * @return
 */
function closeAll(){
	window.top.location.reload();
}

/**
 * 生成一级菜单的主框架
 * @param mainnav
 * @param layoutID
 * @param p
 * @return
 */
var fristMenuLayout = function(mainnav, layoutID, p) {
	var bottomnav = createDiv("bottomnav", "bottomnav");
	$(mainnav).append($(bottomnav));

	var pv = createDiv("pv", "pv");
	$(mainnav).append($(pv));
	
	var mainleft1 = createDiv("mainleft1" , "mainleft1");
	$(bottomnav).append($(mainleft1));
	
	var mainleft = createDiv("mainleft" , "mainleft");
	$(mainleft1).append($(mainleft));
		 
	var submenu_guanbi = createDiv("submenu_guanbi", "submenu_guanbi");
	$(submenu_guanbi).html("<a href='#' title='全部关闭'></a>");
	$(mainleft1).append($(submenu_guanbi));
	
	var submenu_guanbi_list = createDiv("submenu_guanbi_list", "submenu_guanbi_list");
	$(mainleft1).append($(submenu_guanbi_list));
	$(submenu_guanbi_list).hide();
	
	var submenu_guanbi_list_ul = createUl("", "");
	$(submenu_guanbi_list).append($(submenu_guanbi_list_ul));
	
	var submenu_guanbi_list_li_close = createLi("submenu_guanbi_list_li_close", "");
	$(submenu_guanbi_list_ul).append($(submenu_guanbi_list_li_close));
	$(submenu_guanbi_list_li_close).html("<a class='submenu_xuan' href='javascript:closeAll()'>关闭全部</a>");
	$(submenu_guanbi_list_li_close).hide();
	
	//var submenu_guanbi_list_li_config = createLi("", "");
	//$(submenu_guanbi_list_ul).append($(submenu_guanbi_list_li_config));
	//$(submenu_guanbi_list_li_config).html("<a class='submenu_xuan' href='#'>管理标签窗口</a>");
	
	$(submenu_guanbi).click(
			 function(event) {
				 if($(submenu_guanbi_list).is(':hidden') == true) {
				     $(submenu_guanbi).focus();
					 $(submenu_guanbi_list).fadeIn();
				 } else {
					 $(submenu_guanbi).focus();
					 $(submenu_guanbi_list).fadeOut();
				 }
			 }
	 );
	 
	
	var unCloseArray = new Array();
	var clickCloseArray = new Array();
	unCloseArray.push($("#submenu_guanbi")[0]);
	unCloseArray.push($("#submenu_guanbi_list")[0]);
    
	unCloseArray.push($("#submenu_guanbi_list ul")[0]);
	$("#submenu_guanbi_list li").each(function(){
		unCloseArray.push(this);
	});
	$("#submenu_guanbi_list li a").each(function(){
		unCloseArray.push(this);
	});
	
	$("#submenu_guanbi_list li a").each(function(){
		 clickCloseArray.push(this);
	});
	
	var closeCon = new PubOPT.closeControl({
		 clickId : "submenu_guanbi",
		 unCloseArray : unCloseArray,
		 clickCloseArray : clickCloseArray,
		 closeFunction : function(){
			$("#submenu_guanbi_list").fadeOut();
		}
	});

}

/**
 * 关闭所有的tabs
 * @return
 */
function closeAll(){
	window.top.location.reload();
}

/**
 * 打开操作页
 * @param body
 * @param url
 * @param layoutID
 * @param id
 * @return
 */
var openDocument = function(body, url, layoutID, id, defaultLoad) {
	var doc = "";
	switch (layoutID) {
	case 'wrap':
		doc = openDocumentIframe(body, url, layoutID, id, defaultLoad);
		break;
	default:
	}
	return doc;
}

/**
 * 高度自适应
 * @param boxMenu
 * @param layoutID
 * @return
 */
var adaptationWidthAndHeight = function(boxMenu, layoutID) {
	var windowsWidth = $(window).width();
	var windowsHeight = $(window).height();
	// 得到最小高与宽
	var minW = 1000;
	var minH = 800;
	try{
		minW = parseInt($("#" + layoutID).css("min-width").replace("px", ""));
		minH = parseInt($("#" + layoutID).css("min-height").replace("px", ""));
	}catch(error){}
	windowsWidth = minW > windowsWidth ? minW : windowsWidth;
	windowsHeight = minH > windowsHeight ? minH : windowsHeight;

	$("#" + layoutID).height(windowsHeight);
	$("#" + layoutID).width(windowsWidth);
	
	// 设置上下的高与宽
	var headerH = $("#header").height();
	$("#header").width(windowsWidth);
	//上面导航的高度
	var mainnavH = $("#mainnav").height();
	$("#main").height(windowsHeight - headerH - mainnavH);
	$("#main").width(windowsWidth);
	
	var docheight = windowsHeight - 56 - $("#mainnav").height() - $("#subnav" + boxMenu.menuId).height() - $("#clear_"+boxMenu.menuId).height();

	if(boxMenu.secendMenuLocation == "left") {
		docheight = docheight - 20;
	}
	$("_documentcontent_" + boxMenu.menuId).height(docheight);//內容頁面高度
	$("document_lay_2_content_" + boxMenu.menuId).height(docheight);//內容頁面高度
	$("iframe[id=submenu" + boxMenu.menuId+"]").height(docheight);//设置iframe的高度
	
	var iframeContentWidth = 0;
	if($("#lay_1_" + boxMenu.menuId).width() > 0) {
		iframeContentWidth = $("#lay_1_" + boxMenu.menuId).width() + 20;
	}
	$("iframe[id=submenu" + boxMenu.menuId+"]").width(windowsWidth - iframeContentWidth);//设置iframe的宽度
	
	window.top.pushPageCache("_documentBodyHeight", docheight);//将当前内容页的调试设置到在缓存以便业务页面用
	
	computeBoxWidth(layoutID);
}


/**
 * 默认打开的iframe窗口
 * @param body
 * @param url
 * @param layoutID
 * @param id
 * @return
 */
var openDocumentIframe = function(body, url, layoutID, id, defaultLoad) {
	var doc = createDiv("_document_"  + id, "_document_");
	var iframe = document.createElement("iframe");
	$(iframe).attr('id', "submenu" + id);
	$(iframe).attr('frameborder', "no");
	$(iframe).width($(body).width());
	$(iframe).height($(body).height());
	
	if(defaultLoad) {
		$(iframe).attr("src", url);
	} else {
		$(iframe).attr("defaultLoadUrl", url);
	}
	
	$(iframe).attr("marginheight", "0");
	$(iframe).attr("marginwidth", "0");
	$(iframe).attr("broder", "0");
	$(iframe).attr("frameborder", "0");
	$(iframe).attr("onload", "onloadFunction('_document_body_" + id+"')");
	$(doc).append($(iframe));
	$(body).append($(doc));
	return doc;
}

var onloadFunction=function(id){

}
 
/**
 * 添加一个Tab菜单
 * @param boxMenu
 * @param layoutID
 * @param url
 * @param secendmenu
 * @return
 */
var addBoxMenu = function(boxMenu, layoutID, url, secendmenu) {
 	switch (layoutID) {
 	case 'wrap':
 		
 		if (null != $("#" + boxMenu.menuId + "_body").attr("id")) {//当该tab菜单已打开,就刷新该tab
 			if(!boxMenu.isfristpage) {
 				$("#mainleft div[class=submenu1]").removeClass("submenu1").addClass("submenu");
				
				$("#"+boxMenu.menuId+"_body").removeClass().addClass("submenu1");
				
				$("#fristpage_body").removeClass();
				$("#fristpage_body").addClass("menu1");
 			}
 		
 		    if(boxMenu.defaultShowSecendMenu != 0) {
 		    	defaultChickSecendMenu(boxMenu, layoutID);
 		    }

 		    if(boxMenu.fromMenu) {//来自一级菜单
 		    	defaultChickSecendMenu(boxMenu, layoutID);
 		    }
 		    
 			boxoutDivCss(boxMenu.menuId, layoutID);
 			boxOverDivCss(boxMenu.menuId, layoutID);
 			
 	        if ($("#submenu" + boxMenu.menuId).attr('src') != url) {//如果当前tab所显示的页面不是原来的页面,重新加载新的页面
 	        	$("#submenu" + boxMenu.menuId).attr('src',url);
 			} else {
 				if (boxMenu.isReload) {
 					window.frames["submenu" + boxMenu.menuId].document.location.href=url;
 				}
 			}
 	        
 	        return;
 		}
 		
 		boxMenu.boxObj = $("#mainleft");
 		var documentcontent = createDiv("_documentcontent_" + boxMenu.menuId, "main_content");//创建当前tab的div
 		$("#main").append($(documentcontent));

 		addBoxMenuMsNew(boxMenu, layoutID, secendmenu);
 		///设置内容页面的高度
 		var windowsHeight = $(window).height();
 		$(documentcontent).height(windowsHeight -  56 - 34 - $("#subnav" + boxMenu.menuId).height() - $("#clear_"+boxMenu.menuId).height());//內容頁面高度
 		//$(documentcontent).height(windowsHeight -  $("#header").height() - $("#mainnav").height() - $("#subnav" + boxMenu.menuId).height() - $("#clear_"+boxMenu.menuId).height());//內容頁面高度
 		if(secendmenu != null) {
	 		if(secendmenu.length > 1 && boxMenu.secendMenuLocation == "left"  ) {//如果有子菜单位置并在左边,
	 			$("#document_lay_2_content_" + boxMenu.menuId).height($(documentcontent).height() - 20);
	 			documentcontent = $("#document_lay_2_content_" + boxMenu.menuId);
	 		} 
 		}
 		boxMenu.documentObj = openDocument(documentcontent, url, layoutID, boxMenu.menuId, boxMenu.defaultLoad);//打开iframe窗口
 		
 		boxMenu.url = url;
 		adaptationWidthAndHeight(boxMenu, layoutID);
 		break;

 	default:
 		break;
 	}
}
 
/**
 * 添加tabs的处理
 * @param boxMenu
 * @param layoutID
 * @param secendmenu
 * @return
 */
var addBoxMenuMsNew = function(boxMenu, layoutID, secendmenu) {
	 var tabcss = "submenu1";
	if(boxMenu.isOpen == 'notCurOpen') {
		hideCurboxOverDivCss(boxMenu.menuId, layoutID);
		tabcss = "submenu";
	} else {
		boxoutDivCss(boxMenu.menuId, layoutID);
		boxOverDivCss(boxMenu.menuId, layoutID);
	}
	
	var tabhtml = "<a href='#' title="+boxMenu.menuName+">"+boxMenu.menuName+"</a>";
	
	if(boxMenu.isfristpage) {
		tabcss = "menu";
		tabhtml = "<a href='#'><b></b></a>";
		var box = createDiv(boxMenu.menuId + "_body",tabcss);
		$(box).html(tabhtml);
		$(box).attr("title", boxMenu.menuName);
		$("#mainleft").append($(box));
	} else {
		if(boxMenu.isOpen == 'notCurOpen') {
		} else {
			$("#mainleft div[class=submenu1]").removeClass("submenu1").addClass("submenu");
		}
		
		$("#fristpage_body").removeClass();
		$("#fristpage_body").addClass("menu1");
		
		var box = createDiv(boxMenu.menuId + "_body" ,tabcss);
		$(box).html(tabhtml);
		
		
		if(boxMenu.isClose) {
			var closea = document.createElement("b");
			$(box).append(closea);
			
			$(closea).click(function() {//关闭tab解发事件
				removeBoxNew($(box), boxMenu.documentObj, layoutID, boxMenu);
			});
		}
		
		
	}
	if(secendmenu != null) {
		if(secendmenu.length > 1) {
			//判断二级菜单在那里显示 left左边,top上面,空为不展示二级菜单
			switch (boxMenu.secendMenuLocation) {
				case 'left':
					msSecendLeftMenuNew(boxMenu, layoutID, secendmenu);
					break;
				case 'top':
					msSecendMenuNew(boxMenu, layoutID, secendmenu);
					break;
				default:
					break;
					
			}
		}
	}

	defaultChickSecendMenu(boxMenu, layoutID);
	
	var obj = new Object();
	obj.box = $(box);
	obj.layoutID = layoutID;
	obj.doc = boxMenu.documentObj;
	obj.boxMenu = boxMenu;
	pushPageCache(boxMenu.menuId, obj);
	
	if(boxMenu.oper){
		fristMenu = box;
	}
	
	$(box).click(function() {//点击事件
		if(boxMenu.menuId != "fristpage") {
			$("#mainleft div[class=submenu1]").removeClass("submenu1").addClass("submenu");
			$(box).removeClass();
			
			$(box).addClass("submenu1");
			
			$("#fristpage_body").removeClass();
			$("#fristpage_body").addClass("menu1");
			if ($("#submenu" + boxMenu.menuId).attr("src") == '' || $("#submenu" + boxMenu.menuId).attr("src") == null) {//如果默认没有加载，点击时就加载
				$("#submenu" + boxMenu.menuId).attr('src',boxMenu.url);
			}
			
		} else {
			$(box).removeClass();
			$(box).addClass("menu");
			$("#mainleft div[class=submenu1]").removeClass("submenu1").addClass("submenu");
		}
	
		boxoutDivCss(boxMenu.menuId, layoutID);
		boxOverDivCss(boxMenu.menuId, layoutID);
		adaptationWidthAndHeight(boxMenu,layoutID);
		computeBoxWidthSecond(boxMenu, layoutID);
	});
	boxMenu.boxObj.append($(box));
	computeBoxWidth(layoutID);
	// 计算位置
}


 /**
  * 一级菜单tabs的宽度设置
  * @param layoutID
  * @return
  */
  var computeBoxWidth = function(layoutID) {
  	// 计算所有Tab的宽度
  	var tabsW = 0;
  	var margin = 0;
  	var tabs = $("#mainleft").children("div");
  	
 	var maxSigleBoxW = 110;//单个tab最大宽度
 	var minSingleBoxW = 40;//单个tab最小宽度
 	var windowsWidth = $(window).width();
 	var boxW = windowsWidth - 20;//放置tabs的div的宽度 
 	var singleBoxW = 0;//计算出来的单个tab宽度
 	
  	if (!tabs) {
  		return;
  	} else {
  		
  		//多于二个tabs就显示全部关闭
  		if(tabs.length > 3) {
  			$("#submenu_guanbi_list_li_close").show();
  		} else {
  			$("#submenu_guanbi_list_li_close").hide();
  		}
  		
  	 	singleBoxW = parseInt(boxW / tabs.length - 4);

  		if(maxSigleBoxW > singleBoxW) {//如果tab最大宽度大小平均宽度
  			
  			if(singleBoxW < minSingleBoxW) {//如果平均宽度小于最小宽度
  				//todo如果窗口的最小值没有做限定。这个地方就要做处理
  				
  			} else {
  				for (i = 4; i < tabs.length; i++) {//从4开始菜单,首页的不处理
  			 		try {
  			 			$(tabs[i]).width(singleBoxW);
  			 			var textTabs = $(tabs[i]).children("div");
  			 			for(j = 0; j < textTabs.length; j++) {
  			 				if(j == 0) {
  			 					$(textTabs[j]).width(singleBoxW - 15 - 8 - 8);
  			 				}
  			 			}
  			 		} catch (error) {
  			 			$(tabs[i]).width(singleBoxW);
  			 			var textTabs = $(tabs[i]).children("div");
  			 			for(j = 0; j < textTabs.length; j++) {
  			 				if(j == 0) {
  			 					$(textTabs[j]).width(singleBoxW - 15 - 8 - 8);
  			 				}
  			 			}
  			 		
  			 		}
  			 	}
  			}
  		} else {//还原原来的样式
  			$("div[id^=submenu_left_]").width(maxSigleBoxW - 15 - 8 - 8);
  			$(".submenu").width(maxSigleBoxW);
  			$(".submenu1").width(maxSigleBoxW);
  			
  		}
  	}
  	
  	computeBoxWidthFrist(layoutID);//tabs管理标签位置控制

  }
 /**
  * tabs管理标签位置控制
  * @param layoutID
  * @return
  */
  var computeBoxWidthFrist = function(layoutID) {
 	 var windowsWidth = $(window).width();
 	 var mainleftWidth = $("#mainleft").width();
 	 $("#submenu_guanbi_list").css("right",windowsWidth - mainleftWidth - 20 - 22);//离右边的距离
  }
 
/**
 * 生成第二级菜单
 * @return
 */
var msSecendMenuNew = function(boxMenu, layoutID, secendmenu) {
	var nav = createDiv("nav", "nav");
	$("#_documentcontent_"+boxMenu.menuId).append($(nav));
	var subnav = createDiv("subnav" + boxMenu.menuId, "subnav");
	 
	 if(boxMenu.headimg !=  'null' && boxMenu.headimg !=  null && typeof boxMenu.headimg != "undefined" && boxMenu.headimg != "undefined") {
		 	var operButton = createDiv("", "");
			$(operButton).html("<a href='#'>"+boxMenu.description+"</a>");
			$(operButton).addClass("xinjian");
			$(subnav).append($(operButton));
			
			$(operButton).click(function() {
				 openWindows(boxMenu.menuId+"_open",boxMenu.description,boxMenu.headimg, boxMenu.menuId, layoutID, false,false,true,true);
			});
	}
	 
	 var ul = createUl("ul_subnav_" + boxMenu.menuId, "");
	 $(subnav).append($(ul));
	 if(secendmenu != null) {
		 var menu = "menu01";
		 var chickMenu;
		 for(var i = 0; i < secendmenu.length; i++) {
			 if(i == 0) {
				 menu = "menu02";
			 } else {
				 menu = "menu01";
			 }
			 var li = createLi("li_secendmenu" + secendmenu[i].menuId + "_" + i, menu);
			 $(ul).append($(li));
			 $(li).attr("src",secendmenu[i].url).html("<a id='li_secendmenu_href_"+secendmenu[i].menuId+"_"+i+"' href='#'>"+secendmenu[i].text+"</a>");
			 $(nav).append($(subnav)); 
			 
			 $(li).click(function() {//点击事件
				 if($(this).attr("class") == "menu01" || $(this).attr("class") == "menu02") {
					 $("li[id^=li_secendmenu" + boxMenu.menuId + "_]").removeClass();
					 $("#ul_subnav_"+boxMenu.menuId+" li").addClass("menu01");
					 $(this).removeClass("menu01");
				 	 $(this).addClass("menu02");
				 	 $("a[id^=li_secendmenu_href_"+boxMenu.menuId+"]").removeClass();
				 	 $("#ul_"+boxMenu.menuId+" a").addClass("subnav_xuan");
				 } else {
					 $("li[id^=li_secendmenu" + boxMenu.menuId + "_]").removeClass();
					 $("#ul_subnav_"+boxMenu.menuId+" li").addClass("menu01");
					 $("a[id^=li_secendmenu_href_"+boxMenu.menuId+"]").removeClass();
					 $("a[id^=li_secendmenu_href_"+boxMenu.menuId+"]").addClass("subnav_xuan");
				 	 $(this).children("a").addClass("subnav_xuan2");
				 	 $(this).children("a").removeClass("subnav_xuan");
				 }
			 	 boxMenu.url = jQuery(this).attr("src");
			 	 
			 	 boxMenu.defaultShowSecendMenu = 0;
			 	 boxMenu.fromMenu = false;
				 addBoxMenu(boxMenu, layoutID, jQuery(this).attr("src"));
			});
			 
		 }
		 computeBoxWidthSecond(boxMenu, layoutID);
	 }
	 var clear = createDiv("clear_" + boxMenu.menuId, "clear");
	 $("#_documentcontent_"+boxMenu.menuId).append($(clear));
}

 /**
  * 生成在左边的二级菜单
  * @param boxMenu
  * @param layoutID
  * @param secendmenu
  * @return
  */
var msSecendLeftMenuNew = function(boxMenu, layoutID, secendmenu) {
	var lay_1 = createDiv("lay_1_" + boxMenu.menuId, "lay_1");
	if(boxMenu.headimg != "null" && boxMenu.headimg != null && typeof boxMenu.headimg != "undefined" && boxMenu.headimg != "undefined") {
		var h3 = document.createElement("h3");
		$(h3).html("<b><a href='#'>"+boxMenu.description+"</a></b>");
		$(lay_1).append($(h3));
		
		$(h3).click(function() {
			openWindows(boxMenu.menuId+"_open",boxMenu.description,boxMenu.headimg, boxMenu.menuId, layoutID, false,false,true,true);
		});
	}
	
	$("#_documentcontent_" + boxMenu.menuId).append($(lay_1));
	
	var ul = createUl("ul" + boxMenu.menuId, "");
	 $(lay_1).append($(ul));
	 if(secendmenu != null) {
		 for(var i = 0; i < secendmenu.length; i++) {
			 var li = createLi("li_secendmenu" + secendmenu[i].menuId + "_" + i, "");
			 $(ul).append($(li));
			 $(li).attr("src",secendmenu[i].url)
			 
			 $(li).html("<a href='#'>"+secendmenu[i].text+"</a>");
			 if(i == 0) {
				 $(li).addClass("lay_a_xuan");
			 } 
			 
			 $(li).click(function() {//点击事件
				 $("li[id^=li_secendmenu" + boxMenu.menuId + "_]").removeClass();
				 $(this).addClass("lay_a_xuan");
				 boxMenu.url = jQuery(this).attr("src");
				 boxMenu.defaultShowSecendMenu = 0;
			 	 boxMenu.fromMenu = false;
				 addBoxMenu(boxMenu, layoutID, jQuery(this).attr("src"));
			 });
		 }

	 }
	
	var lay_2 = createDiv("document_lay_2_content_" + boxMenu.menuId, "lay_2");
	$("#_documentcontent_" + boxMenu.menuId).append($(lay_2));
	
}

/*
  函数:  defaultChickSecendMenu
  说明:  默认选中二级菜单
  参数:   无
  返回值: 
*/
function defaultChickSecendMenu(boxMenu, layoutID) {
	//判断二级菜单在那里显示 left左边,top上面,空为不展示二级菜单
	switch (boxMenu.secendMenuLocation) {
		case 'left':
			defaultChickLeftMenu(boxMenu, layoutID);
			break;
		case 'top':
			defaultChickToptMenu(boxMenu, layoutID);
			break;
		default:
			break;
			
	}
}

/*
函数:  defaultChickLeftMenu
说明:  默认选中左边的菜单
参数:   无
返回值: 
*/
function defaultChickLeftMenu(boxMenu, layoutID) {
		var chickMenu;
		 if(chickMenu == '' || chickMenu == null) {
			 chickMenu = "#li_secendmenu" + boxMenu.menuId + "_" + boxMenu.defaultShowSecendMenu;
		 }
		 $("li[id^=li_secendmenu" + boxMenu.menuId + "_]").removeClass();
		 $(chickMenu).addClass("lay_a_xuan");
}

/*
函数:  defaultChickToptMenu
说明:  默认选中上面的菜单
参数:   无
返回值: 
*/
function defaultChickToptMenu(boxMenu, layoutID) {
	     var chickMenu;
		 if(chickMenu == '' || chickMenu == null) {
			 chickMenu = "#li_secendmenu" + boxMenu.menuId + "_" + boxMenu.defaultShowSecendMenu;
		 }
		 if($(chickMenu).attr("class") == "menu01" || $(chickMenu).attr("class") == "menu02") { //默认选中的二级菜单
			 $("li[id^=li_secendmenu" + boxMenu.menuId + "_]").removeClass();
			 $("#ul_subnav_"+boxMenu.menuId+" li").addClass("menu01");
			 $(chickMenu).removeClass("menu01");
		 	 $(chickMenu).addClass("menu02");
		 	 $("a[id^=li_secendmenu_href_"+boxMenu.menuId+"]").removeClass();
		 	 $("#ul_"+boxMenu.menuId+" a").addClass("subnav_xuan");
		 }
}

/*
  函数:  defaultMenuOrderBy
  说明:  默认菜单排序
  参数:   无
  返回值: 
*/
var defaultMenuOrderBy = function(defaultMenuList) {
	for(var i = 0; i < defaultMenuList.length-1; i++) {
		if(i == defaultMenuList.length - 1) {
		} else {
			$("#"+defaultMenuList[i+1].menuId+"_body").insertAfter($("#"+defaultMenuList[i].menuId+"_body"));
		}
	}
}

/**
 * 隐藏所有菜单tab的有内容
 * @param boxId
 * @param layoutID
 * @return
 */
var boxoutDivCss = function(boxId, layoutID) {
	$("div[id^=_documentcontent_]").hide();
	$(".content").hide();
 	$("._document_").hide();
 	$(".subnav").hide();
}

/**
 * 显示当前点击的tab的有内容
 * @param boxId
 * @param layoutID
 * @return
 */
var boxOverDivCss = function(boxId, layoutID) {
	$("#_documentcontent_" + boxId).show();
 	$("#_document_" + boxId).show();
 	$("#subnav" + boxId).show();
}
 
/**
  * 隐藏当前点击的tab的有内容
  * @param boxId
  * @param layoutID
  * @return
*/
var hideCurboxOverDivCss = function(boxId, layoutID) {
 	$("#_documentcontent_" + boxId).hide();
  	$("#_document_" + boxId).hide();
  	$("#subnav" + boxId).hide();
}
 
 var removeBoxNew = function(box, body, layoutID, boxMenu) {
		// 定位上一层
		if(boxMenu.isOpen == 'notCurOpen') {
		} else {
			var showParentMenuId;
			if ($(box).prev().attr('id')) {
				if(boxMenu.isBackParentTab != null && boxMenu.isBackParentTab != 'null') {
					showParentMenuId = boxMenu.superID;
				} else {
					showParentMenuId = $(box).prev().attr("id").replace("_body",'');
				}
				if(!$("#_documentcontent_"+ ($(box).attr("id").replace("_body",''))).is(":hidden")) {//如果关闭的当前页面是打开的，就显示前面的tab
					
					boxoutDivCss(boxMenu.menuId, layoutID);
					$("#subnav"+ showParentMenuId).show();
					$("#_documentcontent_"+ showParentMenuId).show();
					$("#_document_"+ showParentMenuId).show();
					
					if(showParentMenuId == "fristpage") {
						$("#fristpage_body").removeClass();
						$("#fristpage_body").addClass("menu");
					} else {
						$("#mainleft div[class=submenu1]").removeClass("submenu1").addClass("submenu");
						
						$("#"+showParentMenuId+"_body").removeClass().addClass("submenu1");
						
						$("#fristpage_body").removeClass();
						$("#fristpage_body").addClass("menu1");
					}
				}
				if(boxMenu.isParentReload != null && boxMenu.isParentReload != 'null' && boxMenu.isParentReload) {
					var parentObj = window.findPageCacheName(showParentMenuId);
					window.frames["submenu" + showParentMenuId].document.location.href=parentObj.boxMenu.url;
				}
				
			} 
		}
		var ww = $(box).width();
		$(box).remove();
		$("#_documentcontent_" + boxMenu.menuId).remove();
		removePageCache(boxMenu.menuId);
		//$(body).remove();
		// 改变
		computeBoxWidth(layoutID);
}
 

 /**
  * 二级菜单更多的显示处理
  * @param boxMenu
  * @param layoutID
  * @return
  */
 var computeBoxWidthSecond = function(boxMenu, layoutID) {
	 var windowsWidth = $(window).width() - 60;//放二级菜单的全部参数
	 var isButton = false;
	 if($("#subnav" + boxMenu.menuId+" div[class=xinjian]").length > 0 ) {//如果二级菜单上有操作按钮，就减去操作按钮的宽度
		 windowsWidth = windowsWidth - 90 - 30;
	 	 isButton = true;
	 }
	 var allSeceondTabsWidth = 0;
	 var subnav_more_count = 0;
	 if($("#subnav_more_list_" + boxMenu.menuId).length > 0) {
		 var seceondMoreTabs = $("#subnav_more_list_" + boxMenu.menuId + " li");//查询更多div下面的所有li
		 for(i = 0; i < seceondMoreTabs.length; i++) {
			 if($(seceondMoreTabs[i]).children("a").attr("class") == "subnav_xuan2") {
				 $(seceondMoreTabs[i]).children("a").removeClass("subnav_xuan2");
				 $(seceondMoreTabs[i]).addClass("menu02");
			 } else {
				 $(seceondMoreTabs[i]).children("a").removeClass("subnav_xuan");
				 $(seceondMoreTabs[i]).addClass("menu01");
			 }
			 $(seceondMoreTabs[i]).clone(true).appendTo("#ul_subnav_" + boxMenu.menuId); //将更多菜单重新添加到显示的二级菜单中
			 $(seceondMoreTabs[i]).remove();//删除更多里面的菜单
		 }
	 }
	 
	 var seceondTabs = $("#subnav" + boxMenu.menuId + " li");//查询该div下面的所有li
	 for(i = 0; i < seceondTabs.length; i++) {
		 allSeceondTabsWidth = allSeceondTabsWidth + $(seceondTabs[i]).width() + 40;
		 if(allSeceondTabsWidth > windowsWidth) {//如果总tabs的各大于放tabs的宽度，所以要放到更多里面
			 if(subnav_more_count == 0) {
				 $("#subnav_more_"+boxMenu.menuId).remove();
				 $("#subnav_more_list_"+boxMenu.menuId).remove();
				 
				 var subnav_more = createDiv("subnav_more_" + boxMenu.menuId, "subnav_more");
				 $(subnav_more).html("<a href='#'><p>更多</p><b></b></a>");
				 $("#subnav" + boxMenu.menuId).append($(subnav_more));
				 $(subnav_more).hide();
				 
				 var subnav_more_list = createDiv("subnav_more_list_" + boxMenu.menuId, "subnav_more_list");
				 $(subnav_more_list).hide();
				 $("#subnav" + boxMenu.menuId).append($(subnav_more_list));
				 //$(subnav_more_list).css("top",124).hide().appendTo("body");
				 
				 ul = createUl("ul_" + boxMenu.menuId, "");
				 
				 $(subnav_more_list).append($(ul));
				 
				 $(subnav_more).click(
						 function(event) {
							 if($(subnav_more_list).is(':hidden') == true) {
								 $(subnav_more).focus();
								 $(subnav_more_list).fadeIn();
							 } else {
								 $(subnav_more).focus();
								 $(subnav_more_list).fadeOut();
							 }
						 }
				 );
				 
				
				 
				 $(subnav_more).show();
				 var rightMore =  $(window).width() - (allSeceondTabsWidth - $(seceondTabs[i]).width() - 40) - 60 ;
				 if(isButton) {//如果前面有按钮就减去前面的按钮值
					 rightMore = rightMore - 90 - 30;
				 } 
				 $(subnav_more_list).css("right", rightMore - 2);//离右边的距离
			 }
		 
		     var subnav_xuan = "";
		 	 if($(seceondTabs[i]).attr("class") == "menu02") {
		 		subnav_xuan = "subnav_xuan2";
		 	 } else {
		 		subnav_xuan = "subnav_xuan";
		 	 }
		 	 $(seceondTabs[i]).children("a").addClass(subnav_xuan);
	 		 $(seceondTabs[i]).removeClass().clone(true).appendTo($(ul));//将显示不出来的菜单放到更多里面

			 $(seceondTabs[i]).remove();//删除显示不全的菜单
			 subnav_more_count++;
			 
			var unCloseArray = new Array();
			var clickCloseArray = new Array();
			
			unCloseArray.push($("#subnav_more_"+boxMenu.menuId)[0]);
			unCloseArray.push($("#subnav_more_list_"+boxMenu.menuId)[0]);
			unCloseArray.push($("#ul_"+boxMenu.menuId)[0]);
			
			$("#ul_"+boxMenu.menuId+" li").each(function(){
				unCloseArray.push(this);
			});
			$("#ul_"+boxMenu.menuId+" li a").each(function(){
				unCloseArray.push(this);
			});
			
			$("#ul_"+boxMenu.menuId+" li a").each(function(){
				 clickCloseArray.push(this);
			});
			
			var closeCon = new PubOPT.closeControl({
				 clickId : "subnav_more_" + boxMenu.menuId,
				 unCloseArray : unCloseArray,
				 clickCloseArray : clickCloseArray,
				 closeFunction : function(){
					$("#subnav_more_list_" +　boxMenu.menuId).fadeOut();
				}
			});
			
			
		 }  
	 }
	 
	 if(allSeceondTabsWidth < windowsWidth) {//如果菜单总和小于要显示的宽度，就删除更多菜单
		 $("#subnav_more_"+boxMenu.menuId).remove();
		 $("#subnav_more_list_"+boxMenu.menuId).remove();
	 }
	 
 }