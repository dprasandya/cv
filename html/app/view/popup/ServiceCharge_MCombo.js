
Ext.define('App.view.popup.ServiceCharge_MCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.sc_mcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'sc_id', type: 'string'},
				{name: 'sc_name', type: 'string'},
				{name: 'unit_id', type: 'string'},
				{name: 'price', type: 'float' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: ServiceCharge_M.popup
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
			valueField  : 'sc_id',
			displayField: 'sc_name',
			emptyText   : _('select'),
			store       : me.store

		}, null);

		me.callParent();
	}
});