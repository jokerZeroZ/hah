package com.core.base.service;

import com.core.base.Entity.User;

public interface LoginService {

	User doLogin(String username, String password);
	
}
