

Ext.define('App.model.administration.Modules', {
	extend: 'Ext.data.Model',
	table: {
		name: 'modules',
		comment: 'Modules'
	},
	fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'title',
            type: 'string',
            len: 80
        },
        {
            name: 'name',
            type: 'string',
            len: 100
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'enable',
            type: 'bool'
        },
        {
            name: 'installed_version',
            type: 'string',
            len: 20
        },
        {
            name: 'licensekey',
            type: 'string'
        },
        {
            name: 'localkey',
            type: 'string'
        }
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'Modules.getActiveModules',
			update: 'Modules.updateModule'
		}
	}
});