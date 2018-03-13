/**
 * Remark:        新增常用联系人/部门
 * Author:        沈联成
 * Company：      湖南科创
 * Added time：   2012.10.18
 * Modify time:   none
 * Modify remark: none
 * Version：      1.0
 *-------------------Function Remark-------------------------
 * Function Remark:   Setting tree function,
                      the $.z_tree is object,Usage is "new Object"
 * Object Name:       $.z_tree()
 * Input parameter:   this.param 
 *                    parameter list:
 *                    treeID:
 *                    titelText:
 * Output parameter:  this
 */
(function($) {
	$.z_tree = function() {
		this.treetypestr = "checkbox"
		this.treeID = "z_tree";
		this.zTreeObject;
		var THIS = this;
		this.initTree = function() {
			THIS.setting = {
					view : {
						selectedMulti : false
					},
					data : {
						simpleData : { // 简单json类型
							enable : true,
							idKey : THIS.item_id,
							pIdKey : THIS.parent_id,
							rootPId : 0
						}
					},
					check : {
						enable : true,
						chkStyle : THIS.treetypestr,
						chkboxType : {
							"Y" : "s",
							"N" : "s"
						},
						radioType : "all"
					},
					callback: {
					    onClick: zTreeOnClick
					}
				};
			//加载树
			var treeObjectMethod = getTreeType(THIS);
			var span = {
					url : window.top.getContextPath()+'/pubtree',
					success : function(ss) {
						if(json.returnValue !='none')
					    {	
							THIS.NODES = json.returnValue;
							if(!THIS.selectedIds || ''==THIS.selectedIds || null ==THIS.selectedIds){
								showDetp(THIS.NODES,THIS.deptId?THIS.deptId:json.orgId);
							}
							else{
								showCiketNode(THIS.NODES,THIS.isType ? THIS.isType : 'person',THIS.selectedIds);
							}
							
					    }
						else{
							THIS.NODES =[];
						}
						var wid = window.top;
						if (wid != null) {
							THIS.zTreeObject = window.top.$.fn.zTree.init(window.top.$("#treeDemo"+ THIS.treeID), THIS.setting,THIS.NODES);
						} else {
							THIS.zTreeObject = $.fn.zTree.init($("#treeDemo" + THIS.treeID),
									THIS.setting,THIS.NODES);
						}
					},
					data : treeObjectMethod[2],
					classID : treeObjectMethod[1],
					method : treeObjectMethod[0]
				}
				ajaxTools(span);
			
		}
		this.init = function() {
			var lock = new window.top.$.lockDiv();
			lock.init();
			//得到果
			this.item_id = this.item_id?this.item_id:'item_id';
			this.parent_id = this.parent_id?this.parent_id:'parent_id';
			// 树布局
			var root = createDiv("_z_tree_root" + this.treeID, "_z_tree_root");
			body = $("body");
			wid = window.top;
			if (null != wid) {
				body = window.top.document.body;
			}
			if (!this.treeID) {
				alert("this docmunt is null!!")
			} else {
				$(body).append($(root));
			}
			var title = createDiv("_z_tree_title" + this.treeID,
					"_z_tree_title");
			$(root).append($(title));

			var titleImg = createDiv("_z_tree_title_img" + this.treeID,"_z_tree_title_img");
			var titleText = createDiv("_z_tree_title_text" + this.treeID,
					"_z_tree_title_text");
			var close = createDiv("_tree_div_title_close" + this.treeID,
					"_tree_div_title_close");
			$(title).append($(close));
			$(title).append($(titleImg));
			$(title).append($(titleText));
			$(titleText).html(this.treeName);
			var isSeachFirst = true;
			
			var seachterInput = window.top.document.createElement("input");
			var seachterValue = "";
			if (this.isShowSeacher) {
				var seacher = createDiv("_z_tree_seacher_box" + this.treeID,
						"_z_tree_seacher_box");
				$(root).append($(seacher));
				$(seachterInput).addClass("_z_tree_seachter_input");
				$(seacher).append($(seachterInput));
				var butseacht = window.top.document.createElement("input");
				$(butseacht).attr("type", "button");
				$(butseacht).val('搜索');
				$(seacher).append($(butseacht));
				$(butseacht).addClass("_z_tree_seachter_input_but");
				$(seachterInput).addClass("tree_box_mid_in");
				$(seachterInput).hover(function(){
					if(""==$(seachterInput).val()){
						$(seachterInput).removeClass();
						$(seachterInput).addClass("tree_box_mid_in");
					}
					else{
						$(seachterInput).removeClass();
					}
					$(seachterInput).addClass("_z_tree_seachter_input");
				});
				$(seachterInput).click(function(){
					if(""==$(seachterInput).val()){
						$(seachterInput).removeClass();
						$(seachterInput).addClass("tree_box_mid_over");
					}
					else{
						$(seachterInput).removeClass();
					}
					$(seachterInput).addClass("_z_tree_seachter_input");
				});
				$(seachterInput).keyup(function(event){
					if(""==$(seachterInput).val()){
						$(seachterInput).removeClass();
						$(seachterInput).addClass("tree_box_mid_over");
					}
					else{
						$(seachterInput).removeClass();
					}
					$(seachterInput).addClass("_z_tree_seachter_input");
					   if (event.keyCode=="13"){
						   $(butseacht).click()
					   }
				});
				$(butseacht).click(
						function() {
							$(seachterInput).removeClass();
							$(seachterInput).addClass("_z_tree_seachter_input");
							seachterValue = $(seachterInput).val();
							if(isSeachFirst){
								THIS.zTreeObject.expandAll(true);
								isSeachFirst = false;
							}
							z_tree_searchTree(THIS.zTreeObject, $(seachterInput)
									.val(), "treeDemo" + THIS.treeID);
						});

			}
			var header = createDiv("_z_tree_header" + this.treeID,
					"_z_tree_header");
			$(root).append($(header));
			$(header).html(this.headerName);
			var treeBody = createDiv("_z_tree_body" + this.treeID,
					"_z_tree_body");
			$(root).append($(treeBody));
			$(treeBody).append(
					"<ul id='treeDemo" + this.treeID + "' class='ztree'></ul>");
			if (!this.isShowButton) {
				var edit = createDiv("_z_tree_edit" + this.treeID,
						"_z_tree_edit");
				$(root).append($(edit));
				var butOk = window.top.document.createElement("input");
				$(butOk).attr("type", "button");
				$(butOk).val('确定');
				$(edit).append($(butOk));
				$(butOk).addClass("_z_tree_edit_ok");
				var butClear = window.top.document.createElement("input");
				$(butClear).attr("type", "button");
				$(butClear).val('取消');
				$(edit).append($(butClear));
				$(butClear).addClass("_z_tree_edit_clear");

				$(butClear).click(function() {
					if(typeof THIS.callbackcancel =="function"){
						THIS.callbackcancel();
					}
					$(root).remove();
					lock.remove();
				});
				$(butOk).click(
						function() {
							OK(THIS.zTreeObject, THIS, THIS.returnFunction,
									THIS.isType ? THIS.isType : 'person',seachterValue);
							$(root).remove();
							lock.remove();
						});
				this.initTree();
				$(close).click(function() {
					if(typeof THIS.callbackcancel =="function"){
						THIS.callbackcancel();
					}
					$(root).remove();
					lock.remove();
				});
			}

		}
	};
	$.extend($.z_tree, {
		treeID : "z_tree"/* 树ID */
	});
})(jQuery);

