Ext.define('App.view.transactions.ar_invoice.AR_Sale_Items', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('ar_sale_items'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ar_invoice.AR_Invoice_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.ar_invoice.AR_Items_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: true,
            title: _('detail'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.data.status == '1' || me.data.status =='2'){
                                return false;
                            }else{
                                return true
                            }
                        },
                        edit: function (editor, e, eOpts) {
                            var total = e.record.data.qty * e.record.data.price_sale;
                            e.record.set("total", total);
                        }
                    }
                })
            ],
            columns: [
                {text: _('no'),width: 40,sortable: true,dataIndex: 'seq_id'},
                {text: _('document'),width: 120,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'for_doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 90,sortable: true, align:'center',dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true, dataIndex: 'item_name', summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('unit'),width: 60,sortable: true, align:'center',dataIndex: 'unit_id'},
                {text: _('type'),width: 60,sortable: true, align:'center',dataIndex: 'item_type'},
                {text: _('stock'),width: 100,sortable: true,dataIndex: 'qty_stock', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00'),editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('price_sale'),width: 100,sortable: true,dataIndex: 'price_sale', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.data = record.data;
                    me.jurnal.store.load({params:{doc_id:me.data.doc_id}});
                }
            },
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                    }
                },
            plugins: [
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    enablePrint : true,
                    enablePrintFn : voucher_report.ar_form_report,
                    items: [
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('invoice'),
                                    items:[
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    defaultType: 'textfield',
                                                    layout: 'hbox',
                                                    flex:1,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            flex:1,
                                                            layout:'anchor',
                                                            items: [,
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('document'),
                                                                    items: [
                                                                        {
                                                                            width: 200,
                                                                            xtype: 'textfield',
                                                                            name: 'doc_id',
                                                                            readOnly: true,
                                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                            emptyText: i18n('id')
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 200,
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            fieldLabel: _('docdate'),
                                                                            name: 'doc_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            emptyText: i18n('docdate'),
                                                                            allowBlank:false
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            fieldLabel: _('due_date'),
                                                                            name: 'due_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            emptyText: i18n('due_date'),
                                                                            allowBlank:false
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('customer'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcustomer',
                                                                            editable: false,
                                                                            name: 'cust_id',
                                                                            allowBlank: false,
                                                                            extraParams:['C'],
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'cust_name',
                                                                            reference:'cust_name',
                                                                            readOnly: true,
                                                                            emptyText: i18n('customer'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('warehouse'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'warehousecombo',
                                                                            name: 'warehouse_id',
                                                                            editable: false,
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams :['PKS']
                                                                        }
                                                                    ]
                                                                }
                                                                
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    defaultType: 'textfield',
                                                    layout: 'hbox',
                                                    flex:1,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            flex:1,
                                                            layout:'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('tax'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xttax',
                                                                            editable: false,
                                                                            name: 'tax_id',
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'O'
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            name: 'tax_name',
                                                                            emptyText: i18n('name'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('tax')+' '+_('date'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            name: 'tax_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            emptyText: i18n('date')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'tax_no',
                                                                            emptyText: i18n('tax')+' '+i18n('no')
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('remarks'),
                                                                    items: [
                                                                        {
                                                                            width: 380,
                                                                            height: 50,
                                                                            xtype: 'textarea',
                                                                            style:{overflow:'auto'},
                                                                            name: 'remarks',
                                                                            emptyText: i18n('remarks'),
                                                                            labelAlign: 'top'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 125,
                                                                            xtype: 'checkbox',
                                                                            fieldLabel: _('active'),
                                                                            name: 'status'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        me.jurnal.grid
                                    ]
                                },
                                me.grid_detail
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index==0){
                                                me.jurnal.store.load({params:{doc_id:me.data.doc_id}});
                                            }else if(index>0){
                                                i.store.proxy.extraParams = {doc_id: me.data.doc_id, warehouse_id:me.data.warehouse_id, doc_date:me.data.doc_date};
                                                i.store.load();
                                            }
                                        });
                                    });
                                }
                            }
                        }
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'receivable',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('add'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['cust_name',_('customer')],['remarks',_('remarks')],['receivable',_('total')],['tax_id',_('tax')],['tax_no',_('tax')+' No'],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {doc_type:'I', field_name:me.field_name, field_search:field.value};
                            me.store.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
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

        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditing.context.record.data.doc_type = 'I';
        me.formEditing.context.record.data.project_type = 'N';
        plugin.editor.form.findField('tax_id').setValue('PK101');
        plugin.editor.form.findField('tax_date').setValue(new Date());
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('due_date').setValue(new Date());
        me.jurnal.store.load();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        this.store.proxy.extraParams = {doc_type:'I'};
        this.store.load();
        callback(true);
    }
});
