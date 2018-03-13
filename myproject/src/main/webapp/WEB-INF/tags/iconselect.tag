<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="id" type="java.lang.String" required="true" description="编号"%>
<%@ attribute name="name" type="java.lang.String" required="true" description="输入框名称"%>
<%@ attribute name="value" type="java.lang.String" required="true" description="输入框值"%>
<%@ attribute name="isKosIcon" type="java.lang.Boolean" required="false" description="kos icon select"%>
<%@ attribute name="url" type="java.lang.String" required="true" description="controler url"%>

<c:choose>
	<c:when test="${isKosIcon }">
		<img src="${ctxStatic}/images/kos/${value}" id="${id}Img" class="icon-${not empty value?'img':' hide'}"/>
	</c:when>
	<c:otherwise>
		<i id="${id}Icon" class="icon-${not empty value?value:' hide'}"></i>&nbsp;
	</c:otherwise>
</c:choose>
<label id="${id}IconLabel">${not empty value?value:'无'}</label>&nbsp;
<input id="${id}" name="${name}" type="hidden" value="${value}"/><a id="${id}Button" href="javascript:" class="btn">选择</a>&nbsp;&nbsp;
<script type="text/javascript">
	$("#${id}Button").click(function(){
		top.$.jBox.open("iframe:${ctx}${url}?value="+$("#${id}").val(), "选择图标", 700, $(top.document).height()-180, {
            buttons:{"确定":"ok", "清除":"clear", "关闭":true}, submit:function(v, h, f){
                if (v=="ok"){
                	var icon = h.find("iframe")[0].contentWindow.$("#icon").val();
                	$("#${id}Icon").attr("class", "icon-"+icon);
	                $("#${id}IconLabel").text(icon);
	                $("#${id}").val(icon);
	                if("${isKosIcon =='true'}"){
	                	if(icon !=""){
	                		$("#${id}Img").attr("src","${ctxStatic}/images/kos/"+icon);
	                		$("#${id}Img").removeClass("icon- hide").addClass("icon-img");
	                	}
	                }
                }else if (v=="clear"){
	                $("#${id}Icon").attr("class", "icon- hide");
	                $("#${id}IconLabel").text("无");
	                $("#${id}").val("");
                }
            }, loaded:function(h){
                $(".jbox-content", top.document).css("overflow-y","hidden");
            }
        });
	});
</script>