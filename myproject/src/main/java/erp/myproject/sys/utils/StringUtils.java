package erp.myproject.sys.utils;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.LocaleResolver;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月13日 下午9:14:49 
* explain 字符串工具类, 继承org.apache.commons.lang3.StringUtils类
*/

public class StringUtils extends org.apache.commons.lang3.StringUtils {

	public static String generateId() {
		String s = UUID.randomUUID().toString().toUpperCase();
		return s.substring(0, 8) + s.substring(9, 13) + s.substring(14, 18)
				+ s.substring(19, 23) + s.substring(24);
	}

	public static List<Long> toLongList(String ids) {

		List<Long> idList = new ArrayList<Long>();
		if (StringUtils.isEmpty(ids)) {
			return idList;
		}

		String[] idSplits = ids.split(",");
		for (String idSplit : idSplits) {
			if (!StringUtils.isEmpty(idSplit)) {
				idList.add(StringUtils.toLong(idSplit));
			}
		}
		return idList;
	}

	public static List<String> toStringList(String ids) {

		List<String> idList = new ArrayList<String>();
		if (StringUtils.isEmpty(ids)) {
			return idList;
		}

		String[] idSplits = ids.split(",");
		for (String idSplit : idSplits) {
			if (!StringUtils.isEmpty(idSplit)) {
				idList.add(idSplit);
			}
		}
		return idList;
	}

	/**
	 * 替换掉HTML标签方法
	 */
	public static String replaceHtml(String html) {
		if (isBlank(html)) {
			return "";
		}
		String regEx = "<.+?>";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(html);
		String s = m.replaceAll("");
		return s;
	}

