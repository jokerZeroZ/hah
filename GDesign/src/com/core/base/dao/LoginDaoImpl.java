package com.core.base.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.core.base.Entity.Message;
import com.core.base.Entity.User;
import com.core.base.action.Base64Encrypt;

@Repository
public class LoginDaoImpl implements LoginDao{

	Logger logger = Logger.getLogger(LoginDao.class);
	Message message=new Message();
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Override
	public User doLogin(String username, String password) {
		// TODO Auto-generated method stub
		//password=Base64Encrypt.getBase64(password);
		List<User> list=getUserFromName(username);
		if(list.size()==0){
			User user=new User();
			user.setUser_name("0");
			return user;
		}
		list=getUserFromInf(username,password);
		if(list.size()==0){
			User user=new User();
			user.setUser_name("1");
			return user;
		}
		return list.get(0);
	}
	
	public List<User> getUserFromName(String username){
		String sql="select * from GraduationDesign.user where user_name=?";
		List<User> list=jdbcTemplate.query(sql,new BeanPropertyRowMapper(User.class),username);
		return list;
	}
	
	public List<User> getUserFromInf(String username,String password){
		String sql="select * from GraduationDesign.user where user_name=? and password=?";
		List<User> list=jdbcTemplate.query(sql,new BeanPropertyRowMapper(User.class),username,password);
		return list;
	}
	
}
