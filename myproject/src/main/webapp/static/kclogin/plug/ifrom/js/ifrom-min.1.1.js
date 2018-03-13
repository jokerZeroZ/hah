/**
 * 沈联成 2012-8-15 added
 */
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

(function($) {
	$._pageCache = function() {
	};
	$.extend($._pageCache, {
		cacheID : null
	/* 树ID */}, {
		cacheValue : null
	/* 树ID */});
})(jQuery);

var pageCache = new Array();/* 页面控件缓存 */

var styleID = "";// 样式切换
/**
 * 此处加配置
 */
var setStyle = function(styleName) {
	styleID = styleName;
}
var getStyle = function(styleName) {
	return styleName + styleID;
}
function addStyle(o, c) {
	jQuery(o).addClass(c + styleID);
}

function findPageCacheName(name) {
	var object = null;
	jQuery.each(pageCache, function(key, val) {
		if (val.cacheID == name) {
			object = val.cacheValue;
		}
	});
	return object;
}
function findPageCacheNameToIndex(name) {
	var object = null;
	var _key = -1;
	jQuery.each(pageCache, function(key, val) {
		if (val.cacheID == name) {
			_key = key;
		}
	});
	return _key;
}
function removePageCache(name) {

	var key = findPageCacheNameToIndex(name);
	if (-1 != key) {
		pageCache.remove(key);
	}
}
function pushPageCache(name, value) {
	removePageCache(name);
	var c = new jQuery._pageCache();
	c.cacheID = name;
	c.cacheValue = value;
	pageCache.push(c);
}

var createDiv = function(id, className) {
	var div = window.top.document.createElement("div");
	jQuery(div).attr("id", id);
	addStyle(div, className);
	return div;
}

var createUl = function(id, className) {
	var ul = window.top.document.createElement("ul");
	jQuery(ul).attr("id", id);
	addStyle(ul, className);
	return ul;
}

var createLi = function(id, className) {
	var li = window.top.document.createElement("li");
	jQuery(li).attr("id", id);
	addStyle(li, className);
	return li;
}

function sleep(n) {
	var start = new Date().getTime();
	while (true)
		if (new Date().getTime() - start > n)
			break;
}

(function($) {

	$.lockDiv = function(index) {
		var lockdivObj;
		this.init = function(parentObj) {
			lockdivObj = createDiv('', "_lock_div");
			
			if(index){
				$(lockdivObj).css("z-index",index);
			}
			$(window.top.document.body).append($(lockdivObj));
			$(lockdivObj).focus();
			//$(lockdivObj).append('<iframe id="DivFrm" src="" scrolling="no" frameborder="0" style="position: absolute;top: 0px; left: 0px; display: none;"></iframe>');
			 $(lockdivObj).append('<iframe frameborder="0" id="_DivFrm" style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%; z-index:-1; filter=Alpha(style=0,opacity=0);"></iframe>');
		};
		this.remove = function() {
			try{
				window.top.$("#_DivFrm").remove();
			}catch(error){
				$("#_DivFrm").remove();
		    }
			$(lockdivObj).remove();			
		};
	};
	$.extend($.lockDiv, {});
})(jQuery);

