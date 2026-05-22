

Ext.define('App.model.administration.AclRolePermissions', {
	extend: 'Ext.data.Model',
	table: {
		name: 'acl_role_perms'
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
			name: 'perm_id',
			type: 'int',
			index: true
		},
		{
			name: 'value',
			type: 'bool'
		},
		{
			name: 'add_date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		}
	]
});
