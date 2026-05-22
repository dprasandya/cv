Ext.define('App.view.transactions.cashbank.Cashbon', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashbon',
    pageTitle: _('cashbon'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_settlament = Ext.create('App.store.transactions.cashbank.Cashbon_settlament',{remoteSort: true});
        me.store = Ext.create('App.store.transactions.cashbank.Cashbon',{remoteSort: true});
        me.store_detail = Ext.create('App.store.transactions.cashbank.Cashbon_detail');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('detail'),
            height: 500,
            autoScroll:true,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins:[
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    enableRemove : true,
                    clicksToEdit:1,
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
                                                    fieldLabel: _('account'),
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype: 'xtaccount',
                                                            editable: false,
                                                            name: 'coa_id',
                                                            emptyText: i18n('id')
                                                        },
                                                        {
                                                            width: 280,
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'coa_name',
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
                                                    fieldLabel: _('amount'),
                                                    items: [

                                                        {
                                                            width: 150,
                                                            xtype: 'mitos.currency',
                                                            name: 'nominal',
                                                            emptyText: i18n('amount')
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
                {text: _('account'),width: 90,sortable: true,dataIndex: 'coa_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'coa_name',summaryRenderer: function(){return '<b>Total</b>';}},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            height: 500,
            autoScroll:true,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id;
                    me.store_detail.proxy.extraParams = {doc_id: me.doc_id};
                    me.store_detail.load({params:{doc_id:me.doc_id}});
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});
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
                me.formEditing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items:[
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype:'panel',
                                    title: _('cashbon'),
                                    itemId:'casbon_settlament_panel',
                                    items:[
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    defaultType: 'textfield',
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
                                                                    fieldLabel: _('type'),
                                                                    items: [
                                                                        {
                                                                            xtype:'combo',
                                                                            editable: false,
                                                                            name: 'doc_type',
                                                                            width:100,
                                                                            mode:'local',
                                                                            store: [['X','Cancel'],['N','Alokasi']],
                                                                            emptyText   : _('select'),
                                                                            allowBlank:false,
                                                                            listeners:{
                                                                                change:function(field, e){
                                                                                    var container = field.up('container'),
                                                                                        panel = container.up('tabpanel');
                                                                                    if(field.value=='X'){
                                                                                        panel.ownerCt.form.findField('cflow_id').setDisabled(false);
                                                                                    }else {
                                                                                        panel.ownerCt.form.findField('cflow_id').setDisabled(true);
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 100,
                                                                            xtype : 'datefield',
                                                                            editable: false,
                                                                            name: 'doc_date',
                                                                            format : 'Y-m-d',
                                                                            value: new Date(),
                                                                            maxValue : new Date(),
                                                                            allowBlank: false,
                                                                            emptyText: i18n('docdate')
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
                                                                            readOnly: true,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'C',
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                                                    fieldLabel: 'Bank',
                                                                    items: [
                                                                        {
                                                                            width: 100,
                                                                            xtype: 'xtcashbank',
                                                                            editable: false,
                                                                            name: 'cash_id',
                                                                            readOnly: true,
                                                                            emptyText: i18n('id'),
                                                                            extraParams:'C',
                                                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
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
                                },
                                me.grid_detail
                            ],
                            listeners: {
                                render: function() {
                                    this.items.each(function(i, index, items){
                                        i.tab.on('click', function(){
                                            me.jurnal.store.load({params:{doc_id:me.doc_id}});
                                        });
                                    });
                                }
                            }
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('type'),width: 80,sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        return record.data.doc_type=='X' ? 'Cancel' : 'Alocation' ;
                    }},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('cashbon'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['vend_name',_('supplier')],['remarks',_('remarks')],['nominal',_('amount')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {for_doc_id:me.data.doc_id, field_name:me.field_name, field_search:field.value};
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
        me.grid_settlament = Ext.create('Ext.grid.Panel', {
            store: me.store_settlament,
            listeners :{
                itemclick: function(dv, record, item, index, e) {
                    me.store.proxy.extraParams = {for_doc_id: record.data.doc_id};
                    me.data = record.data;
                    me.store.load({params:{for_doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.editing = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items:[
                        me.grid
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('alocation'),width: 100,sortable: true,dataIndex: 'nominal_settlament', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('document')+' Bon'],['vend_name',_('supplier')],['nominal',_('amount')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_settlament.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_settlament.loadPage(1);}}
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_settlament,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [ me.grid_settlament ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditing.context.record.data.for_doc_id =  me.data.doc_id;
        var container = Ext.ComponentQuery.query('#casbon_settlament_panel')[0];
        container.items.items[0].items.items[0].items.items[0].items.items[2].items.items[0].setValue(me.data.vend_id);
        container.items.items[0].items.items[0].items.items[0].items.items[2].items.items[1].setValue(me.data.vend_name);
        container.items.items[0].items.items[0].items.items[0].items.items[3].items.items[0].setValue(me.data.cash_id);
        container.items.items[0].items.items[0].items.items[0].items.items[3].items.items[1].setValue(me.data.cash_name);
        me.jurnal.store.load();
    },
    onNewDetail: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        me.formEditingDetail.context.record.data.doc_id = me.doc_id;
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        this.store_settlament.load();
        callback(true);
    }
});
