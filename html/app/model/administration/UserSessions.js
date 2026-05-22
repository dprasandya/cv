
Ext.define('App.model.administration.UserSessions', {
	extend: 'Ext.data.Model',
	table: {
		name: 'users_sessions',
		comment: 'User Session'
	},
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'User Account ID'
		},
		{
			name: 'sid',
			type: 'string',
			comment: 'Session ID'
		},
		{
			name: 'uid',
			type: 'int',
			comment: 'User ID'
		},
		{
			name: 'login',
			type: 'int'
		},
		{
			name: 'logout',
			type: 'int'
		},
		{
			name: 'last_request',
			type: 'int'
		}
	]
});
