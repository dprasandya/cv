
Ext.define('App.model.login.Sites',
	{
		extend: 'Ext.data.Model',
		table: {
			name: 'sites',
			comment: 'Sites'
		},
		fields: [
			{
				name: 'site_id',
				type: 'int'
			},
			{
				name: 'site',
				type: 'string'
			},
            {
                name: 'site_name',
                type: 'string'
            }
		],
		proxy: {
			type: 'direct',
			api: {
				read: 'authProcedures.getSites'
			}
		}
	});