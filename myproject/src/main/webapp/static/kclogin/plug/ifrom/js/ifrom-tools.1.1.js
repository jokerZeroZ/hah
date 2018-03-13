/**
 * 沈联成 2012-8-15 added
 */
(function($) {
	$.file = function(buttonShowId, showId, filefilter, isHledClsoe,
			urlOnmouseover, urlOnmouseout) {
		this.init = function() {
			var showButton = document.createElement("input");
			$(showButton).attr("type", "button");
			$(showButton).addClass('but_six');
			$(showButton).val('添加附件');
			$('#' + buttonShowId).append($(showButton));
			$('#' + buttonShowId)
					.append(
							'<span class="content_02_box_div_table_span">每个附件不得超过20M</span>');

			var iframeDiv = document.createElement("div");
			var iframe = document.createElement("iframe");
			$(iframe).attr("id", "_uploadeFile" + showId)
			$(iframe).attr("src", "dd.html");
			$('#' + buttonShowId).append($(iframeDiv));
			
			
			$(".but_six").mouseover(function(){
				  $(this).removeClass();
				  $(this).addClass("but_six_02");
				  
		    });
			  
			$(".but_six").mouseout(function(){
				  $(this).removeClass();
				  $(this).addClass("but_six");
				  
		    });
			  
			$(iframe).width(1);
			$(iframe).height(1);
			$(iframeDiv).append($(iframe));
			$(iframeDiv).hide();
			$(showButton)
					.click(
							function() {
								var action = $("#_uploadeFile" + showId)
										.contents().find("#_uplodeFilesID_");
								if ('undefined' == action.attr("id")
										|| null == action.attr("id")) {
									$("#_uploadeFile" + showId).contents()
											.find("body").html("");
									action = document.createElement("form");
									$(action).attr("id", "_uplodeFilesID_");
									$(action).attr("method", "post");
									$(action).attr("enctype",
											"multipart/form-data");
									$("#_uploadeFile" + showId).contents()
											.find("body").append($(action));
								}
								var fileInput = $("#_uploadeFile" + showId)
										.contents().find("#noValue");
								if ('undefined' == fileInput.attr("id")
										|| null == fileInput.attr("id")) {
									fileInput = document.createElement("input");
									$(fileInput).attr("type", "file");
									$(fileInput).attr("style",
											"width:0px;height:0px;");
									$(fileInput).attr("name", "multiplefile");
									$(fileInput).attr("id", "noValue");
									$(action).append($(fileInput));
								}
								$(fileInput)
										.change(
												function() {
													if (this.value == '') {
														return;
													}
													var flag = true;
													var filterStr = ""
													if ($
															.isArray($(filefilter))) {
														for ( var i = 0; i < filefilter.length; i++)
															filterStr += '.'
																	+ filefilter[i]
																	+ " ";
														if (this.value
																.indexOf('.'
																		+ filefilter[i]) > -1) {
															flag = false;
														}
													}
													if ($
															.isArray($(filefilter))
															&& flag) {
														alert('上传的文 件类型只能包括:<br/>'
																+ filterStr
																+ "<br/>请重新选取！");
														return;
													}
													$(this).attr("id",
															"multiplefile");
													var root = document
															.createElement("div");
													$("#" + showId).append(
															$(root));
													$(root)
															.addClass(
																	"content_02_box_div_table_02_list");
													var span = document
															.createElement("span");
													var arr = this.value
															.split('\\');// 注split可以用字符或字符串分割
													var fileName = arr[arr.length - 1];// 这就是要取得的图片名称

													// alert(this.name)
													$(span).html('<a>'+fileName+'</a>');
													$(span)
															.css("float",
																	"left");
													$(root).append($(span));
													var closediv = document
															.createElement("div");
													$(closediv)
															.addClass(
																	"content_02_box_div_table_02_close_tab");
													$(root).append($(closediv));
													if (!isHledClsoe) {
														var closeinput = document
																.createElement("input");
														$(closeinput).attr(
																"type",
																"button");
														$(closeinput)
																.addClass(
																		"close_tab_input");
														urlOnmouseover = urlOnmouseover ? urlOnmouseover
																: 'close_tab_input_onmouse';
														urlOnmouseout = urlOnmouseout ? urlOnmouseout
																: 'close_tab_input';
														jQuery(closeinput).attr("onmouseover",
																"this.className='" + urlOnmouseover + "'");
														jQuery(closeinput).attr("onmouseout",
																"this.className='" + urlOnmouseout + "'");
														$(closediv).append(
																$(closeinput));
														$(closeinput)
																.click(
																		function() {
																			$(
																					root)
																					.remove();
																			$(
																					fileInput)
																					.remove();
																		});
													}
												});
								$(fileInput).click();
							});
		}
	};
	$.extend($.file, {});
})(jQuery);

