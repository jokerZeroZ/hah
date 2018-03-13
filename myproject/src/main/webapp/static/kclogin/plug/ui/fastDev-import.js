/*
 * 此文件为控件库文件统一加载文件，在页面中只需要引用此文件即可完成控件库所需要的文件加载
 * 为保证各文件引用路径正确，此文件会解析绝对路径进行文件引用
 * 请按要求更改下面的引用信息
 */

// 使用时请将projextname修改为项目名称
var host = /(.*oa-core\/)/.exec(window.location.href)[1]+"ui/";
// css文件加载
document.write("<link href='"+host+""+"css/fastui-default.css' rel='stylesheet' type='text/css' ><\/link>");
// 控件库js文件加载
document.write("<script src='"+host+""+"fastui.js'><\/script>");
// html代码编译文件加载
document.write("<script src='"+host+""+"common.js'><\/script>");


