
Ext.define('App.view.transactions.recalculate.Transfer_transactions', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('transfer'),
    initComponent: function(){
        var me = this;
        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.recalculate.Transfer_transactions',{remoteSort: true});
        me.store_dinamic = [
            ['PO',_('purchaseorder')],
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
            ['AD','AR '+_('ar_add_billing')],
            ['RY','AR '+_('payment')],
            ['RA','AR '+_('advance')],
            ['RL','AR '+_('alocation')],
            ['RD','AR '+_('deduction')],
            ['DR','AR '+_('refund')],
            ['GL',_('gl')]

        ];

        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('name'),flex: 1,sortable: true,dataIndex: 'vend_cust_name'},
                {text: _('tax'),width: 80,sortable: true,dataIndex: 'tax_id'},
                {text: _('cashbank')+' Coa',width: 80,sortable: true,dataIndex: 'cash_name'},
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
                            var period = me.grid.down('toolbar').items.items[1].getValue();
                            me.store.proxy.extraParams = {period:period, module : field.value};
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
                                me.store.proxy.extraParams = {period:field.value, module : module};
                                me.store.loadPage(1);}}
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('id')],['vend_cust_name',_('name')],['tax_id',_('tax')],['cash_name',_('cashbank')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        var module = me.grid.down('toolbar').items.items[0].getValue(),
                            period = me.grid.down('toolbar').items.items[1].getValue();
                        me.store.proxy.extraParams = {period:period, module:module, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    xtype: 'button',
                    text: _('transfer'),
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            data.module = grid.down('toolbar').items.items[0].getValue();
            Transfer_transactions.add(data, function(provider, response){
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
                    //Ext.MessageBox.alert('Sukses', '!!!!');
                    Ext.Msg.alert("Success tranfer !!");
                    store.remove(data_selected.getSelection());
                }
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
