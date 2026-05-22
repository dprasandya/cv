
Ext.define('App.view.hris.Attendance.Finger_delete', {
    extend: 'App.ux.RenderPanel',
    pageTitle: 'Hapus Data Log Mesin Absensi',
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.Attendance.Finger_delete',{remoteSort: false, pageSize : 20, autoLoad: false});
  
        me.grid = Ext.create('Ext.grid.Panel', {
            title: 'Lokasi Mesin',
            store: me.store,
            plugins: [
                me.edditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 150,sortable: true,dataIndex: 'sn_bio_finger'},
                {text: _('address'),flex:1,sortable: true,dataIndex: 'ol_address'},
                {text: _('office_location'),width: 150,sortable: true,dataIndex: 'ol_name'},
                {text: 'Hapus Log Absensi',width: 120,sortable: true,dataIndex: 'hapus_absensi',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        //this.store.proxy.extraParams = {overtime_date:new Date()};
        this.store.load();
        callback(true);
    }
});