(function($) {
	$.alertDiv = function(msg,isAddTopObjectFlag) {
		var alertObject;
		var lock;
		this.init = function() {
			alertObject = createDiv("", "_alert_div_root");					    
			var divIndex = 1999999998;			
			 /**
			 * 计算出最大的index值，解决遮罩层遮罩不到前面弹出的窗口的问题
			 * @alter by 戴连春 2013-09-11
			 */			
		    $("._alert_div_root",window.top.document.body).each(function(){
		    	var zindex = parseInt($(this).css("z-index"))||1999999998;//后面为css中定义的值
		    	if(divIndex<zindex){
		    		divIndex = zindex;
		    	}
		    });		
		    $("._alert_div_root").each(function(){
		    	var zindex = parseInt($(this).css("z-index"))||1999999998;//后面为css中定义的值
		    	if(divIndex<zindex){
		    		divIndex = zindex;
		    	}
		    });
		    
		    $(alertObject).css("z-index",divIndex+2);		    
			
			if(isAddTopObjectFlag){
			    $(window.top.document.body).append($(alertObject));
			}else{
			    $(alertObject).css("z-index",divIndex+2);
				$(document.body).append($(alertObject));				
			}			
						
			lock = new $.lockDiv(divIndex+1);
			lock.init();
			var title = createDiv("_alert_div_title", "_alert_div_title");
			$(alertObject).append($(title));
			var titleText = createDiv("_alert_div_title_text",
					"_alert_div_title_text");
			var titleImg = createDiv("_alert_div_title_img",
					"_alert_div_title_img");
			var close = createDiv("_alert_div_title_close",
					"_alert_div_title_close");
			$(title).append($(close));
			$(title).append($(titleImg));
			$(title).append($(titleText));
			$(titleText).html("提示");
			var text = createDiv("_alert_div_text", "_alert_div_text");
			$(alertObject).append($(text));
			var foot = createDiv("_alert_div_edit", "_alert_div_edit");
			$(alertObject).append($(foot));
			var butOk = document.createElement("input");
			$(butOk).attr("type", "button");
			$(butOk).val('确定');
			$(butOk).addClass("_alert_div_edit_ok");
			$(foot).append($(butOk));
			$(butOk).click(function() {
				lock.remove();
				$(alertObject).remove();
			});
			$(text).html(msg);
			$(close).click(function() {
				$(alertObject).remove();
				lock.remove();
			});
			$(butOk).focus();
		};
		this.remove = function() {
			$(alertObject).remove();
			lock.remove();
		};
	};
	$.extend($.alertDiv, {});
})(jQuery);

(function($) {
	$.alert = function(msg, openObject, p) {
		var alertObject;
		var lock;
		this.init = function() {
			alertObject = createDiv("", "_alert_div_root");
			var divIndex = 1999999998;
			 /**
			 * 计算出最大的index值，解决遮罩层遮罩不到前面弹出的窗口的问题
			 * @alter by 戴连春 2013-09-11
			 */			
		    $("._alert_div_root",window.top.document.body).each(function(){
		    	var zindex = parseInt($(this).css("z-index"))||1999999998;//后面为css中定义的值
		    	if(divIndex<zindex){
		    		divIndex = zindex;
		    	}
		    });				    
		    $(alertObject).css("z-index",divIndex+2);		
			
			$(window.top.document.body).append($(alertObject));
			lock = new $.lockDiv(divIndex+1);
			lock.init();
			var title = createDiv("_alert_div_title", "_alert_div_title");
			$(alertObject).append($(title));
			var titleText = createDiv("_alert_div_title_text",
					"_alert_div_title_text");

			var titleImg = createDiv("_alert_div_title_img",
					"_alert_div_title_img");
			var close = createDiv("_alert_div_title_close",
					"_alert_div_title_close");
			$(title).append($(titleImg));
			$(title).append($(titleText));
			$(title).append($(close));
			$(titleText).html(p.headerText);
			var text = createDiv("_alert_div_text", "_alert_div_text");
			$(alertObject).append($(text));
			var foot = createDiv("_alert_div_edit", "_alert_div_edit");
			$(alertObject).append($(foot));
			$(close).click(function() {
				if (!(p.NoName||p.cancelName)&& p.okFunction) {
					p.okFunction(p.okParam);
				}
				$(alertObject).remove();
				lock.remove();
			});

			if (p.NoName) {
				var butNo = document.createElement("input");
				$(butNo).attr("type", "button");
				$(butNo).val(p.NoName);
				$(butNo).addClass("_z_tree_edit_clear");
				$(foot).append($(butNo));
				$(butNo).click(function() {
					lock.remove();
					$(alertObject).remove();
					if (p.NoFunction) {
						p.NoFunction(p.NoParam);
					}
				});
			}

			if (p.cancelName) {
				var cancel = document.createElement("input");
				$(cancel).attr("type", "button");
				$(cancel).val(p.cancelName);
				$(cancel).addClass("_z_tree_edit_clear");
				$(foot).append($(cancel));
				$(cancel).click(function() {
					lock.remove();
					$(alertObject).remove();
					if (p.cancelFunction) {
						p.cancelFunction(p.cancelParam);
					}
				});
			}
			if (p.okName) {
				var butOk = document.createElement("input");
				$(butOk).attr("type", "button");
				$(butOk).val(p.okName);
				$(butOk).addClass("_alert_div_edit_ok");
				$(foot).append($(butOk));
				$(butOk).click(function() {
					lock.remove();
					$(alertObject).remove();
					if (p.okFunction) {
						p.okFunction(p.okParam);
					}
				});
				$(butOk).focus();
			}

			$(text).html(msg);
		};
		this.remove = function() {
			if (p.okFunction) {
				p.okFunction(p.okParam);
			}
			$(alertObject).remove();
			lock.remove();
		};
	};
	$.extend($.alertDiv, {});
})(jQuery);

