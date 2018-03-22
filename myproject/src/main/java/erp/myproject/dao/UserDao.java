//package erp.myproject.dao;
//
//import java.util.Date;
//
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import erp.myproject.entity.User;
//import erp.myproject.sys.dao.BaseDao;
//import erp.myproject.sys.dao.BaseDaoImpl;
//
//
///** 
//* @author joker E-mail:zhanglq@hnu.edu.cn 
//* @version createTime:2018年3月18日 下午2:37:58 
//* explain
//*/
//
//public interface UserDao extends UserDaoCustom, CrudRepository<User, String> {
//	
//	@Query("from User where loginName = ?1 ") //and delFlag = '" + User.DEL_FLAG_NORMAL + "'
//	public User findByLoginName(String loginName);
//	
//	//平台门户需要新增
//	@Query("from User where user_idcard=?1 and user_isvalid != 4 and del_flag = 0 ") //and delFlag = '" + User.DEL_FLAG_NORMAL + "'
//	public User findByIdcard(String userIdcard);
//	
//	@Query("from User where name = ?1 and delFlag = '" + User.DEL_FLAG_NORMAL + "'")
//	public User findByName(String name);
//	
//	@Query("from User where no = ?1 and delFlag = '" + User.DEL_FLAG_NORMAL + "'")
//	public User findByNo(String no);
//
//	@Modifying
//	@Query("update User set delFlag='" + User.DEL_FLAG_DELETE + "' where id = ?1")
//	//public int deleteById(String id);
//	public void deleteById(String id);
//	
//	@Modifying
//	@Query("update User set password=?1 where id = ?2")
//	public int updatePasswordById(String newPassword, String id);
//	
//	@Modifying
//	@Query("update User set loginIp=?1, loginDate=?2 where id = ?3")
//	public int updateLoginInfo(String loginIp, Date loginDate, String id);
//}
//
///**
// * DAO自定义接口
// * @author ThinkGem
// */
//interface UserDaoCustom extends BaseDao<User> {
//
//}
//
///**
// * DAO自定义接口实现
// * @author ThinkGem
// */
//@Repository
//class UserDaoImpl extends BaseDaoImpl<User> implements UserDaoCustom {
//
//}
