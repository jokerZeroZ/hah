/**
 * 弹出意见填写框。
 * @param ideaid
 */
//弹出意见框
var closeWin=function(){
	PubOPT.jqClose(openWin);
}
function inputidea(table,column,cntab){
	var path = getContextPath()+"/ccapp/oa/archive2/wordsign.jsp?table="+table+"&column="+column;
	if(cntab){//如果缩进不为空，那么传入改属性
		path = path +"&cntab="+cntab; 
	}
	//var path =  getCurrentFilePath()+"inputideaarea.jsp?table="+table+"&column="+column;
	//openAlertWindows('windowId',path,'签阅意见',800,240,'25%','25%');
	openWin = PubOPT.jqOpen(path,
			 {title: "签阅意见", 
			 draggable: true,  
			 resizable: false,
			 height: 250,
		     width: 800,
		     callbackfn:closeAlertWindow
	   		 });
}