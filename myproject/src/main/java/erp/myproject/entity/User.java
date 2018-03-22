package erp.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
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
@Entity
@Table(name = "user")
public class User extends DataEntity{

	private static final long serialVersionUID = 1L;
	private String id; 		// 编号
	private String dep_id;	// 部门id
	private String t_a_id;	//报账单id
	private String rol_id;	//角色id
	private String name; 		// 员工姓名
	private String numb;	// 工号
	private String sex;	//性别
	private String phone;	//手机号
	private String create_time; 		// 创建日期	
	private String create_by;	// 创建者
	private String login_date;	//最后登录时间
	private String login_name;	//登录名
	private String password; 		// 密码
	private String note;	// 备注
	private String del_flag;	//删除标记
	private String birth;	//生日
	private String address;	//住址
	private String idcard; 		// 身份证号
	private String bz_type;	// 报账类型
	private String depart_no;	//部门编号
	private String user_type;	//用户类型（1:普通员工,2:二级经理,3:部门经理,4:老总）
	//											
	//											

	//private Office company; // 归属公司
	//private Office office; // 归属部门
//	private String loginName;// 登录名
//	private String password;// 密码
//	private String no; // 工号
//	private String name; // 姓名
	//private String email; // 邮箱
//	private String phone; // 电话
//	private String mobile; // 手机
//	private String userType;// 用户类型
//	private String loginIp; // 最后登陆IP
//	private Date loginDate; // 最后登陆日期
	//private String state;   //报表状态 
	//private  String  user_pinyin;	  //拼音
//	private  String  user_sex;        //性别
	//private  String  user_fax;        //传真
	//private  String  user_oicq;       //oicq
//	private  Date    user_birthday;	  //生日
//	private  String  user_address;	  //住址
	//private  String  user_postalcode; //邮编
	//private  String  user_idcard;     //身份证
	//private  String  user_isvalid;	  //是否使用
	//private  Date  user_regdate;	  //注册日期
	//private  Date  user_pasttime;     //过期时间
	//private  String logUserType;    //日志用户类型
	//private  String user_bzlx;    //用户报账类型

	//private boolean submited;
	//private boolean suggested = false;
	
	//private String officeId;  //做参数用
	//private String officeIdStr;  //做SQL 查询用
	///private String officeName;  //做SQL 查询用
	//private String CompanyId;  //做SQL 查询用
	//private String CompanyName; //做SQL 查询用
	//private String roleId;   //做SQL 查询用
	//private String roleName; //角色名称
	//private OfficeBf officeBf; // 归属部门
	
	
//	private List<Role> roleList = Lists.newArrayList(); // 拥有角色列表
	//@Transient
	//public String getCompanyName() {
	//	return CompanyName;
	//}

	@Id
	@GeneratedValue
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
//	public List<Role> getRoleList() {
//		return roleList;
//	}
//	public void setRoleList(List<Role> roleList) {
//		this.roleList = roleList;
//	}
//	
//	@Transient
//	public String getCompanyName() {
//		return CompanyName;
//	}
//
//	public void setCompanyName(String companyName) {
//		CompanyName = companyName;
//	}
//	
	@Transient
	public boolean isAdmin() {
		return isAdmin(this.id);
	}
	
	@Transient
	public static boolean isAdmin(String id) {
		return StringUtils.isNotEmpty(id) && id.equals("9527");
	}
	
	@JsonIgnore
	@Length(min = 1, max = 100)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLogin_Name() {
		return login_name;
	}

	public void setLogin_Name(String loginName) {
		this.login_name = loginName;
	}

	public String getDep_id() {
		return dep_id;
	}

	public void setDep_id(String dep_id) {
		this.dep_id = dep_id;
	}

	public String getT_a_id() {
		return t_a_id;
	}

	public void setT_a_id(String t_a_id) {
		this.t_a_id = t_a_id;
	}

	public String getRol_id() {
		return rol_id;
	}

	public void setRol_id(String rol_id) {
		this.rol_id = rol_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNumb() {
		return numb;
	}

	public void setNumb(String numb) {
		this.numb = numb;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCreate_time() {
		return create_time;
	}

	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}

	public String getCreate_by() {
		return create_by;
	}

	public void setCreate_by(String create_by) {
		this.create_by = create_by;
	}

	public String getLogin_date() {
		return login_date;
	}

	public void setLogin_date(String login_date) {
		this.login_date = login_date;
	}

	public String getLogin_name() {
		return login_name;
	}

	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getDel_flag() {
		return del_flag;
	}

	public void setDel_flag(String del_flag) {
		this.del_flag = del_flag;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getBz_type() {
		return bz_type;
	}

	public void setBz_type(String bz_type) {
		this.bz_type = bz_type;
	}

	public String getDepart_no() {
		return depart_no;
	}

	public void setDepart_no(String depart_no) {
		this.depart_no = depart_no;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

}
