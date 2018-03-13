function setSelect(id,inputClass) {
		if (!$(id) || !$(id).attr("multiple"))return;
		var optionList = $(id).find("option");
		if (optionList.length == 0) return;
		var root = $(id).parent();
		var seldiv = document.createElement("div");
		
		var select = document.createElement("input");
		$(select).addClass('selectbox');
		$(select).attr("id", $(id).attr("id"));
		$(select).attr("name", $(id).attr("name"));
		$(select).attr("class", $(id).attr("class"));
		$(select).attr("style", $(id).attr("style"));
		$(select).width($(id).width());
		$(seldiv).append($(select));
		var opts = document.createElement("div");
		$(opts).addClass('optionbox');
		$(opts).css("overflow-y","scroll");
		$(opts).css("height","100px");
		$(opts).css("background","#fff");
		$(opts).width($(select).width());
		$(seldiv).append($(opts));
		$(opts).hide();
		$(select).click(function() {
			if ($(opts).is(':visible')) {
				$(opts).hide();
			} else {
				$(opts).show();
			}
		});
		$(seldiv).hover(function(){
			$(opts).hide();
		});
		var def = null;
		$.each(optionList, function(key, val) {
			var opt = document.createElement("div");
			/*  if($(val).attr("def")){
				 def = $(val);
				 $(select).val($(val).html());
			 } */
			if ($(val).attr("type")) {
				var input = document.createElement("input");
				$(input).attr ("type", $(val).attr('type'));
				$(input).addClass(inputClass);
				$(input).val($(val).val());
				$(input).attr("text", $(val).html());
				$(input).attr("name", inputClass);
				$(opt).append($(input));
				if ($(val).attr("all")) {
					$(input).click(function() {

						$("."+inputClass).attr("checked", $(this).is(":checked"));
						$(select).val($("input[name='"+inputClass+"']").val());
						var list = $("input[name='"+inputClass+"']:checked");
						var result = "";
						$.each(list, function(key, val) {
							if ("" != result) {
								result += ",";
							}
							if(key > 0) {
                              result += $(val).attr("text");
							}
						});
						$(select).val(result.replaceAll("&nbsp;",""));
					});
				} else {
					$(input).attr("name", inputClass);
					$(input).click( function() {
								$(select).val($("input[name='"+inputClass+"']").val());
								var list = $("input[name='"+inputClass+"']:checked");
								var result = "";
								$.each(list, function(key, val) {
									result += key == 0 ? $(val).attr('text'): "," + $(val).attr("text");
								});
								if ("" == result) {
									//$(select).val(def.html());
								} else {
									$(select).val(result.replaceAll("&nbsp;",""));
								}

							});
				}
			}
			$(opt).append($(val).html());
			$(opts).append($(opt));
		});
		$(root).append($(seldiv));
		$(id).remove();
	}



