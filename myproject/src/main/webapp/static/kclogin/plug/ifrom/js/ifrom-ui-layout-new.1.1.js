/**
 * ui 布局控件，黄艺平2013-10-8新建
 * 包括
 * -----------------
 *    |
 *    |
 * ------------
 */
/**
 * 布局控件值对像
 */
/**
 * 上，左右布局
 */

var layoutHeaderLeftRigthNew = function(layoutID, p) {

	var obje = $("#" + layoutID);
	// 新建头DIV
	var heander = createDiv("header");
	$(obje).append($(heander));
	
	//一级菜单导航区DIV
	var mainnav = createDiv("mainnav", "mainnav");
	$(obje).append($(mainnav));
	
	
	msSoftMenuNew(mainnav, layoutID, p);
	
	// 新建中间主体DIV
	var body = createDiv("main");
	$(obje).append($(body));

	
}


/**
* 生成默认的一级菜单
*/
var msSoftMenuNew = function(mainnav, layoutID, p) {
	var bottomnav = createDiv("bottomnav", "bottomnav");
	$(mainnav).append($(bottomnav));

	var mainleft1 = createDiv("mainleft1" , "mainleft1");
	$(bottomnav).append($(mainleft1));
	
	var mainleft = createDiv("mainleft" , "mainleft");
	$(mainleft1).append($(mainleft));
	
	var funcBar = createDiv("funcBar" , "funcBar");
	$(funcBar).html("<a href='#'></a>");
	$(mainleft).append($(funcBar));
	
	var funcBar_box = createDiv("funcBar_box" , "funcBar_box");
	$(mainleft).append($(funcBar_box));
	$(funcBar_box).hide();
	 
	 $(funcBar).click(
			 function(event) {
				 if($(funcBar_box).is(':hidden') == true) {
				     $(funcBar).focus();
					 $(funcBar_box).fadeIn();
				 } else {
					 $(funcBar).focus();
					 $(funcBar_box).fadeOut();
				 }
			 }
	 );
	 
	 $(funcBar).blur(function(){
				  var e=window.document.activeElement;//获得当前活动的对象
			  	  if( e.id != "funcBar" && e.id!="funcBar_box"){//当图片和现实图片的id都不是当前活动对象时
					 $(funcBar_box).fadeOut();
				  }

	 });
	 
	 $(funcBar_box).blur(function(){
			  var e=window.document.activeElement;//获得当前活动的对象
		  	  if( e.id != "funcBar" && e.id!="funcBar_box"){//当图片和现实图片的id都不是当前活动对象时
				 $(funcBar_box).fadeOut();
			  }

	 });
	 
	var submenu_guanbi = createDiv("submenu_guanbi", "submenu_guanbi");
	$(mainleft1).append($(submenu_guanbi));
	
	
	var submenu_guanbi_list = createDiv("submenu_guanbi_list", "submenu_guanbi_list");
	$(mainleft1).append($(submenu_guanbi_list));
	$(submenu_guanbi_list).hide();
	
	var submenu_guanbi_list_ul = createUl("", "");
	$(submenu_guanbi_list).append($(submenu_guanbi_list_ul));
	
	var submenu_guanbi_list_li_close = createLi("submenu_guanbi_list_li_close", "");
	$(submenu_guanbi_list_ul).append($(submenu_guanbi_list_li_close));
	$(submenu_guanbi_list_li_close).html("<a href='javascript:closeAllNew()'>关闭全部</a>");
	$(submenu_guanbi_list_li_close).hide();
	
	var submenu_guanbi_list_li_config = createLi("", "");
	$(submenu_guanbi_list_ul).append($(submenu_guanbi_list_li_config));
	$(submenu_guanbi_list_li_config).html("<a href='javascript:closeAllNew()'>管理标签窗口</a>");
	
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
	 
	 $(submenu_guanbi).blur(function(){
				  var e=window.document.activeElement;//获得当前活动的对象
			  	  if( e.id != "submenu_guanbi" && e.id!="submenu_guanbi_list"){//当图片和现实图片的id都不是当前活动对象时
					 $(submenu_guanbi_list).fadeOut();
				  }

	 });
	 
	 $(submenu_guanbi_list).blur(function(){
			  var e=window.document.activeElement;//获得当前活动的对象
		  	  if( e.id != "submenu_guanbi" && e.id!="submenu_guanbi_list"){//当图片和现实图片的id都不是当前活动对象时
				 $(submenu_guanbi_list).fadeOut();
			  }

	 });

}

