


Ext.define('App.store.administration.Modules', {
    model: 'App.model.administration.Modules',
    extend: 'Ext.data.Store',
    proxy: {
        type: 'direct',
        api: {
            read: 'Modules.getActiveModules',
            update: 'Modules.updateModule'
        }
    }
});