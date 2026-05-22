
Ext.define('App.view.popup.StationNameCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.stationnamecombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'station_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: AccountHpp.select
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
			queryMode   : 'local',
			valueField  : 'station_name',
			displayField: 'station_name',
			emptyText   : _('select'),
			store       : me.store
		}, null);

		me.callParent();
	}
});