Ext.define('App.view.transactions.production.Production', {
    extend: 'App.ux.RenderPanel',
    id: 'panelProduction',
    pageTitle: _('production'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_salesorder = Ext.create('App.store.transactions.production.Production_salesorder',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_row_material_rm = Ext.create('App.store.transactions.production.Production_row_material_rm');
        me.store_row_material_fg = Ext.create('App.store.transactions.production.Production_row_material_fg');
        me.store_row_material = Ext.create('App.store.transactions.production.Production_row_material',{remoteSort: true, pageSize : 15, autoLoad: false});

        me.jurnal_rm = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_row_material_rm = Ext.create('Ext.grid.Panel', {
            store: me.store_row_material_rm,
            height:1000,
            title: _('use_of_raw_materials'),
            plugins: [
                me.edditing_rm = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.status_row_material==1 || me.status_row_material==2){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('no'),width: 60,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),width: 200,sortable: true,dataIndex: 'item_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity')+' Stock',width: 80,sortable: true,dataIndex: 'qty_last', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('unit'),width: 60,sortable: true,dataIndex: 'unit_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
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
                    store: [['item_id',_('id')],['item_name',_('name')],['qty',_('quantity')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store_row_material_rm.load({params:{field_name:me.field_name, field_search:field.value, start:0, limit:15}})}}}
                },
                {
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store: me.store_row_material_rm,
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    displayInfo: true
                }
            ]
        });
        me.grid_row_material_fg = Ext.create('Ext.grid.Panel', {
            store: me.store_row_material_fg,
            height:1000,
            title: _('production'),
            plugins: [
                me.edditing_fg = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.status_row_material==1 || me.status_row_material==2){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('no'),width: 60,sortable: true,dataIndex: 'seq_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),width: 200,sortable: true,dataIndex: 'item_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('quantity'),width: 80,sortable: true,dataIndex: 'qty',summaryType:'sum', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'), editor:{
                    xtype:'mitos.currency'
                }},
                {text: 'OER&KER',width: 80,sortable: true,dataIndex: 'production_prs',summaryType:'sum', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00%')},
                {text: _('unit'),width: 60,sortable: true,dataIndex: 'unit_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks', editor:{
                    xtype:'textfield'
                }}
            ],
            features: [{
                ftype: 'summary'
            }]/*,
            tbar: [
                {
                    xtype: 'button',
                    text: _('formula'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.use_formula
                }
            ]*/
        });

        me.grid_row_material = Ext.create('Ext.grid.Panel', {
            store: me.store_row_material,
            title :_('production'),
            autoScroll:false,
            plugins: [
                me.edditing_row_material = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'tabpanel',
                            layout: 'fit',
                            items:[
                                {
                                    xtype:'panel',
                                    title: _('production'),
                                    itemId:'production_row_material_panel',
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
                                                                    items: [
                                                                        {
                                                                            width: 200,
                                                                            fieldLabel: _('warehouse'),
                                                                            xtype: 'warehousecombo',
                                                                            editable: false,
                                                                            name: 'warehouse_id',
                                                                            extraParams :['PKS']
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
                                                                    fieldLabel: _('user'),
                                                                    items: [
                                                                        {
                                                                            width: 280,
                                                                            xtype: 'textfield',
                                                                            name: 'shift_user',
                                                                            emptyText: i18n('user')
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
                                        },me.jurnal_rm.grid
                                    ]
                                },me.grid_row_material_rm,  me.grid_row_material_fg/*, me.grid_row_material_rma, me.grid_row_material_coa*/
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            if(index > 0){
                                                i.store.proxy.extraParams = {doc_id:me.doc_id_row_material};
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
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_row_material.down('toolbar');
                    me.doc_id_row_material = record.data.doc_id; me.status_row_material = record.data.status;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.jurnal_rm.store.load({params:{doc_id:me.doc_id_row_material}});
                }
            },
            columns: [
                {text: _('no'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('user'),width: 100,sortable: true,dataIndex: 'shift_user'},
                {text: 'Wip',width: 100,sortable: true, renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return record.data.wip_type=='Y'?'Yes':'No';
                }},
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
                    store: [['doc_id',_('document')],['shift',_('shift')],['shift_user',_('user')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_row_material.proxy.extraParams = {for_doc_id: me.data.doc_id, field_name:me.field_name, field_search:field.value};
                        me.store_row_material.load({params:{start:0}});}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 15,
                store: me.store_row_material,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid_row_material ];
        me.callParent(arguments);
    },
    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditing_row_material.context.record.data.doc_type = 'RM';
        //plugin.editor.form.findField('warehouse_id').setValue('KBN');
        me.jurnal_rm.store.load();
    },
    onNewCost:function(btn, doc_id){

        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        store.data.items[0].data.doc_id= doc_id;
    },
    use_formula: function(packet){
        var me =this;
        Production_row_material_fg.formula({params:{doc_id:me.doc_id_row_material}}, function(provider, response){
            if (response.type == 'exception'){
                Ext.MessageBox.alert('Error', response.message);
            }else{
                me.store_row_material_fg.load();
            }
        });
    },
    get_total:function(field){
        var me=this, container  = field.up('fieldcontainer');
        var qty = container.items.items[0],
            price = container.items.items[1],// harga
            total = container.items.items[2];
            total.setValue(qty.getValue()*price.getValue());
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        this.store_row_material.load();
        callback(true);
    }
});