(function($) {
	$.onloadFiles = function(showId) {
		var iframeDiv = document.createElement("div");
		var iframe = document.createElement("iframe");
		$(iframe).attr("id", "hiddenFrame" + showId)
		$(iframe).attr("src", "dd.html");
		$(iframe).attr("src", "src.html");
		$('#' + showId).append($(iframeDiv));
		$(iframe).width(0);
		$(iframe).height(0);
		$(iframeDiv).append($(iframe));
		$(iframeDiv).hide();
		this.addFile = function(fileName, url, downloadUrl,urlOnmouseover, urlOnmouseout) {
			$(this).attr("id", "multiplefile");
			var root = document.createElement("div");
			$("#" + showId).append($(root));
			$(root).addClass("content_02_box_div_table_02_list");
			var span = document.createElement("span");
			$(span).html('<a>'+fileName+'</a>');
			$(span).css("float", "left");
			$(root).append($(span));
			if(downloadUrl){
				$(span).click(function(){
					location.href = downloadUrl;
				});
			}
			
			if (url) {
				var closediv = document.createElement("div");
				$(closediv).addClass("content_02_box_div_table_02_close_tab");
				$(root).append($(closediv));
				var closeinput = document.createElement("input");
				$(closeinput).attr("type", "button");
				$(closeinput).addClass("close_tab_input");
				urlOnmouseover = urlOnmouseover ? urlOnmouseover
						: 'close_tab_input_onmouse';
				urlOnmouseout = urlOnmouseout ? urlOnmouseout
						: 'close_tab_input';
				jQuery(closeinput).attr("onmouseover",
						"this.className='" + urlOnmouseover + "'");
				jQuery(closeinput).attr("onmouseout",
						"this.className='" + urlOnmouseout + "'");
				$(closediv).append($(closeinput));
				$(closeinput).click(function() {
					var okF = function() {
						
						$("#hiddenFrame" + showId).contents().find("body").html("");
						var action = document.createElement("form");
						$(action).attr("id", "delfrom");
						$(action).attr("method", "post");
						$(action).attr("action",url);
						$("#hiddenFrame" + showId).contents().find("body").append($(action));
						$(root).remove();
						$(action).submit();
					}
					var p = {
						headerText : '确认框',
						okName : '确认',
						okFunction : okF,
						cancelName : '取消'
					};
					alert("确定要删除文件吗？", p);
				});

			}
		}
	};
	$.extend($.onloadFiles, {});
})(jQuery);

uplodFiles = function(showId, url,Function) {
	var action = jQuery("#_uploadeFile" + showId).contents()
			.find("#_uplodeFilesID_");
	if ('undefined' == action.attr("id") || null == action.attr("id")) {
		return false;
	}
	jQuery(action).attr("action", url);
	jQuery(action).submit();
	
	var interval = 0;
	var sub_fun = function(){
	try{
			var ii = jQuery(action).attr("action");
		}catch(error){
			clearInterval(interval);
			Function();
		}
	}
	
	if(Function){
		interval = setInterval(sub_fun, 500);
	}
	return true;
}

/**
 * obj:对像 showId：显示区域的ID hledId：ID隐藏域的ID hledName：Name隐藏域的ID
 * isHledClsoe:true隐藏关闭按钮
 */
