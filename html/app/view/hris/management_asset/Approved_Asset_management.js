
Ext.define('App.view.hris.management_asset.Approved_Asset_management', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('asset_approval'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.hris.management_asset.Approved_Asset_management',{remoteSort: true, pageSize : 20, autoLoad: false});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.asset_type= record.data.asset_type;
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })
            ],
            columns: [
                {text: _('approval'),width: 60,sortable: true, dataIndex: 'status',
                    editor:{
                        xtype:'combo',
                        editable: false,
                        mode:'local',
                        store:[['1',_('yes')],['2',_('no')]]
                }},
                {text: _('date')+' '+_('approval'),width: 100,sortable: true,dataIndex: 'approved_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'), editor:{
                    xtype:'datefield',
                    format : 'Y-m-d',
                    editable: false,
                    value: new Date(),
                    minValue : new Date(),
                    emptyText: i18n('date')
                }},
                {text: _('name'),width: 120,sortable: true,dataIndex: 'emp_name'},
                {text: _('date'),width: 100,sortable: true,dataIndex: 'request_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('time_from'),width: 80,sortable: true,dataIndex: 'time_in'},
                {text: _('time_to'),width: 80,sortable: true,dataIndex: 'time_out'},
                {text: _('type'),width: 100,sortable: true,dataIndex: 'asset_type'},
                {text: _('asset'),width: 100,sortable: true, dataIndex: 'asset_id',
                    editor:{
                        xtype:'xthris_asset',
                        editable: false,
                        listeners: {
                            render: function(c){
                                c.extraParams = me.asset_type;
                            }
                        }
                    }},
                {text: _('driver'),width: 100,sortable: true, dataIndex: 'driver_id',
                    editor:{
                        xtype:'xtdriver',
                        editable: false
                    }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['emp_name',_('name')],['asset_type',_('type')], ['driver_name',_('driver')],['asset_name',_('asset')], ['request_date',_('date')], ['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
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
        me.formEditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                if(roweditor.context.record.data.status=='1' || roweditor.context.record.data.status=='true'){
                    me.store.load();
                }
            }
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewUser: function(){
        var me = this;
        me.formEditing.cancelEdit();
        me.store.insert(0, {aktif: 1,authorized: 1});
        me.formEditing.startEdit(0, 0);
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
