

Ext.define('App.model.administration.AclPermissions', {
	extend: 'Ext.data.Model',
	table: {
		name: 'acl_permissions'
	},
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'perm_key',
			type: 'string',
			index: true
		},
		{
			name: 'perm_name',
			type: 'string'
		},
		{
			name: 'perm_cat',
			type: 'string'
		},
		{
			name: 'seq',
			type: 'int',
			index: true
		},
		{
			name: 'active',
			type: 'bool',
			index: true
		}
	]
});