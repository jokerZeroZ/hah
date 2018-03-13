package erp.myproject.sys.utils;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import erp.myproject.sys.dao.DictDao;
import erp.myproject.sys.entity.Dict;

/** 
* @author joker E-mail:zhanglq@hnu.edu.cn 
* @version createTime:2018年3月13日 下午4:40:46 
* explain
*/

public class DictUtils {

	private static final String MENU_VAR = "menuVar";

	private static DictDao dictDao = SpringContextHolder.getBean(DictDao.class);
	/*	private static ContractAmountDetailService contractAmountDetailService = SpringContextHolder
			.getBean(ContractAmountDetailService.class);
	private static BidService bidService = SpringContextHolder
	.getBean(BidService.class);
	private static ContractPaymentReceiptService contractPaymentReceiptService = SpringContextHolder
			.getBean(ContractPaymentReceiptService.class);
	private static PaymentReceiveService paymentReceiveService = SpringContextHolder
			.getBean(PaymentReceiveService.class);
	private static CommonService commonService = SpringContextHolder
			.getBean(CommonService.class);
	private static ContractPaymentService contractPaymentService = SpringContextHolder
			.getBean(ContractPaymentService.class);
	private static ReportInstanceService reportInstanceService = SpringContextHolder
			.getBean(ReportInstanceService.class);

	private static DictCostDao dictCostDao=SpringContextHolder.getBean(DictCostDao.class);
	
	private static SkglyhzhDao skglyhzhDao=SpringContextHolder.getBean(SkglyhzhDao.class);
	
	private static SkgllbDao skgllbDao=SpringContextHolder.getBean(SkgllbDao.class);
	
	private static LcdictService lcdictService = SpringContextHolder.getBean(LcdictService.class);
*/
	public static final String CACHE_DICT_MAP = "dictMap";

	
	
