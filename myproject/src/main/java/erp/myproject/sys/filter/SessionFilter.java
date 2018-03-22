//package erp.myproject.sys.filter;
//
//import java.io.IOException;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.web.filter.OncePerRequestFilter;
//
///** 
//* @author joker E-mail:zhanglq@hnu.edu.cn 
//* @version createTime:2018年3月22日 上午10:30:38 
//* explain
//*/
//
//public class SessionFilter extends OncePerRequestFilter  
//{  
//      
//    /** 登录验证过滤器 */  
//      
//    @Override  
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)  
//        throws ServletException, IOException  
//    {  
//        // 不过滤的uri  
//        String[] notFilter =  
//            new String[] {"/images", "/js", "/css", "/login/tologin", "/login/mainframe", "/user/exist",  
//                "/user/checkPassword", "/signcode"};  
//          
//        // 请求的uri  
//        String uri = request.getRequestURI();  
//        // 是否过滤  
//        boolean doFilter = true;  
//        for (String s : notFilter)  
//        {  
//            if (uri.indexOf(s) != -1)  
//            {  
//                // 如果uri中包含不过滤的uri，则不进行过滤  
//                doFilter = false;  
//                break;  
//            }  
//        }  
//          
//        if (doFilter)  
//        {  
//            // 执行过滤  
//            // 从session中获取登录者实体  
//            Object obj = request.getSession().getAttribute(SessionKeyContent.SESSION_KEY_OBJ_USER_BEAN);  
//            if (null == obj)  
//            {  
//                boolean isAjaxRequest = isAjaxRequest(request);  
//                if (isAjaxRequest)  
//                {  
//                    response.setCharacterEncoding("UTF-8");  
//                    response.sendError(HttpStatus.UNAUTHORIZED.value(), "您已经太长时间没有操作,请刷新页面");  
//                    return ;  
//                }  
//                response.sendRedirect("../login/tologin");  
//                return;  
//            }  
//            else  
//            {  
//                // 如果session中存在登录者实体，则继续  
//                filterChain.doFilter(request, response);  
//            }  
//        }  
//        else  
//        {  
//            // 如果不执行过滤，则继续  
//            filterChain.doFilter(request, response);  
//        }  
//    }  
//      
//    /** 判断是否为Ajax请求  
//     * <功能详细描述> 
//     * @param request 
//     * @return 是true, 否false  
//     * @see [类、类#方法、类#成员] 
//     */  
//    public static boolean isAjaxRequest(HttpServletRequest request)  
//    {  
//        String header = request.getHeader("X-Requested-With");   
//        if (header != null && "XMLHttpRequest".equals(header))   
//            return true;   
//        else   
//            return false;    
//    }  
//      
//}  