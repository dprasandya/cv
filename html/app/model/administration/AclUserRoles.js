

Ext.define('App.model.administration.AclUserRoles', {
	extend: 'Ext.data.Model',
	table: {
		name: 'acl_user_roles',
		comment: 'Access List User Roles'
	},
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'role_id',
			type: 'int',
			index: true
		},
		{
			name: 'add_date',
			type: 'date',
			dataType: 'timestamp',
			defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
		}
	]
});