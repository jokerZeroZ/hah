<%@page contentType="text/html;charset=utf-8" language="java"%>
<%@page import="com.chinacreator.security.AccessControl"%>
<%@page import="com.chinacreator.xtbg.core.upload.util.*"%>
<%@page import="com.alibaba.fastjson.JSONObject"%>
<%@page import="com.chinacreator.xtbg.core.upload.service.*"%>
<%@page import="com.chinacreator.xtbg.core.upload.service.impl.*"%>
<%
	JSONObject json = new JSONObject();
	UploadService uploadService = new UploadServiceImpl();
	String diskPath = request.getSession().getServletContext().getRealPath("");
	json = uploadService.cleanFile(diskPath);
	out.print(json);
%>