function z_tree_searchTree(treeObj, lastName, treeid) {
	var nodes = treeObj.transformToArray(treeObj.getNodes());
	for (i = 0; i < nodes.length; i++) {
		// 首先隐藏
		if (nodes[i].name.indexOf(lastName) >= 0) {
			jQuery("#" + nodes[i].tId, window.top.document).parents().show();
			jQuery("#" + nodes[i].tId, window.top.document).show();
		} else {
			jQuery("#" + nodes[i].tId, window.top.document).hide();
		}
	}
}

function OK(zTree, obj, returnFunction, isType,seachterVal) {
	var returnValName = "";// 用户姓名
	var returnValId = "";// 用户登录id
	var returnCode = "";// 用户登录名
	var returnparentNode = "";
	var userObj = new Object();
	nodes = zTree.getCheckedNodes(true);
	var flag = false;

	for ( var i = 0, l = nodes.length; i < l; i++) {
        if(nodes[i].name.indexOf(seachterVal)==-1){
        	continue;
        }
		if (!IsSpace(nodes[i].user_id) && isType == 'person') {
			flag = true;
			returnValId += nodes[i].user_id + ",";
			returnValName += nodes[i].name + ",";
			returnCode += nodes[i].item_code + ",";
			if (null != nodes[i].getParentNode()) {
				returnparentNode += nodes[i].getParentNode().name + ",";
			}
		}
		if (!IsSpace(nodes[i].org_id) && isType == 'dept') {
			flag = true;
			returnValId += nodes[i].org_id + ",";
			returnValName += nodes[i].name + ",";
			returnCode += nodes[i].item_code + ",";
			if (null != nodes[i].getParentNode()) {
				returnparentNode += nodes[i].getParentNode().name + ",";
			}
		}
	}
	if (returnValId.length > 0)
		returnValId = returnValId.substring(0, returnValId.length - 1);
	if (returnValName.length > 0)
		returnValName = returnValName.substring(0, returnValName.length - 1);
	if (returnCode.length > 0)
		returnCode = returnCode.substring(0, returnCode.length - 1);
	if (returnparentNode.length > 0)
		returnparentNode = returnparentNode.substring(0,
				returnparentNode.length - 1);

	userObj.name = returnValName;
	userObj.id = returnValId;
	userObj.user_name = returnCode;
	userObj.returnparentNode = returnparentNode;
	if (flag && returnValName != "") {
		obj.returnValue = userObj;
	} else {
		obj.returnValue = false;
	}

	returnFunction(userObj, nodes);
}

function showDetp(nodes,deptId){
	if('' == deptId) return;
	deptId = deptId.split(",");
	var isFarstFalg = true;

	/*根据指定节点的orgid(即为参数中的deptId[0])，展开它的所有父亲节点包括它自己*/
	for (var i = 0; i < nodes.length; i++) {
		 if(deptId[0] == nodes[i].org_id){
			 nodes[i].open = isFarstFalg;
	         if(!nodes[i].parent_id) return;
			 deptId[0] = nodes[i].parent_id;
			 isFarstFalg =true;
			 i=-1;
		 }
	}
	if(!isFarstFalg){
		for (var i = 0; i < nodes.length; i++) {
			 if(deptId[1] == nodes[i].org_id){
				 nodes[i].open = isFarstFalg;
		         if(!nodes[i].parent_id) return;
				 deptId[1] = nodes[i].parent_id;
				 isFarstFalg =true;
				 i=-1;
			 }
		}
	}
}

