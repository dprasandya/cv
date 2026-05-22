
Ext.define('App.view.transactions.marketing.Legal_unit_building', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('legal'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.LegalUnitBuilding',{remoteSort: true,  pageSize : 20,  autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.marketing.Legal_unit_building');

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row': '');
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })
            ],
            columns: [
                {text: _('legal'),flex: 1,sortable: true,dataIndex: 'legal_name'},
                {text: _('no'),width: 150,sortable: true,dataIndex: 'doc_no', editor:{
                    xtype:'textfield',
                    emptyText: i18n('no')
                }},
                {text: _('remarks'),width: 150,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield',
                    emptyText: i18n('remarks')
                }},
                {text: _('enabled?'),width: 60,sortable: true, dataIndex: 'status',renderer: me.boolRenderer,
                    editor:{
                        xtype:'checkbox'
                    }}
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.store_detail.proxy.extraParams = {unit_building_id: record.data.unit_building_id, project_id: record.data.project_id};
                    me.store_detail.load();
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: _('legal'),
                        width: 1100,
                        height: 400,
                        items:[me.grid_detail],
                        modal:true
                    });
                    me.GridShow.show();
                }
            },
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row': (record.get('status')=='3' ? 'yellow-row': ''));
                }
            },
            columns: [
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('customer'),width: 100,sortable: true,dataIndex: 'cust_name'},
                {text: _('unit_building'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['cust_name',_('customer')],['unit_building_name',_('unit_building')],['total',_('total')],['remarks',_('remarks')]],
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
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
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
        var me = this;
        me.store.load();
        callback(true);
    }
});
