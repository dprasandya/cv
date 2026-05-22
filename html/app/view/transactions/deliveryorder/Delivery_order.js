Ext.define('App.view.transactions.deliveryorder.Delivery_order', {
    extend: 'App.ux.RenderPanel',
    id: 'panelDelivery_order',
    pageTitle: _('deliveryorder'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.deliveryorder.Delivery_order',{remoteSort: true, pageSize : 15, autoLoad: true});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            autoScroll:false,
            plugins: [
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items:[
                        {
                            layout: 'hbox',
                            items:[
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
                                                            width: 180,
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
                                                            emptyText: i18n('docdate'),
                                                            allowBlank:false
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'warehousecombo',
                                                            editable: false,
                                                            name: 'warehouse_id',
                                                            extraParams:['PKS'],
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
                                                    fieldLabel: _('type'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'doc_type',
                                                            width:100,
                                                            mode:'local',
                                                            store: [['D','Delivery'],['R','Return'],['F','Fail']],
                                                            emptyText   : _('select'),
                                                            allowBlank:false,
                                                            listeners:{
                                                                change:function(field){
                                                                    var textfield = field.up('fieldcontainer');
                                                                    if(field.value=='R'){
                                                                        textfield.items.items[1].setDisabled(true);
                                                                        textfield.items.items[2].setDisabled(false);
                                                                    }else if(field.value=='F'){
                                                                        textfield.items.items[1].setDisabled(false);
                                                                        textfield.items.items[2].setDisabled(false);
                                                                    }
                                                                    else{
                                                                        textfield.items.items[1].setDisabled(true);
                                                                        textfield.items.items[2].setDisabled(true);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 100,
                                                            xtype: 'xtaccount',
                                                            editable: false,
                                                            name: 'coa_fail',
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 180,
                                                            xtype: 'xtdelivery_order',
                                                            name: 'doc_return',
                                                            allowBlank: false,
                                                            disabled: false,
                                                            extraParams : me
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
                                                            extraParams:['C'],
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                    fieldLabel: _('item'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtitems',
                                                            name: 'item_id',
                                                            editable: false,
                                                            extraParams:['FG'],
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
                                                /*{
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('route'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtroute',
                                                            name: 'route_id',
                                                            editable: false
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'route_name',
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
                                                    fieldLabel: _('quantity'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'qty',
                                                            allowBlank:false,
                                                            enableKeyEvents: true,
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
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                },
                scroll:false,
                style:{overflow: 'auto',overflowX: 'hidden'}
            },
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id; me.status= record.data.status;
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            columns: [
                {text: _('no'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 80,sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        return record.data.doc_type=='D' ? 'Delivery' : (record.data.doc_type=='R' ? 'Return' : 'Fail') ;
                    }},
                {text: _('warehouse'),width: 100,sortable: true,dataIndex: 'warehouse_id'},
                {text: _('item'),width: 100,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('detail'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDetail
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['warehouse_id',_('warehouse')],['qty',_('quantity')],['item_name',_('item')],['remarks',_('remarks')]],
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
                pageSize: 15,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.jurnal.store.load();
    },
    get_total:function(field){
        var me=this, form  = field.up('container'), panel = form.up('panel'),
            qty = panel.ownerCt.form.findField('qty'),
            price = panel.ownerCt.form.findField('price'),// price
            total = panel.ownerCt.form.findField('total'); // total
        total.setValue(qty.getValue()*price.getValue());
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
