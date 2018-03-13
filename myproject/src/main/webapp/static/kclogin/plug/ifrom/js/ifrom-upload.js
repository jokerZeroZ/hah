//支持大附件上传的js的定义
var IWEBFILE2005PATH = "/iWebFile2005/";
var FILETYPE_FILE = "file";
var FILETYPE_FOLDER = "folder";
var WEBPATH = "/ccapp/oa/upload/jsp/";
var DICTDATA_VALUE = "upload";
var PATHUP = "/ccapp/oa/resources/plug/iWebFile2005/iWebServer.jsp";
var urlpath = getProjectName() + "/ccapp/oa/resources/plug" + IWEBFILE2005PATH;
//载入页面时初始化
jQuery(function () {
    Load();
    //$("#fileupload").attr("name","fileupload");
});
/**
 * [downloadaftercallback 下载点击后的调用的函数。
 * 如有业务需求，在页面自行重载，但重载的函数记得放在该js之后]
 */
function downloadaftercallback(){
}
/**
 * [addfile 按钮事件调用方法]
 * @return {[type]} [description]
 */
function addfile(){
	
	clearfileuploadvalue('fileupload')
	return $("#fileupload").click();
}
function clearfileuploadvalue(obj) {
    var arrFrom = $("form");
    for(var i=0;i<arrFrom.length;i++){
        if(!IsSpace(document.getElementById(''+arrFrom[i].id)) && !IsSpace(document.getElementById(''+arrFrom[i].id).fileupload)){
            var obj = document.getElementById(''+arrFrom[i].id).fileupload;
            obj.outerHTML = obj.outerHTML;
            document.getElementById(''+arrFrom[i].id).fileupload.value = "";
        }
    }

  /* var o = document.getElementById('fileupload')
  if ( !! document.all) {
    o.select();
    document.execCommand("delete");
  } else {
    o.value = '';
  } */
}
document.write("<script type='text/javascript' src='" + getProjectName() + "/ccapp/oa/resources/util/uuid.js'></script>")
//得到当前项目名
function getProjectName() {
    return "/" + window.location.pathname.substring(1).split("/")[0];
}
//得到带全路径的url
function getLocation() {
    return "http://" + window.location.host + getProjectName();
}
//初始化
function Load() {
    iWebFile.WebUrl = 'iWebServer.jsp'; //设置处理页路径，本处可以支持相对路径
    iWebFile.ShowInterface = false; //是否显示界面
    iWebFile.ShowBreakpointMsg = true; //是否断点续传
    //控制控件允许上传的文档类型。默认情况下为全部文件类型('所有文件|*.*')。 
}
/*
 函数:  editFile
 说明:  查看文件
 */
function editFile(url, FileName) {
    window.open(getProjectName() + "/servlet/pubFileDownload?djsn=&openType=onlinebyupload&FileName=editfile&strfilepath=" + encodeURI(url + FileName) + "&fileName=" + encodeURI("查看file"), "_blank", "width=" + window.screen.availWidth + ",height=" + window.screen.availHeight + ",left=0px,top=0px");
}
/*
 函数:  downloadFile
 说明:  下载文件
 */
function downloadFile(url, FileName, RealFileName,downloadaftercallback) {
	downloadaftercallback!=undefined && downloadaftercallback && downloadaftercallback();
    location.href = urlpath + 'download.jsp?RealFileName=' + _pub.lang.zwzm(RealFileName) + '&path=' + _pub.lang.zwzm(url + FileName);
}
/**
 * [ajaxDispUploadFiles 加载上传文件列表]
 * @param  {[type]}   tableName  [模块表名]
 * @param  {[type]}   attach_id  [附件主id]
 * @param  {[type]}   oType      [1，有预览、下载权限;2，只读权限]
 * @param  {[type]}   _showfiles [显示位置]
 * @param  {Function} callback   [回调函数]
 * @return {[type]}              [description]
 */
function ajaxDispUploadFiles(tableName, attach_id, oType, _showfiles,callback) {
    var url = urlpath + 'queryuploadlistbyattachid.jsp';
    jQuery.ajax({
        type: "post",
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            tableName: tableName,
            attach_id: attach_id
        },
        dataType: "json",
        success: function (result) {
            if (result.flag) {
                jQuery("#_fileshowul").html(""); //删除后要先清空，再加载现有的
                if (_showfiles != "_showfiles" && _showfiles != "_showfilesAll" ) {
                    if (result.uploadListMapsize > 8) {
                        _showfiles = _showfiles + "_da";
                        callback("_da");
                    } else {
                        _showfiles = _showfiles + "_xiao";
                        callback("_xiao");
                    }
                }
                for (var i = 0; i < result.uploadListMapsize; i++) {
                    var fileid = result.uploadListMap[i].file_id;
                    var yearfolder = result.uploadListMap[i].yearfolder;
                    var monthfolder = result.uploadListMap[i].monthfolder;
                    var rootPath = result.rootPath;
                    var UPLOADSAVEPATH = result.UPLOADSAVEPATH;
                    var FileName = result.uploadListMap[i].filename;
                    var file_extra = result.uploadListMap[i].file_extra;
                    var file_size = result.uploadListMap[i].file_size;
                    var newFN = fileid + "." + file_extra;
                    var url = rootPath + UPLOADSAVEPATH + tableName + "/" + yearfolder + "/" + monthfolder + "/" + attach_id + "/";
                    if (_showfiles != "_showfiles" && _showfiles != "_showfilesAll") { //
                        append2_showfiles_DIV(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN);
                    } else { //编辑会议 加载左边附件列表
                        if (_showfiles == "_showfilesAll"){
                            append2_showfilesAll(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN);
                        }else{
                            append2_showfiles(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN);
                        }
                        
                    }
                }
            } else {
                alert(result.info);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统异常请稍后再试！");
        }
    });
}


