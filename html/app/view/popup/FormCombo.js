
Ext.define('App.view.popup.FormCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.formcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'form_id', type: 'string' },
				{name: 'form_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Form.popup
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
			valueField  : 'form_id',
			displayField: 'form_name',
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