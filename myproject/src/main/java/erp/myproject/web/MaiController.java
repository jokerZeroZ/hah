package erp.myproject.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.myproject.service.LoginService;
import erp.myproject.service.PersionService;
import erp.myproject.service.TestService;
import sun.net.www.content.text.plain;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月6日 下午2:20:27 
* explain
*/
@Controller
@RequestMapping(value = "base")
public class MaiController {
	
	@Autowired
	private TestService testService;
	
	@Autowired
	private LoginService loginService;
	
	@RequestMapping(value = "test", method = RequestMethod.GET)
	public String test(){
		System.out.println("2333344443");
		return "sys/createMenuForm";
	}
	
//	@RequestMapping(value = "save",method = RequestMethod.GET)
//	@ResponseBody
//	public String savePerson(){
//		PersionService.savePerson();
//		return "success!!";
//	}
	@RequestMapping(value = "login")
	//@ResponseBody
	public String login(HttpServletRequest request, HttpServletResponse response,
			Model model){
		String name = request.getParameter("mid");
		String password = request.getParameter("password");
		if(loginService.login(name, password) == 1)
			return "base/main";
		else
			return "login";
	}
//	@RequestMapping(value = "get",method = RequestMethod.GET)
//	public String stest(){
//		PersionService.show();
//		return "test";
//	}
	
}
