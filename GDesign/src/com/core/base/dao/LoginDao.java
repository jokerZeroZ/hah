package com.core.base.dao;

import com.core.base.Entity.User;

public interface LoginDao {

	User doLogin(String username, String password);

}
