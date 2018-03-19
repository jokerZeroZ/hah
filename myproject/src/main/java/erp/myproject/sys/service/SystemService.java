package erp.myproject.sys.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.shiro.SecurityUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.myproject.dao.UserDao;
import erp.myproject.entity.User;

//import com.chinacreator.common.persistence.Page;
//import com.chinacreator.common.security.Digests;
//import com.chinacreator.common.service.BaseService;
//import com.chinacreator.common.utils.Encodes;
//import com.chinacreator.common.utils.StringUtils;
//import com.chinacreator.modules.sys.dao.MenuDao;
//import com.chinacreator.modules.sys.dao.RoleDao;
//import com.chinacreator.modules.sys.dao.UserDao;
//import com.chinacreator.modules.sys.entity.Menu;
//import com.chinacreator.modules.sys.entity.Office;
//import com.chinacreator.modules.sys.entity.Role;
//import com.chinacreator.modules.sys.entity.User;
//import com.chinacreator.modules.sys.security.SystemAuthorizingRealm;
//import com.chinacreator.modules.sys.utils.StringUtil;
//import com.chinacreator.modules.sys.utils.UserUtils;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月18日 下午2:25:55 
* explain
*/

@Service
@Transactional(readOnly = true)
public class SystemService extends BaseService {

	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	public static final int SALT_SIZE = 8;

