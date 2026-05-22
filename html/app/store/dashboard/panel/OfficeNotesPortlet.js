
Ext.define('App.store.dashboard.panel.OfficeNotesPortlet', {
    model: 'App.model.dashboard.panel.OfficeNotesPortlet',
    extend: 'Ext.data.Store',
    proxy : {
        type: 'direct',
        api : {
            read: OfficeNotes.getOfficeNotes
        }
    }
});