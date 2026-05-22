
Ext.define('App.model.administration.AclGroup', {
	extend: 'Ext.data.Model',
	table: {
		name: 'acl_groups'
	},
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'title',
			type: 'string'
		},
		{
			name: 'active',
			type: 'bool',
			index: true
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'ACL.getAclGroups',
			create: 'ACL.addAclGroup',
			update: 'ACL.updateAclGroup'
		},
		reader: {
			root: 'data'
		}
	}
});
