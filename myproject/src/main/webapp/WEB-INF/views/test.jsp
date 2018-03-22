<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>${fns:getConfig('productName')}</title>
	<%@include file="/WEB-INF/views/include/dialog.jsp" %>
	<meta name="decorator" content="default"/>
	<style type="text/css">
		#main {padding:0;margin:0;} #main .container-fluid{padding:0 7px 0 10px;}
		#header {margin:0 0 10px;position:static;} #header li {font-size:14px;_font-size:12px;}
		#header .brand {font-family:Helvetica, Georgia, Arial, sans-serif, 黑体;font-size:26px;padding-left:33px;}
		#footer {margin:8px 0 0 0;padding:3px 0 0 0;font-size:11px;text-align:center;border-top:2px solid #0663A2;}
		#footer, #footer a {color:#999;} 
	</style>
	<script type="text/javascript"> 
	   var tabsTool = {
			opentab : function(label, url){},
			closetab : function(id){}
		};
		$(document).ready(function() {
			$("#menu a.menu").click(function(){
				$("#menu li.menu").removeClass("active");
				$(this).parent().addClass("active");
				if(!$("#openClose").hasClass("close")){
					//$("#openClose").click();
				}
			});
		});
		
		function gohome(){
			$("#mainFrame").attr("src","tabList.jsp");
		}
		
		function deployMenu(menuId){
			window.frames["menuFrame"].deployMenu(menuId);
		}
		
	</script>
</head>
<body>
	<c:set var="user" value="${fns:getUser()}"/>
	<div id="main">
		<div id="header" class="navbar navbar-fixed-top">
	      <div class="navbar-inner">
	      	 <div class="brand"><img src="${pageContext.request.contextPath}/static/kclogin/image/kclogo.png" width="361" height="65" /></div>
	         <div class="nav-collapse">
	           <ul id="menu" class="nav">
				 <c:set var="firstMenu" value="true"/>
				 <c:forEach items="${fns:getMenuList()}" var="menu" varStatus="idxStatus">
					<c:if test="${menu.parent.id eq '1'&& menu.isShow eq '1' && menu.show_type eq '0'}">
						<c:if test="${menu.isDropdown eq 0}">
							<li class="menu ${firstMenu?' active':''}">
								<c:if test="${empty menu.href}">
									<a class="menu" href="${ctx}/sys/menu/tree?parentId=${menu.id}" target="menuFrame" >${menu.name}</a>
								</c:if>
								<c:if test="${not empty menu.href}">
									<a class="menu" href="${fn:indexOf(menu.href, '://') eq -1?ctx:''}${not empty menu.href?menu.href:'/404'}${fn:indexOf(menu.href, '://') eq -1?'':'?userName='}${fn:indexOf(menu.href, '://') eq -1?'':user.loginName}" target="${not empty menu.target?menu.target:'mainFrame'}" >${menu.name}</a>
								</c:if>
							</li>
							<c:if test="${firstMenu}">
								<c:set var="firstMenuId" value="${menu.id}"/>
							</c:if>
							<c:set var="firstMenu" value="false"/>
						</c:if>
						<c:if test="${menu.isDropdown eq 1}">
							<li class="dropdown">
								<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:" >${menu.name}<b class="caret"></b></a>
								<ul class="dropdown-menu">
								<c:forEach items="${fns:getMenuChildList(menu.id)}" var="menuChild">
									<c:if test="${menuChild.isDropdown eq 1}">
										<li class="dropdown">
											<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:" ><i class="icon-${not empty menuChild.icon?menuChild.icon:'circle-arrow-right'}"></i>&nbsp;${menuChild.name}<b class="caret1"></b></a>
											<ul class="dropdown-xinzensanji dropdown-menu">
											<c:forEach items="${fns:getMenuChildList(menuChild.id)}" var="menuChild2">
												<c:if test="${menuChild2.parent.id eq menuChild.id&&menuChild2.isShow eq 1}">
													<li class="menu ${firstMenu?' active':''}">
														<c:if test="${empty menuChild2.href}">
															<a class="menu" href="${ctx}/sys/menu/tree?parentId=${menuChild2.id}" target="menuFrame" ><i class="icon-${not empty menuChild2.icon?menuChild2.icon:'circle-arrow-right'}"></i>&nbsp;${menuChild2.name}</a>
														</c:if>
														<c:if test="${not empty menuChild2.href}">
															<a class="menu" href="${fn:indexOf(menuChild2.href, '://') eq -1?ctx:''}${not empty menuChild2.href?menuChild2.href:'/404'}${fn:indexOf(menuChild2.href, '://') eq -1?'':'?userName='}${fn:indexOf(menuChild2.href, '://') eq -1?'':user.loginName}" target="${not empty menuChild2.target?menuChild2.target:'mainFrame'}" ><i class="icon-${not empty menuChild2.icon?menuChild2.icon:'circle-arrow-right'}"></i>&nbsp;${menuChild2.name}</a>
														</c:if>
													</li>
													<c:if test="${firstMenu}">
														<c:set var="firstMenuId" value="${menuChild2.id}"/>
													</c:if>
													<c:set var="firstMenu" value="false"/>
												</c:if>
											</c:forEach>
											</ul>
										</li>
									</c:if>
									<c:if test="${menuChild.isDropdown eq 0 && menuChild.parent.id eq menu.id&&menuChild.isShow eq 1}">
										<li class="menu ${firstMenu?' active':''}">
											<c:if test="${empty menuChild.href}">
												<a class="menu" href="${ctx}/sys/menu/tree?parentId=${menuChild.id}" target="menuFrame" ><i class="icon-${not empty menuChild.icon?menuChild.icon:'circle-arrow-right'}"></i>&nbsp;${menuChild.name}</a>
											</c:if>
											<c:if test="${not empty menuChild.href}">
												<a class="menu" href="${fn:indexOf(menuChild.href, '://') eq -1?ctx:''}${not empty menuChild.href?menuChild.href:'/404'}${fn:indexOf(menuChild.href, '://') eq -1?'':'?userName='}${fn:indexOf(menuChild.href, '://') eq -1?'':user.loginName}" target="${not empty menuChild.target?menuChild.target:'mainFrame'}" ><i class="icon-${not empty menuChild.icon?menuChild.icon:'circle-arrow-right'}"></i>&nbsp;${menuChild.name}</a>
											</c:if>
										</li>
										<c:if test="${firstMenu}">
											<c:set var="firstMenuId" value="${menuChild.id}"/>
										</c:if>
										<c:set var="firstMenu" value="false"/>
									</c:if>
								</c:forEach>
								</ul>
							</li>
						</c:if>
					</c:if>
				 </c:forEach>
