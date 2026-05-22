
Ext.define('App.view.transactions.stock.Stock_in', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('stock_in'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_detail = Ext.create('App.store.transactions.stock.Stock_in_detail',{remoteSort: true, groupField: 'formula_name'});
        me.store = Ext.create('App.store.transactions.stock.Stock_in',{remoteSort: true});

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('items_plantation'),
            height:1000,
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false
                })
            ],
            columns: [
                {text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'item_name'},
                /*{text: _('janjang'),width: 100,sortable: true,dataIndex: 'janjang', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                editor:{
                xtype:'mitos.currency'
                }},
                {text: _('bjr'),width: 100,sortable: true,dataIndex: 'bjr', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                editor:{
                xtype:'mitos.currency'
                }},*/
                {text: _('quantity'),width: 100,sortable: true,readOnly: true,dataIndex: 'qty', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                editor:{
                xtype:'mitos.currency'
                }},
                {text: _('unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['item_id',_('id')],['item_name',_('name')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_detail.proxy.extraParams = {doc_id:me.data.doc_id, field_name:me.field_name, field_search:field.value};
                        me.store_detail.loadPage(1);}}
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
                            xtype: 'tabpanel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: _('stock_in'),
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
                                                    fieldLabel: _('afdeling'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtafdeling',
                                                            editable: false,
                                                            name: 'afdeling_id',
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
                                                    fieldLabel: _('warehouse'),
                                                    items: [
                                                        {
                                                            width: 150,
                                                            xtype: 'warehousecombo',
                                                            name: 'warehouse_id',
                                                            allowBlank: false,
                                                            emptyText: i18n('warehouse'),
                                                            extraParams :['PKS']
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
                                                i.store.proxy.extraParams = {doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id};
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
                //{text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('afdeling'),width: 100,sortable: true,dataIndex: 'afdeling_name'},
                {text: _('warehouse'),width: 100,sortable: true,dataIndex: 'warehouse_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: 'Reclass TM',width: 80,sortable: true,dataIndex: 'reclass_tm'},
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
                    store: [['project_name',_('project')],['doc_id',_('document')],['afdeling_name',_('afdeling')],['warehouse_name',_('warehouse')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
        me.edditing.context.record.data.project_type = 'N';
        plugin.editor.form.findField('doc_date').setValue(new Date());
    },
    load_stock: function(){
        var me=this,  toolbar = me.grid_detail.down('toolbar'),
            item_type = toolbar.items.items[0];
        me.store_detail.proxy.extraParams ={doc_date:me.data.doc_date, doc_id:me.data.doc_id, project_id:me.data.project_id, warehouse_id:me.data.warehouse_id, item_type:item_type.getValue(), start:0};
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
        me.store.load();
        callback(true);
    }
});
