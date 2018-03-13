/**
 * 沈联成 2012-8-15 added
 */
/**
 * 树:
 */
(function($) {
	$.tree = function() {
		this.treeID = "treeID";
		this.showAreaID = "showTreeID";
		this.showAreaID = "showTreeID";
		this.showTreeHeader = true;
		this.treeHeaderText = "树";
		this.subDynamicLoadUrl = "";
		this.className = "_tree";
		this.menuList = new Array();
		this.DynamicLoadUrl = "";
		this.isSearch = true;
		this.mainTree = null;
		this.isClearSelectMenuList = true;
		this.selectMenuList = new Array();
		this.isBefore = true;
		this.dynamicLoadUrl = '';
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
	}, {
		className : ""/* 样式名字 */
	}, {
		menuList : new Array()
	/* 加载的menuList */
	}, {
		text : ""/* 显示名字 */
	}, {
		url : ""/* 地址路径 */
	}, {
		value : ""/* 值 */
	}, {
		name : ""/* 名字 */
	}, {
		isClose : ""/* 名字 */
	});
})(jQuery);
/**
 * 新建树
 */
var newTree = function(p) {
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
	}
	/* 入参类型 判断. */
	if (typeof p == 'object') {
		if ('' != p.dynamicLoadUrl) {/* 是否动态加载 */
			/* 动态加载 */
		} else {
			/* 直接加载 */
			addTree(p);
		}
	} else {
		alertDiv("error:the input param is not tree", true, "_erroralert");
	}
}

var addTree = function(p) {
	var show = $("#" + p.showAreaID);/* 得到树要显示的位置 */
	show.html("");/* 清空HTML */
	var showArea = document.createElement("div");
	$(showArea).addClass(setStyle(p.className, "_root"));
	$(showArea).attr("id", p.className + "_root");
	showArea = $(showArea);
	show.append(showArea);
	if (p.showTreeHeader) {/* 是否显示头 */
		var header = document.createElement("div");
		$(header).html(p.treeHeaderText);
		$(header).addClass(setStyle(p.className, "_header"));
		$(header).attr("id", p.className + "_header");
		showArea.append($(header));
	}
	if (p.isSearch) {/* 添加查询 */
		var search = document.createElement("div");
		var searchInput = document.createElement("input");
		$(searchInput).addClass(setStyle(p.className, "_search_input"))
		$(searchInput).attr("id", p.className + "_search_input");
		$(searchInput).attr("type", "text");
		$(search).append($(searchInput));
		$(search).addClass(setStyle(p.className, "_search"));
		$(search).attr("id", p.className + "_search");
		showArea.append($(search));

		$(searchInput).change(function() {
			searchTree(p.menuList, $(searchInput).val());
		});
	}
	var rootMenu = document.createElement("div");
	showArea.append($(rootMenu));
	$(rootMenu).addClass(setStyle(p.className, "_menu_root"));
	addMenuInDiv(1, p, p.menuList, $(rootMenu));
	//$("._menu_next_show_hide").hide();
	// $("._menu_next_show_hide").eq(0).show();
}
/**
 * 添加菜单
 * 
 * @param p
 */
