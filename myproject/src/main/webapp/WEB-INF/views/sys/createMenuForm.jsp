<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/head.jsp"%>
<html>
<head>
<title>菜单管理</title>
<meta name="decorator" content="default" />
<script type="text/javascript">
	$(document).ready(
			function() {
				$("#name").focus();
				$("#inputForm")
						.validate(
								{
									submitHandler : function(form) {
										loading('正在提交，请稍等...');
										form.submit();
									},
									errorContainer : "#messageBox",
									errorPlacement : function(error, element) {
										$("#messageBox").text("输入有误，请先更正。");
										if (element.is(":checkbox")
												|| element.is(":radio")
												|| element.parent().is(
														".input-append")) {
											error.appendTo(element.parent()
													.parent());
										} else {
											error.insertAfter(element);
										}
									}
								});
			});
</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li><a href="base/sys/menu/">菜单列表</a></li>
		<shiro:hasPermission name="sys:menu:edit">
			<li class="active"><a href="base/sys/menu/createMenu">菜单生成</a></li>
		</shiro:hasPermission>
	</ul>
	<br />
	<form:form id="inputForm" modelAttribute="menuCreate"
		action="base/sys/menu/saveMenu" method="post"
		class="form-horizontal">
		<tags:message content="${message}" />
		<div class="control-group">
			<label class="control-label">上级菜单:</label>
			<div class="controls">
				<tags:treeselect id="menu" name="menuId" value=""
					labelName="parent.name" labelValue="" title="菜单"
					url="/sys/menu/treeData" extId="" cssClass="required" />
			</div>
		</div>
		<div class="form-actions">
			<shiro:hasPermission name="sys:menu:edit">
				<input id="btnSubmit" class="btn btn-primary" type="submit"
					value="生 成" />&nbsp;</shiro:hasPermission>
			<input id="btnCancel" class="btn" type="button" value="返 回"
				onclick="history.go(-1)" />
		</div>
	</form:form>
</body>
</html>