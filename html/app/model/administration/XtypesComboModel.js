
Ext.define('App.model.administration.XtypesComboModel', {
	extend: 'Ext.data.Model',
	table: {
		name: 'xtypescombo',
		comment: 'XTYPE Combos'
	},
	fields: [
		{ name: 'id', type: 'string' },
		{ name: 'name', type: 'string' },
		{ name: 'value', type: 'string' }
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'CombosData.getFiledXtypes'
		}
	},
	autoLoad: true
});