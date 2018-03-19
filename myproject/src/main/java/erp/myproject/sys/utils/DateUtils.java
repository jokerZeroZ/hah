package erp.myproject.sys.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang.time.DateFormatUtils;

import com.google.inject.internal.Maps;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月14日 上午11:08:17 
* explain 日期工具类, 继承org.apache.commons.lang.time.DateUtils类
*/

public class DateUtils extends org.apache.commons.lang.time.DateUtils {
	
	public static final String formatString = "yyyy-MM-dd HH:mm";
	private static String[] parsePatterns = { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", 
		"yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" };

	/**
	 * 得到当前日期字符串 格式（yyyy-MM-dd）
	 */
	public static String getDate() {
		return getDate("yyyy-MM-dd");
	}
	
	/**
	 * 得到当前日期字符串 格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
	 */
	public static String getDate(String pattern) {
		return DateFormatUtils.format(new Date(), pattern);
	}
	
	/**
	 * 得到日期字符串 默认格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
	 */
	public static String formatDate(Date date, Object... pattern) {
		String formatDate = null;
		if (pattern != null && pattern.length > 0) {
			formatDate = DateFormatUtils.format(date, pattern[0].toString());
		} else {
			formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
		}
		return formatDate;
	}

	/**
	 * 得到当前时间字符串 格式（HH:mm:ss）
	 */
	public static String getTime() {
		return formatDate(new Date(), "HH:mm:ss");
	}

	/**
	 * 得到当前日期和时间字符串 格式（yyyy-MM-dd HH:mm:ss）
	 */
	public static String getDateTime() {
		return formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 得到当前年份字符串 格式（yyyy）
	 */
	public static String getYear() {
		return formatDate(new Date(), "yyyy");
	}

	/**
	 * 得到当前月份字符串 格式（MM）
	 */
	public static String getMonth() {
		return formatDate(new Date(), "MM");
	}

	/**
	 * 得到当天字符串 格式（dd）
	 */
	public static String getDay() {
		return formatDate(new Date(), "dd");
	}

	/**
	 * 得到当前星期字符串 格式（E）星期几
	 */
	public static String getWeek() {
		return formatDate(new Date(), "E");
	}
	
	/**
	 * 日期型字符串转化为日期 格式
	 * { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", 
	 *   "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" }
	 */
	public static Date parseDate(Object str) {
		if (str == null){
			return null;
		}
		try {
			return parseDate(str.toString(), parsePatterns);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 获取过去的天数
	 * @param date
	 * @return
	 */
	public static long pastDays(Date date) {
		long t = new Date().getTime()-date.getTime();
		return t/(24*60*60*1000);
	}
	
	/**
	 * 获取格式化好的当前时间
	 * 
	 * @return "yyyy-MM-dd HH:mm"
	 */
	public static String getformatNowDate() {
		return formatDate(new Date(), formatString);
	}
	
	public static String formatDate(Date date, String format) {
		java.text.DateFormat df = new java.text.SimpleDateFormat(format);
		return df.format(date);
	}
	
	public static Date getDate(String sdf,String sf){
		if(StringUtils.isEmpty(sdf)) return null;
		Date date = null;
		SimpleDateFormat df = new SimpleDateFormat(sf);
		try{
			date = df.parse(sdf);
		}catch(Exception e){
			
		}
		return date;
	}
	public static Map<String,Integer> getLastDayOfMonth(int year, int month) {  
		Map<String,Integer> resultMap = Maps.newHashMap();
		Calendar a = Calendar.getInstance();  
	    a.set(Calendar.YEAR, year);  
	    a.set(Calendar.MONTH, month - 1);  
	    a.set(Calendar.DATE, 1);  
	    a.roll(Calendar.DATE, -1);  
	    int weekOfMonth = a.getActualMaximum(Calendar.WEEK_OF_MONTH);
	    int maxDate = a.get(Calendar.DATE);
	    resultMap.put("weekOfMonth", weekOfMonth);
	    resultMap.put("maxDate", maxDate);
	    return resultMap;
		
    }  
	
	/**
	 * 得到当前日期和时间字符串 格式（yyyy-MM）
	 */
	public static String getLastMonth() {
        Calendar cal = Calendar.getInstance();
        //      设置天数为-1天，表示当月减一天即为上一个月的月末时间        
        cal.set(Calendar.DAY_OF_MONTH, -1);        
        //格式化输出年月日        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");        
        return sdf.format(cal.getTime());
	}
	/**
	 * @param args
	 * @throws ParseException
	 */
	public static void main(String[] args) throws ParseException {
		System.out.println(getLastMonth());
	}
}