//在Vista下上传文档时获取文件名和路径
function getFullPath(obj) {
    if (obj) {
        //ie 
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        }
        //firefox 
        else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}



/*
 * 函数名：上传文件
 * file
 * rootPath       根目录磁盘路径
 * zj_id          附件id
 * oType       是否直接加载附件列表
 */
function UpLoadBigFile(tableName, file, rootPath, zj_id, oType, _showfiles) {
    var mServerUrl = getLocation() + PATHUP;
    var departid = ""; //预留字段 ，暂无用
    var exttype = file.split('.')[file.split('.').length - 1];
    var FileName;
    if (oType == undefined || oType == null) {
        oType = "0";
    }
    var uuid = Math.uuidCompact();
    //取得需要上传的文件名
    FileName = file.substring(file.lastIndexOf("\\") + 1);
    var file_exttype = FileName.split(".")[FileName.split(".").length - 1];
    newFN = uuid + "." + file_exttype;
    FileName=FileName.replaceAll(' ','_');
    //检测文件是否存在
    if (iWebFile.WebCheckFile(file)) {
        if (!checkString(FileName)) {
            //如果需要保存到其他目录，可以在此设置路径参数.
            iWebFile.SetMsgByName("uuid", uuid); //传到后台，使用uuid完成保存 不带扩展名
            iWebFile.SetMsgByName("newFN", zj_id + "/" + newFN); //新文件名带附件目录名和扩展名
            iWebFile.SetMsgByName("FILE_REALNAME", zj_id + "/" + FileName);
            iWebFile.SetMsgByName("rootPath", rootPath);
            iWebFile.SetMsgByName("departid", departid);
            iWebFile.SetMsgByName("attach_id", zj_id);
            iWebFile.SetMsgByName("tableName", tableName);
            //在服务器上就可以通过GetMsgByName("FILEPATH")，取得文件保存路径myfile，然后进行保存操作
            iWebFile.WebUrl = mServerUrl;
            iWebFile.MaxSize = 0;
            if (iWebFile.WebPutFile(file, FileName)) {
                if (iWebFile.GetMsgByName("RESULT") == "ok") {
                    //alert("文件上传成功！");
                }
                if ("1" === oType || "0" === oType || "2" === oType) {
                    var fileid = iWebFile.GetMsgByName("fileid");
                    var UPLOADSAVEPATH = iWebFile.GetMsgByName("UPLOADSAVEPATH");
                    var yearfolder = iWebFile.GetMsgByName("yearfolder");
                    var monthfolder = iWebFile.GetMsgByName("monthfolder");
                    var attach_id = zj_id;
                    var file_size = iWebFile.GetMsgByName("file_size");
                    var url = rootPath + UPLOADSAVEPATH + tableName + "/" + yearfolder + "/" + monthfolder + "/" + attach_id + "/";
                    if(_showfiles!="_showfiles"){
                        append2_showfilesAll(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN);
                    }else{
                        append2_showfiles(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN);
                    }
                }
            } else {
                alert(iWebFile.MsgError());
            }
        } else {
            //return;
        }
    } else {
        alert("文件" + file + "没有找到!");
    }
}

