
Ext.define('App.view.transactions.purchase_order.Borrow_items_return', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('borrow_items_return'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.purchase_order.Borrow_items_return',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_borrow = Ext.create('App.store.transactions.purchase_order.Borrow_items',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid_borrow = Ext.create('Ext.grid.Panel', {
            store: me.store_borrow,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    me.data = record.data;
                    me.store.proxy.extraParams = {for_doc_id: me.data.doc_id};
                    me.store.load();
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: _('return'),
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
                    return (record.get('qty')-record.get('qty_return') <= 0 ? 'child-row' : '');
                }
            },
            columns: [
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'doc_type', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        return record.data.doc_type == 'I' ? _('in') :_('out');
                    }},
                {text: _('supplier') +' / '+_('customer'),width: 150,sortable: true,dataIndex: 'vend_cust_name'},
                {text: _('item'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity_return'),width: 100,sortable: true,dataIndex: 'qty_return', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'qty_outstanding', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['vend_name',_('supplier')],['cust_name',_('customer')],['item_name',_('item')],['qty',_('quantity')],['qty_return',_('quantity_return')],['qty_outstanding',_('outstanding')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_borrow.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_borrow.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_borrow,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
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
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    layout: 'hbox',
                                    flex:1,
                                    items: [
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
                                                    fieldLabel: _('project'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'projecttypecombo',
                                                            name: 'project_type',
                                                            readOnly: true,
                                                            emptyText: i18n('type'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'projectcombo',
                                                            name: 'project_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
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
                                                    fieldLabel: _('costcode'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcostcode',
                                                            editable: false,
                                                            name: 'costcode_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            extraParams:{doc_type:'B', project_id:'-'},
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
                                                            emptyText: i18n('id'),
                                                            fieldStyle: 'font-weight: bold; color: #003168; background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'doc_type',
                                                            width:100,
                                                            mode:'local',
                                                            store: [['P',_('payment')],['I',_('item')],['C',_('cancel')]],
                                                            emptyText   : _('type'),
                                                            allowBlank:false,
                                                            listeners:{
                                                                change:function(field){
                                                                    var container = field.up('container'), panel = container.up('panel'),
                                                                        total_price = panel.ownerCt.form.findField('total_price'),
                                                                        cash_id = panel.ownerCt.form.findField('cash_id'),
                                                                        cflow_id = panel.ownerCt.form.findField('cflow_id'),
                                                                        total_price = panel.ownerCt.form.findField('total_price');
                                                                    if(field.value=='P'){
                                                                        if(me.data.doc_type=='I'){
                                                                            total_price.setDisabled(true);
                                                                        }else{
                                                                            total_price.setDisabled(false);
                                                                        }
                                                                        cash_id.setDisabled(false); cflow_id.setDisabled(false);
                                                                    }else if(field.value=='I' || field.value=='C'){
                                                                        total_price.setDisabled(true); cash_id.setDisabled(true); cflow_id.setDisabled(true);
                                                                    }
                                                                }
                                                            }
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
                                                    items: [
                                                        {
                                                            width: 250,
                                                            fieldLabel: _('warehouse'),
                                                            xtype: 'warehousecombo',
                                                            name: 'warehouse_id',
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 250,
                                                            xtype : 'typescombo',
                                                            fieldLabel: _('type'),
                                                            name: 'item_type',
                                                            readOnly: true,
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
                                                    fieldLabel: _('cashbank'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcashbank',
                                                            editable: false,
                                                            name: 'cash_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['C','B']
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'cash_name',
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
                                                    fieldLabel: _('cashflow'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtcashflow',
                                                            editable: false,
                                                            name: 'cflow_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:'I'
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'cflow_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                },

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
                                                    fieldLabel: _('item'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtitems',
                                                            name: 'item_id',
                                                            readOnly: true,
                                                            emptyText: i18n('id'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                            width: 100,
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
                                                    fieldLabel: _('price'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'total_price',
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
                                                            width: 130,
                                                            xtype: 'mitos.currency',
                                                            name: 'total',
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
                        },me.jurnal.grid
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'doc_type', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                        return record.data.doc_type == 'P' ? _('payment') : (record.data.doc_type == 'I' ? _('item') : _('cancel'));
                    }},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'total_price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('borrow_items_return'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewUser
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['qty',_('quantity')],['total_price',_('price')],['total',_('subtotal')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = { for_doc_id:me.data.doc_id, field_name:me.field_name, field_search:field.value};
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
        me.pageBody = [ me.grid_borrow ];
        me.callParent(arguments);
    },
    onNewUser: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing.context.record.data.for_doc_id = me.data.doc_id;
        me.edditing.context.record.data.vend_id = me.data.vend_id;
        me.edditing.context.record.data.cust_id = me.data.cust_id;
        me.edditing.context.record.data.project_id = me.data.project_name;
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('project_type').setValue(me.data.project_type);
        plugin.editor.form.findField('project_id').setValue(me.data.project_id);
        plugin.editor.form.findField('costcode_id').setValue(me.data.costcode_id);
        plugin.editor.form.findField('costcode_name').setValue(me.data.costcode_name);
        plugin.editor.form.findField('warehouse_id').setValue(me.data.warehouse_id);
        plugin.editor.form.findField('item_type').setValue(me.data.item_type);
        plugin.editor.form.findField('item_id').setValue(me.data.item_id);
        plugin.editor.form.findField('item_name').setValue(me.data.item_name);
        plugin.editor.form.findField('unit_id').setValue(me.data.unit_id);
        if(me.data.doc_type=='I'){
            plugin.editor.form.findField('cflow_id').extraParams='O';
        }else{
            plugin.editor.form.findField('cflow_id').extraParams='I';
        }
    },
    get_total:function(field){
      var me=this, container = field.up('container'), panel = container.up('panel'),
          qty  = panel.ownerCt.form.findField('qty'),
          total_price = panel.ownerCt.form.findField('total_price'),
          total = panel.ownerCt.form.findField('total');
        total.setValue(qty.getValue()*total_price.getValue());

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store_borrow.proxy.extraParams = {};
        this.store_borrow.load();
        callback(true);
    }
});