var createrDeptAndPosn = function(obj, showId, hledId, hledName, isHledClsoe,
		urlOnmouseover, urlOnmouseout,isshowDept) {
	if (null != obj && null != obj.id && "" != obj.id) {
		var ids = obj.id;
		var names = obj.name;
		var idArray = ids.split(",");
		var nameArray = names.split(",");
		var deptArray = false;
		var OrgNames = null;
		if(isshowDept && null != obj.returnparentNode){
			deptArray = obj.returnparentNode.split(",");
			OrgNames = obj.returnOrgNames.split(",");
		}
		
		jQuery("#" + showId).html("");
		
		var createrDiv = function(index, idArray, nameArray, hledId, showId,
				hledName, isHledClsoe, urlOnmouseover, urlOnmouseout) {
			var root = document.createElement("div");
			jQuery("#" + showId).append(jQuery(root));
			jQuery(root).addClass("content_02_box_div_table_02_list");
			var span = document.createElement("span");
			jQuery(span).text(nameArray[index]);
			jQuery(span).css("float", "left");
			jQuery(root).append(jQuery(span));
			
			if (!isHledClsoe) {
				var closediv = document.createElement("div");
				jQuery(closediv).addClass("content_02_box_div_table_02_close_tab");
				jQuery(root).append(jQuery(closediv));
				var closeinput = document.createElement("input");
				jQuery(closeinput).attr("type", "button");
				jQuery(closeinput).addClass("close_tab_input");
				urlOnmouseover = urlOnmouseover ? urlOnmouseover
						: 'close_tab_input_onmouse';
				urlOnmouseout = urlOnmouseout ? urlOnmouseout
						: 'close_tab_input';
				jQuery(closeinput).attr("onmouseover",
						"this.className='" + urlOnmouseover + "'");
				jQuery(closeinput).attr("onmouseout",
						"this.className='" + urlOnmouseout + "'");
				jQuery(closediv).append(jQuery(closeinput));
				jQuery(closeinput).click(function() {
					jQuery(root).remove();
					if (index == 0) {
						ids = ids.replace(idArray[index] + ",", '');
						names = names.replace(nameArray[index] + ",", '');
					} else {
						ids = ids.replace(',' + idArray[index], '');
						names = names.replace(',' + nameArray[index], '');
					}
					ids = ids.replace(idArray[index], '');
					names = names.replace(nameArray[index], '');
					jQuery("#" + hledId).val(ids);
					jQuery("#" + hledName).val(names)
				});
			}
			jQuery("#" + hledId).val(ids);
			jQuery("#" + hledName).val(names)
		}
		
		var createrTextArea=function(idArray,nameArray,deptArray,OrgNames){
			if(isshowDept && deptArray ){
				var textArea = "";
				var tarray = new Array();
				var isNewArray = true;
				var subArrayPerson = null;
				var subOrg = null;
				for ( var i = 0; i < idArray.length; i++) {
				    for(var j=0;j<tarray.length;j++){
				    	if(tarray[j][0]==deptArray[i]){
				    		isNewArray = false;
				    		subArrayPerson = tarray[j][1];
				    		subOrg = tarray[j][2];
				    	}
				    }
				    if(isNewArray){
				    	var  subArray = new Array();
				    	subArrayPerson = new Array();
				    	subArray.push(deptArray[i]);
				    	subArray.push(subArrayPerson);
				    	subOrg = new Array();
				    	tarray.push(subArray);
				    	subArray.push(subOrg);
				    }
				    subArrayPerson.push(nameArray[i]);
				    subOrg.push(OrgNames[i]);
				    isNewArray= true;
				}
				
				for(var i=0;i<tarray.length;i++){
					var temp = tarray[i];
					textArea+="<b>"+temp[0]+"</b>：";
					for(var j =0;j<temp[1].length;j++){
						if(j==0){
							textArea+='<span title='+temp[0]+"-"+temp[2][j]+'>'+temp[1][j]+'</span>';
						}else{
							textArea+=',<span title='+temp[0]+"-"+temp[2][j]+'>'+temp[1][j]+'</span>';
						}
						
					}
					textArea+="; ";
				}
				jQuery("#" + hledId).val(ids);
				jQuery("#" + hledName).val(textArea);
				jQuery("#" + showId).html(textArea);
				
			}
			else{
				jQuery("#" + hledId).val(ids);
				jQuery("#" + hledName).val(names);
				jQuery("#" + showId).html(names);
			}
			jQuery("#" + showId).focus(function(){
				jQuery("#" + showId).blur();
			});
			
		}
		if(isshowDept){
			createrTextArea(idArray,nameArray,deptArray,OrgNames)
		} else {
			for ( var i = 0; i < idArray.length; i++) {
				createrDiv(i, idArray, nameArray, hledId, showId, hledName,
						isHledClsoe, urlOnmouseover, urlOnmouseout);
			}
			jQuery("#" + showId).append("&nbsp;");
		}
	}
}

 /**
  * 字符去重
  * str1 字符串1
  * str2 字符串2
  */
