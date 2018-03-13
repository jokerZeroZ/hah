<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.chinacreator.security.AccessControl"%>
<%@ page import="com.chinacreator.xtbg.core.common.util.StringUtil"%>
<%
	AccessControl accesscontroler = AccessControl.getInstance();
	accesscontroler.checkAccess(request, response);

	String fileName ="";
	String fileUrl ="";
	String progId = "";
	String filetype = StringUtil.deNull(request.getParameter("fileType"));//如果filetype参数为空,默认为word文档.
	if (filetype.equalsIgnoreCase("excel")) {
		progId = "Excel.Sheet";
		fileName = "新建Excel文档.xls";
	} else if (filetype.equalsIgnoreCase("word")) {
		progId = "Word.Document";
		fileName = "新建word文档.doc";
	} else if (filetype.equalsIgnoreCase("ppt")) {
		progId = "PowerPoint.Show";
		fileName = "新建ppt文档.ttp";
	} else {
		progId = "Word.Document";
		filetype = "word";
		fileName = "新建word文档.doc";
	}
	
	String contextPath = (String) request.getContextPath();
	String path = "/servlet/UploadOffice";
	String servletPath = contextPath + path;
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>office文档编辑</title>
<!--设置缓存-->
<meta http-equiv="cache-control" content="no-cache,must-revalidate">
<meta http-equiv="pragram" content="no-cache">
<meta http-equiv="expires" content="0">
<SCRIPT LANGUAGE="JavaScript" src="js/commonoffice.js"></SCRIPT>
<script type="text/javascript">
	function saveOfficeFile(){
		var formObj = document.getElementById("form1");
		var result = saveFile(formObj,"upLoadFile","","<%=fileName %>");
		alert(result);
	}
	
	function onPageClose(){
		if(!OFFICE_CONTROL_OBJ.activeDocument.saved){
			if(confirm( "文档修改过,还没有保存,是否需要保存?")){
				saveOfficeFile();
			}
		}
	}
</script>
</head>
<body onload='createFile("<%=progId %>");' onbeforeunload ="onPageClose()">
	<form id="form1" action="<%=servletPath %>?className=com.chinacreator.xtbg.core.common.ntkooffice.services.impl.UploadOfficeDemoService"
		enctype="multipart/form-data" style="padding: 0px; margin: 0px;">
		<div id="editmain" class="editmain">
		 <div id="editmain_top" class="editmain_top">
                <div id="edit_button_div" class="edit_button_div">
                <input type="button" onclick="saveOfficeFile();" value="保存office文档" />
                </div>
        </div>
			<div id="editmain_middle" class="editmain_middle">
				<div id="editmain_right" class="editmain_right">
					<div id="formtop">
						<table>
							<tr>
								<td colspan="5" class="edit_tabletitle">文件表单数据:</td>
							</tr>
							<tr>
								<td colspan="5">&nbsp;</td>
							</tr>
							<tr>
								<td width="7%">文&nbsp;件&nbsp;ID:</td>
								<td width="20%"><input name="fileId" id="fileId"
									type="text" value="" /></td>
								<td width="8%">文件名称:</td>
								<td width="40%"><input name="filename" id="filename"
									type="text" value="" /></td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>其它数据:</td>
								<td><input id="otherData" name="otherData" align="left"
									type="text" value="" /></td>
								<td>上传文件:</td>
								<td><input class=fileup name="attachFile" type=file
									id="attachFile" />&nbsp;(选择附件)<br>
								<input name="attachFileDescribe" type=text id=attachFileDescribe
									value="">&nbsp;(附件说明)</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>文档附件:</td>
								<td colspan="4"></td>
							</tr>
						</table>
					</div>
					<div id="officecontrol" style="height: 600px;width: 800px;">
						<script language="javascript" type="text/javascript" src="js/ntkoofficecontrol.js"></script>
						<div id=statusBar style="height: 20px; width: 100%; background-color: #c0c0c0; font-size: 12px;"></div>
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>