<%-- 				 <shiro:hasPermission name="cms:site:select1">
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:" >${fnc:getSite(fnc:getCurrentSiteId()).name}<b class="caret"></b></a>
						<ul class="dropdown-menu">
						<c:forEach items="${fnc:getSiteList()}" var="site"><li><a href="${ctx}/cms/site/select?id=${site.id}&flag=1">${site.name}</a></li></c:forEach>
						</ul>
					</li>
				 </shiro:hasPermission>
 --%>	           </ul>
	           <ul class="nav pull-right">
	            <li id="themeSwitch" class="dropdown">
			       	<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:" onclick="gohome();" title="首页">首页</i></a>
			     </li>
				 <%-- <li><a href="${pageContext.request.contextPath}${fns:getFrontPath()}/index-${fnc:getCurrentSiteId()}.html" target="_blank" title="访问网站主页"><i class="icon-home"></i></a></li> 
			  	 <li id="themeSwitch" class="dropdown">
			       	<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:"  title="主题切换"><i class="icon-th-large"></i></a>
				    <ul class="dropdown-menu">
				      <c:forEach items="${fns:getDictList('theme')}" var="dict"><li><a href="javascript:"  onclick="location='${pageContext.request.contextPath}/theme/${dict.value}?url='+location.href">${dict.label}</a></li></c:forEach>
				    </ul>
				    <!--[if lte IE 6]><script type="text/javascript">$('#themeSwitch').hide();</script><![endif]-->
			     </li>--%>
			  	 <li class="dropdown">
				    <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:"  title="个人信息">您好, <shiro:principal property="name"/>【${user.office.name}】</a>
				    <ul class="dropdown-menu">
				      <li><a href="javascript:tabsTool.opentab('个人信息', '${ctx}/sys/user/info')" ><i class="icon-user"></i>&nbsp; 个人信息</a></li>
				      <li><a href="javascript:tabsTool.opentab('修改密码', '${ctx}/sys/user/modifyPwd')" ><i class="icon-lock"></i>&nbsp;  修改密码</a></li>
				    </ul>
			  	 </li>
			  	 <li><a href="${ctx}/logout" title="退出登录">退出</a></li>
			  	 <li>&nbsp;</li>
	           </ul>
	         </div><!--/.nav-collapse -->
	      </div>
	    </div>
	    <div class="container-fluid">
			<div id="content" class="row-fluid">
				<div id="left">
					<iframe id="menuFrame" name="menuFrame" src="${ctx}/sys/menu/tree?parentId=${firstMenuId}" style="overflow:visible;"
						scrolling="yes" frameborder="no" width="100%" height="650"></iframe>
				</div>
				<div id="openClose" class="close">&nbsp;</div>
				<div id="right">
					<!-- 右工作区 ${ctx}/erp/index/indexview-->
					<iframe id="mainFrame" name="mainFrame" src="tabList.jsp" style="overflow:visible;" scrolling="yes" frameborder="no" width="100%" height="650"></iframe>
				</div>
			</div>
		    <div id="footer" class="row-fluid">
	            <%@ include file="/copyright.jsp"%> 
			</div>
		</div>
	</div>
	<script type="text/javascript"> 
		var leftWidth = "220"; // 左侧窗口大小
		function wSize(){
			var minHeight = 500, minWidth = 980;
			var strs=getWindowSize().toString().split(",");
			$("#menuFrame, #mainFrame, #openClose").height((strs[0]<minHeight?minHeight:strs[0])-$("#header").height()-$("#footer").height()-32);
			$("#openClose").height($("#openClose").height()-5);
			if(strs[1]<minWidth){
				$("#main").css("width",minWidth-10);
				$("html,body").css({"overflow":"auto","overflow-x":"auto","overflow-y":"auto"});
			}else{
				$("#main").css("width","auto");
				$("html,body").css({"overflow":"hidden","overflow-x":"hidden","overflow-y":"hidden"});
			}
			$("#right").width($("#content").width()-$("#left").width()-$("#openClose").width()-5);
		}
	</script>
	<script src="${ctxStatic}/common/wsize.min.js" type="text/javascript"></script>
</body>
</html>