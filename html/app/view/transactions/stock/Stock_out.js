
Ext.define('App.view.transactions.stock.Stock_out', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('stock_out_kebun'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_detail = Ext.create('App.store.transactions.stock.Stock_out_detail',{remoteSort: true});
        me.store = Ext.create('App.store.transactions.stock.Stock_out',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal_tm = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.jurnal_tbm = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_tm_detail = Ext.create('Ext.grid.Panel', {
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
                {text: _('account'),width: 100,sortable: true,dataIndex: 'coa_id', 
                    editor:{
                        xtype: 'xtaccount',
                        editable: false,
                        extraParams:{coa_parent:'5.1'}
                }},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'coa_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                {text:'stock',width: 80,sortable: true,dataIndex: 'qty_stock', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                    xtype:'mitos.currency'
                }}
                
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
        me.grid_tbm_detail = Ext.create('Ext.grid.Panel', {
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
                {text: _('account'),width: 100,sortable: true,dataIndex: 'coa_id', 
                    editor:{
                        xtype: 'xtaccount',
                        editable: false,
                        extraParams:{coa_parent:'1.3'}
                }},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'coa_name'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                {text:'stock',width: 80,sortable: true,dataIndex: 'qty_stock', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                    xtype:'mitos.currency'
                }}
                
            
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
        me.grid_tm = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title :'Perawatan TM',
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_tm.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    
                    me.jurnal_tm.store.load({params:{doc_id:me.data.doc_id}});
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
                me.edditingTM = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            title: 'TM',
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
                                                            items: [
                                                                {
                                                                    fieldLabel: _('warehouse'),
                                                                    xtype: 'warehousecombo',
                                                                    width: 200,
                                                                    name: 'warehouse_id',
                                                                    editable: false,
                                                                    allowBlank: false,
                                                                    emptyText: i18n('warehouse'),
                                                                    extraParams :['KEBUN']
                                                                },
                                                                {
                                                                    fieldLabel: _('type'),
                                                                    xtype: 'combo',
                                                                    width: 200,
                                                                    name: 'tbs_type',
                                                                    editable: false,
                                                                    value:'I',
                                                                    allowBlank:false,
                                                                    mode:'local',
                                                                    store: [['I','Inti'],['P','Plasma']],
                                                                    listeners:{
                                                                        change:function(f){
                                                                            var plugin = me.grid_tm.editingPlugin,
                                                                                vend_id = plugin.editor.form.findField('vend_id') ; 
                                                                            if(f.value=='I'){
                                                                                vend_id.setDisabled(true);
                                                                            }else{
                                                                                vend_id.setDisabled(false);
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
                                                            fieldLabel: _('afdeling'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtafdeling',
                                                                    editable: false,
                                                                    name: 'afdeling_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'afdeling_name',
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
                                                            fieldLabel: _('supplier'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtsupplier',
                                                                    editable: false,
                                                                    name: 'vend_id',
                                                                    allowBlank: false,
                                                                    disabled:true,
                                                                    emptyText: i18n('id'),
                                                                    extraParams:['S']
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
                                                            fieldLabel: _('cost_category'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtol_type',
                                                                    name: 'ol_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
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
                                        }, me.grid_tm_detail
                                    ],
                                    listeners: {
                                        render: function() {
                                            this.items.each(function(i, index, items){
                                                i.tab.on('click', function(){
                                                    if(index>0){
                                                        var toolbar = me.grid_tm_detail.down('toolbar'), item_type = toolbar.items.items[0];
                                                        i.store.proxy.extraParams = {doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id, item_type:item_type.getValue()};
                                                        i.store.load();
                                                    }

                                                });
                                            });
                                        }
                                    }
                                },me.jurnal_tm.grid

                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('warehouse'),width: 100,sortable: true, align:'center', dataIndex: 'warehouse_id'},
                {text: _('afdeling'),width: 100,sortable: true,dataIndex: 'afdeling_name'},
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
                    handler: me.onNewDataTM
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['afdeling_name',_('afdeling')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'TM', field_name:me.field_name, field_search:field.value};
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
        me.grid_tbm = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title :'BBP TBM',
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_tbm.down('toolbar'); me.data = record.data;
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    
                    me.jurnal_tbm.store.load({params:{doc_id:me.data.doc_id}});
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
                me.edditingTBM = Ext.create('App.ux.grid.RowFormEditing', {
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
                                            title: 'TBM',
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
                                                            fieldLabel: _('warehouse'),
                                                            items: [
                                                                {
                                                                    xtype: 'warehousecombo',
                                                                    width: 100,
                                                                    name: 'warehouse_id',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    emptyText: i18n('warehouse'),
                                                                    extraParams :['KEBUN']
                                                                },
                                                                {
                                                                    xtype:'combo',
                                                                    editable: false,
                                                                    name: 'traksi_type',
                                                                    width:130,
                                                                    mode:'local',
                                                                    store: [['T','TRAKSI'], ['N','NON-TRAKSI']],
                                                                    emptyText   : _('select'),
                                                                    allowBlank:false,
                                                                    listeners:{
                                                                        change:function(field){
                                                                            if(field.value=='T'){
                                                                                Ext.ComponentQuery.query('#kendaraan_tbm')[0].setDisabled(false);
                                                                                Ext.ComponentQuery.query('#kendaraan_tbm')[0].show();
                                                                            }else if(field.value=='N'){
                                                                                Ext.ComponentQuery.query('#kendaraan_tbm')[0].setDisabled(true);
                                                                                Ext.ComponentQuery.query('#kendaraan_tbm')[0].hide();
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
                                                            fieldLabel: _('afdeling'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtafdeling',
                                                                    editable: false,
                                                                    name: 'afdeling_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')
                                                                },
                                                                {
                                                                    width: 280,
                                                                    xtype: 'textfield',
                                                                    name: 'afdeling_name',
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
                                                            fieldLabel: _('cost_category'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtol_type',
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
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout:'anchor',
                                                    flex:1,
                                                    itemId:'kendaraan_tbm',
                                                    items: [
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
                                                }
                                            ]
                                        }, me.grid_tbm_detail
                                    ],
                                    listeners: {
                                        render: function() {
                                            this.items.each(function(i, index, items){
                                                i.tab.on('click', function(){
                                                    if(index>0){
                                                        var toolbar = me.grid_tbm_detail.down('toolbar'), item_type = toolbar.items.items[0];
                                                        i.store.proxy.extraParams = {doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id, item_type:item_type.getValue()};
                                                        i.store.load();
                                                    }

                                                });
                                            });
                                        }
                                    }
                                },me.jurnal_tbm.grid

                            ]
                        }
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('warehouse'),width: 100,sortable: true, align:'center', dataIndex: 'warehouse_id'},
                {text: _('afdeling'),width: 100,sortable: true,dataIndex: 'afdeling_name'},
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
                    handler: me.onNewDataTBM
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['afdeling_name',_('afdeling')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'TBM', field_name:me.field_name, field_search:field.value};
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
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid_tbm,me.grid_tm],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index==0){
                                i.store.proxy.extraParams = {doc_type:'TBM'};
                            }else if(index==1){
                                i.store.proxy.extraParams = {doc_type:'TM'};
                            }
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);
    },
    onNewDataTM: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditingTM.context.record.data.project_type = 'N';
        me.edditingTM.context.record.data.doc_type = 'TM';
        plugin.editor.form.findField('doc_date').setValue(new Date());
        me.jurnal_tm.store.load();
    },
    onNewDataTBM: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.edditingTBM.context.record.data.project_type = 'N';
        me.edditingTBM.context.record.data.doc_type = 'TBM';
        plugin.editor.form.findField('doc_date').setValue(new Date());
        plugin.editor.form.findField('traksi_type').setValue('N');
        me.jurnal_tbm.store.load();
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
        me.store.proxy.extraParams ={doc_type:'TBM'};
        me.store.load();
        callback(true);
    }
});
