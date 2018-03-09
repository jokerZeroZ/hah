package erp.myproject.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.myproject.service.PersionService;
import erp.myproject.service.TestService;
import sun.net.www.content.text.plain;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月6日 下午2:20:27 
* explain
*/
@Controller
@RequestMapping(value = "ss")
public class MaiController {
	
	@Autowired
	private TestService testService;
	
	@Autowired
	private PersionService PersionService;
	
	@RequestMapping(value = "test", method = RequestMethod.GET)
	public String test(){
		System.out.println("2333344443");
		return "test";
	}
	
	@RequestMapping(value = "save",method = RequestMethod.GET)
	@ResponseBody
	public String savePerson(){
		PersionService.savePerson();
		return "success!!";
	}
	
	@RequestMapping(value = "get",method = RequestMethod.GET)
	public String stest(){
		PersionService.show();
		return "test";
	}
	
}
