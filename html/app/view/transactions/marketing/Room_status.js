Ext.define('App.view.transactions.marketing.Room_status', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('room_status'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Room_status',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('room_status'),
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            columns: [
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 120,sortable: true,dataIndex: 'doc_id'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name'},
                {text: _('start_date'),width: 80,sortable: true,dataIndex: 'start_rent', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('end_date'),width: 80,sortable: true,dataIndex: 'end_rent', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('id'),width: 80,sortable: true,dataIndex: 'unit_building_id'},
                {text: _('unit_building'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                //{text: _('cluster'),width: 100,sortable: true,dataIndex: 'cluster_name'},
                //{text: _('quantity'),width: 100,sortable: true,dataIndex: 'qty', align:'right',summaryType:'sum',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                //{text: _('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Net '+_('price'),width: 80,sortable: true,dataIndex: 'price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('service_charge'),width: 80,sortable: true,dataIndex: 'price_sc', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Ppn',width: 80,sortable: true,dataIndex: 'price_ppn', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 80,sortable: true,dataIndex: 'total_price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('room_status'),width: 100,sortable: true,dataIndex: 'rs_name'}
            ],
            tbar: [
                {
                    width: 100,
                    xtype : 'datefield',
                    editable: false,
                    format : 'Y-m-d',
                    value : new Date(),
                    emptyText: i18n('docdate'),
                    listeners:{
                        change:function(field, e){
                            me.doc_date = field.value;
                            me.store.proxy.extraParams = {doc_date:field.value};
                            me.store.loadPage(1);
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['project_name',_('project')],['doc_id',_('document')],['full_name',_('name')],['unit_building_id',_('id')],['unit_building_name',_('unit_building')],['rs_name',_('room_status')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {doc_date:me.doc_date, field_name:me.field_name, field_search:field.value};
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
        me.pageBody = [ me.grid ];
        me.callParent(arguments);
    },
    onNewData: function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, data_selected = grid.getSelectionModel(), length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            Generate_room_rate.add(data, function(provider, response){
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
        me.store.load();
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */

    onActive: function(callback){
        var toolbar = this.grid.down('toolbar'), doc_date = toolbar.items.items[0];
        this.store.proxy.extraParams = {doc_date: doc_date.getValue()};
        this.store.load();
        callback(true);
    }
});
