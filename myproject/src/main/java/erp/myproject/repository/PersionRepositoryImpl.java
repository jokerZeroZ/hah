package erp.myproject.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import erp.myproject.entity.User;

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
	
	public User load(Long id){
		return (User)getCurrentSession().load(User.class, id);
	}
	
	public User get(String id){
		return (User)getCurrentSession().get(User.class,id);
	}
	
	public List<User> findAll(){
		return null;
	}
	
	public void persist(User entity){
		getCurrentSession().persist(entity);
	}
	
	public Long save(User entity){
		return (Long)getCurrentSession().save(entity);
	}
	
	public void saveOrUpdate(User entity){
		getCurrentSession().saveOrUpdate(entity);
	}
	
	public void delete(Long id){
		User User = load(id);
		getCurrentSession().delete(User);
	}
	
	public void flush(){
		getCurrentSession().flush();
	}
}

