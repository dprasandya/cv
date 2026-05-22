
Ext.define('App.view.administration.Modules', {
    extend: 'App.ux.RenderPanel',
    id: 'panelModules',
    pageTitle: _('modules'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.administration.Modules');

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {
                    text: _('title'),
                    width: 200,
                    sortable: true,
                    dataIndex: 'title'
                },
                {
                    text: _('description'),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'description'
                },
                {
                    text: _('version'),
                    width: 100,
                    sortable: true,
                    dataIndex: 'installed_version'
                },
                {
                    text: _('key_if_required'),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'licensekey',
                    editor:{
                        xtype:'textfield'
                    }
                },
                {
                    text: _('enabled?'),
                    width: 60,
                    sortable: true,
                    renderer: me.boolRenderer,
                    dataIndex: 'enable',
                    editor:{
                        xtype:'checkbox'
                    }
                }
            ]
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.load();
        callback(true);
    }
});
