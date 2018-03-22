package erp.myproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.myproject.entity.Person;
import erp.myproject.entity.User;
import erp.myproject.repository.PersionRepository;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月19日 上午11:27:31 
* explain
*/
@Service
public class LoginService {
	
	@Autowired
	private PersionRepository persionRepository;
	
	public int login(String username,String password){
		User user = new User();
		user = persionRepository.get("1");
		String name = user.getName();
		String passwd = user.getPassword();
		if(name.equals(null)||passwd.equals(null))
			return 0;
		if(name.equals(username) && password.equals(passwd))
			return 1;
		else
			return 0;
	}
}
