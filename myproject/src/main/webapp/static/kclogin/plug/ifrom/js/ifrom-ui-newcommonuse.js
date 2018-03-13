/**
 * Remark:        新增常用联系人/部门
 * Author:        沈联成
 * Company：      湖南科创
 * Added time：   2012.10.18
 * Modify time:   none
 * Modify remark: none
 * Version：      1.0
 *-------------------Function Remark-------------------------
 * Function Remark:   Setting configuration function,
                      the $.groupConfigTree() is object,Usage is "new Object"
 * Object Name:       $.groupConfigTree()
 * Input parameter:   this.param 
 *                    parameter list:
 *                    treeID:
 *                    titelText:
 * Output parameter:  this
 */

(function($) {
	$.groupConfigTree = function() {
		var THIS = this;
		this.selectNode = new Array();
		this.treeID = "z_tree";
		this.zTreeObject = new Array();
		this.deleteNode = new Array();
		/**
		 *Initialization tree,Create a tree on the like "Z.tree"
		 *this function is private
		 */
		this.initTree = function(p){
			//Calls the Z.tree function
			p.item_id = p.item_id?p.item_id:'item_id';
			p.parent_id = p.parent_id?p.parent_id:'parent_id';
			p.treetypestr = p.treetypestr ? p.treetypestr : "checkbox";
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
			var span = {
					url : window.top.getContextPath()+'/pubtree',
					success : function(ss) {
						var nodes=null;
						if(json.returnValue !='none')
					    {
							nodes = json.returnValue;
							showDetp(nodes,p.deptId?p.deptId:json.orgId);
					    }
						else{
							nodes =[];
						}
						var ztreeNew = window.top.$.fn.zTree.init(window.top.$("#treeDemo"+ p.treeID), setting,nodes)
						ztreeNew.isType = p.isType ? p.isType : 'person';
						ztreeNew.valueKey =  p.valueKey;
						ztreeNew.leftHeaderText = p.leftHeaderText;
						THIS.zTreeObject.push(ztreeNew);
						window.top.$("#tree_mid_but_right"+this.treeID).click();
						
					},
					
					//data : p.type,
					//classID : getTreeType? getTreeType(p.type)[1] : 'commontree',
					//method : getTreeType? getTreeType(p.type)[0] : 'getResourcesConfigTree'
					//按项目修改
					data : getTreeType? getTreeType(p)[2] : p.type,
					classID : getTreeType? getTreeType(p)[1] : 'commontree',
					method : getTreeType? getTreeType(p)[0] : 'getResourcesConfigTree'

				}
				ajaxTools(span);
		}
		var dbclickF = function(){
			var nodes = THIS.NEWTREE.getSelectedNodes();
			if (nodes[0].org_id == 1) {
				return false;
			}
			THIS.NEWTREE.editName(nodes[0]);
		}
		var checkvalue = function(){
			THIS.RIGHTBODY.html("");
			onclickNode(THIS.NEWTREE,THIS.zTreeObject);
			THIS.BUTRIGHT.click();
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
						onClick: checkvalue,
						onDblClick: dbclickF
						
					}
				};
			var span = {
					url : window.top.getContextPath()+'/pubtree',
					success : function(ss) {
						var nodes=null;
						if(json.returnValue.nodes !=null)
					    {
							nodes = json.returnValue.nodes;
							showCiketNode(nodes,"dept",json.returnValue.selectedIds)
					    }
						else{
							nodes =[{org_id:"1",name:"常用分组"}];
						}
						THIS.NEWTREE = window.top.$.fn.zTree.init(window.top.$("#treeDemo"+ p.treeID), setting,nodes);
						THIS.NEWTREE.TYPE =  p.type;
						THIS.NEWTREE.NOTICETYPE =  p.noticetype;
						THIS.NEWTREE.reload = THIS.reload;
					},
					data : '{"type":"'+p.type+'","noticetype":"'+p.noticetype+'"}',
					classID : 'find',
					method : 'getTree2JsonValue'
				}
				window.top.ajaxTools(span);
		}
		
		/**
		 *Initialization groupConfigTree
		 *Call instructions:new object.init 
		 */
		this.init = function(){
			//Visual layout start
			
			// lock div
			var lock = new $.lockDiv();
			lock.zindex = window.top.$(".tree_box_opt").css("z-index")+1;
			lock.init();
			
			//root div
			var root = createDiv("tree_box_opt" + this.treeID, "tree_box_opt");
			$(root).css("z-index",window.top.$(".tree_box_opt").css("z-index")+2);
			$(root).addClass("tree_box_3_opt");
			//root append to show area
			$(window.top.document.body).append($(root));
			
			// Initialization root title area
			var title = createDiv("tree_box_opt_title" + this.treeID,"tree_box_opt_title");
	        $(root).append($(title));
	        var titleImg = createDiv("tree_box_opt_left_img" + this.treeID,"tree_box_opt_left_img");
	        $(title).append($(titleImg));
	        var titelText = createDiv("tree_box_opt_left_text" + this.treeID,"tree_box_opt_left_text");
	        $(title).append($(titelText));
	        $(titelText).html(this.titelText);
	        var close = createDiv("_tree_div_title_close" + this.treeID,"_tree_div_title_close");
	        $(title).append($(close));
	        
	        //group tree
	        var groupTree = createDiv("tree_box_left_group" + this.treeID, "tree_box_left");
			$(root).append($(groupTree));
			
			var groupBox = createDiv("tree_box_group" + this.treeID, "tree_box");
			$(groupTree).append($(groupBox));
			
			var operate = createDiv("tree_box_operate" + this.treeID, "tree_box_operate");
			$(groupBox).append($(operate));
			var butAdd = window.top.document.createElement("input");
			$(butAdd).attr("type", "button");
			$(butAdd).val('新增');
			var butDel = window.top.document.createElement("input");
			$(butDel).attr("type", "button");
			$(butDel).addClass("_z_tree_edit_clear");
			$(butAdd).addClass("_z_tree_edit_clear");
			$(butDel).val('删除');
			$(operate).append($(butAdd));
			$(operate).append($(butDel));
			$.each(this.treeList, function(key, val) {
				if(val.isGroup){
					var leftHeader = createDiv("tree_left_title" + this.treeID
							+ key, "tree_left_title tree_left_title_2");
					$(leftHeader).html(val.leftHeaderText);
					$(groupBox).append($(leftHeader));
					var leftbody = createDiv("tree_left_body" + THIS.treeID + key,
							"tree_left_body tree_body2");
					$(leftbody).append(
							"<ul id='treeDemo" + THIS.treeID + key
									+ "' class='ztree'></ul>");
					$(groupBox).append($(leftbody));
					val.treeID = THIS.treeID + key;
					THIS.initTree2(val);
					$(leftbody).height($(leftbody).height()+$(leftHeader).height());
					window.top.$("#treeDemo" + THIS.treeID + key).height(window.top.$(leftbody).height()-5);
				}
				
			});
	        //left
	        var left = createDiv("tree_box_left" + this.treeID, "tree_box_left");
			$(root).append($(left));
			var treeBox = createDiv("tree_box" + this.treeID, "tree_box");
			$(left).append($(treeBox));
			
            //seacher
			/*
			var seacher = createDiv("seacher_box" + this.treeID, "seacher_box");
			$(treeBox).append($(seacher));
			var seachterInput = window.top.document.createElement("input");
			$(seachterInput).addClass("_z_tree_seachter_input")
			$(seacher).append($(seachterInput));
			var butseacht = window.top.document.createElement("input");
			$(butseacht).attr("type", "button");
			$(seacher).append($(butseacht));
			$(butseacht).addClass("_z_tree_seachter_input_but");
			$(seachterInput).addClass("tree_box_mid_in");*/
			
			var seacher = createDiv("seacher_box" + this.treeID,"seacher_box");
			$(treeBox).append($(seacher));
			
			var list_search_kuang = createDiv("_z_tree_seachter_input_div" + this.treeID,"_z_tree_seachter_input_div");
			$(seacher).append($(list_search_kuang));
			
			var seachterInput = window.top.document.createElement("input");
			$(seachterInput).addClass("_z_tree_seachter_input")
			$(list_search_kuang).append($(seachterInput));
			
			
			var butseacht = createDiv("_z_tree_seachter_input_but" + this.treeID,"_z_tree_seachter_input_but");
			$(butseacht).html("<a href='#'></a>");
			$(seacher).append($(butseacht));
			
			/*
			$(seachterInput).hover(function() {
				if ("" == $(seachterInput).val()) {
					$(seachterInput).removeClass();
					$(seachterInput).addClass("tree_box_mid_in");
				} else {
					$(seachterInput).removeClass();
				}
				$(seachterInput).addClass("_z_tree_seachter_input")
			});
			$(seachterInput).click(function() {
				if ("" == $(seachterInput).val()) {
					$(seachterInput).removeClass();
					$(seachterInput).addClass("tree_box_mid_over");
				} else {
					$(seachterInput).removeClass();
				}
				$(seachterInput).addClass("_z_tree_seachter_input")
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
			});*/
			
			var sechterFalg = true;
			$(butseacht).click(
					function() {
						$(seachterInput).removeClass();
						$(seachterInput).addClass("_z_tree_seachter_input")
						var dd = window.top.$(".tree_body:visible");
						$.each(THIS.zTreeObject, function(key, val) {

							if (sechterFalg) {
								val.expandAll(true);
							}
							z_tree_searchTree(val, $(seachterInput).val(),
									"treeDemo" + THIS.treeID + key);
						});
						sechterFalg = false;
						window.top.$(".tree_body").hide();
						dd.show();
					});
			$.each(this.treeList, function(key, val) {
				if(!val.isGroup){
					var leftHeader = createDiv("tree_left_title" + this.treeID
							+ key, "tree_left_title tree_left_title10");
					$(leftHeader).html(val.leftHeaderText);
					$(treeBox).append($(leftHeader));
					var leftbody = createDiv("tree_left_body" + THIS.treeID + key,
							"tree_left_body tree_body");
					$(leftbody).append(
							"<ul id='treeDemo" + THIS.treeID + key
									+ "' class='ztree'></ul>")
					$(treeBox).append($(leftbody));
					val.treeID = THIS.treeID + key;
					THIS.initTree(val);
					if (key != 0) {
						$(leftbody).hide();
					}
					;
					$(leftHeader).click(function() {
						window.top.$(".tree_body").hide();
						$(leftbody).show();
					});
					if(THIS.treeList.length > 3){
						count = THIS.treeList.length-3;
						window.top.$(".tree_left_body").height($(leftbody).height()-$(leftHeader).height()*count);
						window.top.$("#treeDemo" + THIS.treeID + key).height(window.top.$(".tree_left_body").height()-5);
					}
					
				}
				
			});

			
			//button
			var midBox = createDiv("tree_box_mid" + this.treeID, "tree_box_mid");

			var butR = window.top.document.createElement("input");
			$(butR).attr("type", "button");
			$(butR).val('添加 >>');
			THIS.BUTRIGHT = $(butR);
			$(butR).addClass("tree_mid_but");
			$(butR).attr("id","tree_mid_but_right"+this.treeID)
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
	        
			// !-- right -->
			var right = createDiv("tree_box_right" + this.treeID,
					"tree_box_right");
			var rightHeader = createDiv("tree_box_right_text" + this.treeID,
					"tree_box_right_text");
			$(rightHeader).append(this.rightHeaderText);
			var rightBody = createDiv("tree_box_right_body" + this.treeID,
					"tree_box_right_body");
			THIS.RIGHTBODY = $(rightBody);
			$(root).append($(right));
			$(right).append($(rightHeader));
			$(right).append($(rightBody));
			
			var foot = createDiv("tree_box_foot" + this.treeID, "tree_box_foot");
			$(root).append($(foot));
			
			var butClear = createDiv("butClear" + this.treeID,"_z_tree_edit_clear");
			$(butClear).html('取消');
			$(foot).append($(butClear));
			
			var butOk = createDiv("butOk" + this.treeID,"_z_tree_edit_clear");
			$(butOk).html('确定');
			$(foot).append($(butOk));
			/*
			var butOk = window.top.document.createElement("input");
			$(butOk).attr("type", "button");
			$(butOk).val('保存');
			$(foot).append($(butOk));
			$(butOk).addClass("_z_tree_edit_clear");
			var butClear = window.top.document.createElement("input");
			$(butClear).attr("type", "button");
			$(butClear).val('取消');
			$(foot).append($(butClear));
			$(butClear).addClass("_z_tree_edit_clear");*/
	        //Event binding
	        
	        //close event
	        $(close).click(function() {
				$(root).remove();
				lock.remove();
			});
	        $(butClear).click(function() {
				$(root).remove();
				lock.remove();
			});
			$(butOk).click(function() {
				NewTreeSubmit(THIS.NEWTREE,THIS.NEWTREE.TYPE,THIS.NEWTREE.NOTICETYPE);
				$(root).remove();
				lock.remove();
			});
			$(butR).click(
					function() {
						THIS.deleteNode = new Array();
						$(rightBody).html("");
						var oldSelect = THIS.selectNode;
						THIS.selectNode = new Array();
						var nn = THIS.NEWTREE.getSelectedNodes();
						if(nn.length == 0 || nn[0].org_id == 1){
							$.each(THIS.zTreeObject,function(key, val) {
								if(!val.isGroup)
									val.checkAllNodes(false);
							});
							return false;
						}
						$.each(THIS.zTreeObject,function(key, val) {
							var nodes = val.getCheckedNodes(true);
							nodes.valueKey = val.valueKey;
							nodes.isType = val.isType;
							var nodesSelect = new Array();
							nodesSelect.isType = val.isType;
							nodesSelect.valueKey = val.valueKey;
							for ( var i = 0, l = nodes.length; i < l; i++) {
									if (!IsSpace(nodes[i].user_id) && val.isType === "person"
												|| !IsSpace(nodes[i].org_id) && val.isType === "dept" 
													|| !IsSpace(nodes[i].org_id) && val.isType === "unit") {
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
						setNewTreeValue(THIS.NEWTREE,THIS.zTreeObject);
					});

			$(butL).click(function() {
				// 取消选中
				var temp = null;
				$.each(THIS.deleteNode, function(key, val) {
					val.checked = false;
					$.each(THIS.zTreeObject, function(key2, val2) {
						val2.updateNode(val);
					});
					$.each(THIS.selectNode, function(key3, val3) {
						temp = new Array();
						temp.isType = val3.isType;
						temp.valueKey = val3.valueKey;
						for ( var i = 0, l = val3.length; i < l; i++) {
							if (val.item_code != val3[i].item_code) {
								temp.push(val3[i]);
							}
						}
						THIS.selectNode[key3] = temp;
					});
				});
				window.top.$(".tree_box_right_body_li_click").remove();
				THIS.deleteNode = new Array();
				setNewTreeValue(THIS.NEWTREE,THIS.zTreeObject);
			});
			$(butRemove).click(function() {
				THIS.deleteNode = new Array();
				$(rightBody).html("");
				THIS.selectNode = new Array();
				$.each(THIS.zTreeObject,function(key, val) {
					val.checkAllNodes(false);
				});
				setNewTreeValue(THIS.NEWTREE,THIS.zTreeObject);
			});
			var countNew =1;
			$(butAdd).click(function(){
				var d = new Date();
				d = ""+d.getDate()+d.getMonth()+d.getHours()+d.getFullYear()+d.getMinutes()+d.getSeconds()+d.getMilliseconds()
				var idd = d+Math.random()*9;
				var nodes = THIS.NEWTREE.getNodesByParam("org_id", "1", null);
				nodes = THIS.NEWTREE.addNodes(nodes[0],[{org_id:idd,name:"新增分组"+countNew,parent_id:"1",ids:""}]);
				THIS.NEWTREE.editName(nodes[0]);
				countNew++;
				THIS.deleteNode = new Array();
				$(rightBody).html("");
				THIS.selectNode = new Array();
				$.each(THIS.zTreeObject,function(key, val) {
					val.checkAllNodes(false);
				});
			});
			$(butDel).click(function(){
				var nodes = THIS.NEWTREE.getSelectedNodes();
				if(nodes.length == 0){
					alert("请选择要删除的组！");
					return false;
				}
				if(nodes[0].org_id == 1){
					alert("您选中的是顶级节点，请选择组！");
					return false;
				}
				THIS.NEWTREE.removeNode(nodes[0]);
				//alert(nodes)
			});
		}
		
		
	};
	$.extend($.groupConfigTree, {});
})(jQuery);

function NewTreeSubmit(newTree, type,noticetype) {
	var nodes = newTree.transformToArray(newTree.getNodes());
	var listObj = "[";
	
	for(var k = 0;k<nodes.length;k++){
		if(k!=0){
			listObj +=",{"
		}else{
			listObj+="{"
		}
		for ( var key in nodes[k]) {
			if ((typeof (nodes[k][key]) == "string" || typeof (nodes[k][key]) == "Number")
					&& key != "tId" && key != "parentTId") {
				listObj += "'" + key + "':'" + nodes[k][key] + "',";
			}
		}
		if(nodes[k].org_id == 1){
			listObj+="'parent_id':'0','open':'true'}";
		}else
		listObj+="'parent_id':'1','open':'true'}";
	}
	
	listObj+="]";
	if(nodes.length < 2){
		listObj="null";
	}
	var span = {
			url : window.top.getContextPath()+'/pubtree',
			success : function(ss) {
					PubOPT.showTip("aa", "保存成功", 1);
					newTree.reload();
			},
			dataType:"text",
			data : '{"type":"'+type+'","treejson":"'+listObj+'","noticetype":"'+noticetype+'"}',
			classID : 'find',
			method : 'getTreeInsertJsonValue'
		}
		window.top.ajaxTools(span);
}

function  onclickNode(newTree,treeList){
	if(!newTree) return;
	$.each(treeList,function(key, val) {
			if(!val.isGroup){
				val.checkAllNodes(false);
				var nodes = newTree.getSelectedNodes();
				if(nodes.length == 0 || nodes[0].org_id == 1){
					return false;
				}
				var ids = nodes[0].ids;
			    if(ids){
			    	ids = ids.split(",");
			    	for(var i=0;i<ids.length;i++){
			    		var type = getIDName(val.isType)
			    		var nodesT = val.getNodesByParam(type, ids[i], null);
			    		for(var j = 0;j<nodesT.length;j++){
							val.checkNode(nodesT[j]);
			    		}
			    	}
			    }
			}
		});
}

function setNewTreeValue(newTree, treeList) {
	if(!newTree) return;
	var nodes = newTree.getSelectedNodes();
	if (nodes.length == 0 || nodes[0].org_id == 1) {
		return false;
	}
	var ids = "";
	$.each(treeList, function(key, val) {
		if (!val.isGroup) {
			var nodesCT = val.getCheckedNodes(true);
			var type = getIDName(val.isType);
			for ( var i = 0; i < nodesCT.length; i++) {
				if(nodesCT[i][type])
				if (ids == "")
					ids = nodesCT[i][type];
				else
					ids += "," + nodesCT[i][type];
			}
		}
	});
	nodes[0].ids = ids;
}
