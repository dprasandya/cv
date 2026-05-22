
Ext.define('App.view.transactions.stock.Stock_opname', {
    extend: 'App.ux.RenderPanel',
    id: 'panelStock_opname',
    pageTitle: _('stock_opname'),

    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.stock.Stock_opname',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_jurnal = Ext.create('App.store.transactions.stock.JurnalStock_opname',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('stock_opname'),
            plugins: [
                me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary : false,
                    listeners: {
                        beforeedit: function(editor,e,opt){
                            var form   = editor.getEditor().form, station_id  = form.findField('station_id');
                            if(e.record.data.warehouse_type!='PKS'||e.record.data.item_type=='FG'||e.record.data.item_type=='HK'){
                                station_id.setReadOnly(true);
                                //e.record.data.station_id.setReadOnly(true);
                            }else{
                                station_id.setReadOnly(false);
                            }
                        },
                        edit: function (editor, e, eOpts) {
                            var qty_selisih = e.record.data.qty_ending-e.record.data.qty_opname_conversion;
                            e.record.set("qty_selisih", qty_selisih);
                            
                        }
                    }
                })
            ],
            columns: [
                {text: _('warehouse'),width: 80,sortable: true,dataIndex: 'warehouse_name'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                //{text: _('id'),width: 80,sortable: true,dataIndex: 'item_id'},
                {text: _('name'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('large_unit'),width: 80,sortable: true,dataIndex: 'unit_id'},
                {text: _('quantity')+' Stock',width: 100,sortable: true,dataIndex: 'qty_ending', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('price'),width: 80,sortable: true,dataIndex: 'price_ending_conversion', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity')+' Opname',width: 100,sortable: true,dataIndex: 'qty_opname_conversion', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor:{
                    xtype:'mitos.currency'
                }},
                {text: _('quantity')+' selisih',width: 100,sortable: true,dataIndex: 'qty_selisih', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('station'),width: 150,sortable: true,dataIndex: 'station_id',
                    editor:{
                    xtype:'stationcombo'
                }},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks',editor:{
                    xtype:'textfield',
                    editable: false
                }},
                {text: _('enabled?'),width: 60,sortable: true,renderer: me.boolRenderer,dataIndex: 'status',editor:{
                    xtype:'checkbox',
                    editable: false
                }}
            ],
            tbar: [
                {
                    width: 100,
                    xtype : 'textfield',
                    emptyText: i18n('enter period'),
                    listeners:{
                        specialkey:function(field, e){
                            if(e.getKey()== e.ENTER){
                                me.period=field.value;
                                me.load_stock();
                            }
                        }
                    }
                },
                {
                    width: 120,
                    xtype : 'typescombo',
                    emptyText: i18n('item'),
                    extraParams :['HK','RA','FG'],
                    listeners:{
                        change:function(field, e){
                            me.item_type = field.value;
                            me.load_stock();
                        }
                    }
                },
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['warehouse_id',_('warehouse')],['item_id',_('id')],['item_name',_('name')],['unit_id',_('unit')],['unit_id_conversion',_('small_unit')],['qty_ending_conversion',_('small_quantity')],['remarks',_('remarks')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store.proxy.extraParams = {period:me.period, item_type:me.item_type, field_name:me.field_name, field_search:field.value, start:0};
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
        me.grid_jurnal = Ext.create('Ext.grid.Panel', {
            store: me.store_jurnal,
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
                    var useredit = me.grid_jurnal.down('toolbar');
                    useredit.items.items[3].setText("UserEdit : " +record.data.useredit);
                    me.jurnal.store.load({params:{doc_id:record.data.doc_id}});
                }
            },
            plugins: [
                me.formEditingDetail = Ext.create('App.ux.grid.RowFormEditing', {
                    clicksToEdit: 1,
                    enableRemove : true,
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
                {text: _('items'),width: 150,sortable: true,dataIndex: 'item_name'},
                {text: _('quantity')+' Stock',width: 100,sortable: true,dataIndex: 'qty_last', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('quantity')+' Opname',width: 100,sortable: true,dataIndex: 'qty_opname', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'selisih',width: 100,sortable: true, align:'right',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var returnString = record.data.qty_last - record.data.qty_opname;
                        return Ext.util.Format.number(returnString, '0,000.00');
                    }},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'total_price', align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'},
                {text: _('input_user'),width: 80,sortable: true,dataIndex: 'userinput', align:'center'},
                {text: _('lastupdate'),width: 80,sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar: [
                {
                    xtype:'combo',
                    editable: false,
                    width:100,
                    mode:'local',
                    store: [['doc_id',_('document')],['item_id',_('id')],['item_name',_('items')],['total_price',_('value')],['remarks',_('remarks')],['userinput',_('input_user')]],
                    listeners:{change:function(){me.field_name=this.getValue();}}
                },
                {
                    xtype:'textfield',
                    emptyText: 'enter search key',
                    width:150,
                    listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                        me.store_jurnal.proxy.extraParams = { field_name:me.field_name, field_search:field.value, start:0};
                        me.store_jurnal.load();}}
                    }
                },'->',
                {
                    displayfield:'useredit'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: me.store_jurnal,
                displayMsg: 'Diplay {0} - {1} Of {2}',
                emptyMsg: 'No Record Found',
                displayInfo: true
            }
        });
        me.formEditing.on({
            scope: this,
            afteredit: function (roweditor, changes, record, rowIndex) {
                if(roweditor.context.record.data.status=='true'){me.store.load();app.msg(_('success'), _('record_updated'));}
            }
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.grid, me.grid_jurnal],
            listeners: {
                render: function() {
                    this.items.each(function(i, index, items){
                        i.tab.on('click', function(){
                            if(index>0){i.store.load()}
                        });
                    });
                }
            }
        });
        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);
    },
    load_stock: function(){
        var me=this,  toolbar = me.grid.down('toolbar'),
            period = toolbar.items.items[0],
            item_type = toolbar.items.items[1];
        me.store.proxy.extraParams ={period:period.getValue(), item_type:item_type.getValue(), start:0};
        me.store.load();
    },


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        //me.load_stock();
        callback(true);
    }
});