(function($) {
	$.alertWindows = function(windowId, urlorHtml, headerText, width, height,
			top, left, type, Function, sueprwindow,isLogin) {
		var win;
		var lock;
		this.init = function() {
			win = createDiv("_win_div_root" + windowId, "_win_div_root");
			var divIndex = 1000;
			 /**
			 * 计算出最大的index值，解决遮罩层遮罩不到前面弹出的窗口的问题
			 * @alter by 戴连春 2013-09-11
			 */			
		    $("._win_div_root",window.top.document.body).each(function(){
		    	var zindex = parseInt($(this).css("z-index"))||1000;//后面为css中定义的值
		    	if(divIndex<zindex){
		    		divIndex = zindex;
		    	}
		    });			
		    $("._win_div_root").each(function(){
		    	var zindex = parseInt($(this).css("z-index"))||1000;//后面为css中定义的值
		    	if(divIndex<zindex){
		    		divIndex = zindex;
		    	}
		    });			    
		    $(win).css("z-index",divIndex+2);	
			
			type = type ? type : 'url';
			if(isLogin){
				$("body").append($(win));
				
			}else{
			    $(window.top.document.body).append($(win));
			}
			lock = new $.lockDiv(divIndex+1);
			lock.init();
			if (width && '' != width) {
				$(win).width(width)
			}
			if (height && '' != height) {
				$(win).height(height)
				$(win).height($(win).height()+2)
			}
			if (top) {
				$(win).css("top", top);
			}
			if (left) {
				$(win).css("left", left);
			}
			var title = createDiv("_win_div_title" + windowId, "_win_div_title");
			$(win).append($(title));
			var titleImg = createDiv("_win_div_title_img" + windowId,
					"_win_div_title_img");
			var titleText = createDiv("_win_div_title_text" + windowId,
					"_win_div_title_text");

			var close = createDiv("_win_div_title_close" + windowId,
					"_win_div_title_close");

			$(titleText).html(headerText);
			$(title).append($(titleImg));
			$(title).append($(titleText));
			$(title).append($(close));
			var obj = new Object();
			obj.superwindow = sueprwindow;
			obj.window = this;
			pushPageCache(windowId, obj);
			$(close).click(function() {
				if (Function)
					Function();
				$(win).remove();
				lock.remove();
				removePageCache(windowId);
			});
			var doc = createDiv("_win_document_" + windowId, "_win_document");
			$(doc).height($(win).height() - $(title).height());
			$(doc).width($(win).width());
			$(win).append($(doc));
			
			/**
			 * 设置弹出窗可拖动
			 *@author 戴连春
			 *@date 2013-10-18
			 */
			try{
				if(isLogin){
					$("#_win_div_title_close" + windowId).css("cursor","pointer");
					$("#_win_div_title" + windowId).css("cursor","move");
					Drag.init($("#_win_div_title" + windowId)[0],win,null,document);
				}else{
					$("#_win_div_title_close" + windowId,window.top.document).css("cursor","pointer");
					$("#_win_div_title" + windowId,window.top.document).css("cursor","move");
					Drag.init($("#_win_div_title" + windowId,window.top.document)[0],win,null,window.top.document);
				}
			}catch(e){
				/**忽略异常**/
			}
			
			
			var subWin;
			if ('url' == type) {
				var iframe = document.createElement("iframe");
				$(iframe).addClass("_win_document_body");
				$(iframe).attr('id', "_win_document_body_" + windowId);
				$(iframe).width($(doc).width());
				$(iframe).height($(doc).height());
				$(iframe).attr("src", urlorHtml);
				$(iframe).attr("marginheight", "0");
				$(iframe).attr("marginwidth", "0");
				$(iframe).attr("broder", "0");
				$(iframe).attr("frameborder", "0");
				$(doc).append($(iframe));
				var onloadifr = function() {

				}
				function load() {
					iframe.onload = iframe.onreadystatechange = iframeload;
				}
				function iframeload() {
					/*if (!iframe.readyState || iframe.readyState == "complete") {
						/*$(iframe)
								.contents()
								.find("body")
								.attr(
										"style",
										"overflow:auto;scrollbar-arrow-color: #75571F;scrollbar-face-color: #FDEDC1;scrollbar-3dlight-color: #fff;scrollbar-highlight-color: #FFF9EB;scrollbar-shadow-color: #E0C07F;scrollbar-darkshadow-color: #FDEDC1;scrollbar-track-color: #FAFAFD;scrollbar-base-color: #F1C555;");
					}*/
					return;

				}
				$(iframe).attr("onload", load);
				subWin = $(iframe.window);
			} else {
				$(doc).append(urlorHtml);
			}
			return subWin;

		};
		this.remove = function() {
			$(win).remove();
			lock.remove();
		};
	};
	$.extend($.alertDiv, {});
})(jQuery);

