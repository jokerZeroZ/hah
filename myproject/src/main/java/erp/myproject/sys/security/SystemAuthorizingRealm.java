//package erp.myproject.sys.security;
//
//import java.awt.Menu;
//import java.io.Serializable;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.annotation.PostConstruct;
//
//import org.apache.commons.lang3.StringUtils;
//import org.apache.shiro.SecurityUtils;
//import org.apache.shiro.authc.AuthenticationException;
//import org.apache.shiro.authc.AuthenticationInfo;
//import org.apache.shiro.authc.AuthenticationToken;
//import org.apache.shiro.authc.SimpleAuthenticationInfo;
//import org.apache.shiro.authc.UsernamePasswordToken;
//import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
//import org.apache.shiro.authz.AuthorizationInfo;
//import org.apache.shiro.authz.SimpleAuthorizationInfo;
//import org.apache.shiro.cache.Cache;
//import org.apache.shiro.realm.AuthorizingRealm;
//import org.apache.shiro.session.Session;
//import org.apache.shiro.subject.PrincipalCollection;
//import org.apache.shiro.subject.SimplePrincipalCollection;
//import org.apache.shiro.util.ByteSource;
//import org.springframework.context.annotation.DependsOn;
//import org.springframework.stereotype.Service;
//
//import erp.myproject.entity.User;
//import erp.myproject.sys.service.SystemService;
//import erp.myproject.sys.servlet.ValidateCodeServlet;
//import erp.myproject.sys.utils.Encodes;
//import erp.myproject.sys.utils.SpringContextHolder;
//import erp.myproject.sys.utils.UserUtils;
//
////import com.chinacreator.common.servlet.ValidateCodeServlet;
////import com.chinacreator.common.utils.Encodes;
////import com.chinacreator.common.utils.SpringContextHolder;
////import com.chinacreator.modules.sys.entity.Menu;
////import com.chinacreator.modules.sys.entity.User;
////import com.chinacreator.modules.sys.security.CaptchaException;
////import com.chinacreator.modules.sys.security.UsernamePasswordToken;
////import com.chinacreator.modules.sys.security.SystemAuthorizingRealm.Principal;
////import com.chinacreator.modules.sys.service.SystemService;
////import com.chinacreator.modules.sys.utils.UserUtils;
////import com.chinacreator.modules.sys.web.LoginController;
////import com.chinacreator.openid.login.servlet.SSOLoginServlet;
//
///** 
//* @author joker E-mail:zhanglq@hnu.edu.cn 
//* @version createTime:2018年3月16日 下午5:17:46 
//* explain
//*/
//
//@Service
////@DependsOn({ "userDao", "roleDao", "menuDao" })
//
//public class SystemAuthorizingRealm extends AuthorizingRealm {
//
//	private SystemService systemService;
//
//	/**
//	 * 认证回调函数, 登录时调用
////	 */
////	@Override
////	protected AuthenticationInfo doGetAuthenticationInfo(
////			AuthenticationToken authcToken) throws AuthenticationException {
////		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
////		if (LoginController.isValidateCodeLogin(token.getUsername(), false,
////				false)) {
////			// 判断验证码
////			Session session = SecurityUtils.getSubject().getSession();
////			String code = (String) session
////					.getAttribute(ValidateCodeServlet.VALIDATE_CODE);
////			if (StringUtils.isEmpty(token.getCaptcha())
////					|| !token.getCaptcha().toUpperCase().equals(code)) {
////				throw new CaptchaException("验证码错误.");
////			}
////		}
////
////		User user = getSystemService().getUserByLoginName(token.getUsername());
////		if (user != null) {
////			try {
////				if (null != SSOLoginServlet.userKeyMap.get(token.getUsername())) {
////					user.setPassword(String.valueOf(token.getPassword()));
////					String keypwd = SSOLoginServlet.userKeyMap.get(token
////							.getUsername());
////					token.setPassword(keypwd.toCharArray());
////					SSOLoginServlet.userKeyMap.remove(token.getUsername());
////				}
////			} catch (Exception e) {
////				// e.printStackTrace();
////			}
////			byte[] salt = Encodes
////					.decodeHex(user.getPassword().substring(0, 16));
////			String substring = user.getPassword().substring(16);
////			return new SimpleAuthenticationInfo(new Principal(user,
////					token.getRequestUrl()), substring,
////					ByteSource.Util.bytes(salt), getName());
////		} else {
////			return null;
////		}
////	}
//
//	/**
//	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用
//	 */
////	@Override
////	protected AuthorizationInfo doGetAuthorizationInfo(
////			PrincipalCollection principals) {
////		Principal principal = (Principal) getAvailablePrincipal(principals);
////		User user = getSystemService().getUserByLoginName(
////				principal.getLoginName());
////		if (user != null) {
////			UserUtils.putCache("user", user);
////			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
////			List<Menu> list = UserUtils.getMenuList();
////			for (Menu menu : list) {
////				if (StringUtils.isNotBlank(menu.getPermission())) {
////					// 添加基于Permission的权限信息
////					info.addStringPermission(menu.getPermission());
////				}
////			}
////			// 更新登录IP和时间
////			getSystemService().updateUserLoginInfo(user.getId());
////			return info;
////		} else {
////			return null;
////		}
////	}
//
//	/**
//	 * 设定密码校验的Hash算法与迭代次数
//	 */
//	@PostConstruct
//	public void initCredentialsMatcher() {
//		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(
//				SystemService.HASH_ALGORITHM);
//		matcher.setHashIterations(SystemService.HASH_INTERATIONS);
//		setCredentialsMatcher(matcher);
//	}
//
//	/**
//	 * 清空用户关联权限认证，待下次使用时重新加载
//	 */
//	public void clearCachedAuthorizationInfo(String principal) {
//		SimplePrincipalCollection principals = new SimplePrincipalCollection(
//				principal, getName());
//		clearCachedAuthorizationInfo(principals);
//	}
//
//	/**
//	 * 清空所有关联认证
//	 */
//	public void clearAllCachedAuthorizationInfo() {
//		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
//		if (cache != null) {
//			for (Object key : cache.keys()) {
//				cache.remove(key);
//			}
//		}
//	}
//
//	/**
//	 * 获取系统业务对象
//	 */
//	public SystemService getSystemService() {
//		if (systemService == null) {
//			systemService = SpringContextHolder.getBean(SystemService.class);
//		}
//		return systemService;
//	}
//
//	/**
//	 * 授权用户信息
//	 */
//	public static class Principal implements Serializable {
//
//		private static final long serialVersionUID = 1L;
//
//		private String id;
//		private String loginName;
//		private String name;
//		private String idcard;//平台门户需要新增
//		private String requestUrl;
//		private Map<String, Object> cacheMap;
//
//		public Principal(User user, String requestUrl) {
//			this.id = user.getId();
//			//this.loginName = user.getLoginName();
//			//this.name = user.getName();
//			this.requestUrl = requestUrl;
//			//this.idcard = user.getUser_idcard();//平台门户需要新增
//		}
//
//		public String getId() {
//			return id;
//		}
//
//		public String getLoginName() {
//			return loginName;
//		}
//
//		public String getName() {
//			return name;
//		}
//		
//		//平台门户需要新增
//		public String getIdcard() {
//			return idcard;
//		}
//		
//		public void setRequestUrl(String requestUrl) {
//			this.requestUrl = requestUrl;
//		}
//
//		public String getRequestUrl() {
//			return requestUrl;
//		}
//
//		public Map<String, Object> getCacheMap() {
//			if (cacheMap == null) {
//				cacheMap = new HashMap<String, Object>();
//			}
//			return cacheMap;
//		}
//
//	}
//
//	@Override
//	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//}
