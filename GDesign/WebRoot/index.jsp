<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String url=request.getRequestURL().toString();
String toUrl=url.substring(0,33);
String username = (String)request.getSession().getAttribute("username");  
if(username == null){  
    response.sendRedirect(toUrl+"login.jsp");
}
%>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="Appboard - Admin Template with Angularjs">
    <meta name="keywords" content="appboard, webapp, admin, dashboard, template, ui">
    <meta name="author" content="solutionportal">
    <meta content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=no, width=device-width" name="viewport">
    <!-- <base href="/"> -->

    <title>首页</title>
    
    <!-- Icon -->
    <link rel="shortcut icon" href="https://www.mcdonalds.com.cn/favicon.ico" type="image/x-icon" /> 

    <!-- Icons -->
    <link rel="stylesheet" type="text/css" href="http://www.jq22.com/jquery/font-awesome.4.6.0.css">
    
    <!-- Set this in dist folder in index.html file -->
    <link href="styles/bootstrap.min.css" rel="stylesheet">
    
    <!-- Match Media polyfill for IE9 -->
    <!--[if IE 9]><!-->
    <script src="scripts/ie/matchMedia.js"></script>
    <!--<![endif]-->

    <script src='/google_analytics_auto.js'></script>
	
</head>

<body ng-app="app" id="app" class="app {{themeActive}}" custom-page ng-controller="AppCtrl">
	<input type="hidden" id="path" value="<%=basePath%>">
	<input type="hidden" id="user" value="<%=username%>">
    <header class="site-head clearfix" id="site-head" ng-controller="HeadCtrl" ng-include=" 'views/header.jsp' ">
    </header>

    <div class="main-container clearfix">
        <h1>欢迎：<%=username %></h1>

    </div>
    
    <!-- Set this in dist index.html -->
    <script src="scripts/jquery-1.11.1.min.js"></script>
    <script src="scripts/bootstrap.min.js"></script>
	<!-- layer -->
    <script src="scripts/layer/layer.js"></script>
    <script src="scripts/laydate/laydate.js"></script>
	
    <!-- !End -->
</body>

</html>