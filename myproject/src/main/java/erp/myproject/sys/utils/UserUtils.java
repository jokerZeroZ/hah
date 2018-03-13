package erp.myproject.sys.utils;
import java.security.Principal;
/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月13日 上午11:11:14 
* explain
*/
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.UnavailableSecurityManagerException;
import org.apache.shiro.subject.Subject;
import org.hibernate.Query;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import erp.myproject.entity.User;
import erp.myproject.sys.dao.BaseDao;
import erp.myproject.sys.service.BaseService;

/**
 * 用户工具类
 * 
 * @author ThinkGem
 * @version 2013-5-29
 */
/**
 * @author Administrator
 *
 */
public class UserUtils extends BaseService { 
	
	private static BaseDao userDao = SpringContextHolder.getBean(BaseDao.class);
	/*	private static ReferUserDao referUserDao = SpringContextHolder.getBean(ReferUserDao.class);
	private static MenuDao menuDao = SpringContextHolder.getBean(MenuDao.class);
	private static AreaDao areaDao = SpringContextHolder.getBean(AreaDao.class);
	private static OfficeDao officeDao = SpringContextHolder
			.getBean(OfficeDao.class);
	private static OfficeBfDao officeBfDao = SpringContextHolder
			.getBean(OfficeBfDao.class);


	private static RoleDao roleDao = SpringContextHolder.getBean(RoleDao.class);

	// private static JydTreeinfoDao jydTreeinfoDao =
	// SpringContextHolder.getBean(JydTreeinfoDao.class);
	*/
	public static final String CACHE_USER = "user";
	/*
	public static final String CACHE_MENU_LIST = "menuList";
	public static final String CACHE_AREA_LIST = "areaList";
	public static final String CACHE_OFFICE_LIST = "officeList";
	public static final String CACHE_PDS_LIST = "pdsList";
	public static final String CACHE_DIVISION_LIST = "divisionList";
	public static final String CACHE_MDICT_LIST = "mdictList";
	public static final String CACHE_MDICT_LIST_TYPE = "mdictListType";
	public static final String CACHE_OFFICE_DEPT_LIST = "mdictDeptListType";
	public static final String CACHE_OFFICE1_DEPT_LIST = "mdictDept1ListType";
	public static final String CACHE_OFFICE4_DEPT_LIST = "mdictDept4ListType";
	public static final String CACHE_MANAGE_USER_LIST="manageUserList";
	public static final String CACHE_MANAGE_USERID_LIST="manageUserIdList";
	public static final String CACHE_getAllUserList="getAllUserList";
	public static final String CACHE_OFFICE_BF_LIST="officeBfList";
	
	*/
	public static User getUser() {
//		User user = (User) getCache(CACHE_USER);
		User user = new User();
		if (user == null) {
			Principal principal = (Principal) SecurityUtils.getSubject()
					.getPrincipal();
			if (principal != null) {
				//user = userDao.findOne(principal.getId());
			//	user = userDao.findOne(principal.getId());
//				putCache(CACHE_USER, user);
			}
		}
		if (user == null) {
			user = new User();
			SecurityUtils.getSubject().logout();
		}
		return user;
	}
/*
	public static String getRequestUrl() {
		Principal principal = (Principal) SecurityUtils.getSubject()
				.getPrincipal();
		if (principal != null) {
			return principal.getRequestUrl();
		}
		return null;
	}

	public static void clearRequestUrl() {
		Principal principal = (Principal) SecurityUtils.getSubject()
				.getPrincipal();
		if (principal != null) {
			principal.setRequestUrl(null);
		}
	}

	public static User getUser(boolean isRefresh) {
		if (isRefresh) {
			removeCache(CACHE_USER);
		}
		return getUser();
	}

	public static List<Menu> getMenuList() {
		@SuppressWarnings("unchecked")
		List<Menu> menuList = (List<Menu>) getCache(CACHE_MENU_LIST);
		if (menuList == null) {
			User user = getUser();
			if (user.isAdmin()) {
				menuList = menuDao.findAllList();
			} else {
				menuList = menuDao.findByUserId(user.getId());
			}
			putCache(CACHE_MENU_LIST, menuList);
		}
		return menuList;
	}
	
	/**
	 * 根据登录的用户ID获取能够访问的组织机构
	 * 
	 * @return 机构列表
	 */
	/*
	public static List<Office> getOfficeListByUserId() {
		@SuppressWarnings("unchecked")
		List<Office> officeList = (List<Office>) getCache(CACHE_OFFICE_LIST);
		if (officeList == null) {
			User user = getUser();
			if (user.isAdmin()) {
				officeList = officeDao.findAllList();
			} else {
				officeList = officeDao.findByUserId(user.getId());
			}
			putCache(CACHE_OFFICE_LIST, officeList);
		}
		return officeList;
	}

	public static List<Menu> getMenuChildList(String menuId) {

		List<Menu> menuChildList = Lists.newArrayList();
		if (StringUtils.isEmpty(menuId)) {
			return menuChildList;
		}

		@SuppressWarnings("unchecked")
		List<Menu> menuList = (List<Menu>) getCache(CACHE_MENU_LIST);
		if (menuList != null) {
			boolean hasRight = false;
			for (Menu menu : menuList) {
				if (menu.getId().toString().equals(menuId)) {
					hasRight = true;
					break;
				}
			}

			if (hasRight) {
				for (Menu menu : menuList) {
					if (menu.getParent() != null
							&& menu.getParent().getId().toString()
									.equals(menuId)) {
						menuChildList.add(menu);
					}
				}
			}
		}
		return menuChildList;
	}
	// 数据权限方法  洪泽
	public static List<Office> getChildOfficeList() {
		List<Office> officeChildList = Lists.newArrayList();
		List<Office>  list1 =new ArrayList<Office>();
		String sql ="select o.id,o.parent_id from (select o.id,o.parent_id,o.type from sys_office o connect by prior o.parent_id = o.id start with o.id = '"+getUser().getOffice().getId()+"') o  where (o.type='4' or o.type='5' or o.parent_id='1')  ";
		Query q =officeDao.createSqlQuery(sql);
        List lists = q.list();
        String BUid="";
        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next(); 
            BUid=objects[0]==null?"":objects[0].toString();
        }
        if (StringUtils.isNotEmpty(BUid)){
			Office office=officeDao.findOne(BUid);
			officeChildList=office.getChildList();
			officeChildList.add(office);
		}
		return officeChildList;
	}
	
	// 数据权限方法  洪泽
	public static List<Office> getquanxianChildOfficeList() {
		List<Office> officeChildList = Lists.newArrayList();
		List<Office>  list1 =new ArrayList<Office>();
		String sql ="select o.id,o.parent_id from (select o.id,o.parent_id,o.type from sys_office o connect by prior o.parent_id = o.id start with o.id = '"+getUser().getOffice().getId()+"') o  where (o.type='4' or o.type='5')  ";
		Query q =officeDao.createSqlQuery(sql);
        List lists = q.list();
        String BUid="";
        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next(); 
            BUid=objects[0]==null?"":objects[0].toString();
        }
        if (StringUtils.isNotEmpty(BUid)){
			Office office=officeDao.findOne(BUid);
			officeChildList=office.getChildList();
			officeChildList.add(office);
		}
		return officeChildList;
	}

	// 数据权限方法  洪泽
	public static Office getChildOfficeList(String officeId) {
		Office office=officeDao.findOne(officeId);
		List<Office>  list1 =new ArrayList<Office>();
		String sql ="select o.id,o.parent_id from (select o.id,o.parent_id,o.type from sys_office o connect by prior o.parent_id = o.id start with o.id = '"+officeId+"') o  where (o.type='4' or o.type='5') ";
		Query q =officeDao.createSqlQuery(sql);
        List lists = q.list();
        String BUid="";
        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next(); 
            BUid=objects[0]==null?"":objects[0].toString();
        }
        if (StringUtils.isNotEmpty(BUid)){
			office=officeDao.findOne(BUid);
		}
		return office;
	}
	
	public static List<Area> getAreaList() {
		@SuppressWarnings("unchecked")
		List<Area> areaList = (List<Area>) getCache(CACHE_AREA_LIST);
		if (areaList == null) {
			// User user = getUser();
			// if (user.isAdmin()){
			areaList = areaDao.findAllList();
			// }else{
			// areaList = areaDao.findAllChild(user.getArea().getId(),
			// "%,"+user.getArea().getId()+",%");
			// }
			putCache(CACHE_AREA_LIST, areaList);
		}
		return areaList;
	}

	public static List<Office> getOfficeList() {
		@SuppressWarnings("unchecked")
		List<Office> officeList = (List<Office>) getCache(CACHE_OFFICE_LIST);
		if (officeList == null) {
			User user = getUser();
			// if (user.isAdmin()){
			// officeList = officeDao.findAllList();
			// }else{
			// officeList = officeDao.findAllChild(user.getOffice().getId(),
			// "%,"+user.getOffice().getId()+",%");
			// }
			DetachedCriteria dc = officeDao.createDetachedCriteria();
			// dc.add(dataScopeFilter(user, dc.getAlias(), ""));
			dc.add(Restrictions.eq("delFlag", Office.DEL_FLAG_NORMAL));
			dc.addOrder(Order.asc("code"));
			officeList = officeDao.find(dc);
			putCache(CACHE_OFFICE_LIST, officeList);
		}
		return officeList;
	}
	public static List<OfficeBf> getOfficeBfList() {
		@SuppressWarnings("unchecked")
		List<OfficeBf> officeBfList = (List<OfficeBf>) getCache(CACHE_OFFICE_BF_LIST);
		if (officeBfList == null) {
			User user = getUser();
			// if (user.isAdmin()){
			// officeList = officeDao.findAllList();
			// }else{
			// officeList = officeDao.findAllChild(user.getOffice().getId(),
			// "%,"+user.getOffice().getId()+",%");
			// }
			DetachedCriteria dc = officeDao.createDetachedCriteria();
			// dc.add(dataScopeFilter(user, dc.getAlias(), ""));
			dc.add(Restrictions.eq("delFlag", Office.DEL_FLAG_NORMAL));
			dc.addOrder(Order.asc("code"));
			officeBfList = officeBfDao.find(dc);
			putCache(CACHE_OFFICE_BF_LIST, officeBfList);
		}
		return officeBfList;
	}
	
//	public static List<Office> getOfficeBfByYear(String year) {
//		@SuppressWarnings("unchecked")
//		List<Office> officeList = (List<Office>) getCache(CACHE_OFFICE_BF_LIST);
//		if (officeList == null) {
//			User user = getUser();
//			officeList=officeDao.findOfficeBfByYear(year);
//			putCache(CACHE_OFFICE_BF_LIST, officeList);
//		}
//		return officeList;
//	}
	
	public static List<Office> getOfficeShowList(String type) {
		@SuppressWarnings("unchecked")
		List<Office> officeList = (List<Office>) getCache(CACHE_OFFICE_DEPT_LIST);
		if (officeList == null) {
			User user = getUser();
			DetachedCriteria dc = officeDao.createDetachedCriteria();
			dc.add(Restrictions.eq("delFlag", Office.DEL_FLAG_NORMAL));
			dc.add(Restrictions.or(
					Restrictions.eq("show_state", Office.DEL_FLAG_NORMAL),
					Restrictions.isNull("show_state")
					));
			dc.addOrder(Order.asc("manage_sort"));
			officeList = officeDao.find(dc);
			putCache(CACHE_OFFICE_DEPT_LIST, officeList);
		}
		return officeList;
	}
	
	// 事业部列表
	public static List<Office> getOffice1DeptList() {
		@SuppressWarnings("unchecked")
		List<Office> officeList = (List<Office>) getCache(CACHE_OFFICE1_DEPT_LIST);
		if (officeList == null) {
			User user = getUser();
			DetachedCriteria dc = officeDao.createDetachedCriteria();
			//dc.add(Restrictions.eq("parent.id", "1"));
			//dc.add(Restrictions.eq("type", "4"));
			dc.add(Restrictions.or(Restrictions.eq("type", "4"),Restrictions.eq("type", "5")));

			dc.add(Restrictions.eq(Dict.DEL_FLAG, Dict.DEL_FLAG_NORMAL));
			dc.addOrder(Order.desc("manage_sort"));
			officeList = officeDao.find(dc);
			putCache(CACHE_OFFICE1_DEPT_LIST, officeList);
		}
		return officeList;
	}
	
	// 事业部列表
		public static List<Office> getOffice4DeptList() {
			@SuppressWarnings("unchecked")
			List<Office> officeList = (List<Office>) getCache(CACHE_OFFICE4_DEPT_LIST);
			if (officeList == null) {
				User user = getUser();
				DetachedCriteria dc = officeDao.createDetachedCriteria();
				dc.add(Restrictions.eq("type", "4"));
				dc.add(Restrictions.eq(Dict.DEL_FLAG, Dict.DEL_FLAG_NORMAL));
				dc.addOrder(Order.desc("manage_sort"));
				officeList = officeDao.find(dc);
				putCache(CACHE_OFFICE4_DEPT_LIST, officeList);
			}
			return officeList;
		}
		
		public static List<User> getReceiptAuditingUserByIdList(String roleId){
			String sql = "  select u.id,u.name userName,u.login_name,d.label sex,o1.name comNmae,o.name offName,urr.name roleName,u.phone,u.mobile,o.id officeId "
		    		 +"  from sys_user u inner join (select ur.user_id,r.name"
		    		 +"  from sys_user_role ur "
		    		 +"  inner join sys_role r "
		    		 +"  on ur.role_id=r.id and r.del_flag='0' and r.id='"+roleId+"') urr"
		    		 +"  on urr.user_id=u.id "
		    		 +"  left join sys_office o "
		    		 +"  on u.office_id=o.id "
		    		 +"  left join sys_office o1"
		    		 +"  on u.company_id=o1.id"
		    		 +"  left join sys_dict d"
		    		 +"  on u.user_sex=d.value "
		    		 +"  and d.type='sys_xb_type' "
		    		 +"  where 1=1 ";
			sql += " and u.user_isvalid='2' order by u.name desc ";
			List<Object[]> lists = userDao.findBySql(sql);
			List<User> list=new ArrayList<User>();
			for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
	            Object[] objects = iterator.next();
	            User ur=new User();
	            ur.setId(objects[0]==null?"":objects[0].toString());
	            ur.setName(objects[1]==null?"":objects[1].toString());
	            ur.setLoginName(objects[2]==null?"":objects[2].toString());
	            ur.setUser_sex(objects[3]==null?"":objects[3].toString());
	            ur.setCompanyName(objects[4]==null?"":objects[4].toString());
	            ur.setOfficeName(objects[5]==null?"":objects[5].toString());
	            ur.setRoleName(objects[6]==null?"":objects[6].toString());
	            ur.setPhone(objects[7]==null?"":objects[7].toString());
	            ur.setMobile(objects[8]==null?"":objects[8].toString());
	            ur.setOfficeId(objects[9]==null?"":objects[9].toString());
	            list.add(ur);
			 }
			return list;
		}
		
		// 事业部下的业务员
		public static List<User> getOffice4ManageUserList() {
			@SuppressWarnings("unchecked")
			List<User> manageUserList =null;//(List<User>) getCache(CACHE_MANAGE_USER_LIST);
			if (manageUserList == null) { 
				manageUserList = getAllUserList();
				putCache(CACHE_MANAGE_USER_LIST, manageUserList);
			}
			return manageUserList;
		}
		
		public static List<User> getAllUserList() {
			List<User> list= Lists.newArrayList();
//			String sql =" select t.id,t.name "
//					+ " from (select distinct su.id,su.name "
//					+ " from sys_user_role sur "
//					+ " left join sys_user su "
//					+ "  on sur.user_id=su.id "
//					+ " where sur.role_id='CC415213C50A4EA0A91D5EC0BDC2EF2C') t order by NLSSORT(t.name,'NLS_SORT = SCHINESE_PINYIN_M')";
			String sql ="SELECT t.id,t.name FROM sys_user t "
					  + "where t.id in (SELECT user_id FROM sys_user_role where role_id='CC415213C50A4EA0A91D5EC0BDC2EF2C') "
					  + "and t.user_isvalid!='4' and t.del_flag='0' "
					  + "order by NLSSORT(t.name,'NLS_SORT = SCHINESE_PINYIN_M') ";
			Query q =userDao.createSqlQuery(sql);
	        List lists = q.list();
	        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
	            Object[] objects = iterator.next(); 
	            String userId=objects[0]==null?"":objects[0].toString();
	            User user=userDao.findOne(userId);
//	            user.setName(objects[1]==null?"":objects[1].toString());
	            list.add(user);
	        }
	        return list;
		}
		
		
		/**
		 * 获取系统所有用户
		 * haijiejiang
		 * @return
		 * 20160412
		 */
	/*
		public static List<User> getAllUser() {
			@SuppressWarnings("unchecked")
			List<User> userList= (List<User>) getCache(CACHE_getAllUserList);
			if (userList == null) {
				userList= Lists.newArrayList();
				String sql ="select t.id,t.name from sys_user t order by NLSSORT(t.name,'NLS_SORT = SCHINESE_PINYIN_M')";
				List<Object[]> lists =userDao.findBySql(sql);
		        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
		            Object[] objects = iterator.next(); 
		            User user=new User();
		            user.setId(objects[0]==null?"":objects[0].toString());
		            user.setName(objects[1]==null?"":objects[1].toString());
		            userList.add(user);
		        }
				putCache(CACHE_getAllUserList, userList);
			}
			return userList;
		}
		
		// 事业部下的业务员
		public static List<User> getOffice4ManageUserByIdList(String officeId) {
			@SuppressWarnings("unchecked")
			List<User> manageUserList = (List<User>) getCache(CACHE_MANAGE_USERID_LIST);
			if (manageUserList == null) {
				Role role = roleDao.findById("CC415213C50A4EA0A91D5EC0BDC2EF2C");
				if (role == null) {
					return null;
				}
				List<User> manageUserListT = role.getUserList();
				for(int i=0;i<manageUserListT.size();i++){
					User user=manageUserListT.get(i);
					if(recursion(user.getOffice(),officeId)){
						manageUserList.add(user);
					}
				}
			    Collections.sort(manageUserList,new Comparator<User>(){
	               public int compare(User arg0, User arg1) {
	                    return arg0.getName().toUpperCase().compareTo(arg1.getName().toUpperCase());
	                }
	            });
				putCache(CACHE_MANAGE_USERID_LIST, manageUserList);
			}
			return manageUserList;
		}
		
//		public static void main(String[] args) {
//			
//			Office of=officeDao.findOne("2CAF5D437DF0438D97937F88A9F05A27");
//               System.out.println(UserUtils.recursion(of,"imp_42"));
//        }  

		public static boolean recursion(Office bean,String officeId){
			boolean reault=false;
            if(!"1".equals(bean.getId())){
            	  if(officeId.equals(bean.getId())){
            		  reault=true;
            	  }else{
            		  reault=recursion(bean.getParent(),officeId);
            	  }
            }
            return reault;            
     }


	// ============== User Cache ==============

	public static Object getCache(String key) {
		return getCache(key, null);
	}

	public static Object getCache(String key, Object defaultValue) {
		Object obj = getCacheMap().get(key);
		return obj == null ? defaultValue : obj;
	}

	public static void putCache(String key, Object value) {
		getCacheMap().put(key, value);
	}

	public static void removeCache(String key) {
		getCacheMap().remove(key);
	}

	public static Map<String, Object> getCacheMap() {
		Map<String, Object> map = Maps.newHashMap();
		try {
			Subject subject = SecurityUtils.getSubject();
			Principal principal = (Principal) subject.getPrincipal();
			return principal != null ? principal.getCacheMap() : map;
		} catch (UnavailableSecurityManagerException e) {
			return map;
		}
	}

	public static List<Area> getAllowAreaListByParentId(String parentId) {

		List<Area> allowAreaList = new ArrayList<Area>();

		User user = UserUtils.getUser();
		List<String> allowAreaIdList = new ArrayList<String>();
		if (!user.isAdmin()) {
			List<Role> roleList = user.getRoleList();
			for (Role role : roleList) {
				allowAreaIdList.add(role.getOffice().getArea().getId());
				allowAreaIdList.addAll(role.getOfficeIdList());
			}
		}

		List<Area> list = UserUtils.getAreaList();
		for (int i = 0; i < list.size(); i++) {
			Area e = list.get(i);
			if (StringUtils.isEmpty(parentId)
					|| (!StringUtils.isEmpty(parentId) && (parentId.equals(e
							.getId()) || e
					// .getParentIds().indexOf("," + parentId + ",") != -1))) {
							.getParentIds().indexOf("," + parentId) != -1))) {
				if (user.isAdmin()
						|| allowAreaIdList.contains(e.getId())
						|| (e.getParent() != null && allowAreaIdList.contains(e
								.getParent().getId()))) {
					allowAreaList.add(e);
					if (!user.isAdmin()) {
						allowAreaIdList.add(e.getId());
					}
				}
			}
		}
		return allowAreaList;
	}

	public static List<Area> getAllowAreaListByExtId(String extId) {

		List<Area> allowAreaList = new ArrayList<Area>();
		User user = UserUtils.getUser();
		List<String> allowAreaIdList = new ArrayList<String>();
		if (!user.isAdmin()) {
			List<Role> roleList = user.getRoleList();
			for (Role role : roleList) {
				allowAreaIdList.add(role.getOffice().getArea().getId());
				allowAreaIdList.addAll(role.getOfficeIdList());
			}
		}

		List<Area> list = UserUtils.getAreaList();
		for (int i = 0; i < list.size(); i++) {
			Area e = list.get(i);
			if (StringUtils.isEmpty(extId)
					|| (!StringUtils.isEmpty(extId) && !extId.equals(e.getId()) && e
							.getParentIds().indexOf("," + extId + ",") == -1)) {
				if (user.isAdmin()
						|| allowAreaIdList.contains(e.getId())
						|| (e.getParent() != null && allowAreaIdList.contains(e
								.getParent().getId()))) {
					allowAreaList.add(e);
					if (!user.isAdmin()) {
						allowAreaIdList.add(e.getId());
					}
				}
			}
		}
		return allowAreaList;
	}

	public static List<String> getUserIdListByRoleName(String roleName) {
		Role role = roleDao.findByName(roleName);
		if (role == null) {
			return null;
		}
		return role.getUserIdList();
	}

	public static List<User> getUserListByRoleName(String roleName) {
		Role role = roleDao.findByName(roleName);
		if (role == null) {
			return null;
		}
		return role.getUserList();
	}

	public static Boolean hasChecked(String id, List<String> idList) {
		if (idList == null || StringUtils.isEmpty(id)) {
			return null;
		}
		return idList.contains(id);
	}

	public static String getMapValue(String id,
			@SuppressWarnings("rawtypes") Map map) {
		if (map == null || StringUtils.isEmpty(id)) {
			return null;
		}
		return String.valueOf(map.get(id));
	}

	public static int getMapIntValue(String id,
			@SuppressWarnings("rawtypes") Map map) {
		if (map == null || StringUtils.isEmpty(id)) {
			return 0;
		}
		try {
			return Integer.valueOf("" + map.get(id));
		} catch (NumberFormatException e) {
			return 0;
		}
	}

	/**
	 * 
	*<b>Summary: </b>
	* getambbyloginuser(根据当前用户获取该事业部下面所有的子机构)
	* @return
	 */
	/*
	public static Office getambbyloginuser(){
		String amb_ids="";
		//获取当前登录用户阿米巴
		User user = UserUtils.getUser();
		Office office = user.getOffice();
		while(office.getParent()!=null){
			if(office.getParent().getId().equals("1")){
				break;
			}else{
				office = office.getParent();
			}
		}
        return office;
	}
	
	/**
	 * 
	*<b>Summary: </b>
	* getambbyloginuser(根据当前用户获取该事业部下面所有的子机构)
	* @return
	 */
	/*
	public static OfficeBf getambBfbyloginuser(){
		String amb_ids="";
		//获取当前登录用户阿米巴
		User user = UserUtils.getUser();
		OfficeBf office = user.getOfficeBf();
		while(office.getParent()!=null){
			if(office.getParent().getId().equals("1")){
				break;
			}else{
				office = office.getParent();
			}
		}
        return office;
	}
	
	/**
	 * 报账审核审批人初始化，按角色和部门过滤
	 * @param roleName
	 * @param officeId
	 * @return
	 */
	/*
    public static List<User> getUserListByroleOroffice(String roleName,String officeId){
        String sql = "  select u.id,u.name userName,u.login_name,d.label sex,o1.name comNmae,o.name offName,urr.name roleName,u.phone,u.mobile,o.id officeId "
                 +"  from sys_user u inner join (select ur.user_id,r.name"
                 +"  from sys_user_role ur "
                 +"  inner join sys_role r "
                 +"  on ur.role_id=r.id and r.del_flag='0' and r.name='"+roleName+"') urr"
                 +"  on urr.user_id=u.id "
                 +"  left join sys_office o "
                 +"  on u.office_id=o.id "
                 +"  left join sys_office o1"
                 +"  on u.company_id=o1.id"
                 +"  left join sys_dict d"
                 +"  on u.user_sex=d.value "
                 +"  and d.type='sys_xb_type' "
                 +"  where 1=1 ";
        sql += " and u.user_isvalid='2' ";
        if (officeId != null&& StringUtils.isNotEmpty(officeId)) { 
            sql += " and u.company_id in('"+officeId+"')";
        }
        sql += " order by u.name ";
        List<Object[]> lists = userDao.findBySql(sql);
        List<User> list=new ArrayList<User>();
        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next();
            User ur=new User();
            ur.setId(objects[0]==null?"":objects[0].toString());
            ur.setName(objects[1]==null?"":objects[1].toString());
            ur.setLoginName(objects[2]==null?"":objects[2].toString());
            ur.setUser_sex(objects[3]==null?"":objects[3].toString());
            ur.setCompanyName(objects[4]==null?"":objects[4].toString());
            ur.setOfficeName(objects[5]==null?"":objects[5].toString());
            ur.setRoleName(objects[6]==null?"":objects[6].toString());
            ur.setPhone(objects[7]==null?"":objects[7].toString());
            ur.setMobile(objects[8]==null?"":objects[8].toString());
            ur.setOfficeId(objects[9]==null?"":objects[9].toString());
            list.add(ur);
         }
        return list;
    }
    
    /*
     * 根据用户角色、部门查找用户List
     * 
     */
	/*
    public static List<User> getUserListByReferoffice(String roleName,String officeId){
        String sql = "  select u.id,u.name userName,u.login_name,d.label sex,o1.name comNmae,o.name offName,urr.name roleName,u.phone,u.mobile,o.id officeId "
                 +"  from sys_user u inner join (select ur.user_id,r.name"
                 +"  from sys_user_role ur "
                 +"  inner join sys_role r "
                 +"  on ur.role_id=r.id and r.del_flag='0' and r.name='"+roleName+"') urr"
                 +"  on urr.user_id=u.id "
                 +"  left join sys_office o "
                 +"  on u.office_id=o.id "
                 +"  left join sys_office o1"
                 +"  on u.company_id=o1.id"
                 +"  left join sys_dict d"
                 +"  on u.user_sex=d.value "
                 +"  and d.type='sys_xb_type' "
                 +"  where 1=1 ";
        sql += " and u.user_isvalid='2' ";
        if (officeId != null&& StringUtils.isNotEmpty(officeId)) { 
            sql += "and  u.ID in ( select r.EMPLOYEE_ID from t_lc_refer_user r where r.office_id='"+officeId+"' )";
        }
        sql += " order by u.name ";
        List<Object[]> lists = userDao.findBySql(sql);
        List<User> list=new ArrayList<User>();
        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next();
            User ur=new User();
            ur.setId(objects[0]==null?"":objects[0].toString());
            ur.setName(objects[1]==null?"":objects[1].toString());
            ur.setLoginName(objects[2]==null?"":objects[2].toString());
            ur.setUser_sex(objects[3]==null?"":objects[3].toString());
            ur.setCompanyName(objects[4]==null?"":objects[4].toString());
            ur.setOfficeName(objects[5]==null?"":objects[5].toString());
            ur.setRoleName(objects[6]==null?"":objects[6].toString());
            ur.setPhone(objects[7]==null?"":objects[7].toString());
            ur.setMobile(objects[8]==null?"":objects[8].toString());
            ur.setOfficeId(objects[9]==null?"":objects[9].toString());
            list.add(ur);
         }
        return list;
    }
    
   /**
    * 报账审核主管老总审核，根据部门与主管老总配置表获取
    * @param officeId
    * @return
    */
	/*
    public static List<User> getUserListByUserOfficeid(String officeId){
        String sql = "  select DISTINCT employee_id,employee_name from t_lc_refer_user where employee_id is not null ";
        if (officeId != null&& StringUtils.isNotEmpty(officeId)) { 
            sql += "and  office_id = '"+officeId+"' ";
        }
        sql += " order by employee_name ";
        List<Object[]> lists = referUserDao.findBySql(sql);
        //System.out.println("主管老总审核"+lists.size()+sql);
        List<User> list=new ArrayList<User>();
        for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next();
            User ur=new User();
            ur.setId(objects[0]==null?"":objects[0].toString());
            ur.setName(objects[1]==null?"":objects[1].toString());
            list.add(ur);
         }
        return list;
    }

    /**
     * 报账审核票据签收审核人初始化
     * @param officeId
     * @return
     */
	/*
     public static List<User> getUserListBycwfppjqs(String officeId){
         String sql="select DISTINCT SIGNAUDITORID,SIGNAUDITORNAME from t_lc_refer_user where SIGNAUDITORID is not null ";
         if (officeId != null&& StringUtils.isNotEmpty(officeId)) { 
             sql += "and office_id = '"+officeId+"' ";
         }
         sql += " order by SIGNAUDITORNAME ";
         List<Object[]> lists = referUserDao.findBySql(sql);
         //System.out.println("票据签收"+lists.size());
         List<User> list=new ArrayList<User>();
         for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
             Object[] objects = iterator.next();
             User ur=new User();
             ur.setId(objects[0]==null?"":objects[0].toString());
             ur.setName(objects[1]==null?"":objects[1].toString());
             list.add(ur);
          }
         return list;
     }
     
     /**
      * 报账审核费用审核审核人初始化
      * @param officeId
      * @return
      */
	/*
      public static List<User> getUserListBycwfpfysh(String officeId){
          String sql="select DISTINCT EXPENSEAUDITORID,EXPENSEAUDITORNAME from t_lc_refer_user where EXPENSEAUDITORID is not null ";
          if (officeId != null&& StringUtils.isNotEmpty(officeId)) { 
              sql += "and office_id = '"+officeId+"' ";
          }
          sql += " order by EXPENSEAUDITORNAME ";
          List<Object[]> lists = referUserDao.findBySql(sql);
          //System.out.println("费用审核"+lists.size());
          List<User> list=new ArrayList<User>();
          for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
              Object[] objects = iterator.next();
              User ur=new User();
              ur.setId(objects[0]==null?"":objects[0].toString());
              ur.setName(objects[1]==null?"":objects[1].toString());
              list.add(ur);
           }
          return list;
      }
      */
	
}
