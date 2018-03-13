function z_tree_searchTree(treeObj, lastName, treeid) {
	var nodes = treeObj.transformToArray(treeObj.getNodes());
	$("ul[id^=" + treeid + "_", window.top.document).hide();
	for (i = 0; i < nodes.length; i++) {
		// 首先隐藏
		if (nodes[i].name.indexOf(lastName) >= 0) {
			$("#" + nodes[i].tId, window.top.document).parents().show();
			$("#" + nodes[i].tId, window.top.document).show();
		} else {
			$("#" + nodes[i].tId, window.top.document).hide();
		}
	}
}

(function($) {

	$.tree_config = function() {
		var  THIS = this;
		
		function beforeClick(treeId, treeNode) {
		}

		var log, className = "dark";
		// 用于捕获异步加载之前的事件回调函数，zTree 根据返回值确定是否允许进行异步加载
		function beforeAsync(treeId, treeNode) {

		}
		/*
		 * 用于捕获异步加载出现异常错误的事件回调函数 如果设置了 setting.callback.beforeAsync 方法，且返回
		 * false，将无法触发 onAsyncSuccess / onAsyncError 事件回调函数。
		 */
		function onAsyncError(event, treeId, treeNode, XMLHttpRequest,
				textStatus, errorThrown) {

		}
		/*
		 * 用于捕获异步加载正常结束的事件回调函数 如果设置了 setting.callback.beforeAsync 方法，且返回
		 * false，将无法触发 onAsyncSuccess / onAsyncError 事件回调函数。
		 */
		function onAsyncSuccess(event, treeId, treeNode, msg) {
			if (msg == "") {
				THIS.NODES[treeId] = [];
			} else {
				THIS.NODES[treeId] = eval(msg);
				for ( var i = 0; i < THIS.NODES[treeId].length; i++) {
					THIS.NODES[treeId][i].open = true;
				}
				window.top.$("#tree_mid_but_right").click();
			}
		}

		this.returnFunction = function() {
		}
		this.initTree = function(p) {
			p.item_id = p.item_id?p.item_id:'item_id';
			p.parent_id = p.parent_id?p.parent_id:'parent_id';
			p.treetypestr = p.treetypestr ? p.treetypestr : "checkbox";
			var setting = {
				view : {
					selectedMulti : false
				/*
				 * 1、设置为 true时，按下 Ctrl 键可以选中多个节点 2、设置为 true / false 都不影响按下 Ctrl
				 * 键可以让已选中的节点取消选中状态（ 取消选中状态可以参考 setting.view.autoCancelSelected ）
				 */
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
				/*
				 * 规则说明： Y 属性定义 CheckBox 被勾选后的情况； N 属性定义 CheckBox 取消勾选后的情况； "p"
				 * 表示操作会影响父级节点； "s" 表明操作会影响子级节点。
				 */
				},
				async : {
					enable : true,
					url : p.url,
					autoParam : p.autoParam,
					otherParam : p.otherParam
				},
				callback : {
					beforeClick : beforeClick,
					beforeAsync : beforeAsync,
					onAsyncError : onAsyncError,
					onAsyncSuccess : onAsyncSuccess
				}
			};
			var wid = window.top;
			if (wid != null) {
				var oo = window.top.superZtree("treeDemo" + p.treeID, setting);
				oo.leftHeaderText = p.leftHeaderText;
				oo.valueKey = p.valueKey;
				oo.isType = p.isType ? p.isType : 'person';
				oo.item_id = p.item_id;
				oo.parent_id = p.parent_id;
				oo.treetypestr = p.treetypestr;
				oo.autoParam =  p.autoParam,
				oo.otherParam = p.otherParam
				this.zTreeObject.push(oo);
			} else {
				var oo = $.fn.zTree.init($("treeDemo" + p.treeID), setting);
				oo.leftHeaderText = p.leftHeaderText;
				oo.valueKey = p.valueKey;
				oo.isType = p.isType;
				oo.item_id = p.item_id;
				oo.parent_id = p.parent_id;
				oo.treetypestr = p.treetypestr;
				oo.autoParam =  p.autoParam,
				oo.otherParam = p.otherParam
				this.zTreeObject.push(oo);
			}
		}
		this.init = function() {
			var lock = new $.lockDiv();
			lock.init();
			//布局开始
		    //头
			//左边
			//中间
			//右边
			//底部
			
	};
	$.extend($.z_tree_leftRigth, {
		treeID : "z_tree"/* 树ID */
	});
})(jQuery);


