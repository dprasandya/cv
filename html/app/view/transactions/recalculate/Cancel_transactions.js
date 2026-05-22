
Ext.define('App.view.transactions.recalculate.Cancel_transactions', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCancel_transactions',
    pageTitle: _('cancel'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.recalculate.Cancel_transactions',{remoteSort: true});
        me.store_cancel = Ext.create('App.store.transactions.recalculate.JurnalCancel_transactions',{remoteSort: true});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.store_dinamic = [
            ['PO',_('purchaseorder')],
            //['GR',_('goodsreceived')],
            ['CI',_('cashbookin')],
            ['CO',_('cashbookout')],
            ['BI',_('bankbookin')],
            ['BO',_('bankbookout')],
            ['CB',_('cashbon')],
            ['AP','AP '+_('invoice')],
            ['PY','AP '+_('payment')],
            ['PL','AP '+_('alocation')],
            ['PD','AP '+_('deduction')],
            ['PA','AP '+_('advance')],
            ['DP','AP '+_('refund')],
            ['AR','AR '+_('invoice')],
            ['AD','AR '+_('ar_add_billing')],
            ['AI','AR '+_('ar_sale_items')],
            ['RY','AR '+_('payment')],
            ['RA','AR '+_('advance')],
            ['RL','AR '+_('alocation')],
            ['RD','AR '+_('deduction')],
            ['RB','AR '+_('bad_debt_provision')],
            ['DR','AR '+_('refund')],
            ['SP',_('stock_opname')],
            //['BR',_('borrow_items')],
            //['BN',_('borrow_items_return')],
            //['IC',_('items_change')],
            ['BP',_('buy_tbs_plasma')],
            ['ST',_('stock_out')],
            ['SN',_('stock_in')],
            ['WT',_('warehouse_tx_rx')+' Transfer'],
            //['WR',_('warehouse_tx_rx')+' Receive'],
            ['AT',_('accumulation_depreciation_asset')],
            ['CA',_('closing_asset')],
            ['JA',_('joining_asset')],
            ['GL',_('gl')],
            ['AA',_('audit_adjustment')],
            //['RP',_('reclass_plantation')],
            ['RG',_('reclass_afdeling')],
            ['RTBM',_('reclass_tbm')],
            ['RH',_('reclass_hpp')],
            ['RC',_('reclass')],
            ['DO',_('deliveryorder')],
            ['PR',_('production')],
            ['BG',_('budget')]

        ];

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('cancel'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            var module = me.grid.down('toolbar').items.items[0].getValue(),
                                form   = editor.getEditor().form,
                                cflow_id = form.findField('cflow_id');
                            if(module=='BI'||module=='CI'||module=='RY'||module=='DP'||module=='RA' ){
                                cflow_id.setDisabled(false);
                                cflow_id.extraParams = 'O'
                            }else if(module=='BO'||module=='CO'||module=='PY'||module=='DR'||module=='PA' ){
                                cflow_id.setDisabled(false);
                                cflow_id.extraParams = 'I'
                            }else{cflow_id.setDisabled(true);}

                        }
                    }
                })
            ],
            columns: [
                {text: _('id'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('item'),width: 100,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'supplier_customer'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('cashflow'),width: 80,sortable: true,dataIndex: 'cflow_id',editor:{
                    xtype:'xtcashflow',
                    editable: false,
                    allowBlank: false
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield',
                    editable: false
                }},
                {text: _('value'),width: 100,sortable: true,dataIndex: 'nominal', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar: [
                {
                    width: 150,
                    xtype : 'combo',
                    editable:false,
                    emptyText: i18n('choose module'),
                    store: me.store_dinamic,
                    listeners:{
                        change:function(field, e){
                            var period = me.grid.down('toolbar').items.items[1].getValue();
                            me.store.proxy.extraParams = {status:1, period:period, module : field.value};
                            me.store.loadPage(1);
                        }
                    }
                },
                {
                    width: 100,
                    xtype : 'textfield',
                    emptyText: i18n('enter period'),
                    listeners:{
                        specialkey:function(field, e){
                            if(e.getKey()== e.ENTER){
                                var module = me.grid.down('toolbar').items.items[0].getValue();
                                me.store.proxy.extraParams = {status:1, period:field.value, module :module };
                                me.store.loadPage(1);
                            }
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['for_doc_id',_('id')],['item_id',_('item')],['supplier_customer',_('name')],['tax_id',_('tax')],['cash_id',_('cash')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        var module = me.grid.down('toolbar').items.items[0].getValue(),
                            period = me.grid.down('toolbar').items.items[1].getValue();
                        me.store.proxy.extraParams = {status:1, period:period, module : module, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    width: 100,
                    xtype : 'datefield',
                    editable: false,
                    format : 'Y-m-d',
                    value : new Date(),
                    maxValue : new Date(),
                    emptyText: i18n('date')
                },
                {
                    xtype: 'button',
                    text: _('cancel'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
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
        me.grid_cancel = Ext.create('Ext.grid.Panel', {
            store: me.store_cancel,
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
                    var useredit = me.grid.down('toolbar');
                    //useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    items: [
                        {
                            xtype:'panel',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield'
                                },me.jurnal.grid
                            ]
                        }

                    ]
                })
            ],
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'For'+_('document'),width: 150,sortable: true,dataIndex: 'for_doc_id'},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'vend_cust_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'vend_cust_name'},
                {text: _('subtotal'),width: 100,sortable: true,dataIndex: 'total', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['for_doc_id','For '+_('document')],['vend_cust_id',_('id')],['vend_cust_name',_('name')],['remarks',_('remarks')],['total',_('subtotal')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_cancel.proxy.extraParams = {field_name:me.field_name, field_search:field.value};
                        me.store_cancel.loadPage(1);}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store_cancel,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_cancel ],
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

        me.pageBody = [ me.FormulirPanel ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length,
            canceled_date = btn.up('toolbar').items.items[4].getValue();
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.module = grid.down('toolbar').items.items[0].getValue();
            data.doc_date = canceled_date;
            Cancel_transactions.add(data, function(provider, response){
                if (response.type == 'exception'){
                    //Ext.MessageBox.alert('Error', response.message);
                    var error = response.message;
                    Ext.Msg.show({
                        title: 'Failed!',
                        msg: error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }else{
                    Ext.MessageBox.alert('Sukses', '!!!!');
                    store.remove(data_selected.getSelection());
                }
            });
        }
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        callback(true);
    }
});
