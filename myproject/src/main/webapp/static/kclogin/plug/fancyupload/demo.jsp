<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String currentDateTime = new Date().getTime()+"";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>上传Demo</title>
		<!-- 引入jQuery -->
		<script type="text/javascript" src="../jquery-ui-1.8.17.custom/js/jquery-1.7.1.min.js"></script>
		<script type="text/javascript">jQuery.noConflict();</script>
		<!-- 引入上传控件 -->
		<link rel="stylesheet" href="fancyupload.css" type="text/css" />
		<script type="text/javascript" src="mootools-1.2.5-core-jm.js"></script>
		<script type="text/javascript" src="source/Fx.ProgressBar.js"></script>
		<script type="text/javascript" src="source/Swiff.Uploader.js"></script>
		<script type="text/javascript" src="source/FancyUpload3.Attach.js"></script>
		<script type="text/javascript" src="myfancyupload.js"></script>
		<script type="text/javascript">
	//	var buessid = '<%=currentDateTime%>_mytest';
		var buessid = 'abcdefg_mytest';
		var buessid2 = 'abcdefgg_mytest';
		window.addEvent('domready', function() {
			MyFancyupload.createUpload('demo-list', '#demo-attach, #demo-attach-2', '<%=path%>', '<%=path%>/servlet/FileUpload?buessid='+buessid, true, buessid);
			MyFancyupload.createUpload('demo-list1', '#demo-attach1', '<%=path%>', '<%=path%>/servlet/FileUpload?buessid='+buessid2, true, buessid2);
		});
		</script>
	</head>
	<body>
		<div id="demo">
			<a href="#" id="demo-attach">请选择文件</a>
			<a href="#" id="demo-attach-2" style="display: none;">继续上传文件</a>
			<ul id="demo-list"></ul>
		</div>
		
		<div id="demo2">
			<a href="#" id="demo-attach1">请选择文件</a>
			<ul id="demo-list1"></ul>
		</div>
	</body>
</html>