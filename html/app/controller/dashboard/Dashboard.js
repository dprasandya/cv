

Ext.define('App.controller.dashboard.Dashboard', {
	extend: 'Ext.app.Controller',
	refs: [
/*
		{
			ref: 'DashboardRenderPanel',
			selector: '#DashboardPanel'
		},
		{
			ref: 'DashboardPanel',
			selector: 'portalpanel'
		}
*/
	],

	addLeftPanel: function(title, item, index){
		var panel;
/*
		if(index){
			panel = this.getDashboardLeftColumn().insert(index, {
				xtype: 'portlet',
				title: title,
				items: [item]
			});
		}else{
			panel = this.getDashboardLeftColumn().add({
				xtype: 'portlet',
				title: title,
				items: [item]
			});
		}
*/
		return panel;
	},

	addRightPanel: function(title, item, index){
		var panel;
/*
		if(index){
			panel = this.getDashboardRightColumn().insert(index, {
				xtype: 'portlet',
				title: title,
				items: [item]
			});
		}else{
			panel = this.getDashboardRightColumn().add({
				xtype: 'portlet',
				title: title,
				items: [item]
			});
		}
*/
		return panel;
	},

	getColumns: function(){
		return this.getDashboardPanel().items;
	}

});