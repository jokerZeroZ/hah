package com.core.base.web.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.core.base.Entity.Message;
import com.core.base.Entity.User;
import com.core.base.service.LoginService;

@Controller
@RequestMapping("/login")
public class LoginController extends BaseController{
	private boolean flag=false;
	
	@Autowired
	private LoginService loginService;
	
	@ResponseBody
	@RequestMapping(value="/logout",method = RequestMethod.GET)
	public Message logout(HttpSession session) throws Exception{
		Message message=new Message();
		session.invalidate(); 
		//System.out.println(flag);
		if(!flag){
			Cookie[] cookies = request.getCookies();
			if(cookies!=null && cookies.length>0){
			 	for(Cookie c : cookies){
			 		c.setMaxAge(0);
			 	}
			}
		}
		String result="login.jsp";
        //���Session  
        message.setMessage(result);
		return message;
	}
	
	@ResponseBody
	@RequestMapping(value="/doLogin",method = RequestMethod.POST)
	public Message doLogin(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("remember") Boolean remember){
		Message message=new Message();
		String result="";
		try{
			User user = loginService.doLogin(username,password);
			String name=user.getUser_name();
			if(name.equals("0")){
				result = "���û�������";
			}else if(name.equals("1")){
				result = "�û��������벻ƥ��";
			}else{
				request.getSession().setAttribute("username", user.getUser_name());
				//System.out.println(remember);
				if(remember==true){
					flag=true;
					Cookie nameCookie = new Cookie("username", username);
					nameCookie.setMaxAge(60 * 60 * 24 * 1);
					nameCookie.setPath("/");
					Cookie pwdCookie = new Cookie("password", password);
					pwdCookie.setMaxAge(60 * 60 * 24 * 1);
					pwdCookie.setPath("/");
					response.addCookie(nameCookie);
					response.addCookie(pwdCookie);
//					System.out.println(nameCookie.getName()+" "+nameCookie.getValue());
//					System.out.println(pwdCookie.getName()+" "+pwdCookie.getValue());
				}else{
					flag=false;
				}
				result = "index.jsp";
			}
		}catch(Exception e){
			result = "�����ˣ�";
		}
		message.setMessage(result);
		return message;
	}
	
}