function closeAllNew(){
	window.top.location.reload();
}

/**
* 高度自适应
*/
var adaptationWidthAndHeightMSNew = function(boxMenu, layoutID) {
	var windowsWidth = $(window).width();
	var windowsHeight = $(window).height();
	// 得到最小高与宽
	var minW = parseInt($("#" + layoutID).css("min-width").replace("px", ""));
	var minH = parseInt($("#" + layoutID).css("min-height").replace("px", ""));
	windowsWidth = minW > windowsWidth ? minW : windowsWidth;
	windowsHeight = minH > windowsHeight ? minH : windowsHeight;

	$("#" + layoutID).height(windowsHeight);
	$("#" + layoutID).width(windowsWidth);
	
	// 设置上下的高与宽
	var headerH = $("#header").height();
	$("#header").width(windowsWidth);
	
	$("#main").height(windowsHeight - headerH);
	$("#main").width(windowsWidth);
	
	var docheight = windowsHeight - 56 - $("#mainnav").height() - $("#subnav" + boxMenu.menuId).height() - $("#clear_"+boxMenu.menuId).height();

	if(boxMenu.secendMenuLocation == "left") {
		docheight = docheight - 20;
	}
	$("_documentcontent_" + boxMenu.menuId).height(docheight);//內容頁面高度
	$("document_lay_2_content_" + boxMenu.menuId).height(docheight);//內容頁面高度
	$("iframe[id=submenu" + boxMenu.menuId+"]").height(docheight);//设置iframe的高度
	window.top.pushPageCache("_documentBodyHeight", docheight);
	
	computeBoxWidthNew(layoutID);
}


/**
 * 默认打开的窗口
 */
var openDocumentMsNew = function(body, url, layoutID, id) {
	//$("._document_" + layoutID).hide();
	var doc = createDiv("_document_"  + id, "_document_");
	var iframe = document.createElement("iframe");
	//$(iframe).addClass(getStyle("_document_body_" + layoutID));
	$(iframe).attr('id', "submenu" + id);
	$(iframe).width($(body).width());
	$(iframe).height($(body).height());
	$(iframe).attr("src", url);
	$(iframe).attr("marginheight", "0");
	$(iframe).attr("marginwidth", "0");
	$(iframe).attr("broder", "0");
	$(iframe).attr("frameborder", "0");
	$(iframe).attr("onload", "onloadFunction('_document_body_" + id+"')");
	$(doc).append($(iframe));
	$(body).append($(doc));
	return doc;
}

/**
 * 添加tabs的处理
 * @param boxMenu
 * @param layoutID
 * @param secendmenu
 * @return
 */
