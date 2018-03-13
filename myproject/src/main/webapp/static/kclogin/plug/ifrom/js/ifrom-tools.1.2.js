/**
 * 黄艺平 2013-11-07 added
 */

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


function addCss(){
	var style = "";
	try{style = window.top.getSystemStyle();}catch(error){try{style = getSystemStyle();}catch(e){}}
	if(style == "/" || style=="") {
		style = "red"
	}
	style = window.top.m_style;
	var p = [
	            "/ccapp/oa/resources/style/"+style+"/css/global.css",
	            "/ccapp/oa/resources/style/"+style+"/css/paging.css",
	            "/ccapp/oa/resources/style/"+style+"/css/tanchukuang.css",
	            "/ccapp/oa/resources/plug/jquery-ui-1.8.17.custom/lightblue/css/custom-theme/jquery-ui-1.8.17.custom.css",
	            "/ccapp/oa/resources/plug/formvalidation/css/validationEngine.jquery.css",
	            "/ccapp/oa/resources/plug/JQuery zTree v3.0/blue/css/zTreeStyle/zTreeStyle.css",
	            "/ccapp/oa/resources/style/lightblue/css/trees.css",
	            "/ccapp/oa/resources/plug/jquery.jqGrid-4.3.1/lightblue/css/ui.jqgrid.css"
	        ];
	
	try {window.top.loadCss(p, window);} catch (error) {try {loadCss(p, window);} catch (e) {}}
	style = null;
	p=null;
}


try{
	if(!indexFlager)addCss();
}catch(error){addCss();}


function changeskin(value){
	if(-111 == value) return;
	var style = window.top.getSystemStyle();
	if(style == value) return;
    $.cookie("myStyel",value,{expires:8});
    window.top.location.reload();
}

function changesLayout(){
    window.top.location.reload();
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
  

  /**
   * 对字符串中的某些特定字符进行转义
   * 
   * @param str
   * @return
   */
function descape(str){
  	  if(/{\'/.test(str)){
  		  str = str.replace("{'","chr(41)");
  	  }
  	  if(/\'}/.test(str)){
  		  str = str.substring(0, str.length - 2) + str.substring(str.length -2, str.length).replace("'}","chr(42)");
  	  }
  	  if(/\}/.test(str)){
  		  str = str.replaceAll("}","chr(46)");
  	  }
  	  if(/\{/.test(str)){
  		  str = str.replaceAll("{","chr(47)");
  	  }
  	  if(/\'\,\'/.test(str)){
  		  str = str.replaceAll("','","chr(43)");
  	  }
  	  if(/\':\'/.test(str)){
  		  str = str.replaceAll("':'","chr(44)");
  	  }
  	  if(/\#/.test(str)){
  		 str = str.replaceAll("#","chr(50)");
  	  }
  	  if(/\'/.test(str)){
  		str = str.replaceAll("'","chr(39)")
  	  }
  	  if(/\"/.test(str)){
  			str = str.replaceAll('"',"chr(45)")
  		  }
  	  if(/\&/.test(str)){
  		str = str.replaceAll("&","chr(38)")
  	  }
  	  if(/\</.test(str)){
  		str = str.replaceAll("<","chr(60)")
  	  }
  	  if(/\>/.test(str)){
  		str = str.replaceAll(">","chr(62)")
  	  }
  	  if(/\%/.test(str)){
  		 str = str.replaceAll("%","chr(37)")
  	  }

  	  if(/\r\n/.test(str)){
  		  str = str.replaceAll("\r\n","chr(64)")
  	  } 
  	  while(/\\/.test(str)){
  		  str = str.replace("\\","chr(40)");
  	  }
  	  return str;
}

String.prototype.replaceAll = function (AFindText,ARepText){
	  raRegExp = new RegExp(AFindText,"g");
	  return this.replace(raRegExp,ARepText);
}