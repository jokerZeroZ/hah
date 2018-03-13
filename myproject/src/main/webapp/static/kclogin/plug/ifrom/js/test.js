/**
 * 远程调用事件绑定调用，默认实现
 */
/*$remoteBind.event=function(){
	var list = $(".event");
	if(null==list) return;
	$.each(list, function(key, val){
		$(val).click(function(){
		$remoteCall.submitClient({methodName:val.methodName,classID:val.actionId,submitKey:val.submitKey,Function:function(response){
			if($.isFunction($successful[$.trim(val.successful)])){
				$successful[$.trim(val.successful)](response);
			}
		}});});
	});
}*/
/**
 * 校验注册样例
 * 如下 notNull
 */
$validation.notNull=function(obj,val){
	if(null == val || ""==$.trim(val)){
		alert($(obj).attr("name")+" is null");
		return true;
	}
}


/**
 * 取值注册样例
 * 如下 INPUT
 */
/*$transform.INPUT=function(obj){
	//alert(111);
}*/
$transform.html=function(obj){
return $(obj).html();
}
$transform.kkk=function(obj){
	return $(obj).attr("kkk");
	}
$transform.kkk=function(obj){
	return $(obj).attr("kkk");
}
$transform.test=function(obj){
	return $(obj).attr("test");
}

/**
 * 
 */
/**
 * 后台异常处理注册样例
 */
$exception.ES3=function(obj){
	//window.top.location.reload();
	alert("找不到方法")
}
$exception.kkk=function(obj){
	//window.top.location.reload();
	alert(obj.errorMag);
}

$successful.alert=function(response){
	alert(response.resultCode);
}

$successful.ssss=function(response){
	alert("aaaa");
}