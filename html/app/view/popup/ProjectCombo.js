
Ext.define('App.view.popup.ProjectCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.projectcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'project_id', type: 'string'},
				{name: 'project_name', type: 'string'}
			],
			proxy : {
				type: 'direct',
				api : {
					read: Project.popup
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
			valueField  : 'project_id',
			displayField: 'project_name',
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