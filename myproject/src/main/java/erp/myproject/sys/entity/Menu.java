package erp.myproject.sys.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.google.common.collect.Lists;

import erp.myproject.entity.DataEntity;
import erp.myproject.entity.Role;
import erp.myproject.sys.utils.DictUtils;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月18日 下午2:53:04 
* explain
*/

@Entity
//@Table(name = "sys_menu")
//@DynamicInsert
//@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Menu extends DataEntity {

	private static final long serialVersionUID = 1L;
	private String id; // 编号
	private Menu parent; // 父级菜单
	private String parentIds; // 所有父级编号
	private String name; // 名称
	private String href; // 链接
	private String realHref; // 链接
	private String target; // 目标（ mainFrame、_blank、_self、_parent、_top）
	private String icon; // 图标
	private Integer sort; // 排序
	private String isShow; // 是否在菜单中显示（1：显示；0：不显示）
	private String isDropdown; // 是否在菜单中显示（1：显示；0：不显示）
	private String permission; // 权限标识
	private String show_type;
	private List<Menu> childList = Lists.newArrayList();// 拥有子菜单列表
	private List<Role> roleList = Lists.newArrayList(); // 拥有角色列表

	public Menu() {
		super();
		this.sort = 30;
	}

	public Menu(String id) {
		this();
		this.id = id;
	}

	@Id
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	@NotFound(action = NotFoundAction.IGNORE)
	@NotNull
	public Menu getParent() {
		return parent;
	}

	public void setParent(Menu parent) {
		this.parent = parent;
	}

	@Length(min = 1, max = 255)
	public String getParentIds() {
		return parentIds;
	}

	public void setParentIds(String parentIds) {
		this.parentIds = parentIds;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getShow_type() {
		return show_type;
	}
	public void setShow_type(String Show_type) {
		this.show_type = Show_type;
	}

	@Length(min = 0, max = 255)
	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
		this.realHref = createRealHref();
	}

	@Length(min = 0, max = 20)
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	@Length(min = 0, max = 100)
	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@NotNull
	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	@Length(min = 1, max = 1)
	public String getIsShow() {
		return isShow;
	}

	public void setIsShow(String isShow) {
		this.isShow = isShow;
	}

	@Length(min = 1, max = 1)
	public String getIsDropdown() {
		return isDropdown;
	}

	public void setIsDropdown(String isDropdown) {
		this.isDropdown = isDropdown;
	}

	@Length(min = 0, max = 200)
	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	@OneToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE,
			CascadeType.REMOVE }, fetch = FetchType.LAZY, mappedBy = "parent")
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy(value = "sort")
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Menu> getChildList() {
		return childList;
	}

	public void setChildList(List<Menu> childList) {
		this.childList = childList;
	}

	@ManyToMany(mappedBy = "menuList", fetch = FetchType.LAZY)
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy("id")
	@Fetch(FetchMode.SUBSELECT)
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	@Transient
	public static void sortList(List<Menu> list, List<Menu> sourcelist,
			String parentId) {
		for (int i = 0; i < sourcelist.size(); i++) {
			Menu e = sourcelist.get(i);
			if (e.getParent() != null
					&& StringUtils.isNotEmpty(e.getParent().getId())
					&& e.getParent().getId().equals(parentId)) {
				list.add(e);
				// 判断是否还有子节点, 有则继续获取子节点
				for (int j = 0; j < sourcelist.size(); j++) {
					Menu child = sourcelist.get(j);
					if (child.getParent() != null
							&& StringUtils
									.isNotEmpty(child.getParent().getId())
							&& child.getParent().getId().equals(e.getId())) {
						sortList(list, sourcelist, e.getId());
						break;
					}
				}
			}
		}
	}

	@Transient
	public boolean isRoot() {
		return isRoot(this.id);
	}

	@Transient
	public static boolean isRoot(String id) {
		return StringUtils.isNotEmpty(id) && id.equals("1");
	}

	@Transient
	public String getRealHref() {
		return this.realHref;
	}

	@Transient
	private String createRealHref() {
		if (StringUtils.isNotEmpty(href) && href.indexOf("{") != -1
				&& href.indexOf("}") != -1) {
			String[] hrefSplits = href.split("\\{");
			StringBuffer hrefSb = new StringBuffer();
			for (String hrefSplit : hrefSplits) {
				int end = hrefSplit.indexOf("}");
				if (StringUtils.isEmpty(hrefSplit) || end == -1) {
					continue;
				}
				String menuVarStr = hrefSplit.substring(0, end);
				String nextHref = hrefSplit.substring(end + "}".length());
				if (!StringUtils.isEmpty(menuVarStr)) {
					String menuVar = DictUtils.getMenuVarValue(menuVarStr);
					hrefSb.append(menuVar);
				}
				hrefSb.append(nextHref);
			}
			return hrefSb.toString();
		}
		return href;
	}

	@Transient
	public boolean isOpenIdUrl() {
		return StringUtils.contains(this.realHref, "://");
	}
}
