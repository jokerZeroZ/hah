package com.base.dao;

import java.util.List;

import com.base.entity.UserInfo;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年1月15日 上午9:25:35 
* explain
*/

public interface UserInfoDao {
	public abstract List<UserInfo> getAll();
	public abstract int insertUserInfo(UserInfo userInfo);
}
