Ext.define('App.view.transactions.ar_invoice.AR_Banquete', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('banquete'),
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
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    flex:1,
                                    items:[
                                        {
                                            xtype: 'container',
                                            layout:'anchor',
                                            flex:1,
                                            items: [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('item'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtitems',
                                                            name: 'item_id',
                                                            emptyText: i18n('id'),
                                                            extraParams:['FG','FB']
                                                        },
                                                        {
                                                            width: 198,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'item_name',
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 80,
                                                            xtype: 'textfield',
                                                            name: 'unit_id',
                                                            readOnly: true,
                                                            emptyText: i18n('unit'),
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
                                                    fieldLabel: _('quantity'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'qty',
                                                            allowBlank:false,
                                                            emptyText: i18n('quantity')
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
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('no'),width: 40,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 90,sortable: true, align:'center',dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true, dataIndex: 'item_name', summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price_sale'),width: 100,sortable: true,dataIndex: 'price_sale', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});
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
                    enablePrintFn : voucher_report.coffe_shop_form_report,
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
                                                                    fieldLabel: _('project'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'projecttypecombo',
                                                                            name: 'project_type',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('type')
                                                                            /*listeners:{
                                                                                change:function(field){
                                                                                    var container = field.up('container'), form = container.up('container'),
                                                                                        costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', form)[0];
                                                                                    if(field.value=='P'){
                                                                                        costcode_id.setDisabled(false);
                                                                                    }else{
                                                                                        costcode_id.setDisabled(true);
                                                                                    }
                                                                                }
                                                                            }*/
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'projectcombo',
                                                                            name: 'project_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            listeners:{
                                                                                change:function(field){
                                                                                    var container = field.up('container'), form = container.up('container'),
                                                                                        //costcode_id = Ext.ComponentQuery.query('[name=costcode_id]', form)[0],
                                                                                        unit_building_id = Ext.ComponentQuery.query('[name=unit_building_id]', form)[0],
                                                                                        unit_building_name = Ext.ComponentQuery.query('[name=unit_building_name]', form)[0];
                                                                                      unit_building_id.setValue(null);  unit_building_name.setValue(null);
                                                                                    //costcode_id.setValue(null);
                                                                                    //costcode_id.extraParams={doc_type:'B', project_id:field.value};
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                /*{
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('costcode'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcostcode',
                                                                            editable: false,
                                                                            name: 'costcode_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:{doc_type:'', project_id:''}
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'costcode_name',
                                                                            readOnly: true,
                                                                            emptyText: i18n('name'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        }
                                                                    ]
                                                                },*/
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('unit_building'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtunitbuildingcustomer',
                                                                            editable: false,
                                                                            name: 'unit_building_id',
                                                                            emptyText: i18n('unit_building'),
                                                                            extraParams:['SALES','RENT','CHECK IN']

                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'unit_building_name',
                                                                            readOnly: true,
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
                                                                    fieldLabel: _('document'),
                                                                    items: [
                                                                        {
                                                                            width: 200,
                                                                            xtype: 'textfield',
                                                                            name: 'doc_id',
                                                                            readOnly: true,
                                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;',
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            width: 200,
                                                                            xtype: 'textfield',
                                                                            name: 'for_doc_id',
                                                                            readOnly: true,
                                                                            hidden:true,
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
                                                                }/*,
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    fieldDefaults: {
                                                                        labelAlign: 'right'
                                                                    },
                                                                    fieldLabel: _('salesman'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtsalesman',
                                                                            name: 'sales_id',
                                                                            editable: false,
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            readOnly: true,
                                                                            name: 'sales_name',
                                                                            emptyText: i18n('name'),
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                                        }
                                                                    ]
                                                                }*/
                                                                ,
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
                                                                    fieldLabel: _('warehouse'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'warehousecombo',
                                                                            name: 'warehouse_id',
                                                                            editable: false,
                                                                            allowBlank: false,
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
                                                                    fieldLabel: _('table'),
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xttablefb',
                                                                            editable: false,
                                                                            name: 'table_id',
                                                                            allowBlank: false,
                                                                            emptyText: i18n('id')
                                                                        },
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'table_name',
                                                                            readOnly: true,
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
                                                me.jurnal.store.load({params:{doc_id:me.doc_id}});
                                            }else if(index>0){
                                                i.store.proxy.extraParams = {doc_id: me.doc_id};
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
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
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
                    text: _('ar_sale_items'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['unit_building_name',_('unit_building')],['doc_id',_('document')],['cust_name',_('customer')],['remarks',_('remarks')],['receivable',_('total')],['tax_id',_('tax')],['tax_no',_('tax')+' No'],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {doc_type:'Q', field_name:me.field_name, field_search:field.value};
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
        me.formEditing.context.record.data.doc_type = 'Q';
        plugin.editor.form.findField('project_type').setValue('N');
        plugin.editor.form.findField('tax_id').setValue('PK101');
        plugin.editor.form.findField('tax_date').setValue(new Date());
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('due_date').setValue(new Date());
        me.jurnal.store.load();
    },
    onNewDetail:function(btn){
        var me = this;
        me.formEditingDetail.cancelEdit();
        me.store_detail.insert(0, {aktif: 1,authorized: 1});
        me.formEditingDetail.startEdit(0, 0);
        me.formEditingDetail.context.record.data.doc_id = me.doc_id;
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        this.store.proxy.extraParams = {doc_type:'Q'};
        this.store.load();
        callback(true);
    }
});