// 根据大小月份取得天数
function getMaxDayOfDate(y1, m1) {
	var maxDay;
	if (m1 == 1 || m1 == 3 || m1 == 5 || m1 == 7 || m1 == 8 || m1 == 10
			|| m1 == 12) {
		maxDay = 31;
	} else if (m1 == 4 || m1 == 6 || m1 == 9 || m1 == 11) {
		maxDay = 30;
	} else if (m1 == 2 && isRunYear(y1)) {
		maxDay = 29;
	} else if (m1 == 2) {
		maxDay = 28;
	}
	return maxDay;
}

// 根据传入的年份参数，判断是否是润年，即能够被4整除，但不能被100整除，同时满足时；或者能被400整除；
function isRunYear(y) {
	if (y % 4 == 0 && y % 100 != 0) {
		return true;
	} else if (y % 400 == 0) {
		return true;
	} else {
		return false;
	}
}
function ajaxTools(req,hideLoading) {
    var ajax= createDiv("_ajax","_ajax");
    var interval = null;
    if(!hideLoading){
    	var count=0;
    	function load(){
    		if(count%3==0){
    			jQuery(ajax).html("Loading..");
    		}else if(count%3==1){
    			jQuery(ajax).html("Loading....");
    		}else if(count%3==2){
    			jQuery(ajax).html("Loading......");
    		}
    		count++;
    	}
    	jQuery(ajax).html("loading...");
    	interval = setInterval(load, 500);
        window.top.jQuery("body").append(jQuery(ajax));
    }
    
	jQuery.ajax({
		type : req.type ? data.type : "post",// 使用get方法访问后台
		dataType : req.dataType ? req.dataType : "script",// 返回script格式的数据
		url : req.url,// 要访问的后台地址
		data :"data="+req.data+"&classID="+req.classID+"&method="+req.method,// 要发送的数据
		complete : function() {
			clearInterval(interval);
			window.top.jQuery("._ajax").remove();
		},
		success :function(){
			clearInterval(interval);
			window.top.jQuery("._ajax").remove();
			if(json.error){
				alert(json.error);
			}else{
				req.success();
			}
			
		},
		error:function(){
			clearInterval(interval);
			window.top.jQuery("._ajax").remove();
			//alert("您离开太长时间，请刷新重新登陆!");
			window.top.location.reload();
			if(req.error){
				req.error();
			}
		}
	});
}

