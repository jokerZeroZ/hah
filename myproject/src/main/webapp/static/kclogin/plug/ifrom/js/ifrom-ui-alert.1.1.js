/**
 * 沈联成 2012-8-15 added
 */
// JScript 文件
/**
 * var okF = function(){
 alert('ok')	
 }
 var okN = function(){
 alert('No')	
 }
 var okC = function(){
 alert('取消')	
 }
 var p={
 headerText:'弹出框测试',
 okName:'确认',
 okFunction:okF,
 NoName:'关闭',
 NoFunction:okN,
 cancelName:'取消',
 cancelFunction:okC
 };
 alert("请点击是否确认",p)
 */
window.alert = function(msg, p) {
	//生成一个层
	try{
		if (p) {
			var div = new window.top.jQuery.alert(msg, window, p);
			div.init();
		} else {
			var div = new window.top.jQuery.alertDiv(msg,true);
			div.init();
		}
	}catch(error){
		if (p) {
			var div = new jQuery.alert(msg, window, p);
			div.init();
		} else {
			var div = new jQuery.alertDiv(msg,false);
			div.init();
		}
	}
	
};

openWindows = function(menuID, text, url, superID, layoutID, superWindow,isReload,isNewOpen,leftUrl) {
	if(!isNewOpen){
		window.top.window[menuID+"href"] = window.location.href;
		window.location.href = url;
		return;
	}
	var b = new window.top.jQuery.boxMenu();
	b.isClose = true;
	b.menuId = menuID;
	b.menuName = text;
	b.win = superWindow;
	b.superID = superID;
	b.isReload = isReload;
	b.leftUrl = leftUrl;
	b.defaultLoad = true;
	layoutID = layoutID ? layoutID : 'mian';
	window.top.addBoxMenu(b, layoutID, url);
}

/*
	函数:  removeWindows
	说明:  关闭tab窗口与跳转
	参数:   menuId：打开时候的ID值
			isBreak：是否跳转(false表示关闭,true本页面的跳转)
			url:要跳转的url地址
			isAjaxCommit 要跳转的父子窗口(true 表示parent窗口，false本窗口)	
			isBackParentTab:是否回退到父的tab页面
			isReload:是否刷新父页面
	返回值: 无
*/
removeWindows = function(menuId, isBreak, url, isAjaxCommit, isBackParentTab, isParentReload) {
				
	if(window.top.window[menuId+"href"]){
		url = url?url:window.top.window[menuId+"href"];
		if(isBreak){
		  if(isAjaxCommit){
			  window.parent.location.href=url;
		  }else{
			  window.location.href = url;
		  }
		   
		}
		window.top.window[menuId+"href"] = false;
		return;
	}
	var obj = window.top.findPageCacheName(menuId);
	if (null == obj) {
		return true;
	}
	if (isBreak && obj.boxMenu.win) {
		try {
			if (url)
				obj.boxMenu.win.location.href = url;
			else {
				obj.boxMenu.win.location.reload();
			}
		} catch (error) {
		}

	}
	window.top.removePageCache(menuId);
	obj.boxMenu.isBackParentTab = isBackParentTab;
	obj.boxMenu.isParentReload = isParentReload;
	window.top.removeBoxNew(obj.box, obj.doc, obj.layoutID, obj.boxMenu);
	return false;
}

/**
 * windowId 窗口的ID
 * urlorHtml 地址或者HTML String
 * headerText头名字
 * height：高
 * width：宽
 * top，left 距顶部与左边的距离，建议写百分比  @alter by lianchun.dai(废弃掉自行填写的百分比，默认居中)
 * type:类型 默认URL，其它的为HTML String
 */
