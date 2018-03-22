<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String username = "";
String password = "";
Cookie[] cookies = request.getCookies();
if(cookies!=null && cookies.length>0){
 	for(Cookie c : cookies){
 		if(c.getName().equals("username"))
 			username=c.getValue();
 		else if(c.getName().equals("password"))
 			password=c.getValue();
 	}
}

%>

<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    
<!-- Icon -->
<link rel="shortcut icon" href="https://www.mcdonalds.com.cn/favicon.ico" type="image/x-icon" /> 

<!-- Icons -->
<link rel="stylesheet" type="text/css" href="http://www.jq22.com/jquery/font-awesome.4.6.0.css">
    
<!-- Set this in dist folder in index.html file -->
<link href="styles/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="styles/main.min.css">
<meta content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=no, width=device-width" name="viewport">
<title>登录</title>

<div class="page page-auth clearfix">
    <div class="auth-container">
        <!-- site logo -->
        <h1 class="site-logo h2 mb15"><a href="/"><span>Graduation </span>&nbsp;Design</a></h1>
        <h3 class="text-normal h4 text-center">&nbsp;</h3>

        <div class="form-container">
            <form class="form-horizontal">
            	<input type="hidden" id="path" value="<%=basePath%>">
                <div class="form-group form-group-lg">
                    <input class="form-control" type="text" placeholder="Username" value="<%=username %>" id="username">
                </div>

                <div class="form-group form-group-lg">
                    <input class="form-control" type="password" placeholder="Password" value="<%=password%>" id="password">
                </div>

                <div class="clearfix">&nbsp;
                </div>
                <div class="clearfix mb15">
                    <button type="button" class="btn btn-lg btn-w120 btn-primary text-uppercase" onclick="doLogin()">Sign In</button>
                    <div class="ui-checkbox ui-checkbox-primary mt15 right">
                        <label>
                            <input type="checkbox" id="remember" checked>
                            <span>记住密码</span>
                        </label>
                    </div>
                </div>

                <div class="clearfix text-center">
                    <!-- <p>Don't have an account? <a href="#/pages/register">Register Now</a>
                    </p> -->
                </div>
            </form>
        </div>

    </div>
    <!-- #end auth-wrap -->
</div>

<script src="scripts/jquery-1.11.1.min.js"></script>
<!-- layer -->
<script src="scripts/layer/layer.js"></script>
<script>
	var baseUrl=$('#path').val();
	function doLogin(){
		var username=$('#username').val();
		var password=$('#password').val();
		var remember=$('#remember').get(0).checked;
		if(username==""||username==null){
			layer.msg("请填写用户名", {
				offset: 't',
				anim: 6
			});
		}else if(password==""||password==null){
			layer.msg("请填写密码", {
				offset: 't',
				anim: 6
			});
		}else{
			$.ajax({
				type:"post",      
				url:baseUrl+"/login/doLogin",    
				data:{"username":username,"password":password,"remember":remember},      
				dataType:"json",    
				success:function(data){     
					if(data.message.indexOf("jsp")!=-1){
						//window.location.href=baseUrl+data.message;
						window.open(baseUrl+data.message,"_self");

					}else{
						layer.msg(data.message, {
						   offset: 't',
						   anim: 6
						});
					}                            
				},
				error:function(data){
					layer.msg("登录失败", {
						offset: 't',
						anim: 6
					});
				}
			})
		}
		
	}
</script>
