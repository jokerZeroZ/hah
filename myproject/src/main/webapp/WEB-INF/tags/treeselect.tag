<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="id" type="java.lang.String" required="true" description="编号"%>
<%@ attribute name="name" type="java.lang.String" required="true" description="隐藏域名称（ID）"%>
<%@ attribute name="value" type="java.lang.String" required="true" description="隐藏域值（ID）"%>
<%@ attribute name="labelName" type="java.lang.String" required="true" description="输入框名称（Name）"%>
<%@ attribute name="labelValue" type="java.lang.String" required="true" description="输入框值（Name）"%>
<%@ attribute name="title" type="java.lang.String" required="true" description="选择框标题"%>
<%@ attribute name="url" type="java.lang.String" required="true" description="树结构数据地址"%>
<%@ attribute name="checked" type="java.lang.Boolean" required="false" description="是否显示复选框"%>
<%@ attribute name="extId" type="java.lang.String" required="false" description="排除掉的编号（不能选择的编号）"%>
<%@ attribute name="notAllowSelectRoot" type="java.lang.Boolean" required="false" description="不允许选择根节点"%>
<%@ attribute name="notAllowSelectParent" type="java.lang.Boolean" required="false" description="不允许选择父节点"%>
<%@ attribute name="module" type="java.lang.String" required="false" description="过滤栏目模型（只显示指定模型，仅针对CMS的Category树）"%>
<%@ attribute name="selectScopeModule" type="java.lang.Boolean" required="false" description="选择范围内的模型（控制不能选择公共模型，不能选择本栏目外的模型）（仅针对CMS的Category树）"%>
<%@ attribute name="allowClear" type="java.lang.Boolean" required="false" description="是否允许清除"%>
<%@ attribute name="cssClass" type="java.lang.String" required="false" description="css样式"%>
<%@ attribute name="cssStyle" type="java.lang.String" required="false" description="css样式"%>
<%@ attribute name="disabled" type="java.lang.String" required="false" description="是否限制选择，如果限制，设置为disabled"%>
<%@ attribute name="changeEvent" type="java.lang.Boolean" required="false" description="是否启动变更事件"%>
<%@ attribute name="changeUrl" type="java.lang.Boolean" required="false" description="是否动态变更Url"%>

<%@ attribute name="width" type="java.lang.Integer" required="false" description="是否动态变更Url"%>
<%@ attribute name="height" type="java.lang.Integer" required="false" description="是否动态变更Url"%>

<!-- start for 数据标准 -->

<%@ attribute name="selfId" type="java.lang.String" required="false" description="为数据标准选择过滤数据,排除自身"%>
<%@ attribute name="isForDataStandard" type="java.lang.Boolean" required="false" description="为数据标准选择过滤数据"%>
<%@ attribute name="dataStanTypeCanSet" type="java.lang.Integer" required="false" description="可以选择的标准类型"%>
<%@ attribute name="dataStanTypeNameCanSet" type="java.lang.String" required="false" description="可以选择的标准类型的名称"%>
<!-- end   for 数据标准 -->
<div class="input-append">
	<input id="${id}Id" name="${name}" class="${cssClass}" type="hidden" value="${value}"/>
	<input id="${id}Name" name="${labelName}" readonly="readonly" type="text" value="${labelValue}" maxlength="50"
		class="${cssClass}" style="${cssStyle}"/><a id="${id}Button" href="javascript:" class="btn ${disabled}" style="_padding-top:6px;">&nbsp;<i class="icon-search"></i>&nbsp;</a>&nbsp;&nbsp;
</div>
<script type="text/javascript">
	if ('true' == '${changeEvent}'){
		change${id}("${value}");
	}

	$("#${id}Button").click(function(){
		// 是否限制选择，如果限制，设置为disabled
		if ("${disabled}" == "disabled"){
			return true;
		}
		var postUrl = "${url}";
		if ('true' == '${changeUrl}'){
			postUrl = changeUrl("${url}");
		}
		
		// 正常打开	
		top.$.jBox.open("iframe:${ctx}/tag/treeselect?url="+encodeURIComponent(postUrl)+"&module=${module}&checked=${checked}&type=${dataStanTypeCanSet}&selfId=${selfId}&extId=${extId}&selectIds="+$("#${id}Id").val(), "选择${title}", ${empty width?'300':width}, ${empty height?'420':height}, {
			buttons:{"确定":"ok", ${allowClear?"\"清除\":\"clear\", ":""}"关闭":true}, submit:function(v, h, f){
				if (v=="ok"){
					var tree = h.find("iframe")[0].contentWindow.tree;//h.find("iframe").contents();
					var ids = [], names = [], nodes = [];
					if ("${checked}" == "true"){
						nodes = tree.getCheckedNodes(true);
					}else{
						nodes = tree.getSelectedNodes();
					}
					for(var i=0; i<nodes.length; i++) {//<c:if test="${checked}">
						if (nodes[i].isParent){
							continue; // 如果为复选框选择，则过滤掉父节点
						}//</c:if><c:if test="${notAllowSelectRoot}">
						if (nodes[i].level == 0){
							top.$.jBox.tip("不能选择根节点（"+nodes[i].name+"）请重新选择。");
							return false;
						}//</c:if><c:if test="${notAllowSelectParent}">
						if (nodes[i].isParent){
							top.$.jBox.tip("不能选择父节点（"+nodes[i].name+"）请重新选择。");
							return false;
						}//</c:if><c:if test="${not empty module && selectScopeModule}">
						if (nodes[i].module == ""){
							top.$.jBox.tip("不能选择公共模型（"+nodes[i].name+"）请重新选择。");
							return false;
						}else if (nodes[i].module != "${module}"){
							top.$.jBox.tip("不能选择当前栏目以外的栏目模型，请重新选择。");
							return false;
						}//</c:if>
						if("${isForDataStandard}"=="true"){
							if(nodes[i].level != "${dataStanTypeCanSet}" ){
								top.$.jBox.tip("只能选择${dataStanTypeNameCanSet}类型的节点");
								return false;
							}
							if(nodes[i].prefer!=null){
								top.$.jBox.tip("不能选中取用/引用节点");
								return false;
							}
						}
						ids.push(nodes[i].id);
						names.push(nodes[i].name);//<c:if test="${!checked}">
						break; // 如果为非复选框选择，则返回第一个选择  </c:if>
					}
					$("#${id}Id").val(ids);
					$("#${id}Name").val(names);
					if ('true' == '${changeEvent}'){
						change${id}(ids);
					}
				}//<c:if test="${allowClear}">
				else if (v=="clear"){
					$("#${id}Id").val("");
					$("#${id}Name").val("");
					if ('true' == '${changeEvent}'){
						change${id}("");
					}
                }//</c:if>
			}, loaded:function(h){
				$(".jbox-content", top.document).css("overflow-y","hidden");
			}
		});
	});
</script>