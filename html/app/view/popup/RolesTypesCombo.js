
Ext.define('App.view.popup.RolesTypesCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.rolestypescombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'perm_cat', type: 'string' },
				{name: 'perm_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Roles.popupTypes
				},
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
			}
		});

		me.store = Ext.create('Ext.data.Store', {
			model   : 'model',
			autoLoad: true
		});

		Ext.apply(this, {
			editable    : false,
			queryMode   : 'local',
			valueField  : 'perm_cat',
			displayField: 'perm_name',
			emptyText   : _('select'),
			store       : me.store
			/*listeners: {
				beforequery: function(c) {
					c.combo.store.proxy.extraParams ={type_id:me.extraParams};
					c.combo.store.load();
				}
			}*/
		}, null);

		me.callParent();
	}
});