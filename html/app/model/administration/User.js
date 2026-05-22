
Ext.define('App.model.administration.User', {
	extend: 'Ext.data.Model',
	table: {
		name: 'users',
		comment: 'User accounts'
	},
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'usrname',
            type: 'string'
        },
        {
            name: 'passwd',
            type: 'auto'
        },
        {
            name: 'authorized',
            type: 'bool'
        },
        {
            name: 'aktif',
            type: 'bool'
        },
        {
            name: 'info',
            type: 'string'
        },
        {
            name: 'fname',
            type: 'string'
        },
        {
            name: 'lname',
            type: 'string'
        },
        {
            name: 'fullname',
            type: 'string'
        },
        {
            name: 'role_id',
            type: 'int'
        },
        {
            name: 'co_id',
            type: 'string',
            defaultValue : globals['site']
        },
        {
            name: 'level',
            type: 'string'
        }

    ],
	proxy: {
		type: 'direct',
		api: {
			read: 'User.getUsers',
			create: 'User.addUser',
            destroy: 'User.deleteUser',
			update: 'User.updateUser'
		},
		reader: {
			root: 'data'
		}
	}
});
