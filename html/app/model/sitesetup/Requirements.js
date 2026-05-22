
Ext.define('App.model.sitesetup.Requirements', {
	extend: 'Ext.data.Model',
	table: {
		name: 'requirements',
		comment: 'Requirements'
	},
	fields: [
		{name: 'id', type: 'int', comment: 'Requirements ID'},
		{name: 'msg', type: 'string'},
		{name: 'status', type: 'string'}
	]
});