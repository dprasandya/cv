

Ext.define('App.store.miscellaneous.Users', {
    model     : 'App.model.miscellaneous.Users',
    extend    : 'Ext.data.Store',
    proxy :
    {
        type : 'direct',
        api :
        {
            read : User.getCurrentUserData,
            update : User.getCurrentUserData
        }
    }
});