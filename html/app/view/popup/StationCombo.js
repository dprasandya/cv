
Ext.define('App.view.popup.StationCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.stationcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'station_id', type: 'string' },
				{name: 'station_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Station.popup
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
			valueField  : 'station_id',
			displayField: 'station_name',
			emptyText   : _('select'),
			store       : me.store
		}, null);

		me.callParent();
	}
});