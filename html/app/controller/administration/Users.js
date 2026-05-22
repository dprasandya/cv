
Ext.define('App.controller.administration.Users', {
	extend: 'Ext.app.Controller',

	refs: [
		{
			ref: 'AdminUsersPanel',
			selector: '#AdminUsersPanel'
		},
		{
			ref: 'AdminUserGridPanel',
			selector: '#AdminUserGridPanel'
		}
	],

	init: function(){
		var me = this;

        me.control( {
            '#AdminUserGridPanel': {
                beforeedit: me.onAdminUserGridPanelBeforeEdit
            }
        });

	},

	onAdminUserGridPanelBeforeEdit: function(plugin, context){
		var grid = plugin.editor.down('grid'),
			store = grid.getStore(),
			params = {};

		store.load({
			params: params
		});
	}


});