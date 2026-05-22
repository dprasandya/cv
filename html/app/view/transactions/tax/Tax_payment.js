
Ext.define('App.view.transactions.tax.Tax_payment', {
    extend: 'App.ux.RenderPanel',
    id: 'panelTax_payment',
    pageTitle: _('tax_payment'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.tax.Tax_payment',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_jurnal = Ext.create('App.store.transactions.tax.JurnalTax_payment',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('tax_payment'),
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('date'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y'),editor:{
                    xtype:'datefield',
                    editable: false
                }},
                {text: _('document'),width: 120,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('tax_no'),width: 100,sortable: true,dataIndex: 'tax_no'},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_ppn', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                    xtype:'textfield',
                    editable: false
                }},
                {text: _('cashbank'),width: 80,sortable: true,dataIndex: 'cash_id',editor:{
                    xtype:'xtcashbank',extraParams:'B',
                    editable: false
                }},
                {text: _('cashflow'),width: 80,sortable: true,dataIndex: 'cflow_id',editor:{
                    xtype:'xtcashflow',extraParams:'I',
                    editable: false
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield',
                    editable: false
                }},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',editor:{
                    xtype:'checkbox',
                    editable: false
                }}
            ],
            tbar: [
                {
                    width: 120,
                    xtype : 'combo',
                    editable: false,
                    mode:'local',
                    store: [['IN',_('in')],['OUT',_('out')]],
                    emptyText: i18n('type'),
                    listeners:{
                        change:function(field, e){
                            me.doc_type = field.value;
                            me.load_grid();
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['for_doc_id',_('id')],['tax_id',_('tax')],['tax_no',_('tax_no')],['outstanding_ppn',_('outstanding')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:me.doc_type, field_name:me.field_name, field_search:field.value};
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
        me.grid_jurnal = Ext.create('Ext.grid.Panel', {
            store: me.store_jurnal,
            title: _('jurnal'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_jurnal.down('toolbar');
                    useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'panel',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield'
                                },me.jurnal.grid
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'coa_name'},
                {text: _('cashbank'),width: 80,sortable: true,dataIndex: 'cash_id'},
                {text: _('cashflow'),width: 80,sortable: true,dataIndex: 'cflow_id'},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('id')],['coa_name',_('coa_name')],['cash_id',_('cashbank')],['cflow_id',_('cashflow')],['nominal',_('total')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_jurnal.proxy.extraParams = {field_name:me.field_name, field_search:field.value, start:0};
                        me.store_jurnal.load();}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_jurnal,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_jurnal],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);
    },
    load_grid: function(){
        var me=this;
        me.store.proxy.extraParams ={doc_type:me.doc_type};
        me.store.load();
    },


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        callback(true);
    }
});
