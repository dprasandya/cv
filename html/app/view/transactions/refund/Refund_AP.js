
Ext.define('App.view.transactions.refund.Refund_AP', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('refund'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_ap = Ext.create('App.store.transactions.refund.Refund',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');

        me.grid_ap = Ext.create('Ext.grid.Panel', {
            store: me.store_ap,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid_ap.down('toolbar');
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.data.doc_id;
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
                me.formEditingAP = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
                    items:[
                        {
                            xtype: 'panel',
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
                                                            fieldLabel: _('id')+' '+_('advance'),
                                                            items: [
                                                                {
                                                                    width: 200,
                                                                    xtype: 'xtap_advance',
                                                                    name: 'for_doc_id',
                                                                    allowBlank: false,
                                                                    emptyText: i18n('id')+' '+i18n('advance'),
                                                                    extraParams:0
                                                                },
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'outstanding_advance',
                                                                    readOnly:true,
                                                                    emptyText: i18n('outstanding'),
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
                                                            fieldLabel: _('supplier'),
                                                            items: [
                                                                {
                                                                    width: 100,
                                                                    xtype: 'xtsupplier',
                                                                    editable: false,
                                                                    name: 'vend_id',
                                                                    readOnly: true,
                                                                    emptyText: i18n('id'),
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
                                                            fieldLabel: _('payment_amount'),
                                                            items: [
                                                                {
                                                                    width: 150,
                                                                    xtype: 'mitos.currency',
                                                                    name: 'nominal',
                                                                    allowBlank:false,
                                                                    enableKeyEvents: true,
                                                                    emptyText: i18n('payment_amount')
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
                                                    items:[
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            fieldDefaults: {
                                                                labelAlign: 'right'
                                                            },
                                                            fieldLabel: _('cash'),
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
                        }
                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                {text: _('cashbank'),width: 150,sortable: true,dataIndex: 'cash_name'},
                {text: _('payment_amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('refund'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewDataAP
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('id')+' '+_('advance')],['vend_name',_('supplier')],['cash_name',_('cashbank')],['nominal',_('payment_amount')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_ap.proxy.extraParams = {doc_type: 'AP', field_name:me.field_name, field_search:field.value};
                        me.store_ap.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'label'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_ap,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.pageBody = [me.grid_ap];
        me.callParent(arguments);
    },
    onNewDataAP: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin;
        plugin.cancelEdit();
        store.insert(0, {aktif: 1,authorized: 1});
        plugin.startEdit(0, 0);
        plugin.editor.form.findField('doc_date').setValue(new Date());
        me.formEditingAP.context.record.data.doc_type = 'AP';
        me.jurnal.store.load();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store_ap.proxy.extraParams = {doc_type: 'AP'}
        me.store_ap.load();
        callback(true);
    }
});
