(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
    	/**    如果要验证身份证请调用class="checkidcard"    **/
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 不能为空",
                    "alertTextCheckboxMultiple": "<span style='color:red'>*</span> 请选择",
                    "alertTextCheckboxe": "<span style='color:red'>*</span> 请选择"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 最少输入 ",
                    "alertText2": " 个字"
                },
                "maxSize": {
                    "regex": "",
                    "alertText": "<span style='color:red'>*</span> 最多输入 ",
                    "alertText2": " 个字"
                },
                "between": {
                    "regex": "^(.|\n){6,16}$",
                    "alertText": "<span style='color:red'>*</span> 请输入6-16个字符 ",
                    "alertText2": " 16个字"
                },
                "min": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 不能小于 "
                },
                
                "max": {
                    "regex": "^.{1,16}$",
                    "alertText": "<span style='color:red'>*</span> 最多输入16个字符 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 日期不能小于 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 日期不能大于 "
                },	
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 最多选择 ",
                    "alertText2": " 项"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 最少选择 ",
                    "alertText2": " 项"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "<span style='color:red'>*</span> 字段不匹配"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    //"regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                	//"regex": /^\d{11}$/,
                	"regex": /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^[0-9]{3,11}$)/,
                    "alertText": "<span style='color:red'>*</span> 错误的电话号码"
                },
                "mphone": {
                    // credit: jquery.h5validate.js / orefalo
                    //"regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                	//"regex": /^\d{11}$/,
                	"regex": /^0*\d{11}$/,
                    "alertText": "<span style='color:red'>*</span> 错误的手机号码"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "<span style='color:red'>*</span> 错误的邮箱"
                },
                "qq": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^[0-9]{5,11}$/,
                    "alertText": "<span style='color:red'>*</span> qq号为5-11位数字!"
                },
                "code": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^\d{6}$/,
                    "alertText": "<span style='color:red'>*</span> 错误的邮政编码"
                },
                "address": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^[^\w]/,
                    "alertText": "<span style='color:red'>*</span> 错误的单位地址"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "<span style='color:red'>*</span> 非整型数字"
                },
                "positiveinteger": {
                    "regex": /^[\+]?\d+$/,
                    "alertText": "<span style='color:red'>*</span> 非正整型数字"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "<span style='color:red'>*</span> 错误的数字"
                },
               
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "<span style='color:red'>*</span> 错误的日期, 格式:年-月-日"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "<span style='color:red'>*</span> 错误的IP地址"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "<span style='color:red'>*</span> 错误的网址"
                },
                "fax": {
                    "regex": /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
                    "alertText": "<span style='color:red'>*</span> 传真正确格式:XXXX-XXXXXXXX或XXXXXXXX（默认为XXXX-）"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "<span style='color:red'>*</span> 只能输入数字"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "<span style='color:red'>*</span> 只能输入字母"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]{1,12}$/,
                    "alertText": "<span style='color:red'>*</span> 请输入1-12个字母或数字"
                },
                "loginUserNameCheck": {
                    "regex": /^[a-zA-Z]{1}\w*$/,
                    "alertText": "<span style='color:red'>*</span> 登陆名只能以字母开头，且由数字、字母和下划线组成"
                },
                "userNameCheck": {
                    "regex": /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                    "alertText": "<span style='color:red'>*</span> 用户真实名称只能为中文、数字、字母和下划线"
                },
                "onlyLetterOrNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "<span style='color:red'>*</span> 请输入字母或数字"
                },
                "onlyCc": {
                    "regex": "^[\u2E80-\u9FFF]{1,50}$",
                    "alertText": "<span style='color:red'>*</span> 请输入1-50个汉字"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* 用户名已用",
                    "alertTextLoad": "* 验证中..."
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* 名字已被使用",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 名字可用",
                    // speaks by itself
                    "alertTextLoad": "* 验证中..."
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertTextOk": "* This username is available",
	                    "alertText": "* This name is already taken",
	                    // speaks by itself
	                    "alertTextLoad": "* Validating, please wait"
	                },
				 "ajaxNameCallJsp": {
	                    // remote json service location
	                    "url": "jspajax/userName.jsp",
	                    // error
	                    "alertText": "* This name is already taken",
	                    // speaks by itself
	                    "alertTextLoad": "* jsp,验证中..."
	                },
						
                "validate2fields": {
                    "alertText": "* 请输入 HELLO"
                },
	            "yy": {
	                "alertText": "* 请输入 YY"
	            },
	            "yy2": {
                    "regex": /^y+/,
                    "alertText": "* 自定义2,请以y开头"
	            }	
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);