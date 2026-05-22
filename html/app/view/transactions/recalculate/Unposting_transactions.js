
Ext.define('App.view.transactions.recalculate.Unposting_transactions', {
    extend: 'App.ux.RenderPanel',
    id: 'panelUnposting_transactions',
    pageTitle: _('unpost'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.recalculate.Unposting_transactions',{remoteSort: true});
        me.store_dinamic = [
            ['PO',_('purchaseorder')],
            ['GR',_('goodsreceived')],
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
            //['RB','AR '+_('bad_debt_provision')],
            ['DR','AR '+_('refund')],
            ['SP',_('stock_opname')],
            //['BR',_('borrow_items')],
            //['BN',_('borrow_items_return')],
            //['IC',_('items_change')],
            ['BP',_('buy_tbs_plasma')],
            ['ST',_('stock_out')],
            ['SR',_('stock_out_traksi')],
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
            ['PR',_('production')],
            ['DO',_('deliveryorder')],
            ['BG',_('budget')]

        ];

        me.grid_unpost = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('unpost'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('item'),width: 100,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'supplier_customer'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('cash'),width: 80,sortable: true,dataIndex: 'cash_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('value'),width: 100,sortable: true,dataIndex: 'nominal', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                            var period = me.grid_unpost.down('toolbar').items.items[1].getValue();
                            me.store.proxy.extraParams = {status:1, jenis:'unpost', period:period, module : field.value};
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
                                var module = me.grid_unpost.down('toolbar').items.items[0].getValue();
                                me.store.proxy.extraParams = {status:1, jenis:'unpost', period:field.value, module : module};
                                me.store.loadPage(1);}}
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('id')],['tax_id',_('tax')],['cash_id',_('cash')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        var module = me.grid_unpost.down('toolbar').items.items[0].getValue(),
                            period = me.grid_unpost.down('toolbar').items.items[1].getValue();
                        me.store.proxy.extraParams = {status:1, jenis:'unpost', period:period, module:module, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    xtype: 'button',
                    text: _('inactive'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
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
        me.grid_posting = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('posting'),
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('item'),width: 100,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'supplier_customer'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('cash'),width: 80,sortable: true,dataIndex: 'cash_id'},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('value'),width: 100,sortable: true,dataIndex: 'nominal', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
            ],
            tbar: [
                {
                    width: 150,
                    xtype : 'combo',
                    editable:false,
                    emptyText: i18n('choose module'),
                    store: me.store_dinamic,
                    listeners :{
                        change:function(field, e){
                            var period = me.grid_posting.down('toolbar').items.items[1].getValue();
                            me.store.proxy.extraParams = {status:0, jenis:'posting', period:period, module:field.value };
                            me.store.load();
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
                                var module = me.grid_posting.down('toolbar').items.items[0].getValue();
                                me.store.proxy.extraParams = {status:0, jenis:'posting', period:field.value, module :module };
                                me.store.load();
                            }
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['tax_id',_('tax')],['cash_id',_('cash')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        var module = me.grid_posting.down('toolbar').items.items[0].getValue(),
                            period = me.grid_posting.down('toolbar').items.items[1].getValue();
                        me.store.proxy.extraParams = {status:0, jenis:'posting', period:period, module:module, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    xtype: 'button',
                    text: _('active'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onUpdateData
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
        me.GridPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid_unpost, me.grid_posting ],
            listeners: {
                render: function() {
                    this.items.each(function(i){
                        i.tab.on('click', function(){
                            me.store.proxy.extraParams.module='';
                            i.store.load();
                        });
                    });
                }
            }
        });
        me.pageBody = [ me.GridPanel ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.module = grid.down('toolbar').items.items[0].getValue();
            data.status=0;
            Unposting_transactions.add(data, function(provider, response){
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
        store.load();
    },
    onUpdateData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.module = grid.down('toolbar').items.items[0].getValue();
            data.status=1; btn.enable(false);
            Unposting_transactions.add(data, function(provider, response){
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
                btn.enable(true);
            });
        }
        store.load();
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
