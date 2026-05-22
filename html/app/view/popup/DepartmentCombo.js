
Ext.define('App.view.popup.DepartmentCombo', {
	extend       : 'Ext.form.ComboBox',
	alias        : 'widget.departmentcombo',
	initComponent: function() {
		var me = this;

		Ext.define('model', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'department_id', type: 'string' },
				{name: 'department_name', type: 'string' }
			],
			proxy : {
				type: 'direct',
				api : {
					read: Department.select
				},
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                },
                extraParams:{
                    field_name: 'status',
                    field_search: 1
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
			valueField  : 'department_id',
			displayField: 'department_name',
			emptyText   : _('select'),
			store       : me.store
		}, null);
		me.callParent();
	} // end initComponent
});