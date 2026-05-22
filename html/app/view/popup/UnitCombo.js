
Ext.define('App.view.popup.UnitCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.unitcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'unit_id', type: 'string' },
				{name: 'unit_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Unit.select
				},
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                },
                extraParams:{
                    field_name: 'status',
                    field_search: '1'
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
			valueField  : 'unit_id',
			displayField: 'unit_name',
			emptyText   : _('select'),
			store       : me.store
		}, null);

		me.callParent();
	}
});