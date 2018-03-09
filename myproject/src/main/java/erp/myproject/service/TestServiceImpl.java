package erp.myproject.service;

import org.springframework.stereotype.Service;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月7日 下午4:38:57 
* explain
*/
@Service
public class TestServiceImpl implements TestService{
	public String test(){
		return "new";
	}
}
