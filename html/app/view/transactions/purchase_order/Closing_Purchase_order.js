
Ext.define('App.view.transactions.purchase_order.Closing_Purchase_order', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('purchaseorder_closing'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.purchase_order.Closing_Purchase_order',{remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'doc_id'});

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return (record.get('qty_outstanding') <= 0 ? 'child-row' : '');
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',editor:{
                    xtype:'checkbox',
                    editable: false
                }},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y') ,editor:{
                    xtype:'datefield',
                    value : new Date(),
                    maxValue : new Date(),
                    editable: false
                }},
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 130,sortable: true,dataIndex: 'doc_id'},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield'
                }},
                {text: _('item'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' Po',width: 90,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity')+' Grn',width: 90,sortable: true,dataIndex: 'qty_grn', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 90,sortable: true,dataIndex: 'qty_outstanding', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('warehouse'),width: 80,sortable: true,dataIndex: 'warehouse_id'}
            ],
            features: [{
                groupHeaderTpl: _('document')+' : {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['vend_name',_('supplier')],['remarks',_('remarks')],['item_name',_('items')],['unit_id',_('unit')],['qty',_('quantity')+' Po'],['qty_grn',_('quantity')+' Grn'],['warehouse_id',_('warehouse')]],
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
        me.formEditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                if(roweditor.context.record.data.status=='true'){me.store.load();app.msg(_('success'), _('record_updated'));}
            }
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
