
Ext.define('App.view.popup.ActualcostCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.ActualcostCombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'doc_name', type: 'string' },
				{name: 'remarks', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Actual_Cost.popup
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
			valueField  : 'doc_name',
			displayField: 'doc_name',
			emptyText   : _('select'),
			store       : me.store,
			listeners: {
				beforequery: function(c) {
					c.combo.store.load();
				}
			}
		}, null);

		me.callParent();
	}
});