<%@ page language="java" contentType="text/html; charset=GBK"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


	String filePath = basePath +request.getParameter("filePath") ;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="../resources/css/style.css" rel="stylesheet" type="text/css" />
<title></title>
</head>

<body>
<iframe scrolling="auto" height="100%" width="100%" src="<%=filePath %>" frameborder="0"></iframe>
</body>
</html>
