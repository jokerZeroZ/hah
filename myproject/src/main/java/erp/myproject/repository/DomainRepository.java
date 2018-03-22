package erp.myproject.repository;

import java.io.Serializable;
import java.util.List;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月8日 上午11:21:08 
* explain
*/

public interface DomainRepository<T,PK extends Serializable> {
	T load(PK id);
	
	T get(String id);
	
	List<T> findAll();
	
	void persist(T entity);
	
	PK save(T entity);
	
	void saveOrUpdate(T entity);
	
	void delete(PK id);
	
	void flush();
}
