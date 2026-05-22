
Ext.define('App.model.administration.Globals', {
	extend: 'Ext.data.Model',
	table: {
		name: 'globals',
		comment: 'Global Settings'
	},
	fields: [
		{
			name: 'gl_name',
			type: 'string',
			comment: 'Global Setting Unique Name or Key'
		},
		{
			name: 'gl_value',
			type: 'string',
			comment: 'Global Setting Value'
		},
		{
			name: 'gl_category',
			type: 'string',
			comment: 'Category'
		},
        {
            name: 'gl_index',
            type: 'int',
            comment: 'Index'
        }
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'Globals.getGlobals',
			update: 'Globals.updateGlobals'
		},
		remoteGroup: false
	}
});