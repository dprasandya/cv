
Ext.define('App.view.popup.Bpl_MCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.bpl_mcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'bpl_id', type: 'string'},
				{name: 'bpl_name', type: 'string'},
				{name: 'unit_id', type: 'string'},
				{name: 'price', type: 'float' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Bpl_M.popup
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
			valueField  : 'bpl_id',
			displayField: 'bpl_name',
			emptyText   : _('select'),
			store       : me.store

		}, null);

		me.callParent();
	}
});