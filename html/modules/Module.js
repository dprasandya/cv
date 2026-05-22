

Ext.define('Modules.Module', {
	extend: 'Ext.app.Controller',
	refs: [
		{
			ref: 'viewport',
			selector: 'viewport'
		},
		{
			ref: 'mainNav',
			selector: 'treepanel[action=mainNav]'
		}
	],
	/**
	 * @param panel
	 */
	addAppPanel: function(panel){
		this.getViewport().MainPanel.add(panel);
	},

	/**
	 * @param item
	 */
	addHeaderItem: function(item){
		this.getViewport().Header.add(item);
	},

	/**
	 * @param parentId
	 * @param node
	 * @param index
	 *
	 * Desc: Method to add items to the navigation tree.
	 *
	 */
	addNavigationNodes: function(parentId, node, index){
		var parent;

		if(parentId == 'root' || parentId == null){
			parent = this.getMainNav().getStore().getRootNode();
		}
		else{
			parent = this.getMainNav().getStore().getNodeById(parentId);
		}

		if(parent){
			var firstChildNode = parent.findChildBy(function(node){
				return node.hasChildNodes();
			});

			if(Ext.isArray(node)){
				var nodes = [];
				for(var i = 0; i < node.length; i++){
					Ext.Array.push(nodes, parent.insertBefore(node[i], firstChildNode));
				}
				return nodes;
			}
			else if(index){
				return parent.insertChild(index, node);
			}else{
				return parent.insertBefore(node, firstChildNode);
			}
		}
	},

	getModuleData: function(name){
		var me = this;
		Modules.getModuleByName(name, function(provider, response){
			me.fireEvent('moduledata', response.result)
		});
	},

	updateModuleData: function(data){
		var me = this;
		Modules.updateModule(data, function(provider, response){
			me.fireEvent('moduledataupdate', response.result)
		});
	},

	addLanguages: function(languages){

	},

	insertToHead: function(link){
		Ext.getHeaad().appendChild(link);
	}
});