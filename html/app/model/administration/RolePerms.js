
Ext.define('App.model.administration.RolePerms', {
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'perm_name',
			type: 'string'
		},
		{
			name: 'perm_key',
			type: 'string'
		},
		{
			name: 'perm_cat',
			type: 'string'
		},
		{
			name: 'role-front_office',
			type: 'bool'
		},
		{
			name: 'role-auditor',
			type: 'bool'
		},
		{
			name: 'role-clinician',
			type: 'bool'
		},
		{
			name: 'role-physician',
			type: 'bool'
		},
		{
			name: 'role-emergencyaccess',
			type: 'bool'
		},
		{
			name: 'role-referrer',
			type: 'bool'
		},
		{
			name: 'role-administrator',
			type: 'bool'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'Roles.getRolePerms',
			update: 'Roles.updateRolePerm'
		},
		reader: {
			type: 'json',
			root: 'data'
		}

	}
});