openAlertWindows = function(windowId, urlorHtml, headerText, width, height,
		top, left, Function,type,localTopLeft) {
	windowId = '' == windowId ? 'windowId' : windowId;
	var winWidth = jQuery(window.top).width();//界面宽度
	var winHeight = jQuery(window.top).height();//界面高度
	
	//将传入的宽度转换为数字
	var newWidth = parseInt(width)||100;
	var newHeight = parseInt(height)||100;
	//宽度是否为百分比
	var isPercentW = (width+"").indexOf("%") == -1 ? false : true; 
	//高度是否为百分比
	var isPercentH = (height+"").indexOf("%") == -1 ? false : true;	
	if(isPercentW){
		width = ((winWidth * newWidth)/100 >winWidth) ? winWidth : ((winWidth * newWidth)/100);
	}else{
		width =  (newWidth >winWidth) ? winWidth : newWidth;
	}	
	if(isPercentH){
		height = ((winHeight * newHeight)/100 >winHeight) ? winHeight : ((winHeight * newHeight)/100);
	}else{
		height =  (newHeight >winHeight) ? winHeight : newHeight;
	}
	
	width = width >winWidth ? winWidth : width;
	height = height > winHeight ? winHeight : height;
	if(localTopLeft &&　left　&& top){
		//宽度是否为百分比
		var isLoaclPercentW = (left+"").indexOf("%") == -1 ? false : true; 
		//高度是否为百分比
		var isLoaclPercentH = (top+"").indexOf("%") == -1 ? false : true;
		var left = parseInt(left)||100;
		var top = parseInt(top)||100;
		if(isLoaclPercentW){
			//（宽度 X LFET）+ 弹出框宽度 <  宽度 ? 宽度 X LFET :中间 
			winLeft = ((winWidth*left/100)+width) < winWidth ? (winWidth*left/100) : ((winWidth-width)/2);
		}else{
			winLeft = (left+width) < winWidth ? left : (winWidth-width)/2;
		}	
		if(isLoaclPercentH){
			winTop = ((winHeight*top/100)+height) < winHeight ? (winHeight*top/100) : ((winHeight-height)/2);
		}else{
			winTop = (top+height) < winHeight ? top : ((winHeight-height)/2);
		}
	}else{
		var winLeft = (winWidth-width)/2;
		var winTop = (winHeight-height)/2;
	}
	var b = new window.top.jQuery.alertWindows(windowId, urlorHtml, headerText,
			width, height, winTop+"px", winLeft+"px", type,Function,window);
	return b.init();
}
/**
 * windowId窗口的ID
 * isClose 是否直接关闭
 * processVal：处理结果，成功true 失败false
 * msg消息
 * isBreak 是否刷新父窗口
 * url 父窗口指向地址
 */
removeAlertWindows = function(windowId, isClose, processVal, msg, isBreak, url,isHideShowMsg) {
	windowId = '' == windowId ? 'windowId' : windowId;
	var obj = window.top.findPageCacheName(windowId);
	if (null == obj || null == obj.superwindow)
		return true;
	if (isClose) {
		window.top.removePageCache(windowId);
		obj.window.remove();
		return false;
	}
	var okF = function() {
		var obj = window.top.findPageCacheName(windowId);
		if (isBreak) {
			if (url)
				obj.superwindow.location.href = url;
			else {
				obj.superwindow.location.reload();
			}
		}
		window.top.removePageCache(windowId);
		obj.window.remove();
	}
	if (processVal && !isHideShowMsg) {
		alert(msg, {
			headerText : '处理结果',
			okName : '确认',
			okFunction : okF
		})
	} else {
		if(processVal && isHideShowMsg){
			okF();
		} else{
			alert(msg);
		}
	}
	return false;
}
/** 
 * 关闭alert窗口
 * windowId窗口的ID
 * url 父窗口指向地址
 */
removeAlertWindowByWindowID = function(windowId){
	var obj = window.top.findPageCacheName(windowId);
	if (null == obj || null == obj.superwindow)
		return false;
	var obj = window.top.findPageCacheName(windowId);
	window.top.removePageCache(windowId);
	obj.window.remove();
} 

/**
 * 根据windowId得到父窗口
 * windowId窗口的ID
 */
getParentWindow = function(windowId) {
	windowId = '' == windowId ? 'windowId' : windowId;
	return window.top.findPageCacheName(windowId).superwindow;
}
/** 说明：关闭当前窗口，刷新父页面，但不提示
 * windowId窗口的ID
 * isClose 是否直接关闭
 * isBreak 是否刷新父窗口
 */
closeAlertWindows = function(windowId, isClose, isBreak) {
	windowId = '' == windowId ? 'windowId' : windowId;
	var obj = window.top.findPageCacheName(windowId);
	if (null == obj || null == obj.superwindow)
	if (isClose) {//直接关
		window.top.removePageCache(windowId);
		obj.window.remove();
	}
	if (isBreak) {//是否刷新父
		obj.superwindow.location.reload();
	}
	window.top.removePageCache(windowId);
	obj.window.remove();
}
