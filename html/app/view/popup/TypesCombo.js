
Ext.define('App.view.popup.TypesCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.typescombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'type_id', type: 'string' },
				{name: 'type_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Types.popup
				},
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                },
				extraParams:{
					type_id:me.extraParams
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
			valueField  : 'type_id',
			displayField: 'type_name',
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