//上传完成后回填到ul容器中显示------左边的
function append2_showfiles(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN) {
    jQuery("#" + _showfiles).prepend("<li  id='p_" + fileid + "'><span>(" + file_size + "K)&nbsp;<a href='#' onclick=deleteFiles('" + fileid + "','" + tableName + "','" + attach_id + "','" + urlpath + "delete.jsp')><font color='#3c86db'>删除</font></a></span><a href='#'>" + FileName + "</a></li>");
}
function append2_showfilesAll(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN) {
    jQuery("#" + _showfiles).prepend("<li  id='p_" + fileid + "'><span>(" + file_size + "K)&nbsp;<a href='#' onclick=deleteFiles('" + fileid + "','" + tableName + "','" + attach_id + "','" + urlpath + "delete.jsp')><font color='#3c86db'>删除</font></a>&nbsp;<a href='#' id=downloadButton style='CURSOR: pointer'  onclick=downloadFile('" + url + "','" + newFN + "','" + FileName + "',downloadaftercallback)><font color='#3c86db'>下载</font></a></span><a href='#'>" + FileName + "</a></li>");
}
//上传完成后回填到ul容器中显示------右边的  分大和小
function append2_showfiles_DIV(url, FileName, fileid, tableName, attach_id, oType, file_size, _showfiles, newFN) {
    if (oType === '1') { //有预览、下载权限
        if(FileName.toLowerCase().lastIndexOf(".doc")!=-1){
            jQuery("#" + _showfiles).prepend("<div title='" + FileName + "' id='p_" + fileid + "' class='news_fujian'><p class='news_fujian_top'>" + FileName + "</p><p class='news_fujian_bottom'><span class='font1'>" + file_size + "K</span>&nbsp;<b><a href='#' id=downloadButton style='CURSOR: pointer'  onclick=downloadFile('" + url + "','" + newFN + "','" + FileName + "',downloadaftercallback)><font color='#3c86db'>下载</font></a>&nbsp;<a href='#' id=editButton style='CURSOR: pointer'  onclick=editFile('" + url + "','" + newFN + "')><font color='#3c86db'>预览</font></a></b></p></div>");    
        }else{
            jQuery("#" + _showfiles).prepend("<div title='" + FileName + "' id='p_" + fileid + "' class='news_fujian'><p class='news_fujian_top'>" + FileName + "</p><p class='news_fujian_bottom'><span class='font1'>" + file_size + "K</span>&nbsp;<b><a href='#' id=downloadButton style='CURSOR: pointer'  onclick=downloadFile('" + url + "','" + newFN + "','" + FileName + "',downloadaftercallback)><font color='#3c86db'>下载</font></a>&nbsp;</b></p></div>");
        }
    } else if (oType === '2') { //只读权限
        jQuery("#" + _showfiles).prepend("<div title='" + FileName + "' id='p_" + fileid + "' class='news_fujian'><p class='news_fujian_top'>" + FileName + "</p><p class='news_fujian_bottom'><span class='font1'>" + file_size + "K</span>&nbsp;<b><a href='#' id=downloadButton style='CURSOR: pointer'  onclick=downloadFile('" + url + "','" + newFN + "','" + FileName + "',downloadaftercallback)><font color='#3c86db'>下载</font></a>&nbsp;<a href='#'><font color='#3c86db'></font></a></b></p></div>");
    }
}

/*
 函数:  deleteFiles
 说明:  下载文件
 */
function deleteFiles(file_id, tableName, attach_id, url, p_file_id) {
    if (!confirm("确定要删除上传文件吗？")) {
        return;
    }
    jQuery.ajax({
        type: "post",
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            file_id: file_id,
            tableName: tableName,
            attach_id: attach_id
        },
        dataType: "json",
        success: function (result) {
            if (result.flag) {
				PubOPT.showTip("aa", ""+result.info, 1);
                if ($("#p_" + file_id) != null && $("#p_" + file_id) != undefined) $("#p_" + file_id).remove(); //删除div
            } else {
				PubOPT.showTip("aa", ""+result.info, 1);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统异常，请稍后再试！");
        }
    });
}

//验证字符串中是否包含了特殊字符
function checkString(source) {
    //var arr = new Array("@", "#", "$", "%", "^", "&", "*", "|", " ", "/", ":", "'", "\"", "?", "<", ">", "(", ")", "+", "{", "}", "[", "]", "【", "】", "——");
    var arr = new Array("@", "#", "$", "%", "^", "&", "*", "|", "/", ":", "'", "\"", "?", "<", ">", "(", ")", "+", "{", "}", "[", "]", "【", "】", "——");
    var len = arr.length;
    var Flag = false;
    for (var i = 0; i < len; i++) {
        if (source.indexOf(arr[i]) >= 0) {
            alert("文件名中包含特殊字符,请更改文件名再上传！");
            Flag = true;
            break;
        }
    }
    return Flag; //包含了特殊字符就返回true;否则返回false
}
//查看附件
function openuploadlist(path, tableName, attach_id, oType) {
    var backFn = function () {
        callajaxUploadFile();
    };
    var windowId = 'openuploadlistWindow';
    var url = '?windowId=' + windowId + '&tableName=' + tableName + '&attach_id=' + attach_id + '&oType=' + oType;
    openAlertWindows(windowId, path + 'uploadquerylist.jsp' + url, '查看附件', 1020, 530, '10%', '10%', backFn);
}
//清理附件
function cleanfile() {
    if (!confirm("确定要清理附件吗？")) {
        return;
    }
    var url = urlpath + "clean.jsp";
    jQuery.ajax({
        type: "post",
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            action: "clean"
        },
        dataType: "json",
        success: function (result) {
            alert(result.info);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统异常，请稍后再试！");
        }
    });
}