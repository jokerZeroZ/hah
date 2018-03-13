<%@page import="java.io.IOException"%>
<%@page import="java.io.BufferedOutputStream"%>
<%@page import="java.io.OutputStream"%>
<%@page contentType="text/html; charset=utf-8"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.File"%>
<%@page import="com.chinacreator.xtbg.core.common.util.DataControlUtil"%>
<%
String path= DataControlUtil.pageUnEscape(request.getParameter("path"));
String RealFileName= DataControlUtil.pageUnEscape(request.getParameter("RealFileName"));
try {
	/**
	2013-12-03 edit by hai.huang begin +++++++++++++++++++++++++++++++++++++++++++++
	解决：  升级新版本上传代码后，导致使用旧版本时上传文档无法下载的问题;
		  文件不存时，返回前一个页面。
	说明：先检查文件能否找到，找不到时，用老的文件名下载  
	*/
	File tmpfile = new File(path);
	if(!tmpfile.exists()){//找不到时，改为老的文件名
		path=path.replace(tmpfile.getName(),RealFileName);// path是指欲下载的文件的路径。
	}
    // path是指欲下载的文件的路径。
	File file = new File(path);
	if(file.exists()){
	    // 取得文件名。
	    String filename = file.getName();
	    // 取得文件的后缀名。
	    String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();
	    // 以流的形式下载文件。
	    FileInputStream fileInputStream=new FileInputStream(file);
	    InputStream fis = new BufferedInputStream(fileInputStream);
	    byte[] buffer = new byte[fis.available()];
	    fis.read(buffer);
	    fis.close();
	    // 清空response
	    response.reset();
	    // 设置response的Header
	    response.addHeader("Content-Disposition", "attachment;filename=" + new String(RealFileName.getBytes("GBK"), "ISO8859-1"));
	    response.addHeader("Content-Length", "" + file.length());
	    OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
	    response.setContentType("application/octet-stream;charset=GBK");
	    toClient.write(buffer);
	    toClient.close();
	    out.clear();  
	    out = pageContext.pushBody();
	}else{
%>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<title>Document</title>
		</head>
		<script>
			alert("文件不存在！");
			history.go(-1);
		</script>
		</html>
<%		
	}
} catch (IOException ex) {
    ex.printStackTrace();
}
%>
