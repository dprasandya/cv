Ext.define('App.view.transactions.purchase_order.Goods_received', {
    extend: 'App.ux.RenderPanel',
    id: 'panelGoods_received',
    pageTitle: _('goodsreceived'),
    initComponent: function(){
        var me = this;
        me.for_doc_id=''; me.item_id='';
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.purchase_order.Goods_received',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.purchase_order.Goods_received_detail',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            plugins: [
                me.edditing = Ext.create('App.ux.grid.RowFormEditing', {
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
                                                    fieldLabel: _('type'),
                                                    items: [
                                                        {
                                                            xtype:'combo',
                                                            editable: false,
                                                            name: 'doc_type',
                                                            width:100,
                                                            mode:'local',
                                                            store: [['T','Received'],['R','Return']],
                                                            emptyText   : _('select'),
                                                            allowBlank:false,
                                                            listeners:{
                                                                change:function(field){
                                                                    var textfield = field.up('fieldcontainer');
                                                                    if(field.value=='R'){
                                                                        textfield.items.items[1].setDisabled(false);
                                                                    }else{
                                                                        textfield.items.items[1].setDisabled(true);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 180,
                                                            xtype: 'xtgoods_received',
                                                            name: 'doc_return',
                                                            allowBlank: false,
                                                            disabled: false,
                                                            extraParams : {
                                                               params: me
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
                                                /*{
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    fieldLabel: _('trucking'),
                                                    hidden : true,
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtsupplier',
                                                            editable: false,
                                                            name: 'transporter_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:'T'
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            name: 'transporter_name',
                                                            readOnly: true,
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        }
                                                    ]
                                                },*/
                                                
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
                                            itemId:'cont_price_grn',
                                            items:[
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
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'qty',
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
                                                    fieldLabel: _('price')+' Ppn, Pph',
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'mitos.currency',
                                                            name: 'price',
                                                            allowBlank:false,
                                                            enableKeyEvents: true,
                                                            emptyText: i18n('price'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;'
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
                }
            },
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_detail.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            columns: [
                {text: _('no'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('type'),width: 80,sortable: true,dataIndex: 'doc_type', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.doc_type == 'R' ? 'RETURN' :'RECEIVED';
                }},
                {text: _('item'),flex: 1,sortable: true,dataIndex: 'item_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right', renderer: function (value, meta, record, rowIndex, colIndex, store) {
                    return record.data.doc_type == 'R' ? (value*(-1)) : value ;
                },summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'}
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
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['doc_type',_('type')],['qty',_('quantity')],['price',_('price')],['transporter_id',_('trucking')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {for_doc_id: me.data.doc_id, item_id: me.data.item_id, field_name:me.field_name, field_search:field.value, start:0};
                        me.store_detail.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 15,
                store: me.store_detail,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    me.data = record.data; me.for_doc_id= record.data.doc_id; me.item_id=record.data.item_id;
                    me.store_detail.proxy.extraParams = {for_doc_id: me.data.doc_id, item_id: me.data.item_id};
                    me.store_detail.load({params:{for_doc_id:me.data.doc_id, item_id:me.data.item_id}});
                    var add_button = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status==3 || record.data.status==2){add_button.setDisabled(true)}else {add_button.setDisabled(false)}
                    me.GridShow= Ext.create('App.ux.window.Window',{
                        layout: 'fit',
                        title: me.data.vend_name+' - Item : '+me.data.item_name+' - Qty : '+me.data.qty,
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
                    return record.get('status')=='3' ? 'yellow-row' : (record.get('status')=='2' ? 'adult-row' : (record.get('qty')-record.get('qty_grn') <= 0 ? 'child-row' : '') );
                }
            },
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('item'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' Po',width: 100,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity')+' Grn',width: 100,sortable: true,dataIndex: 'qty_grn', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true, align:'right',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.qty - record.data.qty_grn;
                        return Ext.util.Format.number(returnString, '0,000.00');
                    }},
                {text: _('warehouse'),width: 100,sortable: true,dataIndex: 'warehouse_name'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('document')+' Grn'],['vend_name',_('supplier')],['remarks',_('remarks')],['item_name',_('items')],['qty',_('quantity')+' Po'],['qty_grn',_('quantity')+' Grn'],['warehouse_name',_('warehouse')]],
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing.context.record.data.for_doc_id = me.data.doc_id;
        me.edditing.context.record.data.vend_id = me.data.vend_id;

        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('item_id').setValue(me.data.item_id);
        plugin.editor.form.findField('item_name').setValue(me.data.item_name);
        plugin.editor.form.findField('unit_id').setValue(me.data.unit_id);
        plugin.editor.form.findField('price').setValue(me.data.price);
        plugin.editor.form.findField('price_ppn').setValue(me.data.price_ppn);
        plugin.editor.form.findField('price_pph').setValue(me.data.price_pph);
        plugin.editor.form.findField('total_price').setValue(me.data.total_price);
        me.jurnal.store.load();
    },
    get_total:function(field){
        var form  = field.up('container'), panel = form.up('panel'),
            qty = panel.ownerCt.form.findField('qty'), //Ext.ComponentQuery.query('[name=qty]', container)[0],
            price = panel.ownerCt.form.findField('price'), //Ext.ComponentQuery.query('[name=price]', container)[0],// harga
            price_ppn = panel.ownerCt.form.findField('price_ppn'), //Ext.ComponentQuery.query('[name=price_ppn]', container)[0],// harga ppn
            price_pph = panel.ownerCt.form.findField('price_pph'), //Ext.ComponentQuery.query('[name=price_pph]', container)[0],// harga pph
            total_price = panel.ownerCt.form.findField('total_price'), //Ext.ComponentQuery.query('[name=total_price]', container)[0],// total harga
            total = panel.ownerCt.form.findField('total'); //Ext.ComponentQuery.query('[name=total]', container)[0]; // total

        total.setValue(total_price.getValue() * qty.getValue());
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
