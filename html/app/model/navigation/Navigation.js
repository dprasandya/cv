

Ext.define('App.model.navigation.Navigation', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'text', type: 'string'},
		{name: 'disabled', type: 'bool', defaultValue: false}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'Navigation.getNavigation'
		}
	}
});