
Ext.define('App.view.transactions.ar_invoice.AR_Payment_direct', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('ar_payment_direct'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ar_invoice.AR_Payment_direct',{remoteSort: true, pageSize : 200, autoLoad: false});
        me.Checkbox = new Ext.selection.CheckboxModel( {
            listeners:{
                selectionchange: function(selectionModel, selected, options){
                    var total_payment = me.grid.down('toolbar').items.items[5].items.items[2], result  = 0, total = Ext.ComponentQuery.query('#sum_nominal_ar_invoice_all')[0];
                    Ext.each(selected, function(selected){
                        result += selected.data.outstanding_receivable;
                    });
                    total.setText("Sum Total : " +Ext.util.Format.number(result, '0,000.00'));
                    total_payment.setValue(result);
                }
            }
        });
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            selModel :  me.Checkbox,
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('customer'),width: 150,sortable: true,dataIndex: 'cust_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('outstanding'),width: 100,sortable: true,dataIndex: 'outstanding_receivable', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
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
                    text: _('payment'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['period',_('period')],['doc_date',_('docdate')],['doc_id',_('document')],['cust_name',_('customer')],['outstanding_receivable',_('outstanding')],['unit_building_name',_('unit_building')],['remarks',_('remarks')],['tax_id',_('tax')]],
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
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    value:'P',
                    emptyText: i18n('payment'),
                    store: [['P',_('payment')],['D',_('deduction')]],
                    listeners:{
                        change:function(f){
                            var tb = f.up('toolbar'), p_d = tb.items.items[5];
                            if(f.value=='P'){
                                if(p_d){tb.remove(p_d);}
                                tb.add({
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtcashbank',
                                            editable: false,
                                            allowBlank: false,
                                            emptyText: i18n('id'),
                                            extraParams:['B','C']
                                        },
                                        {
                                            width: 100,
                                            xtype: 'xtcashflow',
                                            editable: false,
                                            allowBlank: false,
                                            emptyText: i18n('id'),
                                            value:'100',
                                            extraParams:'O'
                                        },
                                        {
                                            width: 230,
                                            fieldLabel: _('total'),
                                            xtype: 'mitos.currency',
                                            emptyText: i18n('total')
                                        }
                                    ]
                                });
                            }else if(f.value=='D'){
                                if(p_d){tb.remove(p_d);}
                                tb.add({
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldDefaults: {
                                        labelAlign: 'right'
                                    },
                                    items: [
                                        {
                                            width: 100,
                                            xtype: 'xtaccount',
                                            name: 'coa_id',
                                            editable: false,
                                            emptyText: i18n('id')
                                        },
                                        {
                                            width: 198,
                                            xtype: 'textfield',
                                            readOnly: true,
                                            name: 'coa_name',
                                            emptyText: i18n('name'),
                                            fieldStyle:'background-color: #F2F3F4; background-image: none;'
                                        },
                                        {
                                            width: 230,
                                            fieldLabel: _('total'),
                                            xtype: 'mitos.currency',
                                            emptyText: i18n('total')
                                        }
                                    ]
                                });
                            }
                        }
                    }
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
                            width: 100,
                            xtype: 'xtcashbank',
                            editable: false,
                            allowBlank: false,
                            emptyText: i18n('id'),
                            extraParams:['B','C']
                        },
                        {
                            width: 100,
                            xtype: 'xtcashflow',
                            editable: false,
                            allowBlank: false,
                            emptyText: i18n('id'),
                            value:'100',
                            extraParams:'O'
                        },
                        {
                            width: 230,
                            fieldLabel: _('total'),
                            xtype: 'mitos.currency',
                            emptyText: i18n('total')
                        }
                    ]
                }
            ],
            bbar:[
                {
                    xtype: 'pagingtoolbar',
                    store: me.store,
                    pageSize : 100,
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    displayInfo: true
                },'->',
                {
                    xtype: 'label',
                    itemId:'sum_nominal_ar_invoice_all'
                }
            ]
        });
        me.pageBody = [ me.grid];
        me.callParent(arguments);
    },

    onNewData: function(btn){
        btn.setDisabled(true);
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length
            , tb  = btn.up('toolbar'), p_d = tb.items.items[4].getValue(), cash_id = (p_d=='P' ? tb.items.items[5].items.items[0].getValue() : null), cflow_id = (p_d=='P' ? tb.items.items[5].items.items[1].getValue() : null), coa_id = (p_d=='D' ? tb.items.items[5].items.items[0].getValue() : null),
            doc_date = tb.items.items[0].getValue(), total_payment =  tb.items.items[5].items.items[2].getValue(), outstanding_payment = total_payment;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.doc_date = doc_date ; data.doc_type=p_d; data.cash_id = cash_id; data.cflow_id = cflow_id; data.coa_id = coa_id;
            if(i==length-1){data.payment_value = outstanding_payment}
            else {
                if(data.outstanding_receivable > outstanding_payment){data.payment_value = outstanding_payment}
                else{
                    data.payment_value = data.outstanding_receivable;
                    outstanding_payment = outstanding_payment - data.outstanding_receivable;
                }
            };
            AR_Payment_direct.add(data, function(provider, response){
                if (response.type == 'exception'){
                    var error = Ext.util.Format.substr(response.message, 58);
                    Ext.MessageBox.alert('Error', error);
                }else{
                    Ext.MessageBox.alert('Sukses', 'data has been import');
                    store.remove(data_selected.getSelection());
                }
                btn.setDisabled(false);
            });
        }store.load();
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