function showCiketNode(nodes,type,selectedIds,isNotInit,ztree){
	this.checkNode = function(node,ztree,checked){
		if(ztree){
			ztree.checkNode(node,checked);
		}else{
			node.checked = checked;
		}
	}
	
	if (isNotInit) {
		for ( var i = 0; i < nodes.length; i++) {
			nodes[i].open = true;
			ztree.expandNode(nodes[i],true,false);
			var paraentNode = nodes[i].getParentNode();
			while (null != paraentNode) {
				ztree.expandNode(paraentNode,true,false);
				if (paraentNode.open) {
					break;
				}
				paraentNode.open = true;
				paraentNode = paraentNode.getParentNode();
			}
		}
		return;
	}
	if (selectedIds != null && selectedIds != '') {
		selectedIds = selectedIds.split(",");
		for ( var i = 0; i < nodes.length; i++) {
			// 返选
			
			for ( var j = 0; j < selectedIds.length; j++) {
				switch (type) {
				case 'person'://itemtype
					if (selectedIds[j] == nodes[i].user_id) {
						this.checkNode(nodes[i],ztree,true);
					} 
		            break;
				case 'dept'://org_id
					if (selectedIds[j] == nodes[i].org_id) {
						this.checkNode(nodes[i],ztree,true);
					}
		            break;
				case 'unit'://org_id
					if (selectedIds[j] == nodes[i].org_id) {
						this.checkNode(nodes[i],ztree,true);
					}
					break;
				case 'FILE_ADDRESS' : 
					if(selectedIds[j] == nodes[i].f_storage_urlname 
							||selectedIds[j] == nodes[i].f_storage_id){
						this.checkNode(nodes[i],ztree,true);
					}
					break;
				case 'FILE_TYPE' : 
					if(selectedIds[j] == nodes[i].f_type_parentname 
							|| selectedIds[j] == nodes[i].f_type_id){
						this.checkNode(nodes[i],ztree,true);
					}
					break;
				default:
				}
				if (nodes[i].checked) {
					var parent_id = nodes[i].parent_id;
					var itemId="";
					for ( var s = 0; s < nodes.length; s++) {
						switch (type) {
						case 'person':// itemtype
							itemId = nodes[s].item_id;
							break;
						case 'dept':// org_id
							itemId = nodes[s].org_id;
							break;
						case 'unit':// org_id
							itemId = nodes[s].org_id;
							break;
						default:
						}
						if (parent_id == itemId) {
							parent_id = nodes[s].parent_id;
							if (nodes[s].open) {
								break;
							}
							nodes[s].open = true;
							s = -1;
						}
					}
					nodes[i].open = true;
					break;
				}
			}
		}
	}
}


/**
 * 该树为左右结构树
 */
