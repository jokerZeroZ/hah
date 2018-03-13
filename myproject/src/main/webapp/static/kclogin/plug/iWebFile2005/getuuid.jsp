
<%@page import="com.chinacreator.xtbg.pub.jqueryupload.utils.FileUtils"%>
<%@page import="com.chinacreator.security.AccessControl"%>
<%@page import="com.alibaba.fastjson.JSONObject"%><%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
AccessControl accesscontroler = AccessControl.getInstance();
accesscontroler.checkAccess(request, response);
	String uuid = FileUtils.randomUUID();

	JSONObject jsonObj = new JSONObject();
	jsonObj.put("uuid",uuid);
	//System.out.println(uuid);
	response.getWriter().print(jsonObj);

%>