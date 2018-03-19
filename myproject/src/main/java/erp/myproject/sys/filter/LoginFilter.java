package erp.myproject.sys.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.mvc.method.annotation.ServletResponseMethodArgumentResolver;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月9日 下午4:41:02 
* explain
*/

public class LoginFilter implements Filter {
	
	public static List<String> pattenURL = new ArrayList<String>();
	
	public void doFilter(ServletRequest request,ServletResponse response,FilterChain chain)
			throws IOException,ServletException{
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		HttpServletResponse httpResponse = (HttpServletResponse)response;
		HttpSession session = httpRequest.getSession();
		//登陆url
		String loginUrl = httpRequest.getContextPath()+"/index.jsp";
		String url = httpRequest.getRequestURI().toString();
		//在pattenURL中的全部不拦截url.indexOf(urlStr)> -1表示在url中出现过，出现就不拦截
		for(String urlStr : pattenURL){
			if(url.indexOf(urlStr)>-1){
				chain.doFilter(request, response);
				return;
			}
		}
		
		//超时处理，Ajax请求超时设置超时状态，页面请求超时则返回提示并重定向，session.getAttribution("")是获取到登陆人的session信息
		if(session.getAttribute("")== null){
			//判断是否为Ajax请求
			if(httpRequest.getHeader("x-required-with")!= null
					&&httpRequest.getHeader("x-request-with").equalsIgnoreCase("XMLHttpRequest")){
				httpResponse.addHeader("sessionstatus", "timeOut");		//返回超时标识
				httpResponse.addHeader("loginPath", loginUrl);			//返回url
				chain.doFilter(request, response);
			}else{
				//alter(会话过期。请重新登陆)
				String str = "<script language='javascript'>"+"windows.top.location.href='" + loginUrl + "';</script>";
				response.setContentType("text/html;charset=UTF-8");		//解决中文乱码
				try {
					PrintWriter writer = response.getWriter();
					writer.write(str);
					writer.flush();
					writer.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}else{
			chain.doFilter(request, response);
		}
	}
	
	//过滤初始化调用方法 在pattern URL中的全部不拦截，所以上面使用path.indexOf(urlStr)> -1
	public void init(FilterConfig config) throws ServletException{
		pattenURL.add("index.jsp");
		pattenURL.add("login.do");
		pattenURL.add("css");
		pattenURL.add("image");
		pattenURL.add("js");
		pattenURL.add("fonts");
	}

	//@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}
}
