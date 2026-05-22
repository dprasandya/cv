

Ext.define('App.model.administration.AclGroupPerm', {
	extend: 'Ext.data.Model',
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
			name: 'group_id',
			type: 'int'
		},
		{
			name: 'category',
			type: 'string'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'ACL.getGroupPerms',
			create: 'ACL.updateGroupPerms',
			update: 'ACL.updateGroupPerms'
		},
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});