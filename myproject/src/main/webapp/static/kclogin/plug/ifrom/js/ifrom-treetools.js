/**
 * 沈联成 2012-10月16 Added
 * 本javascript的解决大数据量的问题
 * 生成树的JSON OBJECT
 */

function clickTreeNodeToJson(nodes,treeType,selectObj){
	var listObj = '';
	var font ='';
	for(var i = 0;i<nodes.length;i++){
		
		var paraentNode = nodes[i].getParentNode();
		while(paraentNode!=null){
			if(listObj.indexOf(paraentNode.org_id)>-1){
					break;
			}
			if(selectObj.indexOf(paraentNode.org_id)==-1){
				if(listObj==''){
					listObj =paraentNode.org_id;
				}
				else{
					listObj +=','+paraentNode.org_id;
				}
			}
			paraentNode = paraentNode.getParentNode();
		}
	}
	return listObj;	
}
 
