// 请勿修改，否则可能出错
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

if (Sys.ie){
	document.write('<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ');
	document.write('<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ');
	document.write('<object id="TANGER_OCX" classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404" ');
	document.write('codebase="js/OfficeControl.cab#version=5,0,2,1" width="100%" height="100%">   ');
	document.write('<param name="IsUseUTF8URL" value="-1">   ');
	document.write('<param name="IsUseUTF8Data" value="-1">   ');
	document.write('<param name="BorderStyle" value="1">   ');
	document.write('<param name="BorderColor" value="14402205">   ');
	document.write('<param name="TitlebarColor" value="15658734">   ');
	document.write('<param name="TitlebarTextColor" value="0">   ');
	document.write('<param name="MenubarColor" value="14402205">   ');
	document.write('<param name="MenuButtonColor" VALUE="16180947">   ');
	document.write('<param name="MenuBarStyle" value="3">   ');
	document.write('<param name="MenuButtonStyle" value="7">   ');
	document.write('<param name="WebUserName" value="NTKO">   ');
	document.write('<param name="Caption" value="NTKO OFFICE文档控件示例演示 http://www.ntko.com">   ');
	document.write('<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ');
	document.write('</object>');
} else if (Sys.firefox){ 	
	document.write('<object id="TANGER_OCX" clsid="{C9BC4DFF-4248-4a3c-8A49-63A7D317F404}" ');
	document.write('type="application/ntko-plug"  codebase="js/OfficeControl.cab#version=5,0,2,1" width="100%" height="100%" ');
	document.write('ForOnpublishAshtmltourl="publishashtml" ');
	document.write('ForOnpublishAspdftourl="publishaspdf" ');
	document.write('ForOnSaveAsOtherFormatToUrl="saveasotherurl" ');
	document.write('ForOnDoWebGet="dowebget" ');
	document.write('ForOnDoWebExecute="webExecute" ');
	document.write('ForOnDoWebExecute2="webExecute2" ');
	document.write('ForOnFileCommand="FileCommand" ');
	document.write('ForOnCustomMenuCmd2="CustomMenuCmd" ');
	document.write('_IsUseUTF8URL="-1"   ');
	document.write('_IsUseUTF8Data="-1"   ');
	document.write('_BorderStyle="1"   ');
	document.write('_BorderColor="14402205"   ');
	document.write('_MenubarColor="14402205"   ');
	document.write('_MenuButtonColor="16180947"   ');
	document.write('_MenuBarStyle="3"  ');
	document.write('_MenuButtonStyle="7"   ');
	document.write('_WebUserName="NTKO"   ');
	document.write(' >');
	document.write('<SPAN STYLE="color:red">尚未安装NTKO Web FireFox跨浏览器插件。请点击<a href="ntkoplugins.xpi">安装组1件</a></SPAN>   ');
	document.write('</object>   ');
}else if(Sys.chrome){
	document.write('<object id="TANGER_OCX" clsid="{C9BC4DFF-4248-4a3c-8A49-63A7D317F404}" ');
	document.write('ForOnSaveToURL="OnComplete2" ForOnBeginOpenFromURL="OnComplete" ForOndocumentopened="OnComplete3"');
	document.write('ForOnpublishAshtmltourl="publishashtml"');
	document.write('ForOnpublishAspdftourl="publishaspdf"');
	document.write('ForOnSaveAsOtherFormatToUrl="saveasotherurl"');
	document.write('ForOnDoWebGet="dowebget"');
	document.write('ForOnDoWebExecute="webExecute"');
	document.write('ForOnDoWebExecute2="webExecute2"');
	document.write('ForOnFileCommand="FileCommand"');
	document.write('ForOnCustomMenuCmd2="CustomMenuCmd"');
	document.write('codebase="js/OfficeControl.cab#version=5,0,2,1" width="100%" height="100%" type="application/ntko-plug" ');
	document.write('_IsUseUTF8URL="-1"   ');
	document.write('_IsUseUTF8Data="-1"   ');
	document.write('_BorderStyle="1"   ');
	document.write('_BorderColor="14402205"   ');
	document.write('_MenubarColor="14402205"   ');
	document.write('_MenuButtonColor="16180947"   ');
	document.write('_MenuBarStyle="3"  ');
	document.write('_MenuButtonStyle="7"   ');
	document.write('_WebUserName="NTKO"   ');
	document.write('_Caption="NTKO OFFICE文档控件示例演示 http://www.ntko.com">    ');
	document.write('<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a href="ntkoplugins.crx">安装组件</a></SPAN>   ');
	document.write('</object>');
}else if (Sys.opera){
	alert("sorry,ntko web印章暂时不支持opera!");
}else if (Sys.safari){
	 alert("sorry,ntko web印章暂时不支持safari!");
}