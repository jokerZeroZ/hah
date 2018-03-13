<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="com.chinacreator.xtbg.core.upload.util.iWebFile"%>
<%
	out.clear();
	iWebFile iwebfile = new iWebFile();
	iwebfile.ExecuteRun(request, response);
	out = pageContext.pushBody();
%>