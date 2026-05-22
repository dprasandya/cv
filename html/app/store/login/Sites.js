

Ext.define('App.store.login.Sites', {
    model: 'App.model.login.Sites',
    extend: 'Ext.data.Store',
    proxy: {
        type: 'direct',
        api: {
            read: authProcedures.getSites
        }
    }
});