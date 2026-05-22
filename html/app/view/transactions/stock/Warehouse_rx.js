
Ext.define('App.view.transactions.stock.Warehouse_rx', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('warehouse_rx'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_rm_detail = Ext.create('App.store.transactions.stock.Warehouse_tx_rx_detail',{remoteSort: true});
        me.store_fg_detail = Ext.create('App.store.transactions.stock.Warehouse_tx_rx_detail',{remoteSort: true});
        me.store_tx = Ext.create('App.store.transactions.stock.Warehouse_tx',{remoteSort: true});
        me.store = Ext.create('App.store.transactions.stock.Warehouse_rx',{remoteSort: true});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_rm_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_rm_detail,
            title: _('row_material'),
            height:1000,
            plugins: [
                me.edditing_rm = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' '+_('deivered'),width: 100,sortable: true,dataIndex: 'qty_last', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                },summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty',summaryType:'sum', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                        xtype:'mitos.currency'
                    }}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['item_id',_('id')],['item_name',_('name')],['remarks',_('remarks')],['qty',_('quantity')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_rm_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_rm_detail.loadPage(1);}}
                    }
                }
            ]
        });
        me.grid_fg_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_fg_detail,
            title: _('finish_goods'),
            height:1000,
            plugins: [
                me.edditing_fg = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 100,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' '+_('deivered'),width: 100,sortable: true,dataIndex: 'qty_last', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                },summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty',summaryType:'sum', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                        xtype:'mitos.currency'
                    }}
            ],
            features: [{
                ftype: 'summary'
            }],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['item_id',_('id')],['item_name',_('name')],['remarks',_('remarks')],['qty',_('quantity')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_fg_detail.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_fg_detail.loadPage(1);}}
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
                    me.data = record.data;
                    me.store_rm_detail.load({params:{doc_id:me.data.doc_id, item_type:['RM','RA']}});
                    me.store_fg_detail.load({params:{doc_id:me.data.doc_id, item_type:['FG']}});
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
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items:[
                        {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    layout: 'hbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            defaultType: 'textfield',
                                            title: _('received'),
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
                                                            fieldLabel: _('docdate'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype : 'datefield',
                                                                    editable: false,
                                                                    name: 'doc_date',
                                                                    format : 'Y-m-d',
                                                                    value: new Date(),
                                                                    maxValue : new Date(),
                                                                    emptyText: i18n('docdate'),
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
                                                            fieldLabel: _('warehouse'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'warehousecombo',
                                                                    name: 'to_warehouse_id',
                                                                    readOnly: true,
                                                                    emptyText: i18n('from'),
                                                                    fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                        }, me.grid_rm_detail, me.grid_fg_detail
                                    ],
                                    listeners: {
                                        render: function() {
                                            this.items.each(function(i, index, items){
                                                i.tab.on('click', function(){
                                                    if(index==1){
                                                        i.store.proxy.extraParams = {doc_id: me.data.doc_id, item_type:  ['RM','RA']};
                                                        i.store.load();
                                                    }else if(index==2){
                                                        i.store.proxy.extraParams = {doc_id: me.data.doc_id, item_type:  ['FG']};
                                                        i.store.load();
                                                    }
                                                });
                                            });
                                        }
                                    }
                                },me.jurnal.grid

                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('warehouse'),width: 100,sortable: true,dataIndex: 'to_warehouse_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('received'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['to_warehouse',_('warehouse')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'R', field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
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
        me.grid_tx = Ext.create('Ext.grid.Panel', {
            store: me.store_tx,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.for_doc_id = record.data.doc_id; me.to_warehouse_id = record.data.to_warehouse_id;
                    me.from_warehouse_id = record.data.from_warehouse_id;
                    me.store.proxy.extraParams ={doc_type:'R', for_doc_id: me.for_doc_id};
                    me.store.load();
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: _('received'),
                        width: 1100,
                        height: 400,
                        items:[me.grid],
                        modal:true
                    });
                    me.GridShow.show();
                }
            },
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('from')+' '+_('warehouse'),width: 100,sortable: true,dataIndex: 'from_warehouse_id'},
                {text: _('to')+' '+_('warehouse'),width: 100,sortable: true,dataIndex: 'to_warehouse_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['from_warehouse_id', _('from')+' '+_('warehouse')],['to_warehouse', _('to')+' '+_('warehouse')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_tx.proxy.extraParams = {doc_type:'T', field_name:me.field_name, field_search:field.value};
                        me.store_tx.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_tx,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.pageBody = [me.grid_tx];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing.context.record.data.doc_type = 'R';
        me.edditing.context.record.data.for_doc_id = me.for_doc_id;
        me.edditing.context.record.data.from_warehouse_id = me.from_warehouse_id;
        plugin.editor.form.findField('to_warehouse_id').setValue(me.to_warehouse_id);
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store_tx.load({params:{doc_type:'T'}});
        callback(true);
    }
});
