

Ext.define('App.store.administration.XtypesComboModel', {
	model: 'App.model.administration.XtypesComboModel',
	extend: 'Ext.data.Store',
	proxy: {
		type: 'direct',
		api: {
			read: 'CombosData.getFiledXtypes'
		}
	},
	autoLoad: true
});