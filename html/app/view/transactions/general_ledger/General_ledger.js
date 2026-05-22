
Ext.define('App.view.transactions.general_ledger.General_ledger', {
    extend: 'App.ux.RenderPanel',
    id: 'panelGeneral_ledger',
    pageTitle: _('gl'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.general_ledger.General_ledger',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.general_ledger.General_ledger_detail');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            title: _('detail'),
            height: 1000,
            autoScroll:false,
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
                                                    items: [
                                                        {
                                                            width: 230,
                                                            fieldLabel: _('debit'),
                                                            xtype: 'mitos.currency',
                                                            name: 'debit',
                                                            emptyText: i18n('debit'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        credit = container.items.items[1];
                                                                    credit.setValue(0);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 230,
                                                            fieldLabel: _('credit'),
                                                            xtype: 'mitos.currency',
                                                            name: 'credit',
                                                            emptyText: i18n('credit'),
                                                            enableKeyEvents: true,
                                                            listeners:{
                                                                keyup:function(field, e){
                                                                    var container = field.up('container'),
                                                                        debit = container.items.items[0];
                                                                    debit.setValue(0);
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
                {text: _('debit'),width: 100,sortable: true,dataIndex: 'debit', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('credit'),width: 100,sortable: true,dataIndex: 'credit', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.get('doc_id');
                    me.store_detail.proxy.extraParams = {doc_id: me.doc_id};
                    me.store_detail.load({params:{doc_id:me.doc_id}});
                    me.jurnal.store.load({params:{doc_id:me.doc_id}});

                    // disable btn add detail //
                    var btn_add_detail = me.grid_detail.down('toolbar').items.items[0];
                    if(record.data.status ==1 || record.data.status==2){btn_add_detail.setDisabled(true);}
                    else{btn_add_detail.setDisabled(false);}
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
                    enablePrint : true,
                    enablePrintFn : voucher_report.gl_form_report,
                    items:[
                        {
                            xtype: 'tabpanel',
                            items: [
                                {
                                    xtype: 'panel',
                                    title: _('gl'),
                                    items: [
                                        {
                                            layout: 'hbox',
                                            items:[
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
                                },me.grid_detail

                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('gl'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['nominal',_('amount')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
                pageSize: 20,
                store: me.store,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });

        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },
     onNewData: function(btn){
         var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
         plugin.cancelEdit();
         store.insert(0, {aktif: 1,authorized: 1});
         plugin.startEdit(0, 0);
         plugin.editor.form.findField('doc_date').setValue(new Date());
         me.jurnal.store.load();
    },
    onNewDetail:function(btn){
        var me = this;
        me.formEditingDetail.cancelEdit();
        me.store_detail.insert(0, {aktif: 1,authorized: 1});
        me.formEditingDetail.startEdit(0, 0);
        me.formEditingDetail.context.record.data.doc_id = me.doc_id;
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
