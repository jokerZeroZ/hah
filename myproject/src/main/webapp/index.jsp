<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/bootstrap/bootstrap-3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/bootstrap/bootstrap-3.3.7/css/bootstrap-theme.min.css">
<script type="text/javascript" src="${pageContext.request.contextPath }/static/bootstrap/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/static/bootstrap/bootstrap-3.3.7/js/npm.js"></script>.


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
	<script>
	function r()
	{
		var username=document.getElementById("username");
		var pass=document.getElementById("password");
		if(username.value=="")
		{
			alert("请输入用户名");
			username.focus();
			return;
		}
		if(pass.value=="")
		{
			alert("请输入密码");
			return;
		}
		$("#login").submit();
	}
	</script>
</head>
<body>
	<form id="login" action="ss/login" method="post">
		<table width="350" bgcolor="#ccffcc" style="border-color" border="1">
		<tr align=center>
		<td>用户名</td><td><input type="text" name="username" id="username"></td>
		</tr>
		<tr align=center><td>密 码</td><td><input type="password" name="password" id="password"></td></tr>
		<tr align=center><td colspan="2">
			<input type="submit" value="登 录" onclick="r();"/>
			<input type="reset" value="重 置"/></td></tr>
		
		</table>
	</form>
</body>
</html> 