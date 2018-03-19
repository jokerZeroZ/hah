package erp.myproject.sys.servlet;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bouncycastle.jce.provider.DHUtil;

import erp.myproject.sys.service.SystemService;
import erp.myproject.sys.utils.StringUtils;

//import com.chinacreator.common.utils.StringUtils;
//import com.chinacreator.modules.sys.service.SystemService;
//import com.chinacreator.openid.client.servlet.DESUtil;
//import com.chinacreator.openid.client.servlet.KosVerifyUserServlet;
//import com.chinacreator.openid.model.SimpleUserAccount;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月18日 下午9:36:58 
* explain
*/
//
//public class SSOLoginServlet extends KosVerifyUserServlet<SimpleUserAccount> {
//
//	private static final long serialVersionUID = -7824399302935839850L;
//	public static Map<String, String> userKeyMap = new HashMap<String, String>();
//
//	//@Override
//	protected SimpleUserAccount findUserAccount(String appAccountId,
//			Map<String, String> personaInfoMap,
//			HttpServletRequest httpServletRequest,
//			HttpServletResponse httpServletResponse) {
//
//		return null;
//
//	}
//
//	@Override
//	protected SimpleUserAccount addUserAccount(String appAccountId,
//			String password, String requestUrl,
//			Map<String, String> personaInfoMap,
//			Map<String, String> specialValueMap,
//			HttpServletRequest httpServletRequest,
//			HttpServletResponse httpServletResponse) {
//
//		return new SimpleUserAccount(appAccountId, password, requestUrl,
//				specialValueMap);
//
//	}
//
//	/**
//	 * SSO
//	 */
//	@Override
//	protected void doLogin(SimpleUserAccount userAccount,
//			Map<String, String> personaInfoMap,
//			HttpServletRequest httpServletRequest,
//			HttpServletResponse httpServletResponse) throws Exception {
//		String username = userAccount.getUserName();
//		String isRuleUser = personaInfoMap.get("isRuleUser");
//		String password = userAccount.getPassword();
//		if("true".equals(isRuleUser)){
//			String key = StringUtils.generateId();
//			userKeyMap.put(userAccount.getUserName(), key);
//			password = SystemService.entryptPassword(key);
//		}
//		username = DHUtil.encrypt(username);
//		password = DESUtil.encrypt(password);
//		String path = httpServletRequest.getContextPath();
//		String mailURL = path + "/a/login?username=" + username + "&password="
//				+ password + "&enType=1&requestUrl="+userAccount.getRequestUrl();
//		httpServletResponse.sendRedirect(mailURL);
//	}
//
//	@Override
//	protected void modifyUserAccount(SimpleUserAccount userAccount,
//			Map<String, String> personaInfoMap,
//			HttpServletRequest httpServletRequest,
//			HttpServletResponse httpServletResponse) {
//
//	}

//}
