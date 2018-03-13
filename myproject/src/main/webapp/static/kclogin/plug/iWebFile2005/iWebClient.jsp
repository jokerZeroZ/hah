<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="java.util.*,java.sql.*" %>
<%
	String path = request.getContextPath();
	AccessControl accesscontroler = AccessControl.getAccessControl();
	accesscontroler.checkAccess(request, response);
	
	String userid = accesscontroler.getUserID();
	String username = accesscontroler.getUserName();
	String departid = request.getParameter("departid");
	
	String serverName = (String) request.getServerName();
	String serverPort = String.valueOf(request.getServerPort());
	String contextPath = (String) request.getContextPath();
	
	String rootPath = request.getSession().getServletContext().getRealPath("");
	rootPath = rootPath.replace("\\","/");
	
	String pathup = "/iWebFile2005/iWebServer.jsp";
	String mServerUrl = "http://" + serverName + ":" + serverPort+ contextPath + pathup ;
%>

<%@page import="com.chinacreator.security.AccessControl"%>
<HTML>
<HEAD>
<TITLE>视频文件上传</TITLE>
<link REL="stylesheet" href="Test.css" type="text/css">
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<!-- 引入jQuery -->
<script type="text/javascript" src="../ccapp/xtbg/resources/plug/jquery-ui-1.8.17.custom/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<style type="text/css">
<!--
.STYLE2 {font-size: 12px}
-->
</style>
</HEAD>

<script language="javascript">  
  //载入页面时初始化
  var iWebFile;
  iWebFile = new ActiveXObject("DBstep.iWebClient"); 
  function Load(){
	iWebFile.FileType="flv视频文件|*.flv"; 
    iWebFile.WebUrl='iWebServer.jsp';           //设置处理页路径，本处可以支持相对路径
    //iWebFile.ShowInterface=true;                //是否显示界面
    iWebFile.ShowBreakpointMsg=true;            //是否断点续传
       //控制控件允许上传的文档类型。默认情况下为全部文件类型('所有文件|*.*')。	
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

//上传文件
  function UpLoadFile(file){
	  var exttype = file.split('.')[file.split('.').length-1];

/* 	  if("flv" != exttype){
		  alert("只能上传flv格式的视频文件！");
		  return;
	  } */
	  
    var FileName;

    //取得需要上传的文件名
    FileName=file.substring(file.lastIndexOf("\\")+1);
    //检测文件是否存在
    if (iWebFile.WebCheckFile(file)){
    	if(!checkString(FileName)){
    		//如果需要保存到其他目录，可以在此设置路径参数.
		    //例如:
		    //debugger	
		    var file_exttype = FileName.split(".")[FileName.split(".").length-1];
		    iWebFile.SetMsgByName("FILE_REALNAME",FileName);
			iWebFile.SetMsgByName("rootPath","<%=rootPath%>");
		    iWebFile.SetMsgByName("departid","<%=departid%>");
		    //在服务器上就可以通过GetMsgByName("FILEPATH")，取得文件保存路径myfile，然后进行保存操作
		    iWebFile.WebUrl ="<%=mServerUrl%>";
			iWebFile.MaxSize = 0;
	      	if (iWebFile.WebPutFile(file,FileName)){
	        	alert("文件保存成功!");
	        	//location.href="upload.jsp";
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
</script>

<BODY onLoad="Load()" bgcolor="">
<DIV align="center">
	<table width=600 bgcolor="FFFFFF">	
	  <tr style="display:none">
	    <td colspan=4 width=100% height=200><script src="iWebFile2005.js"></script></td>
	  </tr>
	 
	  <tr>
		<td height="24" colspan="4" nowrap class="NewLineStyle">　选择文件上传 →| 　<input id=fa type=file value="" style=width:60% class=inputcss>

	      <a class="LinkButton" onClick="UpLoadFile(getFullPath(fa))">[上传文档]</a></td>
	  </tr>
	 
	</table>
</div>
</BODY>
</HTML>