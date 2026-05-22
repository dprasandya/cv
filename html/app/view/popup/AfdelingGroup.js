
Ext.define('App.view.popup.AfdelingGroup', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.xtafdeling_group_combo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'afdeling_group', type: 'string'}
			],
			proxy : {
				type: 'direct',
				api : {
					read: Afdeling.afdeling_group
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
			valueField  : 'afdeling_group',
			displayField: 'afdeling_group',
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