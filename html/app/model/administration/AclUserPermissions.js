

Ext.define('App.model.administration.AclRolePermissions', {
	extend: 'Ext.data.Model',
	table: {
		name: 'acl_user_perms'
	},
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'user_id',
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
			type: 'int'
		},
		{
			name: 'add_date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		}
	]
});