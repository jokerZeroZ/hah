/**
*函数:   getJsonString
*说明:   将JSON转换成字符串
*参数:   json对像
*返回值: 字符串
*/
function getJsonString(jsonObj){
	var sA = [];
	(function(o){
	   var isObj=true;
	   if(o instanceof Array)
	      isObj=false;
	   else if(typeof o!='object'){
	      if(typeof o=='string'){
	          sA.push("'"+o+"'");
	      }else{
	          sA.push(o);
	      }
	      return;
	   }
	   if(null != o && o!="null" && o!=""){
		   sA.push(isObj?"{":"[");
	   }else{ 
		   sA.push("'");
	   }
	   for(var i in o){
	    if(o.hasOwnProperty(i) && i!='prototype'  && i!= "toJSON"){
	     if(isObj)
	    	 sA.push("'");
	     
	      sA.push(i+"'"+':');
	      if(!IsSpace(o[i])){
		       arguments.callee(o[i]);
	      }else{
		       sA.push("''");   
	      }
	       sA.push(',');   
	    }
	   }
	   if(null != o && o!="null" && o!=""){
		   sA.push(isObj?"}":"]");
	   }else{ 
		   sA.push("'");
	   }
	})(jsonObj);
	return descape(sA.slice(0).join('').replace(/,\}/g,'}').replace(/,\]/g,']'));
}


/**
*函数:   getJsonString
*说明:   将JSON转换成字符串，不调用descape
*参数:   json对像
*返回值: 字符串
*/
function getJsonStringNoDescape(jsonObj){
	var sA = [];
	(function(o){
	   var isObj=true;
	   if(o instanceof Array)
	      isObj=false;
	   else if(typeof o!='object'){
	      if(typeof o=='string'){
	          sA.push("'"+o+"'");
	      }else{
	          sA.push(o);
	      }
	      return;
	   }
	   if(null != o && o!="null" && o!=""){
		   sA.push(isObj?"{":"[");
	   }else{ 
		   sA.push("'");
	   }
	   for(var i in o){
	    if(o.hasOwnProperty(i) && i!='prototype'  && i!= "toJSON"){
	     if(isObj)
	    	 sA.push("'");
	     
	      sA.push(i+"'"+':');
	      if(!IsSpace(o[i])){
		       arguments.callee(o[i]);
	      }else{
		       sA.push("''");   
	      }
	       sA.push(',');   
	    }
	   }
	   if(null != o && o!="null" && o!=""){
		   sA.push(isObj?"}":"]");
	   }else{ 
		   sA.push("'");
	   }
	})(jsonObj);
	return sA.slice(0).join('').replace(/,\}/g,'}').replace(/,\]/g,']');
}