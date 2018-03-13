/**
 * 沈联成 2012-8-15 added
 */
(function($) {
	$.tab = function(p) {
		this.init = function() {
			if (!p) {
				alert("Error:the input params is null!");
				return;
			}
			var root = createDiv("_tab_root" + p.showID, "_tab_root");
			$("#" + p.showID).append($(root));
			var width = $("#" + p.showID).width();
			/* header */
			if (p.header) {
				var header = createDiv("_tab_header" + p.showID, "_tab_header");
				$(root).append($(header));
				$(header).append("<a>"+p.header+"</a>");
			}
			/* 新建TAB box */
			var box = createDiv("_tab_box" + p.showID, "_tab_box");
			$(root).append($(box));
			/* 新建文档内容窗口 */
			var body = createDiv("_tab_body" + p.showID, "_tab_body");
			$(root).append($(body));
			/* box加入TABS 与IFROM */
			$.each(p.tabs, function(key, val) {
				var menu = createDiv("_tab_menu" + p.showID + key,
						"_tab_menu_out");

				$(menu).html(val.tabName);
				$(menu).attr("title", val.title ? val.title : val.tabName);
				$(box).append($(menu));

				var doc = createDiv("_tab_menu_document" + p.showID + key,
						"_tab_menu_document");

				var iframe = document.createElement("iframe");
				$(iframe).addClass("_tab_menu_document_body");
				$(iframe).attr('id',
						"_tab_menu_document_body_" + p.showID + key);
				$(iframe).width(width);
				$(iframe).height(p.height ? p.height : 500);
				$(iframe).attr("marginheight", "0");
				$(iframe).attr("marginwidth", "0");
				$(iframe).attr("broder", "0");
				$(iframe).attr("frameborder", "0");
				$(doc).append($(iframe));
				$(body).append($(doc));

				if (val.show) {
					$(menu).removeClass();
					$(menu).addClass("_tab_menu_over");
					$(iframe).attr("src", val.url);
				} else
					$(doc).hide();

				$(menu).click(function() {
					if (!val.show)
						$(iframe).attr("src", val.url);
					var menus = $("._tab_menu_over");
					menus.removeClass();
					menus.addClass("_tab_menu_out");
					$(menu).addClass("_tab_menu_over");
					$("._tab_menu_document").hide();
					$(doc).show();
				});
			});

		}
	};
	$.extend($.tab, {});
})(jQuery);