	public static String getDictLabel(String value, String type,
			String defaultValue) {
		if (StringUtils.isNotBlank(type) && StringUtils.isNotBlank(value)) {
			for (Dict dict : getDictList(type)) {
				if (type.equals(dict.getType())
						&& value.equals(dict.getValue())) {
					return dict.getLabel();
				}
			}
		}
		return defaultValue;
	}
/*
	public static String getDictValue(String label, String type,
			String defaultLabel) {
		if (StringUtils.isNotBlank(type) && StringUtils.isNotBlank(label)) {
			for (Dict dict : getDictList(type)) {
				if (type.equals(dict.getType())
						&& label.equals(dict.getLabel())) {
					return dict.getValue();
				}
			}
		}
		return defaultLabel;
	}
*/
	public static List<Dict> getDictList(String type) {
		@SuppressWarnings("unchecked")
		Map<String, List<Dict>> dictMap = (Map<String, List<Dict>>) CacheUtils
				.get(CACHE_DICT_MAP);
		if (dictMap == null) {
			dictMap = Maps.newHashMap();
			for (Dict dict : dictDao.findAllList()) {
				List<Dict> dictList = dictMap.get(dict.getType());
				if (dictList != null) {
					dictList.add(dict);
				} else {
					dictMap.put(dict.getType(), Lists.newArrayList(dict));
				}
			}
			CacheUtils.put(CACHE_DICT_MAP, dictMap);
		}
		List<Dict> dictList = dictMap.get(type);
		if (dictList == null) {
			dictList = Lists.newArrayList();
		}
		return dictList;
	}
	/*
	public static List<Dict> getDictByScopeList(String type,String Scope) {
		@SuppressWarnings("unchecked")
		Map<String, List<Dict>> dictMap = (Map<String, List<Dict>>) CacheUtils
				.get(CACHE_DICT_MAP);
		if (dictMap == null) {
			dictMap = Maps.newHashMap();
			for (Dict dict : dictDao.findAllList()) {
				List<Dict> dictList = dictMap.get(dict.getType());
				if (dictList != null) {
					dictList.add(dict);
				} else {
					dictMap.put(dict.getType(), Lists.newArrayList(dict));
				}
			}
			CacheUtils.put(CACHE_DICT_MAP, dictMap);
		}
		List<Dict> dictList = dictMap.get(type);
		List<Dict> tmpList=Lists.newArrayList(); 
		if(StringUtils.isNotEmpty(Scope)){
			List<String> scopelist = Arrays.asList(Scope.split(","));
			for (Dict dict : dictList) {
                if(scopelist.contains(dict.getValue())){
                	tmpList.add(dict);
                }
			}
		}
		return tmpList;
	}

	public static String getMenuVarValue(String value) {
		return getDictLabel(value, MENU_VAR, "");
	}

	// 以某个表的ID取出该表的对应名称
	public static String getTableFieldLabel(String tablename, String showfield,
			String wherefield, String fieldvalue) {
		if (StringUtils.isNotBlank(tablename)
				&& StringUtils.isNotBlank(showfield)
				&& StringUtils.isNotBlank(wherefield)) {
			String sql = "select " + showfield + " from " + tablename
					+ " where " + wherefield + "='" + fieldvalue + "'";
			List<List> list = dictDao.findBySql(sql.toString(), List.class);
			if (list != null && list.size() > 0) {
				List tmp = (List) list.get(0);
				return (String) tmp.get(0);
			}
		}
		return "";
	}

	public static List<Dict> getAmountDetail(String contractid) {
		return contractAmountDetailService.getAmountDetail(contractid);
	}
	
	public static List<Dict> getNewBidAmountDetail(String bid) {
		return bidService.getNewAmountDetail(bid);
	}
	 
	public static List<Dict> getbidAmountDetail(String bid) {
		return bidService.getbidAmountDetail(bid);
	}
	
	public static String showAmountByCode(String contractid, String cptypecode) {
		//根据合同算出已开发票数
		return contractPaymentReceiptService.showAmountByCode(contractid, cptypecode);
	}
	
	public static Map getReceiptAmountByCode(String contractid, String cptypecode, String cpid) {
		return contractPaymentReceiptService.sumByCptypecode(contractid, cptypecode, cpid);
	}
	
	public static String showReceiveAmountByCode(String contractid, String cptypecode) {
		//根据合同算出已到款数
		return paymentReceiveService.sumReceiveByCode(contractid, cptypecode);
	}
	
	public static Map getReceiveAmountByCode(String contractid, String cptypecode, String cpid) {
		//算出该合同下细分条款的已到款数，除掉自己
		return paymentReceiveService.sumReceiveByCptypecode(contractid, cptypecode, cpid);
	}

	public static List<DictCost> getDictCostList() {
		return commonService.getDictCostList();
	}

	public static List<DictCost> getDictCostListBy(String type) {
		return commonService.getDictCostList(type);
	}
	
	public static Map<String, Dict> getDictMap(String type) {
		List<Dict> list = getDictList(type);
		Map<String, Dict> map = new HashMap<String, Dict>();
		for (Dict dict : list) {
			map.put(dict.getValue(), dict);
		}
		return map;
	}
	
	public static String getContractPaymentByID(String cpid){
		if(StringUtils.isEmpty(cpid)){
			return "";
		}
		ContractPayment contractPayment =contractPaymentService.get(cpid);
		if(contractPayment==null || StringUtils.isEmpty(contractPayment.getCptypecode()) ){
			return "";
		}
		return DictUtils.getDictLabel(contractPayment.getCptypecode(), "erp_cp_type", "1"); 
	}
	
	public static String getDoubleFormat(String data,Integer len){ 
		if (data == null || data.length() < 1) {
			return "";
		}
		NumberFormat formater = null;
		double num = Double.parseDouble(data);
		if (len == 0) {
			formater = new DecimalFormat("####.00");

		} else {
			StringBuffer buff = new StringBuffer();
			buff.append("####.");
			for (int i = 0; i < len; i++) {
				buff.append("#");
			}
			formater = new DecimalFormat(buff.toString());
		}
		return formater.format(num);
	}
	
	public static String getStringReplace(String str){ 
		if (str == null || str.length() < 1) {
			return "";
		}
	    if(str.indexOf("\"")!=-1){
	    	str.replace("\"", "");
	    }
	    if(str.indexOf("'")!=-1){
	    	str.replace("'", "");
	    }
		return str;
	}
	
	public static List<ReportInstance> getReportInstanceList(String reportid) {
		ReportInstance reportInstance = new ReportInstance();
		reportInstance.setReportid(reportid);
		reportInstance.setState("1");
		return reportInstanceService.find(reportInstance);
	}
	
	// 确认费用科目列表
		public static List<DictCost> getDictCostListBySearch() {
			@SuppressWarnings("unchecked")
			List<DictCost> dictCostList = new ArrayList<DictCost>();
			DetachedCriteria dc = dictCostDao.createDetachedCriteria();
			dc.add(Restrictions.ne("value", "1"));
//			dc.add(Restrictions.eq("type", "4"));
//			dc.add(Restrictions.eq(Dict.DEL_FLAG, Dict.DEL_FLAG_NORMAL));
			dc.addOrder(Order.desc("sort"));
			dictCostList = dictCostDao.find(dc);
			return dictCostList;
		}
		
	// 银行账号列表
		public static List<Skglyhzh> getbankaccountList() {
			@SuppressWarnings("unchecked")
			List<Skglyhzh> yhzhtmpList = new ArrayList<Skglyhzh>();
			DetachedCriteria dc = skglyhzhDao.createDetachedCriteria();
			dc.addOrder(Order.asc("id"));
			yhzhtmpList = skglyhzhDao.find(dc);
			List<Skglyhzh> yhzhList = new ArrayList<Skglyhzh>();
			for(int i=0;i<yhzhtmpList.size();i++){
				Skglyhzh bean=yhzhtmpList.get(i);
				bean.setYhzhmc_yhzhhm(bean.getYhzhmc());
				yhzhList.add(bean);
			}
			return yhzhList;
		}
		
	//收款大类别列表
	public static List<Skgllb> getSkDleList() {
		@SuppressWarnings("unchecked")
		String sql="select j.dlb as id,j.dlb as name from t_skgl j group by j.dlb";
		List<Skgllb> list = new ArrayList<Skgllb>();
		List<Object[]> lists = dictDao.findBySql(sql);
	   for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next();
            Skgllb skgllb = new Skgllb();
            skgllb.setId(objects[0]==null?"":objects[0].toString());
            skgllb.setName(objects[1]==null?"":objects[1].toString());
            list.add(skgllb);
	   }
		return list;
	}
		
    //付款大类别列表
	public static List<Skgllb> getFkDleList() {
		@SuppressWarnings("unchecked")
		String sql="select j.dlb as id,j.dlb as name from t_fkgl j group by j.dlb";
		List<Skgllb> list  = new ArrayList<Skgllb>();
		List<Object[]> lists = dictDao.findBySql(sql);
	    for (Iterator<Object[]> iterator = lists.iterator(); iterator.hasNext();) {
            Object[] objects = iterator.next();
            Skgllb skgllb = new Skgllb();
            skgllb.setId(objects[0]==null?"":objects[0].toString());
            skgllb.setName(objects[1]==null?"":objects[1].toString());
            list.add(skgllb);
	    }
		return list;
	}	
		
	// 收付列表列表
	public static List<Skgllb> getdaleiList(String type) {
			@SuppressWarnings("unchecked")
			List<Skgllb> lbList = new ArrayList<Skgllb>();
			DetachedCriteria dc = skgllbDao.createDetachedCriteria();
			if("1".equals(type)){
				dc.add(Restrictions.eq("bs", "1"));
			}else{
				dc.add(Restrictions.eq("bs", "2"));
			}
			dc.add(Restrictions.eq("parentid", "0"));
			dc.addOrder(Order.asc("id"));
			lbList = skgllbDao.find(dc);
			return lbList;
		}
	  //报账住宿、伙食标准   
	public static List<Lcdict> getDictListBytypeAndRank(String type,String rank) {
		@SuppressWarnings("unchecked")
		List<Lcdict> lcList = new ArrayList<Lcdict>();
		Lcdict dict=new Lcdict();
		dict.setType(type);
		dict.setRank(rank);
		lcList=lcdictService.find(dict);
		return lcList;
	}
	*/
}