function ajaxCommit(req,hideLoading) {
    var ajax= createDiv("_ajax","_ajax");
    var interval = null;
    if(!hideLoading){
    	var count=0;
    	function load(){
    		if(count%3==0){
    			jQuery(ajax).html("Loading..");
    		}else if(count%3==1){
    			jQuery(ajax).html("Loading....");
    		}else if(count%3==2){
    			jQuery(ajax).html("Loading......");
    		}
    		count++;
    	}
    	jQuery(ajax).html("loading...");
    	interval = setInterval(load, 500);
        window.top.jQuery("body").append(jQuery(ajax));
    }
    
	jQuery.ajax({
		type : req.type ? data.type : "post",// 使用get方法访问后台
		url : req.url,// 要访问的后台地址
		data :"data="+req.data+"&classID="+req.classID+"&method="+req.method,// 要发送的数据
		complete : function() {
			clearInterval(interval);
			window.top.jQuery("._ajax").remove();
		},
		success :function(ss){
			clearInterval(interval);
			window.top.jQuery("._ajax").remove();
			req.success(ss);
			
		},
		error:function(){
			clearInterval(interval);
			window.top.jQuery("._ajax").remove();
			alert("error:Leave time is too long, please refresh the entire webpage!");
			if(req.error){
				req.error();
			}
		}
	});
}

//得到每周的最后一天(周日)

function getLastDateOfWeek(theDate){
	var firstDateOfWeek=cloneDate(theDate);;
	firstDateOfWeek.setDate(theDate.getDate() - theDate.getDay()+7); 
	return firstDateOfWeek;	
}
//得到每周的第一天(周一)
function getFirstDateOfWeek(theDate){
	var lastDateOfWeek=cloneDate(theDate);
	lastDateOfWeek.setDate(theDate.getDate() - theDate.getDay()+1); 
	return lastDateOfWeek;	
}
// 时间比较的方法，如果d1时间比d2时间大，则返回true   
function compareDate(d1, d2) {
	  return Date.parse(d1.replace(/-/g, "/")) >= Date.parse(d2.replace(/-/g, "/"))   
}
//时间比较的方法，如果d1时间比d2时间小，则返回true   
function compareDate2(d1, d2) {
	  return Date.parse(d1.replace(/-/g, "/")) < Date.parse(d2.replace(/-/g, "/"))   
}
//yyyy-mm-dd HH:SS
function stringToDate(str) {
	str = str.replace(":", "-").replace(" ", "-");
	var arr = str.split("-");
	var m = arr[1];
	if(m.indexOf("0")==0){
		 m = m.replace("0","");
	}
	m = parseInt(m) - 1;
    var dd = new Date(arr[0], m, arr[2], arr[3], arr[4]);
	return dd;
}

function cloneDate(date){
	var cloneDatev =new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()); 
	return cloneDatev;
}
/**
 * 获取当前应用上下文路径
 * @param str
 * @return
 */
function getContextPath() { 
	var contextPath = getCookie("OACONTEXTPATH");//cookie 中获取上下文路径
	
	var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    var fullpath = localhostPaht+projectName;
	
	if(contextPath == "无"){
		//modfi by shuqi.liu 2013-08-26 返回的路径加上projectName
		//return localhostPaht;
		return fullpath;
	}else{
		if(contextPath == null || contextPath == ""){
			jQuery.ajax({
				type : "GET",
				url : fullpath+"/getcontextpath.jsp",
				data : "",
				async:false,
				dataType: "text", 
				contentType : "application/x-www-form-urlencoded; charset=utf-8",
				success : function(msg) {
					contextPath = trim(msg);
					setCookie("OACONTEXTPATH",fullpath,"","",null);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
		           //alert(XMLHttpRequest.status);
		           //alert(XMLHttpRequest.readyState);
		           //alert(textStatus);
					if(XMLHttpRequest.status == 404){
						setCookie("OACONTEXTPATH","无","","",null);
					}
		        }
			});
		}
	}
	return contextPath; 
}