(function($) {
	$.z_tree_leftRigth = function() {
		this.selectNode = new Array();
		this.treeID = "z_tree";
		this.zTreeObject = new Array();
		this.deleteNode = new Array();
		var THIS = this;
		function setBusinessTreeValue(){
			
		}
		this.initTree = function(p) {
			p.item_id = p.item_id?p.item_id:'item_id';
			p.parent_id = p.parent_id?p.parent_id:'parent_id';
			//p.treetypestr = p.treetypestr ? p.treetypestr : "checkbox"; modify by shuqi.liu  2013.6.13 此处将this代替p,从初始化处取值，默认checkbox。
			p.treetypestr = this.treetypestr ? this.treetypestr : "checkbox";
			var setting = {
					view : {
						selectedMulti : false
					},
					data : {
						simpleData : { // 简单json类型
							enable : true,
							idKey : p.item_id,
							pIdKey : p.parent_id,
							rootPId : 0
						}
					},
					check : {
						enable : true,
						chkStyle : p.treetypestr,
						chkboxType : {
							"Y" : "s",
							"N" : "s"
						},
						radioType : "all"
					},
					callback: {
					    onClick: zTreeOnClick
					}
				};
			var treeObjectMethod = getTreeType(p);
			var span = {
					url : window.top.getContextPath()+'/pubtree',
					success : function(ss) {
						var nodes=null;
						if(json.returnValue !='none') {
							nodes = json.returnValue;
							if(!p.selectedIds || ''==p.selectedIds || null ==p.selectedIds){
								showDetp(nodes,p.deptId?p.deptId:json.orgId);
							} else{
								showCiketNode(nodes,p.isType ? p.isType : 'person',p.selectedIds);
							}
					    } else{
							nodes =[];
						}
						
						var ztreeNew = window.top.$.fn.zTree.init(window.top.$("#treeDemo"+ p.treeID), setting,nodes)
						ztreeNew.isType = p.isType ? p.isType : 'person';
						ztreeNew.valueKey =  p.valueKey;
						ztreeNew.leftHeaderText = p.leftHeaderText;
						THIS.zTreeObject.push(ztreeNew);
						setGroupTreeVal(THIS.NEWTREE,THIS.zTreeObject);
						window.top.$("#tree_mid_but_right").click();
					},
					data : treeObjectMethod[2],
					classID : treeObjectMethod[1],
					method : treeObjectMethod[0]
			}
				ajaxTools(span);
		}
		
		this.initTree2 = function(p){
			//Calls the Z.tree function
			var setting = {
					view : {
						selectedMulti : false
					},
					data : {
						simpleData : { // 简单json类型
							enable : true,
							idKey : "org_id",
							pIdKey : 'parent_id',
							rootPId : 0
						}
					},
					callback: {
						onCheck: function(){
							groupSetBusinessTreeValue(THIS.NEWTREE,THIS.zTreeObject);
							window.top.$("#tree_mid_but_right").click();
						},
					    onClick: function(event, treeId, treeNode){
					    	zTreeOnClick(event, treeId, treeNode);
					    	groupSetBusinessTreeValue(THIS.NEWTREE,THIS.zTreeObject);
							window.top.$("#tree_mid_but_right").click();
					    }
					},
					check : {
						enable : true,
						chkStyle : 'checkbox',
						chkboxType : {
							"Y" : "s",
							"N" : "s"
						},
						radioType : "all"
					}
				};
			var span = {
					url : window.top.getContextPath()+'/pubtree',
					success : function(ss) {
						var nodes=null;
						if(json.returnValue.nodes !=null) {
							nodes = json.returnValue.nodes;
							showCiketNode(nodes,"dept",json.returnValue.selectedIds)
					    } else {
							nodes =[];
						}
						THIS.NEWTREE = window.top.$.fn.zTree.init(window.top.$("#treeDemo"+ p.treeID), setting,nodes);
						THIS.NEWTREE.TYPE =  p.type;
						setGroupTreeVal(THIS.NEWTREE,THIS.zTreeObject);
					},
					data : '{"type":"'+p.type+'"}',
					classID : 'find',
					method : 'getTree2JsonValue'
			}
				ajaxTools(span);
		}
		
		this.init = function() {
			var lock = new $.lockDiv();
			lock.init();
			// 树布局
			var root = createDiv("tree_box_opt" + this.treeID, "tree_box_opt");
			var wid = window.top;
			if (!this.treeID) {
				alert("this docmunt is null!!")
			} else {
				$(window.top.document.body).append($(root));
			}
			var title = createDiv("tree_box_opt_title" + this.treeID, "tree_box_opt_title");
			$(root).append($(title));
			var titleImg = createDiv("tree_box_opt_left_img" + this.treeID, "tree_box_opt_left_img");
			$(title).append($(titleImg));
			var titelText = createDiv("tree_box_opt_left_text" + this.treeID, "tree_box_opt_left_text");
			$(title).append($(titelText));
			$(titelText).html(this.titelText);
			var close = createDiv("_tree_div_title_close" + this.treeID, "_tree_div_title_close");
			$(title).append($(close));
			var left = createDiv("tree_box_left" + this.treeID, "tree_box_left");
			$(root).append($(left));
			var treeBox = createDiv("tree_box" + this.treeID, "tree_box");
			$(left).append($(treeBox));

			if (this.isShowSeacher) {
				var seacher = createDiv("seacher_box" + this.treeID, "seacher_box");
				$(treeBox).append($(seacher));
				var seachterInput =window.top.document.createElement("input");
				$(seachterInput).addClass("_z_tree_seachter_input")
				$(seacher).append($(seachterInput));
				var butseacht = window.top.document.createElement("input");
				$(butseacht).attr("type", "button");
				$(butseacht).val('搜索');
				$(seacher).append($(butseacht));
				$(butseacht).addClass("_z_tree_seachter_input_but");
				$(seachterInput).addClass("tree_box_mid_in");
				
				$(seachterInput).hover(function() {
					if(""==$(seachterInput).val()) {
						$(seachterInput).removeClass();
						$(seachterInput).addClass("tree_box_mid_in");
					} else{
						$(seachterInput).removeClass();
					}
					$(seachterInput).addClass("_z_tree_seachter_input")
				});
				
				$(seachterInput).click(function() {
					if(""==$(seachterInput).val()) {
						$(seachterInput).removeClass();
						$(seachterInput).addClass("tree_box_mid_over");
					} else{
						$(seachterInput).removeClass();
					}
					$(seachterInput).addClass("_z_tree_seachter_input")
				});
				
				$(seachterInput).keyup(function(event) {
					if(""==$(seachterInput).val()) {
						$(seachterInput).removeClass();
						$(seachterInput).addClass("tree_box_mid_over");
					} else{
						$(seachterInput).removeClass();
					}
					$(seachterInput).addClass("_z_tree_seachter_input");
					   if (event.keyCode=="13"){
						   $(butseacht).click()
					   }
				});
				
				var sechterFalg = true;
				$(butseacht).click(
						function() {
							$(seachterInput).removeClass();
							$(seachterInput).addClass("_z_tree_seachter_input")
							var dd = window.top.$(".tree_left_body:visible");
							$.each(THIS.zTreeObject, function(key, val) {
								if(sechterFalg){
									val.expandAll(true);
								}
								z_tree_searchTree(val, $(seachterInput).val(),"treeDemo" + THIS.treeID + key);
							});
							sechterFalg =false;
							window.top.$(".tree_left_body").hide();
							dd.show();
				});
			}
			
			if(THIS.showType.z_S_Depart1User2) {
				this.treeList = this.treeList.reverse();
			}
			
			$.each(this.treeList, function(key, val) {
				var leftHeader = createDiv("tree_left_title" + this.treeID + key, "tree_left_title");
				$(leftHeader).html(val.leftHeaderText);
				$(treeBox).append($(leftHeader));
				var leftbody = createDiv("tree_left_body" + THIS.treeID + key, "tree_left_body");
				$(leftbody).append("<ul id='treeDemo" + THIS.treeID + key + "' class='ztree'></ul>")
				$(treeBox).append($(leftbody));
				val.treeID = THIS.treeID + key;
				if(val.isGroup){
					THIS.initTree2(val);
				}else
				THIS.initTree(val);
				if (key != 0) {
					$(leftbody).hide();
				};
				
				$(leftHeader).click(function() {
					window.top.$(".tree_left_body").hide();
					$(leftbody).show();
				});
				
				if(THIS.treeList.length > 2){
					var count = THIS.treeList.length -2;
					window.top.$(".tree_left_body").height($(leftbody).height()-$(leftHeader).height()*count);
					window.top.$("#treeDemo" + THIS.treeID + key).height(window.top.$(".tree_left_body").height()-5);
				}
				
			});

			var midBox = createDiv("tree_box_mid" + this.treeID, "tree_box_mid");

			var butR = window.top.document.createElement("input");
			$(butR).attr("type", "button");
			$(butR).val('添加 >>');
			$(butR).addClass("tree_mid_but");
			$(butR).attr("id","tree_mid_but_right")
			$(midBox).append($(butR));
			var butL = window.top.document.createElement("input");
			$(butL).attr("type", "button");
			$(butL).val('<< 取消');
			$(midBox).append($(butL));
			$(butL).addClass("tree_mid_but");
			
			var butRemove = window.top.document.createElement("input");
			$(butRemove).attr("type", "button");
			$(butRemove).val('全部取消');
			$(midBox).append($(butRemove));
			$(butRemove).addClass("tree_mid_but");
			
			$(root).append($(midBox));
			
			if(THIS.isNewCommonUse){
				var butNew = window.top.document.createElement("input");
				$(butNew).attr("type", "button");
				$(butNew).val('配置常用组');
				$(midBox).append($(butNew));
				$(butNew).addClass("tree_mid_but");
				$(butNew).click(function(){
					var groupConfig = new window.top.$.groupConfigTree();
					groupConfig.treeList = THIS.treeList;
					groupConfig.treeID="groupConfig";
					groupConfig.titelText="配置常用组";
					groupConfig.rightHeaderText = THIS.rightHeaderText;
					groupConfig.reload = function(){
						$.each(THIS.treeList, function(key, val){
							if(val.isGroup){
								val.treeID = THIS.treeID + key;
								THIS.initTree2(val);
							}
						});
					}
					groupConfig.init();
				});
			}
			

			// !-- right -->
			var right = createDiv("tree_box_right" + this.treeID, "tree_box_right");
			var rightHeader = createDiv("tree_box_right_text" + this.treeID, "tree_box_right_text");
			$(rightHeader).append(this.rightHeaderText);
			var rightBody = createDiv("tree_box_right_body" + this.treeID, "tree_box_right_body");
			$(root).append($(right));
			$(right).append($(rightHeader));
			$(right).append($(rightBody));
			
			$(butR).click(
				function() {
					THIS.deleteNode = new Array();
					$(rightBody).html("");
					var oldSelect = THIS.selectNode;
					THIS.selectNode = new Array();
					
					$.each(THIS.zTreeObject,function(key, val) {
						var nodes = val.getCheckedNodes(true);
						nodes.valueKey = val.valueKey;
						nodes.isType = val.isType;
						var nodesSelect = new Array();
						nodesSelect.isType = val.isType;
						nodesSelect.valueKey = val.valueKey;
						for (var i = 0, l = nodes.length; i < l; i++) {
							if (!IsSpace(nodes[i].user_id) && val.isType === "person"
										|| !IsSpace(nodes[i].org_id) && val.isType === "dept" || !IsSpace(nodes[i].org_id) && val.isType === "unit") {
								var deletenodes = true;
								if(null != oldSelect[key]){
									for(var s =0;s<oldSelect[key].length;s++){
										if(oldSelect[key][s].item_code == nodes[i].item_code){
											deletenodes = false;
											break;
										}
									}
								}
								
								if(nodes[i].name.indexOf($(seachterInput).val())<0&&deletenodes){
									nodes[i].checked = false;
									val.updateNode(nodes[i]);
									continue;
								}
								
								nodesSelect.push(nodes[i]);
								var li = createDiv("tree_box_right_body_li"+ THIS.treeID+ i+ val.valueKey,"tree_box_right_body_li");
								var str = '';
								
								if (null != nodes[i].getParentNode()) {
										str = nodes[i].getParentNode().name+ "-";
								}
								
								$(li).append(str+ nodes[i].name+ "("+ val.leftHeaderText+ ")");
								$(li).attr("bb", i)
								$(rightBody).append($(li));
								$(rightBody).append("</br>");
								$(li).click(function() {
									if ($(this).attr("class").indexOf("tree_box_right_body_li_click") > -1) {
											$(this).removeClass("tree_box_right_body_li_click");
										} else {$(this).addClass("tree_box_right_body_li_click");
										}
										THIS.deleteNode = new Array();
										var deleteNode = window.top.$(".tree_box_right_body_li_click");
										if (null != deleteNode)
											for (j = 0; j < deleteNode.length; j++) {
												THIS.deleteNode.push(nodes[$(deleteNode[j]).attr("bb")]);
											}
								});
							}
						}
						THIS.selectNode.push(nodesSelect);
					});
				setGroupTreeVal(THIS.NEWTREE,THIS.zTreeObject);
			});
			

			$(butL).click(
				function() {
					// 取消选中
                    var temp = null;
					$.each(THIS.deleteNode,
						function(key, val) {
							val.checked = false;
							
							$.each(THIS.zTreeObject,function(key2, val2) {
								val2.updateNode(val);
							});
							
							$.each(THIS.selectNode, function(key3, val3) {
								temp = new Array();
								temp.isType = val3.isType;
								temp.valueKey = val3.valueKey;
								for(var i = 0, l = val3.length; i < l; i++) {
									if((val.item_code && val.item_code!=val3[i].item_code) || (val.item_id && val.item_id!=val3[i].item_id)){
										temp.push(val3[i]);
									}
								}
								THIS.selectNode[key3]=temp;
							});
						 });
					window.top.$(".tree_box_right_body_li_click").remove();
					THIS.deleteNode = new Array();
					setGroupTreeVal(THIS.NEWTREE,THIS.zTreeObject);
			});
			
			$(butRemove).click(function(){
				THIS.deleteNode = new Array();
				$(rightBody).html("");
				THIS.selectNode = new Array();
				
				$.each(THIS.zTreeObject,function(key, val) {
					val.checkAllNodes(false);
				});
				
				try{THIS.NEWTREE.checkAllNodes(false);
				}catch(error){}
			});
			
			var foot = createDiv("tree_box_foot" + this.treeID, "tree_box_foot");
			$(root).append($(foot));
			var butOk = window.top.document.createElement("input");
			$(butOk).attr("type", "button");
			$(butOk).val('确定');
			$(foot).append($(butOk));
			$(butOk).addClass("_z_tree_edit_clear");
			var butClear = window.top.document.createElement("input");
			$(butClear).attr("type", "button");
			$(butClear).val('取消');
			$(foot).append($(butClear));
			$(butClear).addClass("_z_tree_edit_clear");

			$(butClear).click(function() {
				if(typeof THIS.callbackcancel =="function"){
					THIS.callbackcancel();
				}
				$(root).remove();
				lock.remove();
			});
			
			$(butOk).click(function() {
				var ids = "";
				if(THIS.NEWTREE) {
					var nodes = THIS.NEWTREE.getCheckedNodes(true);
					for(var c = 0; c < nodes.length; c++){
						if(c!=0){
							ids+=",";
						}
						ids+=nodes[c].org_id;
					}
				}
				OKRL(THIS.selectNode, THIS, THIS.returnFunction,ids);
				//add by shuqi.liu  2013-09-14 加入点确定回调函数
				if(typeof THIS.callbackok =="function"){
					THIS.callbackok();
				}
				$(root).remove();
				lock.remove();
			});
			
			$(close).click(function() {
				//add by shuqi.liu 2013-09-14  加入取消关闭回调函数
				if(typeof THIS.callbackcancel =="function"){
					THIS.callbackcancel();
				}
				$(root).remove();
				lock.remove();
			});
		}
	};
	
	var span = {
			url : window.top.getContextPath()+'/pubtree',
			success : function(ss) {
				if(json.returnValue !='none'){
					/*add by tian.xia 为类$.z_tree_leftRigth添加静态属性showType，
					 * 该属性主要用于控制树的个性化展示(针对各个不同的客户) */
					$.extend($.z_tree_leftRigth.prototype, {
						showType : {z_S_Depart1User2:json.returnValue.z_S_Depart1User2}
					});
				}
			},
			data : '{"user":""}',
			classID : 'config',
			method : 'inqueryTreeShowType'
	}
	ajaxTools(span);

	$.extend($.z_tree_leftRigth, {
		treeID : "z_tree"/* 树ID */
	});
	
})(jQuery);