var deemphasisStr = function(str1, str2) {
	var str2Array = str2.split(",");
	if(str1 == '') {
		str1 = str2;
	} else {
		var middleStr = ","+ str1 +",";
		if(str2 != '') {
			for(var i = 0; i < str2Array.length; i++) {
				if(middleStr.indexOf(","+str2Array[i]+",") == -1) {
					str1 += ',' + str2Array[i];
				}
			}
		}
	}
	return str1;
}

/**
 * 
 * @param topID
 *            标题头
 * @param docID
 *            文本
 */
adaptationWH = function(topID, docID, otherHight,type) {
	var hight =type?otherHight:window.top.findPageCacheName("_documentBodyHeight");
	
	if (otherHight&&!type){
		hight = hight - otherHight;
	}
	jQuery("body").height(hight);
	var topH = jQuery("#" + topID).height();
	jQuery("#" + docID).height(hight - topH);
	jQuery("#" + docID).css("overflow", "auto");
	jQuery("#" + docID).addClass("vcenter");
	jQuery(window).resize(function() {
		adaptationWH(topID, docID, otherHight,type);
	});
	return jQuery("#" + docID).height();
}

function getIFrameDOM(id) {
	try{
		return document.getElementById(id).contentDocument || document.frames[id].document; 
	}catch(error){}
	
}

function getIFrameWindow(id) {
	   return document.getElementById(id).contentWindow || document.frames[id].window; 
}

/**
 * 设置时间控制件的单击事件
 * 显示与隐藏，
 * @param dateId input ID
 */
function setDataTimeClickShowOrHide(dateId,win) {
	//时间控件事件的问题 开始
	win = win?win:window;
	var dataSelectFlag = true;
	win.jQuery("#"+dateId).click(function(){
		if(dataSelectFlag){
			win.$dp.dd.style.display = "block";
			dataSelectFlag = false;
		}else{
			win.$dp.dd.style.display = "none";
			dataSelectFlag = true;
		}
	 });
	win.jQuery("#"+dateId).hover(function(){
		 dataSelectFlag = true;
	 });
}