//清空字符串两边的空白
function trim(strMain) {
	if (strMain == null) {
		return "";
	}
	strMain = strMain + "";
	return strMain.replace(/(^\s*)|(\s*$)/g, "");
}

//根据name从cookie中取出值
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) { 
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf("^",c_start);
			if (c_end==-1) {
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}

//设置cookie
function setCookie(c_name, n_value, p_name, p_value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(n_value) + "^" + p_name + "=" + escape(p_value) 
		+ ((expiredays == null) ? "" : "^;expires=" + exdate.toGMTString());
}

function removeCss(curStyle,style) {
	$("link[title='"+curStyle+"']").attr("disabled","disabled");
	$("link[title='"+style+"']").removeAttr("disabled"); 
}

function loadCss(p,win,style){
	    win = win?win:window;
		var link = null;
		if($("link[title='"+style+"']").size() == 0) {
			for (var i = 0, count = p.length; i < count; i++) {
				link = win.document.createElement("link");
				$(link).attr("type", "text/css");
				$(link).attr("title", style);
				$(link).attr("rel", "stylesheet");
				$(link).attr("href", getContextPath() + "/" +  p[i]);
				win.document.getElementsByTagName("head")[0].appendChild(link);
			}
		}
		link = null;
}

function readyCookie(name){
	return $.cookie(name); 
}

function getSystemStyle(defStyle){
	defStyle =defStyle?defStyle:'';
	var style = readyCookie("myStyel");
	if(null == style){
		style = defStyle;
	}
	$.cookie("myStyel",style,{expires:8});
	return style;
}

jQuery.cookie = function(name, value, options) { 
    if (typeof value != 'undefined') { 
              options = options || {}; 
              if (value === null) { 
                        value = ''; 
                        options = $.extend({}, options); 
                        options.expires = -1; 
              } 
              var expires = ''; 
              if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { 
                        var date; 
                        if (typeof options.expires == 'number') { 
                                  date = new Date(); 
                                  date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); 
                        } else { 
                                  date = options.expires; 
                        } 
                        expires = '; expires=' + date.toUTCString(); 
              } 
              var path = options.path ? '; path=' + (options.path) : ''; 
              var domain = options.domain ? '; domain=' + (options.domain) : ''; 
              var secure = options.secure ? '; secure' : ''; 
              document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
    } else { 
              var cookieValue = null; 
              if (document.cookie && document.cookie != '') { 
                        var cookies = document.cookie.split(';'); 
                        for (var i = 0; i < cookies.length; i++) { 
                                  var cookie = jQuery.trim(cookies[i]); 
                                  if (cookie.substring(0, name.length + 1) == (name + '=')) { 
                                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
                                            break; 
                                  } 
                        } 
              } 
              return cookieValue; 
    } 
}; 

/**
 * 拖拽对象
 */
