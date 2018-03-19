package erp.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Transient;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.Lists;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月13日 下午3:32:07 
* explain
*/

public class User extends DataEntity{

	private static final long serialVersionUID = 1L;
	private String id; // 编号
	//private Office company; // 归属公司
	//private Office office; // 归属部门
	private String loginName;// 登录名
	private String password;// 密码
	private String no; // 工号
	private String name; // 姓名
	private String email; // 邮箱
	private String phone; // 电话
	private String mobile; // 手机
	private String userType;// 用户类型
	private String loginIp; // 最后登陆IP
	private Date loginDate; // 最后登陆日期
	private String state;   //报表状态 
	private  String  user_pinyin;	  //拼音
	private  String  user_sex;        //性别
	private  String  user_fax;        //传真
	private  String  user_oicq;       //oicq
	private  Date    user_birthday;	  //生日
	private  String  user_address;	  //住址
	private  String  user_postalcode; //邮编
	private  String  user_idcard;     //身份证
	private  String  user_isvalid;	  //是否使用
	private  Date  user_regdate;	  //注册日期
	private  Date  user_pasttime;     //过期时间
	private  String logUserType;    //日志用户类型
	private  String user_bzlx;    //用户报账类型

	private boolean submited;
	private boolean suggested = false;
	
	private String officeId;  //做参数用
	private String officeIdStr;  //做SQL 查询用
	private String officeName;  //做SQL 查询用
	private String CompanyId;  //做SQL 查询用
	private String CompanyName; //做SQL 查询用
	private String roleId;   //做SQL 查询用
	private String roleName; //角色名称
	//private OfficeBf officeBf; // 归属部门
	private List<Role> roleList = Lists.newArrayList(); // 拥有角色列表
	//@Transient
	//public String getCompanyName() {
	//	return CompanyName;
	//}

	@Id
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
//	@ManyToMany(fetch = FetchType.EAGER)
//	@JoinTable(name = "sys_user_role", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = { @JoinColumn(name = "role_id") })
//	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
//	@OrderBy("id")
//	@Fetch(FetchMode.SUBSELECT)
//	@NotFound(action = NotFoundAction.IGNORE)
//	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
//	@JsonIgnore
	public List<Role> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}
	
	@Transient
	public String getCompanyName() {
		return CompanyName;
	}

	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	
	@Transient
	public boolean isAdmin() {
		return isAdmin(this.id);
	}
	
	@Transient
	public static boolean isAdmin(String id) {
		return StringUtils.isNotEmpty(id) && id.equals("1");
	}
	
	@JsonIgnore
	@Length(min = 1, max = 100)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