function OKRL(nodes, obj, returnFunction,groupID) {
	var returnObj = '';
	var returnjson = new Object();
	jQuery.each(nodes, function(key, val) {
		var returnValName = "";// 用户姓名
		var returnValId = "";// 用户登录id
		var returnCode = "";// 用户登录名
		var returnparentNode = "";
		var returnValDeptAndUserName = "";// 用户姓名
		var returnOrgNames ="";
		var userObj = new Object();
		for ( var i = 0, l = val.length; i < l; i++) {
			
			if (!IsSpace(val[i].user_id) && val.isType === "person") {
				returnValId += val[i].user_id + ",";
				returnValName += val[i].name + ",";
				returnCode += val[i].item_code + ",";
				
				if (null != val[i].getParentNode() && null != val[i].getParentNode().getParentNode()) {
					var paraentNode = val[i].getParentNode();
					var deptType = val[i].getParentNode().deptType;
					var deptName = val[i].getParentNode().name;
					returnOrgNames +=deptName+",";
					returnparentNode +=deptName+",";
					returnValDeptAndUserName+=val[i].name +"("+val[i].getParentNode().getParentNode().name+"),";
				}else if(null == val[i].getParentNode().getParentNode()){
					var paraentNode = val[i].getParentNode();
					var deptType = val[i].getParentNode().deptType;
					var deptName = val[i].getParentNode().name;
					returnOrgNames +=deptName+",";
					returnparentNode +=deptName+",";
					returnValDeptAndUserName+=val[i].name +"("+val[i].getParentNode().name+"),";
				}
			}

			if (!IsSpace(val[i].org_id) && val.isType === "dept") {
					returnValId += val[i].org_id + ",";
					returnValName += val[i].name + ",";
					returnCode += val[i].item_code + ",";
				if (null != val[i].getParentNode()) {
					returnparentNode += val[i].getParentNode().name + ",";
				}
			}
			
			if (!IsSpace(val[i].org_id) && val.isType === "unit") {
				if(val[i].org_level == "2") {
					returnValId += val[i].org_id + ",";
					returnValName += val[i].name + ",";
					returnCode += val[i].item_code + ",";
				}
				if (null != val[i].getParentNode()) {
					returnparentNode += val[i].getParentNode().name + ",";
				}
			}
		}
		if (returnValId.length > 0)
			returnValId = returnValId.substring(0, returnValId.length - 1);
		if (returnValName.length > 0)
			returnValName = returnValName
					.substring(0, returnValName.length - 1);
		if (returnCode.length > 0)
			returnCode = returnCode.substring(0, returnCode.length - 1);
		if (returnparentNode.length > 0)
			returnparentNode = returnparentNode.substring(0,
					returnparentNode.length - 1);
		userObj.name = returnValName;
		userObj.id = returnValId;
		userObj.user_name = returnCode;
		userObj.returnparentNode = returnparentNode;
		userObj.returnValDeptAndUserName = returnValDeptAndUserName;
		userObj.returnOrgNames = returnOrgNames;
		returnjson[val.valueKey] = userObj;
	});
	returnjson.groupid=groupID;
	returnFunction(returnjson, nodes);
}

