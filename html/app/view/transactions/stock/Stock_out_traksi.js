
Ext.define('App.view.transactions.stock.Stock_out_traksi', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('stock_out_traksi'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.stock.Stock_out_traksi',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.stock.Stock_out_detail',{remoteSort: true});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('row_material'),
            height:1000,
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            if(me.data.status==1 || me.data.status==2 || me.data.status==3){
                                return false;
                            }
                        }
                    }
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                {text:'stock',width: 80,sortable: true,dataIndex: 'qty_stock', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('account'),width: 100,sortable: true,dataIndex: 'coa_id', 
                    editor:{
                        xtype: 'xtaccount',
                        editable: false,
                        extraParams:{coa_parent:'5.1'}
                }},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'coa_name'}
            ],
            tbar: [
                {
                    width: 120,
                    xtype : 'typescombo',
                    emptyText: i18n('item'),
                    extraParams:['RM','RA'],
                    listeners:{
                        change:function(field, e){
                            me.item_type = field.value;
                            me.load_stock(field);
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['item_id',_('id')],['item_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id, item_type:me.item_type, field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
                    }
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    
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
                                            title: _('traksi'),
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
                                                            fieldLabel: _('kendaraan') + _('id') ,
                                                            items: [
                                                                {
                                                                    xtype: 'xtkendaraan',
                                                                    width: 100,
                                                                    name: 'kendaraan_id',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 150,
                                                                    xtype: 'textfield',
                                                                    name: 'nopol',
                                                                    readOnly: true,
                                                                    emptyText: i18n('nopol'),
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
                                                                    xtype: 'warehousecombo',
                                                                    width: 100,
                                                                    name: 'warehouse_id',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    emptyText: i18n('warehouse'),
                                                                    //extraParams :['KEBUN']
                                                                },
                                                                {
                                                                    width: 200,
                                                                    xtype: 'xtol_type',
                                                                    fieldLabel: 'Category',
                                                                    name: 'ol_id',
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
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype : 'timefield',
                                                                    fieldLabel: _('time_from'),
                                                                    name: 'jam_mulai',
                                                                    format : 'H:i:s',
                                                                    emptyText: i18n('time_from')
                                                                },
                                                                {
                                                                    width: 200,
                                                                    xtype : 'timefield',
                                                                    fieldLabel: _('time_to'),
                                                                    name: 'jam_selesai',
                                                                    format : 'H:i:s',
                                                                    emptyText: i18n('time_to')
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
                                                            fieldLabel: 'Kilometer',
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'km_mulai',
                                                                    emptyText: i18n('mulai'),
                                                                },
                                                                {
                                                                    width: 200,
                                                                    fieldLabel: 'Sampai',
                                                                    xtype: 'mitos.currency',
                                                                    name: 'km_selesai',
                                                                    emptyText: i18n('selesai'),
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
                                        }, me.grid_detail
                                    ],
                                    listeners: {
                                        render: function() {
                                            this.items.each(function(i, index, items){
                                                i.tab.on('click', function(){
                                                    if(index>0){
                                                        var toolbar = me.grid_detail.down('toolbar'), item_type = toolbar.items.items[0];
                                                        i.store.proxy.extraParams = {doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id, item_type:item_type.getValue()};
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
                //{text: _('warehouse'),width: 100,sortable: true,dataIndex: 'warehouse_name'},
                {text: _('id'),width: 100,sortable: true,dataIndex: 'kendaraan_id'},
                {text: 'Nopol',width: 150,sortable: true,dataIndex: 'nopol'},
                {text: _('time_from'),width: 80,sortable: true,dataIndex: 'jam_mulai'},
                {text: _('time_to'),width: 80,sortable: true,dataIndex: 'jam_selesai'},
                {text: 'KM',width: 60,sortable: true,dataIndex: 'km_mulai', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'KM',width: 60,sortable: true,dataIndex: 'km_selesai', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                    store: [['doc_id',_('document')],['kendaraan_id',_('vehicle')],['nopol','Nopol'],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'TRK', field_name:me.field_name, field_search:field.value};
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

        me.pageBody = [me.grid];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);        
        me.edditing.context.record.data.doc_type = 'TRK';
        plugin.editor.form.findField('doc_date').setValue(new Date());
    },
    load_stock: function(f){
        var me=this;
        me.store_detail.proxy.extraParams ={doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id, item_type:me.item_type, start:0};
        me.store_detail.load();
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store.proxy.extraParams ={doc_type:'TRK'};
        me.store.load();
        callback(true);
    }
});
