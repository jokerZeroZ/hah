
(function($) {
	stup= function(p) {
		//高度计算
		var root;
		var navigation;
		var topOperational;
		var bottomOperational;
		var document;
		this.resize=function(p){
			
		};
		
		this.init = function(p){
			
		    //布局开始
			root = document.createElement("table");
			$(root).attr("class","stup_root_table");
			var navigationTr = document.createElement("tr");
			$(root).append(navigationTr);
			navigation = document.createElement("td");
			$(navigationTr).append(navigation);
			$(navigation).attr("class","stup_navigation_td");
			if(p.showTopOperational){
				var topOperationalTr = document.createElement("tr");
				$(root).append(topOperationalTr);
				topOperational = document.createElement("td");
				$(topOperationalTr).append(topOperational);
				$(topOperational).attr("class","stup_oper_td");
			}
			
			var documentTr=document.createElement("tr");
			$(root).append(documentTr);
			document = document.createElement("td");
			$(documentTr).append(document);
			$(document).attr("class","stup_document_td");
			
			if(p.showBottomOperational){
				var bottomOperationalTr = document.createElement("tr");
				$(root).append(bottomOperationalTr);
				bottomOperational = document.createElement("td");
				$(bottomOperationalTr).append(bottomOperational);
				$(bottomOperational).attr("class","stup_oper_td");
			
			}
			
			
			$.each(p.stupList, function(key, val) {
				var stup = document.createElement("div");
				$(stup).addClass("stup_navigation_menu_div");
				$(navigation).append(navigation);
				$(stup).html(val.name);
				var doc = document.createElement("div");
				$(doc).attr("class","stup_document_div");
				var (document).append(doc);
				if(val.loadShow){
					$(doc).load(val.url,{});
				}
				var loadFlag =true;
				$(stup).click(function(){
				   $(".stup_document_div").hide();
				   if(val.isReload||loadFlag){
					   $(doc).load(val.url,{});
					   loadFlag = false;
				   }
				   $(doc).show();
				});
			});
			
		};
	};
	$.extend($.stup, {);
})(jQuery);