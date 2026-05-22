
Ext.define('App.view.transactions.ar_invoice.AR_Bad_debt_provision', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('bad_debt_provision'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ar_invoice.AR_Bad_debt_provision',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_detail = Ext.create('App.store.transactions.ar_invoice.AR_Bad_debt_provision_detail');
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid_detail = Ext.create('Ext.grid.Panel', {
            store: me.store_detail,
            height: 390,
            autoScroll: true,
            title: _('detail'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            selModel :  Ext.create( 'Ext.selection.CheckboxModel', {
                checkOnly: false,
                listeners: {
                    deselect: function(model, record, index) {
                        record.set('active', false);
                            AR_Bad_debt_provision.updatedetail(record.data, function(provider, response){
                        });
                    },
                    select: function(model, record, index) {
                        record.set('active', true);
                            AR_Bad_debt_provision.updatedetail(record.data, function(provider, response){
                        });
                    }

                }
            }),
            columns: [
                {text: _('enabled?'),width: 80,sortable: true,dataIndex: 'active', renderer: me.boolRenderer},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('customer'),flex: 1,sortable: true,dataIndex: 'cust_name'},
                {text: _('id'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'for_doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_receivable', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('bad_debt_provision'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['unit_building_name',_('unit_building')],['cust_name',_('customer')],['for_doc_id',_('id')],['outstanding_receivable',_('outstanding')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.field_search = field.value;
                            var aging_piutang = me.grid_detail.down('toolbar').items.items[2].getValue(),
                                percent = me.grid_detail.down('toolbar').items.items[4].getValue();
                            me.store_detail.proxy.extraParams = {doc_id:me.doc_id, aging_piutang:aging_piutang, percent:percent, field_name:me.field_name, field_search:field.value};
                            me.store_detail.loadPage(1);}}
                    }
                },
                {
                    xtype:'combo',
                    emptyText: _('aging_piutang'),
                    editable: false,
                    width:100,
                    mode:'local',
                    value :'181',
                    store: [['30','0-30'],['60','31-60'],['90','61-90'],['120','91-120'],['150','121-150'],['180','151-180'],['181','>=181']],
                    listeners:{
                        change:function(f){
                            var percent = me.grid_detail.down('toolbar').items.items[4].getValue();
                            me.store_detail.proxy.extraParams = {doc_id:me.doc_id, aging_piutang:f.value, percent:percent, field_name:me.field_name, field_search:me.field_search};
                            me.store_detail.loadPage(1);
                        }
                    }
                },
                {
                    xtype:'combo',
                    emptyText: _('field_type'),
                    editable: false,
                    width:100,
                    mode:'local',
                    value:'N',
                    store: [['N',_('input_value')],['P','Percent']],
                    listeners:{
                        change:function(f){
                            var tb = me.grid_detail.down('toolbar');
                            if(f.value=='N'){
                                var aging_piutang = me.grid_detail.down('toolbar').items.items[2].getValue();
                                tb.items.items[6].setValue(100); tb.items.items[4].setReadOnly(true);
                                me.store_detail.proxy.extraParams = {doc_id:me.doc_id, aging_piutang:aging_piutang, percent:100, field_name:me.field_name, field_search:me.field_search};
                                me.store_detail.loadPage(1);
                            }
                            else if(f.value=='P'){tb.items.items[2].setValue(0); tb.items.items[4].setReadOnly(false);}
                        }
                    }
                },
                {
                    xtype:'mitos.percent',
                    width:100,
                    readOnly : true,
                    minValue:0, maxValue:100,
                    value:100,
                    fieldStyle:'background-color: #F2F3F4; background-image: none; text-align:right;',
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER && field.value<=100 && field.value>=0){
                            var aging_piutang = me.grid_detail.down('toolbar').items.items[2].getValue();
                            me.store_detail.proxy.extraParams = {doc_id:me.doc_id, aging_piutang:aging_piutang, percent:field.value, field_name:me.field_name, field_search:me.field_search};
                            me.store_detail.loadPage(1);}}
                    }
                },'->',
                {
                    xtype: 'pagingtoolbar',
                    pageSize: 20,
                    store: me.store_detail,
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    displayInfo: true
                }
            ]
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            listeners:{
                itemclick: function(dv, record, item, index, e) {
                    var useredit = me.grid.down('toolbar'), tb_detail = me.grid_detail.down('toolbar'),
                        aging_piutang = tb_detail.items.items[2].getValue(), percent = tb_detail.items.items[4].getValue();
                    useredit.items.items[4].setText("UserInput : " +record.data.userinput+' | '+"UserEdit : " +record.data.useredit);
                    me.doc_id = record.get('doc_id'); me.status=record.get('status');
                    me.store_detail.proxy.extraParams = {doc_id: me.doc_id, aging_piutang:aging_piutang, percent:percent};
                    me.store_detail.load();
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
                                    xtype: 'panel',
                                    title: _('bad_debt_provision'),
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
                                        },
                                        me.jurnal.grid
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
                {text: _('payment_amount'),width: 100,sortable: true,dataIndex: 'nominal', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: _('bad_debt_provision'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id',_('invoice')],['type',_('type')],['nominal',_('payment_amount')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_type:'B', field_name:me.field_name, field_search:field.valu};
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
         me.formEditing.context.record.data.doc_type = 'B';
         plugin.editor.form.findField('doc_date').setValue(new Date());
    },
    checkAll: function(checked) {
        var me=this, store = me.store_detail;
        console.log(store.getCount());
        for(var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            if (checked) {
                record.set('active', true);
            } else {
                record.set('active', false);
            }
            console.log(record.data);
        }
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        me.store.proxy.extraParams = {doc_type: 'B'};
        me.store.load();
        callback(true);
    }
});
