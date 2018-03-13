//载入页面时初始化
jQuery(function(){
	Load();
});
function Load(){
  iWebFile.WebUrl='iWebServer.jsp';           //设置处理页路径，本处可以支持相对路径
  //iWebFile.ShowInterface=true;                //是否显示界面
  iWebFile.ShowBreakpointMsg=true;            //是否断点续传
     //控制控件允许上传的文档类型。默认情况下为全部文件类型('所有文件|*.*')。	
}
/*
函数:  editFile
说明:  查看文件
*/
function editFile(url,FileName) {
	window.open(path+"/servlet/pubFileDownload?djsn=&openType=onlinebyupload&FileName=editfile&strfilepath="+encodeURI(url+FileName)+"&fileName="+encodeURI("查看file"),"_blank", "width="+window.screen.availWidth+",height="+window.screen.availHeight+",left=0px,top=0px");
}
/*
函数:  downloadFile
说明:  下载文件
*/
function downloadFile(url,FileName) {
	location.href = urlpath+'download.jsp?path='+_pub.lang.zwzm(url+FileName);
}

function ajaxUploadFiles(tableName,attach_id,url,oType,_filebut){
	jQuery.ajax({
        type: "post",
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
        	tableName: tableName,
            attach_id: attach_id
        },
        dataType: "json",
        success: function (result) {
        	if (result.flag) {
        		jQuery("#_fileshowul").html("");//删除后要先清空，再加载现有的
                for(var i = 0; i <result.uploadListMapsize; i++){
                	var fileid         = result.uploadListMap[i].file_id;
    	        	var yearfolder     = result.uploadListMap[i].yearfolder;  
    	        	var monthfolder    = result.uploadListMap[i].monthfolder;  
    	        	var rootPath       = result.rootPath;
    	        	var UPLOADSAVEPATH = result.UPLOADSAVEPATH;
            		var FileName       = result.uploadListMap[i].filename;
            		var url=rootPath+UPLOADSAVEPATH+tableName+"/"+yearfolder+"/"+monthfolder+"/"+attach_id+"/";
            		append2_fileshowul(url,FileName,fileid,tableName,attach_id,oType);
            	}//初始化 附件数 
                if(_filebut!=undefined && _filebut!=null && _filebut!=""){//有查看附件按钮
	        		var arr = jQuery("#"+_filebut).val().split("（");//没有（也是第一个数组）
	        		jQuery("#"+_filebut).val(arr[0]+"（"+result.uploadListMapsize+"）");
	        	}
            } else {
                alert(result.info);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统异常请稍后再试！");
        }
    });
}
 
//在Vista下上传文档时获取文件名和路径
function getFullPath(obj) { 
  if(obj) { 
    //ie 
    if (window.navigator.userAgent.indexOf("MSIE")>=1){ 
      obj.select(); 
      return document.selection.createRange().text; 
    } 
    //firefox 
    else if(window.navigator.userAgent.indexOf("Firefox")>=1) { 
      if(obj.files){ 
        return obj.files.item(0).getAsDataURL(); 
      } 
      return obj.value; 
    } 
    return obj.value; 
  } 
}

function getUuid(){
	  var uuid = "";
	  $.ajax({
			url: "getuuid.jsp",
			type: 'POST',
			dataType: 'json',
			data: {},
			async : false,
			success: function(data){
				uuid = data.uuid;		
			},
			error: function(jqXHR, textStatus, errorThrown){
				//alert("操作失败！");
			}
		});	
		return uuid;
}