var addBoxMenuMsNew = function(boxMenu, layoutID, secendmenu) {
	BoxoutDivCssNew(boxMenu.menuId, layoutID);
	BoxOverDivCssNew(boxMenu.menuId, layoutID);
	var tabcss = "submenu";
	var tabhtml = "<a href='#'>"+boxMenu.menuName+"</a>";
	
	if(boxMenu.isfristpage) {
		tabcss = "menu";
		tabhtml = "<a href='#'><b></b></a>";
		var box = createDiv(boxMenu.menuId + "_body",tabcss);
		$(box).html(tabhtml);
		$(box).attr("title", boxMenu.menuName);
		$("#mainleft").append($(box));
	} else {
		var box = createDiv(boxMenu.menuId + "_body" ,tabcss);
		var submenu_left = createDiv("submenu_left_" + boxMenu.menuId,"submenu_left");
		var submenu_right = createDiv(boxMenu.menuId + "submenu_right" ,"submenu_right");
		
		$(box).append($(submenu_left));
		$(submenu_left).html(tabhtml);
		$(submenu_left).attr("title", boxMenu.menuName);
		
		$(submenu_right).html("<a href='#'></a>");
		$(box).append($(submenu_right));
		
		$(submenu_right).click(function() {//关闭tab解发事件
			removeBoxNew($(box), boxMenu.documentObj, layoutID, boxMenu);
		});
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
	
	var obj = new Object();
	obj.box = $(box);
	obj.layoutID = layoutID;
	obj.doc = boxMenu.documentObj;
	obj.boxMenu = boxMenu;
	//pushPageCache(boxMenu.menuId, obj);
	
	if(boxMenu.oper){
		fristMenu = box;
	}
	
	$(box).click(function() {//点击事件
		BoxoutDivCssNew(boxMenu.menuId, layoutID);
		BoxOverDivCssNew(boxMenu.menuId, layoutID);
		adaptationWidthAndHeightMSNew(boxMenu,layoutID);
		computeBoxWidthSecond(boxMenu, layoutID);
	});
	boxMenu.boxObj.append($(box));
	computeBoxWidthNew(layoutID);
	// 计算位置
}

/**
 * 生成第二级菜单
 * @return
 */
var msSecendMenuNew = function(boxMenu, layoutID, secendmenu) {
	var nav = createDiv("nav", "nav");
	$("#_documentcontent_"+boxMenu.menuId).append($(nav));
	 var subnav = createDiv("subnav" + boxMenu.menuId, "subnav");
	 if(boxMenu.headimg != "null") {
		 	var operButton = createDiv("", "");
			$(operButton).html("<a href='#'>"+boxMenu.description+"</a>");
			$(operButton).addClass("xinjian");
			$(subnav).append($(operButton));
			
			$(operButton).click(function() {
				 openWindows('newMeeting',boxMenu.description,boxMenu.headimg, layoutID, layoutID, false,false,true,true);
			});
	}
	 
	 var ul = createUl("ul_subnav_" + boxMenu.menuId, "");
	 $(subnav).append($(ul));
	 if(secendmenu != null) {
		 for(var i = 0; i < secendmenu.length; i++) {
			 var li = createLi("li_secendmenu" + secendmenu[i].menuId + "_" + i, "");
			 $(ul).append($(li));
			 $(li).attr("src",secendmenu[i].url).html("<a href='#'><font color='0177fe'>"+secendmenu[i].text+"</font></a>");
			 $(nav).append($(subnav));
			 
			 $(li).click(function() {//点击事件
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
	if(boxMenu.headimg != "null") {
		var h3 = document.createElement("h3");
		$(h3).html("<b><a href='#'>"+boxMenu.description+"</a></b>");
		$(lay_1).append($(h3));
		
		$(h3).click(function() {
			 openWindows('newMeeting',boxMenu.description,boxMenu.headimg, layoutID, layoutID, false,false,true,true);
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
				 addBoxMenu(boxMenu, layoutID, jQuery(this).attr("src"));
			 });
		 }
	 }
	
	var lay_2 = createDiv("document_lay_2_content_" + boxMenu.menuId, "lay_2");
	$("#_documentcontent_" + boxMenu.menuId).append($(lay_2));
	
}

 var BoxoutDivCssNew = function(boxId, layoutID) {
	$("div[id^=_documentcontent_]").hide();
	$(".content").hide();
 	$("._document_").hide();
 	$(".subnav").hide();
 }
 var BoxOverDivCssNew = function(boxId, layoutID) {
	$("#_documentcontent_" + boxId).show();
 	$("#_document_" + boxId).show();
 	$("#subnav" + boxId).show();
 }
 
 var removeBoxNew = function(box, body, layoutID, boxMenu) {
		// 定位上一层
		if ($(box).prev().attr('id')) {
			BoxoutDivCssNew(boxMenu.menuId, layoutID);
			$("#subnav"+ ($(box).prev().attr("id").replace("_body",''))).show();
			$("#_documentcontent_"+ ($(box).prev().attr("id").replace("_body",''))).show();
			$("#_document_"+ ($(box).prev().attr("id").replace("_body",''))).show();
		} 
		var ww = $(box).width();
		$(box).remove();
		$(body).remove();
		// 改变
		computeBoxWidthNew(layoutID);
	}
 
/**
 * 一级菜单tabs的宽度设置
 * @param layoutID
 * @return
 */
 var computeBoxWidthNew = function(layoutID) {
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
 		
 	 	singleBoxW = parseInt(boxW / tabs.length - 3);
 	 	
 		if(maxSigleBoxW > singleBoxW) {//如果tab最大宽度大小平均宽度
 			if(singleBoxW < minSingleBoxW) {//如果平均宽度小于最小宽度
 				//todo如果窗口的最小值没有做限定。这个地方就要做处理
 				
 			} else {
 				for (i = 3; i < tabs.length; i++) {//从3开始菜单,首页的不处理
 			 		try {
 			 			$(tabs[i]).width(singleBoxW);
 			 			var textTabs = $(tabs[i]).children("div");
 			 			for(j = 0; j < textTabs.length; j++) {
 			 				if(j == 0) {
 			 					$(textTabs[j]).width(singleBoxW - 15 - 8);
 			 				}
 			 			}
 			 		} catch (error) {
 			 			$(tabs[i]).width(singleBoxW);
 			 			var textTabs = $(tabs[i]).children("div");
 			 			for(j = 0; j < textTabs.length; j++) {
 			 				if(j == 0) {
 			 					$(textTabs[j]).width(singleBoxW - 15 - 8);
 			 				}
 			 			}
 			 		
 			 		}
 			 	}
 			}
 		} else {//还原原来的样式
 			$("div[id^=submenu_left_]").width(maxSigleBoxW - 15 - 8);
 			$(".submenu").width(maxSigleBoxW);
 		}
 	}
 	
 	computeBoxWidthFrist(layoutID);

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
				 $(subnav_more_list).css("top",124).hide().appendTo("body");
				 
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
				 
				 $(subnav_more).blur(function(){
					  var e=window.document.activeElement;//获得当前活动的对象
				  	  if(e.id!="subnav_more_list_" + boxMenu.menuId){//当图片和现实图片的id都不是当前活动对象时
						 $(subnav_more_list).fadeOut();
					  }		
				 });
				 
				 $(subnav_more_list).blur(function(){
					  var e=window.document.activeElement;//获得当前活动的对象
				  	  if(e.id!="subnav_more_list_" + boxMenu.menuId){//当图片和现实图片的id都不是当前活动对象时
						 $(subnav_more_list).fadeOut();
					  }		
				 });
				 
				 
				 $(subnav_more).show();
				 var rightMore =  $(window).width() - (allSeceondTabsWidth - $(seceondTabs[i]).width() - 40) - 60 ;
				 if(isButton) {//如果前面有按钮就减去前面的按钮值
					 rightMore = rightMore - 90 - 30;
				 } 
				 $(subnav_more_list).css("right", rightMore - 2);//离右边的距离
			 }
			 $(seceondTabs[i]).clone(true).appendTo($(ul));//将显示不出来的菜单放到更多里面
			 $(seceondTabs[i]).remove();//删除显示不全的菜单
			 subnav_more_count++;
		 }  
	 }
	 
	 if(allSeceondTabsWidth < windowsWidth) {//如果菜单总和小于要显示的宽度，就删除更多菜单
		 $("#subnav_more_"+boxMenu.menuId).remove();
		 $("#subnav_more_list_"+boxMenu.menuId).remove();
	 }
	 
 }