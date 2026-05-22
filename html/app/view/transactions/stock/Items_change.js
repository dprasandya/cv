
Ext.define('App.view.transactions.stock.Items_change', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('items_change'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.stock.Items_change',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_jurnal = Ext.create('App.store.transactions.stock.JurnalItems_change',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('items_change'),
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    enableRemove : true,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            var item_type = e.record.data.item_type, plugin = e.grid.editingPlugin;
                            plugin.editor.form.findField('item_id_new').extraParams = [item_type];
                        }
                    }
                })
            ],
            columns: [
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('costcode'),width: 100,sortable: true,dataIndex: 'costcode_name'},
                {text: _('warehouse'),width: 80,sortable: true,dataIndex: 'warehouse_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id')+' Stock',width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name')+' Stock',width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' Stock',width: 100,sortable: true,dataIndex: 'qty_stock', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('id')+' '+_('new'),width: 80,sortable: true,dataIndex: 'item_id_new',
                    editor:{
                        xtype:'xtitems',
                        editable: false
                    }},
                {text: _('name')+' '+_('new'),width: 150,sortable: true,dataIndex: 'item_name_new',
                    editor:{
                        xtype:'textfield',
                        readOnly: true,
                        fieldStyle:'background-color: #F2F3F4; background-image: none;'
                    }},
                {text: _('unit')+' '+_('new'),width: 80,sortable: true,dataIndex: 'unit_id_new',
                    editor:{
                        xtype:'textfield',
                        readOnly: true,
                        fieldStyle:'background-color: #F2F3F4; background-image: none;'
                    }},
                {text: _('quantity')+' '+_('new'),width: 100,sortable: true,dataIndex: 'qty_new', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                    xtype:'textfield',
                    editable: false
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield',
                    editable: false
                }},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',editor:{
                    xtype:'checkbox',
                    editable: false
                }}
            ],
            tbar: [
                {
                    width: 100,
                    xtype : 'datefield',
                    editable: false,
                    format : 'Y-m-d',
                    value : new Date(),
                    maxValue : new Date(),
                    emptyText: i18n('docdate'),
                    listeners:{
                        change:function(field, e){
                            me.doc_date = field.value;
                            me.load_stock();
                        }
                    }
                },
                {
                    width: 120,
                    xtype : 'projectcombo',
                    emptyText: i18n('project'),
                    listeners:{
                        change:function(field, e){
                            me.project_id = field.value;
                            me.load_stock();
                        }
                    }
                },
                {
                    width: 120,
                    xtype : 'typescombo',
                    emptyText: i18n('item'),
                    listeners:{
                        change:function(field, e){
                            me.item_type = field.value;
                            me.load_stock();
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['warehouse_id',_('warehouse')],['item_id',_('id')+' Stock'],['item_name',_('name')+' Stock'],['unit_id',_('unit')],['qty_stock',_('quantity')+' Stock'],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_date:me.doc_date, project_id:me.project_id, item_type:me.item_type, field_name:me.field_name, field_search:field.value, start:0};
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
        me.grid_jurnal = Ext.create('Ext.grid.Panel', {
            store: me.store_jurnal,
            title: _('jurnal'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_jurnal.down('toolbar');
                    useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    readOnly: true,
                                    title: _('old'),
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
                                                    fieldLabel: _('date'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'datefield',
                                                            editable: false,
                                                            name: 'doc_date',
                                                            format : 'Y-m-d',
                                                            value: new Date(),
                                                            maxValue : new Date(),
                                                            emptyText: i18n('date'),
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
                                                    items: [
                                                        {
                                                            fieldLabel: _('warehouse'),
                                                            width: 200,
                                                            xtype: 'warehousecombo',
                                                            name: 'warehouse_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            fieldLabel: _('quantity')+' Stock',
                                                            width: 250,
                                                            xtype: 'mitos.currency',
                                                            name: 'qty_stock',
                                                            allowBlank:false,
                                                            emptyText: i18n('quantity'),
                                                            enableKeyEvents: true,
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
                                                    fieldLabel: _('item'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtitems',
                                                            name: 'item_id',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['RM','RA','FG'],
                                                            readOnly: true,
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
                                    readOnly: true,
                                    title: _('new'),
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
                                                            name: 'item_id_new',
                                                            editable: false,
                                                            emptyText: i18n('id'),
                                                            extraParams:['RM','RA','FG'],
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 198,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'item_name_new',
                                                            emptyText: i18n('name'),
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                                        },
                                                        {
                                                            width: 80,
                                                            xtype: 'textfield',
                                                            name: 'unit_id_new',
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
                                                            name: 'qty_new',
                                                            allowBlank:false,
                                                            emptyText: i18n('quantity'),
                                                            enableKeyEvents: true,
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
                                                    fieldLabel: _('remarks'),
                                                    items: [
                                                        {
                                                            width: 380,
                                                            height: 50,
                                                            xtype: 'textarea',
                                                            style:{overflow:'auto'},
                                                            name: 'remarks',
                                                            emptyText: i18n('remarks'),
                                                            labelAlign: 'top',
                                                            readOnly: true,
                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('items')+' '+_('old'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('items')+' '+_('new'),width: 150,sortable: true,dataIndex: 'item_name_new'},
                {text: _('quantity')+' '+_('new'),width: 100,sortable: true,dataIndex: 'qty_new', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'total_price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['item_id',_('id')+' '+_('new')],['item_name',_('items')+' '+_('new')],['total_price',_('value')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_jurnal.proxy.extraParams = { field_name:me.field_name, field_search:field.value, start:0};
                        me.store_jurnal.load();}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_jurnal,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.formEditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                if(roweditor.context.record.data.status=='true'){me.store.load();app.msg(_('success'), _('record_updated'));}
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_jurnal],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            i.store.load()
                        });
                    });
                }
            }
        });
        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);
    },
    load_stock: function(){
        var me=this,  toolbar = me.grid.down('toolbar'),
            doc_date = toolbar.items.items[0], project_id = toolbar.items.items[1],
            item_type = toolbar.items.items[2];
        me.store.proxy.extraParams ={doc_date:doc_date.getValue(), project_id:project_id.getValue(), item_type:item_type.getValue(), start:0};
        me.store.load();
    },


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        callback(true);
    }
});
