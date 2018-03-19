package erp.myproject.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月13日 下午3:37:13 
* explain
*/
//@Entity
//@Table(name = "role")
//@DynamicInsert @DynamicUpdate
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Role extends DataEntity{
	
	private static final long serialVersionUID = 1L;
	private String id;		//编号
	private String dataScope; // 数据范围
	
	/***
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_ALL = "1";
	/**
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_COMPANY_AND_CHILD = "2";
	/**
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_COMPANY = "3";
	/**
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_OFFICE_AND_CHILD = "4";
	/**
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_OFFICE = "5";
	/**
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_SELF = "8";
	/**
	 *  数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	 */
	public static final String DATA_SCOPE_CUSTOM = "9";
	
	
	public String getDataScope() {
		return dataScope;
	}

	public void setDataScope(String dataScope) {
		this.dataScope = dataScope;
	}
}
