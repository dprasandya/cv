
Ext.define('App.view.transactions.purchase_order.Purchase_order', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPurchase_order',
    pageTitle: _('purchaseorder'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.purchase_order.Purchase_order',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.purchase_order.Detail');
        me.tax = Ext.create('App.view.master.Tax');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 1000,
            autoScroll: false,
            title: _('detail'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('detail'),
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
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['RM','RA']
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
                                                            xtype: 'textfield',
                                                            editable: false,
                                                            name: 'costcode_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('price'),
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
                                                    items: [
                                                        {
                                                            width: 250,
                                                            fieldLabel: _('quantity'),
                                                            xtype: 'mitos.currency',
                                                            name: 'qty',
                                                            allowBlank:false,
                                                            emptyText: i18n('quantity'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    me.get_total(field);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 240,
                                                            fieldLabel: _('warehouse'),
                                                            xtype: 'warehousecombo',
                                                            name: 'warehouse_id',
                                                            editable: false,
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
                                                    fieldLabel: _('tax'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xttax',
                                                            editable: false,
                                                            name: 'tax_id',
                                                            emptyText: i18n('id'),
                                                            extraParams:'I',
                                                            listeners:{
                                                                change:function(field, e){
                                                                    me.get_total(field);
                                                                }
                                                            }
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
                                                    fieldLabel: _('price')+' Ppn, Pph',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'price',
                                                            allowBlank:false,
                                                            enableKeyEvents: true,
                                                            emptyText: i18n('price'),
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    me.get_total(field);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 80,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_ppn',
                                                            readOnly:true,
                                                            emptyText: i18n('ppn'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                        },
                                                        {
                                                            width: 70,
                                                            xtype: 'mitos.currency',
                                                            name: 'price_pph',
                                                            readOnly:true,
                                                            emptyText: i18n('pph'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
                                                        },
                                                        {
                                                            width: 130,
                                                            xtype: 'mitos.currency',
                                                            name: 'total_price',
                                                            readOnly:true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
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
                                                    fieldLabel: _('total'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'total',
                                                            readOnly: true,
                                                            emptyText: i18n('total'),
                                                            fieldStyle:'font-weight: bold; text-align:right; background-color: #F2F3F4; background-image: none;'
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
                {text: _('id'),width: 90,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('unit'),width: 90,sortable: true,dataIndex: 'unit_id'},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            features: [{
                ftype: 'summary'
            }],
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
        me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
            clicksToEdit: 1,
            enablePrint : true,
            enablePrintFn : voucher_report.po_form_report,
            items: [
                {
                    xtype: 'tabpanel',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: _('purchaseorder'),
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        /*{
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
                                                    emptyText: i18n('type'),
                                                    listeners:{
                                                        change:function(field){
                                                                var container = field.up('container'), //form = container.up('container'),
                                                                project_id = Ext.ComponentQuery.query('[name=project_id]', container)[0];
                                                                if(field.value=='P'){
                                                                    project_id.setDisabled(false);
                                                                }else{
                                                                    project_id.setDisabled(true);
                                                                }
                                                        }
                                                   }
                                                },
                                                {
                                                    width: 100,
                                                    xtype: 'projectcombo',
                                                    name: 'project_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id')
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
                                                    width: 100,
                                                    xtype : 'datefield',
                                                    editable: false,
                                                    name: 'doc_date',
                                                    format : 'Y-m-d',
                                                    value: new Date(),
                                                    maxValue : new Date(),
                                                    emptyText: i18n('date')
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
                                            fieldLabel: _('requester'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'textfield',
                                                    name: 'requester',
                                                    emptyText: i18n('requester')
                                                },
                                                {
                                                    xtype:'departmentcombo',
                                                    name: 'department_id',
                                                    width:120
                                                }
                                            ]
                                        }
                                    ]
                                },
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
                                            fieldLabel: _('supplier'),
                                            items: [
                                                {
                                                    width: 100,
                                                    xtype: 'xtsupplier',
                                                    editable: false,
                                                    name: 'vend_id',
                                                    allowBlank: false,
                                                    emptyText: i18n('id'),
                                                    extraParams:'S'
                                                },
                                                {
                                                    width: 280,
                                                    xtype: 'textfield',
                                                    name: 'vend_name',
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
                        }, me.grid_detail
                    ],
                    listeners: {
                        render: function() {
                            this.items.each(function(i, index, items){
                                i.tab.on('click', function(){
                                    i.store.proxy.extraParams = {doc_id: me.doc_id};
                                    i.store.load()
                                });
                            });
                        }
                    }
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id;
                    me.store_detail.proxy.extraParams = {doc_id: me.doc_id};
                    me.store_detail.load({params:{doc_id: me.doc_id}});

                    // disable btn add detail //
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status ==1 || record.data.status==2){btn_add_detail.setDisabled(true);}
                    else{btn_add_detail.setDisabled(false);}
                }
            },
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins: [me.formEditing],
            columns: [
                //{text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('purchaseorder'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['vend_id',_('id')],['vend_name',_('supplier')],['requester',_('requester')],['department_id',_('departments')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {status:[0,1,2], field_name:me.field_name, field_search:field.value};
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
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditing.context.record.data.project_type = 'N';
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('project_type').setValue('P');
    },
    onNewDetail: function(){
        var me = this, plugin = me.grid_detail.editingPlugin;
        plugin.cancelEdit();
        me.store_detail.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing.context.record.data.doc_id = me.doc_id;
    },
    get_total:function(field){
        var me=this, form  = field.up('container'), panel = form.up('panel'),
            qty = panel.ownerCt.form.findField('qty'),
            tax_id = panel.ownerCt.form.findField('tax_id'),// tax
            price = panel.ownerCt.form.findField('price'),// harga
            price_ppn = panel.ownerCt.form.findField('price_ppn'),// harga ppn
            price_pph = panel.ownerCt.form.findField('price_pph'),// harga pph
            total_price = panel.ownerCt.form.findField('total_price'),// harga ppn
            total = panel.ownerCt.form.findField('total'); // total
        me.tax.store.proxy.extraParams = {field_name:'tax_id',field_search:tax_id.getValue()};
        me.tax.store.load({
            callback: function(records, operation, success) {
                ppn = records[0].data.rate_ppn;
                pph = records[0].data.rate_pph;
                price_ppn.setValue(price.getValue() * (ppn/100));
                price_pph.setValue(price.getValue() * (pph/100));
                total_price.setValue(price.getValue() + price_ppn.getValue() - price_pph.getValue());
                total.setValue(total_price.getValue() * qty.getValue());
            }
        });
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store.proxy.extraParams = {status:[0,1,2]};
        this.store.load();
        callback(true);
    }
});
