
Ext.define('App.model.miscellaneous.Users', {
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'User Account ID'
		},
		{
			name: 'usrname',
			type: 'string',
			comment: 'username'
		},
		{
			name: 'fname',
			type: 'string',
			comment: 'first name'
		},
		{
			name: 'lname',
			type: 'string',
			comment: 'last name'
		},
        {
            name: 'authorized',
            type: 'int',
            comment: 'authorized'
        },
        {
            name: 'aktif',
            type: 'int',
            comment: 'aktif'
        },
		{
			name: 'email',
			type: 'string',
			comment: 'email'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'User.getCurrentUserData',
			update: 'User.updateUser'
		}
	}
});