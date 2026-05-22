
Ext.define('App.view.transactions.salesorder.Closing_Sales_order', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('salesorder_closing'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.model =Ext.define('model',{
            extend : 'Ext.data.Model',
            fields :[
                {name:'co_id', type:'string'},
                {name:'doc_id', type:'string'},
                {name:'doc_date', type:'date'},
                {name:'item_id', type:'string'},
                {name:'item_name', type:'string'},
                {name:'item_type', type:'string'},
                {name:'unit_id', type:'string'},
                {name:'qty', type:'float'},
                {name:'qty_so', type:'float'},
                {name:'qty_do', type:'float'},
                {name:'qty_outstanding', type:'float'},
                {name:'cust_id', type:'string'},
                {name:'cust_name', type:'string'},
                {name:'remarks', type:'string'},
                {name:'status', type:'string'},
                {name:'userinput', type:'string'},
                {name:'useredit', type:'string'},
                {name:'timeedit', type:'date'}

            ],
            proxy:{
                type:'direct',
                api:{
                    read: Closing_Sales_order.select,
                    update: Closing_Sales_order.update
                },
                reader :{
                    root: 'rows',
                    totalProperty: 'totals'
                }
            }
        });
        me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, pageSize : 20, autoLoad: false, groupField: 'cust_name'});

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
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('customer'),width: 150,sortable: true,dataIndex: 'cust_name'},
                {text: _('remarks'),flex:1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield'
                }},
                {text: _('item'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' So',width: 100,sortable: true,dataIndex: 'qty_so', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity')+' Inv',width: 100,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity')+' Do',width: 100,sortable: true,dataIndex: 'qty_do', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'qty_outstanding', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            features: [{
                groupHeaderTpl: _('customer')+' : {name}',
                ftype: 'groupingsummary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['cust_name',_('customer')],['remarks',_('remarks')],['item_name',_('items')],['unit_id',_('unit')],['qty_so',_('quantity')+' So'],['qty_do',_('quantity')+' Do'],['qty',_('quantity')+' Inv']],
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
