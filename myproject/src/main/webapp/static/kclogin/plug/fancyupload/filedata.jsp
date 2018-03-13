<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@page import="com.chinacreator.xtbg.core.common.fancyuoload.service.impl.FiletransferServiceImpl"%>
<%@page import="com.chinacreator.xtbg.core.common.fancyuoload.entity.FileInfoBean"%>
<%@page import="com.chinacreator.xtbg.core.common.fancyuoload.dao.FiletransfersSysDao"%>
<%@page import="com.chinacreator.xtbg.core.common.fancyuoload.dao.impl.FiletransfersSysDaoImpl"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="com.alibaba.fastjson.*"%>
<%
/**
* Description	上传文件数据请求接口
* author 		孙勇
**/
response.setHeader("Cache-Control", "no-cache"); 
response.setHeader("Pragma", "no-cache"); 
response.setDateHeader("Expires", -1);  
response.setDateHeader("max-age", 0);
response.setContentType("text/html;charset=gb2312");
try{
	request.setCharacterEncoding("utf-8");
	String opt = request.getParameter("opt");
	String buessid = request.getParameter("buessid");
	String fileid = request.getParameter("fileid");
	String newbuessid = request.getParameter("newbuessid");
	Map<String, Object> jsonMap = new HashMap<String, Object>();
	FiletransfersSysDao dao = new FiletransfersSysDaoImpl();
	FileInfoBean fiBean = dao.getFileByDjsn(fileid);
	if("delete".equals(opt)){//单个文件删除
		String  mFilePath = request.getSession().getServletContext().getRealPath("") ;  //取得服务器路径
		boolean bSuccess = dao.delFileOnSever(mFilePath+FiletransferServiceImpl.upload_To_SeverPath+fiBean.getDjsn()+fiBean.getExtend());
		bSuccess = bSuccess && dao.delFileByDjsn(null,fileid);
		jsonMap.put("bSuccess", bSuccess);
	} else if("deletes".equals(opt)){//根据业务id删除业务id相关的所有附件
		//modify by shuqi.liu 根据业务id删除磁盘文件
		String  mFilePath = request.getSession().getServletContext().getRealPath("") ;  //取得服务器路径
		List<FileInfoBean> flist = dao.getFileInfoBeanlist(buessid);
		for(FileInfoBean fbean:flist){
			dao.delFileOnSever(mFilePath+FiletransferServiceImpl.upload_To_SeverPath+fbean.getDjsn()+fbean.getExtend());
		}
		boolean bSuccess = dao.delFileByDjbh(null,buessid);
		jsonMap.put("bSuccess", bSuccess);
	} else if("files".equals(opt)){
		List<FileInfoBean> rows = dao.getFileInfoBeanlist(buessid);
		jsonMap.put("rows", rows);
	}else if("copy".equals(opt)){
		boolean bSuccess = dao.copyFileInfo(newbuessid,buessid);
		jsonMap.put("bSuccess", bSuccess);
	}
	
	ServletOutputStream outputStream = response.getOutputStream();
	String json = JSON.toJSONString(jsonMap, true); //fastJson包处理方式
	JSONObject jsonObject = JSONObject.parseObject(json);//fastJson包处理方式
	InputStream inputStream = new ByteArrayInputStream(jsonObject.toString().getBytes("gbk"));
	byte[] buffer = new byte[1024];
	int i = -1;
	while ((i = inputStream.read(buffer)) != -1) {
		outputStream.write(buffer, 0, i);
	}
	outputStream.flush();
	outputStream.close();
	inputStream.close();
	outputStream = null;
	out.clear();
	out = pageContext.pushBody();
} catch (Exception e){
	e.printStackTrace();
}
%>