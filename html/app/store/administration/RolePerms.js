
Ext.define('App.store.administration.RolePerms', {
    model: 'App.model.administration.RolePerms',
    extend: 'Ext.data.Store',
	groupField: 'perm_cat',
    autoLoad: false
}); 