	/**
	 * 缩略字符串（不区分中英文字符）
	 * 
	 * @param str
	 *            目标字符串
	 * @param length
	 *            截取长度
	 * @return
	 */
	public static String abbr(String str, int length) {
		if (str == null) {
			return "";
		}
		try {
			StringBuilder sb = new StringBuilder();
			int currentLength = 0;
			for (char c : str.toCharArray()) {
				currentLength += String.valueOf(c).getBytes("GBK").length;
				if (currentLength <= length - 3) {
					sb.append(c);
				} else {
					sb.append("...");
					break;
				}
			}
			return sb.toString();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * 判断字符窜是否存在
	 * 
	 * @param str
	 *           目标字符串 
	 * @param str
	 *           源头字符串 
	 * @return
	 */
	public static Boolean hasIn(String str, String liststr) {
		if (StringUtils.isEmpty(str) || StringUtils.isEmpty(liststr)) {
			return null;
		}
		String [] arraystr=liststr.split(",");
		List<String> strlist=java.util.Arrays.asList(arraystr);
		return strlist.contains(str);
	}

	/**
	 * 转换为Double类型
	 */
	public static Double toDouble(Object val) {
		if (val == null || val.equals("null")) {
			return 0D;
		}
		try {
			return Double.valueOf(trim(val.toString()));
		} catch (Exception e) {
			return 0D;
		}
	}

	/**
	 * 转换为Float类型
	 */
	public static Float toFloat(Object val) {
		return toDouble(val).floatValue();
	}

	/**
	 * 转换为Long类型
	 */
	public static Long toLong(Object val) {
		return toDouble(val).longValue();
	}

	/**
	 * 转换为Integer类型
	 */
	public static Integer toInteger(Object val) {
		return toLong(val).intValue();
	}

	/**
	 * 获得i18n字符串
	 */
	public static String getMessage(String code, Object[] args) {
		LocaleResolver localLocaleResolver = (LocaleResolver) SpringContextHolder
				.getBean(LocaleResolver.class);
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		Locale localLocale = localLocaleResolver.resolveLocale(request);
		return SpringContextHolder.getApplicationContext().getMessage(code,
				args, localLocale);
	}

	/**
	 * 获得用户远程地址
	 */
	public static String getRemoteAddr(HttpServletRequest request) {
		String remoteAddr = request.getHeader("X-Real-IP");
		if (isNotBlank(remoteAddr)) {
			remoteAddr = request.getHeader("X-Forwarded-For");
		} else if (isNotBlank(remoteAddr)) {
			remoteAddr = request.getHeader("Proxy-Client-IP");
		} else if (isNotBlank(remoteAddr)) {
			remoteAddr = request.getHeader("WL-Proxy-Client-IP");
		}
		return remoteAddr != null ? remoteAddr : request.getRemoteAddr();
	}

	/**
	 * 金额格式化
	 * 
	 * @param s
	 *            金额
	 * @param len
	 *            小数位数
	 * @return 格式后的金额
	 */
	public static String decimalFormat(String s, int len) {
		if (s == null || s.length() < 1) {
			return "";
		}
		NumberFormat formater = null;
		double num = Double.parseDouble(s);
		if (len == 0) {
			formater = new DecimalFormat("###,###.00");

		} else {
			StringBuffer buff = new StringBuffer();
			buff.append("###,###.");
			for (int i = 0; i < len; i++) {
				buff.append("#");
			}
			formater = new DecimalFormat(buff.toString());
		}
		return formater.format(num);
	}

	/**
	 * 金额格式化
	 * 
	 * @param s
	 * @return
	 */
	public static String decimalFormat(String s) {
		return decimalFormat(s, 0);
	}
	/**
	 * 金额格式化2位
	 * 
	 * @param s
	 * @return
	 */
	public static String decimalFormat2(String s) {
		return decimalFormat(s, 2);
	}

	/**
	 * 金额格式化
	 * 
	 * @param s
	 * @return
	 */
	public static String decimalFormat(int s) {
		return decimalFormat(String.valueOf(s), 0);
	}
	
	/**
	 * 金额格式化
	 * 
	 * @param s
	 * @return
	 */
	public static String decimalFormat(double s) {
		return decimalFormat(String.valueOf(s), 0);
	}
	
	/**
	 * 字符串加单引号
	 * 
	 * @param s
	 * @return
	 */
	public static String fieldFormat(Object s) {
		if(s==null){
			return null;
		}
		if(isNotEmpty(s.toString()) ){
			return "'"+s.toString().trim()+"'";
		}
		return null;
	}
	
	/**
	 * 根据字符串取Map对象值
	 * 
	 * @param id
	 * @param map
	 * @return
	 */
	public static String getMapValue(String id,Map map) {
		if (map == null || StringUtils.isEmpty(id)) {
			return null;
		}
		if(map.containsKey(id)){
			if(map.get(id)!=null && !String.valueOf(map.get(id)).equals("null")){
				return String.valueOf((map.get(id)));
			}
		} 
		return null;
	}

	/**
	 * 检查字符串是否为数字字符串 返回值：true为是数字，false为不是数字
	 * 
	 * @param String
	 * @return boolean
	 */
	public static boolean isNumber(String str) {
		int i, j;
		String strTemp = "0123456789";

		if (str == null || str.length() == 0) {
			return false;
		}

		for (i = 0; i < str.length(); i++) {
			j = strTemp.indexOf(str.charAt(i));
			if (j == -1) {
				return false;
			}
		}

		return true;
	}

	/**
	 * 功能描述：是否为空白,包括null和""
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isBlank(String str) {
		return str == null || str.trim().length() == 0 || "null".equals(str);
	}

	/**
	 * 检查电子邮件合法性 true表示合法 false表示非法
	 * 
	 * @param String email
	 * @return boolean
	 */
	public static boolean checkEmailIsValid(String email) {

		boolean returnResult = false;

		if (email == null || email.equals("")) {
			returnResult = false;
		}

		for (int i = 1; i < email.length(); i++) {
			char s = email.charAt(i);
			if (s == '@') {
				returnResult = true;
				break;
			}
		}

		return returnResult;
	}

	/**
	 * 判断字符是否为空
	 * 
	 * @param: String param
	 * @return: boolean
	 */
	public static boolean nullOrBlank(String param) {
		return (param == null || param.trim().equals("") || param.equals("null")) ? true : false;
	}

	/**
	 * 过滤掉为null的字符串
	 * 
	 * @param: String param
	 * @return: String
	 */
	public static String deNull(String param) {
		if (nullOrBlank(param))
			return "";
		return param.trim();
	}
	
	/**
	 * 获取uuid的值
	 * 
	 * @return
	 */
	public static String getFromUUID() {
		return UUID.randomUUID().toString();
	}
	
	
	/**
	 * 随机获取样式
	 * @return
	 */
	public static String getXcStyle(){
		String[] arr = {"cube", 
		        "cubeRandom", 
		        "block", 
		        "cubeStop", 
		        "cubeStopRandom", 
		        "cubeHide", 
		        "cubeSize", 
		        "horizontal", 
		       /* "showBars", 
		        "showBarsRandom", */
		        "tube",
		        "fade",
		        "fadeFour",
		        "paralell",
		        "blind",
		        "blindHeight",
		        "blindWidth",
		        "directionTop",
		        "directionBottom",
		        "directionRight",
		        "directionLeft",
		        "cubeSpread",
		        "glassCube",
		        "glassBlock",
		        "circles",
		        "circlesInside",
		        "circlesRotate",
		        "cubeShow",
		        "upBars", 
		        "downBars", 
		        "hideBars", 
		        "swapBars", 
		        "swapBarsBack", 
		        "swapBlocks",
		        "cut"};
		
		Random random = new Random();
		return arr[random.nextInt(arr.length)];
	}
	
	public static Random RANDOM_GETSPFIRST = new Random();
	public static int getSpFirst(){
		return RANDOM_GETSPFIRST.nextInt(4)+1;
	}
	
   public static <T> String jsonFromList(List<T> list) throws Throwable {  
        StringBuilder json = new StringBuilder();  
          
        if (list == null || list.size() == 0) {  
            return null;  
        }  
          
        json.append("[");  
          
        for(int i = 0; i < list.size(); i++) {  
            json.append("{");  
            T t = list.get(i);  
            Class clazz = t.getClass();  
            Field[] fields = t.getClass().getFields();  
            for(int j=0; j<fields.length; j++) {  
                Field field = fields[j];  
                String strFields = field.getName();  
                String getMethodName = "get"+ strFields.substring(0, 1).toUpperCase() + strFields.substring(1);  
                Method method =clazz.getMethod(getMethodName, new Class[]{});  
                Object value = method.invoke(t, new Object[]{});  
                json.append("\"" + strFields + "\"" + ":" + "\"" + value + "\"");  
                  
                if (j < fields.length - 1) {  
                    json.append(",");  
                }  
            }  
            json.append("}");  
            if (i < list.size() - 1) {  
                json.append(",");  
            }  
        }  
          
        json.append("]");  
          
        return json.toString();  
    }  
   
       /**
       *
       * 函数名称: parseData
       * 函数描述: 将json字符串转换为map
       * @param data
       * @return
       */
    public static Map<String, String> mapFromJson(String data){
          GsonBuilder gb = new GsonBuilder();
          Gson g = gb.create();
          Map<String, String> map = g.fromJson(data, new TypeToken<Map<String, String>>() {}.getType());
          return map;
    }
	
    
    
	public static void main(String[] args) {
		System.out.println(decimalFormat(1000000000));
	}
	
	

}
