$(document).ready(function() {
	parent.tabsTool.opentab = tabsImpl.opentab;
	parent.tabsTool.closetab = tabsImpl.closetab;
	
	
});

var index = 0;

var tabsImpl = {
	opentab : function(label, url) {
		addTab(label, url);
	},

	closetab : function(id) {
		closeTab(id);
	},

	isOpen : function(label) {
		return isOpenTab(label);
	}
};

function addTab(label, url){
	if(isOpenTab(label)){
		activTab(label);
		return;
	}
	index++;
	var iframe_height = ($(document).height()) - 30;
	$('#tt').tabs('add', {
		title : label,
		content : "<div style='padding:0px'><iframe id='"
			+ ('Tab' + index + "Frame")
			+ "' name='"
			+ ('Tab' + index + "Frame")
			+ "' src='"
			+ url
			+ "' style='overflow:visible;' scrolling='yes' frameborder='no' width='100%' height='"
			+ iframe_height + "'></iframe></div>",		
		closable : true
	});
}

function closeTab(label) {
	var tab = $('#tt').tabs('getSelected');
	if (tab) {
		var index = $('#tt').tabs('getTabIndex', tab);
		$('#tt').tabs('close', index);
	}
}

//是否已经存在tab
function isOpenTab(label) {
	return $('#tt').tabs().find("div > div > ul > li > a > span:contains('" + label + "')").html();
}

function activTab(label){
	$('#tt').tabs('select', label);	
}