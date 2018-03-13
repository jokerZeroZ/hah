
/**
 * 黄艺平 2013-10-10 added
 */
/**
 * 菜单:
 */
(function($) {
	$.tree = function() {
		this.treeID = "treeID";
		this.showAreaID = "showTreeID";
		this.showTreeHeader = true;
		this.treeHeaderText = "";
		this.className = "_tree";
		this.menuList = new Array();
		this.dynamicLoadUrl = '';
		this.secendMenuLocation = "";
	};
	$.extend($.tree, {});
})(jQuery);
/**
 * 
 * @param s外面的样式
 * @param c默认样式
 * @returns {String}
 */
function setStyle(s, c) {
	return s + c + styleID;
}
/**
 * 子节点树的入参
 */
(function($) {
	$.menu = function() {
		this.className = "_tree";
		this.menuList = new Array();
	};
	$.extend($.treeParam, {
		menuID : "menuID"/* 节点ID */
	}, 
	{
		className : ""/* 样式名字 */
	}, 
	{
		menuList : new Array()
	/* 加载的menuList */
	}, 
	{
		text : ""/* 显示名字 */
	}, 
	{
		url : ""/* 地址路径 */
	}, 
	{
		value : ""/* 值 */
	}, {
		name : ""/* 名字 */
	}, 
	{
		isClose : ""/* 名字 */
	});
})(jQuery);
/**
 * 新建树
 */
var newTree = function(p) {
	/*
	var object;
	if (p.isClearSelectMenuList) {
		pushPageCache(p.treeID, p);
	} else {
		var pp = findPageCacheName(p.treeID);
		if (null == pp) {
			pushPageCache(p.treeID, p);
		} else {
			p = pp;
		}
	}*/
	/* 入参类型 判断. */
	if (typeof p == 'object') {
		if ('' != p.dynamicLoadUrl) {/* 是否动态加载 */
			/* 动态加载 */
		} else {
			/* 直接加载 */
			addTree(p);
		}
	} else {
		alert("error:the input param is not tree", true, "_erroralert");
	}
}

var addTree = function(p) {
	var showArea = $("#" + p.showAreaID);/* 得到树要显示的位置 */
	showArea.html("");/* 清空HTML */

	var funcBar = createDiv("funcBar" , "funcBar");
	$(funcBar).html("<a href='#'></a>");
	$(showArea).append($(funcBar));
	
	var menuLockObj = createDiv('_menu_lock_div', "_menu_lock_div");
	$(menuLockObj).append("<iframe frameborder='0'  style='position:absolute; visibility:inherit; top:95px; left:0px; width:325px; height:363px; z-index:-1; filter=Alpha(style=0,opacity=0);'></iframe>");
	$(showArea).append($(menuLockObj));
	$(menuLockObj).hide();
	
	 $(funcBar).click(
			 function(event) {
				 if($("#funcBar_box_k").is(':hidden') == true) {
				     $(funcBar).focus();
					 $("#funcBar_box_k").show();
					 $(menuLockObj).show();
				 } else {
					 $(funcBar).focus();
					 $("#funcBar_box_k").hide();
					 $(menuLockObj).hide();
				 }
			 }
	 );
	
	
	
	var funcBar_box_k = createDiv("funcBar_box_k" , "funcBar_box_k");
	$(showArea).append($(funcBar_box_k));
	
	addMenuInDiv(1, p, p.menuList, funcBar_box_k);
	
}
/**
 * 添加菜单
 * 
 * @param p
 */
function addMenuInDiv(levelNo, p, menuList, rootdiv) {
	
	var funcBar_box_tan = createDiv("funcBar_box_tan", "");
	$(rootdiv).append($(funcBar_box_tan));
	var menu_type_ul = document.createElement("ul");
	$(menu_type_ul).addClass("");
	$(funcBar_box_tan).append($(menu_type_ul));
	
	
	var funcBar_box = createDiv("funcBar_box" , "funcBar_box");
	$(rootdiv).append($(funcBar_box));
	
	var menuType = "";
	var funcBar_box_list = "";
	var menu_v = "";
	var funcBar_box_tan_count = 0;
	$.each(menuList, function(key, m) {
		if(m.menuId != "fristpage") {
			if(menuType != m.menuType) {
				var menu_type_li = document.createElement("li");
				$(menu_type_li).attr("id", "menu_type_li_"+m.menuId);
				if(funcBar_box_tan_count == 0) {
					$(menu_type_li).attr("class", "funcBar_box_tan_link");
				}
				$(menu_type_li).append("<a href='#"+m.menuType+"'>"+m.menuTypeName+"</a>");
				$(menu_type_ul).append($(menu_type_li));
				
				$(menu_type_li).click(function() {
					$("#funcBar_box_tan li[class=funcBar_box_tan_link]").removeClass();
					 $(this).addClass("funcBar_box_tan_link");
				});
				
				if(funcBar_box_tan_count > 0) {
					var funcBar_box_list_link = createDiv("funcBar_box_list_link", "funcBar_box_list_link");
					$(funcBar_box).append($(funcBar_box_list_link));
				}
				
				funcBar_box_list = createDiv(m.menuType, "funcBar_box_list");
				$(funcBar_box_list).attr("name", m.menuType);
				$(funcBar_box).append($(funcBar_box_list));
				
				menu_v = document.createElement("ul");
				$(funcBar_box_list).append($(menu_v));
				$(menu_v).addClass("");
				$(menu_v).attr("id", "_menu_ul_");
				
				funcBar_box_tan_count++;
			}
			
			var li = document.createElement("li");
			$(menu_v).append($(li));
			$(li).append("<a href='#'><b class='"+m.className+"'></b><br />"+m.menuName+"</a>");
			$(li).attr("id", "_menu_li_"+m.menuId);
			
			menuType = m.menuType;
			
			$(li).click(function() {
				    var boxMenu = {}
				    boxMenu.isClose = true;
				    boxMenu.menuId = m.menuId;
				    boxMenu.menuName = m.text;
				    boxMenu.closeName = p.closeName;
				    boxMenu.isReload = true;
				    boxMenu.leftUrl = m.leftUrl;
				    boxMenu.secendmenu = m.secendmenu;
				    boxMenu.secendMenuLocation = p.secendMenuLocation;
				    boxMenu.description = m.description;
				    boxMenu.headimg = m.headimg;
				    boxMenu.defaultLoad = true;
				    boxMenu.defaultShowSecendMenu = 0; //默认选中第几个菜单
				    boxMenu.fromMenu = true;
				    var url = "";
				    for(i = 0; i < m.secendmenu.length; i++) {
				    	url = m.secendmenu[i].url;
				    	break;
				    }
					addBoxMenu(boxMenu, 'wrap', url, m.secendmenu);
			});
		}
		
	});
	$(funcBar_box_tan).addClass("funcBar_box_tan" + funcBar_box_tan_count);
}




