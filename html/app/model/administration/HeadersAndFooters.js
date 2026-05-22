
Ext.define('App.model.administration.HeadersAndFooters', {
	extend: 'Ext.data.Model',
	table: {
		name: 'headersandfooters',
		comment: 'Headers And Footers'
	},
	fields: [
		{name: 'id', type: 'int', comment: 'Headers and Footers ID'},
		{name: 'title', type: 'string' },
		{name: 'template_type', type: 'string' },
		{name: 'body', type: 'string' },
		{name: 'date', type: 'date', dateFormat: 'Y-m-d H:i:s' }

	]
});