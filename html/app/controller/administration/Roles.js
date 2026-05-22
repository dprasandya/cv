

Ext.define('App.controller.administration.Roles', {
	extend: 'Ext.app.Controller',

	init: function(){
		this.control({
			'#AdministrationRolePanel': {
				render: this.onAdministrationRolePanelRender
			}
		});
	},
    onAdministrationRolePanelRender: function(){
        var me = this;

    }

});