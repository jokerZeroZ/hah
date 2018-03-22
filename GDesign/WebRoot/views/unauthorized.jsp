<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Error</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style>
       .contentBody{
				position: absolute;    
			    width:500px;    
			    height:300px;    
			    left:50%;    
			    top:50%;    
			    margin-left:-250px;    
			    margin-top:-150px;
				background: url(static/images/sorry.jpg) 100% 5px;background-repeat: no-repeat;
				z-index:1;
				}
				body{
					margin: 0px;
					padding: 0px;
				}
				 html, code
        {
            font: 15px/22px arial;
        }
        html
        {
            background: #fff;
            color: #222;
            padding: 15px;
        }
         ins
        {
            color: #777;
            text-decoration: none;
        }
    </style>
  </head>
  
  <body>
  <div class="contentBody">
  <p align="left"><img src="static/images/logoimage.png" alt="McDonalds"/></p>
    <p align="left">
        <ins>Sorry that an unexpected error has occurred</ins>
    </p>
    <p align="left">
        <ins>Error Message:</ins>
        <br />
        <span id="lblErrorMessage">No Error Message</span>
        <br />
        <ins>If this error affect your working, please contact McDonalds IT Department.</ins>
    </p>
    </div>
  </body>
</html>