function groupSetBusinessTreeValue(newTree,treeList){
	if(!newTree || !treeList) return;
	var newNodes = newTree.getCheckedNodes(true);
	var Allnodes = newTree.getNodesByParam("parent_id","1",null);
	jQuery.each(treeList, function(key, val) {
		   var type = getIDName(val.isType);
		   jQuery.each(Allnodes, function(nKey, nVal) {
			    if (nVal.ids != null) {
				var ids = nVal.ids.split(",");
				for ( var i = 0; i < ids.length; i++) {
					var nodesT = val.getNodesByParam(type, ids[i], null);
					for ( var j = 0; j < nodesT.length; j++) {
						val.checkNode(nodesT[j], false);
					}
				}
			}
			   
		   });
		});
	jQuery.each(treeList, function(key, val) {
		if(!newTree || !treeList) return;
	   var type = getIDName(val.isType);
	   jQuery.each(newNodes, function(nKey, nVal) {
		   if(nVal.ids !=null){
			   var ids = nVal.ids.split(",");
			   for(var i = 0;i<ids.length;i++){
				   var nodesT = val.getNodesByParam(type,ids[i],null);
				   for(var j = 0;j<nodesT.length;j++){
						val.checkNode(nodesT[j],true);
		    	   }
			   }
		   }
	   });
	   
	});
}

