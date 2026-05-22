
Ext.define('App.model.administration.Role', {
	extend: 'Ext.data.Model',
	table: {
		name: 'acl_role',
		comment: 'Access Control List Roles'
	},
	fields: [
        { name : 'id', type : 'int'},
        { name : 'role_name', type : 'string'},
        { name : 'role_key', type : 'string'},
        { name : 'seq', type : 'int'}
	],
	proxy: {
		type: 'direct',
		api: {
            read:Role.getRole,
            create:Role.addRole,
            update:Role.updateRole,
            destroy:Role.deleteRole
		},
		reader: {
			root: 'data'
		}
	}
});