
Ext.define('App.view.popup.ProjectTypeCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.projecttypecombo',
	initComponent: function() {
		var me = this;


		me.store = [
			['P',_('project')],
			['N','Non '+_('project')]

		];

		Ext.apply(this, {
			editable    : false,
			queryMode   : 'local',
			valueField  : 'project_type',
			displayField: 'project_type_name',
			emptyText   : _('select'),
			store       : me.store
		}, null);

		me.callParent();
	}
});