function setGroupTreeVal(newTree, treeList) {
	if(!newTree || !treeList) return;
	var Allnodes = newTree.getNodesByParam("parent_id", "1", null);
	jQuery.each(Allnodes,
			function(nKey, nVal) {
				if (nVal.ids != null) {
					var ids = nVal.ids.split(",");
					var flag = false;
					for ( var i = 0; i < ids.length; i++) {
						flag = false;
						var noneNode = 0;
						for ( var j = 0; j < treeList.length; j++) {
							var type = getIDName(treeList[j].isType);
							var nodes = treeList[j].getNodesByParam(type,ids[i], null);
							if (nodes.length > 0 && nodes[0].checked) {
								flag = true;
								break;
							}
							if(nodes.length == 0){
								noneNode ++;
							}
						}
						if(noneNode == treeList.length){
							flag = true;
						}
						if (!flag)
							break;
					}
					if(nVal.ids != ''){
						newTree.checkNode(nVal, flag);
					}
					
				}
			});
}

function getIDName(type){
	switch (type) {
	case 'person'://itemtype 
		return "user_id";
	case 'dept'://org_id
		return "org_id";
	default:
		return "item_id";
	}
}

function zTreeOnClick(event, treeId, treeNode)  {
	var tree = window.top.jQuery.fn.zTree.getZTreeObj(treeId);
	tree.checkNode(treeNode,!treeNode.checked,true);
};
/**
 * 得到树类型调用方法
 * @param treeType
 * @returns {Array}
 */
