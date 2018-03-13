
<%@page import="com.chinacreator.xtbg.core.common.iweboffice.IWebOffice"%>
<%
IWebOffice officeServer = new IWebOffice();
officeServer.ExecuteRun(request,response);
out.clear(); 
out=pageContext.pushBody();
%>