function addMenuInDiv(levelNo, p, menuList, rootdiv) {
	$.each(menuList, function(key, m) {
		var menu_v = document.createElement("div");
		$(rootdiv).append($(menu_v));
		$(menu_v).addClass(setStyle(p.className, "_menu" + "_" + levelNo));
		$(menu_v).attr("id", m.menuID);
		if ("" != m.value && "" != m.name && p.isShowRadio) {// 单选
			var radio = document.createElement("input");
			$(radio).attr("type", "Radio");
			$(radio).addClass(setStyle(p.className, "_radio"));
			$(radio).attr("name", m.name);
			$(radio).val(m.value);
			if (p.isBefore) {
				$(menu_v).append($(radio));
				$(menu_v).append("<a>" + m.text + "</a>");
			} else {
				$(menu_v).append("<a>" + m.text + "</a>");
				$(menu_v).append($(radio));
			}
			$(radio).click(
					function() {
						if ($(radio).attr("checked")) {// 已经选中
							$("." + setStyle(p.className, "_radio")).attr(
									"checked", false);
							$(radio).attr("checked", true);
							// p.selectMenuList.push($(radio).val());
						} else {
							$(radio).attr("checked", false);
							$.each(p.selectMenuList, function(k, v) {

								if (v == $(radio).val()) {
									// p.selectMenuList.remove(k);
								}

							});

						}

					});

		} else if ("" != m.value && p.isShowCheckbox) {// 多选
			var levelFleg = true;
			if (null != p.showCheckboxlevelNo) {
				$.each(p.showCheckboxlevelNo, function(index, l) {
					if (l == levelNo) {
						levelFleg = false;
					}
				});
			}
			if ((levelFleg && null == p.showCheckboxlevelNo)
					|| (!levelFleg && null != p.showCheckboxlevelNo)) {
				var box = document.createElement("input");
				$(box).attr("type", "checkbox");
				if (p.isBefore) {
					$(menu_v).append($(box));
					$(menu_v).append("<a>" + m.text + "</a>");
				} else {
					$(menu_v).append("<a>" + m.text + "</a>");
					$(menu_v).append($(box));
				}
				$(box).addClass(setStyle(p.className, "_checkbox"));
				$(box).attr("name", m.name);
				$(box).val(m.value);
				$(box).attr("id", "_tree_checkbox_" + m.menuID);
				$(box).val(m.value);
				$(box).click(
						function() {
							if ($(box).attr("checked")) {// 已经选中
								$(box).attr("checked", true)
								var selectBox = function(mm) {
									if (null != mm) {
										$.each(mm, function(key, val) {
											$("#_tree_checkbox_" + val.menuID)
													.attr("checked", true);
											selectBox(val.menuList);
										});
									}
								}
								selectBox(m.menuList);
								// p.selectMenuList.push($(box).val());
							} else {
								$(box).attr("checked", false);
								var removeBox = function(mm) {
									if (null != mm) {
										$.each(mm, function(key, val) {
											$("#_tree_checkbox_" + val.menuID)
													.attr("checked", false)
											removeBox(val.menuList);
										});
									}
								}
								removeBox(m.menuList);
							}
						});
			} else {
				$(menu_v).append("<a>" + m.text + "</a>");
			}
		} else {
			$(menu_v).append("<a class='_tree_menu_a_"+levelNo+"'>" + m.text+ "</a>");
		}
		$(menu_v).append(
				"<input type=hidden value=" + m.value + " name=" + m.name
						+ "/>");

		/* 事件加载 */
		/* 动态加载子菜单 */
		if (null != p.subDynamicLoadUrl) {

		}
		/* 如果是主菜单 */
		$(menu_v).click(function() {
			if (null != p.mainTree && m.url) {
				var b = new $.boxMenu();
				b.isClose = true;
				b.menuId = m.menuID;
				b.menuName = m.text;
				b.closeName = p.closeName;
				b.isReload = true;
				b.subSysName = m.subSysName;//子系统标识
				b.leftUrl = "ccapp/oa/common/main/left_.jsp?subSysFristMenu=" + m.subSysFristMenu;
				addBoxMenu(b, p.mainTree[0], m.url)
			}
			if (null != m.menuList && m.menuList.length > 0) {
				showAndHideDIV($(menu_v));
			}
		});

		/* 如果下面有子菜单则有隐藏功能 */
		if (null != m.menuList && m.menuList.length > 0) {
			var menu_next = document.createElement("div");
			$(menu_next).attr("id", m.menuID + "_show_hide");
			$(menu_next).addClass("_menu_next_show_hide"+levelNo);
			$(menu_next).hide();
			$(rootdiv).append($(menu_next));
			addMenuInDiv(levelNo + 1, p, m.menuList, $(menu_next));
		}
	});
}
/**
 * 树型菜单显示与关闭的功能
 */
var showAndHideDIV = function(o) {
	var $menuChild = $(o).next();

	if ($menuChild.is('div') && $menuChild.is(':visible')) {
		$menuChild.hide();
		return false;
	}
	if ($menuChild.is('div') && (!$menuChild.is(':visible'))) {
		$("."+$menuChild.attr("class")).hide();
		$menuChild.show();
		return false;
	}
}

/**
 * 查询方法 返回boolean
 */
function searchTree(menuList, v) {
	// 开始查询
	var returnVal = false;
	var val = false;
	$("._menu_next_show_hide").show();
	$.each(menuList, function(key, m) {
		$("#" + m.menuID).hide()
		if (m.text.indexOf(v) >= 0) {
			val = true;
		}
		if (null != m.menuList && m.menuList.length > 0) {
			val = (searchTree(m.menuList, v)) || val ? true : false;
		}
		if (val) {
			$("#" + m.menuID).show();
			returnVal = val;
		}
		val = false;

	});

	return returnVal;
}


