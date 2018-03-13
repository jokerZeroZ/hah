<%@page contentType="text/html;charset=utf-8" language="java"%>
<%@page import="com.chinacreator.security.AccessControl"%>
<%@page import="com.chinacreator.xtbg.core.upload.util.*"%>
<%@page import="com.chinacreator.xtbg.core.upload.dao.UploadDao"%>
<%@page import="com.chinacreator.xtbg.core.common.util.StringUtil"%>
<%@page import="com.chinacreator.xtbg.core.common.util.DaoUtil"%>
<%@page import="com.chinacreator.xtbg.core.common.startup.LoadSpringContext"%>
<%@page import="com.chinacreator.xtbg.core.common.util.DbManager"%>
<%@page import="com.alibaba.fastjson.JSONObject"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.io.File"%>
<%
	AccessControl accesscontroler = AccessControl.getInstance();
	accesscontroler.checkAccess(request, response);
	String file_id = StringUtil.deNull(request.getParameter("file_id"));
	String tableName = StringUtil.deNull(request.getParameter("tableName"));
	String attach_id = StringUtil.deNull(request.getParameter("attach_id"));
	String strFolder = DaoUtil.sqlToField("select t.file_id || '.' || t.file_extra || ',/'||t.yearfolder||'/'||t.monthfolder||'/' from "+tableName+" t where t.file_id ='"+file_id+"'");
	String filepos = strFolder.split(",")[0];
	String strFolder4ym = strFolder.split(",")[1];
	String realPath = request.getSession().getServletContext().getRealPath("");
	String path ="";
	path = realPath+UploadConstants.UPLOADSAVEPATH+tableName+strFolder4ym+attach_id+"/"+filepos; 
	UploadDao uploadDao = (UploadDao)LoadSpringContext.getApplicationContext().getBean("uploadDaoImpl");
	Connection conn = null;
	boolean flag = false;
	JSONObject json = new JSONObject();
	try {
		conn = DbManager.getInstance().getConnection();
		if (uploadDao.deleteUploadById(conn,tableName,file_id)){
			if(!StringUtil.nullOrBlank(path)){
				File file = new File(path);
				File fileDir = file.getParentFile();
				if(file.exists()){//删除文件
					file.delete();
				}
				if(fileDir.listFiles().length == 0){ //删除文件夹
					fileDir.delete();
				}
				request.getSession().removeAttribute(request.getSession().getId() + attach_id+"/"+filepos);
				request.getSession().removeAttribute(request.getSession().getId() + attach_id+"/"+filepos+"UUID-NAME");
				json.put("info","删除上传文件记录和物理文件成功！");
				flag=true;
			}
		}
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
