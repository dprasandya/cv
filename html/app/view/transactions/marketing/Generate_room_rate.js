Ext.define('App.view.transactions.marketing.Generate_room_rate', {
    extend: 'App.ux.RenderPanel',
    pageTitle: _('generate_room_rate'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store = Ext.create('App.store.transactions.marketing.Generate_room_rate',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_jurnal = Ext.create('App.store.transactions.marketing.Generate_room_rate_jurnal',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.jurnal = Ext.create('App.view.transactions.jurnal.Jurnal');
        me.grid = Ext.create('Ext.grid.Panel', {
            store: me.store,
            title: _('generate_room_rate'),
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
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('unit_building'),flex: 1,sortable: true,dataIndex: 'unit_building_name'},
                //{text: _('tax'),width: 100,sortable: true,dataIndex: 'tax_name'},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price_brutto', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('voucher'),width: 100,sortable: true,dataIndex: 'voucher_value', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Net '+_('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Ppn',width: 80,sortable: true,dataIndex: 'price_ppn', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Pph',width: 80,sortable: true,dataIndex: 'price_pph', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Service Charge',width: 80,sortable: true,dataIndex: 'price_sc', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total_price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
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
                    store: [['project_name',_('project')],['doc_id',_('document')],['full_name',_('name')],['unit_building_name',_('unit_building')],['tax_name',_('tax')],['remarks',_('remarks')],['price',_('price')], ['price_ppn','Ppn'], ['price_pph','Pph'],['price_sc','Service Charge'],['total_price',_('total')]],
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
                },
                {
                    xtype: 'button',
                    text: _('generate_room_rate'),
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
                {text: _('project'),width: 80,sortable: true,dataIndex: 'project_name'},
                {text: _('document'),width: 150,sortable: true,dataIndex: 'doc_id'},
                {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: _('name'),width: 100,sortable: true,dataIndex: 'full_name'},
                {text: _('unit_building'),width: 100,sortable: true,dataIndex: 'unit_building_name'},
                {text: _('price'),width: 100,sortable: true,dataIndex: 'price_brutto', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('voucher'),width: 100,sortable: true,dataIndex: 'voucher_value', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Net '+_('price'),width: 100,sortable: true,dataIndex: 'price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Ppn',width: 80,sortable: true,dataIndex: 'price_ppn', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Pph',width: 80,sortable: true,dataIndex: 'price_pph', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Service Charge',width: 80,sortable: true,dataIndex: 'price_sc', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: _('total'),width: 100,sortable: true,dataIndex: 'total_price', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                    store: [['project_name',_('project')],['doc_id',_('document')],['item_id',_('id')],['unit_building_name',_('unit_building')],['price',_('price')],['price_ppn',_('ppn')],['price_pph',_('pph')],['price_sc',_('service_charge')],['total_price',_('total')],['remarks',_('remarks')],['userinput',_('input_user')]],
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
        me.pageBody = [ me.FormulirPanel ];
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