function reloadThread(){
	try{
		window.opetDate = new Date();
		jQuery("#mian").mouseover(function(){
			window.opetDate = new Date();
		});
		if(!window.intervalCount){
			window.intervalCount=30000;
		}
		window.interObject =  setInterval("reloadBusiness()",window.intervalCount);
	}catch(error){}
}
function reloadBusiness() {
	var count= (new Date())-window.opetDate;
	count = Math.floor((count%3600000)/60000);
	if(count >30){
		window.location.href = "../../../../login.jsp";
		return false;
	}
	var span = {
		url : window.top.getContextPath() + '/pubtree',
		success : function(ss) {
			try{
				jQuery("#workCount").html(json.returnValue.waitingTotal);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#waitingTotal").html(json.returnValue.waitingTotal);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#waiting4approvalTotal").html(json.returnValue.waiting4approvalTotal);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#waiting4readTotal").html(json.returnValue.waiting4readTotal);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#mettingTotal").html(json.returnValue.mettingTotal);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#individualwork").html(json.returnValue.individualwork);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#topLogins").html(json.returnValue.topLogins);
				getIFrameWindow("_document_body_mian_firstPagerAAAS").jQuery("#logins").html(json.returnValue.logins);
			}catch(error){}
		},
		data : '{"type":"aaa"}',
		classID : 'config',
		method : 'threadInquerySysReload'
	}
	ajaxTools(span,true);
}
function addCss(){
	var style = "";
	try{style = window.top.getSystemStyle();}catch(error){try{style = getSystemStyle();}catch(e){}}
	if(style == "/" || style=="") {
		style = "red"
	}
	style = "blue";
	var p = ["/ccapp/oa/resources/plug/jquery-ui-1.8.17.custom/"+style+"/css/custom-theme/jquery-ui-1.8.17.custom.css",
	            "/ccapp/oa/resources/plug/jquery.jqGrid-4.3.1/"+style+"/css/ui.jqgrid.css",
	            "/ccapp/oa/resources/plug/formvalidation/css/validationEngine.jquery.css",
	            "/ccapp/oa/resources/plug/JQuery zTree v3.0/"+style+"/css/zTreeStyle/zTreeStyle.css",
	            "/ccapp/oa/resources/plug/ifrom/"+style+"/css/ifrom-ui-core.css",
	            "/ccapp/oa/resources/style/"+style+"/css/layer.css",
	        	"/ccapp/oa/resources/style/"+style+"/css/style.css",
	        	"/ccapp/oa/resources/style/"+style+"/css/tree.css"
	        	];
	
	try {window.top.loadCss(p, window);} catch (error) {try {loadCss(p, window);} catch (e) {}}
	style = null;
	p=null;
	
}
try{
	if(!indexFlager)addCss();
}catch(error){addCss();}

jQuery(function(){
	  jQuery(".but_y_01").mouseover(function(){
		  jQuery(this).removeClass();
		  jQuery(this).addClass("but_y_02");
		  
  });
	  
	  jQuery(".but_y_01").mouseout(function(){
		  jQuery(this).removeClass();
		  jQuery(this).addClass("but_y_01");
		  
  });
});

function changeskin(value){
	if(-111 == value) return;
	var style = window.top.getSystemStyle();
	if(style == value) return;
    $.cookie("myStyel",value,{expires:8});
    window.top.location.reload();
}

function showChangeskin(obj,bot){
	if ( $(obj).is(':visible')) {
		$(obj).hide();
		$(bot).hide();
		return false;
	}else{
		$(obj).show();
		$(bot).show();
		return false;
	}
}




/**
 * 当按下backspace键时，禁止部分响应
 */
 if(jQuery){
 jQuery(function(){
 	try{
 		jQuery(document).keydown(function(){
 			// 如果按下的是backspace键
 		    if(event.keyCode == 8) {
 			       //只有input框，texteare类型的元素可以返回
 			      if(event.srcElement.tagName.toLowerCase() != "input"  
 			        	&& event.srcElement.tagName.toLowerCase() != "textarea"){
 			        	event.returnValue = false;
 			      }
 			    // 如果input框是readOnly或者disable不执行任何操作
 			    if(event.srcElement.readOnly == true 
 			    		|| event.srcElement.disabled == true){ 
 			            event.returnValue = false;           
 			    }
 		    }
 		});
 	}catch(e){
 	  /**忽略异常**/	
 	}
 });
 }
 
 /**
  * 当按下backspace键时，禁止部分响应
  * 戴连春 2013-09-04 add
  */
 (function(jQuery){
	
	if(jQuery){
	  jQuery(function(){
	  	try{
	  		jQuery(document).keydown(function(){
	  			// 如果按下的是backspace键
	  		    if(event.keyCode == 8) {
	  			       //只有input框，texteare类型的元素可以返回
	  			      if(event.srcElement.tagName.toLowerCase() != "input"  
	  			        	&& event.srcElement.tagName.toLowerCase() != "textarea"){
	  			        	event.returnValue = false;
	  			      }
	  			    // 如果input框是readOnly或者disable不执行任何操作
	  			    if(event.srcElement.readOnly == true 
	  			    		|| event.srcElement.disabled == true){ 
	  			            event.returnValue = false;           
	  			    }
	  		    }
	  		});
	  	}catch(e){
	  	  /**忽略异常**/	
	  	}
	  });
	  }
	 
 })(jQuery);