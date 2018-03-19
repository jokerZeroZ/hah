//package erp.myproject.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import erp.myproject.entity.Person;
//import erp.myproject.repository.PersionRepository;
//
///** 
//* @author joker E-mail:zhanglq@hnu.edu.cn 
//* @version createTime:2018年3月8日 上午10:32:03 
//* explain
//*/
//@Service
//public class PersionServiceImpl implements PersionService{
//	@Autowired
//	private PersionRepository persionRepository;
//	
//	public Long savePerson(){
//		Person person = new Person();
//		person.setUsername("joker");
//		person.setAddress("tianjin");
//		person.setPhone("13322332222");
//		person.setRemark("this is me");
//		return persionRepository.save(person);
//	}
//	
//	public void show(){
//		Person person = new Person();
//		person = persionRepository.get((long) 1);
//		String name = person.getUsername();
//		System.out.println(name);
//	}
//}
