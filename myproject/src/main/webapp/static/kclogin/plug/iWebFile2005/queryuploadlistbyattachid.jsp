<%@page contentType="text/html;charset=utf-8" language="java"%>
<%@page import="com.chinacreator.security.AccessControl"%>
<%@page import="com.chinacreator.xtbg.core.upload.util.*"%>
<%@page import="com.chinacreator.xtbg.core.upload.dao.UploadDao"%>
<%@page import="com.chinacreator.xtbg.core.upload.entity.UploadModel"%>
<%@page import="com.chinacreator.xtbg.core.common.util.StringUtil"%>
<%@page import="com.chinacreator.xtbg.core.common.util.DaoUtil"%>
<%@page import="com.chinacreator.xtbg.core.common.startup.LoadSpringContext"%>
<%@page import="com.chinacreator.xtbg.core.common.util.DbManager"%>
<%@page import="com.alibaba.fastjson.JSONObject"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.io.File"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%
	AccessControl accesscontroler = AccessControl.getInstance();
	accesscontroler.checkAccess(request, response);
	String tableName = StringUtil.deNull(request.getParameter("tableName"));
	String attach_id = StringUtil.deNull(request.getParameter("attach_id"));
	UploadDao uploadDao = (UploadDao)LoadSpringContext.getApplicationContext().getBean("uploadDaoImpl");
	Connection conn = null;
	boolean flag = false;
	JSONObject json = new JSONObject();
	String rootPath = request.getSession().getServletContext().getRealPath("");
	rootPath = rootPath.replace("\\", "/");
	try {
		conn = DbManager.getInstance().getConnection();
		List<Map<String, String>> uploadListMap = uploadDao.queryUploadListByAttachId(conn,tableName,attach_id);
		flag=true;
		json.put("uploadListMap",uploadListMap);
		json.put("rootPath",rootPath);
		json.put("UPLOADSAVEPATH",UploadConstants.UPLOADSAVEPATH);
		json.put("uploadListMapsize",uploadListMap.size());
	} catch (Exception e) {
		json.put("info",e.getMessage());
	    DbManager. rollBackNoThrow(conn);
	} finally {
		if(conn!=null){
	        DbManager. closeConnection(conn);
	    } 
	}	
	json.put("flag",flag);
	out.print(json);
%>
