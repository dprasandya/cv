
Ext.define('App.view.popup.RoomStatusCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.xtroomstatuscombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'rs_id', type: 'string'},
				{name: 'rs_name', type: 'string'}
			],
			proxy : {
				type: 'direct',
				api : {
					read: RoomStatus.popup
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
			valueField  : 'rs_id',
			displayField: 'rs_name',
			emptyText   : _('select'),
			store       : me.store/*,
			listeners: {
				beforequery: function(c) {
					c.combo.store.load();
				}
			}*/
		}, null);

		me.callParent();
	}
});