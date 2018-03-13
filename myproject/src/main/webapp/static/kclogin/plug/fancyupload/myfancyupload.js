var MyFancyupload = {
	rootPath : null,	//项目根路径
	operType : null,  //在线编辑(支持word,excel)  
	/**
	 * 创建上传插件
	 * @param {} list		上传列表展示ID
	 * @param {} attachs	上传按钮ID
	 * @param {} rootPath	项目根路径
	 * @param {} url		上传路径
	 * @param {} allowDel	是否容许删除
	 * @param {} buessid	业务ID
	 * @return {}			返回上传控件对象
	 * @param () callback   添加成功时回调方法  
	 * @param () operType 附件操作类型operType 第一位，删除 第二位，查看 第三位，下载 1是设置是，0是否  例如要定义成 删除 下载 那么传101 删除查看下载 111 默认为111 全部权限。 
	 * @param () callback   删除成功时回调方法  
	 * @param boolean convertToTif 是否将上传的文件转换为tif  true：是，false：否（默认值   ）
	 */
	createUpload : function (list, attachs, rootPath, url, allowDel, buessid, typeFilter, callback,operType,delCallBack,convertToTif){
		//add by shuqi.liu附件操作类型operType 0，删除 1，查看 2，下载  例如要定义成 删除 下载 那么传02 删除查看下载 012 默认为012 全部权限。
		This = this;
		this.rootPath = rootPath;
		this.operType = operType;
		var foTifFlag = (convertToTif === true || false);//是否将文件转换为tif的标示		
		if(foTifFlag){		
			url = url.replaceAll("&convertToTif=1","");//替换掉可能已存在的参数
		   	url = url+"&convertToTif=1";
		}
				
		var config = {
				//upload File(size is 213MB) need 39s,default timeLimit is 30s{update by(http://digitarald.de/project/fancyupload/)}
				timeLimit:300,
				path: rootPath+'/ccapp/oa/resources/plug/fancyupload/source/Swiff.Uploader.swf',
				url: url,
				convertToTif : foTifFlag,//是否转换为tif的标志
				fileSizeMax: 500 * 1024 * 1024,
				verbose: true,
				allowDuplicates:true,
				callback: callback,
				delCallBack: delCallBack,
				onSelectFail: function(files) {//当选择文件不合格事件
					files.each(function(file) {
						new Element('li', {
							'class': 'file-invalid',
							events: {
								click: function() {
									this.destroy();
								}
							}
						}).adopt(
							new Element('span', {html: file.validationErrorMessage || file.validationError})
						).inject(this.list, 'bottom');
					}, this);	
				},
				onSelectSuccess : function(files){
					//debugger;
					//if(foTifFlag){
					//	config.url = config.url.replaceAll("&convertToTif=1","");//替换掉可能已存在的参数
					//   if(confirm("是否将文件自动转换为TIF格式")){						   
					//	   config.url = config.url+"&convertToTif=1";
					//   }
					//}
				},
				onFileSuccess: function(file, response) {//当文件上传成功事件
					var data = MyFancyupload.evalJSON(response);
					file.ui.element.set('id', data.djsn);
					//modify by shuqi.liu 加入参数\""+data.filename+"\"，把文件名作为参数传递 
					file.ui.element.set('html',data.filename);
					This.creatOperType(file.ui.element,operType,data,delCallBack);//创建按钮
					file.ui.element.highlight('#e6efc2');
					if(typeof callback =="function"){
						callback(data.djsn,data.filetype,data.filename);
					}
				},
				onFileError: function(file) {//当文件上传错误事件
					file.ui.cancel.set('html', '重试').removeEvents().addEvent('click', function() {
						file.requeue();
						return false;
					});
					
					new Element('span', {
						html: file.errorMessage,
						'class': 'file-error'
					}).inject(file.ui.cancel, 'after');
				},
				
				onFileRequeue: function(file) {//当在文件上传队列中
					file.ui.element.getElement('.file-error').destroy();
					
					file.ui.cancel.set('html', '取消').removeEvents().addEvent('click', function() {
						file.remove();
						return false;
					});
					
					this.start();
				}
			}
		if(typeFilter){
			config.typeFilter = typeFilter;
		}
		var up = new FancyUpload3.Attach(list, attachs, config);
		
		if(buessid){//如果业务ID存在，将数据库中已上传文件进行加载
			var rows = this.getBuessidFiles(buessid);
			for(var i=0; i<rows.length; i++){
				var el = new Element('li', {
					'class': 'file',
					id: rows[i].djsn,
					//modify by shuqi.liu 加入参数\""+rows[i].filename+"\"，把文件名作为参数传递 
					html: rows[i].filename
				}).inject(up.list, 'bottom');
				This.creatOperType(el,operType,rows[i],delCallBack);//创建按钮
			}
		}
		
		return up;
	},
	
	creatOperType:function(el,operType,datas,delCallBack){//创建操作按钮
		var data = datas;
		if(operType){
			var operTypes = operType.split(""); 
			if(operTypes.length == 3){
				for (var i = 0; i < operTypes.length; i++){ 
					if(operTypes[i] == "1"){//删除
						if(i==0){//删除
							el.adopt(
									new Element('span', {
										html: "&nbsp;&nbsp;<span style='cursor:pointer;'><font color='red'>删除<font></span>",
										events: {
											click: function(){
												if(confirm("您确定要删除附件吗？")){
													MyFancyupload.deleteFile(this.getParent().id);
													this.getParent().destroy();
													if(typeof delCallBack =="function"){
														delCallBack();
													}
												}
											}
										}
									})
							);
						}else if(i==1){
							el.adopt(
									new Element('span', {
										html: "&nbsp;&nbsp;<span style='cursor:pointer;'><font color='red'>查看<font></span>",
										events: {
											click: function(){
													This.onlineEditFile(data.djsn,data.filename);//在线编辑方法
											}
										}
									})
							);
						}else if(i==2){
							el.adopt(
									new Element('span', {
										html: "&nbsp;&nbsp;<span style='cursor:pointer;' id='downloadButton'><font color='red'>下载<font></span>",
										events: {
											click: function(){
													This.commonDownloadFile(data.djsn,data.filename);//通用下载方法
											}
										}
									})
							);
						}
						
					}
				}
			}else{
				el.adopt(
						new Element('span', {
							html: "&nbsp;&nbsp;<span style='cursor:pointer;'><font color='red'>删除<font></span>",
							events: {
								click: function(){
									if(confirm("您确定要删除附件吗？")){
										MyFancyupload.deleteFile(this.getParent().id);
										this.getParent().destroy();
										if(typeof delCallBack =="function"){
											delCallBack();
										}
									}
								}
							}
						})
				);
				el.adopt(
						new Element('span', {
							html: "&nbsp;&nbsp;<span style='cursor:pointer;'><font color='red'>查看<font></span>",
							events: {
								click: function(){
										This.onlineEditFile(data.djsn,data.filename);//在线编辑方法
								}
							}
						})
				);
				el.adopt(
						new Element('span', {
							html: "&nbsp;&nbsp;<span id='downloadButton' style='cursor:pointer;'><font color='red'>下载<font></span>",
							events: {
								click: function(){
										This.commonDownloadFile(data.djsn,data.filename);//通用下载方法
								}
							}
						})
				);
			
			}
		}else{
			el.adopt(
					new Element('span', {
						html: "&nbsp;&nbsp;<span style='cursor:pointer;'><font color='red'>删除<font></span>",
						events: {
							click: function(){
								if(confirm("您确定要删除附件吗？")){
									MyFancyupload.deleteFile(this.getParent().id);
									this.getParent().destroy();
									if(typeof delCallBack =="function"){
										delCallBack();
									}
								}
							}
						}
					})
			);
			el.adopt(
					new Element('span', {
						html: "&nbsp;&nbsp;<span style='cursor:pointer;'><font color='red'>查看<font></span>",
						events: {
							click: function(){
									This.onlineEditFile(data.djsn,data.filename);//在线编辑方法
							}
						}
					})
			);
			el.adopt(
					new Element('span', {
						html: "&nbsp;&nbsp;<span style='cursor:pointer;' id='downloadButton'><font color='red'>下载<font></span>",
						events: {
							click: function(){
									This.commonDownloadFile(data.djsn,data.filename);//通用下载方法
							}
						}
					})
			);
		}
	},
	getBuessidFiles : function(buessid){//根据业务ID从数据库中查询已上传的文件
		var html = this.f_async_html(this.rootPath + "/ccapp/oa/resources/plug/fancyupload/filedata.jsp?opt=files&buessid="+buessid);
		var data = MyFancyupload.evalJSON(html);
		if(data && data.rows){
			return data.rows;
		}
		return [];
		//return [{filename:'abc.jpg'},{filename:'bbb.jpg'}];
	},
	
	deleteFile : function (fileid){
		var html = this.f_async_html(this.rootPath + "/ccapp/oa/resources/plug/fancyupload/filedata.jsp?opt=delete&fileid="+fileid);
		var data = MyFancyupload.evalJSON(html);
		return (data && data.bSuccess==true);
	},
	
	copyFile : function (newbuessid,buessid){
		var html = this.f_async_html(this.rootPath + "/ccapp/oa/resources/plug/fancyupload/filedata.jsp?opt=copy&buessid="+buessid+"&newbuessid="+newbuessid);
		var data = MyFancyupload.evalJSON(html);
		return (data && data.bSuccess==true);
	},
	
	deleteFiles : function (buessid){
		var html = this.f_async_html(this.rootPath + "/ccapp/oa/resources/plug/fancyupload/filedata.jsp?opt=deletes&buessid="+buessid);
		var data = MyFancyupload.evalJSON(html);
		return (data && data.bSuccess==true);
	},
	
	/*downloadFile : function(djsn,fileName){
		var iFOnlineEdit = "false";
		jQuery.post(this.rootPath+"/servlet/pubFileDownload",//调用servlet获取参数
				{
					djsn:djsn,
					//modify by shuqi.liu 加入参数fileName 在线编辑方法，通用下载方法也加入该参数。
					fileName:fileName,
					onlineEdit:this.onlineEdit,
					getFileData:true
				},
				function(data){
					iFOnlineEdit = data.iFOnlineEdit;
					if("true" == iFOnlineEdit){//If能在线编辑
						This.onlineEditFile(djsn,fileName);//则调用在线编辑方法
					}else{
						This.commonDownloadFile(djsn,fileName);//否则调用通用下载方法
					}
				}
				,"json");
	},*/
	commonDownloadFile : function(djsn,fileName){
		//使用临时创建的超链接对象下载
		var linkGetfileObj = document.createElement("A");
		if(linkGetfileObj && (linkGetfileObj.tagName == "A")){
			linkGetfileObj.style.display = "none";
			document.body.appendChild(linkGetfileObj);
			linkGetfileObj.href = this.rootPath+"/servlet/pubFileDownload?djsn="+djsn+"&openType=download&fileName="+encodeURI(fileName);
			linkGetfileObj.click();
			document.body.removeChild(linkGetfileObj);
			delete linkGetfileObj;
		}
	},
	onlineEditFile : function(djsn,fileName){
		var height = window.screen.availHeight;
		var width = window.screen.availWidth;
		window.open(this.rootPath+"/servlet/pubFileDownload?djsn="+djsn+"&openType=online&fileName="+encodeURI(fileName),"_blank","width="+width+",height="+height+",left=0px,top=0px");
		//window.showModalDialog('../resources/plug/fancyupload/file.jsp?filePath=ccapp/FcAttach/09317d7e-76cc-4cea-ba47-85a2a745b0db.doc',"Arguments","dialogHeight: "+height+"px; dialogWidth: "+width+"px; dialogTop: 50px; dialogLeft: 100px; edge: Raised; center: Yes; help: No; resizable: No; status: No;"); 
	},
	
	f_async_html : function(url){//同步获取url内容
		var flag = true;
		var html = jQuery.ajax({
			url: url,
			type: "POST",
			dataType: "html",
			timeout: 90000,
			async: false,
			error:function() {flag = false}
		}).responseText;
		if(flag){
			return html;
		} else {
			return null;
		}
	},
	
	evalJSON : function (strJson){//将JSON转换为JS对象
		try {
			return eval( "(" + strJson + ")");
		} catch(e){
			return "";
		}
	}
}