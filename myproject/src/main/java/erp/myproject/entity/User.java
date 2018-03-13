package erp.myproject.entity;

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
	private String CompanyName; //做SQL 查询用
	private List<Role> roleList = Lists.newArrayList(); // 拥有角色列表

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
}
