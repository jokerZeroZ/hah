package erp.myproject.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import erp.myproject.entity.User;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月8日 上午11:24:19 
* explain
*/
@Repository
public interface PersionRepository extends DomainRepository<User , Long>{
	
	
}
