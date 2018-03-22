package com.core.base.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.core.base.Entity.User;
import com.core.base.dao.LoginDao;

@Transactional
@Service
public class LoginServiceImpl implements LoginService{

	Logger logger = Logger.getLogger(LoginServiceImpl.class);
	
	@Autowired
	private LoginDao loginDao;

	@Override
	public User doLogin(String username, String password) {
		// TODO Auto-generated method stub
		return loginDao.doLogin(username,password);
	}
}
