

Ext.define('App.store.sitesetup.Requirements', {
    model: 'App.model.sitesetup.Requirements',
    extend: 'Ext.data.Store',
    proxy:{
        type:'direct',
        api:{
            read:SiteSetup.checkRequirements
        }
    },
    autoLoad:false
});