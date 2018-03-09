package erp.myproject.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import erp.myproject.entity.Person;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月8日 上午10:31:04 
* explain
*/
@Repository
public class PersionRepositoryImpl implements PersionRepository{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getCurrentSession(){
		return this.sessionFactory.openSession();
	}
	
	public Person load(Long id){
		return (Person)getCurrentSession().load(Person.class, id);
	}
	
	public Person get(Long id){
		return (Person)getCurrentSession().get(Person.class,id);
	}
	
	public List<Person> findAll(){
		return null;
	}
	
	public void persist(Person entity){
		getCurrentSession().persist(entity);
	}
	
	public Long save(Person entity){
		return (Long)getCurrentSession().save(entity);
	}
	
	public void saveOrUpdate(Person entity){
		getCurrentSession().saveOrUpdate(entity);
	}
	
	public void delete(Long id){
		Person person = load(id);
		getCurrentSession().delete(person);
	}
	
	public void flush(){
		getCurrentSession().flush();
	}
}











