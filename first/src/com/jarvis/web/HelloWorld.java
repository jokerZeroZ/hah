package com.jarvis.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年1月12日 上午9:48:20 
* explain
*/
@Controller
@RequestMapping("/")
public class HelloWorld {
	@RequestMapping("hello")
	public String helloworld(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.getWriter().append("hello world");
		System.out.println("aa");
		return "success";
	}
	
	public void set(){
		System.out.println("aa");
	}
}