/*
 * 函数名：上传文件
 * file
 * rootPath       根目录磁盘路径
 * departid       好像没有到
 * zj_id          附件id
 * mServerUrl     上传文件操作响应的jsp文件服务url
 * oType       是否直接加载附件列表
*/
function UpLoadFile(tableName,file,rootPath,departid,zj_id,mServerUrl,oType,_filebut){
  var exttype = file.split('.')[file.split('.').length-1];
  var FileName;
  if(oType==undefined || oType==null){
	  oType="";
  }
  //取得需要上传的文件名
  FileName=file.substring(file.lastIndexOf("\\")+1);
  //检测文件是否存在
  if (iWebFile.WebCheckFile(file)){
  	if(!checkString(FileName)){
  		//如果需要保存到其他目录，可以在此设置路径参数.
		    var file_exttype = FileName.split(".")[FileName.split(".").length-1];
		    iWebFile.SetMsgByName("FILE_REALNAME",zj_id+"/"+FileName);
			iWebFile.SetMsgByName("rootPath",rootPath);
		    iWebFile.SetMsgByName("departid",departid);
		    iWebFile.SetMsgByName("attach_id",zj_id);
		    iWebFile.SetMsgByName("tableName",tableName);
		    //在服务器上就可以通过GetMsgByName("FILEPATH")，取得文件保存路径myfile，然后进行保存操作
		    iWebFile.WebUrl = mServerUrl;
			iWebFile.MaxSize = 0;
	      	if (iWebFile.WebPutFile(file,FileName)){
	        	alert(iWebFile.GetMsgByName("RESULT"));
	        	if("1"===oType||"0"===oType){
	        		var fileid         = iWebFile.GetMsgByName("fileid");
		        	var UPLOADSAVEPATH = iWebFile.GetMsgByName("UPLOADSAVEPATH");  
		        	var yearfolder     = iWebFile.GetMsgByName("yearfolder");  
		        	var monthfolder    = iWebFile.GetMsgByName("monthfolder");  
		        	var attach_id      = zj_id;
	        		var url=rootPath+UPLOADSAVEPATH+tableName+"/"+yearfolder+"/"+monthfolder+"/"+attach_id+"/";
	        		append2_fileshowul(url,FileName,fileid,tableName,attach_id,oType);
	        	}
	        	if(_filebut!=undefined && _filebut!=null && _filebut!=""){//有查看附件按钮
	        		var arr = jQuery("#"+_filebut).val().split("（");
	        		if (arr.length==2){//情况1：查看附件（1）--查看附件，[1）
	        			icount = arr[1].substring(0,arr[1].length-1);
		    			icount++;
		        		jQuery("#"+_filebut).val(arr[0]+"（"+icount+"）");
	        		}else if(arr.length==1){//情况2：查看附件--查看附件
	        			jQuery("#"+_filebut).val(arr[0]+"（1）");
	        		}
	        	}
	      	}else{
	        	alert(iWebFile.MsgError());
		    }
	    } else {
	    	return ;
	    }
  }else{
    alert("文件"+file+"没有找到!");
  }
}

function append2_fileshowul(url,FileName,fileid,tableName,attach_id,oType){
	if(oType==='1'){//有删除、下载权限
		jQuery("#_fileshowul").append("<div id='p_"+fileid+"'><p><span>"+FileName+"</span>&nbsp;&nbsp;<SPAN id=deleteButton style='CURSOR: pointer'  onclick=deleteUploadFile('"+fileid+"','"+tableName+"','"+attach_id+"','"+urlpath+"delete.jsp')><FONT color=red>删除</FONT></SPAN>&nbsp;&nbsp;<SPAN id=downloadButton style='CURSOR: pointer'  onclick=downloadFile('"+url+"','"+FileName+"')><FONT color=red>下载</FONT></SPAN>&nbsp;&nbsp;<SPAN id=editButton style='CURSOR: pointer'  onclick=editFile('"+url+"','"+FileName+"')><FONT color=red>查看</FONT></SPAN></p></div>");
	}else if(oType==='0'){//有下载权限
		jQuery("#_fileshowul").append("<div id='p_"+fileid+"'><p><span>"+FileName+"</span>&nbsp;&nbsp;<SPAN id=downloadButton style='CURSOR: pointer'  onclick=downloadFile('"+url+"','"+FileName+"')><FONT color=red>下载</FONT></SPAN></p></div>");
	}
}

/*
函数:  deleteFile
说明:  下载文件
*/
function deleteUploadFile(file_id,tableName,attach_id,url,_filebut){
	if (!confirm("确定要删除上传文件吗？")) {
		return;
	}
	jQuery.ajax({
        type: "post",
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
        	file_id:file_id,
            tableName:tableName,
            attach_id:attach_id
        },
        dataType: "json",
        success: function (result) {
            if (result.flag) {
                alert(result.info);
            	if($("#p_"+file_id)!=null && $("#p_"+file_id)!=undefined) $("#p_"+file_id).remove();//删除div
    			if(_filebut!=undefined && _filebut!=null &&_filebut!=""){
    				var arr = jQuery("#"+_filebut).val().split("（");
        			icount = arr[1].substring(0,arr[1].length-1);
        			if(icount=="" ||icount==null || icount==undefined){
        				icount=0;
        			}
        			icount--;
            		jQuery("#"+_filebut).val(arr[0]+"（"+icount+"）");
    			}
            } else {
                alert(result.info);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统异常，请稍后再试！");
        }
    });
}

//验证字符串中是否包含了特殊字符
function checkString(source){
	var arr = new Array("@","#","$","%","^","&","*","|"," ","/",":","'","\"","?","<",">","(",")","+","{","}","[","]","【","】","——");
	var len=arr.length;
	var Flag = false;
	for(var i=0;i<len;i++){
		if(source.indexOf(arr[i])>=0){
	   		alert("文件名中包含特殊字符,请更改文件名再上传！");
	   		Flag = true;
	   		break;
		}
	}
	return Flag;//包含了特殊字符就返回true;否则返回false
}

function openuploadlist(path,tableName,attach_id,oType){
	var backFn = function(){callajaxUploadFile();};
	var windowId = 'openuploadlistWindow';
	var url = '?windowId='+windowId+'&tableName='+tableName+'&attach_id='+attach_id+'&oType='+oType;
    openAlertWindows(windowId, path+'uploadquerylist.jsp'+url, '查看附件' ,1020,530,'10%','10%',backFn);
}

