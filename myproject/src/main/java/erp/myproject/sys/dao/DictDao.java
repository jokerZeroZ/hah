//package erp.myproject.sys.dao;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import erp.myproject.sys.entity.Dict;
//
///** 
//* @author joker E-mail:zhanglq@hnu.edu.cn 
//* @version createTime:2018年3月13日 下午5:01:45 
//* explain
//*/
//
//public interface DictDao extends DictDaoCustom, CrudRepository<Dict, String> {
//	
//	@Modifying
//	@Query("update Dict set delFlag='" + Dict.DEL_FLAG_DELETE + "' where id = ?1")
////	public int deleteById(String id);
//	public void deleteById(String id);
//	
//	@Query("from Dict where delFlag='" + Dict.DEL_FLAG_NORMAL + "' order by sort")
//	public List<Dict> findAllList();
//
//	@Query("select type from Dict where delFlag='" + Dict.DEL_FLAG_NORMAL + "' group by type order by type")
//	public List<String> findTypeList();
//
//	@Query("from Dict where type = ?1 order by sort")
//	public List<Dict> findDictListByType(String type);
//	
////	@Query("from Dict where delFlag='" + Dict.DEL_FLAG_NORMAL + "' and type=?1 order by sort")
////	public List<Dict> findByType(String type);
////	
////	@Query("select label from Dict where delFlag='" + Dict.DEL_FLAG_NORMAL + "' and value=?1 and type=?2")
////	public List<String> findValueByValueAndType(String value, String type);
//	
//}
//
///**
// * DAO自定义接口
// * @author ThinkGem
// */
//interface DictDaoCustom extends BaseDao<Dict> {
//
//}
//
///**
// * DAO自定义接口实现
// * @author ThinkGem
// */
//@Repository
//class DictDaoImpl extends BaseDaoImpl<Dict> implements DictDaoCustom {
//
//}
//
