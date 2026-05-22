Ext.define('App.view.transactions.ar_invoice.AR_Generate_billing', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('generate_billing'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.ar_invoice.AR_Generate_billing',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: _('project'),width: 100,sortable: true,dataIndex: 'project_name'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name'},
                {text: _('due_date'),width: 80,sortable: true,dataIndex: 'due_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('unit_building'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('tax'),width: 100,sortable: true,dataIndex: 'tax_name'},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Ppn',width: 80,sortable: true,dataIndex: 'price_ppn', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Pph',width: 80,sortable: true,dataIndex: 'price_pph', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total_price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
            ],
            tbar: [
                {
                    xtype:'textfield',
                    emptyText: 'enter period',
                    width:100,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.period = field.value;
                        me.store.proxy.extraParams = {period:me.period};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['full_name',_('name')],['unit_building_name',_('unit_building')],['tax_name',_('tax')],['remarks',_('remarks')],['price',_('price')], ['price_ppn','Ppn'], ['price_pph','Pph'],['total_price',_('total')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {period:me.period, field_name:me.field_name, field_search:field.value};
                        me.store.loadPage(1);}}
                    }
                },
                {
                    xtype: 'button',
                    text: _('generate_billing'),
                    iconCls: 'icoAdd',
                    scope: me,
                    handler: me.onNewData
                },
                '->',
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            AR_Generate_billing.add(data, function(provider, response){
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
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        callback(true);
    }
});
