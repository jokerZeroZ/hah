<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="zh-CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script type="text/javascript" src="static/jquery-1.11.3/jquery.min.js"></script>
	<script type="text/javascript" src="static/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="static/bootstrap/bootstrap-3.3.7-dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="static/bootstrap/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css">
<title>vv</title>

</head>
<div class="container">
	<form id="loginForm" action="base/login" method="post" class="form-horizontal">
		<fieldset>
			<legend><label><span class="glyphicon glyphicon-user"></span>&nbsp;用户登录</label></legend>
			<div class="form-group" id="midDiv">
				<label class="col-md-3 control-label" for="mid">用户名：</label>
				<div class="col-md-5">
					<input type="text" id="mid" name="mid" class="form-control" placeholder="请输入登录名">
				</div>
				<div  class="col-md-4" id="midSpan"></div>
			</div>
			<div class="form-group" id="passwordDiv">
				<label class="col-md-3 control-label" for="password">密码：</label>
				<div class="col-md-5">
					<input type="password" id="password" name="password" class="form-control" placeholder="请输入密码">
				</div>
				<div  class="col-md-4" id="passwordSpan"></div>
			</div>
			<div class="form-group" id="butDiv">
				<div class="col-md-5 col-md-offset-3">
					<button class="btn btn-primary" type="submit" id="subBut">登录</button>
					<button class="btn btn-warning" type="reset" id="rstBut">重置</button>
				</div>
			</div>
		</fieldset>
	</form>
</div>
</body>
<script type="text/javascript">
	$(function(){	//页面加载操作处理
		$("#mid").on("blur",function(){
			validateMid();
		});
		$("#password").on("blur",function(){
			validatePassword();
		});
		//表单提交前的检查工作
		$("#loginForm").on("submit",function(){
			return validateMid() && validatePassword();//验证通过后提交
		});
	});

	function validateMid(){
		validateEmpty("mid");
	}
	
	function validatePassword(){
		validateEmpty("password");
	}
	
	function validateEmpty(eleId){
		if($("#" + eleId).val() == ""){
			$("#" + eleId + "Div").attr("class","form-group has-error");
			$("#" + eleId + "Span").html("<span class='text-danger'>内容不能为空!!</span>");
			return false;
		}else{
			$("#" +eleId + "Div").attr("class","form-group has-success");
			$("#" +eleId + "Span").html("<span class='text-success'></span>");
			return true;
		}
	}
</script>
</html>