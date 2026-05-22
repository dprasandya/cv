
Ext.define('App.view.popup.EntityCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.xtentitycombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'co_id', type: 'string'},
				{name: 'co_name', type: 'string'}
			],
			proxy : {
				type: 'direct',
				api : {
					read: Company.select
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
			valueField  : 'co_id',
			displayField: 'co_name',
			emptyText   : _('select'),
			store       : me.store/*,
			listeners: {
				beforequery: function(c) {
                    c.combo.proxy.extraParams={project_id:me.extraParams[0].project_id, cluster_id:me.extraParams[0].cluster_id};
					c.combo.store.load();
				}
			}*/
		}, null);

		me.callParent();
	}
});