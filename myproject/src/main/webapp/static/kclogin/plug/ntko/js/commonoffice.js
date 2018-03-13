/**
　* fileName: commonoffice.js
　* version: 1.0
　* author: 王博
　* date: 2013-10-15
　* description: ntko 控件所有office操作函数
　*/

var OFFICE_CONTROL_OBJ;// 控件对象
var IsFileOpened;      // 控件是否打开文档
var fileType;		   //文档类型

/**
 * 创建一个新文档对象
 * @param progId
 * 必须指定progId。常用的progId有：
 *  Office Document 	Type progId
 *	Word文档：			“Word.Document”
 *	PowerPoint幻灯片：		“PowerPoint.Show”
 *	Excel工作表：			“Excel.Sheet”
 *	Excel图表： 			"Excel.Chart"
 *	Visio画图： 			"Visio.Drawing"
 *	MS Project项目：		"MSProject.Project"
 *	WPS2003文档：			"WPSFile.4.8001"
 *	WPS2005,2007文档：	"WPS.Document"
 *	金山电子表2003：		"ET.Sheet.1.80.01.2001"
 *	金山电子表2005,2007：	"ET.WorkBook"
 */
function createFile(progId){
	OFFICE_CONTROL_OBJ = document.getElementById("TANGER_OCX");
	OFFICE_CONTROL_OBJ.CreateNew(progId);
	fileType = progId;
	OFFICE_CONTROL_OBJ.activeDocument.saved=true;//saved属性用来判断文档是否被修改过,文档打开的时候设置成ture,当文档被修改,自动被设置为false,该属性由office提供.
	setFileOpenedOrClosed(true);
}

/**
 * 在线打开文档
 * @param fileUrl 文档路径
 */
function openFile(fileUrl){
	OFFICE_CONTROL_OBJ.BeginOpenFromURL(fileUrl);
}

/**
 * 设置文档是否关闭
 * @param bool
 */
function setFileOpenedOrClosed(bool){
	IsFileOpened = bool;
}

function trim(str){//删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 保存文档
 * @param formObj	页面表单对象
 * @param fileFieldName	文件域的id，类似<input type=file name=upLoadFile 中的name  自定义
 * @param prama 可选参数 与控件一起提交的参数如："p1=a&p2=b&p3=c"
 * @param fileName	上传文件的名称，类似<input type=file 的value
 * @returns
 */
function saveFile(formObj,fileFieldName,prama,fileName){
	var url = formObj.action;//提交到的url地址
	var formId = formObj.id;
	var result = OFFICE_CONTROL_OBJ.saveToURL(url,fileFieldName,prama,fileName,formId);
	return trim(result);
}