	@Autowired
	private UserDao userDao;
//	@Autowired
//	private RoleDao roleDao;
//	@Autowired
//	private MenuDao menuDao;
//	@Autowired
//	private SystemAuthorizingRealm systemRealm;
//
//	@Autowired
//	private IdentityService identityService;
//
//	// -- User Service --//
//
//	public User getUser(String id) {
//		if(StringUtils.isNotEmpty(id)){
//			return userDao.findOne(id);
//		}else{
//			return new User();
//		}
//	}
//
//	public Page<User> findUser(Page<User> page, User user) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		User currentUser = UserUtils.getUser();
//		dc.createAlias("company", "company");
//		if (user.getCompany() != null
//				&& StringUtils.isNotEmpty(user.getCompany().getId())) {
//			dc.add(Restrictions.or(
//					Restrictions.eq("company.id", user.getCompany().getId()),
//					Restrictions.like("company.parentIds", "%,"
//							+ user.getCompany().getId() + ",%")));
//		}
//		dc.createAlias("office", "office");
//		if (user.getOffice() != null
//				&& StringUtils.isNotEmpty(user.getOffice().getId())) {
//			dc.add(Restrictions.or(
//					Restrictions.eq("office.id", user.getOffice().getId()),
//					Restrictions.like("office.parentIds", "%,"
//							+ user.getOffice().getId() + ",%")));
//		}
//		// 如果不是超级管理员，则不显示超级管理员用户
//		if (!currentUser.isAdmin()) {
//			dc.add(Restrictions.ne("id", "1"));
//		}
//		//add by hongze 2015-02-04 选择批准人
//		if (user.getUserType()!= null&&StringUtils.isNotEmpty(user.getUserType())&&"0".equals(user.getUserType())) {
//			dc.add(Restrictions.or(Restrictions.eq("userType","2"),Restrictions.eq("userType", "5")));
//		}
//		if (user.getUser_isvalid()!= null&&StringUtils.isNotEmpty(user.getUser_isvalid())&&"!34".equals(user.getUser_isvalid())) {
//			dc.add(Restrictions.sqlRestriction("user_isvalid not in ('3','4')"));
//		}
//		
//	//	dc.add(dataScopeFilter(currentUser, "office", "")); 注释掉了 add by tao.ren ??这段有什么用。导致合同干系人选人报错
//		// System.out.println(dataScopeFilterString(currentUser, "office", ""));
//		if (StringUtils.isNotEmpty(user.getLoginName())) {
//			dc.add(Restrictions.like("loginName", "%" + user.getLoginName()
//					+ "%"));
//		}
//		if (StringUtils.isNotEmpty(user.getName())) {
//			dc.add(Restrictions.like("name", "%" + user.getName() + "%"));
//		}
//		dc.add(Restrictions.eq(User.DEL_FLAG, User.DEL_FLAG_NORMAL));
////		if (StringUtils.isNotEmpty(user.getUser_isvalid())) {
////			dc.add(Restrictions.eq("user_isvalid", user.getUser_isvalid()));
////		}else{
////			dc.add(Restrictions.ne("user_isvalid", "4")); //屏蔽报表用户
////		}
//		if (!StringUtils.isNotEmpty(page.getOrderBy())) {
//			/*
//			dc.addOrder(Order.asc("company.code"))
//					.addOrder(Order.asc("office.code"))
//					.addOrder(Order.desc("id"));
//			*/		
//			//dc.addOrder(Order.asc("office.id"));
//			dc.addOrder(Order.asc("name"));
//		}
//		
//		return userDao.find(page, dc);
//	}
//	
//	
//	
//	public Page<User> findUserByRole(Page<User> page, User user) {
//		String sql = "  select u.id,u.name userName,u.login_name,d.label sex,o1.name comNmae,o.name offName,urr.name roleName,u.phone,u.mobile,o.id officeId "
//		    		 +"  from sys_user u inner join (select ur.user_id,r.name"
//		    		 +"  from sys_user_role ur "
//		    		 +"  inner join sys_role r "
//		    		 +"  on ur.role_id=r.id and r.del_flag='0' and r.id='"+user.getRoleId()+"') urr"
//		    		 +"  on urr.user_id=u.id "
//		    		 +"  left join sys_office o "
//		    		 +"  on u.office_id=o.id "
//		    		 +"  left join sys_office o1"
//		    		 +"  on u.company_id=o1.id"
//		    		 +"  left join sys_dict d"
//		    		 +"  on u.user_sex=d.value "
//		    		 +"  and d.type='sys_xb_type' "
//		    		 +"  where 1=1 ";
//		
//		if (user.getCompanyId() != null&& StringUtils.isNotEmpty(user.getCompanyId())) {   
//			sql += " and u.company_id in('"+user.getCompanyId()+"')";
//		}
//		if (user.getOfficeIdStr() != null&& StringUtils.isNotEmpty(user.getOfficeIdStr())) { 
//			sql += " and u.office_id in("+user.getOfficeIdStr()+")";
//		}
//		if (user.getName() != null&& StringUtils.isNotEmpty(user.getName())) {   
//			sql += " and u.name like '%"+user.getName()+"%'";
//		}
//		if (user.getLoginName() != null&& StringUtils.isNotEmpty(user.getLoginName())) {   
//			sql += " and u.login_name like '%"+user.getLoginName()+"%'";
//		}
//		sql += " and u.user_isvalid='2' ";
//		
//		if (!page.isDisabled() && !page.isNotCount()){
//	        String countQlString = "select count(*) from ("+sql+")";  
//	        List<Object> list = userDao.findBySql(countQlString);
//	        if (list.size() > 0){
//	        	page.setCount(Long.valueOf(list.get(0).toString()));
//	        }else{
//	        	page.setCount(list.size());
//	        }
//			if (page.getCount() < 1) {
//				return page;
//			}
//    	}
//	    long first = Long.valueOf(page.getFirstResult());
//	    long max = first + Long.valueOf(page.getMaxResults());
//		
//		String sqlstr = "select * from (select row_.*, rownum rownum_ from "+
//			     "(select * from ("+sql+") ) row_ where rownum <= "+max+") where rownum_ >"+first;
//		
//		List<Object[]> lists = userDao.findBySql(sqlstr);
//		List<User> list=new ArrayList<User>();
//		for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
//            Object[] objects = iterator.next();
//            User ur=new User();
//            ur.setId(objects[0]==null?"":objects[0].toString());
//            ur.setName(objects[1]==null?"":objects[1].toString());
//            ur.setLoginName(objects[2]==null?"":objects[2].toString());
//            ur.setUser_sex(objects[3]==null?"":objects[3].toString());
//            ur.setCompanyName(objects[4]==null?"":objects[4].toString());
//            ur.setOfficeName(objects[5]==null?"":objects[5].toString());
//            ur.setRoleName(objects[6]==null?"":objects[6].toString());
//            ur.setPhone(objects[7]==null?"":objects[7].toString());
//            ur.setMobile(objects[8]==null?"":objects[8].toString());
//            ur.setOfficeId(objects[9]==null?"":objects[9].toString());
//            list.add(ur);
//		 }
//		page.setList(list);
//		return page;
//	}
//	public Page<User> findNotChildUser(Page<User> page, User user) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		User currentUser = UserUtils.getUser();
//		dc.createAlias("company", "company");
//		if (user.getCompany() != null
//				&& StringUtils.isNotEmpty(user.getCompany().getId())) {
//			dc.add(Restrictions.or(
//					Restrictions.eq("company.id", user.getCompany().getId()),
//					Restrictions.like("company.parentIds", "%,"
//							+ user.getCompany().getId() + ",%")));
//		}
//		dc.createAlias("office", "office");
//		if (user.getOffice() != null
//				&& StringUtils.isNotEmpty(user.getOffice().getId())) {
//					
//			dc.add(Restrictions.eq("office.id", user.getOffice().getId()));		
//					
//		}
//		// 如果不是超级管理员，则不显示超级管理员用户
//		if (!currentUser.isAdmin()) {
//			dc.add(Restrictions.ne("id", "1"));
//		}
//		//dc.add(dataScopeFilter(currentUser, "office", ""));
//		// System.out.println(dataScopeFilterString(currentUser, "office", ""));
//		if (StringUtils.isNotEmpty(user.getLoginName())) {
//			dc.add(Restrictions.like("loginName", "%" + user.getLoginName()
//					+ "%"));
//		}
//		if (StringUtils.isNotEmpty(user.getName())) {
//			dc.add(Restrictions.like("name", "%" + user.getName() + "%"));
//		}
//		if (StringUtils.isNotEmpty(user.getUser_isvalid())) {
//			dc.add(Restrictions.eq("user_isvalid", user.getUser_isvalid()));
//		}else{
//			dc.add(Restrictions.ne("user_isvalid", "4")); //屏蔽报表用户
//		}
//		dc.add(Restrictions.eq(User.DEL_FLAG, User.DEL_FLAG_NORMAL));
//		if (!StringUtils.isNotEmpty(page.getOrderBy())) {
//			dc.addOrder(Order.asc("company.code"))
//					.addOrder(Order.asc("office.code"))  
//					.addOrder(Order.desc("id"));
//		}
//		return userDao.find(page, dc);
//	}
//
//	public List<User> findNotChildUserList(User user) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		User currentUser = UserUtils.getUser();
//		dc.createAlias("company", "company");
//		if (user.getCompany() != null
//				&& StringUtils.isNotEmpty(user.getCompany().getId())) {
//			dc.add(Restrictions.or(
//					Restrictions.eq("company.id", user.getCompany().getId()),
//					Restrictions.like("company.parentIds", "%,"
//							+ user.getCompany().getId() + ",%")));
//		}
//		dc.createAlias("office", "office");
//		if (user.getOffice() != null
//				&& StringUtils.isNotEmpty(user.getOffice().getId())) {
//					
//			dc.add(Restrictions.eq("office.id", user.getOffice().getId()));		
//					
//		}
//		// 如果不是超级管理员，则不显示超级管理员用户
//		if (!currentUser.isAdmin()) {
//			dc.add(Restrictions.ne("id", "1"));
//		}
//		//dc.add(dataScopeFilter(currentUser, "office", ""));
//		// System.out.println(dataScopeFilterString(currentUser, "office", ""));
//		if (StringUtils.isNotEmpty(user.getLoginName())) {
//			dc.add(Restrictions.like("loginName", "%" + user.getLoginName()
//					+ "%"));
//		}
//		if (StringUtils.isNotEmpty(user.getName())) {
//			dc.add(Restrictions.like("name", "%" + user.getName() + "%"));
//		}
//		if (StringUtils.isNotEmpty(user.getUser_isvalid())) {
//			dc.add(Restrictions.eq("user_isvalid", user.getUser_isvalid()));
//		}else{
//			dc.add(Restrictions.ne("user_isvalid", "4")); //屏蔽报表用户
//		}
//		dc.add(Restrictions.eq(User.DEL_FLAG, User.DEL_FLAG_NORMAL));
//		return userDao.find(dc);
//	}
//	
	public User getUserByLoginName(String loginName) {
		return userDao.findByLoginName(loginName);
	}
//	
//	//平台门户需要新增
//	public User getUserByIdcard(String userIdcard) {
//		return userDao.findByIdcard(userIdcard);
//	}
//	
//	public User getUserByNo(String no) {
//		return userDao.findByNo(no);
//	}
//
//	@Transactional(readOnly = false)
//	public void saveUser(User user) {
//		if (StringUtils.isEmpty(user.getId())) {
//			user.setId(StringUtils.generateId());
//			user.setLogUserType("6"); //未分配人员
//		}
//		userDao.clear();
//		userDao.save(user);
//		systemRealm.clearAllCachedAuthorizationInfo();
//		// 同步到Activiti
//		saveActivitiUser(user, user.getId() == null);
//	}
//
//	@Transactional(readOnly = false)
//	public void deleteUser(String id) {
//		userDao.deleteById(id);
//		// 同步到Activiti
//		deleteActivitiUser(userDao.findOne(id));
//	}
//
//	@Transactional(readOnly = false)
//	public void updatePasswordById(String id, String loginName,
//			String newPassword) {
//		userDao.updatePasswordById(entryptPassword(newPassword), id);
//		systemRealm.clearCachedAuthorizationInfo(loginName);
//	}
//
	@Transactional(readOnly = false)
	public void updateUserLoginInfo(String id) {
		userDao.updateLoginInfo(SecurityUtils.getSubject().getSession()
				.getHost(), new Date(), id);
	}
//
//	/**
//	 * 生成安全的密码，生成随机的16位salt并经过1024次 sha-1 hash
//	 */
//	public static String entryptPassword(String plainPassword) {
//		byte[] salt = Digests.generateSalt(SALT_SIZE);
//		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt,
//				HASH_INTERATIONS);
//		return Encodes.encodeHex(salt) + Encodes.encodeHex(hashPassword);
//	}
//
//	/**
//	 * 验证密码
//	 * 
//	 * @param plainPassword
//	 *            明文密码
//	 * @param password
//	 *            密文密码
//	 * @return 验证成功返回true
//	 */
//	public static boolean validatePassword(String plainPassword, String password) {
//		byte[] salt = Encodes.decodeHex(password.substring(0, 16));
//		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt,
//				HASH_INTERATIONS);
//		return password.equals(Encodes.encodeHex(salt)
//				+ Encodes.encodeHex(hashPassword));
//	}
//
//	// -- Role Service --//
//
//	public Role getRole(String id) {
//		return roleDao.findOne(id);
//	}
//
//	public Role findRoleByName(String name) {
//		return roleDao.findByName(name);
//	}
//
//	public Role findRoleById(String id) {
//		return roleDao.findOne(id);
//	}
//
//	public List<Role> findAllRole() {
//		User user = UserUtils.getUser();
//		DetachedCriteria dc = roleDao.createDetachedCriteria();
//		dc.createAlias("office", "office");
//		dc.createAlias("userList", "userList", JoinType.LEFT_OUTER_JOIN);
//		dc.add(dataScopeFilter(user, "office", "userList"));
//		dc.add(Restrictions.eq(Role.DEL_FLAG, Role.DEL_FLAG_NORMAL));
//		dc.addOrder(Order.asc("office.code")).addOrder(Order.asc("name"));
//		return roleDao.find(dc);
//	}
//
//	@Transactional(readOnly = false)
//	public void saveRole(Role role) {
//		if (StringUtils.isEmpty(role.getId())) {
//			role.setId(StringUtils.generateId());
//		}
//		roleDao.clear();
//		roleDao.save(role);
//		systemRealm.clearAllCachedAuthorizationInfo();
//		// 同步到Activiti
//		saveActivitiGroup(role, role.getId() == null);
//	}
//
//	@Transactional(readOnly = false)
//	public void deleteRole(String id) {
//		roleDao.deleteById(id);
//		systemRealm.clearAllCachedAuthorizationInfo();
//		// 同步到Activiti
//		deleteActivitiGroup(roleDao.findOne(id));
//	}
//
//	@Transactional(readOnly = false)
//	public Boolean outUserInRole(Role role, String userId) {
//		User user = userDao.findOne(userId);
//		List<String> roleIds = user.getRoleIdList();
//		List<Role> roles = user.getRoleList();
//		//
//		if (roleIds.contains(role.getId())) {
//			roles.remove(role);
//			saveUser(user);
//			return true;
//		}
//		return false;
//	}
//
//	@Transactional(readOnly = false)
//	public User assignUserToRole(Role role, String userId) {
//		User user = userDao.findOne(userId);
//		List<String> roleIds = user.getRoleIdList();
//		if (roleIds.contains(role.getId())) {
//			return null;
//		}
//		user.getRoleList().add(role);
//		saveUser(user);
//		return user;
//	}
//
//	// -- Menu Service --//
//
//	public Menu getMenu(String id) {
//		return menuDao.findOne(id);
//	}
//
//	public List<Menu> findAllMenu() {
//		return UserUtils.getMenuList();
//	}
//
//	@Transactional(readOnly = false)
//	public void saveMenu(Menu menu) {
//		if (StringUtils.isEmpty(menu.getId())) {
//			menu.setId(StringUtils.generateId());
//		}
//		menu.setParent(this.getMenu(menu.getParent().getId()));
//		String oldParentIds = menu.getParentIds(); // 获取修改前的parentIds，用于更新子节点的parentIds
//		menu.setParentIds(menu.getParent().getParentIds()
//				+ menu.getParent().getId() + ",");
//		menuDao.clear();
//		menuDao.save(menu);
//		// 更新子节点 parentIds
//		List<Menu> list = menuDao.findByParentIdsLike("%," + menu.getId()
//				+ ",%");
//		for (Menu e : list) {
//			e.setParentIds(e.getParentIds().replace(oldParentIds,
//					menu.getParentIds()));
//		}
//		menuDao.save(list);
//		systemRealm.clearAllCachedAuthorizationInfo();
//		UserUtils.removeCache(UserUtils.CACHE_MENU_LIST);
//	}
//
//	@Transactional(readOnly = false)
//	public void deleteMenu(String id) {
//		menuDao.deleteById(id, "%," + id + ",%");
//		systemRealm.clearAllCachedAuthorizationInfo();
//		UserUtils.removeCache(UserUtils.CACHE_MENU_LIST);
//	}
//
//	public List<User> findUserListByOffice(Office office,Office currentOffice,User user) {
//
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		User currentUser = UserUtils.getUser();
//
//		dc.createAlias("office", "office");
//		if (office!=null && StringUtils.isNotEmpty(office.getId())) {
//			
//			 dc.add(Restrictions.or( Restrictions.eq("office.id",
//			 office.getId()), Restrictions.like("office.parentIds", "%," +
//			 office.getId() + ",%")));
//			 
//		//	dc.add(Restrictions.eq("office.id", office.getId()));
//		}
//		
//		if(currentOffice!=null && StringUtils.isNotEmpty(currentOffice.getId())){
//			dc.add(Restrictions.eq("office.id", currentOffice.getId()));
//		}
//		if(user!=null && StringUtils.isNotEmpty(user.getName())){
//			dc.add(Restrictions.like("name", "%"+user.getName()+"%"));
//		}
//		
//		// 如果不是超级管理员，则不显示超级管理员用户
//		if (!currentUser.isAdmin()) {
//			dc.add(Restrictions.ne("id", "1"));
//		}
//		//方便出账报表转移阿米巴
//		//dc.add(Restrictions.eq(User.DEL_FLAG, User.DEL_FLAG_NORMAL));
//		//dc.add(dataScopeFilter(currentUser, "office", "")); //20150512
//		dc.addOrder(Order.asc("name"));
//
//		List<User> list = userDao.find(dc);
//		return list;
//	}
//
//	// /////////////// Synchronized to the Activiti //////////////////
//
//	/**
//	 * 是需要同步Activiti数据，如果从未同步过，则同步数据。
//	 */
//	private static boolean isSynActivitiIndetity = true;
//
//	public void afterPropertiesSet() throws Exception {
//		if (isSynActivitiIndetity) {
//			isSynActivitiIndetity = false;
//			List<Group> groupList = identityService.createGroupQuery().list();
//			List<org.activiti.engine.identity.User> userList = identityService
//					.createUserQuery().list();
//			if (groupList.size() == 0 && userList.size() == 0) {
//				// 同步角色数据
//				Iterator<Role> roles = roleDao.findAll().iterator();
//				while (roles.hasNext()) {
//					Role role = roles.next();
//					saveActivitiGroup(role, true);
//				}
//				// 同步用户数据
//				Iterator<User> users = userDao.findAll().iterator();
//				while (users.hasNext()) {
//					saveActivitiUser(users.next(), true);
//				}
//			}
//		}
//	}
//
//	private void saveActivitiGroup(Role role, boolean isNew) {
//		String groupId = role.getEnname();
//		Group group = null;
//		if (!isNew) {
//			group = identityService.createGroupQuery().groupId(groupId)
//					.singleResult();
//		}
//		if (group == null) {
//			group = identityService.newGroup(groupId);
//		}
//		group.setName(role.getName());
//		group.setType(role.getRoleType());
//		identityService.saveGroup(group);
//	}
//
//	public void deleteActivitiGroup(Role role) {
//		if (role != null) {
//			String groupId = role.getEnname();
//			identityService.deleteGroup(groupId);
//		}
//	}
//
//	private void saveActivitiUser(User user, boolean isNew) {
//		String userId = ObjectUtils.toString(user.getId());
//		org.activiti.engine.identity.User activitiUser = null;
//		if (!isNew) {
//			activitiUser = identityService.createUserQuery().userId(userId)
//					.singleResult();
//		}
//		// 是新增用户
//		if (activitiUser == null) {
//			activitiUser = identityService.newUser(userId);
//		} else {
//			List<Group> activitiGroups = identityService.createGroupQuery()
//					.groupMember(userId).list();
//			for (Group group : activitiGroups) {
//				identityService.deleteMembership(userId, group.getId());
//			}
//		}
//		activitiUser.setFirstName(user.getName());
//		activitiUser.setLastName(StringUtils.EMPTY);
//		activitiUser.setPassword(StringUtils.EMPTY);
//		activitiUser.setEmail(user.getEmail());
//		identityService.saveUser(activitiUser);
//		// 同步用户角色关联数据
//		for (String roleId : user.getRoleIdList()) {
//			Role role = roleDao.findOne(roleId);
//			// 查询activiti中是否有该权限
//			Group group = identityService.createGroupQuery()
//					.groupId(role.getEnname()).singleResult();
//			// 不存在该权限，新增
//			if (group == null) {
//				String groupId = role.getEnname();
//				group = identityService.newGroup(groupId);
//				group.setName(role.getName());
//				group.setType(role.getRoleType());
//				identityService.saveGroup(group);
//			}
//			identityService.createMembership(userId, roleDao.findOne(roleId)
//					.getEnname());
//		}
//	}
//
//	private void deleteActivitiUser(User user) {
//		if (user != null) {
//			String userId = ObjectUtils.toString(user.getId());
//			identityService.deleteUser(userId);
//		}
//	}
//
//	// /////////////// Synchronized to the Activiti end //////////////////
//
//	public List<String> findRoleTypeList() {
//		return roleDao.findRoleTypeList();
//	}
//
//	public Page<Role> findRole(Page<Role> page, Role role) {
//		DetachedCriteria dc = roleDao.createDetachedCriteria();
//
//		if (StringUtils.isNotEmpty(role.getRoleType())) {
//			dc.add(Restrictions.eq("roleType", role.getRoleType()));
//		}
//		// 只查询出未删除的记录
//		dc.add(Restrictions.eq("delFlag", role.getDelFlag()));
//		dc.addOrder(Order.asc("name"));
////		System.out.println(">>>>>>>" + role.getRoleType());
////		System.out.println(">>>>>>>" + role.getDelFlag());
//		return roleDao.find(page, dc);
//	}
//	
//	public List<User> findUser(Office office) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
////		User currentUser = UserUtils.getUser();
//
//		dc.createAlias("office", "office");
//		if (StringUtils.isNotEmpty(office.getId())) {
//			/*
//			 * dc.add(Restrictions.or( Restrictions.eq("office.id",
//			 * office.getId()), Restrictions.like("office.parentIds", "%," +
//			 * office.getId() + ",%")));
//			 */
//			dc.add(Restrictions.eq("office.id", office.getId()));
//		}
//		dc.add(Restrictions.ne("id", "1"));
//		List<User> list = userDao.find(dc);
//		return list;
//	}
//	
//	@Transactional(readOnly = false)
//	public long count(User user) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		if (user.getOffice()!=null
//				&& StringUtils.isNotEmpty(user.getOffice().getId())
//				&& user.getCompany()!=null
//				&& StringUtils.isNotEmpty(user.getCompany().getId())
//				) {
//			 dc.createAlias("office", "office");
//			 dc.createAlias("company", "company");
//			 dc.add(
//					 Restrictions.or( Restrictions.eq("office.id",
//					 user.getOffice().getId()), Restrictions.like("office.parentIds", "%," +
//							 user.getOffice().getId() + ",%"),
//							 Restrictions.eq("company.id",
//									 user.getCompany().getId()),
//									 Restrictions.like("company.parentIds", "%," +
//											 user.getOffice().getId() + ",%")
//							 
//							 )
//							 
//					 );
//		}
//		/*
//		if (user.getCompany()!=null
//				&& StringUtils.isNotEmpty(user.getCompany().getId())) {
//			 dc.createAlias("company", "company");
//			 dc.add(Restrictions.or( Restrictions.eq("company.id",
//					 user.getCompany().getId()), Restrictions.like("company.parentIds", "%," +
//							 user.getCompany().getId() + ",%")));
//			
//		}
//		*/
//		dc.add(Restrictions.eq("delFlag", User.DEL_FLAG_NORMAL));
//		return userDao.count(dc);
//	}
//	
//	/**
//	 * 统一权限接口
//	 * @param menuName 菜单名称
//	 * @param userId 用户id
//	 * @return result 1=系统管理员；2=公司级；3=部门级；4=阿米巴级；5=个人级；
//	 * add by haijie.jiang 20160421
//	 */
//	public String getAuth(String menuName, String userId) {
//		String sql = "select * from sys_role where id in (select role_id from sys_user_role where user_id = '"+userId+"') and name = '系统管理员'";
//		String countQlString = "select count(*) from ("+sql+")";  
//        List<Object> list = userDao.findBySql(countQlString);
//        if (list.size() > 0){
//        	return "1";
//        }else{
//        	sql = "select * from sys_role where id in (select role_id from sys_user_role where user_id = '"+userId+"') and name = '数据权限-"+menuName+"-公司级'";
//        	countQlString = "select count(*) from ("+sql+")"; 
//        	list = userDao.findBySql(countQlString);
//        	if (list.size() > 0){
//            	return "2";
//            }else{
//            	sql = "select * from sys_role where id in (select role_id from sys_user_role where user_id = '"+userId+"') and name = '数据权限-"+menuName+"-部门级'";
//            	countQlString = "select count(*) from ("+sql+")"; 
//            	list = userDao.findBySql(countQlString);
//            	if (list.size() > 0){
//                	return "3";
//                }else{
//                	sql = "select * from sys_role where id in (select role_id from sys_user_role where user_id = '"+userId+"') and name = '数据权限-"+menuName+"-阿米巴级'";
//                	countQlString = "select count(*) from ("+sql+")"; 
//                	list = userDao.findBySql(countQlString);
//                	if (list.size() > 0){
//                    	return "4";
//                    }else{
//                    	sql = "select * from sys_role where id in (select role_id from sys_user_role where user_id = '"+userId+"') and name = '数据权限-"+menuName+"-个人级'";
//                    	countQlString = "select count(*) from ("+sql+")"; 
//                    	list = userDao.findBySql(countQlString);
//                    	if (list.size() > 0){
//                        	return "5";
//                        }else{
//                        	return "5";
//                        }
//                    }
//                }
//            }
//        }
//	}
//	
//	public Map<String,List<String>> getUserOrgIdByAuth(String userId,String level){
//		Map<String,List<String>> map= new HashMap<String,List<String>>();
//		
//		if("3".equals(level)){  //部门级别
//			String sqlOrgId = " select a.id "; 
//			sqlOrgId += "  from sys_office a";
//			sqlOrgId += "  start with a.id in (";
//			sqlOrgId += "   select o.id";
//			sqlOrgId += "    from sys_office o";
//			sqlOrgId += "   where o.type='5' or o.type='4' ";
//			sqlOrgId += "  connect by prior o.parent_id = o.id ";
//			sqlOrgId += "  start with o.id = ( ";
//			sqlOrgId += "   select su.office_id";
//			sqlOrgId += "  from sys_user su ";
//			sqlOrgId += "  where su.id='"+userId+"'";
//			sqlOrgId += "  )) connect by prior a.id = a.parent_id ";
//	        List<Object> list = userDao.findBySql(sqlOrgId);
//	        List<String> orgList=new ArrayList<String>();
//	        if (list.size() > 0){
//	        	for(int i=0;i<list.size();i++){
//	        		orgList.add(list.get(i).toString());
//	        	}
//	        }
//	        map.put("org",orgList);
//	        
//			String sqlUserId = " select su.id "; 
//			sqlUserId+=" from sys_user su";
//			sqlUserId+=" where 1=1 ";
//			sqlUserId+=" and su.office_id in (";
//			sqlUserId+=StringUtil.listToString(orgList);
//			sqlUserId+=")";
//	        List<Object> lists = userDao.findBySql(sqlUserId);
//	        List<String> userList=new ArrayList<String>();
//	        if (lists.size() > 0){
//	        	for(int i=0;i<lists.size();i++){
//	        		userList.add(lists.get(i).toString());
//	        	}
//	        }
//	        map.put("user",userList);
//		}else if("4".equals(level)){   //阿米巴级别
//			String sqlOrgId = " "; 
//			sqlOrgId += "   select su.office_id";
//			sqlOrgId += "  from sys_user su ";
//			sqlOrgId += "  where su.id='"+userId+"'";
//	        List<Object> list = userDao.findBySql(sqlOrgId);
//	        List<String> orgList=new ArrayList<String>();
//	        if (list.size() > 0){
//	        	for(int i=0;i<list.size();i++){
//	        		orgList.add(list.get(i).toString());
//	        	}
//	        }
//	        map.put("org",orgList);
//			
//	        String sqlUserId = " select su.id "; 
//			sqlUserId+=" from sys_user su";
//			sqlUserId+=" where 1=1 ";
//			sqlUserId+=" and su.office_id in (";
//			sqlUserId+=StringUtil.listToString(orgList);
//			sqlUserId+=")";
//	        List<Object> lists = userDao.findBySql(sqlUserId);
//	        List<String> userList=new ArrayList<String>();
//	        if (lists.size() > 0){
//	        	for(int i=0;i<lists.size();i++){
//	        		userList.add(lists.get(i).toString());
//	        	}
//	        }
//	        map.put("user",userList);
//		}
//        
//		return map;
//	}
//	
//	/**
//	 * 根据角色id获取用户
//	 * @param page
//	 * @param roleId
//	 * @return
//	 * add by haijie.jiang 20160421
//	 */
//	public Page<User> getUserPageByRoleId(Page<User> page,String roleId) {
//		List<User>  rs_list = new ArrayList<User>();
//		StringBuffer sql = new StringBuffer();
//		sql.append("SELECT t.id,t.login_name,t.name,t.company_id,t.office_id,t.mobile,t.phone FROM sys_user t ");
//		sql.append("left join sys_user_role tt on t.id=tt.user_id ");
//		sql.append("where t.user_isvalid='2' ");
//		if(StringUtils.isNotEmpty(roleId)){
//			sql.append("and tt.role_id='"+roleId+"'");
//		}
//		sql.append("order by t.name ");
//		if (!page.isDisabled() && !page.isNotCount()){
//	        String countQlString = "select count(*) from ("+sql+")";  
//	        List<Object> list = userDao.findBySql(countQlString);
//	        if (list.size() > 0){
//	        	page.setCount(Long.valueOf(list.get(0).toString()));
//	        }else{
//	        	page.setCount(list.size());
//	        }
//			if (page.getCount() < 1) {
//				return page;
//			}
//			page.setPageSize(500);
//    	}
//	    long first = Long.valueOf(page.getFirstResult());
//	    long max = first + Long.valueOf(page.getMaxResults());
//		
//		String sqlstr = "select * from (select row_.*, rownum rownum_ from "+
//				     "(select * from ("+sql+") ) row_ where rownum <= "+max+") where rownum_ >"+first;
//		List<Object[]> lists = userDao.findBySql(sqlstr);
//		for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
//	            Object[] objects = iterator.next();
//	            User userbean=new User();
//	            userbean.setId(objects[0]==null?"":objects[0].toString());
//	            userbean.setLoginName(objects[1]==null?"":objects[1].toString());
//	            userbean.setName(objects[2]==null?"":objects[2].toString());
//	            userbean.setCompanyId(objects[3]==null?"":objects[3].toString());
//	            userbean.setOfficeId(objects[4]==null?"":objects[4].toString());
//	            userbean.setMobile(objects[5]==null?"":objects[5].toString());
//	            userbean.setPhone(objects[6]==null?"":objects[6].toString());
//	            rs_list.add(userbean);
//	    } 
//	    page.setList(rs_list);
//		return page;
//	}
//	/*
//	 * 人员设置查询修改页面
//	 * 
//	 */
//	public List<User> findUserByUserSet(Page<User> page, User user) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		if(user!= null&&null!=user.getLogUserType()&&!"-1".equals(user.getLogUserType())){
//			dc.add(Restrictions.eq("logUserType", user.getLogUserType()));
//		}
//		//dc.createAlias("company", "office");
//		dc.createAlias("office", "office");
//		if (user!= null&&user.getOffice() != null&& StringUtils.isNotEmpty(user.getOffice().getId())) {
//			dc.add(Restrictions.like("office.id", "%"+ user.getOffice().getId() + "%"));
//		}
//		if (user!= null&&user.getCompany() != null&& StringUtils.isNotEmpty(user.getCompany().getId())) {
//			dc.add(Restrictions.like("office.parentIds", "%,"+ user.getCompany().getId() + ",%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getNo())) {
//			dc.add(Restrictions.like("loginName", "%" + user.getNo() + "%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getName())) {
//			dc.add(Restrictions.like("name", "%" + user.getName() + "%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getUser_isvalid())) {
//			dc.add(Restrictions.like("user_isvalid", "%" + user.getUser_isvalid() + "%"));
//		}
//		dc.add(Restrictions.eq(User.DEL_FLAG, User.DEL_FLAG_NORMAL));
//		dc.add(Restrictions.ne("user_isvalid","4"));
//		return userDao.find(dc);
//	}
//	/*
//	 * 研发项目研发人员选择页面
//	 * 
//	 */
//	public List<User> findUserListByUserSet(User user) {
//		DetachedCriteria dc = userDao.createDetachedCriteria();
//		if(user!= null&&null!=user.getLogUserType()&&!"-1".equals(user.getLogUserType())){
//			dc.add(Restrictions.eq("logUserType", user.getLogUserType()));
//		}
//		//dc.createAlias("company", "office");
//		dc.createAlias("office", "office");
//		if (user!= null&&user.getOffice() != null&& StringUtils.isNotEmpty(user.getOffice().getId())) {
//			dc.add(Restrictions.like("office.id", "%"+ user.getOffice().getId() + "%"));
//		}
//		if (user!= null&&user.getCompany() != null&& StringUtils.isNotEmpty(user.getCompany().getId())) {
//			dc.add(Restrictions.like("office.parentIds", "%,"+ user.getCompany().getId() + ",%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getNo())) {
//			dc.add(Restrictions.like("no", "%" + user.getNo() + "%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getName())) {
//			dc.add(Restrictions.like("name", "%" + user.getName() + "%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getLoginName())) {
//			dc.add(Restrictions.like("loginName", "%" + user.getLoginName() + "%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getUser_isvalid())) {
//			dc.add(Restrictions.like("user_isvalid", "%" + user.getUser_isvalid() + "%"));
//		}
//		if (user!= null&&StringUtils.isNotEmpty(user.getUser_idcard())) {
//			dc.add(Restrictions.eq("user_idcard", user.getUser_idcard()));
//		}
//		dc.add(Restrictions.eq(User.DEL_FLAG, User.DEL_FLAG_NORMAL));
//		dc.add(Restrictions.ne("user_isvalid","4"));
//		return userDao.find(dc);
//	}
//	
//	public List<User> findUserListByUserSetIds(String userIds) {
//		List<User> list=new ArrayList<User>();
//		if(StringUtils.isNotBlank(userIds)&&StringUtils.isNotEmpty(userIds)){
//			String [] useridarray=userIds.split(",");
//			for(int i=0;i<useridarray.length;i++){
//				String id=useridarray[i];
//				User user=userDao.findOne(id);
//				list.add(user);
//			}
//		}
//		return list;
//	}
//	
//
//	public void updateAllUser(List<User> userlist) {
//        for(int i=0;i<userlist.size();i++){
//        	userDao.save(userlist.get(i));
//        }
//        userDao.flush();
//	}
}