var Drag={
    obj:null,
	isIE : navigator.userAgent.toLowerCase().indexOf("msie") != -1,
	document : null,
	//获得窗口的宽
	windowX : function(){
	  var windowWidth;
	  if (self.innerHeight) {   //all except Explorer
	     windowWidth = self.innerWidth;
	   // Explorer 6 Strict Mode
	  } else if (document.documentElement && document.documentElement.clientHeight) {
	    windowWidth = document.documentElement.clientWidth;
	  } else if (document.body) { // other Explorers
	    windowWidth = document.body.clientWidth;
	  }
	  return windowWidth;
	},
	//获得窗口的高
	windowY : function(){
	  var windowHeight;
	  if (self.innerHeight) {   //all except Explorer
	     windowHeight = self.innerHeight;
	   // Explorer 6 Strict Mode
	  } else if (document.documentElement && document.documentElement.clientHeight) {
	    windowHeight = document.documentElement.clientHeight;
	  } else if (document.body) { // other Explorers
	    windowHeight = document.body.clientHeight;
	  }
	  return windowHeight;
	},
    init:function(handle, dragBody, e,dcment){
        if (e == null) {
            handle.onmousedown=Drag.start;
        }
        Drag.document = dcment || document;
        
        handle.root = dragBody;
        if(isNaN(parseInt(handle.root.style.left)))handle.root.style.left="0px";
        if(isNaN(parseInt(handle.root.style.top)))handle.root.style.top="0px";
        handle.root.onDragStart=new Function();
        handle.root.onDragEnd=new Function();
        handle.root.onDrag=new Function();
        if (e !=null) {
            var handle=Drag.obj=handle;
            e=Drag.fixe(e);
            var top=parseInt(handle.root.style.top);
            var left=parseInt(handle.root.style.left);
            handle.root.onDragStart(left,top,e.pageX,e.pageY);
            handle.lastMouseX=e.pageX;
            handle.lastMouseY=e.pageY;
            Drag.document.onmousemove=Drag.drag;
            Drag.document.onmouseup=Drag.end;
        }
    },
    start:function(e){
        var handle=Drag.obj=this;
        e=Drag.fixEvent(e);
        var top=parseInt(handle.root.style.top);
        var left=parseInt(handle.root.style.left);
        handle.root.onDragStart(left,top,e.pageX,e.pageY);
        handle.lastMouseX=e.pageX;
        handle.lastMouseY=e.pageY;
        Drag.document.onmousemove=Drag.drag;
        Drag.document.onmouseup=Drag.end;
        return false;
    },
    drag:function(e){
        e=Drag.fixEvent(e);                            
        var handle=Drag.obj;
        var mouseY=e.pageY;
        var mouseX=e.pageX;
        var top=parseInt(handle.root.style.top);
        var left=parseInt(handle.root.style.left);        
        if(Drag.isIE){Drag.obj.setCapture();}else{e.preventDefault();};
        var currentLeft,currentTop;
        currentLeft=left+mouseX-handle.lastMouseX;
        currentTop=top+(mouseY-handle.lastMouseY);
        //获得窗口的宽,高
        var windowX = Drag.windowX();
        var windowY = Drag.windowY();
        var rootX = isNaN(parseInt(handle.root.style.width))?0:parseInt(handle.root.style.width);
        var rootY = isNaN(parseInt(handle.root.style.height))?0:parseInt(handle.root.style.height);
        handle.lastMouseX = mouseX;
        handle.lastMouseY=mouseY;            
        
        //如果将对象拖出了body，则阻止
        if(currentLeft+rootX<=30){//左边防止拖出
        	currentLeft = -rootX+30;    
        	handle.lastMouseX = 10;
        }else if(currentLeft-windowX>=(-30)){//右边防止拖出
        	currentLeft = windowX-30;	
        	handle.lastMouseX = windowX-15;	
        }
        
        
        if(mouseY<=0){
        	handle.lastMouseY = 15; 
        }
        if(currentTop<=0){
        	currentTop = 0;
        }else if(currentTop - windowY >=(-30)){
        	currentTop = windowY-30;
        	handle.lastMouseY=windowY-10;
        }
        
        handle.root.style.left=currentLeft +"px";
        handle.root.style.top=currentTop+"px";
               
        
        handle.root.onDrag(currentLeft,currentTop,e.pageX,e.pageY);
        return false;
    },
    end:function(){
        if(Drag.isIE){Drag.obj.releaseCapture();};
        Drag.document.onmousemove=null;
        Drag.document.onmouseup=null;
        Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left),parseInt(Drag.obj.root.style.top));
        Drag.obj=null;
    },
    fixEvent:function(e){
        var sl = Math.max(Drag.document.documentElement.scrollLeft, Drag.document.body.scrollLeft);
        var st = Math.max(Drag.document.documentElement.scrollTop, Drag.document.body.scrollTop);
        if(typeof e=="undefined")e=window.event;
        if(typeof e.layerX=="undefined")e.layerX=e.offsetX;
        if(typeof e.layerY=="undefined")e.layerY=e.offsetY;
        if(typeof e.pageX == "undefined")e.pageX = e.clientX + sl - Drag.document.body.clientLeft;
        if(typeof e.pageY == "undefined")e.pageY = e.clientY + st - Drag.document.body.clientTop;
        return e;
    }
};
