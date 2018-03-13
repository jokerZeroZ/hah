var PubOPT = {
	config: {
		mainPage: null
	},
	//获取页面的宽度
	getPageSize: function() { 
		var winW, winH;
		if(window.innerWidth) {// all except IE 
			winW = window.innerWidth; 
			winH = window.innerHeight; 
		} else if (document.documentElement) {// IE 6 Strict Mode 
			winW = document.documentElement.clientWidth;
			winH = document.documentElement.clientHeight;
		} else if (document.body) { // other 
			winW = document.body.clientWidth;
			winH = document.body.clientHeight;
		}
		return {WinW:winW, WinH:winH};
	},
	//获取项目主页面
	getBaseParent: function(win){
		if("__MainPage" in win) return win;
		if(!((typeof(win) != "undefined") && (win !== null) && (win != "")) || win==win.parent) return null;
		return this.getBaseParent(win.parent);
	},
	//在项目主页面弹出窗口
	jqOpen: function(url, config){
		//url = this.getBasePathse() + url;
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		this.config.mainPage = mainPage;
		if(mainPage != null){
			return mainPage.jqOpen(url, config, window);
		} else {
			alert("找不到项目主页面，无法弹出窗口！");
		}
		return null;
	},
	//在项目主页面弹出提示操作框
	jqConfirm: function(text, title, fn1, fn2, fn){
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		this.config.mainPage = mainPage;
		if(mainPage != null){
			return mainPage.jqConfirm(text, title, fn1, fn2, fn);
		} else {
			alert("找不到项目主页面，无法弹出窗口！");
		}
		return null;
	},
	//在项目主页面弹出确定框
	jqAlert: function(text, title, fn){
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		this.config.mainPage = mainPage;
		if(mainPage != null){
			return mainPage.jqAlert(text, title, fn);
		} else {
			alert("找不到项目主页面，无法弹出窗口！");
		}
		return null;
	},
	//在项目主页面弹出自动关闭框
	jqTimerAlert: function(text, title, fn, timerMax){
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		this.config.mainPage = mainPage;
		if(mainPage != null){
			return mainPage.jqTimerAlert(text, title, fn, timerMax);
		} else {
			alert("找不到项目主页面，无法弹出窗口！");
		}
		return null;
	},
	//在项目主页面关闭弹出窗口
	jqClose: function(jqw){
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		this.config.mainPage = mainPage;
		if(mainPage != null){
			mainPage.jqClose(jqw);
		} else {
			jqw.dialog("close");
		}
	},
	//获取弹出窗口父页面
	jqParent: function(){
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		this.config.mainPage = mainPage;
		if(mainPage != null){
			return mainPage.getParentWindow(window);
		} else {
			return window.parent;
		}
	},
	//获取弹出窗口Iframe页面
	jqWindow: function(jqw){
		return jqw.find("iframe")[0].contentWindow;
	},
	//弹出提示框
	showTip: function(title, content, itype, config){ //itype：1：表示成功，2：表示加载中
		var mainPage = this.config.mainPage!=null ? this.config.mainPage : this.getBaseParent(window);
		if(!config) config = {};
		if(!itype) itype = 1;
		config.itype = itype;
		mainPage.showTip(title, content, config);
	},
	
	/**
	  * 关闭弹出窗口
	  * @param obj 
	  * @return
	  */
	closeControl : function(obj){
			this.clickId = obj["clickId"]||null;
			//被点击时，弹出窗不会关闭的对象数组
			this.unCloseArray = obj["unCloseArray"] || new Aray();
			this.clickCloseArray = obj["clickCloseArray"]||new Array();
			//关闭弹出窗的函数
			this.closeFunction = obj["closeFunction"] || function(){};
			
			var This = this;
			//是否允许关闭的标示
			this.closeAble = true;
			
			 var timeOut = null;
			/**
			 * 初始化的函数
			 */
			this.init = function(){
				//失去焦点时，关闭弹出窗
				jQuery("#"+this.clickId).attr("tabindex",1000).css("outline","none").blur(function(){
					closeDiv();
				});
				if(null!=this.unCloseArray&&this.unCloseArray.length>0){
					for(var i=0;i<this.unCloseArray.length;i++){
							jQuery(this.unCloseArray[i]).attr("tabindex",i).css("outline","none").blur(function(){
			                    closeDiv();
			                }).mouseover(function(){
								//在点击窗口失去焦点时，不关闭
								This.closeAble = false;
								if(timeOut){
									clearInterval(timeOut);
								}
								timeOut = setInterval(function(){
						            closeDiv();
						        },2000);
							}).mouseout(function(){
								This.closeAble = true;
							});
					}
				}			
				//点击以后，要关闭的dom节点
				if(null != This.clickCloseArray 
						&& This.clickCloseArray.length>0){
				   for(var i=0;i<This.clickCloseArray.length;i++){
					   jQuery(This.clickCloseArray[i]).click(function(){
						   if(typeof This.closeFunction=="function"){  
								This.closeFunction();
							}				
							if(timeOut){
		                         clearInterval(timeOut);
		                    }
					   });  
				   }
				}
			};
			/**
			 * 关闭弹出窗
			 */
			function closeDiv(){	
				try{
					if(This.closeAble){
						if(typeof This.closeFunction=="function"){  
							This.closeFunction();
						}				
	                 //This.closeAble = false;	
						if(timeOut){
	                         clearInterval(timeOut);
	                    }
					}
				}catch(e){/**忽略关闭异常**/}
			}
	    
			//执行初始化函数
			this.init();
		}
}