/*
 * 此文件为控件库文件统一加载文件，在页面中只需要引用此文件即可完成控件库所需要的文件加载
 * 为保证各文件引用路径正确，此文件会解析绝对路径进行文件引用
 * 请按要求更改下面的引用信息
 */
var ProjectName = "/"+window.location.pathname.substring(1).split("/")[0];
//css文件加载
document.write("<link href='"+ProjectName+"/ccapp/oa/resources/style/lightblue/css/huiyi.css' rel='stylesheet' type='text/css' ><\/link>");
document.write("<link href='"+ProjectName+"/ccapp/oa/resources/style/lightblue/css/tinyscrollbar.css' rel='stylesheet' type='text/css' ><\/link>");
//jquery   js文件加载
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/plug/jquery-ui-1.8.17.custom/js/jquery-1.7.1.min.js'><\/script>");
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/plug/jquery-ui-1.8.17.custom/js/jquery-ui-1.8.17.custom.min.js'><\/script>");
//public   js文件加载
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/util/public.js'><\/script>");
//弹出框控件
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/plug/ifrom/js/ifrom-pubopt1.1.js'><\/script>");
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/plug/ifrom/js/ifrom-tools.1.2.js'><\/script>");
//alert
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/plug/ifrom/js/ifrom-ui-alert.1.1.js'><\/script>");
document.write("<script src='"+ProjectName+"/ccapp/oa/resources/plug/ifrom/js/ifrom-min.1.1.js'><\/script>");