function getTreeType(treeProperty){
	var treeType = treeProperty.type
	switch (treeType) {
	//new add hai.huang 选外部单位人员 ------------------------------------------------------
	case 'GRTXL'://个人通讯录
		return ["inqueryTreeGrtxl","config",'{"user":""}'];
	case 'GGTXL'://公共通讯录
		return ["publicinqueryTreeGrtxl","config",'{"user":""}'];
	case 'DWTXL'://单位通讯录
		return ["inqueryTreePerson4Other","config",'{"user":""}'];
	//end ------------------------------------------------------------------------------
	case 'AORG'://机构树 全树
		return ["inqueryTreeOrganization","commontree",'{"user":""}'];
	case 'ADEPT'://部门树 全树
		return ["inqueryTreeDept","commontree",'{"user":""}'];
	case 'AORG4IDS'://机构树 按机构ids查询过滤机构树的记录集 add by hai.huang 2013-7-9
		return ["inqueryTreeOrganization4ids","config",'{"org_ids":"'+treeProperty.org_ids+'"}'];
	case 'APERSON'://人员树 全树
		return ["inqueryTreePerson","commontree",'{"user":""}'];
	case 'AUSER'://人员树 全树  add by shuqi.liu 2013-6-8
		return ["inqueryTreeUser","config",'{"user":"'+treeProperty.user_ids+'","ru_logn":"'+treeProperty.ru_logn+'"}'];
	case 'FILE_ADDRESS' : //档案管理-档案存放位置树(f_org_id:机构id列表,f_dept_id:部门id列表,ids:类型id列表)
		return ["queryFileAddress","config",'{"f_org_id":"'+treeProperty.f_org_id
		        +',","f_dept_id":"'+treeProperty.f_dept_id
		        +'","ids":"'+treeProperty.ids+'"}'];
	case 'FILE_TYPE' : //档案管理-档案类型(f_org_id:机构id列表,f_dept_id:部门id列表,ids:类型id列表)
		return ["queryFileType","config",'{"f_org_id":"'+treeProperty.f_org_id
		        +',","f_dept_id":"'+treeProperty.f_dept_id
		        +'","ids":"'+treeProperty.ids+'"}'];
	case 'KBM_TYPE' : //知识分类(f_org_id:机构id列表,f_dept_id:部门id列表,ids:类型id列表)
        return ["queryKbmDocTypeTree" ,"config" ,'{"k_unit":"' +treeProperty.f_org_id+ '"}'];
	case 'PSDATA_TYPE' : //个人资料分类(f_org_id:机构id列表,f_dept_id:部门id列表,ids:类型id列表)
        return ["queryPsdataTypeTree" ,"config" ,'{"p_unit":"' +treeProperty.f_org_id+ '","user_id":"' +treeProperty.user_id+ '"}'];
	case 'DATA_TYPE' : //资料分类(f_org_id:机构id列表,f_dept_id:部门id列表,ids:类型id列表)
        return ["queryDataTypeTree" ,"config" ,'{"d_data_unit_id":"' +treeProperty.f_org_id+'","typeis":"' +treeProperty.typeis+  '"}'];
	case 'MEET_PERSON' : //会议人员树
        return ["inqueryTreeMeetingPerson" ,"config" ,'{"userids":"' +treeProperty.userids+  '"}'];
	case 'MEET_AORG'://会议机构树
		return ["inqueryTreeMeetingOrganization","commontree",'{"user":"'+treeProperty.unitids+'"}'];
	case 'inqueryTreeDictDataByDictType'://data dictionary tree [shujuzidian] CommonTreeDaoImpl.inqueryTreeDictDataByDictType
		return ["inqueryTreeDictDataByDictType","commontree",'{"user":"","dictCode":"'+treeProperty.dictCode+'"}'];
	case 'queryParentFileTypeForUpdateFileType':
		//filetype tree for filetypeinfo.JSP[TreeBusinessDaoImpl.queryParentFileTypeForUpdateFileType]
		var requestMap = "{";
		requestMap+="'user':''";
		requestMap+=",'moveLevel':'"+treeProperty.moveLevel+"'";
		requestMap+=",'thisFileType':'"+treeProperty.thisFileType+"'";
		requestMap+=",'orgId':'"+treeProperty.orgId+"'";
		requestMap+="}";
		return ["queryParentFileTypeForUpdateFileType","config",requestMap];
	case 'inqueryTreeFileTreeInOneProgramPage':
		//filetype tree for filetypeinfo.JSP[TreeBusinessDaoImpl.queryParentFileTypeForUpdateFileType]
		var requestMap = "{";
		requestMap+="'user':''";
		requestMap+=",'programId':'"+treeProperty.programId+"'";
		requestMap+=",'orgId':'"+treeProperty.orgId+"'";
		requestMap+="}";
		return ["inqueryTreeFileTreeInOneProgramPage","config",requestMap];
	case 'queryGwcsOrgTree':	//查询公文传输地址簿树  	add by 陈建华
		//filetype tree for splitunitadd.jsp[TreeBusinessDaoImpl.queryGwcsOrgTree]
		var requestMap = "{";
		requestMap+="'user':''";
		//requestMap+=",'orgId':'"+treeProperty.orgId+"'";
		requestMap+="}";
		return ["queryGwcsOrgTree","config",requestMap];
	default:
		return ["getResourcesConfigTree","commontree",treeType];//默认权限树
	}
}


