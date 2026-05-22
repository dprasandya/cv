

Ext.define('App.store.administration.HeadersAndFooters',
{
	model : 'App.model.administration.HeadersAndFooters',
	extend : 'Ext.data.Store',
	proxy :
	{
		type : 'direct',
		api :
		{
			read : DocumentHandler.getHeadersAndFootersTemplates,
			create : DocumentHandler.addDocumentsTemplates,
			update : DocumentHandler.updateDocumentsTemplates
		}
	},
	autoSync : true,
	autoLoad : false

}); 